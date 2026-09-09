import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  CheckCheck,
  RotateCcw
} from "lucide-react";
import { loadFromStorage, saveToStorage } from "../../utils/storage";

function RecordAttendance({ subjects, setSubjects }) {
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  // State mapping: { subjectId: 'present' | 'absent' | 'no_class' }
  const [markedStatus, setMarkedStatus] = useState(() => {
    const initial = {};
    subjects.forEach((s) => {
      initial[s.id] = "present"; // default to present for convenience
    });
    return initial;
  });

  const [message, setMessage] = useState(null);

  // Attendance history logs stored in localStorage
  const [logs, setLogs] = useState(() => {
    return loadFromStorage("attendanceLogsHistory", [
      { id: 1, date: "2026-03-08", subjectName: "Data Structures & Algorithms", status: "present", time: "09:30 AM" },
      { id: 2, date: "2026-03-08", subjectName: "Database Management Systems", status: "present", time: "11:15 AM" },
      { id: 3, date: "2026-03-07", subjectName: "Java Programming & OOP", status: "absent", time: "02:00 PM" }
    ]);
  });

  function setStatusFor(subjectId, status) {
    setMarkedStatus((prev) => ({
      ...prev,
      [subjectId]: status
    }));
  }

  function markAll(status) {
    const updated = {};
    subjects.forEach((s) => {
      updated[s.id] = status;
    });
    setMarkedStatus(updated);
  }

  function handleSaveDailyRegister(e) {
    e.preventDefault();

    let updatedCount = 0;
    const newLogs = [];
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const updatedSubjects = subjects.map((sub) => {
      const status = markedStatus[sub.id];
      if (status === "present") {
        updatedCount++;
        newLogs.push({
          id: Date.now() + Math.random(),
          date: selectedDate,
          subjectName: sub.name,
          status: "present",
          time: currentTime
        });
        return {
          ...sub,
          attended: sub.attended + 1,
          total: sub.total + 1
        };
      } else if (status === "absent") {
        updatedCount++;
        newLogs.push({
          id: Date.now() + Math.random(),
          date: selectedDate,
          subjectName: sub.name,
          status: "absent",
          time: currentTime
        });
        return {
          ...sub,
          total: sub.total + 1
        };
      }
      return sub;
    });

    setSubjects(updatedSubjects);

    const updatedLogs = [...newLogs, ...logs].slice(0, 20);
    setLogs(updatedLogs);
    saveToStorage("attendanceLogsHistory", updatedLogs);

    setMessage({
      type: "success",
      text: `Successfully logged attendance for ${updatedCount} classes on ${selectedDate}!`
    });

    setTimeout(() => setMessage(null), 4000);
  }

  return (
    <div className="att-overall-wrapper">
      {/* Top Banner Card */}
      <div className="att-register-card">
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
                <Layers style={{ width: "1rem", height: "1rem" }} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "var(--att-text-main)" }}>
                Daily Class Register
              </h2>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", margin: "0.25rem 0 0 0" }}>
              Mark attendance for all courses conducted today in one go.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.65rem" }}>
            {/* Date Input */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--att-surface-subtle)",
              border: "1px solid var(--att-border)",
              padding: "0.45rem 0.85rem",
              borderRadius: "var(--att-radius-sm)"
            }}>
              <Calendar style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-text-subtle)" }} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--att-text-main)",
                  outline: "none",
                  cursor: "pointer"
                }}
              />
            </div>

            {/* Quick Bulk actions */}
            <button
              type="button"
              onClick={() => markAll("present")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.5rem 0.85rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--att-success-text)",
                background: "var(--att-success-light)",
                border: "1px solid var(--att-success-border)",
                borderRadius: "var(--att-radius-sm)",
                cursor: "pointer"
              }}
            >
              <CheckCheck style={{ width: "0.875rem", height: "0.875rem" }} />
              <span>All Present</span>
            </button>

            <button
              type="button"
              onClick={() => markAll("no_class")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.5rem 0.85rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--att-text-muted)",
                background: "var(--att-surface-alt)",
                border: "1px solid var(--att-border)",
                borderRadius: "var(--att-radius-sm)",
                cursor: "pointer"
              }}
            >
              <RotateCcw style={{ width: "0.875rem", height: "0.875rem" }} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Feedback alert */}
        {message && (
          <div style={{
            marginTop: "1rem",
            padding: "0.85rem 1.25rem",
            borderRadius: "var(--att-radius-md)",
            background: "var(--att-success-light)",
            border: "1px solid var(--att-success-border)",
            color: "var(--att-success-text)",
            fontSize: "0.8125rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <CheckCircle2 style={{ width: "1rem", height: "1rem", color: "var(--att-success)" }} />
            <span>{message.text}</span>
          </div>
        )}

        {/* Attendance Register Form */}
        <form onSubmit={handleSaveDailyRegister} style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {subjects.map((sub) => {
            const currentStatus = markedStatus[sub.id] || "no_class";
            const currentPct = sub.total > 0 ? ((sub.attended / sub.total) * 100).toFixed(1) : "0";

            let impactBadge;
            if (currentStatus === "present") {
              const nextPct = (((sub.attended + 1) / (sub.total + 1)) * 100).toFixed(1);
              impactBadge = (
                <span style={{ display: "inline-flex", alignItems: "center", color: "var(--att-success)", fontWeight: 700 }}>
                  <ArrowUpRight style={{ width: "0.75rem", height: "0.75rem" }} />
                  {currentPct}% → {nextPct}%
                </span>
              );
            } else if (currentStatus === "absent") {
              const nextPct = ((sub.attended / (sub.total + 1)) * 100).toFixed(1);
              impactBadge = (
                <span style={{ display: "inline-flex", alignItems: "center", color: "var(--att-danger)", fontWeight: 700 }}>
                  <ArrowDownRight style={{ width: "0.75rem", height: "0.75rem" }} />
                  {currentPct}% → {nextPct}%
                </span>
              );
            } else {
              impactBadge = (
                <span style={{ color: "var(--att-text-subtle)", fontWeight: 500 }}>
                  No change ({currentPct}%)
                </span>
              );
            }

            return (
              <div key={sub.id} className="att-register-subject-item">
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className={`att-code-tag ${sub.color || "blue"}`}>
                      {sub.code || "SUB"}
                    </span>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 800, margin: 0, color: "var(--att-text-main)" }}>
                      {sub.name}
                    </h4>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.35rem", fontSize: "0.75rem", color: "var(--att-text-muted)" }}>
                    <span>Current: <strong>{sub.attended}/{sub.total}</strong></span>
                    <span style={{ color: "var(--att-border)" }}>•</span>
                    <span>Projected: {impactBadge}</span>
                  </div>
                </div>

                {/* Toggle buttons */}
                <div className="att-toggle-group">
                  <button
                    type="button"
                    onClick={() => setStatusFor(sub.id, "present")}
                    className={`att-toggle-btn present ${currentStatus === "present" ? "active" : ""}`}
                  >
                    <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem" }} />
                    <span>Present</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatusFor(sub.id, "absent")}
                    className={`att-toggle-btn absent ${currentStatus === "absent" ? "active" : ""}`}
                  >
                    <XCircle style={{ width: "0.85rem", height: "0.85rem" }} />
                    <span>Absent</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatusFor(sub.id, "no_class")}
                    className={`att-toggle-btn no-class ${currentStatus === "no_class" ? "active" : ""}`}
                  >
                    <span>No Class</span>
                  </button>
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "1rem", borderTop: "1px solid var(--att-border-subtle)" }}>
            <button
              type="submit"
              style={{
                padding: "0.85rem 1.85rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#ffffff",
                background: "var(--att-primary-gradient)",
                border: "none",
                borderRadius: "var(--att-radius-md)",
                boxShadow: "0 4px 14px var(--att-primary-glow)",
                cursor: "pointer"
              }}
            >
              Save Attendance Register
            </button>
          </div>
        </form>
      </div>

      {/* Recent Activity Log */}
      <div className="att-register-card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <Clock style={{ width: "1rem", height: "1rem", color: "var(--att-text-muted)" }} />
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 800, margin: 0, color: "var(--att-text-main)" }}>
            Recent Attendance Activity Feed
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {logs.slice(0, 6).map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 0",
                borderBottom: "1px solid var(--att-border-subtle)",
                fontSize: "0.75rem"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{
                  width: "1.85rem",
                  height: "1.85rem",
                  borderRadius: "var(--att-radius-xs)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  background: item.status === "present" ? "var(--att-success-light)" : "var(--att-danger-light)",
                  color: item.status === "present" ? "var(--att-success)" : "var(--att-danger)"
                }}>
                  {item.status === "present" ? "P" : "A"}
                </span>
                <div>
                  <p style={{ fontWeight: 700, margin: 0, color: "var(--att-text-main)" }}>{item.subjectName}</p>
                  <span style={{ color: "var(--att-text-subtle)", fontSize: "0.6875rem" }}>{item.date} • {item.time}</span>
                </div>
              </div>

              <span className={`att-pill-badge ${item.status === "present" ? "safe" : "danger"}`}>
                {item.status === "present" ? "Marked Present" : "Marked Absent"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecordAttendance;