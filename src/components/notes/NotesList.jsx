import React from "react";
import NoteCard from "./NoteCard";

export default function NotesList({
  notes,
  purchasedNoteIds,
  onPreview,
  onBuyOrDownload,
  onStartStudyGroup,
  onResetFilters
}) {
  if (notes.length === 0) {
    return (
      <div className="empty-results-box">
        <span className="empty-icon">📂</span>
        <h3>No notes found for current search</h3>
        <p>Try resetting filters or search by a different keyword.</p>
        <button onClick={onResetFilters} className="btn-reset-filters">
          Reset Filters
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
          isOwned={purchasedNoteIds.has(note.id)}
          onPreview={onPreview}
          onBuyOrDownload={onBuyOrDownload}
          onStartStudyGroup={onStartStudyGroup}
        />
      ))}
    </div>
  );
}