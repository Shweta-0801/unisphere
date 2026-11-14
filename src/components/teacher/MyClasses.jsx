import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Check,
  X,
  Sparkles,
  UserPlus,
  Trash2
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { assignedClassesData, sampleStudentsByClass } from "../../data/teacherData";
import { loadFromStorage, saveToStorage } from "../../utils/storage";
import "./MyClasses.css";
import EnrollStudentModal from "./EnrollStudentModal";
import { FACULTY_CLASSES_KEY, FACULTY_STUDENTS_KEY, removeStudent } from "../../utils/enrollmentService";

export default function MyClasses() {
  const { t } = useLanguage();
  // Storage keys for persisting teacher data
  const CLASSES_KEY = FACULTY_CLASSES_KEY || "unisphere_faculty_classes";
  const STUDENTS_KEY = FACULTY_STUDENTS_KEY || "unisphere_faculty_students";

  // 1. State: Assigned classes and Student rosters
  const [classesList, setClassesList] = useState(() =>
    loadFromStorage(CLASSES_KEY, assignedClassesData)
  );
  const [selectedClassId, setSelectedClassId] = useState(classesList[0]?.id || "cls-1");
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState(null);

  const [studentsByClass, setStudentsByClass] = useState(() =>
    loadFromStorage(STUDENTS_KEY, sampleStudentsByClass)
  );

  // 2. State: Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'atRisk' | 'safe'

  // 3. State: Modals
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // 4. State: Mark Attendance Session Form
  const [lectureDate, setLectureDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [lectureTopic, setLectureTopic] = useState("Binary Trees & Recursive Traversals");
  const [attendanceToggles, setAttendanceToggles] = useState({});

  // 5. Toast Feedback
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Currently selected class
  const currentClass = useMemo(() => {
    return classesList.find((c) => c.id === selectedClassId) || classesList[0];
  }, [classesList, selectedClassId]);

  // Students in currently selected class
  const currentStudents = useMemo(() => {
    return studentsByClass[selectedClassId] || [];
  }, [studentsByClass, selectedClassId]);

  // Save changes to localStorage
  useEffect(() => {
    saveToStorage(STUDENTS_KEY, studentsByClass);
  }, [studentsByClass, STUDENTS_KEY]);

  // Real-time synchronization across teacher modules & browser tabs
  useEffect(() => {
    const handleSync = () => {
      setStudentsByClass(loadFromStorage(STUDENTS_KEY, sampleStudentsByClass));
      setClassesList(loadFromStorage(CLASSES_KEY, assignedClassesData));
    };
    window.addEventListener("unisphere:student-enrolled", handleSync);
    window.addEventListener("unisphere:student-removed", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("unisphere:student-enrolled", handleSync);
      window.removeEventListener("unisphere:student-removed", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [STUDENTS_KEY, CLASSES_KEY]);

  // Live Summary Statistics for Selected Class
  const stats = useMemo(() => {
    const total = currentStudents.length;
    if (total === 0) return { total: 0, average: 0, atRisk: 0 };
    const totalPercentage = currentStudents.reduce((acc, s) => acc + s.attendancePercentage, 0);
    const average = (totalPercentage / total).toFixed(1);
    const atRisk = currentStudents.filter((s) => s.attendancePercentage < 75).length;
    return { total, average, atRisk };
  }, [currentStudents]);

  // Filter & Search Students
  const filteredStudents = useMemo(() => {
    return currentStudents.filter((student) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.rollNo.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (statusFilter === "atRisk") return student.attendancePercentage < 75;
      if (statusFilter === "safe") return student.attendancePercentage >= 75;
      return true;
    });
  }, [currentStudents, searchQuery, statusFilter]);

  // Open the "Mark Attendance" Modal
  const handleOpenAttendanceModal = () => {
    const initialMap = {};
    currentStudents.forEach((student) => {
      initialMap[student.id] = true;
    });
    setAttendanceToggles(initialMap);
    setIsAttendanceModalOpen(true);
  };

  // Toggle single student Present/Absent in modal
  const handleToggleAttendance = (studentId) => {
    setAttendanceToggles((prev) => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  // Shortcut: Mark all Present or Absent
  const handleSetAllAttendance = (isPresent) => {
    const newMap = {};
    currentStudents.forEach((s) => {
      newMap[s.id] = isPresent;
    });
    setAttendanceToggles(newMap);
  };

  // Save Attendance Session
  const handleSaveAttendance = (e) => {
    e.preventDefault();

    const formattedDate = new Date(lectureDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });

    const updatedRoster = currentStudents.map((student) => {
      const isPresent = !!attendanceToggles[student.id];
      const newAttended = isPresent ? student.classesAttended + 1 : student.classesAttended;
      const newTotal = student.totalClasses + 1;
      const newPercentage = Number(((newAttended / newTotal) * 100).toFixed(1));

      const newHistoryItem = {
        date: formattedDate,
        topic: lectureTopic.trim() || "Regular Lecture Session",
        status: isPresent ? "Present" : "Absent"
      };

      return {
        ...student,
        classesAttended: newAttended,
        totalClasses: newTotal,
        attendancePercentage: newPercentage,
        status: newPercentage < 75 ? "At Risk" : "Safe",
        history: [newHistoryItem, ...(student.history || [])]
      };
    });

    setStudentsByClass((prev) => ({
      ...prev,
      [selectedClassId]: updatedRoster
    }));

    setIsAttendanceModalOpen(false);
    showToast(`Attendance recorded for ${currentClass.code} (${formattedDate})!`);
  };

  // Save Mentorship Note for Student
  const handleSaveStudentNote = (studentId, note) => {
    setStudentsByClass((prev) => {
      const roster = prev[selectedClassId] || [];
      const updated = roster.map((s) =>
        s.id === studentId ? { ...s, mentorshipNotes: note } : s
      );
      return { ...prev, [selectedClassId]: updated };
    });

    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent((prev) => ({ ...prev, mentorshipNotes: note }));
    }
    showToast("Mentorship note saved successfully.");
  };

  // Execute student removal
  const handleExecuteRemove = () => {
    if (!studentToRemove) return;
    try {
      removeStudent({
        studentId: studentToRemove.id,
        rollNo: studentToRemove.rollNo,
        classId: selectedClassId
      });
      showToast(`Removed ${studentToRemove.name} from ${currentClass.code}.`);
      setStudentsByClass(loadFromStorage(STUDENTS_KEY, sampleStudentsByClass));
      setClassesList(loadFromStorage(CLASSES_KEY, assignedClassesData));
      if (selectedStudent && selectedStudent.id === studentToRemove.id) {
        setSelectedStudent(null);
      }
      setStudentToRemove(null);
    } catch (err) {
      showToast(err.message || "Failed to remove student.");
    }
  };

  return (
    <div className="mc-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="mc-toast">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="mc-header-card">
        <div className="mc-header-left">
          <div className="mc-badge">
            <BookOpen size={13} />
            <span>Faculty Class Management</span>
          </div>
          <h1 className="mc-title">{t("myClasses.title", "My Classes & Students")}</h1>
          <p className="mc-subtitle">
            {t(
              "myClasses.subtitle",
              "Select an assigned course to view the student directory, monitor attendance against the mandatory 75% cutoff, and record lecture roll calls."
            )}
          </p>
        </div>

        <div className="mc-header-actions" style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setIsEnrollModalOpen(true)}
            className="mc-btn mc-btn-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <UserPlus size={16} />
            <span>{t("myClasses.enrollStudentBtn", "Enroll New Student")}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAttendanceModal}
            className="mc-btn mc-btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <CheckCircle2 size={16} />
            <span>{t("myClasses.markAttendanceBtn", "Mark Today's Attendance")}</span>
          </button>
        </div>
      </div>

      {/* 2. Class Selector Buttons */}
      <div className="mc-class-selector">
        <span className="mc-selector-label">{t("myClasses.selectBatch", "Assigned Classes:")}</span>
        <div className="mc-class-buttons">
          {classesList.map((cls) => {
            const isSelected = cls.id === selectedClassId;
            const studentsCount = (studentsByClass[cls.id] || []).length;
            return (
              <button
                key={cls.id}
                type="button"
                onClick={() => {
                  setSelectedClassId(cls.id);
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className={`mc-class-btn ${isSelected ? "active" : ""}`}
              >
                <div className="mc-class-btn-code">{cls.code}</div>
                <div className="mc-class-btn-name">{cls.name}</div>
                <div className="mc-class-btn-meta">
                  {cls.section} • {studentsCount} Students
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Class Summary Stats */}
      <div className="mc-stats-grid">
        <div className="mc-stat-box">
          <span className="mc-stat-label">{t("myClasses.totalEnrolled", "Enrolled Students")}</span>
          <span className="mc-stat-val">{stats.total}</span>
          <span className="mc-stat-sub">Active in this section</span>
        </div>

        <div className="mc-stat-box">
          <span className="mc-stat-label">{t("myClasses.classAverage", "Average Attendance")}</span>
          <span className={`mc-stat-val ${Number(stats.average) >= 75 ? "stat-safe" : "stat-risk"}`}>
            {stats.average}%
          </span>
          <span className="mc-stat-sub">University cutoff is 75%</span>
        </div>

        <div className="mc-stat-box">
          <span className="mc-stat-label">{t("myClasses.studentsAtRisk", "Students Below 75% Cutoff")}</span>
          <span className={`mc-stat-val ${stats.atRisk > 0 ? "stat-risk" : "stat-safe"}`}>
            {stats.atRisk} At Risk
          </span>
          <span className="mc-stat-sub">Requires attendance condonation notice</span>
        </div>
      </div>

      {/* 4. Student Roster with Search and Filters */}
      <div className="mc-roster-card">
        {/* Search & Filter Bar */}
        <div className="mc-toolbar">
          <div className="mc-search-box">
            <Search size={16} className="mc-search-icon" />
            <input
              type="text"
              placeholder={t("myClasses.searchPlaceholder", "Search students by name or roll number...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mc-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mc-clear-btn"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="mc-filter-pills">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`mc-filter-btn ${statusFilter === "all" ? "active" : ""}`}
            >
              {t("myClasses.allStudents", "All Students")} ({currentStudents.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("atRisk")}
              className={`mc-filter-btn filter-risk ${statusFilter === "atRisk" ? "active" : ""}`}
            >
              <AlertTriangle size={12} />
              <span>{t("myClasses.atRiskStudents", "Below 75%")} ({stats.atRisk})</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("safe")}
              className={`mc-filter-btn filter-safe ${statusFilter === "safe" ? "active" : ""}`}
            >
              <CheckCircle2 size={12} />
              <span>{t("myClasses.safeStudents", "Safe ≥ 75%")} ({stats.total - stats.atRisk})</span>
            </button>
          </div>
        </div>

        {/* Student Table */}
        {filteredStudents.length === 0 ? (
          <div className="mc-empty-state">
            <Users size={36} className="mc-empty-icon" />
            <h3>No students found</h3>
            <p>Try adjusting your search query or reset the filter.</p>
          </div>
        ) : (
          <div className="mc-table-wrapper">
            <table className="mc-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Student Name</th>
                  <th>Classes Attended</th>
                  <th>Attendance %</th>
                  <th>Cutoff Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const isBelowCutoff = student.attendancePercentage < 75;
                  return (
                    <tr key={student.id} className={isBelowCutoff ? "row-risk" : ""}>
                      <td>
                        <code className="mc-roll-code">{student.rollNo}</code>
                      </td>
                      <td>
                        <div className="mc-student-name">{student.name}</div>
                        <div className="mc-student-email">{student.email}</div>
                      </td>
                      <td>
                        <strong>{student.classesAttended}</strong> / {student.totalClasses} classes
                      </td>
                      <td>
                        <span className={`mc-pct-val ${isBelowCutoff ? "stat-risk" : "stat-safe"}`}>
                          {student.attendancePercentage}%
                        </span>
                      </td>
                      <td>
                        <span className={`mc-status-pill ${isBelowCutoff ? "pill-risk" : "pill-safe"}`}>
                          {isBelowCutoff ? (
                            <>
                              <AlertTriangle size={11} /> At Risk (&lt;75%)
                            </>
                          ) : (
                            <>
                              <CheckCircle2 size={11} /> Safe
                            </>
                          )}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                          <button
                            type="button"
                            onClick={() => setSelectedStudent(student)}
                            className="mc-btn mc-btn-secondary mc-btn-sm"
                          >
                            View Details
                          </button>
                          <button
                            type="button"
                            onClick={() => setStudentToRemove(student)}
                            className="mc-btn-danger-sm"
                            title={`Remove ${student.name} from section`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Mark Attendance Modal */}
      {isAttendanceModalOpen && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card">
            <div className="mc-modal-header">
              <div>
                <h3 className="mc-modal-title">Mark Attendance — {currentClass.code}</h3>
                <span className="mc-modal-subtitle">{currentClass.name} ({currentClass.section})</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAttendanceModalOpen(false)}
                className="mc-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAttendance} className="mc-modal-form">
              <div className="mc-form-row">
                <div className="mc-form-group">
                  <label>Lecture Date:</label>
                  <input
                    type="date"
                    value={lectureDate}
                    onChange={(e) => setLectureDate(e.target.value)}
                    required
                    className="mc-input"
                  />
                </div>
                <div className="mc-form-group flex-2">
                  <label>Topic Covered:</label>
                  <input
                    type="text"
                    value={lectureTopic}
                    onChange={(e) => setLectureTopic(e.target.value)}
                    placeholder="e.g. Graph Traversals BFS & DFS"
                    required
                    className="mc-input"
                  />
                </div>
              </div>

              {/* Mark All Shortcuts */}
              <div className="mc-attendance-shortcuts">
                <span>Roster ({currentStudents.length} students):</span>
                <div className="mc-shortcuts-btns">
                  <button
                    type="button"
                    onClick={() => handleSetAllAttendance(true)}
                    className="mc-shortcut-btn"
                  >
                    Mark All Present
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetAllAttendance(false)}
                    className="mc-shortcut-btn"
                  >
                    Mark All Absent
                  </button>
                </div>
              </div>

              {/* Student Roll Call List */}
              <div className="mc-rollcall-list">
                {currentStudents.map((s) => {
                  const isPresent = !!attendanceToggles[s.id];
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleToggleAttendance(s.id)}
                      className={`mc-rollcall-item ${isPresent ? "item-present" : "item-absent"}`}
                    >
                      <div className="mc-rollcall-info">
                        <strong>{s.name}</strong>
                        <code>{s.rollNo}</code>
                      </div>
                      <button
                        type="button"
                        className={`mc-toggle-badge ${isPresent ? "badge-present" : "badge-absent"}`}
                      >
                        {isPresent ? "Present" : "Absent"}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mc-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsAttendanceModalOpen(false)}
                  className="mc-btn mc-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="mc-btn mc-btn-primary">
                  <Check size={16} />
                  <span>Save Attendance</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Student Details Modal */}
      {selectedStudent && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card">
            <div className="mc-modal-header">
              <div>
                <h3 className="mc-modal-title">{selectedStudent.name}</h3>
                <span className="mc-modal-subtitle">
                  Roll No: {selectedStudent.rollNo} • {selectedStudent.email}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="mc-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mc-modal-body">
              {/* Attendance Card */}
              <div className="mc-student-stats-row">
                <div className="mc-student-stat">
                  <span>Attendance:</span>
                  <strong className={selectedStudent.attendancePercentage >= 75 ? "stat-safe" : "stat-risk"}>
                    {selectedStudent.attendancePercentage}%
                  </strong>
                </div>
                <div className="mc-student-stat">
                  <span>Classes Attended:</span>
                  <strong>{selectedStudent.classesAttended} / {selectedStudent.totalClasses}</strong>
                </div>
                <div className="mc-student-stat">
                  <span>Status:</span>
                  <span className={`mc-status-pill ${selectedStudent.attendancePercentage >= 75 ? "pill-safe" : "pill-risk"}`}>
                    {selectedStudent.attendancePercentage >= 75 ? "Safe" : "At Risk (<75%)"}
                  </span>
                </div>
              </div>

              {/* Past History */}
              <h4 className="mc-section-heading">Recent Lecture Attendance</h4>
              <div className="mc-history-list">
                {(selectedStudent.history || []).map((h, i) => (
                  <div key={i} className="mc-history-row">
                    <span className="mc-history-date">{h.date}</span>
                    <span className="mc-history-topic">{h.topic}</span>
                    <span className={`mc-status-pill ${h.status === "Present" ? "pill-safe" : "pill-risk"}`}>
                      {h.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mentorship Note */}
              <h4 className="mc-section-heading">Faculty Mentorship Note</h4>
              <textarea
                id="student-note"
                defaultValue={selectedStudent.mentorshipNotes || ""}
                placeholder="Enter confidential faculty notes or advice for this student..."
                rows={3}
                className="mc-textarea"
              />
              <button
                type="button"
                onClick={() => {
                  const val = document.getElementById("student-note")?.value || "";
                  handleSaveStudentNote(selectedStudent.id, val);
                }}
                className="mc-btn mc-btn-primary mc-btn-sm"
                style={{ alignSelf: "flex-end", marginTop: "8px" }}
              >
                Save Note
              </button>
            </div>

            <div className="mc-modal-actions" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => {
                  const toRemove = selectedStudent;
                  setSelectedStudent(null);
                  setStudentToRemove(toRemove);
                }}
                className="mc-btn mc-btn-danger"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <Trash2 size={14} />
                <span>Remove from Section</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="mc-btn mc-btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Enroll New Student Modal */}
      <EnrollStudentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        defaultClassId={selectedClassId}
        onEnrolled={(newStudent, classId) => {
          showToast(`Successfully enrolled ${newStudent.name} (${newStudent.rollNo})!`);
          const updatedStudents = loadFromStorage(STUDENTS_KEY, sampleStudentsByClass);
          setStudentsByClass(updatedStudents);
          const updatedClasses = loadFromStorage(CLASSES_KEY, assignedClassesData);
          setClassesList(updatedClasses);
          if (classId && classId !== selectedClassId) {
            setSelectedClassId(classId);
          }
        }}
      />

      {/* 8. Remove Student Confirmation Modal */}
      {studentToRemove && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: "28rem" }}>
            <div className="mc-modal-header" style={{ borderBottom: "none", paddingBottom: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#FBEBED",
                  color: "#8C2A3E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h3 className="mc-modal-title" style={{ fontSize: "1.15rem" }}>
                    Remove Student?
                  </h3>
                  <span className="mc-modal-subtitle">
                    {currentClass.code} • {currentClass.section}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStudentToRemove(null)}
                className="mc-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mc-modal-body" style={{ padding: "0.5rem 1.25rem 1.25rem" }}>
              <p style={{ fontSize: "13.5px", lineHeight: "1.5", margin: 0, color: "var(--color-text-main, #3B302A)" }}>
                Are you sure you want to remove <strong>{studentToRemove.name}</strong> (<code>{studentToRemove.rollNo}</code>) from this course section?
              </p>
              <p style={{ fontSize: "12px", opacity: 0.8, marginTop: "8px", marginBottom: 0 }}>
                This action will update class enrollment totals, attendance registers, and academic ledgers across the faculty dashboard.
              </p>
            </div>

            <div className="mc-modal-actions" style={{ borderTop: "1px solid var(--light-border, #E5E0D8)", paddingTop: "12px" }}>
              <button
                type="button"
                onClick={() => setStudentToRemove(null)}
                className="mc-btn mc-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteRemove}
                className="mc-btn mc-btn-danger"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <Trash2 size={14} />
                <span>Confirm Removal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
