import {
  LayoutDashboard,
  CalendarDays,
  CheckCircle2,
  Calculator,
  TrendingUp,
  BookOpenCheck
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./Attendance.css";

function AttendanceNavigation({ activeSection, setActiveSection, atRiskCount = 0 }) {
  const { t } = useLanguage();

  const navItems = [
    { id: "Overview", label: t("attendance.overviewTab", "Overview"), icon: LayoutDashboard },
    { id: "Predictor", label: t("attendance.predictorTab", "Predictor & What-If"), icon: TrendingUp, highlight: true },
    { id: "Calculator", label: t("attendance.calculatorTab", "Bunk Calculator"), icon: Calculator },
    { id: "Record Attendance", label: t("attendance.registerTab", "Quick Register"), icon: CheckCircle2 },
    { id: "Calendar", label: t("attendance.calendarTab", "Schedule Calendar"), icon: CalendarDays },
    { id: "Subject Details", label: t("attendance.breakdownTab", "Course Breakdown"), icon: BookOpenCheck, badge: atRiskCount > 0 ? t("attendance.atRiskBadge", "{count} at risk", { count: atRiskCount }) : null }
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
              <Icon style={{ width: "1rem", height: "1rem", flexShrink: 0, color: isActive ? "var(--att-accent-light)" : "var(--att-text-muted)" }} />
              <span>{item.label}</span>
              {item.highlight && !isActive && (
                <span className="att-nav-pulse" />
              )}
              {item.badge && (
                <span className={`att-nav-badge ${isActive ? "" : "danger"}`}>
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