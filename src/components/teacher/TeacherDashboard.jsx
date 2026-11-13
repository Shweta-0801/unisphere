import { useMemo } from "react";
import {
  Users,
  FileText,
  CalendarCheck,
  Sparkles,
  BookOpen,
  Award,
  Clock,
  MapPin,
  AlertTriangle,
  ArrowRight,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import {
  assignedClassesData,
  initialTeacherAssignments,
  todayFacultySchedule,
  facultyAlerts
} from "../../data/teacherData";
import { loadFromStorage } from "../../utils/storage";
import "./TeacherDashboard.css";

export default function TeacherDashboard({ onNavigate }) {
  // Navigation helper that works whether inside React Router or standalone
  const navigate = (path) => {
    if (typeof onNavigate === "function") {
      onNavigate(path);
    } else {
      console.log("Navigating to:", path);
      // If window.location or internal router is active:
      try {
        window.history.pushState({}, "", path);
      } catch {
        // ignore
      }
    }
  };

  // Fixed logged-in teacher details (UniSphere Lead Faculty)
  const teacherName = "Dr. Evelyn Reed";
  const teacherDept = "Computer Science & Engineering";
  const teacherRoll = "FAC-CSE-012";
  const teacherInitials = "ER";

  // Live stored assignments to compute pending evaluations
  const assignments = useMemo(() => {
    return loadFromStorage("unisphere_faculty_assignments", initialTeacherAssignments);
  }, []);

  const totalClassesCount = assignedClassesData.length;
  const totalStudentsCount = assignedClassesData.reduce((acc, c) => acc + c.totalStudents, 0);

  // Calculate pending evaluations across all assignments
  const pendingEvaluationsCount = useMemo(() => {
    return assignments.reduce((acc, asg) => {
      if (typeof asg.pendingGrading === "number") return acc + asg.pendingGrading;
      if (asg.submissions && Array.isArray(asg.submissions)) {
        return acc + asg.submissions.filter((s) => s.status === "Pending Review").length;
      }
      return acc;
    }, 0);
  }, [assignments]);

  // Average attendance across assigned classes
  const avgAttendance = useMemo(() => {
    const sum = assignedClassesData.reduce((acc, c) => acc + (c.averageAttendance || 80), 0);
    return (sum / assignedClassesData.length).toFixed(1);
  }, []);

  return (
    <div className="td-root">
      {/* Top Header Bar */}
      <header className="td-header">
        <div>
          <h1 className="td-header-title">Teacher Dashboard</h1>
          <p className="td-header-subtitle">
            {teacherDept} â€¢ Faculty Academic Suite â€¢ {teacherRoll}
          </p>
        </div>

        <div className="td-profile-chip">
          <div className="td-avatar">{teacherInitials}</div>
          <div className="td-profile-text">
            <span className="td-profile-name">{teacherName}</span>
            <code className="td-profile-id">{teacherRoll}</code>
          </div>
        </div>
      </header>

      {/* Welcome Banner with Fast Quicklinks */}
      <section className="td-welcome-card">
        <div className="td-welcome-left">
          <div className="td-welcome-badge">
            <Sparkles size={12} />
            <span>Faculty Academic Workspace â€¢ Spring Term 2026</span>
          </div>

          <h2 className="td-welcome-title">Welcome back, {teacherName}</h2>
          <p className="td-welcome-desc">
            You are supervising 4 course sections in Computer Science. Manage daily attendance roll calls, review student assignment submissions, track academic performance, and monitor the 75% attendance cutoff.
          </p>

          <div className="td-action-buttons">
            <button
              type="button"
              onClick={() => navigate("/teacher/classes")}
              className="td-portal-switch-btn"
            >
              <Users size={14} />
              <span>My Classes &amp; Students</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/teacher/assignments")}
              className="td-portal-switch-btn"
            >
              <FileText size={14} />
              <span>Assignments Portal</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/academic-performance")}
              className="td-portal-switch-btn"
            >
              <Award size={14} />
              <span>Academic Performance</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/attendance-management")}
              className="td-portal-switch-btn"
            >
              <CalendarCheck size={14} />
              <span>Attendance Management</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metric Cards Row */}
      <section className="td-metrics-grid">
        <div className="td-metric-card">
          <div className="td-metric-icon-wrap icon-blue">
            <Users size={20} />
          </div>
          <div className="td-metric-content">
            <span className="td-metric-label">Enrolled Students</span>
            <div className="td-metric-num">{totalStudentsCount}</div>
            <span className="td-metric-trend">Across {totalClassesCount} active sections</span>
          </div>
        </div>

        <div className="td-metric-card">
          <div className="td-metric-icon-wrap icon-burgundy">
            <CalendarCheck size={20} />
          </div>
          <div className="td-metric-content">
            <span className="td-metric-label">Avg Attendance</span>
            <div className="td-metric-num">{avgAttendance}%</div>
            <span className="td-metric-trend text-positive">Above 75% university quota</span>
          </div>
        </div>

        <div className="td-metric-card">
          <div className="td-metric-icon-wrap icon-amber">
            <FileText size={20} />
          </div>
          <div className="td-metric-content">
            <span className="td-metric-label">Active Coursework</span>
            <div className="td-metric-num">{assignments.length}</div>
            <span className="td-metric-trend">{pendingEvaluationsCount} pending grading</span>
          </div>
        </div>

        <div className="td-metric-card">
          <div className="td-metric-icon-wrap icon-green">
            <Clock size={20} />
          </div>
          <div className="td-metric-content">
            <span className="td-metric-label">Today's Lectures</span>
            <div className="td-metric-num">{todayFacultySchedule.length}</div>
            <span className="td-metric-trend">Next: {todayFacultySchedule[0]?.time || "09:30 AM"}</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Today Schedule + Course Defaulter Watchlist */}
      <section className="td-two-col-grid">
        {/* Left Column: Today's Teaching Schedule */}
        <div className="td-panel-card">
          <div className="td-panel-header">
            <div>
              <h3 className="td-panel-title">Today's Teaching Schedule</h3>
              <p className="td-panel-subtitle">Scheduled theory lectures, tutorials, and practical lab roll calls.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/teacher/classes")}
              className="td-ghost-link-btn"
            >
              <span>View Roster</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="td-schedule-list">
            {todayFacultySchedule.map((item) => (
              <div key={item.id} className="td-schedule-card">
                <div className="td-schedule-time">
                  <Clock size={14} />
                  <span>{item.time}</span>
                </div>
                <div className="td-schedule-info">
                  <div className="td-schedule-head">
                    <span className="td-class-code">{item.classCode}</span>
                    <span className="td-class-type">{item.type}</span>
                  </div>
                  <h4 className="td-schedule-title">{item.subject}</h4>
                  <div className="td-schedule-meta">
                    <span className="td-room-tag">
                      <MapPin size={12} />
                      <span>{item.room}</span>
                    </span>
                    <span className="td-section-tag">{item.section}</span>
                    <span className="td-strength-tag">{item.studentCount} Students</span>
                  </div>
                </div>
                <div className="td-schedule-action">
                  <button
                    type="button"
                    onClick={() => navigate("/attendance-management")}
                    className={`td-btn-rollcall ${item.attendanceTaken ? "taken" : ""}`}
                  >
                    {item.attendanceTaken ? "Attendance Logged" : "Take Roll Call"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Class Performance & Defaulters Watchlist */}
        <div className="td-panel-card">
          <div className="td-panel-header">
            <div>
              <h3 className="td-panel-title">Course Performance &amp; Defaulter Watch</h3>
              <p className="td-panel-subtitle">Section breakdown of average attendance and students below 75%.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/academic-performance")}
              className="td-ghost-link-btn"
            >
              <span>All Analytics</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="td-classes-table-wrap">
            <table className="td-classes-table">
              <thead>
                <tr>
                  <th>Class / Section</th>
                  <th>Attendance %</th>
                  <th>Syllabus</th>
                  <th>Defaulters</th>
                </tr>
              </thead>
              <tbody>
                {assignedClassesData.map((cls) => (
                  <tr key={cls.id}>
                    <td>
                      <div className="td-tbl-class-code">{cls.code}</div>
                      <div className="td-tbl-class-name">{cls.name} ({cls.section})</div>
                    </td>
                    <td>
                      <div className="td-tbl-att-wrap">
                        <span className={`td-att-val ${cls.averageAttendance < 75 ? "text-danger" : ""}`}>
                          {cls.averageAttendance}%
                        </span>
                        <div className="td-tbl-bar-track">
                          <div
                            className="td-tbl-bar-fill"
                            style={{
                              width: `${cls.averageAttendance}%`,
                              backgroundColor: cls.averageAttendance < 75 ? "#DC2626" : "#6B1E2D"
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="td-syllabus-pct">{cls.syllabusProgress}% Done</span>
                    </td>
                    <td>
                      <span className={`td-defaulter-pill ${cls.defaulterCount > 0 ? "warn" : "ok"}`}>
                        {cls.defaulterCount} {cls.defaulterCount === 1 ? "student" : "students"} &lt;75%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom Grid: Alerts & Quick Module Hub */}
      <section className="td-two-col-grid">
        {/* Left Column: Academic & Attendance Alerts */}
        <div className="td-panel-card">
          <div className="td-panel-header">
            <div>
              <h3 className="td-panel-title">Academic &amp; Attendance Alerts</h3>
              <p className="td-panel-subtitle">Students below 75% cutoff or requiring mentorship intervention.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/academic-performance")}
              className="td-ghost-link-btn"
            >
              <span>Performance Ledger</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="td-alerts-list">
            {facultyAlerts.map((alert) => (
              <div key={alert.id} className={`td-alert-card severity-${alert.severity}`}>
                <div className="td-alert-icon">
                  {alert.severity === "danger" ? (
                    <AlertCircle size={16} />
                  ) : alert.severity === "warning" ? (
                    <AlertTriangle size={16} />
                  ) : (
                    <Sparkles size={16} />
                  )}
                </div>
                <div className="td-alert-content">
                  <div className="td-alert-head">
                    <span className="td-alert-title">{alert.title}</span>
                    <span className="td-alert-badge">{alert.stat}</span>
                  </div>
                  <div className="td-alert-student">
                    <strong>{alert.studentName}</strong> â€¢ <code>{alert.rollNo}</code> â€¢ {alert.classCode}
                  </div>
                  <p className="td-alert-detail">{alert.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Portal Fast Navigation Modules */}
        <div className="td-panel-card">
          <div className="td-panel-header">
            <div>
              <h3 className="td-panel-title">Faculty Module Hub</h3>
              <p className="td-panel-subtitle">Direct shortcuts to specialized faculty academic modules.</p>
            </div>
          </div>

          <div className="td-nav-modules-grid">
            <div
              className="td-nav-module-tile"
              onClick={() => navigate("/teacher/classes")}
              role="button"
              tabIndex={0}
            >
              <div className="td-tile-icon-wrap">
                <Users size={18} />
              </div>
              <div className="td-tile-text">
                <h4 className="td-tile-title">My Classes &amp; Students</h4>
                <p className="td-tile-desc">Inspect class rosters, search by roll no, and review student attendance histories.</p>
              </div>
              <ChevronRight size={16} className="td-tile-arrow" />
            </div>

            <div
              className="td-nav-module-tile"
              onClick={() => navigate("/teacher/assignments")}
              role="button"
              tabIndex={0}
            >
              <div className="td-tile-icon-wrap">
                <FileText size={18} />
              </div>
              <div className="td-tile-text">
                <h4 className="td-tile-title">Assignments Portal</h4>
                <p className="td-tile-desc">Create coursework tasks, inspect student solution files, and award marks with feedback.</p>
              </div>
              <ChevronRight size={16} className="td-tile-arrow" />
            </div>

            <div
              className="td-nav-module-tile"
              onClick={() => navigate("/academic-performance")}
              role="button"
              tabIndex={0}
            >
              <div className="td-tile-icon-wrap">
                <Award size={18} />
              </div>
              <div className="td-tile-text">
                <h4 className="td-tile-title">Academic Performance</h4>
                <p className="td-tile-desc">Analyze class averages, grade distributions, and evaluate internal, mid-term, and end-term marks.</p>
              </div>
              <ChevronRight size={16} className="td-tile-arrow" />
            </div>

            <div
              className="td-nav-module-tile"
              onClick={() => navigate("/attendance-management")}
              role="button"
              tabIndex={0}
            >
              <div className="td-tile-icon-wrap">
                <CalendarCheck size={18} />
              </div>
              <div className="td-tile-text">
                <h4 className="td-tile-title">Attendance Management</h4>
                <p className="td-tile-desc">Conduct daily roll calls for all 18 lectures, view calendar history, and defend condonation cutoff.</p>
              </div>
              <ChevronRight size={16} className="td-tile-arrow" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
