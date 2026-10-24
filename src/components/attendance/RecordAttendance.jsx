import { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  CheckCheck,
  MinusCircle
} from "lucide-react";
import { loadFromStorage, saveToStorage } from "../../utils/storage";
import "./Attendance.css";

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

  // Sync when storage is updated externally (e.g. by Teacher Attendance Management)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedLogs = loadFromStorage("attendanceLogsHistory", null);
      if (savedLogs && Array.isArray(savedLogs)) {
        setLogs(savedLogs);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Daily Class Register Form */}
      <div className="att-register-card">
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--att-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "3rem", height: "3rem", borderRadius: "var(--att-radius-md)", background: "var(--att-primary-light)", color: "var(--att-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Layers style={{ width: "1.5rem", height: "1.5rem" }} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--att-text-main)", margin: 0, letterSpacing: "-0.02em" }}>
                Daily Attendance Register
              </h2>
              <p style={{ fontSize: "0.8125rem", color: "var(--att-text-muted)", margin: "0.25rem 0 0 0" }}>
                Batch log all your lectures for today in one quick form.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                padding: "0.55rem 0.85rem",
                background: "var(--att-bg)",
                border: "1px solid var(--att-border)",
                borderRadius: "var(--att-radius-sm)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--att-text-main)",
                outline: "none"
              }}
            />
          </div>
        </div>

        {/* Quick Batch Controls */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", padding: "0.85rem 1rem", borderRadius: "var(--att-radius-md)", background: "var(--att-bg)", border: "1px solid var(--att-border)", margin: "1.25rem 0" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-text-muted)" }}>
            Quick Batch Actions:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={() => markAll("present")}
              style={{
                padding: "0.4rem 0.75rem",
                borderRadius: "var(--att-radius-sm)",
                background: "var(--att-success-light)",
                color: "var(--att-success-text)",
                border: "1px solid var(--att-success-border)",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem"
              }}
            >
              <CheckCircle2 style={{ width: "0.875rem", height: "0.875rem" }} />
              Mark All Present
            </button>
            <button
              type="button"
              onClick={() => markAll("absent")}
              style={{
                padding: "0.4rem 0.75rem",
                borderRadius: "var(--att-radius-sm)",
                background: "var(--att-danger-light)",
                color: "var(--att-danger-text)",
                border: "1px solid var(--att-danger-border)",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem"
              }}
            >
              <XCircle style={{ width: "0.875rem", height: "0.875rem" }} />
              Mark All Absent
            </button>
            <button
              type="button"
              onClick={() => markAll("no_class")}
              style={{
                padding: "0.4rem 0.75rem",
                borderRadius: "var(--att-radius-sm)",
                background: "var(--att-surface-alt)",
                color: "var(--att-text-muted)",
                border: "1px solid var(--att-border)",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem"
              }}
            >
              <MinusCircle style={{ width: "0.875rem", height: "0.875rem" }} />
              No Class Held
            </button>
          </div>
        </div>

        {/* Subjects List Rows */}
        <form onSubmit={handleSaveDailyRegister} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {subjects.map((sub) => {
            const status = markedStatus[sub.id] || "present";
            const currentPct = sub.total > 0 ? Math.round((sub.attended / sub.total) * 100) : 0;

            return (
              <div
                key={sub.id}
                className="att-register-subject-item"
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className="att-code-tag blue" style={{ padding: "0.15rem 0.45rem", fontSize: "10px" }}>
                      {sub.code || "SUB"}
                    </span>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--att-text-main)", margin: 0 }}>
                      {sub.name}
                    </h4>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", marginTop: "0.25rem" }}>
                    Faculty: {sub.faculty || "Faculty"} • Current: {sub.attended}/{sub.total} ({currentPct}%)
                  </div>
                </div>

                {/* 3 Status Option Buttons */}
                <div className="att-toggle-group">
                  <button
                    type="button"
                    onClick={() => setStatusFor(sub.id, "present")}
                    className={`att-toggle-btn ${status === "present" ? "present active" : ""}`}
                  >
                    <CheckCircle2 style={{ width: "0.875rem", height: "0.875rem" }} />
                    Present
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFor(sub.id, "absent")}
                    className={`att-toggle-btn ${status === "absent" ? "absent active" : ""}`}
                  >
                    <XCircle style={{ width: "0.875rem", height: "0.875rem" }} />
                    Absent
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFor(sub.id, "no_class")}
                    className={`att-toggle-btn ${status === "no_class" ? "no-class active" : ""}`}
                  >
                    <MinusCircle style={{ width: "0.875rem", height: "0.875rem" }} />
                    Off / Cancelled
                  </button>
                </div>
              </div>
            );
          })}

          {message && (
            <div style={{ padding: "0.85rem 1rem", borderRadius: "var(--att-radius-sm)", background: "var(--att-success-light)", border: "1px solid var(--att-success-border)", color: "var(--att-success-text)", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle2 style={{ width: "1rem", height: "1rem", color: "var(--att-success)", flexShrink: 0 }} />
              <span>{message.text}</span>
            </div>
          )}

          <div style={{ paddingTop: "0.75rem", display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              className="att-btn-primary"
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: "var(--att-radius-md)",
                background: "var(--att-primary)",
                color: "#ffffff",
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                boxShadow: "var(--att-shadow-sm)"
              }}
            >
              <CheckCheck style={{ width: "1rem", height: "1rem" }} />
              <span>Save Today's Register</span>
            </button>
          </div>
        </form>
      </div>

      {/* Recent History Table */}
      <div className="att-gauge-card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Clock style={{ width: "1rem", height: "1rem", color: "var(--att-accent)" }} />
            <h3 style={{ fontSize: "0.875rem", fontWeight: 900, color: "var(--att-text-main)", margin: 0 }}>
              Recent Roll Call History
            </h3>
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--att-text-muted)" }}>Past recordings</span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", textAlign: "left", fontSize: "0.75rem", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--att-border)", color: "var(--att-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, fontSize: "10px" }}>
                <th style={{ padding: "0.65rem 0.75rem" }}>Date</th>
                <th style={{ padding: "0.65rem 0.75rem" }}>Subject</th>
                <th style={{ padding: "0.65rem 0.75rem" }}>Time</th>
                <th style={{ padding: "0.65rem 0.75rem", textAlign: "right" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid var(--att-border-subtle)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600, color: "var(--att-text-main)" }}>{item.date}</td>
                  <td style={{ padding: "0.75rem", fontWeight: 700, color: "var(--att-text-main)" }}>{item.subjectName}</td>
                  <td style={{ padding: "0.75rem", color: "var(--att-text-muted)" }}>{item.time}</td>
                  <td style={{ padding: "0.75rem", textAlign: "right" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "9999px",
                      fontSize: "10px",
                      fontWeight: 900,
                      background: item.status === "present" ? "var(--att-success-light)" : "var(--att-danger-light)",
                      color: item.status === "present" ? "var(--att-success-text)" : "var(--att-danger-text)"
                    }}>
                      {item.status === "present" ? "Present" : "Absent"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecordAttendance;