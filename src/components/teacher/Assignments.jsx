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
  Paperclip
} from "lucide-react";
import {
  initialTeacherAssignments,
  initialStudyMaterials,
  assignedClassesData,
  sampleStudentsByClass
} from "../../data/teacherData";
import { loadFromStorage, saveToStorage } from "../../utils/storage";
import { useLanguage } from "../../context/LanguageContext";
import "./Assignments.css";

export default function Assignments() {
  const { t } = useLanguage();
  const ASG_KEY = "unisphere_faculty_assignments";
  const MAT_KEY = "unisphere_faculty_study_materials";

  // 1. State: Assignments & Materials
  const [assignments, setAssignments] = useState(() =>
    loadFromStorage(ASG_KEY, initialTeacherAssignments)
  );
  const [studyMaterials, setStudyMaterials] = useState(() =>
    loadFromStorage(MAT_KEY, initialStudyMaterials)
  );

  // 2. Active Tab: 'assignments' | 'materials'
  const [activeTab, setActiveTab] = useState("assignments");

  // 3. Search query
  const [searchQuery, setSearchQuery] = useState("");

  // 4. Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeGradingAsg, setActiveGradingAsg] = useState(null);

  // 5. Create Assignment Form State
  const [newTitle, setNewTitle] = useState("");
  const [newClassId, setNewClassId] = useState("cls-1");
  const [newMarks, setNewMarks] = useState(50);
  const [newDueDate, setNewDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [newDescription, setNewDescription] = useState("");

  // 6. Upload Study Material Form State
  const [matTitle, setMatTitle] = useState("");
  const [matClassId, setMatClassId] = useState("cls-1");
  const [matUnit, setMatUnit] = useState("Unit 3");
  const [matType, setMatType] = useState("Lecture Slides");
  const [matDescription, setMatDescription] = useState("");

  // 7. Grading inputs map: { [submissionId]: { marks: 45, feedback: "Great work" } }
  const [gradingInputs, setGradingInputs] = useState({});

  // 8. Toast Feedback
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync to localStorage
  useEffect(() => {
    saveToStorage(ASG_KEY, assignments);
  }, [assignments]);

  useEffect(() => {
    saveToStorage(MAT_KEY, studyMaterials);
  }, [studyMaterials]);

  // Filtered assignments
  const filteredAssignments = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return assignments;
    return assignments.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.classCode.toLowerCase().includes(q)
    );
  }, [assignments, searchQuery]);

  // Filtered materials
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

  // Create Assignment Action
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      showToast("Please provide both assignment title and instructions.");
      return;
    }

    const targetClass = assignedClassesData.find((c) => c.id === newClassId) || assignedClassesData[0];
    const targetStudents = sampleStudentsByClass[newClassId] || sampleStudentsByClass["cls-1"] || [];

    // Pre-populate realistic submissions for students in that class
    const mockSubmissions = targetStudents.slice(0, 6).map((std, idx) => ({
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

  // Open Grading Modal
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

  // Save Grade for Student
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
          feedback: gradeData.feedback || "Evaluated by faculty.",
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
    showToast("Grade and feedback saved successfully!");
  };

  // Delete Assignment
  const handleDeleteAssignment = (asgId, title) => {
    if (window.confirm(`Delete assignment "${title}"?`)) {
      setAssignments((prev) => prev.filter((a) => a.id !== asgId));
      showToast("Assignment removed.");
    }
  };

  // Upload Study Material Action
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

  // Delete Material
  const handleDeleteMaterial = (matId) => {
    setStudyMaterials((prev) => prev.filter((m) => m.id !== matId));
    showToast("Study material removed.");
  };

  return (
    <div className="asg-root">
      {/* Toast */}
      {toastMessage && (
        <div className="asg-toast">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="asg-header-card">
        <div className="asg-header-left">
          <div className="asg-badge">
            <FileText size={13} />
            <span>Coursework Management</span>
          </div>
          <h1 className="asg-title">{t("assignments.title", "Assignments & Study Material")}</h1>
          <p className="asg-subtitle">
            {t("assignments.subtitle", "Create coursework assignments with deadlines and rubric marks, evaluate student submissions, and upload verified study material.")}
          </p>
        </div>

        <div className="asg-header-actions">
          {activeTab === "assignments" ? (
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="asg-btn asg-btn-primary"
            >
              <Plus size={16} />
              <span>{t("assignments.createAsgBtn", "Create Assignment")}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="asg-btn asg-btn-primary"
            >
              <Upload size={16} />
              <span>{t("assignments.uploadMatBtn", "Upload Study Material")}</span>
            </button>
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
          <span>{t("assignments.assignmentsTab", "Assignments")} ({assignments.length})</span>
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
          <span>{t("assignments.materialsTab", "Study Material")} ({studyMaterials.length})</span>
        </button>
      </div>

      {/* 3. Search Bar */}
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

      {/* ================= TAB 1: ASSIGNMENTS LIST ================= */}
      {activeTab === "assignments" && (
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
      )}

      {/* ================= TAB 2: STUDY MATERIAL LIST ================= */}
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
                  <button
                    type="button"
                    onClick={() => handleDeleteMaterial(mat.id)}
                    className="asg-delete-icon-btn"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ================= MODAL: CREATE ASSIGNMENT ================= */}
      {isCreateModalOpen && (
        <div className="asg-modal-overlay">
          <div className="asg-modal-card">
            <div className="asg-modal-header">
              <h3 className="asg-modal-title">Create New Assignment</h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="asg-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="asg-modal-form">
              <div className="asg-form-group">
                <label>Assignment Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Assignment 5: Graph Shortest Path Algorithms"
                  required
                  className="asg-input"
                />
              </div>

              <div className="asg-form-row">
                <div className="asg-form-group flex-1">
                  <label>Assigned Class *</label>
                  <select
                    value={newClassId}
                    onChange={(e) => setNewClassId(e.target.value)}
                    className="asg-input"
                  >
                    {assignedClassesData.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.code} — {c.name} ({c.section})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="asg-form-group flex-1">
                  <label>Total Marks *</label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={newMarks}
                    onChange={(e) => setNewMarks(e.target.value)}
                    required
                    className="asg-input"
                  />
                </div>
              </div>

              <div className="asg-form-group">
                <label>Due Date *</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  required
                  className="asg-input"
                />
              </div>

              <div className="asg-form-group">
                <label>Instructions &amp; Problem Statement *</label>
                <textarea
                  rows={4}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain the assignment specifications, requirements, and submission format..."
                  required
                  className="asg-textarea"
                />
              </div>

              <div className="asg-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="asg-btn asg-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="asg-btn asg-btn-primary">
                  <Plus size={16} />
                  <span>Publish Assignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: VIEW SUBMISSIONS & GRADE ================= */}
      {activeGradingAsg && (
        <div className="asg-modal-overlay">
          <div className="asg-modal-card large">
            <div className="asg-modal-header">
              <div>
                <h3 className="asg-modal-title">Submissions: {activeGradingAsg.title}</h3>
                <span className="asg-modal-subtitle">
                  {activeGradingAsg.className} • Total Marks: {activeGradingAsg.totalMarks}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveGradingAsg(null)}
                className="asg-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <div className="asg-submissions-list">
              {(activeGradingAsg.submissions || []).map((sub) => {
                const currentGrade = gradingInputs[sub.id] || { marks: "", feedback: "" };
                const isSubmitted = sub.status !== "Not Submitted";
                const isGraded = sub.status === "Graded";

                return (
                  <div key={sub.id} className="asg-submission-row">
                    <div className="asg-sub-header">
                      <div>
                        <strong>{sub.studentName}</strong>
                        <code>{sub.rollNo}</code>
                      </div>
                      <span className={`asg-sub-badge ${isGraded ? "badge-graded" : isSubmitted ? "badge-pending" : "badge-missing"}`}>
                        {isGraded ? `Graded (${sub.marks}/${activeGradingAsg.totalMarks})` : isSubmitted ? "Pending Review" : "Not Submitted"}
                      </span>
                    </div>

                    {isSubmitted ? (
                      <div className="asg-sub-body">
                        <div className="asg-file-info">
                          <Paperclip size={13} />
                          <span>{sub.fileName || "Solution_File.pdf"}</span>
                          <span className="asg-sub-time">Submitted: {sub.submittedAt}</span>
                        </div>

                        {/* Grade Form */}
                        <div className="asg-grade-inputs">
                          <div className="asg-score-group">
                            <label>Marks:</label>
                            <input
                              type="number"
                              min={0}
                              max={activeGradingAsg.totalMarks}
                              value={currentGrade.marks}
                              onChange={(e) =>
                                setGradingInputs((prev) => ({
                                  ...prev,
                                  [sub.id]: {
                                    ...(prev[sub.id] || {}),
                                    marks: e.target.value
                                  }
                                }))
                              }
                              placeholder="Score"
                              className="asg-score-input"
                            />
                            <span>/ {activeGradingAsg.totalMarks}</span>
                          </div>

                          <div className="asg-feedback-group">
                            <label>Feedback:</label>
                            <input
                              type="text"
                              value={currentGrade.feedback}
                              onChange={(e) =>
                                setGradingInputs((prev) => ({
                                  ...prev,
                                  [sub.id]: {
                                    ...(prev[sub.id] || {}),
                                    feedback: e.target.value
                                  }
                                }))
                              }
                              placeholder="e.g. Good implementation, clean structure."
                              className="asg-feedback-input"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSaveGrade(sub.id)}
                            className="asg-btn asg-btn-primary asg-btn-sm"
                          >
                            <Check size={14} />
                            <span>{isGraded ? "Update" : "Save Grade"}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="asg-missing-note">
                        <span>No files submitted by this student yet.</span>
                        <button
                          type="button"
                          onClick={() => showToast(`Reminder sent to ${sub.studentName}`)}
                          className="asg-btn asg-btn-secondary asg-btn-sm"
                        >
                          Send Reminder
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="asg-modal-actions">
              <button
                type="button"
                onClick={() => setActiveGradingAsg(null)}
                className="asg-btn asg-btn-secondary"
              >
                Close Submissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: UPLOAD STUDY MATERIAL ================= */}
      {isUploadModalOpen && (
        <div className="asg-modal-overlay">
          <div className="asg-modal-card">
            <div className="asg-modal-header">
              <h3 className="asg-modal-title">Upload Study Material</h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="asg-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadMaterial} className="asg-modal-form">
              <div className="asg-form-group">
                <label>Material Title *</label>
                <input
                  type="text"
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  placeholder="e.g. Lecture Notes: Red-Black Tree Balancing & Rotations"
                  required
                  className="asg-input"
                />
              </div>

              <div className="asg-form-row">
                <div className="asg-form-group flex-1">
                  <label>Course *</label>
                  <select
                    value={matClassId}
                    onChange={(e) => setMatClassId(e.target.value)}
                    className="asg-input"
                  >
                    {assignedClassesData.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.code} — {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="asg-form-group flex-1">
                  <label>Unit / Module *</label>
                  <input
                    type="text"
                    value={matUnit}
                    onChange={(e) => setMatUnit(e.target.value)}
                    placeholder="e.g. Unit 3: Trees"
                    required
                    className="asg-input"
                  />
                </div>
              </div>

              <div className="asg-form-group">
                <label>Resource Type *</label>
                <select
                  value={matType}
                  onChange={(e) => setMatType(e.target.value)}
                  className="asg-input"
                >
                  <option value="Lecture Slides">Lecture Slides (PDF)</option>
                  <option value="Formula Sheet">Formula &amp; Cheat Sheet</option>
                  <option value="Lab Guide">Lab Manual &amp; Practice Code</option>
                  <option value="Notes">Faculty Handwritten Notes</option>
                </select>
              </div>

              <div className="asg-form-group">
                <label>Description (Optional)</label>
                <textarea
                  rows={3}
                  value={matDescription}
                  onChange={(e) => setMatDescription(e.target.value)}
                  placeholder="Summary of formulas, theorems, and topics included..."
                  className="asg-textarea"
                />
              </div>

              <div className="asg-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="asg-btn asg-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="asg-btn asg-btn-primary">
                  <Upload size={16} />
                  <span>Upload Resource</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
