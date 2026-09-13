import { useState } from "react";
import {
  Calculator,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Sliders,
  BookmarkCheck,
  Zap,
  Info
} from "lucide-react";
import "./Attendance.css";

function AttendanceCalculator({ subjects = [] }) {
  const [mode, setMode] = useState("subject"); // 'subject' | 'custom'
  const [selectedSubjectId, setSelectedSubjectId] = useState(() => {
    return subjects.length > 0 ? subjects[0].id : "";
  });
  const [customAttended, setCustomAttended] = useState("18");
  const [customTotal, setCustomTotal] = useState("24");
  const [targetPercentage, setTargetPercentage] = useState(75);

  // Simulation slider: test what happens if student attends next N classes
  const [simulateNext, setSimulateNext] = useState(6);
  const [simulateAttendCount, setSimulateAttendCount] = useState(6); // How many of next N will be attended

  const selectedSub = subjects.find((s) => s.id === Number(selectedSubjectId)) || subjects[0];

  const attendedNum = mode === "subject" ? (selectedSub?.attended || 0) : (Number(customAttended) || 0);
  const totalNum = mode === "subject" ? (selectedSub?.total || 0) : (Number(customTotal) || 0);
  const target = Number(targetPercentage) || 75;

  const isValid = totalNum > 0 && attendedNum >= 0 && attendedNum <= totalNum;
  const currentPercentage = isValid ? (attendedNum / totalNum) * 100 : 0;
  const isAboveTarget = currentPercentage >= target;

  // Catch-up classes needed
  let classesNeeded = 0;
  if (isValid && !isAboveTarget && target < 100) {
    const diff = target * totalNum - 100 * attendedNum;
    classesNeeded = Math.max(1, Math.ceil(diff / (100 - target)));
  }

  // Safe bunks allowed
  let safeBunks = 0;
  if (isValid && isAboveTarget && target > 0) {
    const maxTotalClasses = Math.floor(attendedNum / (target / 100));
    safeBunks = Math.max(0, maxTotalClasses - totalNum);
  }

  // Simulation calculations
  const simN = Number(simulateNext) || 0;
  const simAtt = Math.min(simN, Math.max(0, Number(simulateAttendCount) || 0));
  const simulatedAttended = attendedNum + simAtt;
  const simulatedTotal = totalNum + simN;
  const simulatedPct = simulatedTotal > 0 ? ((simulatedAttended / simulatedTotal) * 100) : 0;
  const simDelta = simulatedPct - currentPercentage;

  // Best case (100% of next N)
  const bestPct = (totalNum + simN) > 0 ? (((attendedNum + simN) / (totalNum + simN)) * 100) : 0;
  // Worst case (0% of next N)
  const worstPct = (totalNum + simN) > 0 ? ((attendedNum / (totalNum + simN)) * 100) : 0;

  const enrolledCourseName = selectedSub ? selectedSub.name : "Custom";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Top Banner & Mode Selector */}
      <div className="att-gauge-card" style={{ padding: "1.75rem 2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--att-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "3rem", height: "3rem", borderRadius: "var(--att-radius-md)", background: "var(--att-primary-light)", color: "var(--att-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Calculator style={{ width: "1.5rem", height: "1.5rem" }} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--att-text-main)", margin: 0, letterSpacing: "-0.02em" }}>
                  Smart Attendance &amp; Bunk Calculator
                </h2>
                <span style={{ fontSize: "11px", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "9999px", background: "var(--att-surface-alt)", color: "var(--att-text-muted)" }}>
                  Real-time Math
                </span>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--att-text-muted)", marginTop: "0.25rem", margin: "0.25rem 0 0 0" }}>
                Calculate exact safe bunk allowances, consecutive catch-up requirements, and test what-if class attendance.
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div style={{ display: "inline-flex", padding: "0.25rem", borderRadius: "var(--att-radius-md)", background: "var(--att-surface-alt)" }}>
            <button
              onClick={() => setMode("subject")}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "var(--att-radius-sm)",
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                background: mode === "subject" ? "var(--att-surface)" : "transparent",
                color: mode === "subject" ? "var(--att-primary)" : "var(--att-text-muted)",
                boxShadow: mode === "subject" ? "var(--att-shadow-xs)" : "none"
              }}
            >
              Enrolled Courses
            </button>
            <button
              onClick={() => setMode("custom")}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "var(--att-radius-sm)",
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                background: mode === "custom" ? "var(--att-surface)" : "transparent",
                color: mode === "custom" ? "var(--att-primary)" : "var(--att-text-muted)",
                boxShadow: mode === "custom" ? "var(--att-shadow-xs)" : "none"
              }}
            >
              Custom Numbers
            </button>
          </div>
        </div>

        {/* Configuration Inputs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", paddingTop: "1.5rem" }}>
          {mode === "subject" ? (
            <div>
              <label className="att-input-label">
                Select Enrolled Course
              </label>
              <select
                value={selectedSubjectId || (selectedSub?.id || "")}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="att-form-control"
                style={{ cursor: "pointer" }}
              >
                {subjects.map((sub) => {
                  const subPct = sub.total > 0 ? ((sub.attended / sub.total) * 100).toFixed(1) : 0;
                  return (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} — {sub.attended}/{sub.total} ({subPct}%)
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div>
              <label className="att-input-label">
                Classes Attended
              </label>
              <input
                type="number"
                min="0"
                value={customAttended}
                onChange={(e) => setCustomAttended(e.target.value)}
                placeholder="e.g. 18"
                className="att-form-control"
              />
            </div>
          )}

          <div>
            <label className="att-input-label">
              Total Classes Conducted
            </label>
            <input
              type="number"
              min="0"
              value={mode === "subject" ? (selectedSub?.total || 0) : customTotal}
              onChange={(e) => setCustomTotal(e.target.value)}
              disabled={mode === "subject"}
              placeholder="e.g. 24"
              className="att-form-control"
              style={{
                background: mode === "subject" ? "var(--att-surface-alt)" : "var(--att-surface)",
                cursor: mode === "subject" ? "not-allowed" : "text"
              }}
            />
          </div>

          <div>
            <label className="att-input-label">
              Target Attendance Goal
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
              {[65, 75, 80, 85].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setTargetPercentage(pct)}
                  style={{
                    padding: "0.55rem 0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    borderRadius: "var(--att-radius-sm)",
                    border: "1px solid",
                    cursor: "pointer",
                    background: targetPercentage === pct ? "var(--att-primary)" : "var(--att-bg)",
                    color: targetPercentage === pct ? "#ffffff" : "var(--att-text-muted)",
                    borderColor: targetPercentage === pct ? "var(--att-primary)" : "var(--att-border)"
                  }}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Calculation Dashboard */}
        {isValid ? (
          <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--att-border)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Top Cards: Standing & Safe Bunks / Catch-Up */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
              
              {/* Left Card: Current Performance Gauge */}
              <div style={{
                borderRadius: "var(--att-radius-lg)",
                padding: "1.5rem",
                border: "1px solid",
                background: isAboveTarget ? "var(--att-success-light)" : "var(--att-danger-light)",
                borderColor: isAboveTarget ? "var(--att-success-border)" : "var(--att-danger-border)"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-text-muted)" }}>
                    Current Performance
                  </span>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    background: isAboveTarget ? "var(--att-success-light)" : "var(--att-danger-light)",
                    color: isAboveTarget ? "var(--att-success-text)" : "var(--att-danger-text)"
                  }}>
                    {isAboveTarget ? (
                      <>
                        <ShieldCheck style={{ width: "0.875rem", height: "0.875rem" }} />
                        Above Target
                      </>
                    ) : (
                      <>
                        <AlertTriangle style={{ width: "0.875rem", height: "0.875rem" }} />
                        Shortage Warning
                      </>
                    )}
                  </span>
                </div>

                <div style={{ marginTop: "1rem", display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                  <span style={{ fontSize: "2.75rem", fontWeight: 900, color: "var(--att-text-main)", letterSpacing: "-0.02em" }}>
                    {currentPercentage.toFixed(1)}%
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-text-muted)" }}>
                    ({attendedNum} attended of {totalNum})
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ position: "relative", width: "100%", height: "0.75rem", background: "var(--att-surface-alt)", borderRadius: "9999px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        borderRadius: "9999px",
                        transition: "all 0.7s ease",
                        background: isAboveTarget ? "var(--att-success)" : "var(--att-danger)",
                        width: `${Math.min(100, currentPercentage)}%`
                      }}
                    />
                    {/* Target Pin */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: "2px",
                        background: "var(--att-text-main)",
                        zIndex: 10,
                        left: `${target}%`
                      }}
                      title={`Target: ${target}%`}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontWeight: 700, color: "var(--att-text-muted)", marginTop: "0.35rem" }}>
                    <span>0%</span>
                    <span style={{ color: "var(--att-primary)", fontWeight: 800 }}>Target: {target}%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Context Advice */}
                <div style={{ marginTop: "1.25rem", padding: "0.85rem", borderRadius: "var(--att-radius-sm)", background: "var(--att-surface)", border: "1px solid var(--att-border)", fontSize: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, color: "var(--att-text-main)" }}>
                    <BookmarkCheck style={{ width: "1rem", height: "1rem", color: "var(--att-accent)" }} />
                    <span>Target Difference:</span>
                    <span style={{ color: currentPercentage >= target ? "var(--att-success)" : "var(--att-danger)" }}>
                      {currentPercentage >= target ? "+" : ""}
                      {(currentPercentage - target).toFixed(1)}%
                    </span>
                  </div>
                  <p style={{ color: "var(--att-text-muted)", marginTop: "0.25rem", lineHeight: 1.5, margin: "0.25rem 0 0 0" }}>
                    {isAboveTarget
                      ? `You are safely meeting the ${target}% threshold required for standard semester exam admittance.`
                      : `You are ${(target - currentPercentage).toFixed(1)}% short of the ${target}% cutoff. Remedial attendance required.`}
                  </p>
                </div>
              </div>

              {/* Right Card: Safe Bunk vs Catch-up Action Engine */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: "var(--att-bg)", borderRadius: "var(--att-radius-lg)", padding: "1.5rem", border: "1px solid var(--att-border)" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <Zap style={{ width: "1.25rem", height: "1.25rem", color: "var(--att-accent)" }} />
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--att-text-main)", margin: 0 }}>
                      Action Recommendation Engine
                    </h3>
                  </div>

                  {isAboveTarget ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div style={{ padding: "1rem", borderRadius: "var(--att-radius-md)", background: "var(--att-success-light)", border: "1px solid var(--att-success-border)", display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                        <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "var(--att-radius-sm)", background: "rgba(79, 122, 90, 0.2)", color: "var(--att-success-text)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.15rem" }}>
                          <ShieldCheck style={{ width: "1.25rem", height: "1.25rem" }} />
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <h4 style={{ fontSize: "0.875rem", fontWeight: 900, color: "var(--att-text-main)", margin: 0 }}>
                              Safe Bunk Buffer: Up to {safeBunks} class{safeBunks !== 1 ? "es" : ""}
                            </h4>
                            <span style={{ padding: "0.1rem 0.5rem", fontSize: "10px", fontWeight: 700, borderRadius: "9999px", background: "rgba(79, 122, 90, 0.2)", color: "var(--att-success-text)" }}>
                              Zero Risk
                            </span>
                          </div>
                          <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", marginTop: "0.25rem", lineHeight: 1.5, margin: "0.25rem 0 0 0" }}>
                            {safeBunks > 0
                              ? `You can safely miss ${safeBunks} consecutive class${safeBunks > 1 ? "es" : ""} in ${enrolledCourseName} and your attendance will not fall below ${target}%.`
                              : `You are exactly at your minimum ${target}% threshold! Do not bunk any classes right now.`}
                          </p>
                        </div>
                      </div>

                      {safeBunks > 0 && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.75rem" }}>
                          <div style={{ padding: "0.75rem", background: "var(--att-surface)", borderRadius: "var(--att-radius-sm)", border: "1px solid var(--att-border)" }}>
                            <span style={{ color: "var(--att-text-muted)", display: "block", fontWeight: 500 }}>After 1 Bunk:</span>
                            <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--att-text-main)" }}>
                              {(((attendedNum) / (totalNum + 1)) * 100).toFixed(1)}%
                            </span>
                            <span style={{ fontSize: "10px", color: "var(--att-success)", display: "block", fontWeight: 700 }}>Still Safe</span>
                          </div>
                          <div style={{ padding: "0.75rem", background: "var(--att-surface)", borderRadius: "var(--att-radius-sm)", border: "1px solid var(--att-border)" }}>
                            <span style={{ color: "var(--att-text-muted)", display: "block", fontWeight: 500 }}>After {safeBunks} Bunks:</span>
                            <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--att-text-main)" }}>
                              {(((attendedNum) / (totalNum + safeBunks)) * 100).toFixed(1)}%
                            </span>
                            <span style={{ fontSize: "10px", color: "var(--att-accent)", display: "block", fontWeight: 700 }}>Borderline Minimum</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div style={{ padding: "1rem", borderRadius: "var(--att-radius-md)", background: "var(--att-danger-light)", border: "1px solid var(--att-danger-border)", display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                        <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "var(--att-radius-sm)", background: "rgba(166, 61, 64, 0.2)", color: "var(--att-danger-text)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.15rem" }}>
                          <AlertTriangle style={{ width: "1.25rem", height: "1.25rem" }} />
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <h4 style={{ fontSize: "0.875rem", fontWeight: 900, color: "var(--att-text-main)", margin: 0 }}>
                              Must Attend Next {classesNeeded} Consecutive Class{classesNeeded !== 1 ? "es" : ""}
                            </h4>
                            <span style={{ padding: "0.1rem 0.5rem", fontSize: "10px", fontWeight: 700, borderRadius: "9999px", background: "rgba(166, 61, 64, 0.2)", color: "var(--att-danger-text)" }}>
                              Required
                            </span>
                          </div>
                          <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", marginTop: "0.25rem", lineHeight: 1.5, margin: "0.25rem 0 0 0" }}>
                            You must attend {classesNeeded} consecutive class${classesNeeded > 1 ? "es" : ""} without missing any to restore your standing in {enrolledCourseName} back to {target}%.
                          </p>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.75rem" }}>
                        <div style={{ padding: "0.75rem", background: "var(--att-surface)", borderRadius: "var(--att-radius-sm)", border: "1px solid var(--att-border)" }}>
                          <span style={{ color: "var(--att-text-muted)", display: "block", fontWeight: 500 }}>If you miss 1 more:</span>
                          <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--att-danger)" }}>
                            {(((attendedNum) / (totalNum + 1)) * 100).toFixed(1)}%
                          </span>
                          <span style={{ fontSize: "10px", color: "var(--att-danger)", display: "block", fontWeight: 700 }}>Drops deeper</span>
                        </div>
                        <div style={{ padding: "0.75rem", background: "var(--att-surface)", borderRadius: "var(--att-radius-sm)", border: "1px solid var(--att-border)" }}>
                          <span style={{ color: "var(--att-text-muted)", display: "block", fontWeight: 500 }}>After attending {classesNeeded}:</span>
                          <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--att-success)" }}>
                            {(((attendedNum + classesNeeded) / (totalNum + classesNeeded)) * 100).toFixed(1)}%
                          </span>
                          <span style={{ fontSize: "10px", color: "var(--att-success)", display: "block", fontWeight: 700 }}>Clears target!</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--att-border)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--att-text-muted)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                    <Info style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-accent)" }} />
                    University criteria: 75% required for end-semester registration
                  </span>
                  <span style={{ fontWeight: 700, color: "var(--att-text-main)" }}>
                    Formula: (A + x) / (T + x) ≥ {target}%
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Interactive Sandbox: What-If Attendance Simulator */}
            <div className="att-header-hero" style={{ padding: "1.75rem", color: "#FFFDF8" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <div style={{ width: "2rem", height: "2rem", borderRadius: "var(--att-radius-sm)", background: "rgba(255,255,255,0.1)", color: "var(--att-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Sliders style={{ width: "1rem", height: "1rem" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFDF8", margin: 0 }}>
                      Interactive What-If Attendance Simulator
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "var(--att-accent-light)", margin: "0.2rem 0 0 0" }}>
                      Simulate hypothetical future classes and see your projected attendance in real-time.
                    </p>
                  </div>
                </div>

                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.75rem", borderRadius: "var(--att-radius-md)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.75rem", fontWeight: 700, color: "#FFFDF8" }}>
                  <Sparkles style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-accent)" }} />
                  Live Projection
                </div>
              </div>

              {/* Sliders Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", paddingTop: "1.25rem" }}>
                {/* Upcoming classes slider */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                    <span style={{ color: "var(--att-accent-light)" }}>Number of Upcoming Classes:</span>
                    <span style={{ color: "#ffffff", padding: "0.1rem 0.5rem", borderRadius: "4px", background: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
                      {simN} classes
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={simN}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setSimulateNext(val);
                      if (simulateAttendCount > val) setSimulateAttendCount(val);
                    }}
                    style={{ width: "100%", accentColor: "var(--att-accent)", cursor: "pointer", height: "0.5rem" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--att-accent-light)", opacity: 0.7, fontWeight: 500, marginTop: "0.25rem" }}>
                    <span>1 class</span>
                    <span>15 classes</span>
                    <span>30 classes</span>
                  </div>
                </div>

                {/* Planned attendance slider */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                    <span style={{ color: "var(--att-accent-light)" }}>Classes you plan to attend:</span>
                    <span style={{ color: "var(--att-accent-light)", padding: "0.1rem 0.5rem", borderRadius: "4px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
                      {simAtt} of {simN} ({simN > 0 ? Math.round((simAtt / simN) * 100) : 0}%)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={simN}
                    value={simAtt}
                    onChange={(e) => setSimulateAttendCount(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--att-accent)", cursor: "pointer", height: "0.5rem" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--att-accent-light)", opacity: 0.7, fontWeight: 500, marginTop: "0.25rem" }}>
                    <span>0 (Miss all)</span>
                    <span>{Math.round(simN / 2)} (Attend half)</span>
                    <span>{simN} (Attend all)</span>
                  </div>
                </div>
              </div>

              {/* Simulation Result Stat Matrix */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
                
                {/* Result under your plan */}
                <div style={{ padding: "1rem", borderRadius: "var(--att-radius-md)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-accent-light)", display: "block" }}>
                      Under Your Plan
                    </span>
                    <div style={{ marginTop: "0.25rem", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1.875rem", fontWeight: 900, color: "#ffffff" }}>
                        {simulatedPct.toFixed(1)}%
                      </span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: simDelta >= 0 ? "var(--att-success)" : "var(--att-danger)" }}>
                        {simDelta >= 0 ? "+" : ""}{simDelta.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: "0.75rem", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem" }}>
                    <span style={{ color: "var(--att-accent-light)", opacity: 0.8 }}>
                      {simulatedAttended}/{simulatedTotal} total
                    </span>
                    <span style={{
                      padding: "0.1rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: 700,
                      background: simulatedPct >= target ? "rgba(79, 122, 90, 0.3)" : "rgba(166, 61, 64, 0.3)",
                      color: "#FFFDF8",
                      border: `1px solid ${simulatedPct >= target ? "rgba(79, 122, 90, 0.5)" : "rgba(166, 61, 64, 0.5)"}`
                    }}>
                      {simulatedPct >= target ? "Safe" : "Shortage"}
                    </span>
                  </div>
                </div>

                {/* Best Case (100% of upcoming) */}
                <div style={{ padding: "1rem", borderRadius: "var(--att-radius-md)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-accent)", display: "block" }}>
                      Best Case (Attend all {simN})
                    </span>
                    <div style={{ marginTop: "0.25rem", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1.875rem", fontWeight: 900, color: "#ffffff" }}>
                        {bestPct.toFixed(1)}%
                      </span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-success)" }}>
                        +{(bestPct - currentPercentage).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: "0.75rem", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "0.75rem", color: "var(--att-accent-light)", opacity: 0.8 }}>
                    Max achievable with next {simN} classes
                  </div>
                </div>

                {/* Worst Case (0% of upcoming) */}
                <div style={{ padding: "1rem", borderRadius: "var(--att-radius-md)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-danger)", display: "block" }}>
                      Worst Case (Miss all {simN})
                    </span>
                    <div style={{ marginTop: "0.25rem", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1.875rem", fontWeight: 900, color: "var(--att-danger)" }}>
                        {worstPct.toFixed(1)}%
                      </span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-danger)" }}>
                        -{(currentPercentage - worstPct).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: "0.75rem", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "0.75rem", color: "var(--att-accent-light)", opacity: 0.8 }}>
                    Outcome if all upcoming classes are skipped
                  </div>
                </div>

              </div>

            </div>

          </div>
        ) : (
          <div style={{ marginTop: "1.5rem", padding: "1.5rem", borderRadius: "var(--att-radius-md)", background: "var(--att-primary-light)", border: "1px solid var(--att-border)", textAlign: "center" }}>
            <AlertTriangle style={{ width: "2rem", height: "2rem", color: "var(--att-danger)", margin: "0 auto 0.5rem auto" }} />
            <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--att-text-main)", margin: 0 }}>
              Please enter valid attendance numbers
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", marginTop: "0.25rem", margin: "0.25rem 0 0 0" }}>
              Classes attended cannot exceed total classes conducted, and total classes must be greater than zero.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default AttendanceCalculator;