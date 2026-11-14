import React from "react";
import { Users, Award, TrendingUp, CheckCircle2, ArrowRight, BookOpen, Percent } from "lucide-react";
import {
  teacherProfile,
  classesList,
  getClassMetrics,
  getStudentsByClass,
  calculateTotalMarks
} from "../../data/teacherDashboardData";
import { useAuth } from "../../context/AuthContext";

export default function ClassPerformance({
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
          <span className="tchr-sub-tag perf-tag">One Teacher • One Subject • Multiple Classes</span>
          <h2 className="tchr-section-heading">Class-Wise Academic Performance</h2>
          <p className="tchr-section-description">
            Academic standing across all 4 sections taught by <strong>{teacherName}</strong> in <strong>{teacherProfile.subject}</strong>.
          </p>
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="tchr-class-deck-grid">
        {classesList.map((cls) => {
          const metrics = getClassMetrics(students, cls);
          const classStudents = getStudentsByClass(students, cls);

          // Component-wise averages
          const avgInternal = Number(
            (classStudents.reduce((sum, s) => sum + s.marks.internal, 0) / classStudents.length).toFixed(1)
          );
          const avgMidTerm = Number(
            (classStudents.reduce((sum, s) => sum + s.marks.midTerm, 0) / classStudents.length).toFixed(1)
          );
          const avgEndTerm = Number(
            (classStudents.reduce((sum, s) => sum + s.marks.endTerm, 0) / classStudents.length).toFixed(1)
          );
          const passRate = Number(((metrics.passCount / metrics.totalStudents) * 100).toFixed(1));

          return (
            <div key={cls} className="tchr-deck-card perf-deck-card">
              <div className="tchr-deck-top">
                <div>
                  <div className="tchr-deck-badge-row">
                    <span className="tchr-deck-class-name">{cls}</span>
                    <span className="tchr-deck-sub-code perf-code">CS-301</span>
                  </div>
                  <h3 className="tchr-deck-subject">{teacherProfile.subject}</h3>
                </div>

                <div className="tchr-deck-score-badge">
                  <span className="tchr-deck-score-val text-indigo">{metrics.avgMarks}%</span>
                  <span className="tchr-deck-score-sub">Section Average</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="tchr-deck-progress-box">
                <div className="tchr-deck-progress-bar">
                  <div
                    className={`tchr-deck-progress-fill ${
                      metrics.avgMarks >= 80
                        ? "fill-indigo"
                        : metrics.avgMarks >= 70
                        ? "fill-emerald"
                        : "fill-amber"
                    }`}
                    style={{ width: `${metrics.avgMarks}%` }}
                  />
                </div>
                <div className="tchr-deck-progress-labels">
                  <span>Pass Threshold: 40%</span>
                  <span>{metrics.avgMarks}% Average Score</span>
                </div>
              </div>

              {/* Metrics Table inside card */}
              <div className="tchr-deck-stats-list">
                <div className="tchr-deck-stat-item">
                  <span className="stat-item-lbl">Enrolled Students:</span>
                  <span className="stat-item-num">{metrics.totalStudents}</span>
                </div>
                <div className="tchr-deck-stat-item">
                  <span className="stat-item-lbl">Highest Mark:</span>
                  <span className="stat-item-num text-success">{metrics.highestMarks} / 100</span>
                </div>
                <div className="tchr-deck-stat-item">
                  <span className="stat-item-lbl">Lowest Mark:</span>
                  <span className="stat-item-num text-amber">{metrics.lowestMarks} / 100</span>
                </div>
                <div className="tchr-deck-stat-item">
                  <span className="stat-item-lbl">Pass Rate:</span>
                  <span className="stat-item-num text-success">{passRate}% ({metrics.passCount} Passed)</span>
                </div>
              </div>

              {/* Component breakdown */}
              <div className="tchr-component-pills-row">
                <div className="tchr-comp-pill">
                  <span className="comp-lbl">Internal (/30)</span>
                  <span className="comp-val">{avgInternal}</span>
                </div>
                <div className="tchr-comp-pill">
                  <span className="comp-lbl">Mid-Term (/30)</span>
                  <span className="comp-val">{avgMidTerm}</span>
                </div>
                <div className="tchr-comp-pill">
                  <span className="comp-lbl">End-Term (/40)</span>
                  <span className="comp-val">{avgEndTerm}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="tchr-deck-actions">
                <button
                  type="button"
                  onClick={() => {
                    onSelectClass(cls);
                    onTabChange("marks");
                  }}
                  className="tchr-deck-btn-primary perf-primary-btn"
                >
                  <Award size={14} />
                  <span>Inspect Marks</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectClass(cls);
                    onTabChange("performance");
                  }}
                  className="tchr-deck-btn-secondary"
                >
                  <TrendingUp size={14} />
                  <span>Grade Analysis</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparative Summary Table */}
      <div className="tchr-table-card-container">
        <div className="tchr-table-header">
          <div>
            <h3 className="tchr-table-title">Section Marks &amp; Component Comparison</h3>
            <p className="tchr-table-subtitle">Summary breakdown of marks across all 4 sections for Data Structures.</p>
          </div>
        </div>

        <div className="tchr-responsive-table-wrap">
          <table className="tchr-data-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>Subject</th>
                <th>Students</th>
                <th>Average Marks</th>
                <th>Highest</th>
                <th>Lowest</th>
                <th>Pass Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classesList.map((cls) => {
                const metrics = getClassMetrics(students, cls);
                const passRate = Number(((metrics.passCount / metrics.totalStudents) * 100).toFixed(1));

                return (
                  <tr key={cls}>
                    <td>
                      <span className="tchr-cell-bold">{cls}</span>
                    </td>
                    <td>{teacherProfile.subject}</td>
                    <td>{metrics.totalStudents} Students</td>
                    <td>
                      <div className="tchr-cell-pct-row">
                        <span className="tchr-cell-pct-num text-indigo font-bold">{metrics.avgMarks}%</span>
                        <div className="tchr-mini-track">
                          <div
                            className={`tchr-mini-fill ${metrics.avgMarks >= 75 ? "fill-indigo" : "fill-amber"}`}
                            style={{ width: `${metrics.avgMarks}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-success font-bold">{metrics.highestMarks}</span> / 100
                    </td>
                    <td>
                      <span className="text-amber font-bold">{metrics.lowestMarks}</span> / 100
                    </td>
                    <td>
                      <span className="tchr-pill-safe">{passRate}%</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectClass(cls);
                          onTabChange("marks");
                        }}
                        className="tchr-table-action-link perf-link-color"
                      >
                        <span>Open Marks</span>
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
