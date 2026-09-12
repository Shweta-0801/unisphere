import { useState } from "react";
import {
  TrendingUp,
  Award,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Sliders,
  ArrowRight,
  Calculator,
  Calendar,
  Zap,
  Info,
  ChevronRight
} from "lucide-react";

function AttendancePredictor({ subjects = [], targetPercentage = 75 }) {
  const [selectedSubjectId, setSelectedSubjectId] = useState("all");
  const [upcomingClasses, setUpcomingClasses] = useState(12);
  const [attendRate, setAttendRate] = useState(100); // 0 to 100% of remaining classes attended

  // Compute selected stats
  let attended = 0;
  let total = 0;

  if (selectedSubjectId === "all") {
    attended = subjects.reduce((sum, s) => sum + s.attended, 0);
    total = subjects.reduce((sum, s) => sum + s.total, 0);
  } else {
    const sub = subjects.find((s) => s.id === Number(selectedSubjectId));
    if (sub) {
      attended = sub.attended;
      total = sub.total;
    }
  }

  const currentPct = total > 0 ? (attended / total) * 100 : 0;
  const upcoming = Number(upcomingClasses) || 0;
  const projectedTotal = total + upcoming;

  // Dynamic simulation based on attendRate slider
  const simulatedAttendedUpcoming = Math.round((upcoming * attendRate) / 100);
  const projectedAttended = attended + simulatedAttendedUpcoming;
  const projectedPct = projectedTotal > 0 ? (projectedAttended / projectedTotal) * 100 : 0;
  const isProjectedSafe = projectedPct >= targetPercentage;

  // Calculate Safe Bunks remaining in upcoming
  // Max total classes = floor(attended_final / target_ratio)
  // Or: how many of `upcoming` can be missed while attending (upcoming - missed) keeps >= target
  // target * projectedTotal <= 100 * (attended + upcoming - missed)
  // missed <= attended + upcoming - (target * projectedTotal / 100)
  const minRequiredToPass = Math.ceil((targetPercentage * projectedTotal - 100 * attended) / 100);
  const minRequiredClamped = Math.max(0, minRequiredToPass);
  const canAchieveTarget = minRequiredClamped <= upcoming;
  const safeBunksInUpcoming = canAchieveTarget ? Math.max(0, upcoming - minRequiredClamped) : 0;

  // Catch-up calculation for current standing: how many consecutive classes to attend to reach target
  let consecutiveNeeded = 0;
  if (currentPct < targetPercentage && targetPercentage < 100) {
    // (attended + x) / (total + x) >= target/100
    // 100 * attended + 100 * x >= target * total + target * x
    // x * (100 - target) >= target * total - 100 * attended
    consecutiveNeeded = Math.ceil((targetPercentage * total - 100 * attended) / (100 - targetPercentage));
    consecutiveNeeded = Math.max(1, consecutiveNeeded);
  }

  // Pre-calculated scenarios
  const scenarios = [
    {
      label: "Best Case (100% Attendance)",
      rate: 100,
      attended: attended + upcoming,
      pct: projectedTotal > 0 ? ((attended + upcoming) / projectedTotal) * 100 : 0,
      note: `Attend all ${upcoming} classes`
    },
    {
      label: "Good Discipline (85% Attendance)",
      rate: 85,
      attended: attended + Math.round(upcoming * 0.85),
      pct: projectedTotal > 0 ? ((attended + Math.round(upcoming * 0.85)) / projectedTotal) * 100 : 0,
      note: `Attend ${Math.round(upcoming * 0.85)} of ${upcoming} classes`
    },
    {
      label: "Minimum Safe Clearance",
      rate: canAchieveTarget ? Math.round((minRequiredClamped / upcoming) * 100) : 0,
      attended: attended + minRequiredClamped,
      pct: projectedTotal > 0 ? ((attended + minRequiredClamped) / projectedTotal) * 100 : 0,
      note: canAchieveTarget ? `Must attend at least ${minRequiredClamped} classes` : "Target unreachable"
    },
    {
      label: "Zero Effort (0% Attendance)",
      rate: 0,
      attended: attended,
      pct: projectedTotal > 0 ? (attended / projectedTotal) * 100 : 0,
      note: `Skip all ${upcoming} classes`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#48121E] via-[#6B1E2D] to-[#351019] rounded-3xl p-6 sm:p-8 text-[#FFFDF8] shadow-lg shadow-[#6B1E2D]/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/15">
              <Sparkles size={24} className="text-[#B8A08A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  Smart Attendance Predictor & Simulator
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 border border-white/20 text-[#D8CBBE]">
                  Predictive v2
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#D8CBBE] mt-1">
                Simulate your attendance trajectory, test what-if bunk scenarios, and ensure semester exam clearance.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-xs font-bold self-start sm:self-auto text-[#FFFDF8]">
            <Award size={16} className="text-[#B8A08A]" />
            <span>Target Threshold: {targetPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Predictor Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Controls & What-If Simulator (7 cols) */}
        <div className="lg:col-span-7 bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#E5DCD4] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DCD4]">
            <div className="flex items-center gap-2">
              <Sliders size={18} className="text-[#6B1E2D]" />
              <h3 className="text-base font-bold text-[#241A1C]">
                Simulation Parameters
              </h3>
            </div>
            <span className="text-xs text-[#75666A] font-medium">
              Adjust values to preview live outcome
            </span>
          </div>

          {/* Subject Scope */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#75666A] mb-2">
              Course / Subject Scope
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full px-4 py-3 bg-[#F8F3EA] border border-[#E5DCD4] rounded-xl text-sm font-semibold text-[#241A1C] focus:outline-none focus:ring-2 focus:ring-[#B8A08A] focus:bg-[#FFFDF8] transition cursor-pointer"
            >
              <option value="all">Overall (All Combined Semester Subjects)</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.code || "CS"}) — Currently {sub.total > 0 ? Math.round((sub.attended / sub.total) * 100) : 0}%
                </option>
              ))}
            </select>
          </div>

          {/* Upcoming Classes Slider */}
          <div className="bg-[#F8F3EA] p-5 rounded-2xl border border-[#E5DCD4] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#241A1C]">
                Classes Remaining This Semester
              </span>
              <span className="text-sm font-black text-[#6B1E2D] bg-[#FAF2F3] px-3 py-1 rounded-lg border border-[#E5DCD4]">
                {upcomingClasses} Lectures
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={upcomingClasses}
              onChange={(e) => setUpcomingClasses(Number(e.target.value))}
              className="w-full accent-[#6B1E2D] cursor-pointer h-2 bg-[#E5DCD4] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-[#75666A] font-medium">
              <span>1 Class</span>
              <span>20 Classes</span>
              <span>40 Classes (Full Term)</span>
            </div>
          </div>

          {/* Attendance Behavior Simulation */}
          <div className="bg-[#F8F3EA] p-5 rounded-2xl border border-[#E5DCD4] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#241A1C]">
                Your Planned Attendance Rate for Remaining Classes
              </span>
              <span className="text-sm font-black text-[#6B1E2D] bg-[#FAF2F3] px-3 py-1 rounded-lg border border-[#E5DCD4]">
                {attendRate}% ({simulatedAttendedUpcoming} of {upcoming})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={attendRate}
              onChange={(e) => setAttendRate(Number(e.target.value))}
              className="w-full accent-[#6B1E2D] cursor-pointer h-2 bg-[#E5DCD4] rounded-lg"
            />
            
            {/* Quick preset buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-[#75666A] mr-1">Quick Presets:</span>
              <button
                type="button"
                onClick={() => setAttendRate(100)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  attendRate === 100
                    ? "bg-[#6B1E2D] text-white"
                    : "bg-[#FFFDF8] border border-[#E5DCD4] text-[#75666A] hover:bg-[#F8F3EA]"
                }`}
              >
                100% (No Bunks)
              </button>
              <button
                type="button"
                onClick={() => setAttendRate(80)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  attendRate === 80
                    ? "bg-[#6B1E2D] text-white"
                    : "bg-[#FFFDF8] border border-[#E5DCD4] text-[#75666A] hover:bg-[#F8F3EA]"
                }`}
              >
                80% (Moderate)
              </button>
              <button
                type="button"
                onClick={() => setAttendRate(50)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  attendRate === 50
                    ? "bg-[#6B1E2D] text-white"
                    : "bg-[#FFFDF8] border border-[#E5DCD4] text-[#75666A] hover:bg-[#F8F3EA]"
                }`}
              >
                50% (High Bunk)
              </button>
              <button
                type="button"
                onClick={() => setAttendRate(0)}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  attendRate === 0
                    ? "bg-[#A63D40] text-white"
                    : "bg-[#FFFDF8] border border-[#E5DCD4] text-[#75666A] hover:bg-[#F8F3EA]"
                }`}
              >
                0% (Skip All)
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Projected Outcome & Health Gauge (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Main Outcome Card */}
          <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#E5DCD4] shadow-xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DCD4]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#75666A]">
                  Forecast Result
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    isProjectedSafe
                      ? "bg-[#4F7A5A]/10 text-[#4F7A5A] border-[#4F7A5A]/30"
                      : "bg-[#A63D40]/10 text-[#A63D40] border-[#A63D40]/30"
                  }`}
                >
                  {isProjectedSafe ? "Eligible for Exams ✓" : "Shortage Warning ⚠"}
                </span>
              </div>

              {/* Big Percentage Readout */}
              <div className="mt-6 text-center">
                <div className="text-[11px] font-bold text-[#75666A] uppercase tracking-widest">
                  Projected Final Attendance
                </div>
                <div
                  className={`text-5xl sm:text-6xl font-black mt-2 tracking-tight ${
                    isProjectedSafe ? "text-[#4F7A5A]" : "text-[#A63D40]"
                  }`}
                >
                  {projectedPct.toFixed(1)}%
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-[#75666A]">
                  <span>Current: {currentPct.toFixed(1)}%</span>
                  <span>→</span>
                  <span className={projectedPct >= currentPct ? "text-[#4F7A5A] font-bold" : "text-[#A63D40] font-bold"}>
                    {projectedPct >= currentPct ? `+${(projectedPct - currentPct).toFixed(1)}%` : `${(projectedPct - currentPct).toFixed(1)}%`}
                  </span>
                </div>
              </div>

              {/* Trajectory Bar */}
              <div className="mt-6">
                <div className="h-3 w-full bg-[#EFE8DC] rounded-full overflow-hidden relative">
                  {/* Target Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-[#241A1C] z-10"
                    style={{ left: `${targetPercentage}%` }}
                    title={`Target: ${targetPercentage}%`}
                  />
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isProjectedSafe ? "bg-[#4F7A5A]" : "bg-[#A63D40]"
                    }`}
                    style={{ width: `${Math.min(100, projectedPct)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#75666A] mt-1.5 font-medium">
                  <span>0%</span>
                  <span className="font-bold text-[#241A1C]">Target: {targetPercentage}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Prediction Breakdown */}
            <div className="mt-6 pt-4 border-t border-[#E5DCD4] space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-[#75666A]">
                <span>Final Projected Classes:</span>
                <span className="font-bold text-[#241A1C]">{projectedAttended} of {projectedTotal} attended</span>
              </div>
              <div className="flex items-center justify-between text-[#75666A]">
                <span>Allowed Bunks in Next {upcoming}:</span>
                <span className="font-bold text-[#6B1E2D]">{safeBunksInUpcoming} safe bunks</span>
              </div>
              {currentPct < targetPercentage && consecutiveNeeded > 0 && (
                <div className="p-2.5 rounded-xl bg-[#A63D40]/10 border border-[#A63D40]/30 text-[#A63D40] text-[11px] font-semibold flex items-center gap-2">
                  <AlertTriangle size={14} className="shrink-0 text-[#A63D40]" />
                  <span>Must attend next {consecutiveNeeded} consecutive classes to recover to {targetPercentage}%.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Matrix Cards */}
      <div>
        <div className="mb-4">
          <h3 className="text-base font-bold text-[#241A1C]">
            End-of-Term Scenarios Comparison
          </h3>
          <p className="text-xs text-[#75666A]">
            Pre-computed projections comparing different student attendance commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenarios.map((sc, i) => {
            const meets = sc.pct >= targetPercentage;
            return (
              <div
                key={i}
                className="bg-[#FFFDF8] rounded-2xl p-5 border border-[#E5DCD4] shadow-2xs hover:border-[#B8A08A]/60 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#75666A]">
                      Scenario {i + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        meets
                          ? "bg-[#4F7A5A]/10 text-[#4F7A5A]"
                          : "bg-[#A63D40]/10 text-[#A63D40]"
                      }`}
                    >
                      {meets ? "Clear" : "Shortage"}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-[#241A1C]">
                    {sc.label}
                  </div>

                  <div
                    className={`text-3xl font-black mt-2 tracking-tight ${
                      meets ? "text-[#4F7A5A]" : "text-[#A63D40]"
                    }`}
                  >
                    {sc.pct.toFixed(1)}%
                  </div>

                  <p className="text-xs text-[#75666A] mt-1">
                    {sc.note}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5DCD4] text-[11px] font-semibold text-[#75666A] flex items-center justify-between">
                  <span>Final: {sc.attended}/{projectedTotal}</span>
                  <span className={meets ? "text-[#4F7A5A] font-bold" : "text-[#A63D40] font-bold"}>
                    {meets ? "Permitted" : "Barred"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AttendancePredictor;