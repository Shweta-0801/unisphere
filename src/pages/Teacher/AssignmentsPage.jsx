import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Assignments from "../../components/teacher/Assignments";

export default function AssignmentsPage({ initialMode = "student" }) {
  const activePath = initialMode === "faculty" ? "/teacher/assignments" : "/assignments";
  return (
    <AppLayout activePath={activePath}>
      <Assignments initialMode={initialMode} />
    </AppLayout>
  );
}
