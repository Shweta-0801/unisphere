import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Plus,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  BookOpen
} from "lucide-react";

import AttendanceHeader from "../components/attendance/AttendanceHeader";
import AttendanceNavigation from "../components/attendance/AttendanceNavigation";
import OverallStats from "../components/attendance/OverallStats";
import SubjectCard from "../components/attendance/SubjectCard";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import AttendancePredictor from "../components/attendance/AttendancePredictor";
import RecordAttendance from "../components/attendance/RecordAttendance";
import AttendanceCalculator from "../components/attendance/AttendanceCalculator";
import SubjectDetails from "../components/attendance/SubjectDetails";
import AddSubjectModal from "../components/attendance/AddSubjectModal";
import { loadFromStorage, saveToStorage } from "../utils/storage";

// Pure CSS3 Stylesheet for the attendance module
import "../components/attendance/Attendance.css";

const DEFAULT_SUBJECTS = [
  {
    id: 1,
    name: "Data Structures & Algorithms",
    code: "CS-301",
    faculty: "Dr. Rajesh Sharma",
    attended: 18,
    total: 20,
    color: "blue"
  },
  {
    id: 2,
    name: "Database Management Systems",
    code: "CS-302",
    faculty: "Prof. Sunita Rao",
    attended: 16,
    total: 20,
    color: "purple"
  },
  {
    id: 3,
    name: "Java Programming & OOP",
    code: "CS-303",
    faculty: "Dr. Amit Verma",
    attended: 19,
    total: 22,
    color: "emerald"
  },
  {
    id: 4,
    name: "Computer Networks & Security",
    code: "CS-304",
    faculty: "Prof. Priya Nair",
    attended: 13,
    total: 18,
    color: "rose"
  }
];

