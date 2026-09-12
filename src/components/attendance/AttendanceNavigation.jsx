import {
  LayoutDashboard,
  CalendarDays,
  CheckCircle2,
  Calculator,
  TrendingUp,
  BookOpenCheck
} from "lucide-react";

function AttendanceNavigation({ activeSection, setActiveSection, atRiskCount = 0 }) {
  const navItems = [
    { id: "Overview", label: "Overview", icon: LayoutDashboard },
    { id: "Predictor", label: "Predictor & What-If", icon: TrendingUp, highlight: true },
    { id: "Calculator", label: "Bunk Calculator", icon: Calculator },
    { id: "Record Attendance", label: "Quick Register", icon: CheckCircle2 },
    { id: "Calendar", label: "Schedule Calendar", icon: CalendarDays },
    { id: "Subject Details", label: "Course Breakdown", icon: BookOpenCheck, badge: atRiskCount > 0 ? `${atRiskCount} at risk` : null }
  ];

  return (
    <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-2xl p-1.5 shadow-xs overflow-x-auto no-scrollbar">
      <nav className="flex items-center gap-1.5 min-w-max" aria-label="Attendance navigation tabs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#6B1E2D] text-white shadow-xs"
                  : "text-[#75666A] hover:text-[#241A1C] hover:bg-[#FAF6F0]"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#D8CBBE]" : "text-[#75666A]"}`} />
              <span>{item.label}</span>
              {item.highlight && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8A08A] animate-pulse" />
              )}
              {item.badge && (
                <span className={`px-2 py-0.5 text-[10px] font-black rounded-full ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[#FAF0F0] text-[#A63D40] border border-[#ECCBCB]"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default AttendanceNavigation;