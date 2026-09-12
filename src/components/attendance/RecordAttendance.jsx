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
  RotateCcw,
  Sparkles,
  MinusCircle
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
    <div className="space-y-6">
      {/* Daily Class Register Form */}
      <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5DCD4]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF2F3] text-[#6B1E2D] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-[#241A1C] tracking-tight">
                Daily Attendance Register
              </h2>
              <p className="text-xs md:text-sm text-[#75666A] mt-0.5">
                Batch log all your lectures for today in one quick form.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3.5 py-2 bg-[#F8F3EA] border border-[#E5DCD4] rounded-xl text-xs font-bold text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#B8A08A]"
            />
          </div>
        </div>

        {/* Quick Batch Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#F8F3EA] border border-[#E5DCD4]">
          <span className="text-xs font-bold text-[#75666A]">
            Quick Batch Actions:
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => markAll("present")}
              className="px-3 py-1.5 rounded-xl bg-[#4F7A5A]/10 text-[#4F7A5A] border border-[#4F7A5A]/30 text-xs font-bold hover:bg-[#4F7A5A]/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Mark All Present
            </button>
            <button
              type="button"
              onClick={() => markAll("absent")}
              className="px-3 py-1.5 rounded-xl bg-[#A63D40]/10 text-[#A63D40] border border-[#A63D40]/30 text-xs font-bold hover:bg-[#A63D40]/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" />
              Mark All Absent
            </button>
            <button
              type="button"
              onClick={() => markAll("no_class")}
              className="px-3 py-1.5 rounded-xl bg-[#EFE8DC] text-[#75666A] text-xs font-bold hover:bg-[#E5DCD4] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MinusCircle className="w-3.5 h-3.5" />
              No Class Held
            </button>
          </div>
        </div>

        {/* Subjects List Rows */}
        <form onSubmit={handleSaveDailyRegister} className="space-y-3">
          {subjects.map((sub) => {
            const status = markedStatus[sub.id] || "present";
            const currentPct = sub.total > 0 ? Math.round((sub.attended / sub.total) * 100) : 0;

            return (
              <div
                key={sub.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#FFFDF8] border border-[#E5DCD4] gap-3 hover:border-[#B8A08A]/60 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#EFE8DC] text-[#75666A]">
                      {sub.code || "SUB"}
                    </span>
                    <h4 className="text-sm font-bold text-[#241A1C]">
                      {sub.name}
                    </h4>
                  </div>
                  <div className="text-xs text-[#75666A] mt-0.5">
                    Faculty: {sub.faculty || "Faculty"} • Current: {sub.attended}/{sub.total} ({currentPct}%)
                  </div>
                </div>

                {/* 3 Status Option Buttons */}
                <div className="inline-flex p-1 rounded-xl bg-[#EFE8DC] self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setStatusFor(sub.id, "present")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      status === "present"
                        ? "bg-[#4F7A5A] text-white shadow-xs"
                        : "text-[#75666A] hover:text-[#241A1C]"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Present
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFor(sub.id, "absent")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      status === "absent"
                        ? "bg-[#A63D40] text-white shadow-xs"
                        : "text-[#75666A] hover:text-[#241A1C]"
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Absent
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFor(sub.id, "no_class")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      status === "no_class"
                        ? "bg-[#75666A] text-white shadow-xs"
                        : "text-[#75666A] hover:text-[#241A1C]"
                    }`}
                  >
                    <MinusCircle className="w-3.5 h-3.5" />
                    Off / Cancelled
                  </button>
                </div>
              </div>
            );
          })}

          {message && (
            <div className="p-4 rounded-xl bg-[#4F7A5A]/10 border border-[#4F7A5A]/30 text-[#4F7A5A] text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4F7A5A] shrink-0" />
              <span>{message.text}</span>
            </div>
          )}

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#6B1E2D] hover:bg-[#48121E] text-white text-xs font-bold shadow-md shadow-[#6B1E2D]/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Save Today's Register</span>
            </button>
          </div>
        </form>
      </div>

      {/* Recent History Table */}
      <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#B8A08A]" />
            <h3 className="text-sm font-black text-[#241A1C]">
              Recent Roll Call History
            </h3>
          </div>
          <span className="text-xs text-[#75666A]">Past recordings</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5DCD4] text-[#75666A] uppercase tracking-wider font-bold text-[10px]">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DCD4]/60 font-medium">
              {logs.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8F3EA]/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#241A1C]">{item.date}</td>
                  <td className="py-3 px-3 font-bold text-[#241A1C]">{item.subjectName}</td>
                  <td className="py-3 px-3 text-[#75666A]">{item.time}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-black ${
                      item.status === "present"
                        ? "bg-[#4F7A5A]/15 text-[#4F7A5A]"
                        : "bg-[#A63D40]/15 text-[#A63D40]"
                    }`}>
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