import React from "react";
import { FolderSearch, RotateCcw } from "lucide-react";
import NoteCard from "./NoteCard";

export default function NotesList({
  notes,
  downloadedNoteIds,
  onPreview,
  onDownload,
  onShare,
  onResetFilters
}) {
  if (notes.length === 0) {
    return (
      <div className="empty-results-box">
        <div
          style={{
            display: "inline-flex",
            padding: "16px",
            borderRadius: "50%",
            background: "#FAF6F0",
            border: "1px solid #D6D0C8",
            marginBottom: "12px",
            color: "#8D857D"
          }}
        >
          <FolderSearch size={36} />
        </div>
        <h3>No Semester Notes Found</h3>
        <p style={{ maxWidth: "440px", margin: "0 auto 16px", color: "#8D857D", fontSize: "13.5px" }}>
          No course notes matched your selected subject or search keyword. Try switching to a different subject chip or reset your query.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="btn-reset-filters"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <RotateCcw size={14} />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="notes-card-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          isDownloaded={downloadedNoteIds.has(note.id)}
          onPreview={onPreview}
          onDownload={onDownload}
          onShare={onShare}
        />
      ))}
    </div>
  );
}