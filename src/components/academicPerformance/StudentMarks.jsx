import React, { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Award,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Save,
  Download
} from "lucide-react";
import {
  teacherProfile,
  classesList,
  calculateTotalMarks,
  calculateGrade,
  getStudentsByClass
} from "../../data/teacherDashboardData";
import { useAuth } from "../../context/AuthContext";

export default function StudentMarks({
  students,
  selectedClass,
  onSelectClass,
  onUpdateMarks
}) {
  const { user } = useAuth();
  const teacherName = user?.name || teacherProfile.name;
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [sortBy, setSortBy] = useState("rollAsc");
  const [editingStudent, setEditingStudent] = useState(null);
  const [internalInput, setInternalInput] = useState("");
  const [midTermInput, setMidTermInput] = useState("");
  const [endTermInput, setEndTermInput] = useState("");
  const [notification, setNotification] = useState("");

  // Get students for current class
  const classStudents = getStudentsByClass(students, selectedClass);

  // Filter students
  const filteredStudents = classStudents.filter((student) => {
    const query = searchQuery.toLowerCase().trim();
    const nameMatch = student.name.toLowerCase().includes(query);
    const rollMatch = student.rollNo.toString().includes(query);
    if (query && !nameMatch && !rollMatch) return false;

    const total = calculateTotalMarks(student.marks);
    const grade = calculateGrade(total);

    if (filterGrade === "A+") return grade === "A+";
    if (filterGrade === "A") return grade === "A";
    if (filterGrade === "B") return grade === "B";
    if (filterGrade === "C") return grade === "C";
    if (filterGrade === "remedial") return total < 45;

    return true;
  });

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const totalA = calculateTotalMarks(a.marks);
    const totalB = calculateTotalMarks(b.marks);

    if (sortBy === "rollAsc") return a.rollNo - b.rollNo;
    if (sortBy === "nameAsc") return a.name.localeCompare(b.name);
    if (sortBy === "marksDesc") return totalB - totalA;
    if (sortBy === "marksAsc") return totalA - totalB;
    return 0;
  });

  // Open edit modal
  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setInternalInput(student.marks.internal);
    setMidTermInput(student.marks.midTerm);
    setEndTermInput(student.marks.endTerm);
  };

  // Save edited marks
  const handleSaveMarks = (e) => {
    e.preventDefault();
    if (!editingStudent) return;

    const internal = Math.min(30, Math.max(0, parseInt(internalInput) || 0));
    const midTerm = Math.min(30, Math.max(0, parseInt(midTermInput) || 0));
    const endTerm = Math.min(40, Math.max(0, parseInt(endTermInput) || 0));

    onUpdateMarks(editingStudent.id, {
      internal,
      midTerm,
      endTerm
    });

    const newTotal = internal + midTerm + endTerm;
    const newGrade = calculateGrade(newTotal);

    setNotification(`Updated marks for ${editingStudent.name}: ${newTotal}/100 (Grade ${newGrade})`);
    setEditingStudent(null);
    setTimeout(() => setNotification(""), 3500);
  };

  return (
    <div className="tchr-students-att-view">
      {/* Toast Notification */}
      {notification && (
        <div className="tchr-alert-toast">
          <CheckCircle2 size={16} className="text-success" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header with Section Selection */}
      <div className="tchr-section-header-box">
        <div className="tchr-header-left">
          <span className="tchr-sub-tag perf-tag">Subject: {teacherProfile.subject} ({teacherProfile.subjectCode})</span>
          <h2 className="tchr-section-heading">Student Examination &amp; Course Marks</h2>
          <p className="tchr-section-description">
            Continuous evaluation records for <strong>{teacherName}</strong> across all enrolled sections.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="tchr-class-pills-bar">
          <span className="tchr-pills-label">Select Class:</span>
          <div className="tchr-pills-group">
            {classesList.map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => onSelectClass(cls)}
                className={`tchr-class-pill-btn perf-pill-btn ${selectedClass === cls ? "active" : ""}`}
              >
                <span>{cls}</span>
                <span className="tchr-pill-count">20</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search, Filter, Sort Row */}
      <div className="tchr-controls-card">
        <div className="tchr-controls-row-bottom">
          {/* Search box */}
          <div className="tchr-search-input-wrap">
            <Search size={15} className="tchr-search-icon" />
            <input
              type="text"
              placeholder={`Search in ${selectedClass} by student name or roll no...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="tchr-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="tchr-search-clear-btn"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter by Grade */}
          <div className="tchr-filter-select-wrap">
            <Filter size={14} />
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="tchr-filter-select"
            >
              <option value="all">All Grades ({classStudents.length})</option>
              <option value="A+">Grade A+ (&ge;90)</option>
              <option value="A">Grade A (80-89)</option>
              <option value="B">Grade B (70-79)</option>
              <option value="C">Grade C (60-69)</option>
              <option value="remedial">Needs Remedial (&lt;45)</option>
            </select>
          </div>

          {/* Sort dropdown */}
          <div className="tchr-sort-select-wrap">
            <ArrowUpDown size={14} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="tchr-filter-select"
            >
              <option value="rollAsc">Sort by: Roll No (Asc)</option>
              <option value="marksDesc">Sort by: Total Marks (High-Low)</option>
              <option value="marksAsc">Sort by: Total Marks (Low-High)</option>
              <option value="nameAsc">Sort by: Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Student Marks Table */}
      <div className="tchr-table-card-container">
        <div className="tchr-table-meta-bar">
          <span className="tchr-table-meta-text">
            Displaying <strong>{sortedStudents.length}</strong> of <strong>{classStudents.length}</strong> students in section <strong>{selectedClass}</strong>
          </span>
          <span className="tchr-calc-note perf-calc-note">
            Evaluation: Internal (/30) + Mid-Term (/30) + End-Term (/40) = Total (/100)
          </span>
        </div>

        <div className="tchr-responsive-table-wrap">
          <table className="tchr-data-table">
            <thead>
              <tr>
                <th style={{ width: "85px" }}>Roll No.</th>
                <th>Student</th>
                <th style={{ width: "110px", textAlign: "center" }}>Internal (/30)</th>
                <th style={{ width: "110px", textAlign: "center" }}>Mid-Term (/30)</th>
                <th style={{ width: "110px", textAlign: "center" }}>End-Term (/40)</th>
                <th style={{ width: "110px", textAlign: "center" }}>Total (/100)</th>
                <th style={{ width: "95px", textAlign: "center" }}>Grade</th>
                <th style={{ width: "140px", textAlign: "center" }}>Standing</th>
                <th style={{ width: "90px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => {
                const total = calculateTotalMarks(student.marks);
                const grade = calculateGrade(total);
                const isRemedial = total < 45;

                return (
                  <tr key={student.id} className={isRemedial ? "row-warning" : ""}>
                    {/* Roll No */}
                    <td>
                      <span className="tchr-roll-badge">{student.rollNo}</span>
                    </td>

                    {/* Student Name */}
                    <td>
                      <div className="tchr-student-cell">
                        <div className="tchr-avatar-circle perf-avatar">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <span className="tchr-student-name">{student.name}</span>
                          <span className="tchr-student-section">{student.className} • Data Structures</span>
                        </div>
                      </div>
                    </td>

                    {/* Internal */}
                    <td style={{ textAlign: "center" }}>
                      <span className="tchr-stat-cell-num">{student.marks.internal}</span>
                    </td>

                    {/* Mid-Term */}
                    <td style={{ textAlign: "center" }}>
                      <span className="tchr-stat-cell-num">{student.marks.midTerm}</span>
                    </td>

                    {/* End-Term */}
                    <td style={{ textAlign: "center" }}>
                      <span className="tchr-stat-cell-num">{student.marks.endTerm}</span>
                    </td>

                    {/* Total */}
                    <td style={{ textAlign: "center" }}>
                      <span className={`tchr-stat-cell-num font-bold ${isRemedial ? "text-danger" : "text-indigo"}`}>
                        {total}
                      </span>
                    </td>

                    {/* Grade */}
                    <td style={{ textAlign: "center" }}>
                      <span className={`tchr-grade-pill grade-${grade.toLowerCase().replace("+", "-plus")}`}>
                        {grade}
                      </span>
                    </td>

                    {/* Standing */}
                    <td style={{ textAlign: "center" }}>
                      {total >= 85 ? (
                        <span className="tchr-badge-safe perf-safe">Distinction</span>
                      ) : total >= 70 ? (
                        <span className="tchr-badge-safe">First Class</span>
                      ) : total >= 50 ? (
                        <span className="tchr-pill-warn">Pass</span>
                      ) : (
                        <span className="tchr-badge-danger">
                          <AlertCircle size={11} /> Support Needed
                        </span>
                      )}
                    </td>

                    {/* Edit Action */}
                    <td style={{ textAlign: "center" }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(student)}
                        className="tchr-edit-btn"
                        title="Edit Marks"
                      >
                        <Edit2 size={13} />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                );
              })}

              {sortedStudents.length === 0 && (
                <tr>
                  <td colSpan={9} className="tchr-empty-table-cell">
                    <p>No student records match your filter criteria in {selectedClass}.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setFilterGrade("all");
                      }}
                      className="tchr-btn-outline sm"
                    >
                      Reset Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Marks Modal */}
      {editingStudent && (
        <div className="tchr-modal-overlay" onClick={() => setEditingStudent(null)}>
          <div className="tchr-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="tchr-modal-header">
              <div>
                <h3 className="tchr-modal-title">Edit Student Marks</h3>
                <p className="tchr-modal-subtitle">{editingStudent.name} • Roll #{editingStudent.rollNo} ({selectedClass})</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="tchr-modal-close-btn"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMarks} className="tchr-modal-form">
              <div className="tchr-form-group">
                <label htmlFor="edit-internal">Internal Assessment Marks (Max 30)</label>
                <input
                  id="edit-internal"
                  type="number"
                  min="0"
                  max="30"
                  value={internalInput}
                  onChange={(e) => setInternalInput(e.target.value)}
                  className="tchr-form-input"
                  required
                />
              </div>

              <div className="tchr-form-group">
                <label htmlFor="edit-mid">Mid-Term Examination Marks (Max 30)</label>
                <input
                  id="edit-mid"
                  type="number"
                  min="0"
                  max="30"
                  value={midTermInput}
                  onChange={(e) => setMidTermInput(e.target.value)}
                  className="tchr-form-input"
                  required
                />
              </div>

              <div className="tchr-form-group">
                <label htmlFor="edit-end">End-Term Examination Marks (Max 40)</label>
                <input
                  id="edit-end"
                  type="number"
                  min="0"
                  max="40"
                  value={endTermInput}
                  onChange={(e) => setEndTermInput(e.target.value)}
                  className="tchr-form-input"
                  required
                />
              </div>

              <div className="tchr-modal-preview-row">
                <span>Calculated Total:</span>
                <strong>
                  {(parseInt(internalInput) || 0) + (parseInt(midTermInput) || 0) + (parseInt(endTermInput) || 0)} / 100
                  &nbsp;• Grade: {calculateGrade((parseInt(internalInput) || 0) + (parseInt(midTermInput) || 0) + (parseInt(endTermInput) || 0))}
                </strong>
              </div>

              <div className="tchr-modal-actions">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="tchr-btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="tchr-btn-primary perf-primary-btn"
                >
                  Save Marks
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
