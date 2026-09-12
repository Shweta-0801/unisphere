import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Flame,
  Info,
  Sparkles
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
    <div className="space-y-6">
      <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DCD4]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF2F3] text-[#6B1E2D] flex items-center justify-center">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-[#241A1C] tracking-tight">
                Academic Calendar & Logs
              </h2>
              <p className="text-xs md:text-sm text-[#75666A] mt-0.5">
                Inspect past lecture logs or register roll calls by day.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={jumpToToday}
              className="px-3.5 py-1.5 rounded-xl bg-[#F8F3EA] hover:bg-[#EFE8DC] text-[#241A1C] text-xs font-bold transition-all cursor-pointer"
            >
              Today
            </button>
            <div className="flex items-center rounded-xl bg-[#F8F3EA] p-1 border border-[#E5DCD4]">
              <button
                onClick={prevMonth}
                className="p-1 rounded-lg text-[#75666A] hover:bg-[#FFFDF8] hover:text-[#241A1C] transition-all cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 text-xs font-bold text-[#241A1C] min-w-[120px] text-center">
                {monthNames[month]} {year}
              </span>
              <button
                onClick={nextMonth}
                className="p-1 rounded-lg text-[#75666A] hover:bg-[#FFFDF8] hover:text-[#241A1C] transition-all cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Streak & Status Legend Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#F8F3EA] border border-[#E5DCD4]">
          <div className="inline-flex items-center gap-2 text-xs font-black text-[#6B1E2D]">
            <Flame className="w-4 h-4 text-[#B8A08A] fill-[#B8A08A]" />
            <span>5-Day Perfect Attendance Streak!</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#75666A]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F7A5A]" />
              <span>Full Attendance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B8A08A]" />
              <span>Partial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A63D40]" />
              <span>Absent</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid & Side Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Calendar Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-[#75666A] uppercase tracking-wider mb-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {/* Empty leading days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-12 rounded-xl bg-transparent" />
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
                    className={`h-12 rounded-xl text-xs font-bold flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#6B1E2D] text-white shadow-md shadow-[#6B1E2D]/20"
                        : isToday
                        ? "bg-[#FAF2F3] text-[#6B1E2D] border border-[#B8A08A]"
                        : "bg-[#F8F3EA] text-[#241A1C] hover:bg-[#EFE8DC]"
                    }`}
                  >
                    <span>{dayNum}</span>

                    {/* Status Dot */}
                    <div className="mt-1">
                      {status === "present" && (
                        <span className={`block w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-[#4F7A5A]"}`} />
                      )}
                      {status === "absent" && (
                        <span className={`block w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-[#A63D40]"}`} />
                      )}
                      {status === "partial" && (
                        <span className={`block w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-[#B8A08A]"}`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Inspector Panel */}
          <div className="lg:col-span-5 bg-[#F8F3EA] rounded-2xl p-5 border border-[#E5DCD4] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DCD4]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#75666A]">
                    Day Details
                  </span>
                  <h3 className="text-sm font-bold text-[#241A1C]">
                    {new Date(selectedDateStr + "T00:00:00").toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </h3>
                </div>
                {selectedDateStr === todayStr && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#6B1E2D] text-white">
                    Today
                  </span>
                )}
              </div>

              {/* Subject Attendance for Selected Date */}
              <div className="space-y-2 mt-4">
                <p className="text-xs font-semibold text-[#75666A]">
                  Scheduled class status for this day:
                </p>

                {subjects.length === 0 ? (
                  <p className="text-xs text-[#75666A] italic">No courses added yet.</p>
                ) : (
                  subjects.map((sub) => {
                    const status = selectedRecord[sub.id];

                    return (
                      <div
                        key={sub.id}
                        className="bg-[#FFFDF8] p-2.5 rounded-xl border border-[#E5DCD4] flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#241A1C] truncate">
                            {sub.name}
                          </p>
                          <span className="text-[10px] text-[#75666A] font-semibold uppercase">
                            {sub.code || "SUB"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => toggleSubjectStatus(sub.id, "present")}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                              status === "present"
                                ? "bg-[#4F7A5A] text-white"
                                : "bg-[#F8F3EA] text-[#75666A] hover:bg-[#EFE8DC]"
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Present</span>
                          </button>

                          <button
                            onClick={() => toggleSubjectStatus(sub.id, "absent")}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                              status === "absent"
                                ? "bg-[#A63D40] text-white"
                                : "bg-[#F8F3EA] text-[#75666A] hover:bg-[#EFE8DC]"
                            }`}
                          >
                            <XCircle className="w-3 h-3" />
                            <span>Absent</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Day Note Section */}
              <div className="mt-4">
                <label className="block text-[11px] font-bold text-[#75666A] mb-1">
                  Day Memo / Reason for Absence
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedRecord.note || ""}
                    onChange={(e) => handleNoteChange(e.target.value)}
                    placeholder="e.g. Attended guest lecture, sick leave..."
                    className="w-full px-3 py-1.5 bg-[#FFFDF8] border border-[#E5DCD4] rounded-xl text-xs text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#B8A08A]"
                  />
                  <span className="px-2.5 py-1.5 rounded-xl bg-[#EFE8DC] text-[#75666A] text-[10px] font-bold whitespace-nowrap flex items-center">
                    Saved
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5DCD4] flex items-center gap-2 text-[11px] text-[#75666A]">
              <Info className="w-3.5 h-3.5 text-[#B8A08A] shrink-0" />
              <span>Marking attendance here synchronizes directly with your course totals.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AttendanceCalendar;