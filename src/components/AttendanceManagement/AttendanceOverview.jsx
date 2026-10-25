import React from "react";
import {
  Users,
  CalendarCheck,
  Award,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileSpreadsheet
} from "lucide-react";
import { teacherProfile, classesList, getClassMetrics } from "../../data/teacherDashboardData";
import { useAuth } from "../../context/AuthContext";

export default function AttendanceOverview({
  students,
  stats,
  onSelectClass,
  onTabChange
}) {
  const { user } = useAuth();
  const teacherName = user?.name || teacherProfile.name;

  return (
    <div className="tchr-overview-container">
      {/* ================= TEACHER & SUBJECT HERO BANNER ================= */}
      <section className="tchr-hero-card">
        <div className="tchr-hero-badge">
          <Sparkles size={13} />
          <span>Faculty Course Portal • Fall 2026</span>
        </div>

        <div className="tchr-hero-main-row">
          <div className="tchr-hero-left">
            <h1 className="tchr-hero-title">{teacherName}</h1>
            <p className="tchr-hero-role">
              {teacherProfile.title} • {teacherProfile.department}
            </p>
            <div className="tchr-hero-subject-pill">
              <BookOpen size={16} />
              <span>Subject: <strong>{teacherProfile.subject}</strong> ({teacherProfile.subjectCode})</span>
            </div>
          </div>

          <div className="tchr-hero-right">
            <div className="tchr-classes-chip-list">
              <span className="tchr-chip-label">Taught Sections:</span>
              <div className="tchr-chip-row">
                {teacherProfile.classes.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      onSelectClass(cls);
                      onTabChange("attendance");
                    }}
                    className="tchr-class-chip"
                    title={`Manage attendance for ${cls}`}
                  >
                    <span>{cls}</span>
                    <ArrowRight size={11} />
                  </button>
                ))}
              </div>
            </div>
            <p className="tchr-hero-meta">
              Office: {teacherProfile.cabin} • {teacherProfile.officeHours}
            </p>
          </div>
        </div>
      </section>

      {/* ================= 5 CORE STAT CARDS ================= */}
      <section className="tchr-stats-grid">
        {/* Card 1: Total Classes / Sections */}
        <div className="tchr-stat-card">
          <div className="tchr-stat-icon-wrap icon-purple">
            <Users size={20} />
          </div>
          <div className="tchr-stat-content">
            <span className="tchr-stat-label">Total Classes / Sections</span>
            <div className="tchr-stat-val-row">
              <span className="tchr-stat-value">{stats.totalClasses}</span>
              <span className="tchr-stat-subtext">Sections</span>
            </div>
            <p className="tchr-stat-desc">CSE-A, CSE-B, CSE-C, CSE-D</p>
          </div>
        </div>

        {/* Card 2: Total Students */}
        <div className="tchr-stat-card">
          <div className="tchr-stat-icon-wrap icon-blue">
            <Award size={20} />
          </div>
          <div className="tchr-stat-content">
            <span className="tchr-stat-label">Total Students</span>
            <div className="tchr-stat-val-row">
              <span className="tchr-stat-value">{stats.totalStudents}</span>
              <span className="tchr-stat-subtext">Enrolled</span>
            </div>
            <p className="tchr-stat-desc">20 students per class cohort</p>
          </div>
        </div>

        {/* Card 3: Total Lectures Conducted */}
        <div className="tchr-stat-card">
          <div className="tchr-stat-icon-wrap icon-teal">
            <CalendarCheck size={20} />
          </div>
          <div className="tchr-stat-content">
            <span className="tchr-stat-label">Total Lectures Conducted</span>
            <div className="tchr-stat-val-row">
              <span className="tchr-stat-value">{stats.lecturesPerClass}</span>
              <span className="tchr-stat-subtext">per Section ({stats.totalLecturesConducted} total)</span>
            </div>
            <p className="tchr-stat-desc">Conducted between Sep 01 - Oct 10</p>
          </div>
        </div>

        {/* Card 4: Average Attendance */}
        <div className="tchr-stat-card highlight-green">
          <div className="tchr-stat-icon-wrap icon-green">
            <TrendingUp size={20} />
          </div>
          <div className="tchr-stat-content">
            <span className="tchr-stat-label">Average Attendance</span>
            <div className="tchr-stat-val-row">
              <span className="tchr-stat-value">{stats.overallAvgAttendance}%</span>
              <span className="tchr-badge-safe">Safe Standing</span>
            </div>
            <p className="tchr-stat-desc">Formula: (Attended / Total Possible) × 100</p>
          </div>
        </div>

        {/* Card 5: Students Below 75% Requirement */}
        <div className="tchr-stat-card highlight-red">
          <div className="tchr-stat-icon-wrap icon-rose">
            <AlertTriangle size={20} />
          </div>
          <div className="tchr-stat-content">
            <span className="tchr-stat-label">Below Requirement (&lt;75%)</span>
            <div className="tchr-stat-val-row">
              <span className="tchr-stat-value stat-danger">{stats.shortageCount}</span>
              <span className="tchr-badge-alert">Condonation Notice</span>
            </div>
            <p className="tchr-stat-desc">Students at exam admittance risk</p>
          </div>
        </div>
      </section>

      {/* ================= QUICK ACTION SHORTCUTS ================= */}
      <section className="tchr-quick-actions-bar">
        <span className="tchr-actions-title">Quick Actions:</span>
        <div className="tchr-actions-btns">
          <button
            type="button"
            onClick={() => onTabChange("attendance")}
            className="tchr-btn-primary"
          >
            <CheckCircle2 size={15} />
            <span>Mark Daily Roll Call</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("classes")}
            className="tchr-btn-secondary"
          >
            <Users size={15} />
            <span>View All 4 Classes</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("calendar")}
            className="tchr-btn-secondary"
          >
            <Clock size={15} />
            <span>18-Lecture Schedule</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("statistics")}
            className="tchr-btn-outline"
          >
            <AlertTriangle size={15} />
            <span>Defaulters List ({stats.shortageCount})</span>
          </button>
        </div>
      </section>

      {/* ================= CLASS-WISE ATTENDANCE SNAPSHOT CARDS ================= */}
      <section className="tchr-section-block">
        <div className="tchr-block-header">
          <div>
            <h2 className="tchr-block-title">Class-Wise Attendance Snapshot</h2>
            <p className="tchr-block-subtitle">
              Current attendance percentages and lecture tallies for {teacherName}'s Data Structures cohorts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onTabChange("classes")}
            className="tchr-link-btn"
          >
            <span>Full Class Details</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="tchr-classes-grid">
          {classesList.map((cls) => {
            const metrics = getClassMetrics(students, cls);
            const isSafe = metrics.avgAttendance >= 75;

            return (
              <div key={cls} className="tchr-class-card">
                <div className="tchr-class-card-head">
                  <div>
                    <h3 className="tchr-class-title">{cls}</h3>
                    <span className="tchr-class-tag">Data Structures</span>
                  </div>
                  <span className={`tchr-badge ${isSafe ? "badge-safe" : "badge-warn"}`}>
                    {metrics.avgAttendance}% Avg
                  </span>
                </div>

                <div className="tchr-class-metrics-list">
                  <div className="tchr-metric-row">
                    <span className="tchr-metric-name">Enrolled Students:</span>
                    <strong className="tchr-metric-val">{metrics.totalStudents}</strong>
                  </div>
                  <div className="tchr-metric-row">
                    <span className="tchr-metric-name">Lectures Conducted:</span>
                    <strong className="tchr-metric-val">{metrics.lecturesHeld}</strong>
                  </div>
                  <div className="tchr-metric-row">
                    <span className="tchr-metric-name">Below 75% Shortage:</span>
                    <strong className={`tchr-metric-val ${metrics.shortageCount > 0 ? "text-danger" : ""}`}>
                      {metrics.shortageCount} Students
                    </strong>
                  </div>
                </div>

                {/* Progress Track */}
                <div className="tchr-progress-wrap">
                  <div className="tchr-progress-track">
                    <div
                      className={`tchr-progress-fill ${
                        metrics.avgAttendance >= 85
                          ? "fill-emerald"
                          : metrics.avgAttendance >= 75
                          ? "fill-amber"
                          : "fill-rose"
                      }`}
                      style={{ width: `${metrics.avgAttendance}%` }}
                    />
                  </div>
                </div>

                <div className="tchr-class-card-actions">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectClass(cls);
                      onTabChange("attendance");
                    }}
                    className="tchr-card-btn-action"
                  >
                    <span>Take Attendance</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= RECENT LECTURE TOPICS PREVIEW ================= */}
      <section className="tchr-section-block">
        <div className="tchr-block-header">
          <div>
            <h2 className="tchr-block-title">Recent Data Structures Lectures</h2>
            <p className="tchr-block-subtitle">
              Syllabus progress across CSE-A, CSE-B, CSE-C, and CSE-D cohorts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onTabChange("calendar")}
            className="tchr-link-btn"
          >
            <span>View All 18 Lectures</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="tchr-recent-lectures-grid">
          <div className="tchr-lecture-item-card">
            <div className="tchr-lec-date-badge">10/10/2026</div>
            <div className="tchr-lec-info">
              <span className="tchr-lec-num">Lecture 18</span>
              <h4 className="tchr-lec-title">Hashing Techniques &amp; Collision Resolution</h4>
              <p className="tchr-lec-desc">Linear probing, quadratic probing, and separate chaining.</p>
            </div>
            <span className="tchr-badge-safe">Conducted</span>
          </div>

          <div className="tchr-lecture-item-card">
            <div className="tchr-lec-date-badge">08/10/2026</div>
            <div className="tchr-lec-info">
              <span className="tchr-lec-num">Lecture 17</span>
              <h4 className="tchr-lec-title">Shortest Path Algorithms: Dijkstra's Algorithm</h4>
              <p className="tchr-lec-desc">Single-source shortest path using priority queues and greedy strategy.</p>
            </div>
            <span className="tchr-badge-safe">Conducted</span>
          </div>

          <div className="tchr-lecture-item-card">
            <div className="tchr-lec-date-badge">06/10/2026</div>
            <div className="tchr-lec-info">
              <span className="tchr-lec-num">Lecture 16</span>
              <h4 className="tchr-lec-title">Minimum Spanning Trees: Prim's &amp; Kruskal's</h4>
              <p className="tchr-lec-desc">Greedy graph algorithms and Disjoint Set Union (DSU).</p>
            </div>
            <span className="tchr-badge-safe">Conducted</span>
          </div>
        </div>
      </section>
    </div>
  );
}
