import { Plus, Target, Sparkles, Calendar, Award } from "lucide-react";

function AttendanceHeader({
  targetPercentage,
  setTargetPercentage,
  onOpenAddModal,
  totalSubjects,
  safeSubjectsCount
}) {
  return (
    <div className="att-header-hero">
      {/* Decorative ambient CSS3 glows */}
      <div className="att-header-glow-1" />
      <div className="att-header-glow-2" />

      <div className="att-header-content">
        {/* Left column */}
        <div>
          <div className="att-header-badge-row">
            <span className="att-header-pill">
              <Sparkles style={{ width: "0.875rem", height: "0.875rem", color: "#fde047" }} />
              Smart Campus Academic Tracker
            </span>
            <span className="att-header-pill">
              <Calendar style={{ width: "0.875rem", height: "0.875rem" }} />
              Semester 4 • 2026
            </span>
          </div>

          <h1 className="att-header-title">
            Attendance Hub
          </h1>

          <p className="att-header-subtitle">
            Monitor daily subject attendance, calculate safe bunks, predict final exam eligibility, and keep your record safely above target.
          </p>

          <div className="att-header-status-line">
            <Award style={{ width: "1rem", height: "1rem", color: "#6ee7b7" }} />
            <span>
              <strong>{safeSubjectsCount} of {totalSubjects}</strong> subjects meet attendance criteria
            </span>
          </div>
        </div>

        {/* Right column / actions */}
        <div className="att-header-actions">
          {/* Target Threshold Selector */}
          <div className="att-target-selector-box">
            <Target style={{ width: "1rem", height: "1rem", color: "#bae6fd" }} />
            <label>Target:</label>
            <select
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(Number(e.target.value))}
              className="att-target-select"
            >
              <option value={75}>75% (Standard)</option>
              <option value={80}>80% (Strict)</option>
              <option value={85}>85% (Honors)</option>
              <option value={65}>65% (Minimum)</option>
            </select>
          </div>

          {/* Add Subject Button */}
          <button
            onClick={onOpenAddModal}
            className="att-btn-primary-white"
          >
            <Plus style={{ width: "1rem", height: "1rem", strokeWidth: 2.5 }} />
            <span>Add Subject</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttendanceHeader;