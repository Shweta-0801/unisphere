import React, { useState, useEffect } from "react";
import PerformanceNavbar from "./PerformanceNavbar";
import PerformanceOverview from "./PerformanceOverview";
import ClassPerformance from "./ClassPerformance";
import StudentMarks from "./StudentMarks";
import PerformanceAnalysis from "./PerformanceAnalysis";
import PerformanceStats from "./PerformanceStats";
import {
  teacherProfile,
  classesList,
  loadStoredStudents,
  saveStoredStudents,
  getTeacherDashboardStats
} from "../../data/teacherDashboardData";
import "./AcademicPerformance.css";

export default function AcademicPerformance() {
  // Active sub-navigation tab: "overview" | "classes" | "marks" | "performance" | "statistics"
  const [activeTab, setActiveTab] = useState("overview");

  // Selected class section: "CSE-A", "CSE-B", "CSE-C", "CSE-D"
  const [selectedClass, setSelectedClass] = useState(classesList[0]);

  // Students dataset loaded from localStorage or default
  const [students, setStudents] = useState(() => loadStoredStudents());

  // Listen to cross-component sync
  useEffect(() => {
    const handleSync = () => {
      setStudents(loadStoredStudents());
    };
    window.addEventListener("storage", handleSync);
    return () => window.removeEventListener("storage", handleSync);
  }, []);

  // Compute live dashboard stats
  const stats = getTeacherDashboardStats(students);

  // Update marks for a specific student
  const handleUpdateMarks = (studentId, updatedMarks) => {
    setStudents((prev) => {
      const updated = prev.map((st) => {
        if (st.id === studentId) {
          return {
            ...st,
            marks: {
              ...st.marks,
              ...updatedMarks
            }
          };
        }
        return st;
      });

      saveStoredStudents(updated);
      return updated;
    });
  };

  return (
    <div className="perf-mgmt-page-root">
      {/* ================= TOP SUB-NAVBAR ================= */}
      <PerformanceNavbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        stats={stats}
      />

      {/* ================= TAB CONTENT ================= */}
      <main className="perf-mgmt-body">
        {activeTab === "overview" && (
          <PerformanceOverview
            students={students}
            stats={stats}
            onSelectClass={setSelectedClass}
            onTabChange={setActiveTab}
          />
        )}

        {activeTab === "classes" && (
          <ClassPerformance
            students={students}
            onSelectClass={setSelectedClass}
            onTabChange={setActiveTab}
          />
        )}

        {activeTab === "marks" && (
          <StudentMarks
            students={students}
            selectedClass={selectedClass}
            onSelectClass={setSelectedClass}
            onUpdateMarks={handleUpdateMarks}
          />
        )}

        {activeTab === "performance" && (
          <PerformanceAnalysis
            students={students}
            onSelectClass={setSelectedClass}
            onTabChange={setActiveTab}
          />
        )}

        {activeTab === "statistics" && (
          <PerformanceStats
            students={students}
            onSelectClass={setSelectedClass}
            onTabChange={setActiveTab}
          />
        )}
      </main>
    </div>
  );
}
