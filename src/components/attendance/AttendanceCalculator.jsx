import { useState } from "react";
import {
  Calculator,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Sliders,
  BookmarkCheck,
  Zap,
  Info
} from "lucide-react";

function AttendanceCalculator({ subjects = [] }) {
  const [mode, setMode] = useState("subject"); // 'subject' | 'custom'
  const [selectedSubjectId, setSelectedSubjectId] = useState(() => {
    return subjects.length > 0 ? subjects[0].id : "";
  });
  const [customAttended, setCustomAttended] = useState("18");
  const [customTotal, setCustomTotal] = useState("24");
  const [targetPercentage, setTargetPercentage] = useState(75);

  // Simulation slider: test what happens if student attends next N classes
  const [simulateNext, setSimulateNext] = useState(6);
  const [simulateAttendCount, setSimulateAttendCount] = useState(6); // How many of next N will be attended

  const selectedSub = subjects.find((s) => s.id === Number(selectedSubjectId)) || subjects[0];

  const attendedNum = mode === "subject" ? (selectedSub?.attended || 0) : (Number(customAttended) || 0);
  const totalNum = mode === "subject" ? (selectedSub?.total || 0) : (Number(customTotal) || 0);
  const target = Number(targetPercentage) || 75;

  const isValid = totalNum > 0 && attendedNum >= 0 && attendedNum <= totalNum;
  const currentPercentage = isValid ? (attendedNum / totalNum) * 100 : 0;
  const isAboveTarget = currentPercentage >= target;

  // Catch-up classes needed
  let classesNeeded = 0;
  if (isValid && !isAboveTarget && target < 100) {
    const diff = target * totalNum - 100 * attendedNum;
    classesNeeded = Math.max(1, Math.ceil(diff / (100 - target)));
  }

  // Safe bunks allowed
  let safeBunks = 0;
  if (isValid && isAboveTarget && target > 0) {
    const maxTotalClasses = Math.floor(attendedNum / (target / 100));
    safeBunks = Math.max(0, maxTotalClasses - totalNum);
  }

  // Simulation calculations
  const simN = Number(simulateNext) || 0;
  const simAtt = Math.min(simN, Math.max(0, Number(simulateAttendCount) || 0));
  const simulatedAttended = attendedNum + simAtt;
  const simulatedTotal = totalNum + simN;
  const simulatedPct = simulatedTotal > 0 ? ((simulatedAttended / simulatedTotal) * 100) : 0;
  const simDelta = simulatedPct - currentPercentage;

  // Best case (100% of next N)
  const bestPct = (totalNum + simN) > 0 ? (((attendedNum + simN) / (totalNum + simN)) * 100) : 0;
  // Worst case (0% of next N)
  const worstPct = (totalNum + simN) > 0 ? ((attendedNum / (totalNum + simN)) * 100) : 0;

  const enrolledCourseName = selectedSub ? selectedSub.name : "Custom";

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Selector */}
      <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-6 md:p-8 shadow-sm transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5DCD4]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF2F3] text-[#6B1E2D] flex items-center justify-center shadow-xs">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black text-[#241A1C] tracking-tight">
                  Smart Attendance & Bunk Calculator
                </h2>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[11px] font-bold rounded-full bg-[#EFE8DC] text-[#75666A]">
                  Real-time Math
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#75666A] mt-0.5">
                Calculate exact safe bunk allowances, consecutive catch-up requirements, and test what-if class attendance.
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex p-1 rounded-2xl bg-[#EFE8DC] self-start md:self-auto">
            <button
              onClick={() => setMode("subject")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === "subject"
                  ? "bg-[#FFFDF8] text-[#6B1E2D] shadow-xs"
                  : "text-[#75666A] hover:text-[#241A1C]"
              }`}
            >
              Enrolled Courses
            </button>
            <button
              onClick={() => setMode("custom")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === "custom"
                  ? "bg-[#FFFDF8] text-[#6B1E2D] shadow-xs"
                  : "text-[#75666A] hover:text-[#241A1C]"
              }`}
            >
              Custom Numbers
            </button>
          </div>
        </div>

        {/* Configuration Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
          {mode === "subject" ? (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#75666A] mb-2">
                Select Enrolled Course
              </label>
              <select
                value={selectedSubjectId || (selectedSub?.id || "")}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F3EA] border border-[#E5DCD4] rounded-xl text-sm font-semibold text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#B8A08A] transition-all cursor-pointer"
              >
                {subjects.map((sub) => {
                  const subPct = sub.total > 0 ? ((sub.attended / sub.total) * 100).toFixed(1) : 0;
                  return (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} — {sub.attended}/{sub.total} ({subPct}%)
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#75666A] mb-2">
                Classes Attended
              </label>
              <input
                type="number"
                min="0"
                value={customAttended}
                onChange={(e) => setCustomAttended(e.target.value)}
                placeholder="e.g. 18"
                className="w-full px-3.5 py-2.5 bg-[#F8F3EA] border border-[#E5DCD4] rounded-xl text-sm font-semibold text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#B8A08A] transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#75666A] mb-2">
              Total Classes Conducted
            </label>
            <input
              type="number"
              min="0"
              value={mode === "subject" ? (selectedSub?.total || 0) : customTotal}
              onChange={(e) => setCustomTotal(e.target.value)}
              disabled={mode === "subject"}
              placeholder="e.g. 24"
              className={`w-full px-3.5 py-2.5 border rounded-xl text-sm font-semibold transition-all ${
                mode === "subject"
                  ? "bg-[#EFE8DC]/60 text-[#75666A] border-[#E5DCD4] cursor-not-allowed"
                  : "bg-[#F8F3EA] border-[#E5DCD4] text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#B8A08A]"
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#75666A] mb-2">
              Target Attendance Goal
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[65, 75, 80, 85].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setTargetPercentage(pct)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    targetPercentage === pct
                      ? "bg-[#6B1E2D] text-white border-[#6B1E2D] shadow-xs"
                      : "bg-[#F8F3EA] text-[#75666A] border-[#E5DCD4] hover:border-[#B8A08A]"
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Calculation Dashboard */}
        {isValid ? (
          <div className="mt-8 pt-8 border-t border-[#E5DCD4] space-y-6">
            
            {/* Top Cards: Standing & Safe Bunks / Catch-Up */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Card: Current Performance Gauge */}
              <div className={`lg:col-span-5 rounded-2xl p-6 border transition-all ${
                isAboveTarget
                  ? "bg-[#4F7A5A]/5 border-[#4F7A5A]/30"
                  : "bg-[#A63D40]/5 border-[#A63D40]/30"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#75666A]">
                    Current Performance
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black ${
                    isAboveTarget
                      ? "bg-[#4F7A5A]/15 text-[#4F7A5A]"
                      : "bg-[#A63D40]/15 text-[#A63D40]"
                  }`}>
                    {isAboveTarget ? (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Above Target
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Shortage Warning
                      </>
                    )}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black text-[#241A1C] tracking-tight">
                    {currentPercentage.toFixed(1)}%
                  </span>
                  <span className="text-xs font-bold text-[#75666A]">
                    ({attendedNum} attended of {totalNum})
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="relative w-full h-3 bg-[#EFE8DC] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isAboveTarget ? "bg-[#4F7A5A]" : "bg-[#A63D40]"
                      }`}
                      style={{ width: `${Math.min(100, currentPercentage)}%` }}
                    />
                    {/* Target Pin */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-[#241A1C] z-10"
                      style={{ left: `${target}%` }}
                      title={`Target: ${target}%`}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-[#75666A] mt-1.5">
                    <span>0%</span>
                    <span className="text-[#6B1E2D] font-extrabold">Target: {target}%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Context Advice */}
                <div className="mt-5 p-3.5 rounded-xl bg-[#FFFDF8] border border-[#E5DCD4] text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#241A1C]">
                    <BookmarkCheck className="w-4 h-4 text-[#B8A08A]" />
                    <span>Target Difference:</span>
                    <span className={currentPercentage >= target ? "text-[#4F7A5A]" : "text-[#A63D40]"}>
                      {currentPercentage >= target ? "+" : ""}
                      {(currentPercentage - target).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-[#75666A] mt-1 leading-relaxed">
                    {isAboveTarget
                      ? `You are safely meeting the ${target}% threshold required for standard semester exam admittance.`
                      : `You are ${(target - currentPercentage).toFixed(1)}% short of the ${target}% cutoff. Remedial attendance required.`}
                  </p>
                </div>
              </div>

              {/* Right Card: Safe Bunk vs Catch-up Action Engine */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-[#F8F3EA] rounded-2xl p-6 border border-[#E5DCD4]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-[#B8A08A]" />
                    <h3 className="text-base font-bold text-[#241A1C]">
                      Action Recommendation Engine
                    </h3>
                  </div>

                  {isAboveTarget ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-[#4F7A5A]/10 border border-[#4F7A5A]/30 flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-[#4F7A5A]/20 text-[#4F7A5A] flex items-center justify-center shrink-0 mt-0.5">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-[#241A1C]">
                              Safe Bunk Buffer: Up to {safeBunks} class{safeBunks !== 1 ? "es" : ""}
                            </h4>
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#4F7A5A]/20 text-[#4F7A5A]">
                              Zero Risk
                            </span>
                          </div>
                          <p className="text-xs text-[#75666A] mt-1 leading-relaxed">
                            {safeBunks > 0
                              ? `You can safely miss ${safeBunks} consecutive class${safeBunks > 1 ? "es" : ""} in ${enrolledCourseName} and your attendance will not fall below ${target}%.`
                              : `You are exactly at your minimum ${target}% threshold! Do not bunk any classes right now.`}
                          </p>
                        </div>
                      </div>

                      {safeBunks > 0 && (
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-[#FFFDF8] rounded-xl border border-[#E5DCD4]">
                            <span className="text-[#75666A] block font-medium">After 1 Bunk:</span>
                            <span className="text-base font-bold text-[#241A1C]">
                              {(((attendedNum) / (totalNum + 1)) * 100).toFixed(1)}%
                            </span>
                            <span className="text-[10px] text-[#4F7A5A] block font-bold">Still Safe</span>
                          </div>
                          <div className="p-3 bg-[#FFFDF8] rounded-xl border border-[#E5DCD4]">
                            <span className="text-[#75666A] block font-medium">After {safeBunks} Bunks:</span>
                            <span className="text-base font-bold text-[#241A1C]">
                              {(((attendedNum) / (totalNum + safeBunks)) * 100).toFixed(1)}%
                            </span>
                            <span className="text-[10px] text-[#B8A08A] block font-bold">Borderline Minimum</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-[#A63D40]/10 border border-[#A63D40]/30 flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-[#A63D40]/20 text-[#A63D40] flex items-center justify-center shrink-0 mt-0.5">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-[#241A1C]">
                              Must Attend Next {classesNeeded} Consecutive Class{classesNeeded !== 1 ? "es" : ""}
                            </h4>
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#A63D40]/20 text-[#A63D40]">
                              Required
                            </span>
                          </div>
                          <p className="text-xs text-[#75666A] mt-1 leading-relaxed">
                            You must attend {classesNeeded} consecutive class${classesNeeded > 1 ? "es" : ""} without missing any to restore your standing in {enrolledCourseName} back to {target}%.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-[#FFFDF8] rounded-xl border border-[#E5DCD4]">
                          <span className="text-[#75666A] block font-medium">If you miss 1 more:</span>
                          <span className="text-base font-bold text-[#A63D40]">
                            {(((attendedNum) / (totalNum + 1)) * 100).toFixed(1)}%
                          </span>
                          <span className="text-[10px] text-[#A63D40] block font-bold">Drops deeper</span>
                        </div>
                        <div className="p-3 bg-[#FFFDF8] rounded-xl border border-[#E5DCD4]">
                          <span className="text-[#75666A] block font-medium">After attending {classesNeeded}:</span>
                          <span className="text-base font-bold text-[#4F7A5A]">
                            {(((attendedNum + classesNeeded) / (totalNum + classesNeeded)) * 100).toFixed(1)}%
                          </span>
                          <span className="text-[10px] text-[#4F7A5A] block font-bold">Clears target!</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5DCD4] flex items-center justify-between text-xs text-[#75666A]">
                  <span className="inline-flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#B8A08A]" />
                    University criteria: 75% required for end-semester registration
                  </span>
                  <span className="font-bold text-[#241A1C]">
                    Formula: (A + x) / (T + x) ≥ {target}%
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Interactive Sandbox: What-If Attendance Simulator */}
            <div className="bg-gradient-to-br from-[#48121E] via-[#6B1E2D] to-[#351019] text-[#FFFDF8] rounded-2xl p-6 md:p-7 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 text-[#B8A08A] flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#FFFDF8] flex items-center gap-2">
                      Interactive What-If Attendance Simulator
                    </h3>
                    <p className="text-xs text-[#D8CBBE]">
                      Simulate hypothetical future classes and see your projected attendance in real-time.
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-[#FFFDF8]">
                  <Sparkles className="w-3.5 h-3.5 text-[#B8A08A]" />
                  Live Projection
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                {/* Upcoming classes slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#D8CBBE]">Number of Upcoming Classes:</span>
                    <span className="text-white px-2 py-0.5 rounded bg-white/20 font-mono">
                      {simN} classes
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={simN}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setSimulateNext(val);
                      if (simulateAttendCount > val) setSimulateAttendCount(val);
                    }}
                    className="w-full accent-[#B8A08A] cursor-pointer h-2 bg-white/20 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-[#D8CBBE]/70 font-medium">
                    <span>1 class</span>
                    <span>15 classes</span>
                    <span>30 classes</span>
                  </div>
                </div>

                {/* Planned attendance slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#D8CBBE]">Classes you plan to attend:</span>
                    <span className="text-[#D8CBBE] px-2 py-0.5 rounded bg-white/20 border border-white/20 font-mono">
                      {simAtt} of {simN} ({simN > 0 ? Math.round((simAtt / simN) * 100) : 0}%)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={simN}
                    value={simAtt}
                    onChange={(e) => setSimulateAttendCount(Number(e.target.value))}
                    className="w-full accent-[#B8A08A] cursor-pointer h-2 bg-white/20 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-[#D8CBBE]/70 font-medium">
                    <span>0 (Miss all)</span>
                    <span>{Math.round(simN / 2)} (Attend half)</span>
                    <span>{simN} (Attend all)</span>
                  </div>
                </div>
              </div>

              {/* Simulation Result Stat Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                
                {/* Result under your plan */}
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D8CBBE] block">
                      Under Your Plan
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">
                        {simulatedPct.toFixed(1)}%
                      </span>
                      <span className={`text-xs font-bold ${simDelta >= 0 ? "text-[#4F7A5A]" : "text-[#A63D40]"}`}>
                        {simDelta >= 0 ? "+" : ""}{simDelta.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#D8CBBE]/80">
                      {simulatedAttended}/{simulatedTotal} total
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      simulatedPct >= target
                        ? "bg-[#4F7A5A]/30 text-[#FFFDF8] border border-[#4F7A5A]/50"
                        : "bg-[#A63D40]/30 text-[#FFFDF8] border border-[#A63D40]/50"
                    }`}>
                      {simulatedPct >= target ? "Safe" : "Shortage"}
                    </span>
                  </div>
                </div>

                {/* Best Case (100% of upcoming) */}
                <div className="p-4 rounded-xl bg-white/10 border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B8A08A] block">
                      Best Case (Attend all {simN})
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">
                        {bestPct.toFixed(1)}%
                      </span>
                      <span className="text-xs font-bold text-[#4F7A5A]">
                        +{(bestPct - currentPercentage).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 text-xs text-[#D8CBBE]/80">
                    Max achievable with next {simN} classes
                  </div>
                </div>

                {/* Worst Case (0% of upcoming) */}
                <div className="p-4 rounded-xl bg-white/10 border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A63D40] block">
                      Worst Case (Miss all {simN})
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#A63D40]">
                        {worstPct.toFixed(1)}%
                      </span>
                      <span className="text-xs font-bold text-[#A63D40]">
                        -{(currentPercentage - worstPct).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 text-xs text-[#D8CBBE]/80">
                    Outcome if all upcoming classes are skipped
                  </div>
                </div>

              </div>

            </div>

          </div>
        ) : (
          <div className="mt-6 p-6 rounded-2xl bg-[#FAF2F3] border border-[#E5DCD4] text-center">
            <AlertTriangle className="w-8 h-8 text-[#A63D40] mx-auto mb-2" />
            <p className="text-sm font-bold text-[#241A1C]">
              Please enter valid attendance numbers
            </p>
            <p className="text-xs text-[#75666A] mt-1">
              Classes attended cannot exceed total classes conducted, and total classes must be greater than zero.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default AttendanceCalculator;