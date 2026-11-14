import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  assignedClassesData,
  initialTeacherAssignments,
  todayFacultySchedule,
  facultyAlerts
} from "../../data/teacherData";
import { loadFromStorage } from "../../utils/storage";
import "./TeacherDashboard.css";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  // Dynamic logged-in teacher details
  const teacherName = user?.name || "Dr. Evelyn Reed";
  const teacherDept = user?.department || "Computer Science & Engineering";
  const teacherRoll = user?.rollNo || "FAC-CSE-012";
  const teacherInitials =
    user?.initials ||
    teacherName
      .split(" ")
      .map((p) => p[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

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
          <h1 className="td-header-title">{t("teacherDashboard.title", "Teacher Dashboard")}</h1>
          <p className="td-header-subtitle">
            {teacherDept} • {t("nav.facultyServices", "Faculty Suite")} • {teacherRoll}
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
            <span>Faculty Academic Workspace • Spring Term 2026</span>
          </div>

          <h2 className="td-welcome-title">{t("dashboard.welcomeBack", "Welcome back, {name}", { name: teacherName })}</h2>
          <p className="td-welcome-desc">
            {t("teacherDashboard.subtitle", "You are currently supervising course sections. Manage attendance roll calls, evaluate student submissions, review academic trends, and monitor 75% examination eligibility cutoffs.")}
          </p>

          <div className="td-action-buttons">
            <button
              type="button"
              onClick={() => navigate("/teacher/classes")}
              className="td-portal-switch-btn"
            >
              <Users size={14} />
              <span>{t("nav.myClasses", "My Classes & Students")}</span>
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

        <div className="td-standing-metric-box">
          <div className="td-standing-circle">
            <span className="td-standing-val">{avgAttendance}%</span>
            <span className="td-standing-lbl">Cohort Attendance</span>
          </div>
          <span className="td-standing-sub">Above 75% University Threshold</span>
        </div>
      </section>

      {/* 1. Four Key Summary Metric Cards */}
      <section className="td-summary-cards-grid">
        <div className="td-card-stat">
          <div className="td-card-stat-header">
            <span className="td-card-stat-label">{t("teacherDashboard.assignedBatches", "Total Assigned Classes")}</span>
            <div className="td-card-stat-icon-wrap icon-classes">
              <Users size={18} />
            </div>
          </div>
          <div className="td-card-stat-val">{totalClassesCount} Sections</div>
          <div className="td-card-stat-meta">
            <span>CS-301, CS-303, CS-402</span>
            <span className="td-stat-tag">Active</span>
          </div>
        </div>

        <div className="td-card-stat">
          <div className="td-card-stat-header">
            <span className="td-card-stat-label">{t("teacherDashboard.totalStudents", "Total Students Enrolled")}</span>
            <div className="td-card-stat-icon-wrap icon-students">
              <Sparkles size={18} />
            </div>
          </div>
          <div className="td-card-stat-val">{totalStudentsCount}</div>
          <div className="td-card-stat-meta">
            <span>Across 4 Academic Sections</span>
            <span className="td-stat-tag tag-success">Enrolled</span>
          </div>
        </div>

        <div className="td-card-stat">
          <div className="td-card-stat-header">
            <span className="td-card-stat-label">{t("teacherDashboard.pendingEvaluations", "Pending Evaluations")}</span>
            <div className="td-card-stat-icon-wrap icon-eval">
              <FileText size={18} />
            </div>
          </div>
          <div className="td-card-stat-val">{pendingEvaluationsCount} Tasks</div>
          <div className="td-card-stat-meta">
            <span>Awaiting Review in Portal</span>
            <span className="td-stat-tag tag-amber">Pending</span>
          </div>
        </div>

        <div className="td-card-stat">
          <div className="td-card-stat-header">
            <span className="td-card-stat-label">{t("teacherDashboard.averageAttendance", "Average Attendance")}</span>
            <div className="td-card-stat-icon-wrap icon-attend">
              <CalendarCheck size={18} />
            </div>
          </div>
          <div className="td-card-stat-val">{avgAttendance}%</div>
          <div className="td-card-stat-meta">
            <span>Mandatory Cutoff: 75%</span>
            <span className="td-stat-tag tag-success">Compliant</span>
          </div>
        </div>
      </section>

      {/* 2. Upcoming Classes & Academic Schedule */}
      <section className="td-panel-card">
        <div className="td-panel-header">
          <div>
            <h3 className="td-panel-title">Upcoming Classes &amp; Academic Schedule</h3>
            <p className="td-panel-subtitle">
              Today's instructional lecture timetable, laboratory sessions, and scheduled faculty office hours.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/attendance-management")}
            className="td-ghost-link-btn"
          >
            <span>Attendance Ledger</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="td-schedule-list">
          {todayFacultySchedule.map((item) => (
            <div key={item.id} className="td-schedule-item">
              <div className="td-schedule-time-box">
                <Clock size={15} />
                <span>{item.time}</span>
              </div>

              <div className="td-schedule-info">
                <div className="td-schedule-title-row">
                  <h4 className="td-schedule-subject">{item.subject}</h4>
                  <span className="td-schedule-code-badge">{item.code} • {item.section}</span>
                </div>
                <div className="td-schedule-meta-row">
                  <span className="td-schedule-meta-item">
                    <MapPin size={13} /> {item.room}
                  </span>
                  <span className="td-schedule-meta-item">
                    <BookOpen size={13} /> {item.topic}
                  </span>
                  <span className="td-schedule-meta-item">
                    <Users size={13} /> {item.totalStudents} Students
                  </span>
                </div>
              </div>

              <div className="td-schedule-action">
                <span className={`td-schedule-status-pill ${item.attendanceStatus.includes("Marked") ? "pill-marked" : "pill-pending"}`}>
                  {item.attendanceStatus}
                </span>
                <button
                  type="button"
                  onClick={() => navigate("/teacher/classes")}
                  className="td-btn-sm td-btn-action"
                >
                  View Roster
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Summary of Recent Academic Activity & Alerts */}
      <section className="td-two-col-grid">
        {/* Left Column: Defaulter & Support Alerts */}
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
                    <strong>{alert.studentName}</strong> • <code>{alert.rollNo}</code> • {alert.classCode}
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
              <p className="td-panel-subtitle">Direct shortcuts to all five specialized faculty portals.</p>
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
