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
      {/* KPI Stats Grid */}
      <div className="stats-kpi-grid">
        <div className="stat-box">
          <div className="stat-box__title">Total Registered</div>
          <div className="stat-box__value">{total}</div>
          <div className="stat-box__sub">{inProgress} currently In Progress</div>
        </div>

        <div className="stat-box stat-box--pending">
          <div className="stat-box__title stat-box__title--pending">Pending Tickets (+1)</div>
          <div className="stat-box__value stat-box__value--pending">{pending}</div>
          <div className="stat-box__sub">Rule: +1 point per pending issue</div>
        </div>

        <div className="stat-box stat-box--resolved">
          <div className="stat-box__title stat-box__title--resolved">Resolved Tickets (-1)</div>
          <div className="stat-box__value stat-box__value--resolved">{resolved}</div>
          <div className="stat-box__sub">Rule: -1 point per resolution</div>
        </div>

        <div className="stat-box stat-box--resolved">
          <div className="stat-box__title stat-box__title--resolved">Resolution Rate</div>
          <div className="stat-box__value stat-box__value--resolved">{resolutionRate}%</div>
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
            <div className="matrix-label matrix-label--pending">+1 PER PENDING</div>
            <div className="matrix-value matrix-value--pending">
              +{pendingPoints} pts
            </div>
            <div className="matrix-subtitle matrix-subtitle--pending">{pending} tickets active</div>
          </div>

          <div className="matrix-operator">+</div>

          <div className="matrix-pill matrix-pill--resolved">
            <div className="matrix-label matrix-label--resolved">-1 PER RESOLVED</div>
            <div className="matrix-value matrix-value--resolved">
              {resolvedPoints} pts
            </div>
            <div className="matrix-subtitle matrix-subtitle--resolved">{resolved} tickets resolved</div>
          </div>

          <div className="matrix-operator">=</div>

          <div className="matrix-pill matrix-pill--result">
            <div className="matrix-label matrix-label--result">NET SYSTEM SCORE</div>
            <div className="matrix-value matrix-value--result">
              {netPoints > 0 ? `+${netPoints}` : netPoints}
            </div>
            <div className="matrix-subtitle matrix-subtitle--result">
              {netPoints <= 0 ? 'Optimal (backlog cleared)' : 'Active pending load'}
            </div>
          </div>
        </div>
      </div>

      {/* Department Distribution */}
      {categoryCounts && categoryCounts.length > 0 && (
        <div className="dept-card">
          <h4 className="department-breakdown-title">
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
                    className={`dept-fill complaint-category-bg--${c.id || 'default'} dept-fill--${Math.max(4, c.percentage)}`}
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

export default ComplaintStats;
