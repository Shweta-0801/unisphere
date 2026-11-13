import React from "react";
import Assignments from "../../components/teacher/Assignments";

export default function AssignmentsPage({ initialMode = "student", currentStudentUser }) {
  return (
    <div className="teacher-page-container" style={{ padding: "1.5rem", maxWidth: "1280px", margin: "0 auto" }}>
      <Assignments initialMode={initialMode} currentStudentUser={currentStudentUser} />
    </div>
  );
}
