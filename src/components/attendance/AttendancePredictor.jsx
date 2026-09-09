import { useState } from "react";
import {
  TrendingUp,
  Award,
  AlertTriangle,
  ShieldCheck,
  CheckCircle,
  Sparkles
} from "lucide-react";

function AttendancePredictor({ subjects = [], targetPercentage = 75 }) {
  const [selectedSubjectId, setSelectedSubjectId] = useState("all");
  const [upcomingClasses, setUpcomingClasses] = useState(12);

  // Compute selected stats
  let attended = 0;
  let total = 0;

  if (selectedSubjectId === "all") {
    attended = subjects.reduce((sum, s) => sum + s.attended, 0);
    total = subjects.reduce((sum, s) => sum + s.total, 0);
  } else {
    const sub = subjects.find((s) => s.id === Number(selectedSubjectId));
    if (sub) {
      attended = sub.attended;
      total = sub.total;
    }
  }

  const currentPct = total > 0 ? (attended / total) * 100 : 0;
  const upcoming = Number(upcomingClasses) || 0;
  const projectedTotal = total + upcoming;

  // Scenario 1: Attend 100% of remaining
  const maxAttended = attended + upcoming;
  const maxPct = projectedTotal > 0 ? (maxAttended / projectedTotal) * 100 : 0;

  // Scenario 2: Attend 80% of remaining
  const eightyAttended = attended + Math.round(upcoming * 0.8);
  const eightyPct = projectedTotal > 0 ? (eightyAttended / projectedTotal) * 100 : 0;

  // Scenario 3: Minimum needed to stay at or above targetPercentage
  const rawNeeded = Math.ceil((targetPercentage * projectedTotal - 100 * attended) / 100);
  const minNeeded = Math.max(0, rawNeeded);
  const maxBunksAllowedInFuture = Math.max(0, upcoming - minNeeded);
  const canAchieveTarget = minNeeded <= upcoming;

  return (
    <div className="att-overall-wrapper">
      <div className="att-calc-box">
        {/* Header bar */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          paddingBottom: "1.25rem",
          borderBottom: "1px solid var(--att-border-subtle)"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "0.6rem",
                background: "#f3e8ff",
                color: "#9333ea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <TrendingUp style={{ width: "1rem", height: "1rem" }} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "var(--att-text-main)" }}>
                Semester Attendance Predictor
              </h2>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", margin: "0.25rem 0 0 0" }}>
              Forecast your final attendance and semester exam eligibility before the semester ends.
            </p>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "0.45rem 0.85rem",
            borderRadius: "var(--att-radius-sm)",
            background: "#f3e8ff",
            color: "#7e22ce",
            border: "1px solid #e9d5ff"
          }}>
            <Sparkles style={{ width: "0.875rem", height: "0.875rem" }} />
            <span>Target: {targetPercentage}% Threshold</span>
          </div>
        </div>

        {/* Inputs */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          paddingTop: "1.25rem"
        }}>
          <div>
            <label className="att-input-label">
              Scope of Prediction
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="att-form-control"
            >
              <option value="all">Overall (All Enrolled Subjects)</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.code || "SUB"})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
              <label className="att-input-label" style={{ margin: 0 }}>
                Estimated Classes Remaining
              </label>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#9333ea" }}>
                {upcomingClasses} classes
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={upcomingClasses}
              onChange={(e) => setUpcomingClasses(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#9333ea", cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Current Standing Banner */}
        <div style={{
          marginTop: "1.5rem",
          padding: "1rem 1.25rem",
          borderRadius: "var(--att-radius-md)",
          background: "var(--att-surface-subtle)",
          border: "1px solid var(--att-border)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div style={{
              width: "2.75rem",
              height: "2.75rem",
              borderRadius: "var(--att-radius-sm)",
              background: "#ffffff",
              border: "1px solid var(--att-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "1.125rem",
              color: "var(--att-primary)"
            }}>
              {currentPct.toFixed(0)}%
            </div>
            <div>
              <p style={{ fontSize: "0.8125rem", fontWeight: 700, margin: 0, color: "var(--att-text-main)" }}>
                Current Position: {attended} Attended out of {total} Conducted
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", margin: "0.15rem 0 0 0" }}>
                With {upcoming} more upcoming classes, semester total will reach {projectedTotal} classes.
              </p>
            </div>
          </div>

          <span className={`att-pill-badge ${currentPct >= targetPercentage ? "safe" : "danger"}`}>
            {currentPct >= targetPercentage ? "Currently on Track" : "Currently in Shortage"}
          </span>
        </div>

        {/* Forecast Scenarios Grid */}
        <div style={{ marginTop: "2rem" }}>
          <span className="att-card-tagline" style={{ display: "block", marginBottom: "1rem" }}>
            Projected Scenarios by End of Term
          </span>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem"
          }}>
            
            {/* Best Case: 100% attendance */}
            <div style={{
              background: "linear-gradient(to bottom, var(--att-success-light), #ffffff)",
              border: "1px solid var(--att-success-border)",
              borderRadius: "var(--att-radius-lg)",
              padding: "1.4rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--att-success-text)", textTransform: "uppercase" }}>
                    Best Case (100%)
                  </span>
                  <Award style={{ width: "1rem", height: "1rem", color: "var(--att-success)" }} />
                </div>
                <div style={{ marginTop: "0.75rem" }}>
                  <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--att-success-text)", display: "block" }}>
                    {maxPct.toFixed(1)}%
                  </span>
                  <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", margin: "0.35rem 0 0 0" }}>
                    If you attend <strong>all {upcoming}</strong> upcoming classes.
                  </p>
                </div>
              </div>

              <div style={{
                marginTop: "1rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--att-success-border)",
                fontSize: "0.6875rem",
                color: "var(--att-success-text)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem"
              }}>
                <CheckCircle style={{ width: "0.85rem", height: "0.85rem" }} />
                <span>Exemplary Exam Clearance</span>
              </div>
            </div>

            {/* Target Minimum Required */}
            <div style={{
              background: "linear-gradient(to bottom, var(--att-primary-light), #ffffff)",
              border: "1px solid var(--att-primary-border)",
              borderRadius: "var(--att-radius-lg)",
              padding: "1.4rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--att-primary)", textTransform: "uppercase" }}>
                    Safe Pass Minimum
                  </span>
                  <ShieldCheck style={{ width: "1rem", height: "1rem", color: "var(--att-primary)" }} />
                </div>
                <div style={{ marginTop: "0.75rem" }}>
                  {canAchieveTarget ? (
                    <>
                      <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--att-primary)", display: "block" }}>
                        {minNeeded} / {upcoming}
                      </span>
                      <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", margin: "0.35rem 0 0 0" }}>
                        Must attend at least <strong>{minNeeded}</strong> of next {upcoming} classes to secure {targetPercentage}%.
                      </p>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--att-danger)", display: "block" }}>
                        Unattainable
                      </span>
                      <p style={{ fontSize: "0.75rem", color: "var(--att-danger-text)", margin: "0.35rem 0 0 0" }}>
                        Even attending 100% of classes won't cross {targetPercentage}%.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div style={{
                marginTop: "1rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--att-primary-border)",
                fontSize: "0.6875rem",
                color: "var(--att-primary)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem"
              }}>
                <Sparkles style={{ width: "0.85rem", height: "0.85rem" }} />
                <span>
                  {canAchieveTarget
                    ? `Allows up to ${maxBunksAllowedInFuture} safe bunks`
                    : "Immediate faculty approval required"}
                </span>
              </div>
            </div>

            {/* Normal Regular Scenario (80%) */}
            <div style={{
              background: "linear-gradient(to bottom, #faf5ff, #ffffff)",
              border: "1px solid #e9d5ff",
              borderRadius: "var(--att-radius-lg)",
              padding: "1.4rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#7e22ce", textTransform: "uppercase" }}>
                    Realistic (80%)
                  </span>
                  <TrendingUp style={{ width: "1rem", height: "1rem", color: "#9333ea" }} />
                </div>
                <div style={{ marginTop: "0.75rem" }}>
                  <span style={{ fontSize: "2rem", fontWeight: 800, color: "#7e22ce", display: "block" }}>
                    {eightyPct.toFixed(1)}%
                  </span>
                  <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", margin: "0.35rem 0 0 0" }}>
                    If you attend 80% ({Math.round(upcoming * 0.8)} of {upcoming}) remaining classes.
                  </p>
                </div>
              </div>

              <div style={{
                marginTop: "1rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid #e9d5ff",
                fontSize: "0.6875rem",
                color: "#7e22ce",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem"
              }}>
                {eightyPct >= targetPercentage ? (
                  <>
                    <CheckCircle style={{ width: "0.85rem", height: "0.85rem" }} />
                    <span>Meets eligibility criteria</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle style={{ width: "0.85rem", height: "0.85rem", color: "var(--att-warning)" }} />
                    <span>Falls slightly below target</span>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default AttendancePredictor;