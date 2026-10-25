import React, { useState } from "react";

export default function NotePreviewModal({
  note,
  isDownloaded,
  onClose,
  onDownload
}) {
  const previewPages = note.previewPages || [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoom, setZoom] = useState(100);

  const selectedPage = previewPages[selectedIndex] || {
    pageNumber: 1,
    docPage: 1,
    label: "Page 1 (First 3)",
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
            <span className="sidebar-title">6-Page Sample Preview</span>
            <div className="sidebar-page-list">
              {previewPages.map((page, index) => (
                <button
                  key={`${page.docPage || page.pageNumber}-${index}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`sidebar-page-pill ${selectedIndex === index ? "active" : ""}`}
                >
                  <span className="pg-num">{page.label || `Page ${page.docPage || page.pageNumber}`}</span>
                  <span className="pg-topic">{page.title}</span>
                </button>
              ))}
            </div>
            <p className="reader-sidebar-note">
              Preview includes first 3 &amp; last 3 sample pages. Full 100% document unlocked upon purchase.
            </p>
          </aside>

          <main className="reader-main-paper-view">
            <article className={`reader-paper zoom-${zoom}`}>
              <div className="paper-head-watermark">
                <span>UNISPHERE · ACADEMIC RESOURCE PREVIEW</span>
                <span>{selectedPage.label || `PAGE ${selectedPage.docPage || selectedPage.pageNumber}`}</span>
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
            {isDownloaded ? "✓ Note unlocked and saved in your student locker." : `Previewing sample pages (${previewPages.length} pages available).`}
          </span>

          <div className="reader-footer-btns">
            <button
              type="button"
              onClick={() => onDownload(note)}
              className="btn-buy-from-preview"
            >
              {isDownloaded ? "✓ In Locker" : "Get Full Notes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
