import React, { useState } from "react";
import { BookOpen, Check, Share2, Star, FileText } from "lucide-react";

/**
 * NoteCard Component
 * 
 * Engaging, student-friendly card layout using UniSphere theme:
 * - Scannable header with subject, semester, and PDF file format badge
 * - Clear title and syllabus topic focus
 * - Page count, course tag, and peer review ratings
 * - Contributor profile with campus verification badge
 * - Visible, intuitive actions: Preview Sample, Download PDF, and Share Link
 */
export default function NoteCard({
  note,
  isDownloaded,
  onPreview,
  onDownload,
  onShare
}) {
  const [copied, setCopied] = useState(false);

  const handleShareClick = (e) => {
    e.stopPropagation();
    if (onShare) {
      onShare(note);
    } else {
      navigator.clipboard?.writeText?.(
        `UniSphere Notes: ${note.title} (${note.subject})`
      );
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="note-item-card">
      {/* Top Banner with Subject, Format, and Badges */}
      <div className="note-card-banner">
        <div className="card-top-tags">
          <span className="subj-tag">{note.subject}</span>
          <span className="spec-tag">📄 PDF · {note.semester || "4th Sem"}</span>
          {note.badge && (
            <span className="bestseller-tag">★ {note.badge}</span>
          )}
        </div>

        <h3 className="note-title">{note.title}</h3>
        {note.topic && (
          <p className="note-topic">
            <strong>🎯 Focus:</strong> {note.topic}
          </p>
        )}
        {note.description && (
          <p className="note-description">{note.description}</p>
        )}

        {/* High-yield quick-scan metadata pills */}
        <div className="note-specs-strip" style={{ marginTop: "10px", flexWrap: "wrap" }}>
          {note.pages && (
            <span className="spec-tag">
              <FileText size={11} style={{ display: "inline", marginRight: "3px" }} />
              {note.pages} Pages
            </span>
          )}
          {note.rating && (
            <span className="spec-tag spec-tag-rating">
              <Star size={11} style={{ display: "inline", marginRight: "3px", fill: "#B8A08A", color: "#B8A08A" }} />
              {note.rating} ({note.reviews || 12})
            </span>
          )}
          {note.course && (
            <span className="spec-tag">🎓 {note.course}</span>
          )}
        </div>
      </div>

      {/* Author and Contributor Info */}
      <div className="note-author-strip">
        <div className="author-info" style={{ marginBottom: 0 }}>
          <span className="author-initial">
            {(note.seller || "S").charAt(0).toUpperCase()}
          </span>
          <div style={{ flex: 1 }}>
            <span className="author-name">
              {note.seller || "Student Peer"}{" "}
              <span className="verified-icon" title="Campus Verified Contributor">✓</span>
            </span>
            <span className="author-college">
              {note.sellerCollege || "Verified Campus Peer"}
            </span>
          </div>

          {/* Quick Share Link Button */}
          <button
            type="button"
            onClick={handleShareClick}
            className="btn-card-preview"
            style={{ padding: "4px 8px", fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "4px" }}
            title="Copy note reference link"
          >
            <Share2 size={12} />
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="note-card-bottom">
        <div className="card-btn-grid">
          <button
            type="button"
            onClick={() => onPreview(note)}
            className="btn-card-preview"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
          >
            <BookOpen size={14} />
            <span>Preview Sample</span>
          </button>

          <button
            type="button"
            onClick={() => onDownload(note)}
            className={`btn-card-action ${isDownloaded ? "owned" : ""}`}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
          >
            {isDownloaded ? (
              <>
                <Check size={14} />
                <span>In Locker</span>
              </>
            ) : (
              <span>Get Notes</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
