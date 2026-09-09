import { CheckCircle, AlertTriangle, XCircle, ShieldCheck, TrendingUp } from "lucide-react";

function OverallStats({ totalClasses, attendedClasses, targetPercentage = 75 }) {
  const missedClasses = Math.max(0, totalClasses - attendedClasses);
  const percentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 1000) / 10 : 0;
  const isSafe = percentage >= targetPercentage;

  // Calculate Safe Bunks or Catch-up classes
  let advisorMessage;
  let advisorType; // safe, warning, danger

  if (totalClasses === 0) {
    advisorMessage = "No classes recorded yet. Start logging your subject sessions!";
    advisorType = "safe";
  } else if (isSafe) {
    // b = floor( attended / (target/100) - total )
    const maxTotalClassesForSameAttended = Math.floor(attendedClasses / (targetPercentage / 100));
    const safeBunksCount = Math.max(0, maxTotalClassesForSameAttended - totalClasses);

    if (safeBunksCount > 0) {
      advisorMessage = `You are comfortably above target! You can safely miss up to ${safeBunksCount} class${safeBunksCount > 1 ? "es" : ""} and still stay above ${targetPercentage}%.`;
      advisorType = "safe";
    } else {
      advisorMessage = `You are right on the edge of your ${targetPercentage}% target. Missing your next class will put you at risk!`;
      advisorType = "warning";
    }
  } else {
    // c = ceil((target * total - 100 * attended) / (100 - target))
    const diff = targetPercentage * totalClasses - 100 * attendedClasses;
    const classesNeededCount = Math.max(1, Math.ceil(diff / (100 - targetPercentage)));
    advisorMessage = `Attendance Warning: You must attend the next ${classesNeededCount} consecutive class${classesNeededCount > 1 ? "es" : ""} to reach ${targetPercentage}%.`;
    advisorType = "danger";
  }

  // SVG Circular Gauge calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  let gaugeColor = "#10b981"; // emerald-500
  if (percentage < targetPercentage) {
    gaugeColor = "#ef4444"; // rose-500
  } else if (percentage < targetPercentage + 5) {
    gaugeColor = "#f59e0b"; // amber-500
  }

  return (
    <div className="att-overall-wrapper">
      <div className="att-overall-grid">
        
        {/* Main Gauge & Standing Card */}
        <div className="att-gauge-card">
          <div className="att-card-header-flex">
            <span className="att-card-tagline">
              Overall Academic Standing
            </span>
            <span className={`att-pill-badge ${isSafe ? "safe" : "danger"}`}>
              {isSafe ? (
                <>
                  <ShieldCheck style={{ width: "0.875rem", height: "0.875rem" }} />
                  Eligible for Exams
                </>
              ) : (
                <>
                  <AlertTriangle style={{ width: "0.875rem", height: "0.875rem" }} />
                  At Risk of Shortage
                </>
              )}
            </span>
          </div>

          <div className="att-gauge-body">
            {/* SVG Circular Ring */}
            <div className="att-gauge-svg-wrap">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={gaugeColor}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{ transition: "all 0.8s ease-out" }}
                />
              </svg>
              <div className="att-gauge-center-text">
                <span className="att-gauge-percentage">
                  {percentage}%
                </span>
                <span className="att-gauge-target-label">
                  Goal: {targetPercentage}%
                </span>
              </div>
            </div>

            {/* Quick breakdown list */}
            <div className="att-gauge-ratios">
              <div className="att-ratio-item">
                <span className="att-dot emerald" />
                <span>Present Ratio:</span>
                <strong>
                  {totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0}%
                </strong>
              </div>
              <div className="att-ratio-item">
                <span className="att-dot rose" />
                <span>Missed Ratio:</span>
                <strong>
                  {totalClasses > 0 ? Math.round((missedClasses / totalClasses) * 100) : 0}%
                </strong>
              </div>
              <div className="att-ratio-item">
                <span className="att-dot blue" />
                <span>Total Classes:</span>
                <strong>{totalClasses}</strong>
              </div>
            </div>
          </div>

          <div style={{ width: "100%", height: "6px", background: "var(--att-surface-alt)", borderRadius: "9999px", overflow: "hidden" }}>
            <div
              style={{
                width: `${Math.min(100, percentage)}%`,
                height: "100%",
                background: gaugeColor,
                borderRadius: "9999px",
                transition: "width 0.6s ease"
              }}
            />
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="att-stat-mini-cards">
          {/* Classes Attended Card */}
          <div className="att-metric-card attended">
            <div className="att-metric-title-row">
              <span className="att-metric-label">Attended</span>
              <div className="att-metric-icon-circle">
                <CheckCircle style={{ width: "1rem", height: "1rem" }} />
              </div>
            </div>
            <div>
              <div className="att-metric-value">{attendedClasses}</div>
              <p className="att-metric-desc">Completed class sessions</p>
            </div>
          </div>

          {/* Classes Missed Card */}
          <div className="att-metric-card missed">
            <div className="att-metric-title-row">
              <span className="att-metric-label">Missed</span>
              <div className="att-metric-icon-circle">
                <XCircle style={{ width: "1rem", height: "1rem" }} />
              </div>
            </div>
            <div>
              <div className="att-metric-value">{missedClasses}</div>
              <p className="att-metric-desc">Absences / Leaves taken</p>
            </div>
          </div>

          {/* Total Classes Card */}
          <div className="att-metric-card total">
            <div className="att-metric-title-row">
              <span className="att-metric-label">Total Classes</span>
              <div className="att-metric-icon-circle">
                <TrendingUp style={{ width: "1rem", height: "1rem" }} />
              </div>
            </div>
            <div>
              <div className="att-metric-value">{totalClasses}</div>
              <p className="att-metric-desc">Total semester deliveries</p>
            </div>
          </div>
        </div>

      </div>

      {/* Smart Advisor Banner */}
      <div className={`att-advisor-banner ${advisorType}`}>
        <div className="att-advisor-icon">
          {advisorType === "safe" ? (
            <ShieldCheck style={{ width: "1.25rem", height: "1.25rem" }} />
          ) : (
            <AlertTriangle style={{ width: "1.25rem", height: "1.25rem" }} />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div className="att-advisor-title">
            <span>Smart Bunk & Safety Advisor</span>
            <span style={{
              fontSize: "0.625rem",
              fontWeight: 800,
              textTransform: "uppercase",
              padding: "0.15rem 0.5rem",
              borderRadius: "9999px",
              background: "rgba(0,0,0,0.08)"
            }}>
              {advisorType === "safe" ? "Safe Zone" : advisorType === "warning" ? "Caution" : "Action Needed"}
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