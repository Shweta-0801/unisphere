import React from 'react';

export function ComplaintStats({ stats = {} }) {
  const {
    total = 0,
    pending = 0,
    resolved = 0,
    inProgress = 0,
    pendingPoints = 0,
    resolvedPoints = 0,
    netPoints = 0,
    resolutionRate = 0,
    categoryCounts = []
  } = stats;

  return (
    <div className="complaint-stats-wrapper">
      <style>{`
        .complaint-stats-wrapper {
          font-family: inherit;
        }
        .stats-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-box {
          background: var(--bg-card, #FFFDF8);
          border: 1.5px solid var(--border-color, #E5DCD4);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.03);
        }
        .stat-box__title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary, #75666A);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .stat-box__value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary, #241A1C);
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-box__sub {
          font-size: 0.75rem;
          color: var(--text-muted, #9C8E92);
        }
        /* Matrix Card */
        .points-matrix-card {
          background: var(--bg-card, #FFFDF8);
          border: 1.5px solid var(--border-color, #E5DCD4);
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.03);
        }
        .matrix-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary, #241A1C);
          margin: 0 0 4px 0;
        }
        .matrix-desc {
          font-size: 0.82rem;
          color: var(--text-secondary, #75666A);
          margin: 0 0 18px 0;
        }
        .matrix-calc-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .matrix-pill {
          flex: 1;
          min-width: 140px;
          padding: 14px;
          border-radius: 14px;
          background: #F8F3EA;
          border: 1px solid #E5DCD4;
          text-align: center;
        }
        .matrix-pill--pending {
          background: #FAF6F0;
          border-color: #fde68a;
        }
        .matrix-pill--resolved {
          background: #F8F3EA;
          border-color: #a7f3d0;
        }
        .matrix-pill--result {
          background: #F8F3EA;
          border-color: #bfdbfe;
        }
        .dept-card {
          background: var(--bg-card, #FFFDF8);
          border: 1.5px solid var(--border-color, #E5DCD4);
          border-radius: 18px;
          padding: 24px;
        }
        .dept-item {
          margin-bottom: 12px;
        }
        .dept-item-top {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          margin-bottom: 4px;
        }
        .dept-track {
          height: 8px;
          background: #FAF6F0;
          border-radius: 9999px;
          overflow: hidden;
        }
        .dept-fill {
          height: 100%;
          border-radius: 9999px;
          transition: width 0.3s ease;
        }
      `}</style>

      {/* KPI Stats Grid */}
      <div className="stats-kpi-grid">
        <div className="stat-box">
          <div className="stat-box__title">Total Registered</div>
          <div className="stat-box__value">{total}</div>
          <div className="stat-box__sub">{inProgress} currently In Progress</div>
        </div>

        <div className="stat-box" style={{ borderLeft: '4px solid #B8A08A' }}>
          <div className="stat-box__title" style={{ color: '#A38A75' }}>Pending Tickets (+1)</div>
          <div className="stat-box__value" style={{ color: '#A38A75' }}>{pending}</div>
          <div className="stat-box__sub">Rule: +1 point per pending issue</div>
        </div>

        <div className="stat-box" style={{ borderLeft: '4px solid #6B1E2D' }}>
          <div className="stat-box__title" style={{ color: '#48121E' }}>Resolved Tickets (-1)</div>
          <div className="stat-box__value" style={{ color: '#48121E' }}>{resolved}</div>
          <div className="stat-box__sub">Rule: -1 point per resolution</div>
        </div>

        <div className="stat-box" style={{ borderLeft: '4px solid #6B1E2D' }}>
          <div className="stat-box__title" style={{ color: '#48121E' }}>Resolution Rate</div>
          <div className="stat-box__value" style={{ color: '#48121E' }}>{resolutionRate}%</div>
          <div className="stat-box__sub">Overall closed complaint ratio</div>
        </div>
      </div>

      {/* Points & Accountability Matrix */}
      <div className="points-matrix-card">
        <h3 className="matrix-title">Grievance Points & Accountability Matrix</h3>
        <p className="matrix-desc">
          Automated evaluation score tracking open backlog against administrative resolutions.
        </p>

        <div className="matrix-calc-row">
          <div className="matrix-pill matrix-pill--pending">
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6B1E2D' }}>+1 PER PENDING</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#92400e', margin: '4px 0' }}>
              +{pendingPoints} pts
            </div>
            <div style={{ fontSize: '0.72rem', color: '#6B1E2D' }}>{pending} tickets active</div>
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#9C8E92' }}>+</div>

          <div className="matrix-pill matrix-pill--resolved">
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#351019' }}>-1 PER RESOLVED</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#065f46', margin: '4px 0' }}>
              {resolvedPoints} pts
            </div>
            <div style={{ fontSize: '0.72rem', color: '#351019' }}>{resolved} tickets resolved</div>
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#9C8E92' }}>=</div>

          <div className="matrix-pill matrix-pill--result">
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#351019' }}>NET SYSTEM SCORE</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e40af', margin: '4px 0' }}>
              {netPoints > 0 ? `+${netPoints}` : netPoints}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#351019' }}>
              {netPoints <= 0 ? 'Optimal (backlog cleared)' : 'Active pending load'}
            </div>
          </div>
        </div>
      </div>

      {/* Department Distribution */}
      {categoryCounts && categoryCounts.length > 0 && (
        <div className="dept-card">
          <h4 style={{ margin: '0 0 16px 0', fontWeight: 800, fontSize: '1.05rem' }}>
            Departmental Breakdown Across 9 Categories
          </h4>
          <div>
            {categoryCounts.map((c) => (
              <div key={c.id} className="dept-item">
                <div className="dept-item-top">
                  <span>{c.icon} <strong>{c.name}</strong></span>
                  <span><strong>{c.count}</strong> tickets ({c.percentage}%)</span>
                </div>
                <div className="dept-track">
                  <div
                    className="dept-fill"
                    style={{
                      width: `${Math.max(4, c.percentage)}%`,
                      backgroundColor: c.color || '#6B1E2D'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}