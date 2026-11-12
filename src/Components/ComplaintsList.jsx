import React, { useState } from 'react';

export function ComplaintsList({
  complaints = [],
  onStatusChange,
  onDeleteComplaint,
  onNewComplaintClick
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const statusOptions = ['ALL', 'Submitted', 'Pending', 'In Progress', 'Resolved'];

  const filtered = complaints.filter((item) => {
    const matchesSearch =
      (item.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.id || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getNextStatus = (current) => {
    switch (current) {
      case 'Submitted': return 'Pending';
      case 'Pending': return 'In Progress';
      case 'In Progress': return 'Resolved';
      case 'Resolved': return 'Pending';
      default: return 'Pending';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return { bg: '#F8F3EA', text: '#065f46', border: '#6B1E2D' };
      case 'In Progress': return { bg: '#F8F3EA', text: '#1e40af', border: '#6B1E2D' };
      case 'Pending': return { bg: '#FAF6F0', text: '#92400e', border: '#B8A08A' };
      default: return { bg: '#FAF6F0', text: '#75666A', border: '#D8CBBE' };
    }
  };

  return (
    <div className="complaints-list-wrapper">
      <style>{`
        .complaints-list-wrapper {
          font-family: inherit;
        }
        .controls-card {
          background: var(--bg-card, #FFFDF8);
          border: 1.5px solid var(--border-color, #E5DCD4);
          border-radius: 18px;
          padding: 16px 20px;
          margin-bottom: 24px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.03);
        }
        .search-box {
          position: relative;
          flex: 1;
          min-width: 240px;
        }
        .search-input {
          width: 100%;
          padding: 10px 14px 10px 36px;
          border-radius: 10px;
          border: 1.5px solid var(--border-color, #D8CBBE);
          font-size: 0.9rem;
          background: var(--bg-card, #FFFDF8);
          color: var(--text-primary, #241A1C);
          box-sizing: border-box;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9C8E92;
          font-size: 0.9rem;
        }
        .status-tabs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .status-tab {
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid var(--border-color, #E5DCD4);
          background: var(--bg-card, #FFFDF8);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary, #75666A);
          cursor: pointer;
          transition: all 0.15s;
        }
        .status-tab--active {
          background: #6B1E2D;
          color: #FFFDF8;
          border-color: #6B1E2D;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 18px;
        }
        .ticket-card {
          background: var(--bg-card, #FFFDF8);
          border: 1.5px solid var(--border-color, #E5DCD4);
          border-radius: 18px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ticket-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.08);
        }
        .ticket-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .ticket-cat-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 8px;
        }
        .status-badge-btn {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid;
          cursor: pointer;
          transition: transform 0.1s;
        }
        .status-badge-btn:hover {
          transform: scale(1.05);
        }
        .ticket-subject {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary, #241A1C);
          margin: 0 0 8px 0;
          line-height: 1.35;
        }
        .ticket-desc {
          font-size: 0.84rem;
          color: var(--text-secondary, #75666A);
          margin: 0 0 14px 0;
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ticket-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 0.75rem;
          color: var(--text-secondary, #75666A);
          margin-bottom: 14px;
          padding-top: 10px;
          border-top: 1px solid var(--border-color, #FAF6F0);
        }
        .ticket-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .view-details-btn {
          background: none;
          border: none;
          color: #6B1E2D;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          padding: 0;
        }
        .delete-btn {
          background: none;
          border: none;
          color: #A63D40;
          font-size: 0.8rem;
          cursor: pointer;
        }
        .empty-state {
          text-align: center;
          padding: 48px 20px;
          background: var(--bg-card, #FFFDF8);
          border: 1.5px dashed var(--border-color, #D8CBBE);
          border-radius: 20px;
        }
        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }
        .modal-body {
          background: #FFFDF8;
          border-radius: 20px;
          max-width: 540px;
          width: 100%;
          padding: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          position: relative;
        }
      `}</style>

      {/* Filter and Search Bar */}
      <div className="controls-card">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by subject, venue, ticket ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="status-tabs">
          {statusOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`status-tab ${statusFilter === opt ? 'status-tab--active' : ''}`}
              onClick={() => setStatusFilter(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📭</div>
          <h3 style={{ margin: '0 0 6px 0', fontWeight: 700 }}>No Complaints Found</h3>
          <p style={{ color: '#75666A', fontSize: '0.85rem', margin: '0 0 18px 0' }}>
            {searchQuery || statusFilter !== 'ALL'
              ? 'Try changing your search keywords or filter tab.'
              : 'You have not registered any grievances yet.'}
          </p>
          {onNewComplaintClick && (
            <button
              type="button"
              style={{
                background: '#6B1E2D',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              onClick={onNewComplaintClick}
            >
              + File New Complaint
            </button>
          )}
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map((item) => {
            const sc = getStatusColor(item.status);
            return (
              <div key={item.id} className="ticket-card">
                <div>
                  <div className="ticket-header">
                    <div
                      className="ticket-cat-badge"
                      style={{
                        backgroundColor: `${item.categoryColor || '#6B1E2D'}15`,
                        color: item.categoryColor || '#6B1E2D'
                      }}
                    >
                      <span>{item.categoryIcon || '📌'}</span>
                      <span>{item.categoryName || 'General'}</span>
                    </div>

                    <button
                      type="button"
                      className="status-badge-btn"
                      title="Click to cycle status: Submitted -> Pending -> In Progress -> Resolved"
                      style={{ backgroundColor: sc.bg, color: sc.text, borderColor: sc.border }}
                      onClick={() => onStatusChange && onStatusChange(item.id, getNextStatus(item.status))}
                    >
                      {item.status} ↻
                    </button>
                  </div>

                  <h4 className="ticket-subject">{item.subject}</h4>
                  <p className="ticket-desc">{item.description}</p>
                </div>

                <div>
                  <div className="ticket-meta">
                    <span>📍 {item.location}</span>
                    <span>📅 {item.date}</span>
                    <span>⚡ {item.priority || 'Medium'}</span>
                    {item.attachmentName && <span>📎 Photo Attached</span>}
                  </div>

                  <div className="ticket-actions">
                    <button
                      type="button"
                      className="view-details-btn"
                      onClick={() => setSelectedComplaint(item)}
                    >
                      View Details &rarr;
                    </button>
                    {onDeleteComplaint && (
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => onDeleteComplaint(item.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedComplaint && (
        <div className="modal-overlay" onClick={() => setSelectedComplaint(null)}>
          <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6B1E2D' }}>
                  TICKET #{selectedComplaint.id}
                </span>
                <h3 style={{ margin: '4px 0 0 0', fontWeight: 800 }}>{selectedComplaint.subject}</h3>
              </div>
              <button
                type="button"
                style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                onClick={() => setSelectedComplaint(null)}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '16px', background: '#F8F3EA', padding: '12px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.82rem', marginBottom: '4px' }}>
                <strong>Department:</strong> {selectedComplaint.categoryName} ({selectedComplaint.categoryIcon})
              </div>
              <div style={{ fontSize: '0.82rem', marginBottom: '4px' }}>
                <strong>Location:</strong> {selectedComplaint.location}
              </div>
              <div style={{ fontSize: '0.82rem', marginBottom: '4px' }}>
                <strong>Date Reported:</strong> {selectedComplaint.date}
              </div>
              <div style={{ fontSize: '0.82rem' }}>
                <strong>Current Status:</strong>{' '}
                <span style={{ fontWeight: 700, color: getStatusColor(selectedComplaint.status).text }}>
                  {selectedComplaint.status}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem' }}>Description:</h5>
              <p style={{ fontSize: '0.88rem', color: '#75666A', lineHeight: 1.5, margin: 0 }}>
                {selectedComplaint.description}
              </p>
            </div>

            {selectedComplaint.attachmentUrl && selectedComplaint.attachmentUrl.startsWith('data:image') && (
              <div style={{ marginBottom: '16px' }}>
                <h5 style={{ margin: '0 0 6px 0', fontSize: '0.85rem' }}>Attached Photo:</h5>
                <img
                  src={selectedComplaint.attachmentUrl}
                  alt="Attachment"
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '10px' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #D8CBBE',
                  background: '#fff',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedComplaint(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export const ComplaintList = ComplaintsList;