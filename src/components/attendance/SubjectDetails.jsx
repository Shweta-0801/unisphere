import { useState } from "react";
import {User,ShieldCheck,AlertCircle,CheckCircle2,XCircle,Edit2,Clock,Plus,BookOpen,Calendar} from "lucide-react";

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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-400">
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
    <div className="space-y-6">
      {/* Subject Horizontal Selector Tabs */}
      <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-2xl p-2 shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {subjects.map((sub) => {
            const isSelected = sub.id === subject.id;
            const subPct = sub.total > 0 ? Math.round((sub.attended / sub.total) * 100) : 0;
            const subSafe = subPct >= targetPercentage;

            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#6B1E2D] text-white shadow-sm shadow-[#6B1E2D]/20"
                    : "bg-[#F8F3EA] text-[#75666A] hover:bg-[#EFE8DC]"
                }`}
              >
                <span>{sub.name}</span>
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-black rounded ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : subSafe
                      ? "bg-[#4F7A5A]/15 text-[#4F7A5A]"
                      : "bg-[#A63D40]/15 text-[#A63D40]"
                  }`}
                >
                  {subPct}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Subject Detail Card */}
      <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        {/* Course Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DCD4]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-[#FAF2F3] text-[#6B1E2D] border border-[#E5DCD4] text-[11px] font-black uppercase tracking-wider">
                {subject.code || "CS-301"}
              </span>
              <span className="text-xs font-semibold text-[#75666A]">
                4 Credit Hours • Semester 4
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#241A1C] mt-1">
              {subject.name}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#75666A] mt-1">
              <User className="w-3.5 h-3.5 text-[#B8A08A]" />
              <span>Lead Faculty: <strong className="text-[#241A1C]">{subject.faculty || "Course Faculty"}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onEditSubject && onEditSubject(subject)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8F3EA] hover:bg-[#EFE8DC] text-[#241A1C] text-xs font-bold transition-all cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Course</span>
            </button>

            <button
              onClick={() => onQuickLog && onQuickLog(subject.id, "present")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6B1E2D] hover:bg-[#48121E] text-white text-xs font-bold shadow-sm shadow-[#6B1E2D]/20 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+ Log Present</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#F8F3EA] border border-[#E5DCD4]">
            <span className="text-xs font-bold text-[#75666A] block">Attendance Rate</span>
            <span className="text-2xl md:text-3xl font-black text-[#241A1C] mt-1 block">
              {percentage}%
            </span>
            <span className="text-[10px] font-bold text-[#75666A] mt-1 block">Goal: {targetPercentage}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#4F7A5A]/5 border border-[#4F7A5A]/30">
            <span className="text-xs font-bold text-[#4F7A5A] block">Attended Sessions</span>
            <span className="text-2xl md:text-3xl font-black text-[#4F7A5A] mt-1 block">
              {attended}
            </span>
            <span className="text-[10px] font-bold text-[#4F7A5A] mt-1 block">Present</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#A63D40]/5 border border-[#A63D40]/30">
            <span className="text-xs font-bold text-[#A63D40] block">Missed Sessions</span>
            <span className="text-2xl md:text-3xl font-black text-[#A63D40] mt-1 block">
              {missed}
            </span>
            <span className="text-[10px] font-bold text-[#A63D40] mt-1 block">Absences</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF2F3] border border-[#E5DCD4]">
            <span className="text-xs font-bold text-[#6B1E2D] block">Total Conducted</span>
            <span className="text-2xl md:text-3xl font-black text-[#6B1E2D] mt-1 block">
              {total}
            </span>
            <span className="text-[10px] font-bold text-[#6B1E2D] mt-1 block">Delivered</span>
          </div>
        </div>

        {/* Advisor & Exam Eligibility Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
            isSafe
              ? "bg-[#4F7A5A]/10 border-[#4F7A5A]/30 text-[#4F7A5A]"
              : "bg-[#A63D40]/10 border-[#A63D40]/30 text-[#A63D40]"
          }`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
              isSafe
                ? "bg-[#4F7A5A]/20 text-[#4F7A5A]"
                : "bg-[#A63D40]/20 text-[#A63D40]"
            }`}>
              {isSafe ? <ShieldCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-[#241A1C]">
                {isSafe ? "Course Standing: Safe Clearance" : "Course Standing: Shortage Alert"}
              </h4>
              <p className="text-xs mt-1 leading-relaxed text-[#75666A]">
                {statusMessage}
              </p>
            </div>
          </div>

          {/* Exam Clearance Checklist */}
          <div className="p-4 rounded-2xl bg-[#F8F3EA] border border-[#E5DCD4]">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-[#75666A] mb-3">
              Semester Clearance Checklist
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                {isSafe ? (
                  <CheckCircle2 className="w-4 h-4 text-[#4F7A5A] shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-[#A63D40] shrink-0" />
                )}
                <span className="font-semibold text-[#241A1C]">Min {targetPercentage}% Attendance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F7A5A] shrink-0" />
                <span className="font-semibold text-[#241A1C]">Lab Experiments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F7A5A] shrink-0" />
                <span className="font-semibold text-[#241A1C]">Internal Submissions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F7A5A] shrink-0" />
                <span className="font-semibold text-[#241A1C]">Mid-Term Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* History / Log Table */}
        <div className="pt-6 border-t border-[#E5DCD4]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B8A08A]" />
              <h3 className="text-sm font-black text-[#241A1C]">
                Recent Class Sessions for {subject.name}
              </h3>
            </div>
            <span className="text-xs text-[#75666A]">Latest 5 records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5DCD4] text-[#75666A] uppercase tracking-wider font-bold text-[10px]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Session Notes</th>
                  <th className="py-2.5 px-3 text-right">Faculty Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DCD4]/60 font-medium">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F8F3EA]/50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#241A1C]">{log.date}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-black ${
                        log.status === "present"
                          ? "bg-[#4F7A5A]/15 text-[#4F7A5A]"
                          : "bg-[#A63D40]/15 text-[#A63D40]"
                      }`}>
                        {log.status === "present" ? "Present" : "Absent"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#75666A]">{log.note}</td>
                    <td className="py-3 px-3 text-right text-[#4F7A5A] font-bold">
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