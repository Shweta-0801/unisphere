import React from "react";
import { LayoutDashboard, Users, CheckCircle2, Calendar, BarChart3, AlertTriangle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

/**
 * AttendanceNavbar - Clean sub-navigation for Teacher Attendance Management
 * Viva-friendly React component demonstrating state-driven tab switching
 */
export default function AttendanceNavbar({ activeTab, onTabChange, stats }) {
  const { t } = useLanguage();

  const navTabs = [
    {
      id: "overview",
      label: t("attendanceMgmt.overviewTab", "Overview"),
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: "classes",
      label: t("attendanceMgmt.classesTab", "Classes"),
      icon: Users,
      badge: "4 Sections"
    },
    {
      id: "attendance",
      label: t("attendanceMgmt.markTab", "Attendance"),
      icon: CheckCircle2,
      badge: `${stats?.totalStudents || 80} Students`
    },
    {
      id: "calendar",
      label: t("attendanceMgmt.calendarTab", "Calendar"),
      icon: Calendar,
      badge: "18 Lectures"
    },
    {
      id: "statistics",
      label: t("attendanceMgmt.statsTab", "Statistics"),
      icon: BarChart3,
      badge: stats?.shortageCount ? `${stats.shortageCount} Alerts` : null,
      badgeAlert: true
    }
  ];

  return (
    <nav className="tchr-subnav-container" aria-label="Attendance Sections">
      <div className="tchr-subnav-list">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`tchr-subnav-btn ${isActive ? "active" : ""}`}
            >
              <Icon size={16} className="tchr-subnav-icon" />
              <span className="tchr-subnav-label">{tab.label}</span>

              {tab.badge && (
                <span className={`tchr-subnav-badge ${tab.badgeAlert ? "badge-alert" : ""}`}>
                  {tab.badge}
                </span>
              )}

              {isActive && <span className="tchr-subnav-indicator" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
