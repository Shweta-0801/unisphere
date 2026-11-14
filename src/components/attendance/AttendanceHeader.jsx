import { Plus, Target, Sparkles, Calendar, ShieldCheck, AlertCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./Attendance.css";

function AttendanceHeader({
  targetPercentage,
  setTargetPercentage,
  onOpenAddModal,
  totalSubjects,
  safeSubjectsCount
}) {
  const { t } = useLanguage();
  const atRiskCount = Math.max(0, totalSubjects - safeSubjectsCount);

  return (
    <div className="att-header-hero">
      {/* Decorative ambient background glows */}
      <div className="att-header-glow-1" />
      <div className="att-header-glow-2" />

      <div className="att-header-content">
        {/* Left Column: Title & Academic Stats */}
        <div style={{ maxWidth: "42rem" }}>
          <div className="att-header-badge-row">
            <span className="att-header-pill">
              <Sparkles style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-accent)" }} />
              {t("attendance.trackerPill", "Smart Campus Academic Tracker")}
            </span>
            <span className="att-header-pill">
              <Calendar style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-accent)" }} />
              {t("attendance.semesterPill", "Semester 4 • 2026")}
            </span>
          </div>

          <h1 className="att-header-title">
            {t("attendance.title", "Attendance & Eligibility Hub")}
          </h1>

          <p className="att-header-subtitle">
            {t("attendance.subtitle", "Monitor daily subject attendance, compute safe bunks, predict final exam eligibility, and keep your record safely above university thresholds.")}
          </p>

          <div className="att-header-status-line">
            <div className="att-header-status-pill">
              <ShieldCheck style={{ width: "1rem", height: "1rem", color: "var(--att-success)" }} />
              <span>
                <strong>
                  {t("attendance.coursesSafe", "{safe} of {total} Courses Safe", { safe: safeSubjectsCount, total: totalSubjects })}
                </strong>
              </span>
            </div>

            {atRiskCount > 0 && (
              <div className="att-header-status-pill risk">
                <AlertCircle style={{ width: "1rem", height: "1rem", color: "var(--att-danger)" }} />
                <span>
                  <strong>
                    {t("attendance.shortageRisk", "{count} Course at Shortage Risk", { count: atRiskCount })}
                  </strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Target Selector & Add Subject */}
        <div className="att-header-actions">
          {/* Target Threshold Selector */}
          <div className="att-target-selector-box">
            <Target style={{ width: "1rem", height: "1rem", color: "var(--att-accent)", flexShrink: 0 }} />
            <label htmlFor="target-cutoff-select">{t("attendance.targetCutoff", "Target:")}</label>
            <select
              id="target-cutoff-select"
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(Number(e.target.value))}
              className="att-target-select"
            >
              <option value={75}>75% (Standard Cutoff)</option>
              <option value={80}>80% (Strict Academic)</option>
              <option value={85}>85% (Honors Goal)</option>
              <option value={65}>65% (Medical Condonation)</option>
            </select>
          </div>

          {/* Add Subject Button */}
          <button
            onClick={onOpenAddModal}
            className="att-btn-primary-white"
          >
            <Plus style={{ width: "1rem", height: "1rem", strokeWidth: 2.5 }} />
            <span>{t("attendance.addCourse", "Add Course")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttendanceHeader;