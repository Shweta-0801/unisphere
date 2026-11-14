import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Award,
  Send,
  CheckCircle2,
  Users
} from "lucide-react";
import {
  teacherProfile,
  classesList,
  getClassMetrics,
  calculateAttendancePercentage
} from "../../data/teacherDashboardData";
import { useAuth } from "../../context/AuthContext";

export default function AttendanceStats({ students, onSelectClass, onTabChange }) {
  const { user } = useAuth();
  const teacherName = user?.name || teacherProfile.name;
  const [noticeSent, setNoticeSent] = useState(false);

  // Class metrics
  const classStatsList = classesList.map((cls) => getClassMetrics(students, cls));

  // Find all students below 75% across all 4 classes
  const defaultersList = students
    .map((st) => {
      const pct = calculateAttendancePercentage(st.attendance.present, st.attendance.total);
      // Classes needed to reach 75%:
      // (present + x) / (total + x) >= 0.75  =>  present + x >= 0.75*total + 0.75*x  =>  0.25*x >= 0.75*total - present
      const needed = Math.max(1, Math.ceil((0.75 * st.attendance.total - st.attendance.present) / 0.25));
      return { ...st, pct, needed };
    })
    .filter((st) => st.pct < 75);

  // Top Attendees (>=95%)
  const topAttendees = students
    .map((st) => {
      const pct = calculateAttendancePercentage(st.attendance.present, st.attendance.total);
      return { ...st, pct };
    })
    .filter((st) => st.pct >= 94)
    .slice(0, 8);

  // Distribution counts
  const excellentCount = students.filter((s) => calculateAttendancePercentage(s.attendance.present, s.attendance.total) >= 85).length;
  const normalCount = students.filter((s) => {
    const p = calculateAttendancePercentage(s.attendance.present, s.attendance.total);
    return p >= 75 && p < 85;
  }).length;
  const criticalCount = defaultersList.length;

  const handleSendNotices = () => {
    setNoticeSent(true);
    setTimeout(() => setNoticeSent(false), 4000);
  };

  return (
    <div className="tchr-stats-view">
      {noticeSent && (
        <div className="tchr-alert-toast">
          <CheckCircle2 size={16} className="text-success" />
          <span>Automated condonation shortage alerts dispatched to {defaultersList.length} students and department advisor!</span>
        </div>
      )}

      {/* Header */}
      <div className="tchr-section-header-row">
        <div>
          <span className="tchr-sub-tag">Analytical Insights • Data Structures</span>
          <h2 className="tchr-section-heading">Attendance Statistics &amp; Condonation Analytics</h2>
          <p className="tchr-section-description">
            Cohort comparisons, attendance brackets, and critical condonation alerts for <strong>{teacherName}</strong>.
          </p>
        </div>
      </div>

      {/* 3 Overview Stat Badges */}
      <div className="tchr-bracket-cards-grid">
        <div className="tchr-bracket-card bracket-green">
          <div className="bracket-top">
            <span className="bracket-title">Excellent Standing (&ge;85%)</span>
            <Award size={18} className="text-success" />
          </div>
          <div className="bracket-num">{excellentCount} Students</div>
          <p className="bracket-desc">Consistently attending lectures; eligible for exam honors.</p>
        </div>

        <div className="tchr-bracket-card bracket-amber">
          <div className="bracket-top">
            <span className="bracket-title">Borderline / Safe (75% - 84%)</span>
            <TrendingUp size={18} className="text-amber" />
          </div>
          <div className="bracket-num">{normalCount} Students</div>
          <p className="bracket-desc">Above university minimum cutoff (75%), recommended to avoid future absences.</p>
        </div>

        <div className="tchr-bracket-card bracket-red">
          <div className="bracket-top">
            <span className="bracket-title">Critical Shortage (&lt;75%)</span>
            <AlertTriangle size={18} className="text-danger" />
          </div>
          <div className="bracket-num text-danger">{criticalCount} Students</div>
          <p className="bracket-desc">Requires immediate attendance condonation notice prior to semester end.</p>
        </div>
      </div>

      {/* Class Comparison Chart (Pure Viva-Friendly HTML/CSS) */}
      <div className="tchr-chart-card">
        <div className="tchr-chart-header">
          <div>
            <h3 className="tchr-chart-title">Class-Wise Attendance Comparison</h3>
            <p className="tchr-chart-sub">
              Comparison across CSE-A, CSE-B, CSE-C, and CSE-D for Data Structures.
            </p>
          </div>
          <span className="tchr-calc-note">Target Threshold: 75%</span>
        </div>

        <div className="tchr-bars-container">
          {classStatsList.map((stat) => (
            <div key={stat.className} className="tchr-bar-row">
              <div className="tchr-bar-label-box">
                <span className="tchr-bar-cls-name">{stat.className}</span>
                <span className="tchr-bar-cls-sub">{stat.totalStudents} Students</span>
              </div>

              <div className="tchr-bar-track-wrap">
                <div
                  className={`tchr-bar-fill ${
                    stat.avgAttendance >= 85
                      ? "fill-emerald"
                      : stat.avgAttendance >= 75
                      ? "fill-amber"
                      : "fill-rose"
                  }`}
                  style={{ width: `${stat.avgAttendance}%` }}
                >
                  <span className="tchr-bar-inline-text">{stat.avgAttendance}%</span>
                </div>
              </div>

              <div className="tchr-bar-action-box">
                <button
                  type="button"
                  onClick={() => {
                    onSelectClass(stat.className);
                    onTabChange("attendance");
                  }}
                  className="tchr-btn-outline sm"
                >
                  Inspect Roster
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Defaulters Table */}
      <div className="tchr-table-card-container">
        <div className="tchr-table-header" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertTriangle size={18} className="text-danger" />
              <h3 className="tchr-table-title">Defaulter Students (&lt;75% Attendance)</h3>
            </div>
            <p className="tchr-table-subtitle">
              Students across all 4 sections needing condonation warning or remedial attendance.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSendNotices}
            className="tchr-btn-primary sm"
          >
            <Send size={13} />
            <span>Send Warning Notices</span>
          </button>
        </div>

        <div className="tchr-responsive-table-wrap">
          <table className="tchr-data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Section</th>
                <th>Subject</th>
                <th>Present / Held</th>
                <th>Attendance %</th>
                <th>Shortfall</th>
                <th>Classes Needed</th>
              </tr>
            </thead>
            <tbody>
              {defaultersList.map((st) => (
                <tr key={st.id} className="row-warning">
                  <td>
                    <span className="tchr-roll-badge">{st.rollNo}</span>
                  </td>
                  <td>
                    <strong>{st.name}</strong>
                  </td>
                  <td>
                    <span className="tchr-cell-bold">{st.className}</span>
                  </td>
                  <td>{teacherProfile.subject}</td>
                  <td>
                    <span className="text-danger font-bold">{st.attendance.present}</span> / {st.attendance.total}
                  </td>
                  <td>
                    <span className="tchr-badge-danger">{st.pct}%</span>
                  </td>
                  <td>
                    <span className="text-danger">{(75 - st.pct).toFixed(1)}% below cutoff</span>
                  </td>
                  <td>
                    <span className="tchr-pill-safe">
                      +{st.needed} Consecutive Classes
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Attendees Honor Roll */}
      <div className="tchr-table-card-container">
        <div className="tchr-table-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Award size={18} className="text-success" />
              <h3 className="tchr-table-title">Top Attendees Honor Roll (&ge;94% Attendance)</h3>
            </div>
            <p className="tchr-table-subtitle">Students with exemplary class attendance in Data Structures.</p>
          </div>
        </div>

        <div className="tchr-top-attendees-grid">
          {topAttendees.map((st) => (
            <div key={st.id} className="tchr-attendee-card">
              <div className="tchr-avatar-circle emerald">
                {st.name.charAt(0)}
              </div>
              <div className="tchr-attendee-info">
                <span className="tchr-attendee-name">{st.name}</span>
                <span className="tchr-attendee-sub">Roll #{st.rollNo} • {st.className}</span>
              </div>
              <span className="tchr-badge-safe">{st.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
