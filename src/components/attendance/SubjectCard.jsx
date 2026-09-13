import { useState } from "react";
import {
  Check,
  X,
  MoreVertical,
  Edit2,
  Trash2,
  TrendingUp,
  User,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import "./Attendance.css";

function SubjectCard({
  subject,
  targetPercentage = 75,
  onQuickLog,
  onEdit,
  onDelete,
  onViewDetails
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [justMarked, setJustMarked] = useState(null); // 'present' | 'absent' | null

  const attended = subject.attended || 0;
  const total = subject.total || 0;
  const missed = Math.max(0, total - attended);
  const percentage = total > 0 ? Math.round((attended / total) * 1000) / 10 : 0;
  const isSafe = percentage >= targetPercentage;

  // Bunk or Catch-up calculation
  let adviceText;
  let adviceType; // 'safe' | 'warning' | 'danger'
  let safeBunks = 0;
  let neededClasses = 0;

  if (total === 0) {
    adviceText = "No classes recorded yet";
    adviceType = "safe";
  } else if (isSafe) {
    const maxTotalClasses = Math.floor(attended / (targetPercentage / 100));
    safeBunks = Math.max(0, maxTotalClasses - total);
    if (safeBunks > 0) {
      adviceText = `Can miss next ${safeBunks} class${safeBunks > 1 ? "es" : ""}`;
      adviceType = "safe";
    } else {
      adviceText = "On edge: Don't miss next class";
      adviceType = "warning";
    }
  } else {
    const diff = targetPercentage * total - 100 * attended;
    neededClasses = Math.max(1, Math.ceil(diff / (100 - targetPercentage)));
    adviceText = `Need ${neededClasses} class${neededClasses > 1 ? "es" : ""} to reach ${targetPercentage}%`;
    adviceType = "danger";
  }

  function handleAction(type) {
    onQuickLog(subject.id, type);
    setJustMarked(type);
    setTimeout(() => setJustMarked(null), 1200);
  }

  // Mini circular SVG gauge
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;
  const ringColor = isSafe ? "var(--att-success)" : percentage >= targetPercentage - 5 ? "var(--att-accent)" : "var(--att-danger)";

  return (
    <div className="att-subject-card">
      <div>
        {/* Top Header Row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
            <span className="att-code-tag blue">
              {subject.code || "SUB-101"}
            </span>
            <span className={`att-pill-badge ${isSafe ? "safe" : "danger"}`} style={{ padding: "0.2rem 0.6rem", fontSize: "11px" }}>
              {isSafe ? (
                <ShieldCheck style={{ width: "0.875rem", height: "0.875rem" }} />
              ) : (
                <AlertCircle style={{ width: "0.875rem", height: "0.875rem" }} />
              )}
              {percentage}%
            </span>
          </div>

          {/* Action Menu (Kebab) */}
          <div className="att-card-menu-box" style={{ position: "relative" }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="att-btn-dots"
              aria-label="Course options"
            >
              <MoreVertical style={{ width: "1rem", height: "1rem" }} />
            </button>

            {showMenu && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 20 }}
                  onClick={() => setShowMenu(false)}
                />
                <div className="att-dropdown-menu" style={{ position: "absolute", right: 0, marginTop: "0.25rem", width: "11rem", zIndex: 30 }}>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onViewDetails(subject.id);
                    }}
                    className="att-dropdown-item"
                  >
                    <TrendingUp style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-primary)" }} />
                    Full Analytics
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onEdit(subject);
                    }}
                    className="att-dropdown-item"
                  >
                    <Edit2 style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-accent)" }} />
                    Edit Subject
                  </button>
                  <div style={{ margin: "0.25rem 0", borderTop: "1px solid var(--att-border)" }} />
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(subject.id);
                    }}
                    className="att-dropdown-item delete"
                  >
                    <Trash2 style={{ width: "0.875rem", height: "0.875rem" }} />
                    Delete Subject
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Subject Title & Faculty */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h3
              onClick={() => onViewDetails(subject.id)}
              className="att-card-subject-name"
              title={subject.name}
              style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
              {subject.name}
            </h3>
            <div className="att-card-faculty">
              <User style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-accent)", flexShrink: 0 }} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subject.faculty || "Course Faculty"}</span>
            </div>
          </div>

          {/* Mini Ring Gauge */}
          <div style={{ position: "relative", width: "3rem", height: "3rem", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg style={{ width: "3rem", height: "3rem", transform: "rotate(-90deg)" }} viewBox="0 0 54 54">
              <circle
                cx="27"
                cy="27"
                r={radius}
                stroke="var(--att-border)"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="27"
                cy="27"
                r={radius}
                stroke={ringColor}
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <span style={{ position: "absolute", fontSize: "11px", fontWeight: 900, color: "var(--att-text-main)" }}>
              {Math.round(percentage)}%
            </span>
          </div>
        </div>

        {/* Progress Bar & Class Ratios */}
        <div style={{ marginTop: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
            <span style={{ fontWeight: 600, color: "var(--att-text-muted)" }}>
              Attendance Progress
            </span>
            <span style={{ fontWeight: 700, color: "var(--att-text-main)" }}>
              {attended} <span style={{ color: "var(--att-text-muted)", fontWeight: "normal" }}>/ {total} sessions</span>
            </span>
          </div>

          <div style={{ position: "relative", width: "100%", height: "0.625rem", background: "var(--att-surface-alt)", borderRadius: "9999px", overflow: "hidden", marginTop: "0.35rem" }}>
            <div
              style={{
                height: "100%",
                borderRadius: "9999px",
                transition: "all 0.5s ease",
                backgroundColor: isSafe ? "var(--att-success)" : "var(--att-danger)",
                width: `${Math.min(100, Math.max(0, percentage))}%`
              }}
            />
            {/* Target 75% Pin */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "2px",
                backgroundColor: "var(--att-primary)",
                zIndex: 10,
                opacity: 0.7,
                left: `${targetPercentage}%`
              }}
              title={`Target: ${targetPercentage}%`}
            />
          </div>

          <div className="att-progress-labels">
            <span>0%</span>
            <span style={{ color: "var(--att-primary)", fontWeight: 700 }}>Goal: {targetPercentage}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Attended & Missed Chips */}
        <div className="att-stat-chips-row">
          <div className="att-stat-chip attended" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="att-stat-chip-label">Present</span>
            <span className="att-stat-chip-val" style={{ fontSize: "0.875rem" }}>{attended}</span>
          </div>
          <div className="att-stat-chip missed" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="att-stat-chip-label">Missed</span>
            <span className="att-stat-chip-val" style={{ fontSize: "0.875rem" }}>{missed}</span>
          </div>
        </div>

        {/* Smart Bunk / Catch-Up Advice Tag */}
        <div className={`att-bunk-chip ${adviceType}`}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{adviceText}</span>
          <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.9, padding: "0.1rem 0.35rem", borderRadius: "4px", background: "rgba(255,255,255,0.7)", border: "1px solid currentColor", flexShrink: 0, marginLeft: "0.25rem" }}>
            {adviceType === "safe" ? "Relax" : adviceType === "warning" ? "Caution" : "At Risk"}
          </span>
        </div>
      </div>

      {/* Quick Attendance Action Buttons */}
      <div className="att-quick-actions-bar">
        <button
          onClick={() => handleAction("present")}
          className={`att-btn-quick present ${justMarked === "present" ? "marked" : ""}`}
        >
          <Check style={{ width: "0.875rem", height: "0.875rem", strokeWidth: 2.5 }} />
          <span>{justMarked === "present" ? "Marked!" : "+ Present"}</span>
        </button>

        <button
          onClick={() => handleAction("absent")}
          className={`att-btn-quick absent ${justMarked === "absent" ? "marked" : ""}`}
        >
          <X style={{ width: "0.875rem", height: "0.875rem", strokeWidth: 2.5 }} />
          <span>{justMarked === "absent" ? "Marked!" : "+ Absent"}</span>
        </button>
      </div>

    </div>
  );
}

export default SubjectCard;