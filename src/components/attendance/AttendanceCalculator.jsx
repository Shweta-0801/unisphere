import { useState } from "react";
import {
  Calculator,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Sliders
} from "lucide-react";

function AttendanceCalculator({ subjects = [] }) {
  const [mode, setMode] = useState("subject"); // 'subject' | 'custom'
  const [selectedSubjectId, setSelectedSubjectId] = useState(() => {
    return subjects.length > 0 ? subjects[0].id : "";
  });
  const [customAttended, setCustomAttended] = useState("18");
  const [customTotal, setCustomTotal] = useState("24");
  const [targetPercentage, setTargetPercentage] = useState("75");

  // Simulation slider: test what happens if student attends next N classes
  const [simulateNext, setSimulateNext] = useState(5);

  const selectedSub = subjects.find((s) => s.id === Number(selectedSubjectId)) || subjects[0];

  const attendedNum = mode === "subject" ? (selectedSub?.attended || 0) : (Number(customAttended) || 0);
  const totalNum = mode === "subject" ? (selectedSub?.total || 0) : (Number(customTotal) || 0);
  const target = Number(targetPercentage) || 75;

  const isValid = totalNum > 0 && attendedNum >= 0 && attendedNum <= totalNum;
  const currentPercentage = isValid ? (attendedNum / totalNum) * 100 : 0;
  const isAboveTarget = currentPercentage >= target;

  // Catch-up classes needed
  let classesNeeded = 0;
  if (isValid && !isAboveTarget) {
    const diff = target * totalNum - 100 * attendedNum;
    classesNeeded = Math.max(1, Math.ceil(diff / (100 - target)));
  }

  // Safe bunks allowed
  let safeBunks = 0;
  if (isValid && isAboveTarget) {
    const maxTotalClasses = Math.floor(attendedNum / (target / 100));
    safeBunks = Math.max(0, maxTotalClasses - totalNum);
  }

  // Simulation result: Attending next `simulateNext` classes
  const simulatedAttended = attendedNum + simulateNext;
  const simulatedTotal = totalNum + simulateNext;
  const simulatedPct = simulatedTotal > 0 ? ((simulatedAttended / simulatedTotal) * 100).toFixed(1) : 0;

  // Simulation result: Missing next `simulateNext` classes
  const simulatedMissedPct = (totalNum + simulateNext) > 0 ? ((attendedNum / (totalNum + simulateNext)) * 100).toFixed(1) : 0;

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
                background: "var(--att-primary-light)",
                color: "var(--att-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Calculator style={{ width: "1rem", height: "1rem" }} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "var(--att-text-main)" }}>
                Smart Attendance & Bunk Calculator
              </h2>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", margin: "0.25rem 0 0 0" }}>
              Find out exactly how many classes you must attend or can safely skip.
            </p>
          </div>

          {/* Mode Switcher */}
          <div style={{ display: "flex", background: "var(--att-surface-alt)", padding: "0.25rem", borderRadius: "var(--att-radius-md)", gap: "0.25rem" }}>
            <button
              onClick={() => setMode("subject")}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "var(--att-radius-sm)",
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                background: mode === "subject" ? "#ffffff" : "transparent",
                color: mode === "subject" ? "var(--att-primary)" : "var(--att-text-muted)",
                boxShadow: mode === "subject" ? "var(--att-shadow-xs)" : "none"
              }}
            >
              Enrolled Course
            </button>
            <button
              onClick={() => setMode("custom")}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "var(--att-radius-sm)",
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                background: mode === "custom" ? "#ffffff" : "transparent",
                color: mode === "custom" ? "var(--att-primary)" : "var(--att-text-muted)",
                boxShadow: mode === "custom" ? "var(--att-shadow-xs)" : "none"
              }}
            >
              Custom Values
            </button>
          </div>
        </div>

        {/* Inputs row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
          paddingTop: "1.25rem"
        }}>
          {mode === "subject" ? (
            <div>
              <label className="att-input-label">
                Select Enrolled Subject
              </label>
              <select
                value={selectedSubjectId || (selectedSub?.id || "")}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="att-form-control"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} ({sub.attended}/{sub.total})
                  </option>
                ))}
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
              style={{ background: mode === "subject" ? "var(--att-surface-alt)" : undefined }}
            />
          </div>

          <div>
            <label className="att-input-label">
              Target Attendance Goal
            </label>
            <div className="att-target-pills-row">
              {["70", "75", "80", "85"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTargetPercentage(p)}
                  className={`att-target-pill-btn ${targetPercentage === p ? "active" : ""}`}
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Calculation Results */}
        {isValid && (
          <div style={{ marginTop: "1.75rem", paddingTop: "1.5rem", borderTop: "1px solid var(--att-border-subtle)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              
              {/* Status Outcome Card */}
              <div style={{
                padding: "1.5rem",
                borderRadius: "var(--att-radius-lg)",
                background: isAboveTarget ? "var(--att-success-light)" : "var(--att-danger-light)",
                border: isAboveTarget ? "1px solid var(--att-success-border)" : "1px solid var(--att-danger-border)",
                color: isAboveTarget ? "var(--att-success-text)" : "var(--att-danger-text)"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.6875rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Current Performance
                  </span>
                  <span className={`att-pill-badge ${isAboveTarget ? "safe" : "danger"}`}>
                    {isAboveTarget ? "Target Satisfied" : "Shortage Warning"}
                  </span>
                </div>

                <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                  <span style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
                    {currentPercentage.toFixed(1)}%
                  </span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8, fontWeight: 600 }}>
                    ({attendedNum} attended / {totalNum} total)
                  </span>
                </div>

                <div style={{
                  marginTop: "1.25rem",
                  padding: "1rem",
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(6px)",
                  borderRadius: "var(--att-radius-md)",
                  border: "1px solid rgba(255, 255, 255, 0.6)"
                }}>
                  {isAboveTarget ? (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <ShieldCheck style={{ width: "1.25rem", height: "1.25rem", color: "var(--att-success)", flexShrink: 0, marginTop: "0.15rem" }} />
                      <div>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: 800, margin: 0, color: "var(--att-text-main)" }}>
                          Safe Bunks: Up to {safeBunks} class{safeBunks !== 1 ? "es" : ""}
                        </h4>
                        <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", margin: "0.35rem 0 0 0", lineHeight: 1.45 }}>
                          {safeBunks > 0
                            ? `You can safely miss ${safeBunks} consecutive class${safeBunks > 1 ? "es" : ""} and your attendance will still remain at or above ${target}%.`
                            : `You are exactly at target! Attending all upcoming classes is strongly advised.`}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <AlertTriangle style={{ width: "1.25rem", height: "1.25rem", color: "var(--att-danger)", flexShrink: 0, marginTop: "0.15rem" }} />
                      <div>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: 800, margin: 0, color: "var(--att-danger-text)" }}>
                          Must Attend Next {classesNeeded} Class{classesNeeded !== 1 ? "es" : ""}
                        </h4>
                        <p style={{ fontSize: "0.75rem", color: "var(--att-danger-text)", margin: "0.35rem 0 0 0", lineHeight: 1.45 }}>
                          You need to attend {classesNeeded} consecutive class{classesNeeded > 1 ? "es" : ""} without missing any to restore your attendance to {target}%.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Simulation Sandbox */}
              <div style={{
                background: "var(--att-surface-subtle)",
                borderRadius: "var(--att-radius-lg)",
                padding: "1.5rem",
                border: "1px solid var(--att-border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                    <Sliders style={{ width: "1rem", height: "1rem", color: "var(--att-primary)" }} />
                    <h3 style={{ fontSize: "0.875rem", fontWeight: 800, margin: 0, color: "var(--att-text-main)" }}>
                      Attendance Simulation Sandbox
                    </h3>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", margin: 0 }}>
                    See what happens to your percentage under hypothetical scenarios:
                  </p>

                  <div style={{ marginTop: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                      <span style={{ color: "var(--att-text-muted)" }}>Upcoming classes in simulation:</span>
                      <span style={{ color: "var(--att-primary)" }}>{simulateNext} classes</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={simulateNext}
                      onChange={(e) => setSimulateNext(Number(e.target.value))}
                      style={{ width: "100%", cursor: "pointer", accentColor: "var(--att-primary)" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "1.25rem" }}>
                    <div style={{ background: "#ffffff", padding: "0.85rem", borderRadius: "var(--att-radius-sm)", border: "1px solid var(--att-border)" }}>
                      <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--att-success)", display: "block" }}>
                        If you attend all {simulateNext}:
                      </span>
                      <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--att-success)", margin: "0.2rem 0", display: "block" }}>
                        {simulatedPct}%
                      </span>
                      <span style={{ fontSize: "0.6875rem", color: "var(--att-text-subtle)" }}>
                        {attendedNum + simulateNext}/{totalNum + simulateNext} classes
                      </span>
                    </div>

                    <div style={{ background: "#ffffff", padding: "0.85rem", borderRadius: "var(--att-radius-sm)", border: "1px solid var(--att-border)" }}>
                      <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--att-danger)", display: "block" }}>
                        If you miss all {simulateNext}:
                      </span>
                      <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--att-danger)", margin: "0.2rem 0", display: "block" }}>
                        {simulatedMissedPct}%
                      </span>
                      <span style={{ fontSize: "0.6875rem", color: "var(--att-text-subtle)" }}>
                        {attendedNum}/{totalNum + simulateNext} classes
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: "1rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--att-border)",
                  fontSize: "0.6875rem",
                  color: "var(--att-text-subtle)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}>
                  <Sparkles style={{ width: "0.875rem", height: "0.875rem", color: "#f59e0b" }} />
                  <span>Real-time math modeled on university attendance criteria.</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttendanceCalculator;