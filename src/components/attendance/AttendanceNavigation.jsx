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
    { id: "Calendar", label: "Calendar", icon: CalendarDays },
    { id: "Record Attendance", label: "Quick Register", icon: CheckCircle2 },
    { id: "Calculator", label: "Bunk Calculator", icon: Calculator },
    { id: "Predictor", label: "Predictor", icon: TrendingUp },
    { id: "Subject Details", label: "Subject Details", icon: BookOpenCheck, badge: atRiskCount > 0 ? `${atRiskCount} at risk` : null }
  ];

  return (
    <div className="att-nav-bar">
      <nav className="att-nav-track" aria-label="Attendance navigation tabs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`att-nav-btn ${isActive ? "active" : ""}`}
            >
              <Icon style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="att-nav-badge danger">
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