function AttendancePage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Overview");

  // Global target percentage (default 75%)
  const [targetPercentage, setTargetPercentage] = useState(() => {
    return loadFromStorage("attendanceTargetPercentage", 75);
  });

  // Subjects state with backward compatibility
  const [subjects, setSubjects] = useState(() => {
    const saved = loadFromStorage("attendanceSubjects", null);
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      return DEFAULT_SUBJECTS;
    }
    return saved.map((s, idx) => ({
      ...s,
      code: s.code || `CS-30${idx + 1}`,
      faculty: s.faculty || "Course Faculty",
      color: s.color || ["blue", "purple", "emerald", "amber", "rose"][idx % 5]
    }));
  });

  // Search & Filter in Overview
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all' | 'safe' | 'risk'

  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState(null);
  const [selectedDetailSubjectId, setSelectedDetailSubjectId] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);
  const [lastUndoAction, setLastUndoAction] = useState(null);

  // Sync to storage
  useEffect(() => {
    saveToStorage("attendanceSubjects", subjects);
  }, [subjects]);

  useEffect(() => {
    saveToStorage("attendanceTargetPercentage", targetPercentage);
  }, [targetPercentage]);

  // Overall totals
  const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
  const attendedClasses = subjects.reduce((sum, s) => sum + s.attended, 0);

  // Counts of safe vs at risk
  const safeSubjectsCount = subjects.filter((s) => {
    const pct = s.total > 0 ? (s.attended / s.total) * 100 : 0;
    return pct >= targetPercentage;
  }).length;

  const atRiskCount = subjects.length - safeSubjectsCount;

  // Filtered subjects for Overview
  const filteredSubjects = subjects.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.code && s.code.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    const pct = s.total > 0 ? (s.attended / s.total) * 100 : 0;
    if (filterStatus === "safe") return pct >= targetPercentage;
    if (filterStatus === "risk") return pct < targetPercentage;
    return true;
  });

  // Quick 1-click attendance logger with Undo
  function handleQuickLog(subjectId, status) {
    const prevSubjects = [...subjects];
    const targetSub = subjects.find((s) => s.id === subjectId);

    const updated = subjects.map((sub) => {
      if (sub.id !== subjectId) return sub;

      return {
        ...sub,
        attended: status === "present" ? sub.attended + 1 : sub.attended,
        total: sub.total + 1
      };
    });

    setSubjects(updated);

    // Provide Undo option
    setLastUndoAction(() => () => {
      setSubjects(prevSubjects);
      showToast(`Undid marking for ${targetSub?.name}`, "info");
    });

    showToast(
      `Marked ${status === "present" ? "Present" : "Absent"} for ${targetSub?.name}`,
      "success",
      true
    );
  }

  function showToast(message, type = "success", canUndo = false) {
    setToast({ message, type, canUndo });
    setTimeout(() => {
      setToast((cur) => (cur?.message === message ? null : cur));
    }, 4500);
  }

  function handleAddOrEditSubject(subjectData) {
    if (subjectToEdit) {
      setSubjects((prev) =>
        prev.map((s) => (s.id === subjectData.id ? subjectData : s))
      );
      showToast(`Updated ${subjectData.name}`);
    } else {
      setSubjects((prev) => [...prev, subjectData]);
      showToast(`Added ${subjectData.name} to courses`);
    }
    setSubjectToEdit(null);
  }

  function handleDeleteSubject(subjectId) {
    const sub = subjects.find((s) => s.id === subjectId);
    if (window.confirm(`Are you sure you want to remove "${sub?.name}"?`)) {
      const prev = [...subjects];
      setSubjects((current) => current.filter((s) => s.id !== subjectId));
      setLastUndoAction(() => () => setSubjects(prev));
      showToast(`Removed ${sub?.name}`, "info", true);
    }
  }

  function handleOpenEditModal(subject) {
    setSubjectToEdit(subject);
    setIsAddModalOpen(true);
  }

  function handleViewDetails(subjectId) {
    setSelectedDetailSubjectId(subjectId);
    setActiveSection("Subject Details");
  }

  return (
    <div className="att-page">
      {/* Top Navigation Bar */}
      <header className="att-top-bar">
        <div className="att-top-bar-inner">
          <div className="att-top-bar-left">
            <button
              onClick={() => navigate("/dashboard")}
              className="att-back-btn"
            >
              <ArrowLeft style={{ width: "1rem", height: "1rem" }} />
              <span>Dashboard</span>
            </button>
            <div className="att-breadcrumb-divider" />
            <span className="att-breadcrumb-text">
              Academic Performance • Attendance
            </span>
          </div>

          <div>
            <button
              onClick={() => {
                setSubjectToEdit(null);
                setIsAddModalOpen(true);
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1rem",
                borderRadius: "var(--att-radius-sm)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#ffffff",
                background: "var(--att-primary)",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)"
              }}
            >
              <Plus style={{ width: "0.875rem", height: "0.875rem", strokeWidth: 2.5 }} />
              <span>New Subject</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="att-main">
        
        {/* Header Hero Banner */}
        <AttendanceHeader
          targetPercentage={targetPercentage}
          setTargetPercentage={setTargetPercentage}
          onOpenAddModal={() => {
            setSubjectToEdit(null);
            setIsAddModalOpen(true);
          }}
          totalSubjects={subjects.length}
          safeSubjectsCount={safeSubjectsCount}
        />

        {/* Section Navigation Tabs */}
        <AttendanceNavigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          atRiskCount={atRiskCount}
        />

        {/* ================= OVERVIEW SECTION ================= */}
        {activeSection === "Overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Overall Statistics & Gauge */}
            <OverallStats
              totalClasses={totalClasses}
              attendedClasses={attendedClasses}
              targetPercentage={targetPercentage}
            />

            {/* Subject Section Controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="att-toolbar">
                <div className="att-section-title-wrap">
                  <h2>
                    <span>Enrolled Course Attendance</span>
                    <span className="att-count-pill">
                      {filteredSubjects.length} {filteredSubjects.length === 1 ? "Subject" : "Subjects"}
                    </span>
                  </h2>
                  <p>
                    Click + Present or + Absent on any card for instant 1-click recording.
                  </p>
                </div>

                {/* Search & Filter pills */}
                <div className="att-controls-group">
                  <div className="att-search-input-wrap">
                    <Search className="att-search-icon" />
                    <input
                      type="text"
                      placeholder="Search subject..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="att-search-input"
                    />
                  </div>

                  <div className="att-filter-pill-box">
                    <button
                      onClick={() => setFilterStatus("all")}
                      className={`att-filter-pill-btn all ${filterStatus === "all" ? "active" : ""}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterStatus("safe")}
                      className={`att-filter-pill-btn safe ${filterStatus === "safe" ? "active" : ""}`}
                    >
                      Safe
                    </button>
                    <button
                      onClick={() => setFilterStatus("risk")}
                      className={`att-filter-pill-btn risk ${filterStatus === "risk" ? "active" : ""}`}
                    >
                      At Risk
                    </button>
                  </div>
                </div>
              </div>

              {/* Subject Cards Grid */}
              {filteredSubjects.length === 0 ? (
                <div style={{
                  background: "var(--att-surface)",
                  borderRadius: "var(--att-radius-xl)",
                  padding: "3rem 1.5rem",
                  textAlign: "center",
                  border: "1px solid var(--att-border)",
                  boxShadow: "var(--att-shadow-xs)"
                }}>
                  <BookOpen style={{ width: "2.5rem", height: "2.5rem", color: "var(--att-text-subtle)", margin: "0 auto 0.75rem auto" }} />
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--att-text-main)", margin: 0 }}>No subjects found</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", margin: "0.35rem auto 1rem auto", maxWidth: "20rem" }}>
                    No courses match your query or filter. Try clearing the search or add a new subject.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterStatus("all");
                    }}
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--att-primary)",
                      background: "var(--att-primary-light)",
                      border: "none",
                      borderRadius: "var(--att-radius-sm)",
                      cursor: "pointer"
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="att-subject-grid">
                  {filteredSubjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      targetPercentage={targetPercentage}
                      onQuickLog={handleQuickLog}
                      onEdit={handleOpenEditModal}
                      onDelete={handleDeleteSubject}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= CALENDAR SECTION ================= */}
        {activeSection === "Calendar" && (
          <AttendanceCalendar
            subjects={subjects}
            onQuickLog={handleQuickLog}
          />
        )}

        {/* ================= RECORD ATTENDANCE REGISTER ================= */}
        {activeSection === "Record Attendance" && (
          <RecordAttendance
            subjects={subjects}
            setSubjects={setSubjects}
          />
        )}

        {/* ================= CALCULATOR SECTION ================= */}
        {activeSection === "Calculator" && (
          <AttendanceCalculator
            subjects={subjects}
          />
        )}

        {/* ================= PREDICTOR SECTION ================= */}
        {activeSection === "Predictor" && (
          <AttendancePredictor
            subjects={subjects}
            targetPercentage={targetPercentage}
          />
        )}

        {/* ================= SUBJECT DETAILS SECTION ================= */}
        {activeSection === "Subject Details" && (
          <SubjectDetails
            key={selectedDetailSubjectId || "default"}
            subjects={subjects}
            initialSubjectId={selectedDetailSubjectId}
            targetPercentage={targetPercentage}
            onEditSubject={handleOpenEditModal}
            onQuickLog={handleQuickLog}
          />
        )}

      </main>

      {/* Add / Edit Subject Modal */}
      <AddSubjectModal
        key={subjectToEdit ? subjectToEdit.id : "new"}
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSubjectToEdit(null);
        }}
        onSave={handleAddOrEditSubject}
        subjectToEdit={subjectToEdit}
      />

      {/* Floating Action Toast */}
      {toast && (
        <div className="att-floating-toast">
          {toast.type === "success" ? (
            <CheckCircle2 style={{ width: "1rem", height: "1rem", color: "#34d399", flexShrink: 0 }} />
          ) : (
            <AlertCircle style={{ width: "1rem", height: "1rem", color: "#60a5fa", flexShrink: 0 }} />
          )}
          <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{toast.message}</span>
          {toast.canUndo && lastUndoAction && (
            <button
              onClick={() => {
                lastUndoAction();
                setToast(null);
              }}
              className="att-undo-link"
            >
              <RotateCcw style={{ width: "0.75rem", height: "0.75rem", display: "inline", verticalAlign: "middle", marginRight: "2px" }} />
              Undo
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AttendancePage;