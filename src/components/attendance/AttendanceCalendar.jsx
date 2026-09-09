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
    <div className="att-overall-wrapper">
      <div className="att-cal-card">
        {/* Header navigation */}
        <div className="att-cal-header-row">
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
                <CalendarIcon style={{ width: "1rem", height: "1rem" }} />
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "var(--att-text-main)" }}>
                Monthly Attendance Calendar
              </h2>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--att-text-muted)", margin: "0.25rem 0 0 0" }}>
              Select any date to inspect past class logs or register attendance
            </p>
          </div>

          <div className="att-cal-nav-group">
            <button
              onClick={jumpToToday}
              style={{
                padding: "0.45rem 0.85rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--att-primary)",
                background: "var(--att-primary-light)",
                border: "none",
                borderRadius: "var(--att-radius-sm)",
                cursor: "pointer"
              }}
            >
              Today
            </button>
            <div className="att-cal-nav-pill">
              <button
                onClick={prevMonth}
                className="att-cal-nav-arrow"
                aria-label="Previous month"
              >
                <ChevronLeft style={{ width: "1rem", height: "1rem" }} />
              </button>
              <span className="att-cal-month-title">
                {monthNames[month]} {year}
              </span>
              <button
                onClick={nextMonth}
                className="att-cal-nav-arrow"
                aria-label="Next month"
              >
                <ChevronRight style={{ width: "1rem", height: "1rem" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Streak & Legend Banner */}
        <div className="att-cal-legend-bar">
          <div className="att-cal-streak-badge">
            <Flame style={{ width: "1rem", height: "1rem", fill: "#f59e0b" }} />
            <span>5-Day Perfect Attendance Streak!</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--att-text-muted)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span className="att-dot emerald" />
              <span>Full Attendance</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span className="att-dot amber" style={{ background: "var(--att-warning)" }} />
              <span>Partial</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span className="att-dot rose" />
              <span>Absent</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid & Side Inspector */}
        <div className="att-cal-layout-grid">
          
          {/* Calendar Grid */}
          <div>
            <div className="att-cal-days-header">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="att-cal-cells-grid">
              {/* Empty leading days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="att-cal-cell-empty" />
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
                    className={`att-cal-cell-btn ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
                  >
                    <span className="att-cal-cell-num">{dayNum}</span>

                    {/* Status Dot */}
                    <div className="att-cal-dots-wrap">
                      {status === "present" && (
                        <span className="att-dot emerald" style={{ width: "6px", height: "6px" }} />
                      )}
                      {status === "absent" && (
                        <span className="att-dot rose" style={{ width: "6px", height: "6px" }} />
                      )}
                      {status === "partial" && (
                        <span className="att-dot amber" style={{ width: "6px", height: "6px", background: "var(--att-warning)" }} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Inspector Panel */}
          <div className="att-cal-inspector-panel">
            <div>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid var(--att-border)"
              }}>
                <div>
                  <span style={{ fontSize: "0.6875rem", textTransform: "uppercase", fontWeight: 800, color: "var(--att-text-subtle)" }}>
                    Day Details
                  </span>
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, margin: "0.15rem 0 0 0", color: "var(--att-text-main)" }}>
                    {new Date(selectedDateStr + "T00:00:00").toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </h3>
                </div>
                {selectedDateStr === todayStr && (
                  <span style={{
                    padding: "0.25rem 0.65rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    background: "var(--att-primary-light)",
                    color: "var(--att-primary)",
                    borderRadius: "9999px"
                  }}>
                    Today
                  </span>
                )}
              </div>

              {/* Subject Attendance for Selected Date */}
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--att-text-muted)", margin: 0 }}>
                  Mark status for scheduled classes on this day:
                </p>

                {subjects.length === 0 ? (
                  <p style={{ fontSize: "0.75rem", color: "var(--att-text-subtle)", fontStyle: "italic" }}>No subjects added yet.</p>
                ) : (
                  subjects.map((sub) => {
                    const status = selectedRecord[sub.id];

                    return (
                      <div
                        key={sub.id}
                        style={{
                          background: "#ffffff",
                          borderRadius: "var(--att-radius-sm)",
                          padding: "0.65rem 0.85rem",
                          border: "1px solid var(--att-border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "0.5rem"
                        }}
                      >
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <p style={{ fontSize: "0.8125rem", fontWeight: 700, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--att-text-main)" }}>
                            {sub.name}
                          </p>
                          <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--att-text-subtle)", textTransform: "uppercase" }}>
                            {sub.code || "SUB"}
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                          <button
                            onClick={() => toggleSubjectStatus(sub.id, "present")}
                            style={{
                              padding: "0.35rem 0.65rem",
                              borderRadius: "var(--att-radius-xs)",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              border: "none",
                              cursor: "pointer",
                              background: status === "present" ? "var(--att-success)" : "var(--att-surface-alt)",
                              color: status === "present" ? "#ffffff" : "var(--att-text-muted)"
                            }}
                          >
                            <CheckCircle2 style={{ width: "0.85rem", height: "0.85rem" }} />
                            <span>Present</span>
                          </button>

                          <button
                            onClick={() => toggleSubjectStatus(sub.id, "absent")}
                            style={{
                              padding: "0.35rem 0.65rem",
                              borderRadius: "var(--att-radius-xs)",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              border: "none",
                              cursor: "pointer",
                              background: status === "absent" ? "var(--att-danger)" : "var(--att-surface-alt)",
                              color: status === "absent" ? "#ffffff" : "var(--att-text-muted)"
                            }}
                          >
                            <XCircle style={{ width: "0.85rem", height: "0.85rem" }} />
                            <span>Absent</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Daily Note Section */}
              <div style={{ marginTop: "1.25rem" }}>
                <label className="att-input-label">
                  Day Memo / Reason for Leave
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={selectedRecord.note || ""}
                    onChange={(e) => handleNoteChange(e.target.value)}
                    placeholder="e.g. Attended guest seminar, Sick leave..."
                    className="att-form-control"
                    style={{ flex: 1, padding: "0.45rem 0.75rem" }}
                  />
                  <span style={{
                    padding: "0.45rem 0.75rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    background: "var(--att-surface-alt)",
                    color: "var(--att-text-muted)",
                    borderRadius: "var(--att-radius-sm)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    Auto-saved
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: "1.25rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--att-border)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              color: "var(--att-text-muted)"
            }}>
              <Info style={{ width: "0.875rem", height: "0.875rem", color: "var(--att-primary)", flexShrink: 0 }} />
              <span>Records saved here sync with your subject attendance counts automatically.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AttendanceCalendar;