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
import "./Attendance.css";

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
      <div className="att-gauge-card" style={{ padding: "3rem", textAlign: "center", color: "var(--att-text-muted)" }}>
        No courses available. Please add a course first.
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Subject Horizontal Selector Tabs */}
      <div className="att-nav-bar">
        <div className="att-nav-track">
          {subjects.map((sub) => {
            const isSelected = sub.id === subject.id;
            const subPct = sub.total > 0 ? Math.round((sub.attended / sub.total) * 100) : 0;
            const subSafe = subPct >= targetPercentage;

            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                className={`att-nav-btn ${isSelected ? "active" : ""}`}
                style={{ gap: "0.65rem" }}
              >
                <span>{sub.name}</span>
                <span
                  style={{
                    padding: "0.15rem 0.45rem",
                    fontSize: "10px",
                    fontWeight: 900,
                    borderRadius: "4px",
                    background: isSelected
                      ? "rgba(255, 255, 255, 0.2)"
                      : subSafe
                      ? "var(--att-success-light)"
                      : "var(--att-danger-light)",
                    color: isSelected
                      ? "#ffffff"
                      : subSafe
                      ? "var(--att-success-text)"
                      : "var(--att-danger-text)"
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
      <div className="att-gauge-card" style={{ padding: "1.75rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Course Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--att-border)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="att-code-tag blue" style={{ fontSize: "11px", fontWeight: 900 }}>
                {subject.code || "CS-301"}
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--att-text-muted)" }}>
                4 Credit Hours • Semester 4
              </span>
            </div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--att-text-main)", marginTop: "0.25rem", margin: "0.25rem 0 0 0", letterSpacing: "-0.02em" }}>
              {subject.name}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--att-text-muted)", marginTop: "0.25rem" }}>
              <User style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-accent)" }} />
              <span>Lead Faculty: <strong style={{ color: "var(--att-text-main)" }}>{subject.faculty || "Course Faculty"}</strong></span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <button
              onClick={() => onEditSubject && onEditSubject(subject)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.5rem 0.85rem",
                borderRadius: "var(--att-radius-sm)",
                background: "var(--att-bg)",
                color: "var(--att-text-main)",
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "1px solid var(--att-border)",
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
                gap: "0.35rem",
                padding: "0.5rem 1rem",
                borderRadius: "var(--att-radius-sm)",
                background: "var(--att-primary)",
                color: "#ffffff",
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                boxShadow: "var(--att-shadow-xs)"
              }}
            >
              <Plus style={{ width: "0.875rem", height: "0.875rem", strokeWidth: 2.5 }} />
              <span>+ Log Present</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
          <div style={{ padding: "1rem", borderRadius: "var(--att-radius-md)", background: "var(--att-bg)", border: "1px solid var(--att-border)" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-text-muted)", display: "block" }}>Attendance Rate</span>
            <span style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--att-text-main)", display: "block", marginTop: "0.25rem" }}>
              {percentage}%
            </span>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--att-text-muted)", display: "block", marginTop: "0.25rem" }}>Goal: {targetPercentage}%</span>
          </div>

          <div style={{ padding: "1rem", borderRadius: "var(--att-radius-md)", background: "var(--att-success-light)", border: "1px solid var(--att-success-border)" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-success-text)", display: "block" }}>Attended Sessions</span>
            <span style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--att-success-text)", display: "block", marginTop: "0.25rem" }}>
              {attended}
            </span>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--att-success-text)", display: "block", marginTop: "0.25rem" }}>Present</span>
          </div>

          <div style={{ padding: "1rem", borderRadius: "var(--att-radius-md)", background: "var(--att-danger-light)", border: "1px solid var(--att-danger-border)" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-danger-text)", display: "block" }}>Missed Sessions</span>
            <span style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--att-danger-text)", display: "block", marginTop: "0.25rem" }}>
              {missed}
            </span>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--att-danger-text)", display: "block", marginTop: "0.25rem" }}>Absences</span>
          </div>

          <div style={{ padding: "1rem", borderRadius: "var(--att-radius-md)", background: "var(--att-primary-light)", border: "1px solid var(--att-border)" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-primary)", display: "block" }}>Total Conducted</span>
            <span style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--att-primary)", display: "block", marginTop: "0.25rem" }}>
              {total}
            </span>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--att-primary)", display: "block", marginTop: "0.25rem" }}>Delivered</span>
          </div>
        </div>

        {/* Advisor & Exam Eligibility Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          <div style={{
            padding: "1rem 1.25rem",
            borderRadius: "var(--att-radius-md)",
            border: "1px solid",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.85rem",
            background: isSafe ? "var(--att-success-light)" : "var(--att-danger-light)",
            borderColor: isSafe ? "var(--att-success-border)" : "var(--att-danger-border)"
          }}>
            <div style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "var(--att-radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: "0.15rem",
              background: isSafe ? "rgba(79, 122, 90, 0.2)" : "rgba(166, 61, 64, 0.2)",
              color: isSafe ? "var(--att-success-text)" : "var(--att-danger-text)"
            }}>
              {isSafe ? <ShieldCheck style={{ width: "1.25rem", height: "1.25rem" }} /> : <AlertCircle style={{ width: "1.25rem", height: "1.25rem" }} />}
            </div>
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-text-main)", margin: 0 }}>
                {isSafe ? "Course Standing: Safe Clearance" : "Course Standing: Shortage Alert"}
              </h4>
              <p style={{ fontSize: "0.75rem", marginTop: "0.25rem", lineHeight: 1.5, color: "var(--att-text-muted)", margin: "0.25rem 0 0 0" }}>
                {statusMessage}
              </p>
            </div>
          </div>

          {/* Exam Clearance Checklist */}
          <div style={{ padding: "1rem 1.25rem", borderRadius: "var(--att-radius-md)", background: "var(--att-bg)", border: "1px solid var(--att-border)" }}>
            <h4 style={{ fontSize: "11px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-text-muted)", marginBottom: "0.75rem", margin: "0 0 0.75rem 0" }}>
              Semester Clearance Checklist
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {isSafe ? (
                  <CheckCircle2 style={{ width: "1rem", height: "1rem", color: "var(--att-success)", flexShrink: 0 }} />
                ) : (
                  <XCircle style={{ width: "1rem", height: "1rem", color: "var(--att-danger)", flexShrink: 0 }} />
                )}
                <span style={{ fontWeight: 600, color: "var(--att-text-main)" }}>Min {targetPercentage}% Attendance</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 style={{ width: "1rem", height: "1rem", color: "var(--att-success)", flexShrink: 0 }} />
                <span style={{ fontWeight: 600, color: "var(--att-text-main)" }}>Lab Experiments</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 style={{ width: "1rem", height: "1rem", color: "var(--att-success)", flexShrink: 0 }} />
                <span style={{ fontWeight: 600, color: "var(--att-text-main)" }}>Internal Submissions</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 style={{ width: "1rem", height: "1rem", color: "var(--att-success)", flexShrink: 0 }} />
                <span style={{ fontWeight: 600, color: "var(--att-text-main)" }}>Mid-Term Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* History / Log Table */}
        <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--att-border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock style={{ width: "1rem", height: "1rem", color: "var(--att-accent)" }} />
              <h3 style={{ fontSize: "0.875rem", fontWeight: 900, color: "var(--att-text-main)", margin: 0 }}>
                Recent Class Sessions for {subject.name}
              </h3>
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--att-text-muted)" }}>Latest 5 records</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", textAlign: "left", fontSize: "0.75rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--att-border)", color: "var(--att-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, fontSize: "10px" }}>
                  <th style={{ padding: "0.65rem 0.75rem" }}>Date</th>
                  <th style={{ padding: "0.65rem 0.75rem" }}>Status</th>
                  <th style={{ padding: "0.65rem 0.75rem" }}>Session Notes</th>
                  <th style={{ padding: "0.65rem 0.75rem", textAlign: "right" }}>Faculty Verification</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: "1px solid var(--att-border-subtle)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 600, color: "var(--att-text-main)" }}>{log.date}</td>
                    <td style={{ padding: "0.75rem" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "9999px",
                        fontSize: "10px",
                        fontWeight: 900,
                        background: log.status === "present" ? "var(--att-success-light)" : "var(--att-danger-light)",
                        color: log.status === "present" ? "var(--att-success-text)" : "var(--att-danger-text)"
                      }}>
                        {log.status === "present" ? "Present" : "Absent"}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem", color: "var(--att-text-muted)" }}>{log.note}</td>
                    <td style={{ padding: "0.75rem", textAlign: "right", color: "var(--att-success)", fontWeight: 700 }}>
                      Verified ✓
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