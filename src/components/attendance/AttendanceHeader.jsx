import { Plus, Target, Sparkles, Calendar, Award, ShieldCheck, AlertCircle } from "lucide-react";

function AttendanceHeader({
  targetPercentage,
  setTargetPercentage,
  onOpenAddModal,
  totalSubjects,
  safeSubjectsCount
}) {
  const atRiskCount = Math.max(0, totalSubjects - safeSubjectsCount);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#48121E] via-[#6B1E2D] to-[#351019] text-white p-6 md:p-8 shadow-xl shadow-[#6B1E2D]/15">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 rounded-full bg-[#B8A08A]/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Title & Academic Stats */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D8CBBE] text-xs font-bold border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#B8A08A]" />
              Smart Campus Academic Tracker
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D8CBBE] text-xs font-bold border border-white/15">
              <Calendar className="w-3.5 h-3.5 text-[#B8A08A]" />
              Semester 4 • 2026
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
            Attendance & Eligibility Hub
          </h1>

          <p className="text-xs md:text-sm text-[#D8CBBE] leading-relaxed">
            Monitor daily subject attendance, compute safe bunks, predict final exam eligibility, and keep your record safely above university thresholds.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-bold border border-white/10 text-white">
              <ShieldCheck className="w-4 h-4 text-[#4F7A5A]" />
              <span>
                <strong>{safeSubjectsCount} of {totalSubjects}</strong> Courses Safe
              </span>
            </div>

            {atRiskCount > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#A63D40]/30 backdrop-blur-md text-xs font-bold border border-[#A63D40]/40 text-[#FAF0F0]">
                <AlertCircle className="w-4 h-4 text-[#A63D40]" />
                <span>
                  <strong>{atRiskCount}</strong> Course at Shortage Risk
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Target Selector & Add Subject */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 self-start lg:self-auto shrink-0">
          {/* Target Threshold Selector */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-inner">
            <Target className="w-4 h-4 text-[#B8A08A] shrink-0" />
            <span className="text-[#D8CBBE]">Target:</span>
            <select
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(Number(e.target.value))}
              className="bg-transparent text-white font-black text-xs focus:outline-none cursor-pointer"
            >
              <option value={75} className="text-[#241A1C] bg-[#FFFDF8]">75% (Standard Cutoff)</option>
              <option value={80} className="text-[#241A1C] bg-[#FFFDF8]">80% (Strict Academic)</option>
              <option value={85} className="text-[#241A1C] bg-[#FFFDF8]">85% (Honors Goal)</option>
              <option value={65} className="text-[#241A1C] bg-[#FFFDF8]">65% (Medical Condonation)</option>
            </select>
          </div>

          {/* Add Subject Button */}
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FFFDF8] text-[#6B1E2D] hover:bg-[#FAF6F0] font-black text-xs shadow-md shadow-black/10 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Course</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttendanceHeader;