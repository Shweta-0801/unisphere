import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Plus,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Filter,
  GraduationCap
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
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import { getStoredAttendanceHistory } from "../data/teacherData";
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

  // Sync to localStorage
  useEffect(() => {
    saveToStorage("attendanceSubjects", subjects);
  }, [subjects]);

  useEffect(() => {
    saveToStorage("attendanceTargetPercentage", targetPercentage);
  }, [targetPercentage]);

  // Sync when storage is updated externally (e.g. by Teacher Attendance Management)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = loadFromStorage("attendanceSubjects", null);
      if (saved && Array.isArray(saved) && saved.length > 0) {
        setSubjects(saved);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Aggregate metrics
  const totalClasses = subjects.reduce((sum, s) => sum + (s.total || 0), 0);
  const attendedClasses = subjects.reduce((sum, s) => sum + (s.attended || 0), 0);
  
  const safeSubjectsCount = subjects.filter((s) => {
    const pct = s.total > 0 ? (s.attended / s.total) * 100 : 0;
    return pct >= targetPercentage;
  }).length;

  const atRiskCount = Math.max(0, subjects.length - safeSubjectsCount);

  // Filtered subjects for Overview
  const filteredSubjects = subjects.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.code && s.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.faculty && s.faculty.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    const pct = s.total > 0 ? (s.attended / s.total) * 100 : 0;
    const isSafe = pct >= targetPercentage;

    if (filterStatus === "safe") return isSafe;
    if (filterStatus === "risk") return !isSafe;
    return true;
  });

  // Quick 1-Click logging with Undo stack
  function handleQuickLog(subjectId, type) {
    const previousSubjects = JSON.parse(JSON.stringify(subjects));

    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id === subjectId) {
          if (type === "present") {
            return { ...s, attended: s.attended + 1, total: s.total + 1 };
          } else if (type === "absent") {
            return { ...s, total: s.total + 1 };
          }
        }
        return s;
      })
    );

    const targetSub = subjects.find((s) => s.id === subjectId);
    const subName = targetSub ? targetSub.name : "Subject";

    setToast({
      message: `Marked +1 ${type === "present" ? "Present" : "Absent"} for ${subName}`,
      type: "success",
      canUndo: true
    });

    setLastUndoAction(() => () => {
      setSubjects(previousSubjects);
      setToast({ message: "Attendance action undone.", type: "info", canUndo: false });
      setTimeout(() => setToast(null), 2500);
    });

    setTimeout(() => {
      setToast((current) => (current?.canUndo ? null : current));
    }, 4500);
  }

  // CRUD Actions
  function handleAddOrEditSubject(payload) {
    if (subjectToEdit) {
      // Edit existing
      setSubjects((prev) =>
        prev.map((s) => (s.id === payload.id ? { ...s, ...payload } : s))
      );
      setToast({ message: `Updated ${payload.name}`, type: "success" });
    } else {
      // Add new
      setSubjects((prev) => [...prev, payload]);
      setToast({ message: `Enrolled ${payload.name}`, type: "success" });
    }
    setTimeout(() => setToast(null), 3000);
  }

  function handleDeleteSubject(subjectId) {
    const previousSubjects = JSON.parse(JSON.stringify(subjects));
    const targetSub = subjects.find((s) => s.id === subjectId);
    const name = targetSub ? targetSub.name : "Course";

    if (!window.confirm(`Are you sure you want to remove "${name}" from your attendance tracking?`)) {
      return;
    }

    setSubjects((prev) => prev.filter((s) => s.id !== subjectId));
    setToast({
      message: `Removed ${name}`,
      type: "info",
      canUndo: true
    });

    setLastUndoAction(() => () => {
      setSubjects(previousSubjects);
      setToast({ message: `Restored ${name}`, type: "success", canUndo: false });
      setTimeout(() => setToast(null), 2500);
    });

    setTimeout(() => {
      setToast((current) => (current?.canUndo ? null : current));
    }, 5000);
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
    <AppLayout activePath="/attendance">
      {/* Top Sticky Header */}
      <header className="att-top-bar">
        <div className="att-top-bar-inner">
          <div className="att-top-bar-left">
            <div className="att-top-bar-icon">
              <GraduationCap size={18} />
            </div>
            <div>
              <h1 className="att-top-bar-title">
                Attendance &amp; Performance Hub
              </h1>
              <p className="att-top-bar-sub">
                Academic Session 2026 • 75% Minimum Cutoff Defense
              </p>
            </div>
          </div>

          <div className="att-top-bar-actions">
            <button
              onClick={() => {
                setSubjectToEdit(null);
                setIsAddModalOpen(true);
              }}
              className="att-btn-new-course"
            >
              <Plus className="att-btn-new-course-icon" />
              <span>New Course</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="att-main">
        {/* Real-time Teacher Attendance Sync Banner */}
        <div style={{
          background: "#FAF9F6",
          border: "1px solid #D6D0C8",
          borderLeft: "4px solid #4F7A5A",
          borderRadius: "12px",
          padding: "10px 16px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4F7A5A", display: "inline-block" }} />
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#3B302A" }}>
              Teacher Attendance Sync Active:
            </span>
            <span style={{ fontSize: "12px", color: "#8D857D" }}>
              Student records are directly synchronized with Faculty Attendance Management.
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate("/attendance-management")}
            style={{
              background: "#EFEAE4",
              border: "1px solid #D6D0C8",
              borderRadius: "9999px",
              padding: "4px 12px",
              fontSize: "11px",
              fontWeight: "700",
              color: "#3B302A",
              cursor: "pointer"
            }}
          >
            Faculty Roll Call Register ↗
          </button>
        </div>

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
          <div className="att-overview-stack">
            {/* Overall Statistics & Gauge */}
            <OverallStats
              totalClasses={totalClasses}
              attendedClasses={attendedClasses}
              targetPercentage={targetPercentage}
            />

            {/* Courses Toolbar & Grid */}
            <div className="att-courses-stack">
              <div className="att-toolbar">
                <div>
                  <div className="att-courses-head-group">
                    <h2 className="att-courses-heading">
                      Enrolled Courses
                    </h2>
                    <span className="att-count-pill">
                      {filteredSubjects.length} {filteredSubjects.length === 1 ? "Course" : "Courses"}
                    </span>
                  </div>
                  <p className="att-courses-subtext">
                    Click + Present or + Absent on any card for immediate 1-click attendance recording.
                  </p>
                </div>

                {/* Search & Filter pills */}
                <div className="att-controls-group">
                  <div className="att-search-input-wrap">
                    <Search className="att-search-icon" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="att-search-input"
                    />
                  </div>

                  <div className="att-filter-pill-box">
                    <button
                      onClick={() => setFilterStatus("all")}
                      className={`att-filter-pill-btn ${filterStatus === "all" ? "active all" : ""}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterStatus("safe")}
                      className={`att-filter-pill-btn ${filterStatus === "safe" ? "active safe" : ""}`}
                    >
                      Safe
                    </button>
                    <button
                      onClick={() => setFilterStatus("risk")}
                      className={`att-filter-pill-btn ${filterStatus === "risk" ? "active risk" : ""}`}
                    >
                      At Risk
                    </button>
                  </div>
                </div>
              </div>

              {/* Subject Cards Grid */}
              {filteredSubjects.length === 0 ? (
                <div className="att-gauge-card att-empty-courses-card">
                  <BookOpen className="att-empty-icon" />
                  <h3 className="att-empty-title">
                    No courses found
                  </h3>
                  <p className="att-empty-desc">
                    No enrolled courses match your current search query or filter. Try resetting filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterStatus("all");
                    }}
                    className="att-empty-reset-btn"
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

        {/* ================= PREDICTOR SECTION ================= */}
        {activeSection === "Predictor" && (
          <AttendancePredictor
            subjects={subjects}
            targetPercentage={targetPercentage}
          />
        )}

        {/* ================= CALCULATOR SECTION ================= */}
        {activeSection === "Calculator" && (
          <AttendanceCalculator
            subjects={subjects}
          />
        )}

        {/* ================= RECORD ATTENDANCE REGISTER ================= */}
        {activeSection === "Record Attendance" && (
          <RecordAttendance
            subjects={subjects}
            setSubjects={setSubjects}
          />
        )}

        {/* ================= CALENDAR SECTION ================= */}
        {activeSection === "Calendar" && (
          <AttendanceCalendar
            subjects={subjects}
            onQuickLog={handleQuickLog}
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

      {/* Floating Action Toast with Undo */}
      {toast && (
        <div className="att-floating-toast">
          {toast.type === "success" ? (
            <CheckCircle2 className="att-toast-icon-success" />
          ) : (
            <AlertCircle className="att-toast-icon-warning" />
          )}
          <span>{toast.message}</span>
          {toast.canUndo && lastUndoAction && (
            <button
              onClick={() => {
                lastUndoAction();
                setToast(null);
              }}
              className="att-undo-link"
            >
              Undo
            </button>
          )}
        </div>
      )}
    </AppLayout>
  );
}

export default AttendancePage;