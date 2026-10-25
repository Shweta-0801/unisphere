import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Calendar,
  Save,
  Filter,
  ArrowUpDown,
  Download,
  Users
} from "lucide-react";
import {
  teacherProfile,
  classesList,
  calculateAttendancePercentage,
  getStudentsByClass
} from "../../data/teacherDashboardData";
import { useAuth } from "../../context/AuthContext";

export default function StudentAttendance({
  students,
  selectedClass,
  onSelectClass,
  onUpdateAttendance,
  onSaveAttendance
}) {
  const { user } = useAuth();
  const teacherName = user?.name || teacherProfile.name;
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // "all" | "shortage" | "safe" | "high"
  const [sortBy, setSortBy] = useState("rollAsc"); // "rollAsc" | "nameAsc" | "pctDesc" | "pctAsc"
  const [rollCallDate, setRollCallDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [notification, setNotification] = useState("");

  // Get students for current selected class
  const classStudents = getStudentsByClass(students, selectedClass);

  // Filter students
  const filteredStudents = classStudents.filter((student) => {
    // Search match
    const query = searchQuery.toLowerCase().trim();
    const nameMatch = student.name.toLowerCase().includes(query);
    const rollMatch = student.rollNo.toString().includes(query);
    if (query && !nameMatch && !rollMatch) return false;

    // Filter status match
    const pct = calculateAttendancePercentage(student.attendance.present, student.attendance.total);
    if (filterMode === "shortage") return pct < 75;
    if (filterMode === "safe") return pct >= 75;
    if (filterMode === "high") return pct >= 90;

    return true;
  });

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const pctA = calculateAttendancePercentage(a.attendance.present, a.attendance.total);
    const pctB = calculateAttendancePercentage(b.attendance.present, b.attendance.total);

    if (sortBy === "rollAsc") return a.rollNo - b.rollNo;
    if (sortBy === "nameAsc") return a.name.localeCompare(b.name);
    if (sortBy === "pctDesc") return pctB - pctA;
    if (sortBy === "pctAsc") return pctA - pctB;
    return 0;
  });

  // Toggle single student present / absent for a roll call session
  const handleToggleAttendance = (studentId) => {
    onUpdateAttendance(studentId);
  };

  // Mark all present in selected class
  const handleMarkAll = (status) => {
    classStudents.forEach((st) => {
      if (status === "present" && st.attendance.present < st.attendance.total) {
        onUpdateAttendance(st.id, true);
      } else if (status === "absent" && st.attendance.present > 0) {
        onUpdateAttendance(st.id, false);
      }
    });

    setNotification(`Updated all students in ${selectedClass} as ${status}!`);
    setTimeout(() => setNotification(""), 3500);
  };

  // Save attendance
  const handleSave = () => {
    onSaveAttendance(selectedClass, rollCallDate);
    setNotification(`Attendance for ${selectedClass} on ${rollCallDate} successfully recorded and synced.`);
    setTimeout(() => setNotification(""), 4000);
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

      {/* Header with Class Selector */}
      <div className="tchr-section-header-box">
        <div className="tchr-header-left">
          <span className="tchr-sub-tag">Subject: {teacherProfile.subject} ({teacherProfile.subjectCode})</span>
          <h2 className="tchr-section-heading">Class Roll Call &amp; Student Attendance</h2>
          <p className="tchr-section-description">
            Managing student records for <strong>{teacherName}</strong> across active sections.
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
                className={`tchr-class-pill-btn ${selectedClass === cls ? "active" : ""}`}
              >
                <span>{cls}</span>
                <span className="tchr-pill-count">20</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Control Bar: Date, Roll Call Actions, Search, Filter */}
      <div className="tchr-controls-card">
        <div className="tchr-controls-row-top">
          {/* Roll Call Date Picker */}
          <div className="tchr-date-box">
            <label htmlFor="roll-date" className="tchr-control-label">
              <Calendar size={14} />
              <span>Roll Call Date:</span>
            </label>
            <input
              id="roll-date"
              type="date"
              value={rollCallDate}
              onChange={(e) => setRollCallDate(e.target.value)}
              className="tchr-date-input"
            />
          </div>

          {/* Quick Mark All Buttons */}
          <div className="tchr-quick-mark-actions">
            <span className="tchr-control-label">Batch Actions:</span>
            <div className="tchr-btn-group">
              <button
                type="button"
                onClick={() => handleMarkAll("present")}
                className="tchr-btn-mark-all-pres"
                title="Increment present count for all students in section"
              >
                <CheckCircle2 size={13} />
                <span>All Present</span>
              </button>

              <button
                type="button"
                onClick={() => handleMarkAll("absent")}
                className="tchr-btn-mark-all-abs"
                title="Mark all students as absent"
              >
                <XCircle size={13} />
                <span>All Absent</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="tchr-btn-save-records"
              >
                <Save size={14} />
                <span>Save Attendance</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search, Filter, Sort Row */}
        <div className="tchr-controls-row-bottom">
          {/* Search box */}
          <div className="tchr-search-input-wrap">
            <Search size={15} className="tchr-search-icon" />
            <input
              type="text"
              placeholder={`Search in ${selectedClass} by name or roll no...`}
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

          {/* Filter dropdown */}
          <div className="tchr-filter-select-wrap">
            <Filter size={14} />
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="tchr-filter-select"
            >
              <option value="all">All Students ({classStudents.length})</option>
              <option value="shortage">Shortage (&lt;75% Attendance)</option>
              <option value="safe">Safe (&ge;75% Attendance)</option>
              <option value="high">High Attendance (&ge;90%)</option>
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
              <option value="nameAsc">Sort by: Name (A-Z)</option>
              <option value="pctDesc">Sort by: Attendance (High-Low)</option>
              <option value="pctAsc">Sort by: Attendance (Low-High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Student Attendance Table */}
      <div className="tchr-table-card-container">
        <div className="tchr-table-meta-bar">
          <span className="tchr-table-meta-text">
            Showing <strong>{sortedStudents.length}</strong> of <strong>{classStudents.length}</strong> students in <strong>{selectedClass}</strong>
          </span>
          <span className="tchr-calc-note">
            Formula: Attendance % = (Present / Classes Held) &times; 100
          </span>
        </div>

        <div className="tchr-responsive-table-wrap">
          <table className="tchr-data-table">
            <thead>
              <tr>
                <th style={{ width: "90px" }}>Roll No.</th>
                <th>Student Name</th>
                <th style={{ width: "120px", textAlign: "center" }}>Classes Held</th>
                <th style={{ width: "110px", textAlign: "center" }}>Present</th>
                <th style={{ width: "110px", textAlign: "center" }}>Absent</th>
                <th style={{ width: "180px" }}>Attendance %</th>
                <th style={{ width: "130px", textAlign: "center" }}>Status</th>
                <th style={{ width: "140px", textAlign: "center" }}>Roll Call</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => {
                const held = student.attendance.total;
                const present = student.attendance.present;
                const absent = held - present;
                const pct = calculateAttendancePercentage(present, held);
                const isShortage = pct < 75;

                return (
                  <tr key={student.id} className={isShortage ? "row-warning" : ""}>
                    {/* Roll No */}
                    <td>
                      <span className="tchr-roll-badge">{student.rollNo}</span>
                    </td>

                    {/* Student Name */}
                    <td>
                      <div className="tchr-student-cell">
                        <div className="tchr-avatar-circle">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <span className="tchr-student-name">{student.name}</span>
                          <span className="tchr-student-section">{student.className} • Data Structures</span>
                        </div>
                      </div>
                    </td>

                    {/* Classes Held */}
                    <td style={{ textAlign: "center" }}>
                      <span className="tchr-stat-cell-num">{held}</span>
                    </td>

                    {/* Present */}
                    <td style={{ textAlign: "center" }}>
                      <span className="tchr-stat-cell-num text-success font-bold">
                        {present}
                      </span>
                    </td>

                    {/* Absent */}
                    <td style={{ textAlign: "center" }}>
                      <span className={`tchr-stat-cell-num ${absent > 4 ? "text-danger" : ""}`}>
                        {absent}
                      </span>
                    </td>

                    {/* Attendance % + Visual Progress Bar */}
                    <td>
                      <div className="tchr-pct-display-wrap">
                        <div className="tchr-pct-text-row">
                          <strong className={`tchr-pct-val ${isShortage ? "text-danger" : ""}`}>
                            {pct}%
                          </strong>
                          <span className="tchr-pct-sub">({present}/{held})</span>
                        </div>
                        <div className="tchr-mini-track">
                          <div
                            className={`tchr-mini-fill ${
                              pct >= 85
                                ? "fill-emerald"
                                : pct >= 75
                                ? "fill-amber"
                                : "fill-rose"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td style={{ textAlign: "center" }}>
                      {isShortage ? (
                        <span className="tchr-badge-danger" title="Below 75% university requirement">
                          <AlertTriangle size={11} /> Shortage
                        </span>
                      ) : (
                        <span className="tchr-badge-safe" title="Eligible for end-semester exams">
                          Safe ({pct}%)
                        </span>
                      )}
                    </td>

                    {/* Interactive Roll Call Toggle Buttons */}
                    <td style={{ textAlign: "center" }}>
                      <div className="tchr-toggle-actions-cell">
                        <button
                          type="button"
                          onClick={() => onUpdateAttendance(student.id, true)}
                          className={`tchr-btn-toggle-pres ${present >= held ? "disabled" : ""}`}
                          title="Record Present"
                        >
                          +P
                        </button>
                        <button
                          type="button"
                          onClick={() => onUpdateAttendance(student.id, false)}
                          className={`tchr-btn-toggle-abs ${present <= 0 ? "disabled" : ""}`}
                          title="Record Absent"
                        >
                          -A
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {sortedStudents.length === 0 && (
                <tr>
                  <td colSpan={8} className="tchr-empty-table-cell">
                    <p>No students match your query in section {selectedClass}.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setFilterMode("all");
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
    </div>
  );
}
