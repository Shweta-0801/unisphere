import React, { useState, useEffect } from "react";
import AttendanceNavbar from "./AttendanceNavbar";
import AttendanceOverview from "./AttendanceOverview";
import ClassAttendance from "./ClassAttendance";
import StudentAttendance from "./StudentAttendance";
import AttendanceCalendar from "./AttendanceCalendar";
import AttendanceStats from "./AttendanceStats";
import {
  teacherProfile,
  classesList,
  loadStoredStudents,
  saveStoredStudents,
  getTeacherDashboardStats
} from "../../data/teacherDashboardData";
import "./AttendanceManagement.css";

export default function AttendanceManagement() {
  // Navigation tab state: "overview" | "classes" | "attendance" | "calendar" | "statistics"
  const [activeTab, setActiveTab] = useState("overview");

  // Selected class for student-level attendance or calendar: "CSE-A", "CSE-B", "CSE-C", "CSE-D"
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

  // Update attendance for a single student (toggle or increment/decrement)
  const handleUpdateAttendance = (studentId, forceStatus) => {
    setStudents((prev) => {
      const updated = prev.map((st) => {
        if (st.id === studentId) {
          let newPresent = st.attendance.present;
          if (forceStatus === true) {
            newPresent = Math.min(st.attendance.total, st.attendance.present + 1);
          } else if (forceStatus === false) {
            newPresent = Math.max(0, st.attendance.present - 1);
          } else {
            // Toggle
            newPresent = st.attendance.present < st.attendance.total
              ? st.attendance.present + 1
              : Math.max(0, st.attendance.present - 1);
          }
          return {
            ...st,
            attendance: {
              ...st.attendance,
              present: newPresent
            }
          };
        }
        return st;
      });

      saveStoredStudents(updated);
      return updated;
    });
  };

  // Save roll call attendance session
  const handleSaveAttendance = (className, date) => {
    saveStoredStudents(students);
  };

  return (
    <div className="att-mgmt-page-root">
      {/* ================= TOP SUB-NAVBAR ================= */}
      <AttendanceNavbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        stats={stats}
      />

      {/* ================= TAB CONTENT ================= */}
      <main className="att-mgmt-body">
        {activeTab === "overview" && (
          <AttendanceOverview
            students={students}
            stats={stats}
            onSelectClass={setSelectedClass}
            onTabChange={setActiveTab}
          />
        )}

        {activeTab === "classes" && (
          <ClassAttendance
            students={students}
            onSelectClass={setSelectedClass}
            onTabChange={setActiveTab}
          />
        )}

        {activeTab === "attendance" && (
          <StudentAttendance
            students={students}
            selectedClass={selectedClass}
            onSelectClass={setSelectedClass}
            onUpdateAttendance={handleUpdateAttendance}
            onSaveAttendance={handleSaveAttendance}
          />
        )}

        {activeTab === "calendar" && (
          <AttendanceCalendar
            students={students}
            selectedClass={selectedClass}
            onSelectClass={setSelectedClass}
          />
        )}

        {activeTab === "statistics" && (
          <AttendanceStats
            students={students}
            onSelectClass={setSelectedClass}
            onTabChange={setActiveTab}
          />
        )}
      </main>
    </div>
  );
}
