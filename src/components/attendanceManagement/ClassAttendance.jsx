import React from "react";
import { Users, CalendarCheck, CheckCircle2, AlertTriangle, ArrowRight, BookOpen } from "lucide-react";
import { teacherProfile, classesList, getClassMetrics } from "../../data/teacherDashboardData";
import { useAuth } from "../../context/AuthContext";

export default function ClassAttendance({
  students,
  onSelectClass,
  onTabChange
}) {
  const { user } = useAuth();
  const teacherName = user?.name || teacherProfile.name;

  return (
    <div className="tchr-classes-view">
      {/* Header Info */}
      <div className="tchr-section-header-row">
        <div>
          <span className="tchr-sub-tag">One Teacher • One Subject • Multiple Classes</span>
          <h2 className="tchr-section-heading">Classes &amp; Sections Taught</h2>
          <p className="tchr-section-description">
            <strong>{teacherName}</strong> teaches <strong>{teacherProfile.subject} ({teacherProfile.subjectCode})</strong> to 4 distinct sections.
            Select any class below to inspect the complete student roster or conduct daily roll call.
          </p>
        </div>
      </div>

      {/* Class Comparison Cards Grid */}
      <div className="tchr-class-deck-grid">
        {classesList.map((cls) => {
          const metrics = getClassMetrics(students, cls);
          const safeCount = metrics.totalStudents - metrics.shortageCount;

          return (
            <div key={cls} className="tchr-deck-card">
              <div className="tchr-deck-top">
                <div>
                  <div className="tchr-deck-badge-row">
                    <span className="tchr-deck-class-name">{cls}</span>
                    <span className="tchr-deck-sub-code">CS-301</span>
                  </div>
                  <h3 className="tchr-deck-subject">{teacherProfile.subject}</h3>
                </div>

                <div className="tchr-deck-score-badge">
                  <span className="tchr-deck-score-val">{metrics.avgAttendance}%</span>
                  <span className="tchr-deck-score-sub">Avg Attendance</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="tchr-deck-progress-box">
                <div className="tchr-deck-progress-bar">
                  <div
                    className={`tchr-deck-progress-fill ${
                      metrics.avgAttendance >= 85
                        ? "fill-emerald"
                        : metrics.avgAttendance >= 75
                        ? "fill-amber"
                        : "fill-rose"
                    }`}
                    style={{ width: `${metrics.avgAttendance}%` }}
                  />
                </div>
                <div className="tchr-deck-progress-labels">
                  <span>Minimum Target: 75%</span>
                  <span>{metrics.avgAttendance}% Achieved</span>
                </div>
              </div>

              {/* Metrics Table inside card */}
              <div className="tchr-deck-stats-list">
                <div className="tchr-deck-stat-item">
                  <span className="stat-item-lbl">Total Students:</span>
                  <span className="stat-item-num">{metrics.totalStudents}</span>
                </div>
                <div className="tchr-deck-stat-item">
                  <span className="stat-item-lbl">Lectures Conducted:</span>
                  <span className="stat-item-num">{metrics.lecturesHeld}</span>
                </div>
                <div className="tchr-deck-stat-item">
                  <span className="stat-item-lbl">Attendance Safe (&gt;=75%):</span>
                  <span className="stat-item-num text-success">{safeCount} Students</span>
                </div>
                <div className="tchr-deck-stat-item">
                  <span className="stat-item-lbl">Attendance Shortage (&lt;75%):</span>
                  <span className={`stat-item-num ${metrics.shortageCount > 0 ? "text-danger" : ""}`}>
                    {metrics.shortageCount} Students
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="tchr-deck-actions">
                <button
                  type="button"
                  onClick={() => {
                    onSelectClass(cls);
                    onTabChange("attendance");
                  }}
                  className="tchr-deck-btn-primary"
                >
                  <CheckCircle2 size={14} />
                  <span>Take Attendance</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectClass(cls);
                    onTabChange("calendar");
                  }}
                  className="tchr-deck-btn-secondary"
                >
                  <CalendarCheck size={14} />
                  <span>View 18 Lectures</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparative Summary Table (Viva Friendly) */}
      <div className="tchr-table-card-container">
        <div className="tchr-table-header">
          <div>
            <h3 className="tchr-table-title">Cohort Comparative Overview</h3>
            <p className="tchr-table-subtitle">Summary breakdown across all sections taught by {teacherName}.</p>
          </div>
        </div>

        <div className="tchr-responsive-table-wrap">
          <table className="tchr-data-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>Subject</th>
                <th>Enrolled</th>
                <th>Lectures Held</th>
                <th>Avg Attendance</th>
                <th>Safe (&ge;75%)</th>
                <th>Shortage (&lt;75%)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classesList.map((cls) => {
                const metrics = getClassMetrics(students, cls);
                const safeCount = metrics.totalStudents - metrics.shortageCount;

                return (
                  <tr key={cls}>
                    <td>
                      <span className="tchr-cell-bold">{cls}</span>
                    </td>
                    <td>{teacherProfile.subject}</td>
                    <td>{metrics.totalStudents} Students</td>
                    <td>{metrics.lecturesHeld}</td>
                    <td>
                      <div className="tchr-cell-pct-row">
                        <span className="tchr-cell-pct-num">{metrics.avgAttendance}%</span>
                        <div className="tchr-mini-track">
                          <div
                            className={`tchr-mini-fill ${metrics.avgAttendance >= 80 ? "fill-emerald" : "fill-amber"}`}
                            style={{ width: `${metrics.avgAttendance}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="tchr-pill-safe">{safeCount}</span>
                    </td>
                    <td>
                      <span className={`tchr-pill-warn ${metrics.shortageCount > 0 ? "pill-danger" : ""}`}>
                        {metrics.shortageCount}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectClass(cls);
                          onTabChange("attendance");
                        }}
                        className="tchr-table-action-link"
                      >
                        <span>Open Section</span>
                        <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
