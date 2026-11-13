import React from "react";
import {
  Users,
  Award,
  TrendingUp,
  AlertCircle,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Percent,
  FileSpreadsheet
} from "lucide-react";
import { teacherProfile, classesList, getClassMetrics } from "../../data/teacherDashboardData";
import { useAuth } from "../../context/AuthContext";

export default function PerformanceOverview({
  students,
  stats,
  onSelectClass,
  onTabChange
}) {
  const { user } = useAuth();
  const teacherName = user?.name || teacherProfile.name;
  const passRate = Number(((stats.totalPassed / stats.totalStudents) * 100).toFixed(1));

  return (
    <div className="tchr-overview-container">
      {/* ================= TEACHER & SUBJECT HERO BANNER ================= */}
      <section className="tchr-hero-card perf-hero">
        <div className="tchr-hero-badge perf-badge">
          <Sparkles size={13} />
          <span>Faculty Academic Evaluation • Term 2026</span>
        </div>

        <div className="tchr-hero-main-row">
          <div className="tchr-hero-left">
            <h1 className="tchr-hero-title">{teacherName}</h1>
            <p className="tchr-hero-role">
              {teacherProfile.title} • {teacherProfile.department}
            </p>
            <div className="tchr-hero-subject-pill perf-pill">
              <BookOpen size={16} />
              <span>Subject: <strong>{teacherProfile.subject}</strong> ({teacherProfile.subjectCode})</span>
            </div>
          </div>

          <div className="tchr-hero-right">
            <div className="tchr-classes-chip-list">
              <span className="tchr-chip-label">Teaching Sections:</span>
              <div className="tchr-chip-row">
                {teacherProfile.classes.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      onSelectClass(cls);
                      onTabChange("marks");
                    }}
                    className="tchr-class-chip perf-chip"
                    title={`View academic performance of ${cls}`}
                  >
                    <span>{cls}</span>
                    <ArrowRight size={11} />
                  </button>
                ))}
              </div>
            </div>
            <p className="tchr-hero-meta">
              Continuous Assessment: Internal (30) + Mid-Term (30) + End-Term (40) = 100 Marks
            </p>
          </div>
        </div>
      </section>

      {/* ================= 6 CORE STAT CARDS ================= */}
      <section className="tchr-stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
        {/* Card 1: Total Students */}
        <div className="tchr-stat-card">
          <div className="tchr-stat-icon-wrap icon-blue">
            <Users size={20} />
          </div>
          <div className="tchr-stat-content">
            <span className="tchr-stat-label">Total Students</span>
            <div className="tchr-stat-val-row">
              <span className="tchr-stat-value">{stats.totalStudents}</span>
              <span className="tchr-stat-subtext">Enrolled</span>
            </div>
            <p className="tchr-stat-desc">4 sections (20 students each)</p>
          </div>
        </div>

        {/* Card 2: Average Marks */}
        <div className="tchr-stat-card highlight-indigo">
          <div className="tchr-stat-icon-wrap icon-indigo">
            <Percent size={20} />
          </div>
          <div className="tchr-stat-content">
            <span className="tchr-stat-label">Average Marks</span>
            <div className="tchr-stat-val-row">
              <span className="tchr-stat-value text-indigo">{stats.overallAvgMarks}%</span>
              <span className="tchr-badge-safe perf-safe">First Class</span>
            </div>
            <p className="tchr-stat-desc">Weighted cohort average out of 100</p>
          </div>
        </div>

        {/* Card 3: Highest Marks */}
        <div className="tchr-stat-card">
          <div className="tchr-stat-icon-wrap icon-green">
            <Award size={20} />
          </div>
          <div className="tchr-stat-content">
            <span className="tchr-stat-label">Highest Marks</span>
            <div className="tchr-stat-val-row">
              <span className="tchr-stat-value text-success">{stats.overallHighest}</span>
              <span className="tchr-stat-subtext">/ 100</span>
            </div>
            <p className="tchr-stat-desc">Trisha Mukherjee (CSE-C) • Grade A+</p>
          </div>
        </div>

        {/* Card 4: Lowest Marks */}
        <div className="tchr-stat-card">
          <div className="tchr-stat-icon-wrap icon-amber">
            <TrendingUp size={20} />
          </div>
          <div className="tchr-stat-content">
            <span className="tchr-stat-label">Lowest Marks</span>
            <div className="tchr-stat-val-row">
              <span className="tchr-stat-value text-amber">{stats.overallLowest}</span>
              <span className="tchr-stat-subtext">/ 100</span>
            </div>
            <p className="tchr-stat-desc">Section minimum score recorded</p>
          </div>
        </div>

        {/* Card 5: Students Passed */}
        <div className="tchr-stat-card">
          <div className="tchr-stat-icon-wrap icon-teal">
            <CheckCircle2 size={20} />
          </div>
          <div className="tchr-stat-content">
            <span className="tchr-stat-label">Students Passed</span>
            <div className="tchr-stat-val-row">
              <span className="tchr-stat-value text-success">{stats.totalPassed}</span>
              <span className="tchr-stat-subtext">({passRate}%)</span>
            </div>
            <p className="tchr-stat-desc">Cleared minimum pass barrier (&ge;40)</p>
          </div>
        </div>

        {/* Card 6: Students Needing Improvement */}
        <div className="tchr-stat-card highlight-red">
          <div className="tchr-stat-icon-wrap icon-rose">
            <AlertCircle size={20} />
          </div>
          <div className="tchr-stat-content">
            <span className="tchr-stat-label">Needing Improvement</span>
            <div className="tchr-stat-val-row">
              <span className="tchr-stat-value stat-danger">{stats.needingImprovement}</span>
              <span className="tchr-badge-alert">Remedial Support</span>
            </div>
            <p className="tchr-stat-desc">Scoring &lt;45 marks in Data Structures</p>
          </div>
        </div>
      </section>

      {/* ================= QUICK ACTION SHORTCUTS ================= */}
      <section className="tchr-quick-actions-bar">
        <span className="tchr-actions-title">Quick Navigation:</span>
        <div className="tchr-actions-btns">
          <button
            type="button"
            onClick={() => onTabChange("marks")}
            className="tchr-btn-primary perf-primary-btn"
          >
            <Award size={15} />
            <span>Enter / Inspect Student Marks</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("classes")}
            className="tchr-btn-secondary"
          >
            <Users size={15} />
            <span>Compare 4 Classes</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("performance")}
            className="tchr-btn-secondary"
          >
            <TrendingUp size={15} />
            <span>Grade Distribution &amp; Remedial</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("statistics")}
            className="tchr-btn-secondary"
          >
            <GraduationCap size={15} />
            <span>Top Rankers &amp; Components</span>
          </button>
        </div>
      </section>

      {/* ================= CLASS-WISE PERFORMANCE SNAPSHOT ================= */}
      <section className="tchr-section-block">
        <div className="tchr-block-header">
          <div>
            <h2 className="tchr-block-title">Class-Wise Academic Standing</h2>
            <p className="tchr-block-subtitle">
              Comparative average marks and grade standings across {teacherName}'s 4 classes.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onTabChange("classes")}
            className="tchr-link-btn perf-link-btn"
          >
            <span>Full Section Breakdown</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="tchr-classes-grid">
          {classesList.map((cls) => {
            const metrics = getClassMetrics(students, cls);
            const isFirstClass = metrics.avgMarks >= 75;

            return (
              <div key={cls} className="tchr-class-card">
                <div className="tchr-class-card-head">
                  <div>
                    <h3 className="tchr-class-title">{cls}</h3>
                    <span className="tchr-class-tag">Data Structures (CS-301)</span>
                  </div>
                  <span className={`tchr-badge ${isFirstClass ? "badge-indigo" : "badge-safe"}`}>
                    {metrics.avgMarks}% Avg
                  </span>
                </div>

                <div className="tchr-class-metrics-list">
                  <div className="tchr-metric-row">
                    <span className="tchr-metric-name">Enrolled Students:</span>
                    <strong className="tchr-metric-val">{metrics.totalStudents}</strong>
                  </div>
                  <div className="tchr-metric-row">
                    <span className="tchr-metric-name">Highest Mark:</span>
                    <strong className="tchr-metric-val text-success">{metrics.highestMarks} / 100</strong>
                  </div>
                  <div className="tchr-metric-row">
                    <span className="tchr-metric-name">Lowest Mark:</span>
                    <strong className="tchr-metric-val text-amber">{metrics.lowestMarks} / 100</strong>
                  </div>
                  <div className="tchr-metric-row">
                    <span className="tchr-metric-name">Passed Students:</span>
                    <strong className="tchr-metric-val">{metrics.passCount} / {metrics.totalStudents}</strong>
                  </div>
                </div>

                {/* Progress Track */}
                <div className="tchr-progress-wrap">
                  <div className="tchr-progress-track">
                    <div
                      className={`tchr-progress-fill ${
                        metrics.avgMarks >= 80
                          ? "fill-indigo"
                          : metrics.avgMarks >= 70
                          ? "fill-emerald"
                          : "fill-amber"
                      }`}
                      style={{ width: `${metrics.avgMarks}%` }}
                    />
                  </div>
                </div>

                <div className="tchr-class-card-actions">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectClass(cls);
                      onTabChange("marks");
                    }}
                    className="tchr-card-btn-action perf-btn-action"
                  >
                    <span>View Student Marks</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= ASSESSMENT EVALUATION SCHEME CARD ================= */}
      <section className="tchr-section-block">
        <div className="tchr-block-header">
          <div>
            <h2 className="tchr-block-title">Evaluation Architecture &amp; Mark Breakdown</h2>
            <p className="tchr-block-subtitle">
              Standard B.Tech academic evaluation scheme for Data Structures (CS-301).
            </p>
          </div>
        </div>

        <div className="tchr-eval-scheme-grid">
          <div className="tchr-eval-box">
            <span className="tchr-eval-weight">30 Marks (30%)</span>
            <h4 className="tchr-eval-title">Internal Assessment</h4>
            <p className="tchr-eval-desc">Continuous evaluation: laboratory assignments, quizzes, and tutorial problem sets.</p>
          </div>

          <div className="tchr-eval-box">
            <span className="tchr-eval-weight">30 Marks (30%)</span>
            <h4 className="tchr-eval-title">Mid-Term Examination</h4>
            <p className="tchr-eval-desc">Mid-semester written theoretical examination covering Modules 1 through 3.</p>
          </div>

          <div className="tchr-eval-box">
            <span className="tchr-eval-weight">40 Marks (40%)</span>
            <h4 className="tchr-eval-title">End-Term Examination</h4>
            <p className="tchr-eval-desc">Comprehensive university end-semester theoretical &amp; algorithmic examination.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
