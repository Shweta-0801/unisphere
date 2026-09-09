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

  const colorTag = subject.color || "blue";

  // Bunk or Catch-up calculation
  let adviceText;
  let adviceType;

  if (total === 0) {
    adviceText = "No classes recorded yet";
    adviceType = "safe";
  } else if (isSafe) {
    const maxTotalClasses = Math.floor(attended / (targetPercentage / 100));
    const safeBunks = Math.max(0, maxTotalClasses - total);
    if (safeBunks > 0) {
      adviceText = `Can miss next ${safeBunks} class${safeBunks > 1 ? "es" : ""}`;
      adviceType = "safe";
    } else {
      adviceText = "On edge: Don't miss next class";
      adviceType = "warning";
    }
  } else {
    const diff = targetPercentage * total - 100 * attended;
    const needed = Math.max(1, Math.ceil(diff / (100 - targetPercentage)));
    adviceText = `Need ${needed} class${needed > 1 ? "es" : ""} to reach ${targetPercentage}%`;
    adviceType = "danger";
  }

  function handleAction(type) {
    onQuickLog(subject.id, type);
    setJustMarked(type);
    setTimeout(() => setJustMarked(null), 1200);
  }

  return (
    <div className="att-subject-card">
      <div>
        {/* Top Badges & Options */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className={`att-code-tag ${colorTag}`}>
              {subject.code || "SUB-101"}
            </span>
            <span className={`att-pill-badge ${isSafe ? "safe" : "danger"}`}>
              {isSafe ? (
                <ShieldCheck style={{ width: "0.75rem", height: "0.75rem" }} />
              ) : (
                <AlertCircle style={{ width: "0.75rem", height: "0.75rem" }} />
              )}
              {percentage}%
            </span>
          </div>

          {/* Action Menu */}
          <div className="att-card-menu-box">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="att-btn-dots"
              aria-label="Subject options"
            >
              <MoreVertical style={{ width: "1rem", height: "1rem" }} />
            </button>

            {showMenu && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 20 }}
                  onClick={() => setShowMenu(false)}
                />
                <div className="att-dropdown-menu">
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
                    <Edit2 style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-text-muted)" }} />
                    Edit Subject
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(subject.id);
                    }}
                    className="att-dropdown-item delete"
                  >
                    <Trash2 style={{ width: "0.875rem", height: "0.875rem" }} />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Subject Title & Faculty */}
        <h3
          onClick={() => onViewDetails(subject.id)}
          className="att-card-subject-name"
          title={subject.name}
        >
          {subject.name}
        </h3>
        <div className="att-card-faculty">
          <User style={{ width: "0.875rem", height: "0.875rem" }} />
          <span>{subject.faculty || "Course Faculty"}</span>
        </div>

        {/* Progress Bar with Target Indicator */}
        <div style={{ marginTop: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
            <span style={{ fontWeight: 600, color: "var(--att-text-main)" }}>Attendance</span>
            <span style={{ fontWeight: 700 }}>{attended} / {total} classes</span>
          </div>

          <div className="att-progress-track">
            <div
              className={`att-progress-fill ${isSafe ? "safe" : "risk"}`}
              style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
            />
          </div>

          <div className="att-progress-labels">
            <span>0%</span>
            <span>Target: {targetPercentage}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Breakdown chips */}
        <div className="att-stat-chips-row">
          <div className="att-stat-chip attended">
            <span className="att-stat-chip-label">Attended</span>
            <span className="att-stat-chip-val">{attended}</span>
          </div>
          <div className="att-stat-chip missed">
            <span className="att-stat-chip-label">Missed</span>
            <span className="att-stat-chip-val">{missed}</span>
          </div>
        </div>

        {/* Bunk advice badge */}
        <div className={`att-bunk-chip ${adviceType}`}>
          <span>{adviceText}</span>
          <span style={{ fontSize: "0.625rem", textTransform: "uppercase", opacity: 0.8 }}>
            {adviceType === "safe" ? "Relax" : adviceType === "warning" ? "Caution" : "Warning"}
          </span>
        </div>
      </div>

      {/* Quick Attendance Logger Buttons */}
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