import { useState } from "react";
import {
  Check,
  X,
  MoreVertical,
  Edit2,
  Trash2,
  TrendingUp,
  User,
  ShieldCheck,
  AlertCircle,
  Clock,
  Sparkles
} from "lucide-react";

function SubjectCard({
  subject,
  targetPercentage = 75,
  onQuickLog,
  onEdit,
  onDelete,
  onViewDetails
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [justMarked, setJustMarked] = useState(null); // 'present' | 'absent' | null

  const attended = subject.attended || 0;
  const total = subject.total || 0;
  const missed = Math.max(0, total - attended);
  const percentage = total > 0 ? Math.round((attended / total) * 1000) / 10 : 0;
  const isSafe = percentage >= targetPercentage;

  // Bunk or Catch-up calculation
  let adviceText;
  let adviceType; // 'safe' | 'warning' | 'danger'
  let safeBunks = 0;
  let neededClasses = 0;

  if (total === 0) {
    adviceText = "No classes recorded yet";
    adviceType = "safe";
  } else if (isSafe) {
    const maxTotalClasses = Math.floor(attended / (targetPercentage / 100));
    safeBunks = Math.max(0, maxTotalClasses - total);
    if (safeBunks > 0) {
      adviceText = `Can miss next ${safeBunks} class${safeBunks > 1 ? "es" : ""}`;
      adviceType = "safe";
    } else {
      adviceText = "On edge: Don't miss next class";
      adviceType = "warning";
    }
  } else {
    const diff = targetPercentage * total - 100 * attended;
    neededClasses = Math.max(1, Math.ceil(diff / (100 - targetPercentage)));
    adviceText = `Need ${neededClasses} class${neededClasses > 1 ? "es" : ""} to reach ${targetPercentage}%`;
    adviceType = "danger";
  }

  function handleAction(type) {
    onQuickLog(subject.id, type);
    setJustMarked(type);
    setTimeout(() => setJustMarked(null), 1200);
  }

  // Mini circular SVG gauge
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;
  const ringColor = isSafe ? "#4F7A5A" : percentage >= targetPercentage - 5 ? "#B8A08A" : "#A63D40";

  return (
    <div className="group relative bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-6 shadow-xs hover:border-[#B8A08A] hover:shadow-sm transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-xl border bg-[#F8F1F2] text-[#6B1E2D] border-[#E5DCD4]">
              {subject.code || "SUB-101"}
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-xl ${
              isSafe
                ? "bg-[#F0F5F2] text-[#4F7A5A] border border-[#C8DACD]"
                : "bg-[#FAF0F0] text-[#A63D40] border border-[#ECCBCB]"
            }`}>
              {isSafe ? (
                <ShieldCheck className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
              {percentage}%
            </span>
          </div>

          {/* Action Menu (Kebab) */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-xl text-[#75666A] hover:text-[#241A1C] hover:bg-[#FAF6F0] transition-all cursor-pointer"
              aria-label="Course options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-1 w-44 bg-[#FFFDF8] rounded-2xl shadow-xl border border-[#E5DCD4] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onViewDetails(subject.id);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-bold text-[#241A1C] hover:bg-[#FAF6F0] flex items-center gap-2 cursor-pointer"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-[#6B1E2D]" />
                    Full Analytics
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onEdit(subject);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-bold text-[#75666A] hover:bg-[#FAF6F0] flex items-center gap-2 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#B8A08A]" />
                    Edit Subject
                  </button>
                  <div className="my-1 border-t border-[#E5DCD4]" />
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(subject.id);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-bold text-[#A63D40] hover:bg-[#FAF0F0] flex items-center gap-2 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Subject
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Subject Title & Faculty */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3
              onClick={() => onViewDetails(subject.id)}
              className="text-base font-black text-[#241A1C] hover:text-[#6B1E2D] transition-colors cursor-pointer line-clamp-1"
              title={subject.name}
            >
              {subject.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#75666A] mt-1">
              <User className="w-3.5 h-3.5 text-[#B8A08A] shrink-0" />
              <span className="truncate">{subject.faculty || "Course Faculty"}</span>
            </div>
          </div>

          {/* Mini Ring Gauge */}
          <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 54 54">
              <circle
                cx="27"
                cy="27"
                r={radius}
                className="stroke-[#E5DCD4]"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="27"
                cy="27"
                r={radius}
                stroke={ringColor}
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <span className="absolute text-[11px] font-black text-[#241A1C]">
              {Math.round(percentage)}%
            </span>
          </div>
        </div>

        {/* Progress Bar & Class Ratios */}
        <div className="space-y-2 mt-4">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-[#75666A]">
              Attendance Progress
            </span>
            <span className="font-bold text-[#241A1C]">
              {attended} <span className="text-[#75666A] font-normal">/ {total} sessions</span>
            </span>
          </div>

          <div className="relative w-full h-2.5 bg-[#EFE8DC] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isSafe ? "bg-[#4F7A5A]" : "bg-[#A63D40]"
              }`}
              style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
            />
            {/* Target 75% Pin */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#6B1E2D] z-10 opacity-70"
              style={{ left: `${targetPercentage}%` }}
              title={`Target: ${targetPercentage}%`}
            />
          </div>

          <div className="flex justify-between text-[10px] font-bold text-[#75666A]">
            <span>0%</span>
            <span className="text-[#6B1E2D]">Goal: {targetPercentage}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Attended & Missed Chips */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="p-2 rounded-xl bg-[#FAF6F0] border border-[#E5DCD4] flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#75666A]">Present</span>
            <span className="text-xs font-black text-[#4F7A5A]">{attended}</span>
          </div>
          <div className="p-2 rounded-xl bg-[#FAF6F0] border border-[#E5DCD4] flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#75666A]">Missed</span>
            <span className="text-xs font-black text-[#A63D40]">{missed}</span>
          </div>
        </div>

        {/* Smart Bunk / Catch-Up Advice Tag */}
        <div className={`mt-3.5 px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between ${
          adviceType === "safe"
            ? "bg-[#F0F5F2] text-[#2D4C35] border border-[#C8DACD]"
            : adviceType === "warning"
            ? "bg-[#FAF6F0] text-[#75666A] border border-[#D8CBBE]"
            : "bg-[#FAF0F0] text-[#682224] border border-[#ECCBCB]"
        }`}>
          <span className="truncate">{adviceText}</span>
          <span className="text-[10px] uppercase tracking-wider opacity-90 px-1.5 py-0.5 rounded bg-white/70 border border-current shrink-0 ml-1">
            {adviceType === "safe" ? "Relax" : adviceType === "warning" ? "Caution" : "At Risk"}
          </span>
        </div>
      </div>

      {/* Quick Attendance Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-[#E5DCD4]">
        <button
          onClick={() => handleAction("present")}
          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
            justMarked === "present"
              ? "bg-[#4F7A5A] text-white shadow-xs"
              : "bg-[#F0F5F2] hover:bg-[#4F7A5A] text-[#4F7A5A] hover:text-white border border-[#C8DACD]"
          }`}
        >
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{justMarked === "present" ? "Marked!" : "+ Present"}</span>
        </button>

        <button
          onClick={() => handleAction("absent")}
          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
            justMarked === "absent"
              ? "bg-[#A63D40] text-white shadow-xs"
              : "bg-[#FAF0F0] hover:bg-[#A63D40] text-[#A63D40] hover:text-white border border-[#ECCBCB]"
          }`}
        >
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{justMarked === "absent" ? "Marked!" : "+ Absent"}</span>
        </button>
      </div>

    </div>
  );
}

export default SubjectCard;