import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  BookOpen,
  CheckCircle2,
  Users,
  Plus,
  ArrowRight,
  Filter,
  Check
} from "lucide-react";
import {
  teacherProfile,
  classesList,
  syllabusLectures,
  getClassMetrics
} from "../../data/teacherDashboardData";
import { useAuth } from "../../context/AuthContext";

export default function AttendanceCalendar({
  students,
  selectedClass,
  onSelectClass
}) {
  const { user } = useAuth();
  const teacherName = user?.name || teacherProfile.name;
  const [filterMonth, setFilterMonth] = useState("all"); // "all" | "sep" | "oct"
  const [newTopic, setNewTopic] = useState("");
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [customLectures, setCustomLectures] = useState([]);
  const [feedback, setFeedback] = useState("");

  const metrics = getClassMetrics(students, selectedClass);

  // Combine default 18 syllabus lectures with any extra custom ones added by teacher
  const allLectures = [
    ...syllabusLectures.map((lec, idx) => {
      // Deterministic turnout based on class & lecture
      const basePresent = selectedClass === "CSE-C" ? 18 : selectedClass === "CSE-A" ? 17 : 16;
      const variation = (idx % 3 === 0 ? 1 : idx % 2 === 0 ? 0 : -1);
      const presentCount = Math.min(20, Math.max(14, basePresent + variation));
      const turnoutPct = Number(((presentCount / 20) * 100).toFixed(1));

      return {
        ...lec,
        presentCount,
        totalEnrolled: 20,
        turnoutPct,
        status: "Conducted"
      };
    }),
    ...customLectures.filter((lec) => lec.className === selectedClass)
  ];

  // Filter lectures
  const filteredLectures = allLectures.filter((lec) => {
    if (filterMonth === "sep") return lec.date.includes("-09-");
    if (filterMonth === "oct") return lec.date.includes("-10-");
    return true;
  });

  // Handle adding new lecture during viva
  const handleAddLecture = (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    const newLec = {
      id: Date.now(),
      date: newDate,
      topic: newTopic.trim(),
      presentCount: 18,
      totalEnrolled: 20,
      turnoutPct: 90.0,
      status: "Conducted",
      className: selectedClass
    };

    setCustomLectures((prev) => [...prev, newLec]);
    setNewTopic("");
    setShowAddModal(false);
    setFeedback(`Lecture successfully scheduled and conducted for ${selectedClass}!`);
    setTimeout(() => setFeedback(""), 3500);
  };

  return (
    <div className="tchr-calendar-view">
      {/* Feedback Alert */}
      {feedback && (
        <div className="tchr-alert-toast">
          <CheckCircle2 size={16} className="text-success" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Header with Section Selection */}
      <div className="tchr-section-header-box">
        <div className="tchr-header-left">
          <span className="tchr-sub-tag">18 Scheduled &amp; Conducted Lectures • Fall Term 2026</span>
          <h2 className="tchr-section-heading">Course Calendar &amp; Lecture History</h2>
          <p className="tchr-section-description">
            Lecture logs for <strong>{teacherName}</strong> teaching <strong>{teacherProfile.subject}</strong> ({teacherProfile.subjectCode}).
          </p>
        </div>

        {/* Section Tabs */}
        <div className="tchr-class-pills-bar">
          <span className="tchr-pills-label">View Class:</span>
          <div className="tchr-pills-group">
            {classesList.map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => onSelectClass(cls)}
                className={`tchr-class-pill-btn ${selectedClass === cls ? "active" : ""}`}
              >
                <span>{cls}</span>
                <span className="tchr-pill-count">18 Lec</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Banner for selected class */}
      <div className="tchr-cal-summary-card">
        <div className="tchr-cal-meta-left">
          <div className="tchr-cal-icon-box">
            <CalendarIcon size={24} />
          </div>
          <div>
            <h3 className="tchr-cal-title">Section {selectedClass} • Lecture Attendance Log</h3>
            <p className="tchr-cal-subtitle">
              18 classes held spanning September 01 to October 10, 2026.
            </p>
          </div>
        </div>

        <div className="tchr-cal-meta-right">
          <div className="tchr-cal-stat-chip">
            <span className="chip-label">Lectures Conducted</span>
            <strong className="chip-val">{allLectures.length} Classes</strong>
          </div>
          <div className="tchr-cal-stat-chip">
            <span className="chip-label">Class Average Turnout</span>
            <strong className="chip-val text-success">{metrics.avgAttendance}%</strong>
          </div>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="tchr-btn-primary sm"
          >
            <Plus size={14} />
            <span>Conduct New Lecture</span>
          </button>
        </div>
      </div>

      {/* Filter Month */}
      <div className="tchr-cal-filters-bar">
        <span className="tchr-cal-filter-lbl">Filter by Month:</span>
        <div className="tchr-cal-tabs">
          <button
            type="button"
            onClick={() => setFilterMonth("all")}
            className={`tchr-cal-tab-btn ${filterMonth === "all" ? "active" : ""}`}
          >
            All Lectures ({allLectures.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMonth("sep")}
            className={`tchr-cal-tab-btn ${filterMonth === "sep" ? "active" : ""}`}
          >
            September 2026 (13 Lectures)
          </button>
          <button
            type="button"
            onClick={() => setFilterMonth("oct")}
            className={`tchr-cal-tab-btn ${filterMonth === "oct" ? "active" : ""}`}
          >
            October 2026 (5 Lectures)
          </button>
        </div>
      </div>

      {/* Lecture List Table */}
      <div className="tchr-table-card-container">
        <div className="tchr-responsive-table-wrap">
          <table className="tchr-data-table">
            <thead>
              <tr>
                <th style={{ width: "90px" }}>Lec #</th>
                <th style={{ width: "130px" }}>Date</th>
                <th>Syllabus Topic Covered</th>
                <th style={{ width: "160px", textAlign: "center" }}>Students Present</th>
                <th style={{ width: "160px" }}>Turnout %</th>
                <th style={{ width: "120px", textAlign: "center" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLectures.map((lec, idx) => (
                <tr key={lec.id || idx}>
                  <td>
                    <span className="tchr-lec-badge">L-{idx + 1}</span>
                  </td>
                  <td>
                    <span className="tchr-cell-date">{lec.date}</span>
                  </td>
                  <td>
                    <div className="tchr-topic-cell">
                      <BookOpen size={14} className="tchr-topic-icon" />
                      <span className="tchr-topic-text">{lec.topic}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="tchr-stat-cell-num">
                      <strong>{lec.presentCount}</strong> / {lec.totalEnrolled}
                    </span>
                  </td>
                  <td>
                    <div className="tchr-pct-display-wrap">
                      <div className="tchr-pct-text-row">
                        <strong className="tchr-pct-val">{lec.turnoutPct}%</strong>
                      </div>
                      <div className="tchr-mini-track">
                        <div
                          className={`tchr-mini-fill ${
                            lec.turnoutPct >= 85 ? "fill-emerald" : "fill-amber"
                          }`}
                          style={{ width: `${lec.turnoutPct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="tchr-pill-safe">
                      <Check size={11} /> Conducted
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to add extra lecture */}
      {showAddModal && (
        <div className="tchr-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="tchr-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="tchr-modal-header">
              <h3 className="tchr-modal-title">Record / Conduct New Lecture</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="tchr-modal-close-btn"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddLecture} className="tchr-modal-form">
              <div className="tchr-form-group">
                <label>Target Section</label>
                <input
                  type="text"
                  value={selectedClass}
                  readOnly
                  className="tchr-form-input disabled"
                />
              </div>

              <div className="tchr-form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={`${teacherProfile.subject} (${teacherProfile.subjectCode})`}
                  readOnly
                  className="tchr-form-input disabled"
                />
              </div>

              <div className="tchr-form-group">
                <label htmlFor="lec-date">Lecture Date</label>
                <input
                  id="lec-date"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="tchr-form-input"
                  required
                />
              </div>

              <div className="tchr-form-group">
                <label htmlFor="lec-topic">Syllabus Topic / Description</label>
                <input
                  id="lec-topic"
                  type="text"
                  placeholder="e.g. Radix Sort & Counting Sort Analysis"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="tchr-form-input"
                  required
                />
              </div>

              <div className="tchr-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="tchr-btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="tchr-btn-primary"
                >
                  Confirm &amp; Record Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
