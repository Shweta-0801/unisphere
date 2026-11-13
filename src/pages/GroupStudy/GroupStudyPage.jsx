import React, { useState, useMemo } from "react";
import {
  Users,
  Send,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Calendar,
  Search,
  RotateCcw,
  Clock,
  FileText
} from "lucide-react";
import AppLayout from "../../components/layout/AppLayout";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { studyRoomsData } from "../../data/groupStudyData";
import "./GroupStudy.css";

const CATEGORY_CHIPS = [
  "All Circles",
  "Data Structures",
  "DBMS",
  "Operating Systems",
  "Computer Networks"
];

const SUBJECT_OPTIONS = [
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Operating Systems Principles",
  "Computer Networks & Security",
  "AI & Machine Learning",
  "Compiler Design",
  "Full-Stack Web Development"
];

export default function GroupStudyPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const currentStudentName = user?.name || "Alex Sharma";
  const currentStudentInitials = user?.initials || "AS";

  // Study Groups State
  const [rooms, setRooms] = useState(studyRoomsData);
  const [activeRoomId, setActiveRoomId] = useState(studyRoomsData[0].id);
  const [viewMode, setViewMode] = useState("browse"); // "browse" or "details"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Circles");

  // Create Group Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formError, setFormError] = useState("");
  const [newGroupData, setNewGroupData] = useState({
    title: "",
    subject: SUBJECT_OPTIONS[0],
    topic: "",
    description: "",
    documentTitle: "",
    schedule: "Daily 5:00 PM"
  });

  // Active Room Details State
  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];
  const [currentPage, setCurrentPage] = useState(activeRoom?.defaultPage || 1);
  const [chatInput, setChatInput] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((c) => (c === msg ? null : c));
    }, 3500);
  };

  // Filtered rooms for browse view with search and category filtering
  const filteredRooms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return rooms.filter((room) => {
      const matchesCategory =
        selectedCategory === "All Circles" ||
        room.category === selectedCategory ||
        room.subject.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesSearch =
        !q ||
        room.title.toLowerCase().includes(q) ||
        room.subject.toLowerCase().includes(q) ||
        room.description.toLowerCase().includes(q) ||
        room.code.toLowerCase().includes(q) ||
        (room.host && room.host.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [rooms, searchQuery, selectedCategory]);

  // Handle Join / Leave Group (reactive member count update)
  const handleToggleJoin = (roomId) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id !== roomId) return room;

        const isCurrentlyJoined = room.isJoined;
        const newJoinedStatus = !isCurrentlyJoined;
        const updatedCount = isCurrentlyJoined
          ? Math.max(1, room.membersCount - 1)
          : room.membersCount + 1;

        let updatedStudents = [...room.activeStudents];
        if (newJoinedStatus) {
          // Add current student to participants
          if (!updatedStudents.some((s) => s.name.includes(currentStudentName))) {
            updatedStudents.push({
              id: `user-${Date.now()}`,
              name: `${currentStudentName} (You)`,
              status: "Member",
              initials: currentStudentInitials,
              color: "#3B302A",
              isCurrentUser: true
            });
          }
          triggerToast(`👥 Joined "${room.title}"!`);
        } else {
          // Remove current student
          updatedStudents = updatedStudents.filter(
            (s) => !s.name.includes(currentStudentName) && !s.isCurrentUser
          );
          triggerToast(`Left "${room.title}".`);
        }

        return {
          ...room,
          isJoined: newJoinedStatus,
          membersCount: updatedCount,
          activeStudents: updatedStudents
        };
      })
    );
  };

  // Open Details view for a selected group
  const handleViewDetails = (roomId) => {
    setActiveRoomId(roomId);
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setCurrentPage(room.defaultPage || 1);
    }
    setViewMode("details");
  };

  // Post a message in the active room discussion
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: `${currentStudentName} (You)`,
      text: chatInput.trim(),
      time: "Just now",
      avatar: currentStudentInitials
    };

    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === activeRoom.id) {
          return {
            ...room,
            chat: [...room.chat, newMsg]
          };
        }
        return room;
      })
    );

    setChatInput("");
  };

  // Handle Create Group Form Submit
  const handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    if (!newGroupData.title.trim()) {
      setFormError("Please enter a group title.");
      return;
    }
    if (!newGroupData.topic.trim()) {
      setFormError("Please specify the syllabus topic or focus.");
      return;
    }

    const generatedCode = `CS-${Math.floor(300 + Math.random() * 99)}`;
    const newRoom = {
      id: `room-${Date.now()}`,
      code: generatedCode,
      subject: newGroupData.subject,
      category: newGroupData.subject.split(" ")[0],
      title: newGroupData.title.trim(),
      description:
        newGroupData.description.trim() ||
        `Study circle focusing on ${newGroupData.topic.trim()} for semester preparation.`,
      documentTitle:
        newGroupData.documentTitle.trim() ||
        `${newGroupData.subject}: ${newGroupData.topic.trim()} Notes.pdf`,
      schedule: newGroupData.schedule.trim() || "Daily Study Circle",
      status: "Active Circle",
      totalPages: 1,
      defaultPage: 1,
      host: currentStudentName,
      membersCount: 1,
      isJoined: true,
      activeStudents: [
        {
          id: `stu-${Date.now()}`,
          name: `${currentStudentName} (Host)`,
          status: "Host",
          initials: currentStudentInitials,
          color: "#3B302A",
          isCurrentUser: true
        }
      ],
      chat: [
        {
          id: 1,
          sender: currentStudentName,
          text: `Welcome to ${newGroupData.title.trim()}! Let's collaborate and prepare effectively.`,
          time: "Just now",
          avatar: currentStudentInitials
        }
      ],
      documentSections: [
        {
          page: 1,
          title: `Unit Overview: ${newGroupData.topic.trim()}`,
          text: `Discussion sheet for ${newGroupData.title.trim()}.\n\n• Target Exam Topic: ${newGroupData.topic.trim()}\n• Course: ${newGroupData.subject}\n• Session Host: ${currentStudentName}\n\nMembers can collaborate here, ask doubts in the room discussion, and share key exam insights.`,
          insight: "Share your doubts or problem solutions in the room discussion below."
        }
      ]
    };

    setRooms((prev) => [newRoom, ...prev]);
    setActiveRoomId(newRoom.id);
    setCurrentPage(1);
    setShowCreateModal(false);
    setViewMode("details");
    setNewGroupData({
      title: "",
      subject: SUBJECT_OPTIONS[0],
      topic: "",
      description: "",
      documentTitle: "",
      schedule: "Daily 5:00 PM"
    });
    setFormError("");
    triggerToast(`🎉 Study group "${newRoom.title}" created successfully!`);
  };

  // Find document content for current page
  const pageSection =
    activeRoom?.documentSections?.find((s) => s.page === currentPage) || {
      title: `Page ${currentPage}: Study Material`,
      text: "Collaborative notes for this study topic.",
      insight: "Key concept review for semester exam."
    };

  return (
    <AppLayout activePath="/group-study">
      <div className="group-study-page-root">
        {/* Toast Feedback */}
        {toastMessage && (
          <div className="study-toast">
            <Sparkles size={14} className="toast-sparkle" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header Banner */}
        <header className="group-study-header">
          <div>
            <div className="study-tag-row">
              <span className="study-badge">Academic Study Circles</span>
              <span className="study-status">👥 {rooms.length} Active Circles</span>
            </div>
            <h1 className="study-main-title">{t("groupStudy.title", "Group Study Circles")}</h1>
            <p className="study-sub-text">
              {t("groupStudy.subtitle", "Join peer-led study groups to revise difficult semester concepts, discuss verified lecture notes, and prepare for exams collaboratively.")}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {viewMode === "details" && (
              <button
                type="button"
                onClick={() => setViewMode("browse")}
                className="btn-back-to-groups"
              >
                <ArrowLeft size={14} />
                <span>All Study Circles</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setFormError("");
                setShowCreateModal(true);
              }}
              className="pomodoro-btn-run"
              style={{ padding: "9px 18px", fontSize: "13px" }}
            >
              <Plus size={14} />
              <span>{t("groupStudy.createCircleBtn", "Create Study Group")}</span>
            </button>
          </div>
        </header>

        {/* VIEW 1: BROWSE GROUPS */}
        {viewMode === "browse" && (
          <div className="group-study-browse-section">
            {/* Search and Discovery Head Bar */}
            <div className="browse-head-bar">
              <div className="browse-search-box">
                <Search size={15} style={{ color: "#8D857D" }} />
                <input
                  type="text"
                  placeholder="Search groups by topic, subject, code, or host..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#8D857D" }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <span style={{ fontSize: "13px", color: "#8D857D", fontWeight: "600" }}>
                Showing {filteredRooms.length} of {rooms.length} Study Circles
              </span>
            </div>

            {/* Subject Filter Category Pills */}
            <div className="group-study-subject-filters">
              {CATEGORY_CHIPS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`group-filter-chip ${selectedCategory === cat ? "active" : ""}`}
                >
                  {cat === "All Circles" && "📚 "}
                  {cat === "Data Structures" && "🌳 "}
                  {cat === "DBMS" && "🗄️ "}
                  {cat === "Operating Systems" && "⚡ "}
                  {cat === "Computer Networks" && "🌐 "}
                  {cat}
                </button>
              ))}
            </div>

            {/* Empty State */}
            {filteredRooms.length === 0 ? (
              <div className="group-empty-state">
                <div className="group-empty-icon">
                  <Users size={36} />
                </div>
                <h3>No Study Circles Found</h3>
                <p>
                  No active study groups match your search or selected subject. You can reset filters or start a new group.
                </p>
                <div style={{ display: "inline-flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All Circles");
                    }}
                    className="btn-modal-cancel"
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <RotateCcw size={13} />
                    <span>Reset Filters</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormError("");
                      setShowCreateModal(true);
                    }}
                    className="btn-modal-submit"
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <Plus size={13} />
                    <span>Create Study Group</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Groups Cards Grid */
              <div className="groups-grid">
                {filteredRooms.map((room) => (
                  <div key={room.id} className="group-study-card">
                    {/* Top Row: Subject Tag, Code Pill & Schedule/Status */}
                    <div className="group-card-top">
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                        <span className="group-subject-tag">{room.subject}</span>
                        <span className="group-code-pill">{room.code}</span>
                      </div>
                      {room.status && (
                        <span className="group-status-pill">{room.status}</span>
                      )}
                    </div>

                    <h3 className="group-card-title">{room.title}</h3>
                    <p className="group-card-desc">{room.description}</p>

                    {/* Schedule Badge */}
                    {room.schedule && (
                      <div style={{ marginBottom: "10px" }}>
                        <span className="group-schedule-tag">
                          <Clock size={11} />
                          <span>{room.schedule}</span>
                        </span>
                      </div>
                    )}

                    {/* Resource Material Pill */}
                    {room.documentTitle && (
                      <div className="group-resource-pill">
                        <FileText size={12} />
                        <span>{room.documentTitle}</span>
                      </div>
                    )}

                    {/* Host & Members Strip */}
                    <div className="group-card-meta">
                      <div className="group-host-info">
                        <span style={{ color: "#8D857D" }}>Host:</span>
                        <span>{room.host}</span>
                      </div>
                      <span className="group-members-badge">
                        👥 {room.membersCount} {room.membersCount === 1 ? "Member" : "Members"}
                      </span>
                    </div>

                    {/* Card Actions */}
                    <div className="group-card-actions">
                      <button
                        type="button"
                        onClick={() => handleViewDetails(room.id)}
                        className="btn-group-view"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
                      >
                        <BookOpen size={13} />
                        <span>View Notes</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleJoin(room.id)}
                        className={`btn-group-join ${room.isJoined ? "joined" : ""}`}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
                      >
                        {room.isJoined ? "✓ Joined (Leave)" : "+ Join Group"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: GROUP DETAILS & STUDY WORKSPACE */}
        {viewMode === "details" && activeRoom && (
          <div>
            {/* Room Selector Pills */}
            <div className="rooms-selector-bar">
              <span className="rooms-label">Available Circles:</span>
              <div className="rooms-pills-list">
                {rooms.map((room) => {
                  const isSelected = room.id === activeRoom.id;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => {
                        setActiveRoomId(room.id);
                        setCurrentPage(room.defaultPage || 1);
                      }}
                      className={`room-pill-btn ${isSelected ? "active" : ""}`}
                    >
                      <span className="pill-code">{room.code}</span>
                      <span className="pill-title">{room.subject}</span>
                      <span className="pill-members">👥 {room.membersCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Collaboration Workspace Grid */}
            <div className="study-workspace-grid">
              {/* Study Document Canvas (Left Column) */}
              <div className="study-document-canvas">
                <div className="canvas-header-bar">
                  <div className="doc-meta-info">
                    <span className="doc-title">{activeRoom.title}</span>
                    <span className="doc-subject">
                      {activeRoom.subject} · {activeRoom.documentTitle}
                    </span>
                  </div>

                  {/* Page Controls */}
                  <div className="doc-page-controls">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage <= 1}
                      className="page-nav-btn"
                      title="Previous Page"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="page-indicator">
                      Page {currentPage} of {activeRoom.totalPages || 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((p) =>
                          Math.min(activeRoom.totalPages || 1, p + 1)
                        )
                      }
                      disabled={currentPage >= (activeRoom.totalPages || 1)}
                      className="page-nav-btn"
                      title="Next Page"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Clean Document Content Sheet */}
                <div className="document-sheet">
                  <div className="document-inner-text">
                    <h3 className="sheet-heading">{pageSection.title}</h3>
                    <div className="sheet-divider" />
                    <p className="sheet-body-text">{pageSection.text}</p>

                    {pageSection.insight && (
                      <div className="sheet-callout-box">
                        <span className="callout-title">Exam Revision Key Insight:</span>
                        <p className="callout-text">{pageSection.insight}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Bar in Canvas */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "14px",
                    borderTop: "1px solid #D6D0C8",
                    fontSize: "12.5px",
                    color: "#8D857D"
                  }}
                >
                  <span>
                    Study Resource: <strong>{activeRoom.documentTitle}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleJoin(activeRoom.id)}
                    className={`btn-group-join ${activeRoom.isJoined ? "joined" : ""}`}
                    style={{ padding: "6px 14px", fontSize: "12px" }}
                  >
                    {activeRoom.isJoined ? "✓ Joined (Leave)" : "+ Join This Group"}
                  </button>
                </div>
              </div>

              {/* Participants & Discussion (Right Column) */}
              <div className="study-sidebar-column">
                {/* Participants Card */}
                <div className="participants-card">
                  <div className="card-section-title">
                    <Users size={16} />
                    <span>
                      Active Participants ({activeRoom.membersCount})
                    </span>
                  </div>

                  <div className="participants-list">
                    {activeRoom.activeStudents.map((student) => (
                      <div key={student.id} className="participant-row">
                        <div className="participant-avatar">
                          {student.initials}
                        </div>
                        <div className="participant-info">
                          <div className="participant-name-row">
                            <span className="participant-name">
                              {student.name}
                            </span>
                            {student.isCurrentUser && (
                              <span className="you-chip">You</span>
                            )}
                          </div>
                          <div className="participant-status-row">
                            <span className="status-online-dot" />
                            <span className="status-online-text">
                              {student.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Room Discussion / Doubts */}
                <div className="study-chat-card">
                  <div className="card-section-title">
                    <span>Room Discussion &amp; Doubts</span>
                  </div>

                  <div className="chat-messages-container">
                    {activeRoom.chat.map((msg) => (
                      <div key={msg.id} className="chat-msg-row">
                        <div className="msg-avatar">{msg.avatar}</div>
                        <div className="msg-bubble">
                          <div className="msg-header">
                            <span className="msg-sender">{msg.sender}</span>
                            <span className="msg-time">{msg.time}</span>
                          </div>
                          <p className="msg-text">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="chat-input-form">
                    <input
                      type="text"
                      placeholder="Post a doubt or note for this circle..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="chat-input-field"
                    />
                    <button
                      type="submit"
                      className="chat-send-btn"
                      aria-label="Send message"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CREATE STUDY GROUP MODAL */}
        {showCreateModal && (
          <div
            className="group-modal-overlay"
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="group-modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="group-modal-header">
                <div>
                  <h3>Create New Study Group</h3>
                  <p>Start a peer study circle for your semester subject.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="group-modal-close"
                >
                  ✕
                </button>
              </div>

              {formError && (
                <div className="group-form-error">{formError}</div>
              )}

              <form onSubmit={handleCreateGroupSubmit}>
                <div className="group-form-group">
                  <label>Group Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Graph Algorithms & Dijkstra Walkthrough"
                    value={newGroupData.title}
                    onChange={(e) => {
                      setNewGroupData({ ...newGroupData, title: e.target.value });
                      if (formError) setFormError("");
                    }}
                    className="group-form-input"
                  />
                </div>

                <div className="group-form-group">
                  <label>Subject Course *</label>
                  <select
                    value={newGroupData.subject}
                    onChange={(e) =>
                      setNewGroupData({ ...newGroupData, subject: e.target.value })
                    }
                    className="group-form-select"
                  >
                    {SUBJECT_OPTIONS.map((subj) => (
                      <option key={subj} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="group-form-group">
                  <label>Syllabus Topic / Focus Area *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shortest Path Trees, Adjacency Lists, Priority Queues"
                    value={newGroupData.topic}
                    onChange={(e) => {
                      setNewGroupData({ ...newGroupData, topic: e.target.value });
                      if (formError) setFormError("");
                    }}
                    className="group-form-input"
                  />
                </div>

                <div className="group-form-group">
                  <label>Schedule / Meeting Timing (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Daily 5:00 PM – 6:30 PM or Weekends 11 AM"
                    value={newGroupData.schedule}
                    onChange={(e) =>
                      setNewGroupData({ ...newGroupData, schedule: e.target.value })
                    }
                    className="group-form-input"
                  />
                </div>

                <div className="group-form-group">
                  <label>Brief Description (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe what this group will revise together..."
                    value={newGroupData.description}
                    onChange={(e) =>
                      setNewGroupData({
                        ...newGroupData,
                        description: e.target.value
                      })
                    }
                    className="group-form-textarea"
                  />
                </div>

                <div className="group-form-group">
                  <label>Referenced Notes / Document Title (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Unit 4: Graphs & Greedy Algorithms.pdf"
                    value={newGroupData.documentTitle}
                    onChange={(e) =>
                      setNewGroupData({
                        ...newGroupData,
                        documentTitle: e.target.value
                      })
                    }
                    className="group-form-input"
                  />
                </div>

                <div className="group-modal-actions">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-modal-cancel"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-modal-submit">
                    Create &amp; Start Circle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
