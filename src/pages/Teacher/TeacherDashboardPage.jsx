import React from "react";
import TeacherDashboard from "../../components/teacher/TeacherDashboard";

export default function TeacherDashboardPage({ onNavigate }) {
  return (
    <div className="teacher-page-container" style={{ padding: "1.5rem", maxWidth: "1280px", margin: "0 auto" }}>
      <TeacherDashboard onNavigate={onNavigate} />
    </div>
  );
}
