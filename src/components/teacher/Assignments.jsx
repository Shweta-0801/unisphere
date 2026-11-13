import { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Plus,
  Search,
  Calendar,
  Clock,
  Download,
  Trash2,
  Upload,
  BookOpen,
  Sparkles,
  X,
  Check,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Eye,
  Send,
  User,
  GraduationCap
} from "lucide-react";
import {
  initialTeacherAssignments,
  initialStudyMaterials,
  assignedClassesData,
  sampleStudentsByClass
} from "../../data/teacherData";
import { loadFromStorage, saveToStorage } from "../../utils/storage";
import "./Assignments.css";

export default function Assignments({ initialMode = "student", currentStudentUser }) {
  const ASG_KEY = "unisphere_faculty_assignments";
  const MAT_KEY = "unisphere_faculty_study_materials";

  // Current logged in student profile (Aanvi Palia)
  const currentStudent = {
    name: currentStudentUser?.name || "Aanvi Palia",
    rollNo: currentStudentUser?.rollNo || "2024-CSE-0892",
    classId: "cls-1",
    classCode: "CS-301",
    className: "Data Structures & Algorithms",
    section: "Section A"
  };

  // 1. Portal Mode: 'student' (Student Submission Portal) or 'faculty' (Teacher Coursework Management)
  const [portalMode, setPortalMode] = useState(initialMode);

  // 2. State: Assignments & Materials from localStorage
  const [assignments, setAssignments] = useState(() =>
    loadFromStorage(ASG_KEY, initialTeacherAssignments)
  );
  const [studyMaterials, setStudyMaterials] = useState(() =>
    loadFromStorage(MAT_KEY, initialStudyMaterials)
  );

  // 3. Active Tab: 'assignments' | 'materials'
  const [activeTab, setActiveTab] = useState("assignments");

  // 4. Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [studentStatusFilter, setStudentStatusFilter] = useState("all");

  // 5. Teacher Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeGradingAsg, setActiveGradingAsg] = useState(null);

  // 6. Teacher Form State
  const [newTitle, setNewTitle] = useState("");
  const [newClassId, setNewClassId] = useState("cls-1");
  const [newMarks, setNewMarks] = useState(50);
  const [newDueDate, setNewDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [newDescription, setNewDescription] = useState("");

  const [matTitle, setMatTitle] = useState("");
  const [matClassId, setMatClassId] = useState("cls-1");
  const [matUnit, setMatUnit] = useState("Unit 3");
  const [matType, setMatType] = useState("Lecture Slides");
  const [matDescription, setMatDescription] = useState("");

  const [gradingInputs, setGradingInputs] = useState({});

  // 7. Student Submission Modal State
  const [activeSubmitAsg, setActiveSubmitAsg] = useState(null);
  const [submissionFileName, setSubmissionFileName] = useState("");
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [submissionError, setSubmissionError] = useState("");

  // 8. Toast Feedback
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    saveToStorage(ASG_KEY, assignments);
  }, [assignments]);

  useEffect(() => {
    saveToStorage(MAT_KEY, studyMaterials);
  }, [studyMaterials]);

  // Filtered assignments for faculty
  const filteredAssignments = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return assignments;
    return assignments.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.classCode.toLowerCase().includes(q) ||
        (a.description && a.description.toLowerCase().includes(q))
    );
  }, [assignments, searchQuery]);

  // Filtered study materials
  const filteredMaterials = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return studyMaterials;
    return studyMaterials.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.classCode.toLowerCase().includes(q) ||
        m.unit.toLowerCase().includes(q)
    );
  }, [studyMaterials, searchQuery]);

  // Student specific submissions helper
  const getStudentSubmission = (asg) => {
    if (!asg.submissions || !Array.isArray(asg.submissions)) return null;
    return asg.submissions.find(
      (s) => s.rollNo === currentStudent.rollNo || s.studentName === currentStudent.name
    );
  };

  // Filtered assignments for student
  const studentAssignments = useMemo(() => {
    let list = assignments;
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.classCode.toLowerCase().includes(q) ||
          (a.description && a.description.toLowerCase().includes(q))
      );
    }

    if (studentStatusFilter === "pending") {
      return list.filter((a) => {
        const sub = getStudentSubmission(a);
        return !sub || sub.status === "Not Submitted";
      });
    }
    if (studentStatusFilter === "submitted") {
      return list.filter((a) => {
        const sub = getStudentSubmission(a);
        return sub && sub.status === "Pending Review";
      });
    }
    if (studentStatusFilter === "graded") {
      return list.filter((a) => {
        const sub = getStudentSubmission(a);
        return sub && sub.status === "Graded";
      });
    }
    return list;
  }, [assignments, searchQuery, studentStatusFilter]);

  // ==========================================================
  // STUDENT SUBMISSION ACTIONS
  // ==========================================================

  const handleOpenStudentSubmit = (asg) => {
    setActiveSubmitAsg(asg);
    const existingSub = getStudentSubmission(asg);
    if (existingSub) {
      setSubmissionFileName(existingSub.fileName || `${currentStudent.rollNo}_Solution.pdf`);
      setSubmissionUrl(existingSub.solutionUrl || "");
      setSubmissionNotes(existingSub.studentNotes || "");
    } else {
      setSubmissionFileName(`${currentStudent.rollNo}_Solution.pdf`);
      setSubmissionUrl("");
      setSubmissionNotes("");
    }
    setSubmissionError("");
  };

  const handleStudentFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubmissionFileName(file.name);
    }
  };

  const handleConfirmStudentSubmission = (e) => {
    e.preventDefault();
    if (!submissionFileName.trim() && !submissionUrl.trim() && !submissionNotes.trim()) {
      setSubmissionError("Please attach a solution file or provide a repository/solution link.");
      return;
    }

    const asgId = activeSubmitAsg.id;
    const nowStr = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id !== asgId) return asg;

        const subs = asg.submissions ? [...asg.submissions] : [];
        const existingIdx = subs.findIndex(
          (s) => s.rollNo === currentStudent.rollNo || s.studentName === currentStudent.name
        );

        const newSubRecord = {
          id: existingIdx >= 0 ? subs[existingIdx].id : "sub-" + Date.now().toString(36),
          studentName: currentStudent.name,
          rollNo: currentStudent.rollNo,
          submittedAt: nowStr,
          status: "Pending Review",
          fileName: submissionFileName.trim() || `${currentStudent.rollNo}_Solution.pdf`,
          solutionUrl: submissionUrl.trim(),
          studentNotes: submissionNotes.trim(),
          marks: existingIdx >= 0 ? subs[existingIdx].marks : null,
          feedback: existingIdx >= 0 ? subs[existingIdx].feedback : ""
        };

        if (existingIdx >= 0) {
          subs[existingIdx] = newSubRecord;
        } else {
          subs.unshift(newSubRecord);
        }

        const pendingCount = subs.filter((s) => s.status === "Pending Review").length;
        const submittedCount = subs.filter((s) => s.status !== "Not Submitted").length;
        const gradedCount = subs.filter((s) => s.status === "Graded").length;

        return {
          ...asg,
          submissions: subs,
          totalSubmissions: submittedCount,
          pendingGrading: pendingCount,
          gradedCount: gradedCount
        };
      })
    );

    setActiveSubmitAsg(null);
    showToast(`âœ“ Assignment "${activeSubmitAsg.title}" submitted successfully! Faculty will evaluate your solution.`);
  };

  // ==========================================================
  // FACULTY ACTIONS (CREATE, GRADE, DELETE)
  // ==========================================================

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      showToast("Please provide both assignment title and instructions.");
      return;
    }

    const targetClass = assignedClassesData.find((c) => c.id === newClassId) || assignedClassesData[0];
    const targetStudents = sampleStudentsByClass[newClassId] || sampleStudentsByClass["cls-1"] || [];

    const mockSubmissions = targetStudents.slice(0, 5).map((std, idx) => ({
      id: "sub-" + Date.now().toString(36) + idx,
      studentName: std.name,
      rollNo: std.rollNo,
      submittedAt: idx % 2 === 0 ? "Yesterday, 04:30 PM" : null,
      status: idx % 2 === 0 ? "Pending Review" : "Not Submitted",
      fileName: idx % 2 === 0 ? `${std.rollNo}_Solution.pdf` : null,
      marks: null,
      feedback: ""
    }));

    const pendingCount = mockSubmissions.filter((s) => s.status === "Pending Review").length;

    const newAsg = {
      id: "asg-" + Date.now().toString(36),
      classId: targetClass.id,
      classCode: targetClass.code,
      className: `${targetClass.name} (${targetClass.section})`,
      title: newTitle.trim(),
      totalMarks: Number(newMarks) || 50,
      dueDate: newDueDate,
      description: newDescription.trim(),
      totalSubmissions: pendingCount,
      pendingGrading: pendingCount,
      gradedCount: 0,
      status: "Active",
      submissions: mockSubmissions
    };

    setAssignments((prev) => [newAsg, ...prev]);
    setNewTitle("");
    setNewDescription("");
    setIsCreateModalOpen(false);
    showToast(`Assignment "${newAsg.title}" created successfully!`);
  };

  const handleOpenGradingModal = (asg) => {
    setActiveGradingAsg(asg);
    const initialGrades = {};
    (asg.submissions || []).forEach((sub) => {
      initialGrades[sub.id] = {
        marks: sub.marks !== null ? sub.marks : "",
        feedback: sub.feedback || ""
      };
    });
    setGradingInputs(initialGrades);
  };

  const handleSaveGrade = (submissionId) => {
    if (!activeGradingAsg) return;
    const gradeData = gradingInputs[submissionId] || {};
    const enteredScore = gradeData.marks;

    if (enteredScore === "" || enteredScore === undefined) {
      showToast("Please enter a numeric score.");
      return;
    }

    const numericScore = Math.min(
      Math.max(0, Number(enteredScore)),
      activeGradingAsg.totalMarks
    );

    const updatedSubmissions = activeGradingAsg.submissions.map((sub) => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          marks: numericScore,
          feedback: gradeData.feedback || "Evaluated by faculty. Good effort.",
          status: "Graded"
        };
      }
      return sub;
    });

    const pendingCount = updatedSubmissions.filter((s) => s.status === "Pending Review").length;
    const gradedCount = updatedSubmissions.filter((s) => s.status === "Graded").length;

    const updatedAsg = {
      ...activeGradingAsg,
      submissions: updatedSubmissions,
      pendingGrading: pendingCount,
      gradedCount: gradedCount
    };

    setActiveGradingAsg(updatedAsg);
    setAssignments((prev) => prev.map((a) => (a.id === updatedAsg.id ? updatedAsg : a)));
    showToast("âœ“ Grade and feedback saved successfully!");
  };

  const handleDeleteAssignment = (asgId, title) => {
    if (window.confirm(`Delete assignment "${title}"?`)) {
      setAssignments((prev) => prev.filter((a) => a.id !== asgId));
      showToast("Assignment removed.");
    }
  };

  const handleUploadMaterial = (e) => {
    e.preventDefault();
    if (!matTitle.trim()) {
      showToast("Please enter material title.");
      return;
    }

    const targetClass = assignedClassesData.find((c) => c.id === matClassId) || assignedClassesData[0];

    const newMat = {
      id: "mat-" + Date.now().toString(36),
      classId: targetClass.id,
      classCode: targetClass.code,
      title: matTitle.trim(),
      unit: matUnit,
      type: matType,
      size: "2.8 MB",
      uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      description: matDescription.trim() || `Approved study material for ${targetClass.code} ${matUnit}.`
    };

    setStudyMaterials((prev) => [newMat, ...prev]);
    setMatTitle("");
    setMatDescription("");
    setIsUploadModalOpen(false);
    showToast(`Study resource "${newMat.title}" uploaded!`);
  };

  const handleDeleteMaterial = (matId) => {
    setStudyMaterials((prev) => prev.filter((m) => m.id !== matId));
    showToast("Study material removed.");
  };

  return (
    <div className="asg-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="asg-toast">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mode Switcher Banner (Student vs Faculty Perspective) */}
      <div className="asg-mode-switcher-bar">
        <div className="mode-switcher-info">
          <span className="mode-switcher-label">PORTAL VIEW MODE:</span>
          <span className="mode-current-badge">
            {portalMode === "student" ? "ðŸŽ“ Student Submission View" : "ðŸ‘¨â€ â   Faculty Management View"}
          </span>
        </div>

        <div className="mode-toggle-buttons">
          <button
            type="button"
            className={`mode-toggle-btn ${portalMode === "student" ? "active" : ""}`}
            onClick={() => setPortalMode("student")}
          >
            <GraduationCap size={15} />
            <span>Student Portal (Submit &amp; Track)</span>
          </button>
          <button
            type="button"
            className={`mode-toggle-btn ${portalMode === "faculty" ? "active" : ""}`}
            onClick={() => setPortalMode("faculty")}
          >
            <User size={15} />
            <span>Faculty View (Create &amp; Grade)</span>
          </button>
        </div>
      </div>

      {/* 1. Header Banner */}
      <div className="asg-header-card">
        <div className="asg-header-left">
          <div className="asg-badge">
            <FileText size={13} />
            <span>{portalMode === "student" ? "Student Coursework Portal" : "Faculty Coursework Management"}</span>
          </div>
          <h1 className="asg-title">
            {portalMode === "student" ? "Assignments & Submissions" : "Coursework & Study Material"}
          </h1>
          <p className="asg-subtitle">
            {portalMode === "student"
              ? `Enrolled as ${currentStudent.name} (${currentStudent.rollNo}) in ${currentStudent.classCode} ${currentStudent.section}. Inspect deadlines, upload solutions, and review faculty rubric feedback.`
              : "Create coursework tasks with deadlines and rubric marks, evaluate student submissions in real-time, and publish verified study material."}
          </p>
        </div>

        <div className="asg-header-actions">
          {portalMode === "faculty" && (
            activeTab === "assignments" ? (
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="asg-btn asg-btn-primary"
              >
                <Plus size={16} />
                <span>Create Assignment</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="asg-btn asg-btn-primary"
              >
                <Upload size={16} />
                <span>Upload Study Material</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* 2. Primary Tabs (Assignments vs Study Material) */}
      <div className="asg-tabs-bar">
        <button
          type="button"
          onClick={() => {
            setActiveTab("assignments");
            setSearchQuery("");
          }}
          className={`asg-tab-btn ${activeTab === "assignments" ? "active" : ""}`}
        >
          <FileText size={15} />
          <span>Assignments ({assignments.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("materials");
            setSearchQuery("");
          }}
          className={`asg-tab-btn ${activeTab === "materials" ? "active" : ""}`}
        >
          <BookOpen size={15} />
          <span>Study Material ({studyMaterials.length})</span>
        </button>
      </div>

      {/* 3. Search Bar & Student Filters */}
      <div className="asg-search-filters-row">
        <div className="asg-search-box">
          <Search size={16} className="asg-search-icon" />
          <input
            type="text"
            placeholder={
              activeTab === "assignments"
                ? "Search assignments by title or course code..."
                : "Search study materials by title or topic..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="asg-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="asg-clear-btn"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {portalMode === "student" && activeTab === "assignments" && (
          <div className="asg-student-filter-chips">
            <button
              type="button"
              className={`filter-chip ${studentStatusFilter === "all" ? "active" : ""}`}
              onClick={() => setStudentStatusFilter("all")}
            >
              All ({assignments.length})
            </button>
            <button
              type="button"
              className={`filter-chip ${studentStatusFilter === "pending" ? "active" : ""}`}
              onClick={() => setStudentStatusFilter("pending")}
            >
              Pending Submission
            </button>
            <button
              type="button"
              className={`filter-chip ${studentStatusFilter === "submitted" ? "active" : ""}`}
              onClick={() => setStudentStatusFilter("submitted")}
            >
              Submitted / Under Review
            </button>
            <button
              type="button"
              className={`filter-chip ${studentStatusFilter === "graded" ? "active" : ""}`}
              onClick={() => setStudentStatusFilter("graded")}
            >
              Graded
            </button>
          </div>
        )}
      </div>

      {/* =======================================================
          TAB 1: ASSIGNMENTS (STUDENT OR FACULTY VIEW)
          ======================================================= */}
      {activeTab === "assignments" && (
        portalMode === "student" ? (
          /* ---------------- STUDENT ASSIGNMENTS LISTING ---------------- */
          <div className="asg-grid">
            {studentAssignments.length === 0 ? (
              <div className="asg-empty-state">
                <FileText size={36} className="asg-empty-icon" />
                <h3>No assignments found</h3>
                <p>No coursework matches the selected filter status.</p>
              </div>
            ) : (
              studentAssignments.map((asg) => {
                const sub = getStudentSubmission(asg);
                const isSubmitted = sub && sub.status !== "Not Submitted";
                const isGraded = sub && sub.status === "Graded";

                return (
                  <div key={asg.id} className="asg-card student-asg-card">
                    <div className="asg-card-top">
                      <span className="asg-card-class">{asg.classCode}</span>
                      <span
                        className={`student-status-badge ${
                          isGraded
                            ? "status-badge-graded"
                            : isSubmitted
                            ? "status-badge-submitted"
                            : "status-badge-pending"
                        }`}
                      >
                        {isGraded
                          ? "âœ“ Graded"
                          : isSubmitted
                          ? "â ³ Under Evaluation"
                          : "â—  Pending Submission"}
                      </span>
                    </div>

                    <h3 className="asg-card-title">{asg.title}</h3>
                    <div className="asg-card-meta-line">{asg.className}</div>
                    <p className="asg-card-desc">{asg.description}</p>

                    <div className="asg-card-info-strip">
                      <div className="asg-info-item">
                        <Calendar size={13} />
                        <span>Deadline: <strong>{asg.dueDate}</strong></span>
                      </div>
                      <div className="asg-info-item">
                        <Clock size={13} />
                        <span>Max Score: <strong>{asg.totalMarks} Marks</strong></span>
                      </div>
                    </div>

                    {/* Evaluated Score & Feedback Box */}
                    {isGraded && (
                      <div className="student-graded-box">
                        <div className="graded-score-row">
                          <span className="graded-score-label">Evaluated Score:</span>
                          <span className="graded-score-val font-bold">
                            {sub.marks} / {asg.totalMarks} Marks ({Math.round((sub.marks / asg.totalMarks) * 100)}%)
                          </span>
                        </div>
                        {sub.feedback && (
                          <div className="graded-feedback-comment">
                            <strong>Faculty Feedback:</strong> &ldquo;{sub.feedback}&rdquo;
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submission Meta if Submitted */}
                    {isSubmitted && !isGraded && (
                      <div className="student-submitted-box">
                        <span>Submitted File: <code>{sub.fileName}</code></span>
                        <span className="submitted-time-text">â€¢ {sub.submittedAt}</span>
                      </div>
                    )}

                    <div className="asg-card-footer-actions">
                      <button
                        type="button"
                        onClick={() => handleOpenStudentSubmit(asg)}
                        className={`asg-btn ${isSubmitted ? "asg-btn-secondary" : "asg-btn-primary"} full-width`}
                      >
                        {isGraded
                          ? "View Evaluation & Submission"
                          : isSubmitted
                          ? "Update / Re-submit Solution"
                          : "Submit Solution Now"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* ---------------- FACULTY ASSIGNMENTS LISTING ---------------- */
          <div className="asg-grid">
            {filteredAssignments.length === 0 ? (
              <div className="asg-empty-state">
                <FileText size={36} className="asg-empty-icon" />
                <h3>No assignments found</h3>
                <p>Click "Create Assignment" to add coursework for your classes.</p>
              </div>
            ) : (
              filteredAssignments.map((asg) => {
                const totalSubs = asg.submissions?.length || 0;
                const submittedCount =
                  asg.submissions?.filter((s) => s.status !== "Not Submitted").length || 0;

                return (
                  <div key={asg.id} className="asg-card">
                    <div className="asg-card-top">
                      <span className="asg-card-class">{asg.classCode}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteAssignment(asg.id, asg.title)}
                        className="asg-delete-icon-btn"
                        title="Delete assignment"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <h3 className="asg-card-title">{asg.title}</h3>
                    <div className="asg-card-meta-line">{asg.className}</div>
                    <p className="asg-card-desc">{asg.description}</p>

                    <div className="asg-card-info-strip">
                      <div className="asg-info-item">
                        <Calendar size={13} />
                        <span>Due: <strong>{asg.dueDate}</strong></span>
                      </div>
                      <div className="asg-info-item">
                        <Clock size={13} />
                        <span><strong>{asg.totalMarks} Marks</strong></span>
                      </div>
                    </div>

                    <div className="asg-submission-progress">
                      <div className="asg-progress-text">
                        <span>Submissions: <strong>{submittedCount}</strong> / {totalSubs}</span>
                        <span className="asg-pending-tag">
                          {asg.pendingGrading > 0
                            ? `${asg.pendingGrading} to evaluate`
                            : "All evaluated"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenGradingModal(asg)}
                      className="asg-btn asg-btn-primary full-width"
                    >
                      View Submissions &amp; Grade
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )
      )}

      {/* =======================================================
          TAB 2: STUDY MATERIAL LIST
          ======================================================= */}
      {activeTab === "materials" && (
        <div className="asg-grid">
          {filteredMaterials.length === 0 ? (
            <div className="asg-empty-state">
              <BookOpen size={36} className="asg-empty-icon" />
              <h3>No study materials found</h3>
              <p>Click "Upload Study Material" to share lecture notes with your students.</p>
            </div>
          ) : (
            filteredMaterials.map((mat) => (
              <div key={mat.id} className="asg-card">
                <div className="asg-card-top">
                  <span className="asg-card-class">{mat.classCode}</span>
                  <span className="asg-type-badge">{mat.type}</span>
                </div>

                <h3 className="asg-card-title">{mat.title}</h3>
                <span className="asg-unit-tag">{mat.unit}</span>
                <p className="asg-card-desc">{mat.description}</p>

                <div className="asg-card-info-strip">
                  <span>File Size: <strong>{mat.size}</strong></span>
                  <span>Uploaded: <strong>{mat.uploadDate}</strong></span>
                </div>

                <div className="asg-card-footer-actions">
                  <button
                    type="button"
                    onClick={() => showToast(`Downloaded "${mat.title}"`)}
                    className="asg-btn asg-btn-secondary flex-1"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                  {portalMode === "faculty" && (
                    <button
                      type="button"
                      onClick={() => handleDeleteMaterial(mat.id)}
                      className="asg-btn asg-btn-outline"
                      title="Delete material"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* =======================================================
          MODAL 1: STUDENT SUBMISSION FORM
          ======================================================= */}
      {activeSubmitAsg && (
        <div className="asg-modal-overlay">
          <div className="asg-modal-card asg-modal-card-lg">
            <div className="asg-modal-header">
              <div>
                <span className="asg-card-class">{activeSubmitAsg.classCode}</span>
                <h3 className="asg-modal-title">Submit Solution: {activeSubmitAsg.title}</h3>
                <p className="asg-modal-subtitle">
                  Due: {activeSubmitAsg.dueDate} â€¢ Max Score: {activeSubmitAsg.totalMarks} Marks
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSubmitAsg(null)}
                className="asg-modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <div className="asg-modal-body">
              {/* Instructions Box */}
              <div className="student-asg-instructions-box">
                <h4>Assignment Instructions &amp; Rubric:</h4>
                <p>{activeSubmitAsg.description}</p>
              </div>

              {/* Existing Grade if evaluated */}
              {(() => {
                const sub = getStudentSubmission(activeSubmitAsg);
                if (sub && sub.status === "Graded") {
                  return (
                    <div className="student-graded-alert">
                      <CheckCircle2 size={18} />
                      <div>
                        <strong>Evaluated by Faculty:</strong> {sub.marks} / {activeSubmitAsg.totalMarks} Marks.
                        {sub.feedback && <span> &ldquo;{sub.feedback}&rdquo;</span>}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {submissionError && (
                <div className="form-error-alert" style={{ marginBottom: "1rem" }}>
                  <AlertCircle size={15} />
                  <span>{submissionError}</span>
                </div>
              )}

              <form onSubmit={handleConfirmStudentSubmission}>
                <div className="asg-form-group">
                  <label className="asg-label">Student Details</label>
                  <input
                    type="text"
                    disabled
                    value={`${currentStudent.name} (${currentStudent.rollNo}) â€¢ ${currentStudent.section}`}
                    className="asg-input disabled-input"
                  />
                </div>

                <div className="asg-form-group">
                  <label className="asg-label">Attach Solution Document / Code Archive</label>
                  <div className="file-upload-box">
                    <input
                      type="file"
                      onChange={handleStudentFileSelect}
                      id="student-file-input"
                      className="hidden-file-input"
                    />
                    <label htmlFor="student-file-input" className="file-upload-label">
                      <Paperclip size={16} />
                      <span>{submissionFileName || "Choose PDF, ZIP, or code file..."}</span>
                    </label>
                  </div>
                </div>

                <div className="asg-form-group">
                  <label className="asg-label">Repository URL / Google Drive Solution Link (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://github.com/... or https://drive.google.com/..."
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    className="asg-input"
                  />
                </div>

                <div className="asg-form-group">
                  <label className="asg-label">Solution Remarks &amp; Notes for Faculty</label>
                  <textarea
                    rows={3}
                    placeholder="Describe how your solution satisfies the assignment requirements..."
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    className="asg-textarea"
                  />
                </div>

                <div className="asg-modal-actions">
                  <button
                    type="button"
                    onClick={() => setActiveSubmitAsg(null)}
                    className="asg-btn asg-btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="asg-btn asg-btn-primary">
                    <Send size={15} />
                    <span>Confirm &amp; Submit Solution</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          MODAL 2: TEACHER GRADING SUBMISSIONS
          ======================================================= */}
      {activeGradingAsg && (
        <div className="asg-modal-overlay">
          <div className="asg-modal-card asg-modal-card-lg">
            <div className="asg-modal-header">
              <div>
                <span className="asg-card-class">{activeGradingAsg.classCode}</span>
                <h3 className="asg-modal-title">Submissions: {activeGradingAsg.title}</h3>
                <p className="asg-modal-subtitle">
                  Max Marks: {activeGradingAsg.totalMarks} â€¢ Due: {activeGradingAsg.dueDate}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveGradingAsg(null)}
                className="asg-modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <div className="asg-modal-body">
              {(!activeGradingAsg.submissions || activeGradingAsg.submissions.length === 0) ? (
                <p className="asg-empty-subs">No submissions recorded for this assignment yet.</p>
              ) : (
                <div className="asg-submissions-list">
                  {activeGradingAsg.submissions.map((sub) => {
                    const gradeData = gradingInputs[sub.id] || { marks: "", feedback: "" };

                    return (
                      <div key={sub.id} className="asg-sub-row">
                        <div className="asg-sub-student-col">
                          <div className="asg-sub-name">{sub.studentName}</div>
                          <div className="asg-sub-roll">{sub.rollNo}</div>
                          <span
                            className={`asg-sub-status-pill ${
                              sub.status === "Graded"
                                ? "status-graded"
                                : sub.status === "Pending Review"
                                ? "status-pending"
                                : "status-none"
                            }`}
                          >
                            {sub.status}
                          </span>
                        </div>

                        <div className="asg-sub-file-col">
                          {sub.fileName ? (
                            <button
                              type="button"
                              onClick={() => showToast(`Opened submission "${sub.fileName}"`)}
                              className="asg-sub-file-btn"
                            >
                              <Paperclip size={13} />
                              <span>{sub.fileName}</span>
                            </button>
                          ) : (
                            <span className="asg-no-file">No file submitted</span>
                          )}
                          {sub.submittedAt && (
                            <span className="asg-sub-time">{sub.submittedAt}</span>
                          )}
                          {sub.solutionUrl && (
                            <a
                              href={sub.solutionUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="asg-sub-link"
                            >
                              View Solution Link
                            </a>
                          )}
                        </div>

                        <div className="asg-sub-grading-col">
                          <div className="asg-grade-input-wrap">
                            <input
                              type="number"
                              min="0"
                              max={activeGradingAsg.totalMarks}
                              placeholder="Score"
                              value={gradeData.marks}
                              onChange={(e) =>
                                setGradingInputs((prev) => ({
                                  ...prev,
                                  [sub.id]: { ...prev[sub.id], marks: e.target.value }
                                }))
                              }
                              className="asg-score-input"
                            />
                            <span className="asg-score-max">/ {activeGradingAsg.totalMarks}</span>
                          </div>

                          <input
                            type="text"
                            placeholder="Feedback comment..."
                            value={gradeData.feedback}
                            onChange={(e) =>
                              setGradingInputs((prev) => ({
                                ...prev,
                                [sub.id]: { ...prev[sub.id], feedback: e.target.value }
                              }))
                            }
                            className="asg-feedback-input"
                          />

                          <button
                            type="button"
                            onClick={() => handleSaveGrade(sub.id)}
                            className="asg-save-grade-btn"
                          >
                            <Check size={14} />
                            <span>Save Grade</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          MODAL 3: CREATE ASSIGNMENT (TEACHER)
          ======================================================= */}
      {isCreateModalOpen && (
        <div className="asg-modal-overlay">
          <div className="asg-modal-card">
            <div className="asg-modal-header">
              <h3 className="asg-modal-title">Create Coursework Assignment</h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="asg-modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="asg-modal-body">
              <div className="asg-form-group">
                <label className="asg-label">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Assignment 3: Red-Black Trees &amp; AVL Balancing"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="asg-input"
                />
              </div>

              <div className="asg-form-row">
                <div className="asg-form-group flex-1">
                  <label className="asg-label">Target Class Section</label>
                  <select
                    value={newClassId}
                    onChange={(e) => setNewClassId(e.target.value)}
                    className="asg-select"
                  >
                    {assignedClassesData.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.code} â€¢ {c.name} ({c.section})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="asg-form-group flex-1">
                  <label className="asg-label">Rubric Marks</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={newMarks}
                    onChange={(e) => setNewMarks(e.target.value)}
                    className="asg-input"
                  />
                </div>
              </div>

              <div className="asg-form-group">
                <label className="asg-label">Submission Deadline</label>
                <input
                  type="date"
                  required
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="asg-input"
                />
              </div>

              <div className="asg-form-group">
                <label className="asg-label">Instructions &amp; Evaluation Rubric</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide problem specifications, allowed libraries, formatting, and submission rules..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="asg-textarea"
                />
              </div>

              <div className="asg-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="asg-btn asg-btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="asg-btn asg-btn-primary">
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================
          MODAL 4: UPLOAD STUDY MATERIAL (TEACHER)
          ======================================================= */}
      {isUploadModalOpen && (
        <div className="asg-modal-overlay">
          <div className="asg-modal-card">
            <div className="asg-modal-header">
              <h3 className="asg-modal-title">Upload Verified Study Resource</h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="asg-modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadMaterial} className="asg-modal-body">
              <div className="asg-form-group">
                <label className="asg-label">Material Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Graph Algorithms Lecture Notes &amp; Proofs"
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  className="asg-input"
                />
              </div>

              <div className="asg-form-row">
                <div className="asg-form-group flex-1">
                  <label className="asg-label">Target Class Section</label>
                  <select
                    value={matClassId}
                    onChange={(e) => setMatClassId(e.target.value)}
                    className="asg-select"
                  >
                    {assignedClassesData.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.code} â€¢ {c.name} ({c.section})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="asg-form-group flex-1">
                  <label className="asg-label">Syllabus Unit</label>
                  <select
                    value={matUnit}
                    onChange={(e) => setMatUnit(e.target.value)}
                    className="asg-select"
                  >
                    <option value="Unit 1">Unit 1: Foundations</option>
                    <option value="Unit 2">Unit 2: Trees &amp; BST</option>
                    <option value="Unit 3">Unit 3: Balanced Trees</option>
                    <option value="Unit 4">Unit 4: Graph Algorithms</option>
                    <option value="Unit 5">Unit 5: Hashing &amp; Heaps</option>
                  </select>
                </div>
              </div>

              <div className="asg-form-group">
                <label className="asg-label">Resource Type</label>
                <select
                  value={matType}
                  onChange={(e) => setMatType(e.target.value)}
                  className="asg-select"
                >
                  <option value="Lecture Slides">Lecture Slides (PDF)</option>
                  <option value="Handwritten Notes">Handwritten Faculty Notes</option>
                  <option value="Lab Guide">Lab Exercise Manual</option>
                  <option value="Sample Code">Source Code Archive (ZIP)</option>
                  <option value="Reference Sheet">Formula Reference Cheatsheet</option>
                </select>
              </div>

              <div className="asg-form-group">
                <label className="asg-label">Resource Overview (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Summary of topics covered, readings, or accompanying exercises..."
                  value={matDescription}
                  onChange={(e) => setMatDescription(e.target.value)}
                  className="asg-textarea"
                />
              </div>

              <div className="asg-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="asg-btn asg-btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="asg-btn asg-btn-primary">
                  Publish Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
