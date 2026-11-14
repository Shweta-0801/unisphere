import { useState } from 'react';

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

  return (
    <div className="complaints-list-wrapper">
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
          <div className="empty-state-icon">📭</div>
          <h3 className="empty-state-title">No Complaints Found</h3>
          <p className="empty-state-description">
            {searchQuery || statusFilter !== 'ALL'
              ? 'Try changing your search keywords or filter tab.'
              : 'You have not registered any grievances yet.'}
          </p>
          {onNewComplaintClick && (
            <button
              type="button"
              className="empty-state-action"
              onClick={onNewComplaintClick}
            >
              + File New Complaint
            </button>
          )}
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map((item) => {
            const statusClass = (item.status || 'submitted').toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={item.id} className="ticket-card">
                <div>
                  <div className="ticket-header">
                    <div className={`ticket-cat-badge complaint-category-color--${item.categoryId || 'default'}`}>
                      <span>{item.categoryIcon || '📌'}</span>
                      <span>{item.categoryName || 'General'}</span>
                    </div>

                    <button
                      type="button"
                      className={`status-badge-btn status-badge-btn--${statusClass}`}
                      title="Click to cycle status: Submitted -> Pending -> In Progress -> Resolved"
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
                    {(item.attachmentName || item.attachmentUrl) && <span>📎 Photo</span>}
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
            <div className="complaint-modal-header">
              <div>
                <span className="complaint-modal-ticket-id">
                  TICKET #{selectedComplaint.id}
                </span>
                <h3 className="complaint-modal-title">{selectedComplaint.subject}</h3>
              </div>
              <button
                type="button"
                className="complaint-modal-close"
                onClick={() => setSelectedComplaint(null)}
              >
                ✕
              </button>
            </div>

            <div className="complaint-modal-details">
              <div className="complaint-modal-detail-row">
                <strong>Department:</strong> {selectedComplaint.categoryName} ({selectedComplaint.categoryIcon})
              </div>
              <div className="complaint-modal-detail-row">
                <strong>Location:</strong> {selectedComplaint.location}
              </div>
              <div className="complaint-modal-detail-row">
                <strong>Date Reported:</strong> {selectedComplaint.date}
              </div>
              <div className="complaint-modal-detail-row">
                <strong>Priority:</strong> {selectedComplaint.priority || 'Medium'}
              </div>
              <div className="complaint-modal-detail-row complaint-modal-detail-row--last">
                <strong>Current Status:</strong>{' '}
                <span className={`complaint-modal-status complaint-modal-status--${(selectedComplaint.status || 'submitted').toLowerCase().replace(/\s+/g, '-')}`}>
                  {selectedComplaint.status}
                </span>
              </div>
            </div>

            <div className="complaint-modal-section">
              <h5 className="complaint-modal-section-title">Description:</h5>
              <p className="complaint-modal-description">
                {selectedComplaint.description}
              </p>
            </div>

            {selectedComplaint.attachmentUrl && selectedComplaint.attachmentUrl.startsWith('data:image') && (
              <div className="complaint-modal-section">
                <h5 className="complaint-modal-section-title">Attached Photo:</h5>
                <img
                  src={selectedComplaint.attachmentUrl}
                  alt="Attachment"
                  className="complaint-modal-image"
                />
              </div>
            )}

            <div className="complaint-modal-actions">
              {onStatusChange && (
                <button
                  type="button"
                  className="unisphere-btn unisphere-btn-secondary"
                  style={{ marginRight: 'auto', fontSize: '0.8rem', padding: '6px 12px' }}
                  onClick={() => {
                    const next = getNextStatus(selectedComplaint.status);
                    onStatusChange(selectedComplaint.id, next);
                    setSelectedComplaint((prev) => ({ ...prev, status: next }));
                  }}
                >
                  Mark as {getNextStatus(selectedComplaint.status)}
                </button>
              )}
              <button
                type="button"
                className="complaint-modal-close-btn"
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
export default ComplaintsList;
