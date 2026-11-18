import { CheckCircle, AlertTriangle, XCircle, ShieldCheck, TrendingUp, Sparkles, Flame } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./Attendance.css";

function OverallStats({ totalClasses, attendedClasses, targetPercentage = 75 }) {
  const { t } = useLanguage();
  const missedClasses = Math.max(0, totalClasses - attendedClasses);
  const percentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 1000) / 10 : 0;
  const isSafe = percentage >= targetPercentage;

  // Calculate Safe Bunks or Catch-up classes
  let advisorMessage;
  let advisorType; // safe, warning, danger
  let safeBunksCount = 0;
  let classesNeededCount = 0;

  if (totalClasses === 0) {
    advisorMessage = t("attendance.advisorEmpty", "No classes recorded yet. Start logging your subject sessions!");
    advisorType = "safe";
  } else if (isSafe) {
    const maxTotalClassesForSameAttended = Math.floor(attendedClasses / (targetPercentage / 100));
    safeBunksCount = Math.max(0, maxTotalClassesForSameAttended - totalClasses);

    if (safeBunksCount > 0) {
      advisorMessage = t("attendance.advisorComfortable", "You are comfortably above target! You can safely miss up to {count} total classes across subjects and still stay above {target}%.", { count: safeBunksCount, target: targetPercentage });
      advisorType = "safe";
    } else {
      advisorMessage = t("attendance.advisorEdge", "You are right on the edge of your {target}% target. Missing your next class will put you at risk!", { target: targetPercentage });
      advisorType = "warning";
    }
  } else {
    const diff = targetPercentage * totalClasses - 100 * attendedClasses;
    classesNeededCount = Math.max(1, Math.ceil(diff / (100 - targetPercentage)));
    advisorMessage = t("attendance.advisorDanger", "Attendance Warning: You must attend the next {count} consecutive classes without missing any to restore your standing to {target}%.", { count: classesNeededCount, target: targetPercentage });
    advisorType = "danger";
  }

  // SVG Circular Gauge calculations
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  let gaugeColor = "var(--att-success)"; // success
  if (percentage < targetPercentage) {
    gaugeColor = "var(--att-danger)"; // error
  } else if (percentage < targetPercentage + 5) {
    gaugeColor = "var(--att-accent)"; // champagne taupe
  }

  return (
    <div className="att-overall-wrapper">
      {/* Main Grid: Hero Gauge Card + 4 Mini Stat Cards */}
      <div className="att-overall-grid">
        
        {/* Hero Gauge & Standing Card */}
        <div className="att-gauge-card">
          <div>
            <div className="att-card-header-flex" style={{ paddingBottom: "1rem", borderBottom: "1px solid var(--att-border)" }}>
              <div>
                <span className="att-card-tagline">
                  {t("attendance.aggregateStanding", "Aggregate Standing")}
                </span>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 900, color: "var(--att-text-main)", margin: "0.25rem 0 0 0" }}>
                  {t("attendance.semesterPerformance", "Semester Performance")}
                </h3>
              </div>
              <span className={`att-pill-badge ${isSafe ? "safe" : "danger"}`}>
                {isSafe ? (
                  <>
                    <ShieldCheck style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-success)" }} />
                    {t("attendance.examEligible", "Exam Eligible")}
                  </>
                ) : (
                  <>
                    <AlertTriangle style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-danger)" }} />
                    {t("attendance.shortageRiskBadge", "Shortage Risk")}
                  </>
                )}
              </span>
            </div>

            {/* Circular Gauge Center & Ratios */}
            <div className="att-gauge-body" style={{ flexWrap: "wrap", justifyContent: "space-around" }}>
              {/* Radial Progress Ring */}
              <div className="att-gauge-svg-wrap">
                <svg viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="var(--att-border)"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke={gaugeColor}
                    strokeWidth="9"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}
                  />
                </svg>
                <div className="att-gauge-center-text">
                  <span className="att-gauge-percentage">
                    {percentage}%
                  </span>
                  <span className="att-gauge-target-label">
                    {t("attendance.targetCutoff", "Goal:")} {targetPercentage}%
                  </span>
                </div>
              </div>

              {/* Ratios Breakdown */}
              <div className="att-gauge-ratios" style={{ minWidth: "160px" }}>
                <div className="att-ratio-item">
                  <span className="att-dot emerald" />
                  <span>{t("attendance.presentRatio", "Present Ratio:")}</span>
                  <strong>
                    {totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0}%
                  </strong>
                </div>

                <div className="att-ratio-item">
                  <span className="att-dot rose" />
                  <span>{t("attendance.absenceRatio", "Absence Ratio:")}</span>
                  <strong>
                    {totalClasses > 0 ? Math.round((missedClasses / totalClasses) * 100) : 0}%
                  </strong>
                </div>

                <div className="att-ratio-item">
                  <span className="att-dot blue" />
                  <span>{t("attendance.targetClearance", "Target Clearance:")}</span>
                  <strong style={{ color: isSafe ? "var(--att-success)" : "var(--att-danger)" }}>
                    {percentage >= targetPercentage ? "+" : ""}
                    {(percentage - targetPercentage).toFixed(1)}%
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Linear Progress Bar */}
          <div>
            <div className="att-progress-linear-wrap">
              <div
                className="att-progress-linear-fill"
                style={{
                  width: `${Math.min(100, percentage)}%`,
                  backgroundColor: gaugeColor
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontWeight: 700, color: "var(--att-text-muted)", marginTop: "0.35rem" }}>
              <span>0%</span>
              <span style={{ color: "var(--att-primary)" }}>{t("attendance.passingCutoff", "{target}% Passing Cutoff", { target: targetPercentage })}</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* 4 Crisp Metric Cards */}
        <div className="att-stats-4col">
          
          {/* Attended Card */}
          <div className="att-metric-card-clean">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-text-muted)" }}>
                {t("attendance.classesAttended", "Classes Attended")}
              </span>
              <div className="icon-wrap" style={{ background: "var(--att-success-light)", color: "var(--att-success)", border: "1px solid var(--att-success-border)" }}>
                <CheckCircle style={{ width: "1rem", height: "1rem" }} />
              </div>
            </div>
            <div className="val-row">
              <span className="val-num">
                {attendedClasses}
              </span>
              <span className="val-sub" style={{ color: "var(--att-success)" }}>
                {totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0}% rate
              </span>
            </div>
            <p className="card-desc">
              {t("attendance.attendedSub", "Completed lecture & practical sessions")}
            </p>
          </div>

          {/* Missed Card */}
          <div className="att-metric-card-clean">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-text-muted)" }}>
                {t("attendance.classesMissed", "Classes Missed")}
              </span>
              <div className="icon-wrap" style={{ background: "var(--att-danger-light)", color: "var(--att-danger)", border: "1px solid var(--att-danger-border)" }}>
                <XCircle style={{ width: "1rem", height: "1rem" }} />
              </div>
            </div>
            <div className="val-row">
              <span className="val-num">
                {missedClasses}
              </span>
              <span className="val-sub" style={{ color: "var(--att-danger)" }}>
                {totalClasses > 0 ? Math.round((missedClasses / totalClasses) * 100) : 0}% missed
              </span>
            </div>
            <p className="card-desc">
              {t("attendance.missedSub", "Absences, leaves, and missed roll calls")}
            </p>
          </div>

          {/* Total Classes Card */}
          <div className="att-metric-card-clean">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-text-muted)" }}>
                {t("attendance.totalClasses", "Total Classes")}
              </span>
              <div className="icon-wrap" style={{ background: "var(--att-surface-subtle)", color: "var(--att-primary)", border: "1px solid var(--att-border)" }}>
                <TrendingUp style={{ width: "1rem", height: "1rem" }} />
              </div>
            </div>
            <div className="val-row">
              <span className="val-num">
                {totalClasses}
              </span>
              <span className="val-sub" style={{ color: "var(--att-primary)" }}>
                Conducted
              </span>
            </div>
            <p className="card-desc">
              {t("attendance.totalSub", "Total delivered sessions this term")}
            </p>
          </div>

          {/* Safe Bunk Buffer / Remedial Required Card */}
          <div className="att-metric-card-clean">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-text-muted)" }}>
                {isSafe ? t("attendance.safeBunkAllowance", "Safe Bunk Allowance") : t("attendance.catchUpClasses", "Catch-Up Classes")}
              </span>
              <div className="icon-wrap" style={{
                background: isSafe ? "var(--att-surface-subtle)" : "var(--att-danger-light)",
                color: isSafe ? "var(--att-accent)" : "var(--att-danger)",
                border: isSafe ? "1px solid var(--att-warning-border)" : "1px solid var(--att-danger-border)"
              }}>
                {isSafe ? <Sparkles style={{ width: "1rem", height: "1rem" }} /> : <Flame style={{ width: "1rem", height: "1rem" }} />}
              </div>
            </div>
            <div className="val-row">
              <span className="val-num">
                {isSafe ? safeBunksCount : classesNeededCount}
              </span>
              <span className="val-sub" style={{ color: isSafe ? "var(--att-success)" : "var(--att-danger)" }}>
                {isSafe ? t("attendance.safeBunkSub", "Classes can be skipped") : t("attendance.catchUpSub", "Consecutive needed")}
              </span>
            </div>
            <p className="card-desc">
              {isSafe ? t("attendance.withoutDropping", "Without dropping below {target}%", { target: targetPercentage }) : t("attendance.restoreEligibility", "To restore standard eligibility")}
            </p>
          </div>

        </div>

      </div>

      {/* Smart Academic Advisor Banner */}
      <div className={`att-advisor-banner ${advisorType}`}>
        <div className="att-advisor-icon" style={{
          background: "var(--att-surface)",
          color: advisorType === "safe" ? "var(--att-success)" : advisorType === "warning" ? "var(--att-accent)" : "var(--att-danger)",
          border: `1px solid ${advisorType === "safe" ? "var(--att-success-border)" : advisorType === "warning" ? "var(--att-warning-border)" : "var(--att-danger-border)"}`,
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "var(--att-radius-md)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
          {advisorType === "safe" ? (
            <ShieldCheck style={{ width: "1.25rem", height: "1.25rem" }} />
          ) : (
            <AlertTriangle style={{ width: "1.25rem", height: "1.25rem" }} />
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
            <h4 className="att-advisor-title">
              {t("attendance.guidelinesTitle", "Institutional Attendance Guidelines & Insights")}
            </h4>
            <span style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", padding: "0.15rem 0.5rem", borderRadius: "9999px", background: "rgba(255,255,255,0.7)", border: "1px solid currentColor" }}>
              {advisorType === "safe" ? t("attendance.safeZone", "Safe Zone") : advisorType === "warning" ? t("attendance.caution", "Caution") : t("attendance.actionRequired", "Action Required")}
            </span>
          </div>
          <p className="att-advisor-text">
            {advisorMessage}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OverallStats;