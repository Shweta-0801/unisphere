import { useState } from "react";
import {
  TrendingUp,
  Award,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Sliders,
  ArrowRight,
  Calculator,
  Calendar,
  Zap,
  Info
} from "lucide-react";
import "./Attendance.css";

function AttendancePredictor({ subjects = [], targetPercentage = 75 }) {
  const [selectedSubjectId, setSelectedSubjectId] = useState("all");
  const [upcomingClasses, setUpcomingClasses] = useState(12);
  const [attendRate, setAttendRate] = useState(100); // 0 to 100% of remaining classes attended

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

  // Dynamic simulation based on attendRate slider
  const simulatedAttendedUpcoming = Math.round((upcoming * attendRate) / 100);
  const projectedAttended = attended + simulatedAttendedUpcoming;
  const projectedPct = projectedTotal > 0 ? (projectedAttended / projectedTotal) * 100 : 0;
  const isProjectedSafe = projectedPct >= targetPercentage;

  // Calculate Safe Bunks remaining in upcoming
  const minRequiredToPass = Math.ceil((targetPercentage * projectedTotal - 100 * attended) / 100);
  const minRequiredClamped = Math.max(0, minRequiredToPass);
  const canAchieveTarget = minRequiredClamped <= upcoming;
  const safeBunksInUpcoming = canAchieveTarget ? Math.max(0, upcoming - minRequiredClamped) : 0;

  // Catch-up calculation for current standing: how many consecutive classes to attend to reach target
  let consecutiveNeeded = 0;
  if (currentPct < targetPercentage && targetPercentage < 100) {
    consecutiveNeeded = Math.ceil((targetPercentage * total - 100 * attended) / (100 - targetPercentage));
    consecutiveNeeded = Math.max(1, consecutiveNeeded);
  }

  // Pre-calculated scenarios
  const scenarios = [
    {
      label: "Best Case (100% Attendance)",
      rate: 100,
      attended: attended + upcoming,
      pct: projectedTotal > 0 ? ((attended + upcoming) / projectedTotal) * 100 : 0,
      note: `Attend all ${upcoming} classes`
    },
    {
      label: "Good Discipline (85% Attendance)",
      rate: 85,
      attended: attended + Math.round(upcoming * 0.85),
      pct: projectedTotal > 0 ? ((attended + Math.round(upcoming * 0.85)) / projectedTotal) * 100 : 0,
      note: `Attend ${Math.round(upcoming * 0.85)} of ${upcoming} classes`
    },
    {
      label: "Minimum Safe Clearance",
      rate: canAchieveTarget ? Math.round((minRequiredClamped / upcoming) * 100) : 0,
      attended: attended + minRequiredClamped,
      pct: projectedTotal > 0 ? ((attended + minRequiredClamped) / projectedTotal) * 100 : 0,
      note: canAchieveTarget ? `Must attend at least ${minRequiredClamped} classes` : "Target unreachable"
    },
    {
      label: "Zero Effort (0% Attendance)",
      rate: 0,
      attended: attended,
      pct: projectedTotal > 0 ? (attended / projectedTotal) * 100 : 0,
      note: `Skip all ${upcoming} classes`
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Banner */}
      <div className="att-header-hero" style={{ padding: "1.75rem 2rem" }}>
        <div className="att-header-glow-1" />
        <div className="att-header-glow-2" />

        <div style={{ position: "relative", zIndex: 2, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "3rem", height: "3rem", borderRadius: "var(--att-radius-md)", background: "rgba(255, 255, 255, 0.12)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255, 255, 255, 0.15)" }}>
              <Sparkles style={{ width: "1.5rem", height: "1.5rem", color: "var(--att-accent)" }} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 900, letterSpacing: "-0.02em", margin: 0, color: "#ffffff" }}>
                  Smart Attendance Predictor &amp; Simulator
                </h2>
                <span style={{ fontSize: "10px", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "9999px", background: "rgba(255, 255, 255, 0.15)", border: "1px solid rgba(255, 255, 255, 0.2)", color: "var(--att-accent-light)" }}>
                  Predictive v2
                </span>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--att-accent-light)", marginTop: "0.25rem", margin: "0.25rem 0 0 0" }}>
                Simulate your attendance trajectory, test what-if bunk scenarios, and ensure semester exam clearance.
              </p>
            </div>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "var(--att-radius-md)", background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.2)", fontSize: "0.75rem", fontWeight: 700, color: "#ffffff" }}>
            <Award style={{ width: "1rem", height: "1rem", color: "var(--att-accent)" }} />
            <span>Target Threshold: {targetPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Predictor Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        
        {/* LEFT COLUMN: Controls & What-If Simulator */}
        <div className="att-gauge-card" style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "1rem", borderBottom: "1px solid var(--att-border)", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Sliders style={{ width: "1.125rem", height: "1.125rem", color: "var(--att-primary)" }} />
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--att-text-main)", margin: 0 }}>
                Simulation Parameters
              </h3>
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", fontWeight: 500 }}>
              Adjust values to preview live outcome
            </span>
          </div>

          {/* Subject Scope */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="att-input-label">
              Course / Subject Scope
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="att-form-control"
              style={{ cursor: "pointer" }}
            >
              <option value="all">Overall (All Combined Semester Subjects)</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.code || "CS"}) — Currently {sub.total > 0 ? Math.round((sub.attended / sub.total) * 100) : 0}%
                </option>
              ))}
            </select>
          </div>

          {/* Upcoming Classes Slider */}
          <div style={{ background: "var(--att-surface-subtle)", padding: "1.25rem", borderRadius: "var(--att-radius-md)", border: "1px solid var(--att-border)", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-text-main)" }}>
                Classes Remaining This Semester
              </span>
              <span style={{ fontSize: "0.875rem", fontWeight: 900, color: "var(--att-primary)", background: "var(--att-primary-light)", padding: "0.25rem 0.75rem", borderRadius: "var(--att-radius-xs)", border: "1px solid var(--att-primary-border)" }}>
                {upcomingClasses} Lectures
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={upcomingClasses}
              onChange={(e) => setUpcomingClasses(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--att-primary)", cursor: "pointer", height: "0.5rem" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--att-text-muted)", fontWeight: 500, marginTop: "0.35rem" }}>
              <span>1 Class</span>
              <span>20 Classes</span>
              <span>40 Classes (Full Term)</span>
            </div>
          </div>

          {/* Attendance Behavior Simulation */}
          <div style={{ background: "var(--att-surface-subtle)", padding: "1.25rem", borderRadius: "var(--att-radius-md)", border: "1px solid var(--att-border)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-text-main)" }}>
                Your Planned Attendance Rate for Remaining Classes
              </span>
              <span style={{ fontSize: "0.875rem", fontWeight: 900, color: "var(--att-primary)", background: "var(--att-primary-light)", padding: "0.25rem 0.75rem", borderRadius: "var(--att-radius-xs)", border: "1px solid var(--att-primary-border)" }}>
                {attendRate}% ({simulatedAttendedUpcoming} of {upcoming})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={attendRate}
              onChange={(e) => setAttendRate(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--att-primary)", cursor: "pointer", height: "0.5rem" }}
            />
            
            {/* Quick preset buttons */}
            <div style={{ paddingTop: "0.75rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--att-text-muted)", marginRight: "0.25rem" }}>Quick Presets:</span>
              <button
                type="button"
                onClick={() => setAttendRate(100)}
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "var(--att-radius-xs)",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "1px solid var(--att-border)",
                  background: attendRate === 100 ? "var(--att-primary)" : "var(--att-surface)",
                  color: attendRate === 100 ? "#ffffff" : "var(--att-text-muted)"
                }}
              >
                100% (No Bunks)
              </button>
              <button
                type="button"
                onClick={() => setAttendRate(80)}
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "var(--att-radius-xs)",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "1px solid var(--att-border)",
                  background: attendRate === 80 ? "var(--att-primary)" : "var(--att-surface)",
                  color: attendRate === 80 ? "#ffffff" : "var(--att-text-muted)"
                }}
              >
                80% (Moderate)
              </button>
              <button
                type="button"
                onClick={() => setAttendRate(50)}
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "var(--att-radius-xs)",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "1px solid var(--att-border)",
                  background: attendRate === 50 ? "var(--att-primary)" : "var(--att-surface)",
                  color: attendRate === 50 ? "#ffffff" : "var(--att-text-muted)"
                }}
              >
                50% (High Bunk)
              </button>
              <button
                type="button"
                onClick={() => setAttendRate(0)}
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "var(--att-radius-xs)",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "1px solid var(--att-border)",
                  background: attendRate === 0 ? "var(--att-danger)" : "var(--att-surface)",
                  color: attendRate === 0 ? "#ffffff" : "var(--att-text-muted)"
                }}
              >
                0% (Skip All)
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Projected Outcome & Health Gauge */}
        <div className="att-gauge-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid var(--att-border)" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-text-muted)" }}>
                Forecast Result
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  border: "1px solid",
                  background: isProjectedSafe ? "var(--att-success-light)" : "var(--att-danger-light)",
                  color: isProjectedSafe ? "var(--att-success-text)" : "var(--att-danger-text)",
                  borderColor: isProjectedSafe ? "var(--att-success-border)" : "var(--att-danger-border)"
                }}
              >
                {isProjectedSafe ? "Eligible for Exams ✓" : "Shortage Warning ⚠"}
              </span>
            </div>

            {/* Big Percentage Readout */}
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--att-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Projected Final Attendance
              </div>
              <div
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 900,
                  marginTop: "0.5rem",
                  letterSpacing: "-0.03em",
                  color: isProjectedSafe ? "var(--att-success)" : "var(--att-danger)"
                }}
              >
                {projectedPct.toFixed(1)}%
              </div>

              <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--att-text-muted)" }}>
                <span>Current: {currentPct.toFixed(1)}%</span>
                <span>→</span>
                <span style={{ color: projectedPct >= currentPct ? "var(--att-success)" : "var(--att-danger)", fontWeight: 700 }}>
                  {projectedPct >= currentPct ? `+${(projectedPct - currentPct).toFixed(1)}%` : `${(projectedPct - currentPct).toFixed(1)}%`}
                </span>
              </div>
            </div>

            {/* Trajectory Bar */}
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ height: "0.75rem", width: "100%", background: "var(--att-surface-alt)", borderRadius: "9999px", overflow: "hidden", position: "relative" }}>
                {/* Target Marker */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "2px",
                    background: "var(--att-text-main)",
                    zIndex: 10,
                    left: `${targetPercentage}%`
                  }}
                  title={`Target: ${targetPercentage}%`}
                />
                <div
                  style={{
                    height: "100%",
                    borderRadius: "9999px",
                    transition: "all 0.3s ease",
                    background: isProjectedSafe ? "var(--att-success)" : "var(--att-danger)",
                    width: `${Math.min(100, projectedPct)}%`
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--att-text-muted)", marginTop: "0.35rem", fontWeight: 500 }}>
                <span>0%</span>
                <span style={{ fontWeight: 700, color: "var(--att-text-main)" }}>Target: {targetPercentage}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Prediction Breakdown */}
          <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--att-border)", display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--att-text-muted)" }}>
              <span>Final Projected Classes:</span>
              <span style={{ fontWeight: 700, color: "var(--att-text-main)" }}>{projectedAttended} of {projectedTotal} attended</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--att-text-muted)" }}>
              <span>Allowed Bunks in Next {upcoming}:</span>
              <span style={{ fontWeight: 700, color: "var(--att-primary)" }}>{safeBunksInUpcoming} safe bunks</span>
            </div>
            {currentPct < targetPercentage && consecutiveNeeded > 0 && (
              <div style={{ padding: "0.65rem", borderRadius: "var(--att-radius-sm)", background: "var(--att-danger-light)", border: "1px solid var(--att-danger-border)", color: "var(--att-danger-text)", fontSize: "11px", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <AlertTriangle style={{ width: "0.875rem", height: "0.875rem", flexShrink: 0, color: "var(--att-danger)" }} />
                <span>Must attend next {consecutiveNeeded} consecutive classes to recover to {targetPercentage}%.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scenario Matrix Cards */}
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--att-text-main)", margin: 0 }}>
            End-of-Term Scenarios Comparison
          </h3>
          <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", marginTop: "0.25rem" }}>
            Pre-computed projections comparing different student attendance commitments.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {scenarios.map((sc, i) => {
            const meets = sc.pct >= targetPercentage;
            return (
              <div
                key={i}
                className="att-gauge-card"
                style={{ padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-text-muted)" }}>
                      Scenario {i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "var(--att-radius-xs)",
                        background: meets ? "var(--att-success-light)" : "var(--att-danger-light)",
                        color: meets ? "var(--att-success-text)" : "var(--att-danger-text)"
                      }}
                    >
                      {meets ? "Clear" : "Shortage"}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--att-text-main)" }}>
                    {sc.label}
                  </div>

                  <div
                    style={{
                      fontSize: "1.875rem",
                      fontWeight: 900,
                      marginTop: "0.5rem",
                      letterSpacing: "-0.02em",
                      color: meets ? "var(--att-success)" : "var(--att-danger)"
                    }}
                  >
                    {sc.pct.toFixed(1)}%
                  </div>

                  <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", marginTop: "0.25rem" }}>
                    {sc.note}
                  </p>
                </div>

                <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--att-border)", fontSize: "11px", fontWeight: 600, color: "var(--att-text-muted)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span>Final: {sc.attended}/{projectedTotal}</span>
                  <span style={{ color: meets ? "var(--att-success)" : "var(--att-danger)", fontWeight: 700 }}>
                    {meets ? "Permitted" : "Barred"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AttendancePredictor;