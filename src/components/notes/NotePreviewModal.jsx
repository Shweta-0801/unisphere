import React, { useState } from "react";

export default function NotePreviewModal({
  note,
  isOwned,
  onClose,
  onBuyOrDownload,
  onStartStudyGroup
}) {
  const previewPages = note.previewPages || [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoom, setZoom] = useState(100);

  const selectedPage = previewPages[selectedIndex] || {
    pageNumber: 1,
    docPage: 1,
    title: `${note.subject} — Preview`,
    content: "Preview content is not available for this note yet.",
    highlight: "Preview pages will appear here once the seller uploads them."
  };

  const decreaseZoom = () => setZoom((value) => Math.max(80, value - 10));
  const increaseZoom = () => setZoom((value) => Math.min(140, value + 10));

  return (
    <div className="module-modal-overlay" onClick={onClose}>
      <div className="module-modal-box modal-reader" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div className="modal-title-wrap">
            <span className="modal-icon">📖</span>
            <div>
              <span className="badge-pill">{note.subject} · {note.badge || "Note"}</span>
              <h3>{note.title}</h3>
              <p className="reader-author-info">By {note.seller} · {note.pages} pages · {note.semester}</p>
            </div>
          </div>

          <div className="reader-header-actions">
            <div className="zoom-bar">
              <button onClick={decreaseZoom} className="btn-zoom-step" type="button">−</button>
              <span className="zoom-value">{zoom}%</span>
              <button onClick={increaseZoom} className="btn-zoom-step" type="button">+</button>
            </div>
            <button onClick={onClose} className="modal-close" type="button">✕</button>
          </div>
        </div>

        <div className="reader-split-body">
          <aside className="reader-sidebar">
            <span className="sidebar-title">Preview Pages</span>
            <div className="sidebar-page-list">
              {previewPages.map((page, index) => (
                <button
                  key={`${page.docPage}-${index}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`sidebar-page-pill ${selectedIndex === index ? "active" : ""}`}
                >
                  <span className="pg-num">Page {page.docPage || page.pageNumber}</span>
                  <span className="pg-topic">{page.title}</span>
                </button>
              ))}
            </div>
            <p style={{ marginTop: 12, fontSize: "0.7rem", color: "#64748b" }}>
              Preview includes selected sample pages only.
            </p>
          </aside>

          <main className="reader-main-paper-view">
            <article className="reader-paper" style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center", marginBottom: `${zoom - 100}px` }}>
              <div className="paper-head-watermark">
                <span>UNISPHERE · ACADEMIC RESOURCE</span>
                <span>PREVIEW · PAGE {selectedPage.docPage || selectedPage.pageNumber}</span>
              </div>
              <h2 className="paper-title">{selectedPage.title}</h2>
              <div className="paper-body-text">{selectedPage.content}</div>
              {selectedPage.highlight && (
                <div className="paper-exam-tip">
                  <strong>💡 Exam Tip:</strong> {selectedPage.highlight}
                </div>
              )}
            </article>
          </main>
        </div>

        <div className="reader-footer-row">
          <span className="reader-footer-note">
            {isOwned ? "✓ You own this note. Full access is unlocked." : `Previewing ${previewPages.length || 1} sample page${(previewPages.length || 1) === 1 ? "" : "s"}.`}
          </span>

          <div className="reader-footer-btns">
            <button
              type="button"
              onClick={() => onStartStudyGroup(note)}
              className="btn-host-from-preview"
            >
              👥 Study Together
            </button>
            <button
              type="button"
              onClick={() => onBuyOrDownload(note)}
              className="btn-buy-from-preview"
            >
              {isOwned ? "⬇️ Download / Open" : note.price === 0 ? "⬇️ Get Free" : `🛒 Buy for ₹${note.price}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}