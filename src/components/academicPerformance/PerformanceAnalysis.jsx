import React, { useState } from "react";
import {
  TrendingUp,
  Award,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Calendar,
  BookOpen,
  ArrowRight
} from "lucide-react";
import {
  teacherProfile,
  calculateTotalMarks,
  calculateGrade,
  calculateAttendancePercentage
} from "../../data/teacherDashboardData";
import { useAuth } from "../../context/AuthContext";

export default function PerformanceAnalysis({ students, onSelectClass, onTabChange }) {
  const { user } = useAuth();
  const teacherName = user?.name || teacherProfile.name;
  const [remedialScheduled, setRemedialScheduled] = useState(false);

  // Grade Counts across entire cohort
  const gradeBuckets = {
    "A+": { count: 0, label: "Outstanding (90 - 100 Marks)", color: "fill-indigo" },
    "A": { count: 0, label: "Excellent (80 - 89 Marks)", color: "fill-emerald" },
    "B": { count: 0, label: "Good (70 - 79 Marks)", color: "fill-teal" },
    "C": { count: 0, label: "Satisfactory (60 - 69 Marks)", color: "fill-amber" },
    "D": { count: 0, label: "Pass (50 - 59 Marks)", color: "fill-orange" },
    "F": { count: 0, label: "Needs Support (< 50 Marks)", color: "fill-rose" }
  };

  students.forEach((s) => {
    const total = calculateTotalMarks(s.marks);
    const grade = calculateGrade(total);
    if (gradeBuckets[grade]) {
      gradeBuckets[grade].count += 1;
    }
  });

  // Students Needing Support (<45 total marks)
  const supportStudents = students
    .map((s) => {
      const total = calculateTotalMarks(s.marks);
      const grade = calculateGrade(total);
      const attPct = calculateAttendancePercentage(s.attendance.present, s.attendance.total);
      return { ...s, total, grade, attPct };
    })
    .filter((s) => s.total < 45);

  // Correlation: Group by attendance brackets
  const highAttStudents = students.filter(
    (s) => calculateAttendancePercentage(s.attendance.present, s.attendance.total) >= 85
  );
  const midAttStudents = students.filter((s) => {
    const p = calculateAttendancePercentage(s.attendance.present, s.attendance.total);
    return p >= 75 && p < 85;
  });
  const lowAttStudents = students.filter(
    (s) => calculateAttendancePercentage(s.attendance.present, s.attendance.total) < 75
  );

  const avgScoreHigh = (
    highAttStudents.reduce((sum, s) => sum + calculateTotalMarks(s.marks), 0) / (highAttStudents.length || 1)
  ).toFixed(1);

  const avgScoreMid = (
    midAttStudents.reduce((sum, s) => sum + calculateTotalMarks(s.marks), 0) / (midAttStudents.length || 1)
  ).toFixed(1);

  const avgScoreLow = (
    lowAttStudents.reduce((sum, s) => sum + calculateTotalMarks(s.marks), 0) / (lowAttStudents.length || 1)
  ).toFixed(1);

  const handleScheduleDoubtSession = () => {
    setRemedialScheduled(true);
    setTimeout(() => setRemedialScheduled(false), 4000);
  };

  return (
    <div className="tchr-stats-view">
      {/* Toast Notification */}
      {remedialScheduled && (
        <div className="tchr-alert-toast">
          <CheckCircle2 size={16} className="text-success" />
          <span>Remedial doubt-clearing session for Data Structures scheduled for Friday 04:00 PM (Room 304)!</span>
        </div>
      )}

      {/* Header */}
      <div className="tchr-section-header-row">
        <div>
          <span className="tchr-sub-tag perf-tag">Continuous Assessment &amp; Evaluation Insights</span>
          <h2 className="tchr-section-heading">Grade Distribution &amp; Remedial Support</h2>
          <p className="tchr-section-description">
            Analysis of cohort performance in <strong>{teacherProfile.subject}</strong> taught by <strong>{teacherName}</strong>.
          </p>
        </div>
      </div>

      {/* Grade Distribution Bars Card */}
      <div className="tchr-chart-card">
        <div className="tchr-chart-header">
          <div>
            <h3 className="tchr-chart-title">Cohort Grade Distribution (A+ to F)</h3>
            <p className="tchr-chart-sub">Breakdown of 80 enrolled students across all 4 sections.</p>
          </div>
          <span className="tchr-calc-note perf-calc-note">Total Evaluated: {students.length} Students</span>
        </div>

        <div className="tchr-bars-container">
          {Object.entries(gradeBuckets).map(([grade, data]) => {
            const pct = Number(((data.count / students.length) * 100).toFixed(1));
            const fillWidth = Math.max(3, pct * 1.5);
            const isSmall = pct < 12;

            return (
              <div key={grade} className="tchr-bar-row">
                <div className="tchr-bar-label-box" style={{ width: "130px" }}>
                  <span className="tchr-bar-cls-name">Grade {grade}</span>
                  <span className="tchr-bar-cls-sub">{data.count} Students ({pct}%)</span>
                </div>

                <div className="tchr-bar-track-wrap">
                  <div
                    className={`tchr-bar-fill ${data.color}`}
                    style={{ width: `${fillWidth}%` }}
                  >
                    {!isSmall && (
                      <span className="tchr-bar-inline-text">{data.count} ({pct}%)</span>
                    )}
                  </div>
                  {isSmall && (
                    <span
                      className="tchr-bar-outside-text"
                      style={{ left: `calc(${fillWidth}% + 8px)` }}
                    >
                      {data.count} ({pct}%)
                    </span>
                  )}
                </div>

                <div className="tchr-bar-action-box" style={{ width: "190px" }}>
                  <span style={{ fontSize: "0.74rem", color: "#8D857D" }}>{data.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance vs Marks Correlation Insight */}
      <div className="tchr-table-card-container">
        <div className="tchr-table-header">
          <div>
            <h3 className="tchr-table-title">Attendance vs. Academic Performance Correlation</h3>
            <p className="tchr-table-subtitle">Demonstrates how lecture attendance directly impacts examination marks in Data Structures.</p>
          </div>
        </div>

        <div className="tchr-correlation-grid">
          <div className="tchr-corr-card border-green">
            <span className="corr-bracket">High Attendance (&ge;85%)</span>
            <div className="corr-score-row">
              <strong className="corr-avg-score text-success">{avgScoreHigh}%</strong>
              <span className="corr-label">Cohort Average</span>
            </div>
            <p className="corr-desc">
              {highAttStudents.length} students. Demonstrates high conceptual clarity and consistent lab completion.
            </p>
          </div>

          <div className="tchr-corr-card border-amber">
            <span className="corr-bracket">Moderate Attendance (75% - 84%)</span>
            <div className="corr-score-row">
              <strong className="corr-avg-score text-amber">{avgScoreMid}%</strong>
              <span className="corr-label">Cohort Average</span>
            </div>
            <p className="corr-desc">
              {midAttStudents.length} students. Good performance, but occasional missed lectures impact end-term theory.
            </p>
          </div>

          <div className="tchr-corr-card border-red">
            <span className="corr-bracket">Shortage Attendance (&lt;75%)</span>
            <div className="corr-score-row">
              <strong className="corr-avg-score text-danger">{avgScoreLow}%</strong>
              <span className="corr-label">Cohort Average</span>
            </div>
            <p className="corr-desc">
              {lowAttStudents.length} students. Critical shortage correlates with a 35-point drop in examination average.
            </p>
          </div>
        </div>
      </div>

      {/* Remedial Support Table */}
      <div className="tchr-table-card-container">
        <div className="tchr-table-header" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertCircle size={18} className="text-danger" />
              <h3 className="tchr-table-title">Students Needing Academic Improvement (&lt;45 Marks)</h3>
            </div>
            <p className="tchr-table-subtitle">Targeted revision recommendations and doubt-clearing plans for low scorers.</p>
          </div>

          <button
            type="button"
            onClick={handleScheduleDoubtSession}
            className="tchr-btn-primary perf-primary-btn sm"
          >
            <Calendar size={13} />
            <span>Schedule Doubt Session</span>
          </button>
        </div>

        <div className="tchr-responsive-table-wrap">
          <table className="tchr-data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student</th>
                <th>Section</th>
                <th>Internal (/30)</th>
                <th>Mid-Term (/30)</th>
                <th>End-Term (/40)</th>
                <th>Total (/100)</th>
                <th>Attendance</th>
                <th>Recommended Topics to Reinforce</th>
              </tr>
            </thead>
            <tbody>
              {supportStudents.map((st, i) => {
                const topics = [
                  "Binary Trees & BST Rotations",
                  "Pointer Arithmetic & Memory Leaks",
                  "Graph Traversals (BFS & DFS)",
                  "Stack Applications & Infix Conversion"
                ];
                const recommended = topics[i % topics.length];

                return (
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
                    <td>{st.marks.internal}</td>
                    <td>{st.marks.midTerm}</td>
                    <td>{st.marks.endTerm}</td>
                    <td>
                      <span className="text-danger font-bold">{st.total} / 100</span>
                    </td>
                    <td>
                      <span className={st.attPct < 75 ? "text-danger" : ""}>{st.attPct}%</span>
                    </td>
                    <td>
                      <span className="tchr-topic-tag">
                        <BookOpen size={11} />
                        <span>{recommended}</span>
                      </span>
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
