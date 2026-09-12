import { CheckCircle, AlertTriangle, XCircle, ShieldCheck, TrendingUp, Sparkles, BookOpenCheck, Flame } from "lucide-react";

function OverallStats({ totalClasses, attendedClasses, targetPercentage = 75 }) {
  const missedClasses = Math.max(0, totalClasses - attendedClasses);
  const percentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 1000) / 10 : 0;
  const isSafe = percentage >= targetPercentage;

  // Calculate Safe Bunks or Catch-up classes
  let advisorMessage;
  let advisorType; // safe, warning, danger
  let safeBunksCount = 0;
  let classesNeededCount = 0;

  if (totalClasses === 0) {
    advisorMessage = "No classes recorded yet. Start logging your subject sessions!";
    advisorType = "safe";
  } else if (isSafe) {
    const maxTotalClassesForSameAttended = Math.floor(attendedClasses / (targetPercentage / 100));
    safeBunksCount = Math.max(0, maxTotalClassesForSameAttended - totalClasses);

    if (safeBunksCount > 0) {
      advisorMessage = `You are comfortably above target! You can safely miss up to ${safeBunksCount} total classes across subjects and still stay above ${targetPercentage}%.`;
      advisorType = "safe";
    } else {
      advisorMessage = `You are right on the edge of your ${targetPercentage}% target. Missing your next class will put you at risk!`;
      advisorType = "warning";
    }
  } else {
    const diff = targetPercentage * totalClasses - 100 * attendedClasses;
    classesNeededCount = Math.max(1, Math.ceil(diff / (100 - targetPercentage)));
    advisorMessage = `Attendance Warning: You must attend the next ${classesNeededCount} consecutive classes without missing any to restore your standing to ${targetPercentage}%.`;
    advisorType = "danger";
  }

  // SVG Circular Gauge calculations
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  let gaugeColor = "#4F7A5A"; // success
  if (percentage < targetPercentage) {
    gaugeColor = "#A63D40"; // error
  } else if (percentage < targetPercentage + 5) {
    gaugeColor = "#B8A08A"; // champagne taupe
  }

  return (
    <div className="space-y-5">
      {/* Main Grid: Hero Gauge Card + 4 Mini Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Hero Gauge & Standing Card */}
        <div className="lg:col-span-5 bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-6 md:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5DCD4]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#B8A08A]">
                  Aggregate Standing
                </span>
                <h3 className="text-lg font-black text-[#241A1C] mt-0.5">
                  Semester Performance
                </h3>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                isSafe
                  ? "bg-[#F0F5F2] text-[#4F7A5A] border border-[#C8DACD]"
                  : "bg-[#FAF0F0] text-[#A63D40] border border-[#ECCBCB]"
              }`}>
                {isSafe ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4F7A5A]" />
                    Exam Eligible
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-[#A63D40]" />
                    Shortage Risk
                  </>
                )}
              </span>
            </div>

            {/* Circular Gauge Center & Ratios */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-6 my-6">
              {/* Radial Progress Ring */}
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="stroke-[#E5DCD4]"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke={gaugeColor}
                    strokeWidth="9"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-[#241A1C] tracking-tight">
                    {percentage}%
                  </span>
                  <span className="text-[10px] font-bold text-[#75666A] uppercase tracking-wider">
                    Goal: {targetPercentage}%
                  </span>
                </div>
              </div>

              {/* Ratios Breakdown */}
              <div className="space-y-2.5 w-full sm:w-auto">
                <div className="flex items-center justify-between sm:justify-start gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#75666A]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4F7A5A] shrink-0" />
                    Present Ratio:
                  </span>
                  <span className="font-black text-[#241A1C]">
                    {totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0}%
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-start gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#75666A]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A63D40] shrink-0" />
                    Absence Ratio:
                  </span>
                  <span className="font-black text-[#241A1C]">
                    {totalClasses > 0 ? Math.round((missedClasses / totalClasses) * 100) : 0}%
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-start gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#75666A]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6B1E2D] shrink-0" />
                    Target Clearance:
                  </span>
                  <span className={`font-black ${isSafe ? "text-[#4F7A5A]" : "text-[#A63D40]"}`}>
                    {percentage >= targetPercentage ? "+" : ""}
                    {(percentage - targetPercentage).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Linear Progress Bar */}
          <div>
            <div className="w-full h-2 bg-[#EFE8DC] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(100, percentage)}%`,
                  backgroundColor: gaugeColor
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-[#75666A] mt-1.5">
              <span>0%</span>
              <span className="text-[#6B1E2D]">{targetPercentage}% Passing Cutoff</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* 4 Crisp Metric Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Attended Card */}
          <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#75666A]">
                Classes Attended
              </span>
              <div className="w-9 h-9 rounded-2xl bg-[#F0F5F2] text-[#4F7A5A] border border-[#C8DACD] flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#241A1C]">
                  {attendedClasses}
                </span>
                <span className="text-xs font-bold text-[#4F7A5A]">
                  {totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0}% rate
                </span>
              </div>
              <p className="text-xs text-[#75666A] mt-1">
                Completed lecture & practical sessions
              </p>
            </div>
          </div>

          {/* Missed Card */}
          <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#75666A]">
                Classes Missed
              </span>
              <div className="w-9 h-9 rounded-2xl bg-[#FAF0F0] text-[#A63D40] border border-[#ECCBCB] flex items-center justify-center">
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#241A1C]">
                  {missedClasses}
                </span>
                <span className="text-xs font-bold text-[#A63D40]">
                  {totalClasses > 0 ? Math.round((missedClasses / totalClasses) * 100) : 0}% missed
                </span>
              </div>
              <p className="text-xs text-[#75666A] mt-1">
                Absences, leaves, and missed roll calls
              </p>
            </div>
          </div>

          {/* Total Classes Card */}
          <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#75666A]">
                Total Classes
              </span>
              <div className="w-9 h-9 rounded-2xl bg-[#FAF6F0] text-[#6B1E2D] border border-[#E5DCD4] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#241A1C]">
                  {totalClasses}
                </span>
                <span className="text-xs font-bold text-[#6B1E2D]">
                  Conducted
                </span>
              </div>
              <p className="text-xs text-[#75666A] mt-1">
                Total delivered sessions this term
              </p>
            </div>
          </div>

          {/* Safe Bunk Buffer / Remedial Required Card */}
          <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-3xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#75666A]">
                {isSafe ? "Safe Bunk Allowance" : "Catch-Up Classes"}
              </span>
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center border ${
                isSafe
                  ? "bg-[#FAF6F0] text-[#B8A08A] border-[#D8CBBE]"
                  : "bg-[#FAF0F0] text-[#A63D40] border-[#ECCBCB]"
              }`}>
                {isSafe ? <Sparkles className="w-4 h-4" /> : <Flame className="w-4 h-4" />}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#241A1C]">
                  {isSafe ? safeBunksCount : classesNeededCount}
                </span>
                <span className={`text-xs font-bold ${
                  isSafe ? "text-[#4F7A5A]" : "text-[#A63D40]"
                }`}>
                  {isSafe ? "Classes can be skipped" : "Consecutive needed"}
                </span>
              </div>
              <p className="text-xs text-[#75666A] mt-1">
                {isSafe ? `Without dropping below ${targetPercentage}%` : "To restore standard eligibility"}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Smart Academic Advisor Banner */}
      <div className={`p-4 md:p-5 rounded-2xl border flex items-start gap-4 transition-all ${
        advisorType === "safe"
          ? "bg-[#F0F5F2] border-[#C8DACD] text-[#2D4C35]"
          : advisorType === "warning"
          ? "bg-[#FAF6F0] border-[#D8CBBE] text-[#75666A]"
          : "bg-[#FAF0F0] border-[#ECCBCB] text-[#682224]"
      }`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
          advisorType === "safe"
            ? "bg-white text-[#4F7A5A] border border-[#C8DACD]"
            : advisorType === "warning"
            ? "bg-white text-[#B8A08A] border border-[#D8CBBE]"
            : "bg-white text-[#A63D40] border border-[#ECCBCB]"
        }`}>
          {advisorType === "safe" ? (
            <ShieldCheck className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm font-black tracking-tight text-[#241A1C]">
              Institutional Attendance Guidelines & Insights
            </h4>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/70 border border-current">
              {advisorType === "safe" ? "Safe Zone" : advisorType === "warning" ? "Caution" : "Action Required"}
            </span>
          </div>
          <p className="text-xs md:text-sm mt-1 leading-relaxed opacity-90">
            {advisorMessage}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OverallStats;