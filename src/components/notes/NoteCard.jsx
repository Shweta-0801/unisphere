import React from "react";

export default function NoteCard({
  note,
  isOwned,
  onPreview,
  onBuyOrDownload,
  onStartStudyGroup
}) {
  return (
    <div className="note-item-card">
      <div className="note-card-banner" style={{ borderTopColor: note.color }}>
        <div className="card-top-tags">
          <span className="subj-tag">{note.subject}</span>
          {note.badge && <span className="bestseller-tag">{note.badge}</span>}
        </div>

        <h3 className="note-title">{note.title}</h3>
        <p className="note-topic"> {note.topic}</p>
        <p className="note-description">{note.description}</p>
      </div>

      <div className="note-author-strip">
        <div className="author-info">
          <span className="author-initial">{note.seller.charAt(0)}</span>
          <div>
            <span className="author-name">
              {note.seller} {note.verified && <span className="verified-icon">✓</span>}
            </span>
            <span className="author-college">{note.sellerCollege}</span>
          </div>
        </div>

        <div className="note-specs-strip">
          <span className="spec-tag" style={{ color: "#B8A08A", fontWeight: 700 }}>★ {note.rating} ({note.reviews})</span>
          <span className="spec-tag"> {note.pages} pgs</span>
          <span className="spec-tag"> {note.semester}</span>
        </div>
      </div>

      <div className="note-card-bottom">
        <div className="pricing-box">
          {note.price === 0 ? (
            <span className="price-free">FREE</span>
          ) : (
            <span className="price-paid">
              ₹{note.price} <small className="price-cut">₹{note.price + 50}</small>
            </span>
          )}
        </div>

        <div className="card-btn-grid">
          <button onClick={() => onPreview(note)} className="btn-card-preview">
             Preview
          </button>

          <button
            onClick={() => onBuyOrDownload(note)}
            className={`btn-card-action ${isOwned ? "owned" : ""}`}
          >
            {isOwned ? "⬇ Download" : note.price === 0 ? "⬇ Get Free" : " Buy Note"}
          </button>
        </div>

        <button
          onClick={() => onStartStudyGroup(note)}
          className="btn-launch-study-room"
          title="Host group study with this note"
        >
          <span> Create Group Study with this Note</span>
        </button>
      </div>
    </div>
  );
}
