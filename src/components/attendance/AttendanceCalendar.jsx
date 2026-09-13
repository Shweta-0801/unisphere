import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Flame,
  Info
} from "lucide-react";
import { loadFromStorage, saveToStorage } from "../../utils/storage";
import "./Attendance.css";

function AttendanceCalendar({ subjects = [], onQuickLog }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  
  // daily records stored as: { 'YYYY-MM-DD': { subjectId: 'present' | 'absent', note?: string } }
  const [dailyRecords, setDailyRecords] = useState(() => {
    return loadFromStorage("attendanceDailyRecords", {
      "2026-03-02": { 1: "present", 2: "present", 3: "present", 4: "present" },
      "2026-03-03": { 1: "present", 2: "absent", 3: "present", 4: "present" },
      "2026-03-04": { 1: "present", 2: "present", 3: "present", 4: "present" },
      "2026-03-05": { 1: "present", 2: "present", 3: "present", 4: "present" },
      "2026-03-06": { 1: "present", 2: "present", 3: "present", 4: "present" }
    });
  });

  useEffect(() => {
    saveToStorage("attendanceDailyRecords", dailyRecords);
  }, [dailyRecords]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Helper for calendar dates
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  function jumpToToday() {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDateStr(today.toISOString().split("T")[0]);
  }

  function formatDayDate(dayNum) {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(dayNum).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  }

  function getDayStatus(dateString) {
    const record = dailyRecords[dateString];
    if (!record) return null;

    const entries = Object.entries(record).filter(([k]) => k !== "note");
    if (entries.length === 0) return null;

    const presents = entries.filter(([, v]) => v === "present").length;
    const absents = entries.filter(([, v]) => v === "absent").length;

    if (absents === 0 && presents > 0) return "present";
    if (presents === 0 && absents > 0) return "absent";
    if (presents > 0 && absents > 0) return "partial";
    return null;
  }

  function toggleSubjectStatus(subjectId, status) {
    setDailyRecords((prev) => {
      const dayData = prev[selectedDateStr] || {};
      const currentStatus = dayData[subjectId];

      const newStatus = currentStatus === status ? undefined : status;
      const updatedDay = { ...dayData };

      if (newStatus) {
        updatedDay[subjectId] = newStatus;
      } else {
        delete updatedDay[subjectId];
      }

      return {
        ...prev,
        [selectedDateStr]: updatedDay
      };
    });

    if (onQuickLog) {
      onQuickLog(subjectId, status);
    }
  }

  function handleNoteChange(val) {
    setDailyRecords((prev) => {
      const dayData = prev[selectedDateStr] || {};
      return {
        ...prev,
        [selectedDateStr]: {
          ...dayData,
          note: val
        }
      };
    });
  }

  const selectedRecord = dailyRecords[selectedDateStr] || {};
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="att-gauge-card" style={{ padding: "1.75rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Header Navigation */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--att-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "3rem", height: "3rem", borderRadius: "var(--att-radius-md)", background: "var(--att-primary-light)", color: "var(--att-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CalendarIcon style={{ width: "1.5rem", height: "1.5rem" }} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--att-text-main)", margin: 0, letterSpacing: "-0.02em" }}>
                Academic Calendar &amp; Logs
              </h2>
              <p style={{ fontSize: "0.8125rem", color: "var(--att-text-muted)", margin: "0.25rem 0 0 0" }}>
                Inspect past lecture logs or register roll calls by day.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={jumpToToday}
              style={{
                padding: "0.45rem 0.85rem",
                borderRadius: "var(--att-radius-sm)",
                background: "var(--att-bg)",
                color: "var(--att-text-main)",
                fontSize: "0.75rem",
                fontWeight: 700,
                border: "1px solid var(--att-border)",
                cursor: "pointer"
              }}
            >
              Today
            </button>
            <div style={{ display: "flex", alignItems: "center", borderRadius: "var(--att-radius-sm)", background: "var(--att-bg)", padding: "0.25rem", border: "1px solid var(--att-border)" }}>
              <button
                onClick={prevMonth}
                style={{ padding: "0.25rem", borderRadius: "4px", color: "var(--att-text-muted)", background: "transparent", border: "none", cursor: "pointer" }}
                aria-label="Previous month"
              >
                <ChevronLeft style={{ width: "1rem", height: "1rem" }} />
              </button>
              <span style={{ padding: "0 0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "var(--att-text-main)", minWidth: "110px", textAlign: "center" }}>
                {monthNames[month]} {year}
              </span>
              <button
                onClick={nextMonth}
                style={{ padding: "0.25rem", borderRadius: "4px", color: "var(--att-text-muted)", background: "transparent", border: "none", cursor: "pointer" }}
                aria-label="Next month"
              >
                <ChevronRight style={{ width: "1rem", height: "1rem" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Streak & Status Legend Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "0.85rem 1rem", borderRadius: "var(--att-radius-md)", background: "var(--att-bg)", border: "1px solid var(--att-border)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", fontWeight: 900, color: "var(--att-primary)" }}>
            <Flame style={{ width: "1rem", height: "1rem", color: "var(--att-accent)" }} />
            <span>5-Day Perfect Attendance Streak!</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", fontSize: "0.75rem", fontWeight: 500, color: "var(--att-text-muted)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "0.625rem", height: "0.625rem", borderRadius: "50%", background: "var(--att-success)" }} />
              <span>Full Attendance</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "0.625rem", height: "0.625rem", borderRadius: "50%", background: "var(--att-accent)" }} />
              <span>Partial</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "0.625rem", height: "0.625rem", borderRadius: "50%", background: "var(--att-danger)" }} />
              <span>Absent</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid & Side Inspector */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          
          {/* Calendar Grid */}
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.25rem", textAlign: "center", fontWeight: 700, fontSize: "11px", color: "var(--att-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} style={{ padding: "0.25rem 0" }}>{d}</div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.35rem" }}>
              {/* Empty leading days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} style={{ height: "3rem", borderRadius: "var(--att-radius-sm)", background: "transparent" }} />
              ))}

              {/* Month days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateString = formatDayDate(dayNum);
                const isSelected = dateString === selectedDateStr;
                const isToday = dateString === todayStr;
                const status = getDayStatus(dateString);

                return (
                  <button
                    key={dateString}
                    onClick={() => setSelectedDateStr(dateString)}
                    style={{
                      height: "3rem",
                      borderRadius: "var(--att-radius-sm)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      cursor: "pointer",
                      border: isToday ? "1px solid var(--att-accent)" : "1px solid transparent",
                      background: isSelected ? "var(--att-primary)" : isToday ? "var(--att-primary-light)" : "var(--att-bg)",
                      color: isSelected ? "#ffffff" : isToday ? "var(--att-primary)" : "var(--att-text-main)",
                      boxShadow: isSelected ? "var(--att-shadow-sm)" : "none"
                    }}
                  >
                    <span>{dayNum}</span>

                    {/* Status Dot */}
                    <div style={{ marginTop: "0.2rem" }}>
                      {status === "present" && (
                        <span style={{ display: "block", width: "5px", height: "5px", borderRadius: "50%", background: isSelected ? "#ffffff" : "var(--att-success)" }} />
                      )}
                      {status === "absent" && (
                        <span style={{ display: "block", width: "5px", height: "5px", borderRadius: "50%", background: isSelected ? "#ffffff" : "var(--att-danger)" }} />
                      )}
                      {status === "partial" && (
                        <span style={{ display: "block", width: "5px", height: "5px", borderRadius: "50%", background: isSelected ? "#ffffff" : "var(--att-accent)" }} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Inspector Panel */}
          <div style={{ background: "var(--att-bg)", borderRadius: "var(--att-radius-lg)", padding: "1.25rem", border: "1px solid var(--att-border)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid var(--att-border)" }}>
                <div>
                  <span style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--att-text-muted)" }}>
                    Day Details
                  </span>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--att-text-main)", margin: 0 }}>
                    {new Date(selectedDateStr + "T00:00:00").toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </h3>
                </div>
                {selectedDateStr === todayStr && (
                  <span style={{ padding: "0.15rem 0.5rem", fontSize: "10px", fontWeight: 700, borderRadius: "9999px", background: "var(--att-primary)", color: "#ffffff" }}>
                    Today
                  </span>
                )}
              </div>

              {/* Subject Attendance for Selected Date */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--att-text-muted)", margin: 0 }}>
                  Scheduled class status for this day:
                </p>

                {subjects.length === 0 ? (
                  <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", fontStyle: "italic", margin: 0 }}>No courses added yet.</p>
                ) : (
                  subjects.map((sub) => {
                    const status = selectedRecord[sub.id];

                    return (
                      <div
                        key={sub.id}
                        style={{ background: "var(--att-surface)", padding: "0.65rem 0.75rem", borderRadius: "var(--att-radius-sm)", border: "1px solid var(--att-border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}
                      >
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--att-text-main)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {sub.name}
                          </p>
                          <span style={{ fontSize: "10px", color: "var(--att-text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
                            {sub.code || "SUB"}
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexShrink: 0 }}>
                          <button
                            onClick={() => toggleSubjectStatus(sub.id, "present")}
                            style={{
                              padding: "0.25rem 0.65rem",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              cursor: "pointer",
                              border: "none",
                              background: status === "present" ? "var(--att-success)" : "var(--att-bg)",
                              color: status === "present" ? "#ffffff" : "var(--att-text-muted)"
                            }}
                          >
                            <CheckCircle2 style={{ width: "0.75rem", height: "0.75rem" }} />
                            <span>Present</span>
                          </button>

                          <button
                            onClick={() => toggleSubjectStatus(sub.id, "absent")}
                            style={{
                              padding: "0.25rem 0.65rem",
                              borderRadius: "4px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              cursor: "pointer",
                              border: "none",
                              background: status === "absent" ? "var(--att-danger)" : "var(--att-bg)",
                              color: status === "absent" ? "#ffffff" : "var(--att-text-muted)"
                            }}
                          >
                            <XCircle style={{ width: "0.75rem", height: "0.75rem" }} />
                            <span>Absent</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Day Note Section */}
              <div style={{ marginTop: "1rem" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "var(--att-text-muted)", marginBottom: "0.25rem" }}>
                  Day Memo / Reason for Absence
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={selectedRecord.note || ""}
                    onChange={(e) => handleNoteChange(e.target.value)}
                    placeholder="e.g. Attended guest lecture, sick leave..."
                    className="att-form-control"
                    style={{ padding: "0.45rem 0.65rem", fontSize: "0.75rem" }}
                  />
                  <span style={{ padding: "0.45rem 0.65rem", borderRadius: "var(--att-radius-sm)", background: "var(--att-surface-alt)", color: "var(--att-text-muted)", fontSize: "10px", fontWeight: 700, whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
                    Saved
                  </span>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "0.75rem", borderTop: "1px solid var(--att-border)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "11px", color: "var(--att-text-muted)" }}>
              <Info style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-accent)", flexShrink: 0 }} />
              <span>Marking attendance here synchronizes directly with your course totals.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AttendanceCalendar;