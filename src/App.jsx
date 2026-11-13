import React, { useState } from "react";
import LostFoundPage from "./pages/LostFoundPage";
import Assignments from "./components/teacher/Assignments";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import MyClasses from "./components/teacher/MyClasses";

export default function App() {
  const [activeModule, setActiveModule] = useState("lostfound");

  const currentStudent = {
    name: "Aanvi Palia",
    rollNo: "2024-CSE-0892",
    department: "Computer Science & Engineering",
    semester: "4th Semester",
  };

  const handleDashboardNavigate = (path) => {
    if (path.includes("assignments")) {
      setActiveModule("assignments");
    } else if (path.includes("classes")) {
      setActiveModule("classes");
    } else if (path.includes("lost-found")) {
      setActiveModule("lostfound");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="unisphere-app-shell">
      {/* Top Universal UniSphere Navigation Bar */}
      <header className="unisphere-universal-navbar" style={{
        backgroundColor: "#2C1820",
        color: "#FAF9F6",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 999
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #6B1E2D, #8B2E3D)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#FFF"
          }}>
            U
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "700", letterSpacing: "0.02em" }}>
              UniSphere
            </div>
            <div style={{ fontSize: "11px", color: "#D8CBBE" }}>
              Aanvi Palia â€¢ member2-lost_and_found
            </div>
          </div>
        </div>

        {/* Module Switcher Buttons */}
        <nav style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setActiveModule("lostfound")}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: activeModule === "lostfound" ? "1px solid #FAF9F6" : "1px solid rgba(255,255,255,0.15)",
              backgroundColor: activeModule === "lostfound" ? "#6B1E2D" : "transparent",
              color: "#FFF",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            ðŸ”  Lost &amp; Found Portal
          </button>

          <button
            type="button"
            onClick={() => setActiveModule("assignments")}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: activeModule === "assignments" ? "1px solid #FAF9F6" : "1px solid rgba(255,255,255,0.15)",
              backgroundColor: activeModule === "assignments" ? "#6B1E2D" : "transparent",
              color: "#FFF",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            ðŸ“  Assignments Portal
          </button>

          <button
            type="button"
            onClick={() => setActiveModule("teacher-dashboard")}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: activeModule === "teacher-dashboard" ? "1px solid #FAF9F6" : "1px solid rgba(255,255,255,0.15)",
              backgroundColor: activeModule === "teacher-dashboard" ? "#6B1E2D" : "transparent",
              color: "#FFF",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            ðŸ‘¨â€ â   Teacher Dashboard
          </button>

          <button
            type="button"
            onClick={() => setActiveModule("classes")}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: activeModule === "classes" ? "1px solid #FAF9F6" : "1px solid rgba(255,255,255,0.15)",
              backgroundColor: activeModule === "classes" ? "#6B1E2D" : "transparent",
              color: "#FFF",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            ðŸ‘¥ My Classes &amp; Students
          </button>
        </nav>
      </header>

      {/* Main Module Content */}
      <main style={{ minHeight: "calc(100vh - 65px)", backgroundColor: "#F8F3EA", padding: "16px 20px" }}>
        {activeModule === "lostfound" && (
          <LostFoundPage currentUser={currentStudent} />
        )}

        {activeModule === "assignments" && (
          <Assignments
            initialMode="student"
            currentStudentUser={currentStudent}
          />
        )}

        {activeModule === "teacher-dashboard" && (
          <TeacherDashboard onNavigate={handleDashboardNavigate} />
        )}

        {activeModule === "classes" && (
          <MyClasses />
        )}
      </main>
    </div>
  );
}
