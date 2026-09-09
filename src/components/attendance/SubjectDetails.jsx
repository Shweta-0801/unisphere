import { useState } from "react";
import {
  User,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Edit2,
  Clock,
  Plus
} from "lucide-react";

function SubjectDetails({
  subjects,
  initialSubjectId = null,
  targetPercentage = 75,
  onEditSubject,
  onQuickLog
}) {
  const [selectedSubjectId, setSelectedSubjectId] = useState(() => {
    return initialSubjectId || (subjects.length > 0 ? subjects[0].id : "");
  });

  const subject = subjects.find((item) => item.id === Number(selectedSubjectId)) || subjects[0];

  if (!subject) {
    return (
      <div className="att-calc-box" style={{ textAlign: "center", padding: "3rem", color: "var(--att-text-muted)" }}>
        No subjects available. Add a subject first to view details.
      </div>
    );
  }

  const attended = subject.attended || 0;
  const total = subject.total || 0;
  const missed = Math.max(0, total - attended);
  const percentage = total > 0 ? Math.round((attended / total) * 1000) / 10 : 0;
  const isSafe = percentage >= targetPercentage;

  // Safe bunks or needed calculation
  let statusMessage;
  if (total === 0) {
    statusMessage = "No classes recorded yet for this course.";
  } else if (isSafe) {
    const maxTotal = Math.floor(attended / (targetPercentage / 100));
    const safeBunks = Math.max(0, maxTotal - total);
    statusMessage = safeBunks > 0
      ? `You can safely miss up to ${safeBunks} class${safeBunks > 1 ? "es" : ""} while keeping your attendance above ${targetPercentage}%.`
      : `You are exactly at ${percentage}%. Do not miss any further classes to stay safe.`;
  } else {
    const diff = targetPercentage * total - 100 * attended;
    const needed = Math.max(1, Math.ceil(diff / (100 - targetPercentage)));
    statusMessage = `You must attend the next ${needed} consecutive class${needed > 1 ? "es" : ""} to reach ${targetPercentage}%.`;
  }

  // Sample mock history logs for this subject
  const logs = [
    { id: 1, date: "2026-03-08", status: "present", note: "Regular Lecture • Chapter 5" },
    { id: 2, date: "2026-03-05", status: "present", note: "Practical Lab Session" },
    { id: 3, date: "2026-03-03", status: "absent", note: "Medical Leave" },
    { id: 4, date: "2026-03-01", status: "present", note: "Unit Test & Evaluation" },
    { id: 5, date: "2026-02-26", status: "present", note: "Guest Workshop" }
  ];

  return (
    <div className="att-overall-wrapper">
      {/* Subject Selector Bar */}
      <div style={{
        background: "var(--att-surface)",
        borderRadius: "var(--att-radius-xl)",
        padding: "0.85rem",
        boxShadow: "var(--att-shadow-xs)",
        border: "1px solid var(--att-border)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflowX: "auto" }} className="att-nav-track">
          {subjects.map((sub) => {
            const isSelected = sub.id === subject.id;
            const subPct = sub.total > 0 ? Math.round((sub.attended / sub.total) * 100) : 0;

            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1.15rem",
                  borderRadius: "var(--att-radius-md)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  border: "none",
                  cursor: "pointer",
                  transition: "var(--att-transition)",
                  background: isSelected ? "var(--att-text-main)" : "var(--att-surface-alt)",
                  color: isSelected ? "#ffffff" : "var(--att-text-muted)"
                }}
              >
                <span>{sub.name}</span>
                <span
                  style={{
                    fontSize: "0.625rem",
                    padding: "0.15rem 0.45rem",
                    borderRadius: "4px",
                    background: subPct >= targetPercentage ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                    color: subPct >= targetPercentage ? "#34d399" : "#f87171"
                  }}
                >
                  {subPct}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Subject Detail Card */}
      <div className="att-calc-box">
        {/* Course Header */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid var(--att-border-subtle)"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className={`att-code-tag ${subject.color || "blue"}`}>
                {subject.code || "CS-301"}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--att-text-subtle)", fontWeight: 600 }}>
                3 Credit Hours
              </span>
            </div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: "0.4rem 0 0 0", color: "var(--att-text-main)" }}>
              {subject.name}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--att-text-muted)", marginTop: "0.35rem" }}>
              <User style={{ width: "0.875rem", height: "0.875rem" }} />
              <span>Instructor: <strong>{subject.faculty || "Prof. Department Lead"}</strong></span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <button
              onClick={() => onEditSubject && onEditSubject(subject)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.6rem 1rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--att-text-main)",
                background: "var(--att-surface-alt)",
                border: "1px solid var(--att-border)",
                borderRadius: "var(--att-radius-sm)",
                cursor: "pointer"
              }}
            >
              <Edit2 style={{ width: "0.875rem", height: "0.875rem" }} />
              <span>Edit Course</span>
            </button>

            <button
              onClick={() => onQuickLog && onQuickLog(subject.id, "present")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.6rem 1.15rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#ffffff",
                background: "var(--att-success)",
                border: "none",
                borderRadius: "var(--att-radius-sm)",
                boxShadow: "0 4px 10px rgba(16, 185, 129, 0.25)",
                cursor: "pointer"
              }}
            >
              <Plus style={{ width: "0.875rem", height: "0.875rem" }} />
              <span>+ Present</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem"
        }}>
          <div style={{ background: "var(--att-surface-subtle)", padding: "1rem", borderRadius: "var(--att-radius-md)", border: "1px solid var(--att-border)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", fontWeight: 600, display: "block" }}>Attendance Score</span>
            <span style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--att-text-main)", marginTop: "0.25rem", display: "block" }}>
              {percentage}%
            </span>
            <span style={{ fontSize: "0.6875rem", color: "var(--att-text-subtle)", marginTop: "0.2rem", display: "block" }}>
              Goal: {targetPercentage}%
            </span>
          </div>

          <div style={{ background: "var(--att-success-light)", padding: "1rem", borderRadius: "var(--att-radius-md)", border: "1px solid var(--att-success-border)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--att-success-text)", fontWeight: 600, display: "block" }}>Attended Classes</span>
            <span style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--att-success-text)", marginTop: "0.25rem", display: "block" }}>
              {attended}
            </span>
            <span style={{ fontSize: "0.6875rem", color: "var(--att-success)", marginTop: "0.2rem", display: "block" }}>
              Classes Present
            </span>
          </div>

          <div style={{ background: "var(--att-danger-light)", padding: "1rem", borderRadius: "var(--att-radius-md)", border: "1px solid var(--att-danger-border)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--att-danger-text)", fontWeight: 600, display: "block" }}>Missed Classes</span>
            <span style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--att-danger-text)", marginTop: "0.25rem", display: "block" }}>
              {missed}
            </span>
            <span style={{ fontSize: "0.6875rem", color: "var(--att-danger)", marginTop: "0.2rem", display: "block" }}>
              Absences
            </span>
          </div>

          <div style={{ background: "var(--att-primary-light)", padding: "1rem", borderRadius: "var(--att-radius-md)", border: "1px solid var(--att-primary-border)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--att-primary)", fontWeight: 600, display: "block" }}>Total Classes</span>
            <span style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--att-primary)", marginTop: "0.25rem", display: "block" }}>
              {total}
            </span>
            <span style={{ fontSize: "0.6875rem", color: "var(--att-primary)", marginTop: "0.2rem", display: "block" }}>
              Conducted
            </span>
          </div>
        </div>

        {/* Advisor & Exam Eligibility Bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem"
        }}>
          {/* Status Message */}
          <div className={`att-advisor-banner ${isSafe ? "safe" : "danger"}`}>
            <div className="att-advisor-icon">
              {isSafe ? (
                <ShieldCheck style={{ width: "1.25rem", height: "1.25rem" }} />
              ) : (
                <AlertCircle style={{ width: "1.25rem", height: "1.25rem" }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div className="att-advisor-title">
                {isSafe ? "Course Standing: Safe" : "Course Standing: Risk"}
              </div>
              <p className="att-advisor-text">
                {statusMessage}
              </p>
            </div>
          </div>

          {/* Exam Clearance Checklist */}
          <div style={{
            padding: "1rem 1.25rem",
            borderRadius: "var(--att-radius-lg)",
            background: "var(--att-surface-subtle)",
            border: "1px solid var(--att-border)"
          }}>
            <h4 style={{ fontSize: "0.6875rem", fontWeight: 800, textTransform: "uppercase", color: "var(--att-text-muted)", margin: "0 0 0.65rem 0" }}>
              Semester Clearance Checklist
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                {isSafe ? (
                  <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem", color: "var(--att-success)" }} />
                ) : (
                  <XCircle style={{ width: "0.85rem", height: "0.85rem", color: "var(--att-danger)" }} />
                )}
                <span style={{ fontWeight: 600 }}>Min {targetPercentage}% Attendance</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem", color: "var(--att-success)" }} />
                <span style={{ fontWeight: 600 }}>Practical Lab Work</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem", color: "var(--att-success)" }} />
                <span style={{ fontWeight: 600 }}>Assignments Cleared</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem", color: "var(--att-success)" }} />
                <span style={{ fontWeight: 600 }}>Mid-Term Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* History / Log Table */}
        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--att-border-subtle)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock style={{ width: "1rem", height: "1rem", color: "var(--att-text-muted)" }} />
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, margin: 0, color: "var(--att-text-main)" }}>
                Recent Class Sessions for {subject.name}
              </h3>
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--att-text-subtle)" }}>Latest 5 records</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", textAlign: "left", fontSize: "0.75rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--att-border)", color: "var(--att-text-subtle)", fontWeight: 700, textTransform: "uppercase" }}>
                  <th style={{ padding: "0.6rem 0.5rem" }}>Date</th>
                  <th style={{ padding: "0.6rem 0.5rem" }}>Status</th>
                  <th style={{ padding: "0.6rem 0.5rem" }}>Session Notes</th>
                  <th style={{ padding: "0.6rem 0.5rem", textAlign: "right" }}>Verification</th>
                </tr>
              </thead>
              <tbody style={{ color: "var(--att-text-main)", fontWeight: 600 }}>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: "1px solid var(--att-border-subtle)" }}>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{log.date}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <span className={`att-pill-badge ${log.status === "present" ? "safe" : "danger"}`}>
                        {log.status === "present" ? "Present" : "Absent"}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem", color: "var(--att-text-muted)" }}>{log.note}</td>
                    <td style={{ padding: "0.75rem 0.5rem", textAlign: "right", color: "var(--att-success)", fontWeight: 700 }}>
                      Faculty Verified ✓
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SubjectDetails;