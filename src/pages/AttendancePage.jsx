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
    <AppLayout activePath="/attendance">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-20 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#E5DCD4] px-4 md:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#6B1E2D] text-white flex items-center justify-center shadow-xs">
              <GraduationCap size={18} />
            </div>
            <div>
              <h1 className="text-sm font-black text-[#241A1C] leading-none">
                Attendance & Performance Hub
              </h1>
              <p className="text-[11px] font-bold text-[#75666A] mt-0.5">
                Academic Session 2026 • 75% Minimum Cutoff Defense
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSubjectToEdit(null);
                setIsAddModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#6B1E2D] hover:bg-[#48121E] text-white text-xs font-bold shadow-sm shadow-[#6B1E2D]/20 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>New Course</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-6">
        
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
          <div className="space-y-8">
            {/* Overall Statistics & Gauge */}
            <OverallStats
              totalClasses={totalClasses}
              attendedClasses={attendedClasses}
              targetPercentage={targetPercentage}
            />

            {/* Courses Toolbar & Grid */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-[#241A1C] tracking-tight">
                      Enrolled Courses
                    </h2>
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#EFE8DC] text-[#75666A]">
                      {filteredSubjects.length} {filteredSubjects.length === 1 ? "Course" : "Courses"}
                    </span>
                  </div>
                  <p className="text-xs text-[#75666A] mt-0.5">
                    Click + Present or + Absent on any card for immediate 1-click attendance recording.
                  </p>
                </div>

                {/* Search & Filter pills */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative min-w-[200px]">
                    <Search className="w-4 h-4 text-[#B8A08A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#FFFDF8] border border-[#E5DCD4] rounded-xl text-xs font-medium text-[#241A1C] placeholder-[#75666A]/60 focus:outline-none focus:ring-2 focus:ring-[#B8A08A] focus:border-[#B8A08A] shadow-xs"
                    />
                  </div>

                  <div className="inline-flex p-1 rounded-xl bg-[#EFE8DC]">
                    <button
                      onClick={() => setFilterStatus("all")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        filterStatus === "all"
                          ? "bg-[#FFFDF8] text-[#6B1E2D] shadow-xs"
                          : "text-[#75666A] hover:text-[#241A1C]"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterStatus("safe")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        filterStatus === "safe"
                          ? "bg-[#FFFDF8] text-[#4F7A5A] shadow-xs"
                          : "text-[#75666A] hover:text-[#241A1C]"
                      }`}
                    >
                      Safe
                    </button>
                    <button
                      onClick={() => setFilterStatus("risk")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        filterStatus === "risk"
                          ? "bg-[#FFFDF8] text-[#A63D40] shadow-xs"
                          : "text-[#75666A] hover:text-[#241A1C]"
                      }`}
                    >
                      At Risk
                    </button>
                  </div>
                </div>
              </div>

              {/* Subject Cards Grid */}
              {filteredSubjects.length === 0 ? (
                <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-12 text-center shadow-sm">
                  <BookOpen className="w-10 h-10 text-[#B8A08A] mx-auto mb-3" />
                  <h3 className="text-base font-bold text-[#241A1C]">
                    No courses found
                  </h3>
                  <p className="text-xs text-[#75666A] mt-1 max-w-sm mx-auto">
                    No enrolled courses match your current search query or filter. Try resetting filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterStatus("all");
                    }}
                    className="mt-4 px-4 py-2 bg-[#FAF2F3] text-[#6B1E2D] hover:bg-[#FAF2F3]/80 text-xs font-bold rounded-xl transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
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
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#241A1C]/95 text-[#FFFDF8] shadow-2xl backdrop-blur-md border border-[#B8A08A]/30 text-xs font-medium animate-in fade-in slide-in-from-bottom-5 duration-200">
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-[#4F7A5A] shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-[#B8A08A] shrink-0" />
          )}
          <span>{toast.message}</span>
          {toast.canUndo && lastUndoAction && (
            <button
              onClick={() => {
                lastUndoAction();
                setToast(null);
              }}
              className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#B8A08A]/20 hover:bg-[#B8A08A]/35 text-[#FFFDF8] font-bold text-[11px] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Undo
            </button>
          )}
        </div>
      )}
    </AppLayout>
  );
}

export default AttendancePage;