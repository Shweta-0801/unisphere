import React from "react";
import { Award, TrendingUp, BarChart3, Users, ArrowRight, Percent, GraduationCap } from "lucide-react";
import {
  teacherProfile,
  classesList,
  getClassMetrics,
  calculateTotalMarks,
  calculateGrade
} from "../../data/teacherDashboardData";
import { useAuth } from "../../context/AuthContext";

export default function PerformanceStats({ students, onSelectClass, onTabChange }) {
  const { user } = useAuth();
  const teacherName = user?.name || teacherProfile.name;
  // Class Metrics
  const classStatsList = classesList.map((cls) => getClassMetrics(students, cls));

  // Overall component averages
  const avgInternal = Number(
    (students.reduce((sum, s) => sum + s.marks.internal, 0) / students.length).toFixed(1)
  );
  const avgMidTerm = Number(
    (students.reduce((sum, s) => sum + s.marks.midTerm, 0) / students.length).toFixed(1)
  );
  const avgEndTerm = Number(
    (students.reduce((sum, s) => sum + s.marks.endTerm, 0) / students.length).toFixed(1)
  );

  // Top 5 Rankers across all 4 sections
  const topRankers = [...students]
    .map((s) => {
      const total = calculateTotalMarks(s.marks);
      const grade = calculateGrade(total);
      return { ...s, total, grade };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className="tchr-stats-view">
      {/* Header */}
      <div className="tchr-section-header-row">
        <div>
          <span className="tchr-sub-tag perf-tag">Cohort Statistics &amp; Rank Analysis</span>
          <h2 className="tchr-section-heading">Examination Statistics &amp; Academic Honor Roll</h2>
          <p className="tchr-section-description">
            Comparative analysis of examination components, section performance, and top rankers in <strong>{teacherProfile.subject}</strong>.
          </p>
        </div>
      </div>

      {/* Component Average Metric Cards */}
      <div className="tchr-bracket-cards-grid">
        <div className="tchr-bracket-card bracket-indigo">
          <div className="bracket-top">
            <span className="bracket-title">Internal Assessment Average</span>
            <Percent size={18} className="text-indigo" />
          </div>
          <div className="bracket-num text-indigo">{avgInternal} <span style={{ fontSize: "0.9rem", color: "#8D857D" }}>/ 30</span></div>
          <p className="bracket-desc">Continuous laboratory tests, quizzes &amp; assignments.</p>
        </div>

        <div className="tchr-bracket-card bracket-indigo">
          <div className="bracket-top">
            <span className="bracket-title">Mid-Term Examination Average</span>
            <Percent size={18} className="text-indigo" />
          </div>
          <div className="bracket-num text-indigo">{avgMidTerm} <span style={{ fontSize: "0.9rem", color: "#8D857D" }}>/ 30</span></div>
          <p className="bracket-desc">Mid-semester written assessment on Modules 1 to 3.</p>
        </div>

        <div className="tchr-bracket-card bracket-indigo">
          <div className="bracket-top">
            <span className="bracket-title">End-Term Examination Average</span>
            <Percent size={18} className="text-indigo" />
          </div>
          <div className="bracket-num text-indigo">{avgEndTerm} <span style={{ fontSize: "0.9rem", color: "#8D857D" }}>/ 40</span></div>
          <p className="bracket-desc">Comprehensive university final examination.</p>
        </div>
      </div>

      {/* Class Comparison Chart (HTML/CSS Viva-Friendly) */}
      <div className="tchr-chart-card">
        <div className="tchr-chart-header">
          <div>
            <h3 className="tchr-chart-title">Section Average Comparison</h3>
            <p className="tchr-chart-sub">Average score out of 100 across CSE-A, CSE-B, CSE-C, and CSE-D.</p>
          </div>
          <span className="tchr-calc-note perf-calc-note">First Class Cutoff: 75%</span>
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
                    stat.avgMarks >= 80 ? "fill-indigo" : stat.avgMarks >= 70 ? "fill-emerald" : "fill-amber"
                  }`}
                  style={{ width: `${stat.avgMarks}%` }}
                >
                  <span className="tchr-bar-inline-text">{stat.avgMarks}%</span>
                </div>
              </div>

              <div className="tchr-bar-action-box">
                <button
                  type="button"
                  onClick={() => {
                    onSelectClass(stat.className);
                    onTabChange("marks");
                  }}
                  className="tchr-btn-outline sm"
                  style={{ color: "#7A4B3A", borderColor: "#D6D0C8" }}
                >
                  Inspect Marks
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 5 Cohort Honor Roll */}
      <div className="tchr-table-card-container">
        <div className="tchr-table-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Award size={18} className="text-indigo" />
              <h3 className="tchr-table-title">Top 5 Academic Rankers (Data Structures)</h3>
            </div>
            <p className="tchr-table-subtitle">Highest aggregate marks across all sections for {teacherName}.</p>
          </div>
        </div>

        <div className="tchr-responsive-table-wrap">
          <table className="tchr-data-table">
            <thead>
              <tr>
                <th style={{ width: "90px" }}>Rank</th>
                <th>Student Name</th>
                <th>Section</th>
                <th style={{ textAlign: "center" }}>Internal (/30)</th>
                <th style={{ textAlign: "center" }}>Mid-Term (/30)</th>
                <th style={{ textAlign: "center" }}>End-Term (/40)</th>
                <th style={{ textAlign: "center" }}>Total Marks</th>
                <th style={{ textAlign: "center" }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {topRankers.map((st, idx) => (
                <tr key={st.id}>
                  <td>
                    <span className={`tchr-rank-badge rank-${idx + 1}`}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td>
                    <div className="tchr-student-cell">
                      <div className="tchr-avatar-circle perf-avatar">
                        {st.name.charAt(0)}
                      </div>
                      <div>
                        <strong className="tchr-student-name">{st.name}</strong>
                        <span className="tchr-student-section">Roll #{st.rollNo}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>{st.marks.internal}</td>
                  <td style={{ textAlign: "center" }}>{st.marks.midTerm}</td>
                  <td style={{ textAlign: "center" }}>{st.marks.endTerm}</td>
                  <td style={{ textAlign: "center" }}>
                    <strong className="text-indigo" style={{ fontSize: "1.05rem" }}>
                      {st.total} / 100
                    </strong>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <span className="tchr-grade-pill grade-a-plus">
                      {st.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
