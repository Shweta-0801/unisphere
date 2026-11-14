import React from "react";
import { LayoutDashboard, Users, Award, TrendingUp, BarChart3, AlertCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

/**
 * PerformanceNavbar - Clean sub-navigation for Academic Performance Module
 * Uses identical design language and structure as AttendanceNavbar
 */
export default function PerformanceNavbar({ activeTab, onTabChange, stats }) {
  const { t } = useLanguage();

  const navTabs = [
    {
      id: "overview",
      label: t("academicPerformance.overviewTab", "Overview"),
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: "classes",
      label: t("academicPerformance.classesTab", "Classes"),
      icon: Users,
      badge: "4 Sections"
    },
    {
      id: "marks",
      label: t("academicPerformance.marksTab", "Marks"),
      icon: Award,
      badge: `${stats?.totalStudents || 80} Students`
    },
    {
      id: "performance",
      label: t("academicPerformance.analysisTab", "Performance"),
      icon: TrendingUp,
      badge: stats?.needingImprovement ? `${stats.needingImprovement} Remedial` : null,
      badgeAlert: true
    },
    {
      id: "statistics",
      label: t("academicPerformance.statsTab", "Statistics"),
      icon: BarChart3,
      badge: "Rankings"
    }
  ];

  return (
    <nav className="tchr-subnav-container" aria-label="Academic Performance Sections">
      <div className="tchr-subnav-list">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`tchr-subnav-btn perf-tab ${isActive ? "active" : ""}`}
            >
              <Icon size={16} className="tchr-subnav-icon" />
              <span className="tchr-subnav-label">{tab.label}</span>

              {tab.badge && (
                <span className={`tchr-subnav-badge ${tab.badgeAlert ? "badge-alert" : ""}`}>
                  {tab.badge}
                </span>
              )}

              {isActive && <span className="tchr-subnav-indicator perf-indicator" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
