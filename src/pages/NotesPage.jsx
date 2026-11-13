import React, { useState, useMemo } from "react";
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { INITIAL_NOTES, SUBJECTS_LIST } from "../components/notes/notesData";
import SubjectGrid from "../components/notes/SubjectGrid";
import NotesList from "../components/notes/NotesList";
import UploadNoteForm from "../components/notes/UploadNoteForm";
import NotePreviewModal from "../components/notes/NotePreviewModal";
import "../components/notes/Notes.css";

export default function NotesPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const currentStudentName = user?.name || "Alex Sharma";
  const currentStudentInitials = user?.initials || "AS";

  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [downloadedNoteIds, setDownloadedNoteIds] = useState(new Set([1]));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [sortBy, setSortBy] = useState("popular");

  const [previewNote, setPreviewNote] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((c) => (c === msg ? null : c));
    }, 3500);
  };

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          note.title.toLowerCase().includes(query) ||
          note.subject.toLowerCase().includes(query) ||
          (note.topic && note.topic.toLowerCase().includes(query)) ||
          (note.seller && note.seller.toLowerCase().includes(query)) ||
          (note.description && note.description.toLowerCase().includes(query));

        const matchesSubject =
          selectedSubject === "All Subjects" || note.subject === selectedSubject;

        return matchesSearch && matchesSubject;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return (b.reviews || 0) - (a.reviews || 0);
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "pages") return (b.pages || 0) - (a.pages || 0);
        return 0;
      });
  }, [notes, searchQuery, selectedSubject, sortBy]);

  const handleDownload = (note) => {
    setDownloadedNoteIds((prev) => new Set([...prev, note.id]));
    triggerToast(`📥 "${note.title}" downloaded! Available in your course library.`);
  };

  const handleShareNote = (note) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(
        `UniSphere Resource: ${note.title} (${note.subject}) - Contributed by ${note.seller}`
      );
    }
    triggerToast(`📋 Reference citation for "${note.title}" copied!`);
  };

  const handleUploadSubmit = (formData) => {
    const newNote = {
      id: Date.now(),
      title: formData.title,
      subject: formData.subject,
      topic: formData.topic || "Core Semester Revision",
      description:
        formData.description ||
        "Freshly uploaded student notes with complete explanations, unit breakdown, and practice questions.",
      seller: formData.sellerName || currentStudentName,
      sellerCollege: formData.sellerCollege || "Campus Verified",
      price: 0,
      rating: 5.0,
      reviews: 1,
      semester: formData.semester || "Semester 4",
      course: "B.Tech / B.E.",
      pages: Number(formData.pages) || 15,
      badge: "Community Upload",
      color: "#3B302A",
      verified: true,
      previewPages: [
        {
          pageNumber: 1,
          docPage: 1,
          title: `${formData.subject}: Unit 1 Overview`,
          content: `• Course Document: ${formData.title}\n• Topic: ${formData.topic || "Core concepts & solved questions"}.\n• Contributed by ${formData.sellerName || currentStudentName} for exam preparation.`,
          highlight: "Verified student submission ready for exam preparation."
        }
      ]
    };

    setNotes((prev) => [newNote, ...prev]);
    setShowUploadModal(false);
    triggerToast(`🎉 Note "${newNote.title}" uploaded successfully!`);
  };

  return (
    <AppLayout activePath="/notes">
      <div className="portal-module-wrapper">
        {toastMessage && (
          <div className="module-toast">
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="toast-close"
            >
              ✕
            </button>
          </div>
        )}

        {/* Top Header Bar */}
        <header className="notes-top-bar">
          <div className="notes-top-left">
            <div className="notes-top-icon">
              <span>📚</span>
            </div>
            <div>
              <h1 className="notes-top-title">{t("notesMarket.title", "Notes Marketplace")}</h1>
              <p className="notes-top-subtitle">
                {t("notesMarket.subtitle", "Peer-Verified Semester Resources & Lecture Notes")}
              </p>
            </div>
          </div>

          <div className="notes-top-right">
            <button
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="btn-action-primary"
              style={{ padding: "8px 16px", fontSize: "13px" }}
            >
              <span className="btn-icon">📤</span>
              <span>{t("notesMarket.uploadBtn", "Upload Notes")}</span>
            </button>
            <div className="notes-top-user">
              <div className="notes-top-avatar">{currentStudentInitials}</div>
              <span>{currentStudentName}</span>
            </div>
          </div>
        </header>

        {/* Module Header Banner */}
        <header className="module-header-banner">
          <div className="module-header-content">
            <div className="module-title-row">
              <div className="module-badge-tag">
                <span>📚 Academic Resource Module</span>
              </div>
              <h1 className="module-main-title">{t("notesMarket.title", "Notes Marketplace")}</h1>
              <p className="module-description">
                Explore verified topper notes, cheatsheets, and question-bank solutions contributed by senior peers and batchmates. Preview sample chapters or download them directly to your student locker.
              </p>
            </div>

            <div className="module-header-actions">
              <button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className="btn-action-primary"
              >
                <span className="btn-icon">📤</span>
                <span>{t("notesMarket.uploadBtn", "Upload Notes")}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Quick Engagement Summary Strip */}
        <div style={{ display: "flex", gap: "12px", margin: "16px 24px 0", flexWrap: "wrap" }}>
          <div style={{ background: "#FFFFFF", border: "1px solid #D6D0C8", padding: "8px 14px", borderRadius: "10px", fontSize: "12.5px", color: "#3B302A", display: "flex", alignItems: "center", gap: "6px", fontWeight: "600" }}>
            <span>📚</span>
            <span><strong>{notes.length}</strong> Verified Semester Note Packs</span>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #D6D0C8", padding: "8px 14px", borderRadius: "10px", fontSize: "12.5px", color: "#3B302A", display: "flex", alignItems: "center", gap: "6px", fontWeight: "600" }}>
            <span>🎓</span>
            <span>CSE &amp; IT Semester 3 &amp; 4 Materials</span>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid #D6D0C8", padding: "8px 14px", borderRadius: "10px", fontSize: "12.5px", color: "#3B302A", display: "flex", alignItems: "center", gap: "6px", fontWeight: "600" }}>
            <span>📂</span>
            <span><strong>{downloadedNoteIds.size}</strong> Notes Saved in Locker</span>
          </div>
        </div>

        {/* Module Body Content */}
        <div className="module-body-container">
          <section className="module-section-box">
            <div className="section-head-bar">
              <div>
                <span className="sub-badge">Marketplace &amp; Study Notes</span>
                <h2 className="sub-heading">Browse Course Materials ({filteredNotes.length})</h2>
              </div>

              <div className="search-and-filter-bar">
                <div className="module-search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search by subject, title, author, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="module-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="clear-btn"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="filter-controls-group">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="module-select"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="pages">Most Comprehensive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Subject Filter Chips */}
            <SubjectGrid
              subjects={SUBJECTS_LIST}
              selectedSubject={selectedSubject}
              onSelectSubject={setSelectedSubject}
            />

            {/* Notes List with Engaging Cards */}
            <NotesList
              notes={filteredNotes}
              downloadedNoteIds={downloadedNoteIds}
              onPreview={setPreviewNote}
              onDownload={handleDownload}
              onShare={handleShareNote}
              onResetFilters={() => {
                setSearchQuery("");
                setSelectedSubject("All Subjects");
                setSortBy("popular");
              }}
            />
          </section>
        </div>

        {/* Note Preview Modal */}
        {previewNote && (
          <NotePreviewModal
            note={previewNote}
            isDownloaded={downloadedNoteIds.has(previewNote.id)}
            onClose={() => setPreviewNote(null)}
            onDownload={(n) => {
              handleDownload(n);
            }}
          />
        )}

        {/* Upload Note Modal */}
        {showUploadModal && (
          <UploadNoteForm
            subjects={SUBJECTS_LIST}
            onClose={() => setShowUploadModal(false)}
            onSubmit={handleUploadSubmit}
          />
        )}

        {/* Module Footer Status Strip */}
        <div className="module-footer-status-bar">
          <div className="footer-status-left">
            <span>📚 <strong>UniSphere Academic Module</strong> · Notes Marketplace</span>
          </div>
          <div className="footer-status-right">
            <button
              type="button"
              onClick={() => setShowUploadModal(true)}
              className="footer-status-link"
            >
              📤 Upload Notes
            </button>
            <span>·</span>
            <span>🔒 Peer-Reviewed Campus Resource</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
