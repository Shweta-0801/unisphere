import React, { useState, useEffect } from "react";
import {
  CalendarCheck,
  Plus,
  Minus,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  BookOpen
} from "lucide-react";

/**
 * DEFAULT SUBJECT ATTENDANCE RECORDS
 * 3rd / 4th Semester Computer Science syllabus subjects
 */
const BASELINE_SUBJECTS = [
  {
    id: "cs301",
    code: "CS-301",
    name: "Data Structures & Algorithms (Java)",
    faculty: "Dr. Rajesh Sharma",
    attended: 34,
    total: 38
  },
  {
    id: "cs302",
    code: "CS-302",
    name: "Database Management Systems (DBMS)",
    faculty: "Prof. Sunita Rao",
    attended: 28,
    total: 32
  },
  {
    id: "cs303",
    code: "CS-303",
    name: "Operating Systems Principles",
    faculty: "Dr. Arvind Iyer",
    attended: 25,
    total: 34
  },
  {
    id: "cs304",
    code: "CS-304",
    name: "Computer Networks & Security",
    faculty: "Prof. Priya Nair",
    attended: 30,
    total: 32
  },
  {
    id: "cs305",
    code: "CS-305L",
    name: "Full-Stack Web Development (React)",
    faculty: "Prof. Vikram Mehta",
    attended: 14,
    total: 16
  }
];

const STORAGE_KEY = "unisphere_subjects_attendance_v2";

export default function InteractiveAttendanceCard() {
  // Load from localStorage if present, otherwise use initial baseline
  const [subjects, setSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback if parsing fails
    }
    return BASELINE_SUBJECTS;
  });

  // Persist updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
    } catch {
      // Ignore localStorage write errors
    }
  }, [subjects]);

  // Sync when storage is updated externally (e.g. by Teacher Attendance Management)
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSubjects(parsed);
          }
        }
      } catch {
        // Fallback
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Overall Attendance Calculation: Combined Attended / Combined Total * 100
  // NOT an average of percentages!
  const combinedAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
  const combinedTotal = subjects.reduce((sum, s) => sum + s.total, 0);
  const overallPercentage =
    combinedTotal > 0
      ? Number(((combinedAttended / combinedTotal) * 100).toFixed(1))
      : 0;
  const isOverallSafe = overallPercentage >= 75.0;

  /**
   * Handle +1 button for a specific subject:
   * Records attendance for a newly conducted class.
   * Increases both attended and total classes by 1.
   */
  const handleIncreaseSubject = (subjectId) => {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          attended: s.attended + 1,
          total: s.total + 1
        };
      })
    );
  };

  /**
   * Handle -1 button for a specific subject:
   * Undoes the latest attended entry.
   * Decreases both attended and total classes by 1, within valid limits.
   */
  const handleDecreaseSubject = (subjectId) => {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id !== subjectId) return s;
        if (s.attended <= 0 || s.total <= 0) return s;
        const newAttended = s.attended - 1;
        const newTotal = Math.max(newAttended, s.total - 1);
        return {
          ...s,
          attended: newAttended,
          total: newTotal
        };
      })
    );
  };

  /**
   * Reset all subjects back to university baseline records
   */
  const handleReset = () => {
    setSubjects(BASELINE_SUBJECTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <section className="dash-att-calculator-card">
      {/* Card Header */}
      <div className="dash-att-calc-head">
        <div className="dash-att-calc-title-wrap">
          <div className="dash-att-calc-icon">
            <CalendarCheck size={20} />
          </div>
          <div>
            <div className="dash-att-calc-tag">
              <span>Independent Subject Attendance</span>
              <span className="dash-att-demo-pill">Live Subject Controls</span>
            </div>
            <h3 className="dash-att-calc-title">Subject-Wise Attendance &amp; Overall Cutoff</h3>
            <p className="dash-att-calc-sub">
              Each semester course has separate <strong>+1</strong> and <strong>−1</strong> buttons. Changes update only that subject and automatically recalculate your true overall percentage.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="dash-att-reset-btn"
          title="Reset all subjects to baseline semester records"
        >
          <RotateCcw size={13} />
          <span>Reset to Baseline</span>
        </button>
      </div>

      {/* Aggregate Overall Status Banner */}
      <div className="dash-att-overall-banner">
        <div className="dash-att-overall-left">
          <span className="dash-att-overall-label">Overall Semester Attendance</span>
          <div className="dash-att-overall-val-row">
            <span className="dash-att-overall-pct">{overallPercentage}%</span>
            <span
              className={`dash-att-status-badge ${
                isOverallSafe ? "badge-safe" : "badge-risk"
              }`}
            >
              {isOverallSafe ? (
                <>
                  <ShieldCheck size={14} />
                  <span>Condonation Safe (&ge; 75%)</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={14} />
                  <span>Below Cutoff (&lt; 75%)</span>
                </>
              )}
            </span>
          </div>
          <span className="dash-att-overall-counts">
            <strong>{combinedAttended}</strong> attended out of <strong>{combinedTotal}</strong> total classes across {subjects.length} subjects
          </span>
        </div>

        {/* Aggregate Progress Bar */}
        <div className="dash-att-overall-right">
          <div className="dash-att-bar-track">
            <div
              className={`dash-att-bar-progress ${
                isOverallSafe ? "bar-safe" : "bar-risk"
              }`}
              style={{ width: `${Math.min(100, overallPercentage)}%` }}
            />
            <div className="dash-att-bar-marker" style={{ left: "75%" }}>
              <span className="dash-att-marker-label">75% Cutoff</span>
            </div>
          </div>
          <p className="dash-att-calc-formula-note">
            Calculated as: <code>(Combined Attended / Combined Total) &times; 100</code>
          </p>
        </div>
      </div>

      {/* Subject-Wise Independent Cards Grid */}
      <div className="dash-subject-cards-grid">
        {subjects.map((subj) => {
          const subjPct =
            subj.total > 0
              ? Number(((subj.attended / subj.total) * 100).toFixed(1))
              : 0;
          const isSubjSafe = subjPct >= 75.0;

          return (
            <div key={subj.id} className="dash-subject-item-card">
              <div className="dash-subj-header-row">
                <div>
                  <span className="dash-subj-code">{subj.code}</span>
                  <h4 className="dash-subj-name">{subj.name}</h4>
                  <span className="dash-subj-faculty">{subj.faculty}</span>
                </div>
                <div className="dash-subj-pct-wrap">
                  <span
                    className={`dash-subj-pct-badge ${
                      isSubjSafe ? "badge-safe" : "badge-risk"
                    }`}
                  >
                    {subjPct}%
                  </span>
                </div>
              </div>

              {/* Progress Bar for Subject */}
              <div className="dash-subj-mini-bar-track">
                <div
                  className={`dash-subj-mini-bar-fill ${
                    isSubjSafe ? "bar-safe" : "bar-risk"
                  }`}
                  style={{ width: `${Math.min(100, subjPct)}%` }}
                />
              </div>

              <div className="dash-subj-counts-row">
                <span className="dash-subj-count-text">
                  Classes: <strong>{subj.attended}</strong> / {subj.total} attended
                </span>
                <span
                  className={`dash-subj-cutoff-text ${
                    isSubjSafe ? "text-safe" : "text-risk"
                  }`}
                >
                  {isSubjSafe ? "✓ Safe" : "⚠ Low Attendance"}
                </span>
              </div>

              {/* Individual Subject +1 and -1 Action Buttons */}
              <div className="dash-subj-actions-row">
                <button
                  type="button"
                  onClick={() => handleDecreaseSubject(subj.id)}
                  disabled={subj.attended <= 0 || subj.total <= 0}
                  className="dash-subj-btn btn-minus"
                  title={`Undo 1 attended class for ${subj.name}`}
                >
                  <Minus size={13} />
                  <span>−1 Undo</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleIncreaseSubject(subj.id)}
                  className="dash-subj-btn btn-plus"
                  title={`Record 1 new attended class for ${subj.name}`}
                >
                  <Plus size={13} />
                  <span>+1 Attended</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
