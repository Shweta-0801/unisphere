import AppLayout from "../../components/layout/AppLayout";
import Assignments from "../../components/teacher/Assignments";

export default function AssignmentsPage() {
  return (
    <AppLayout activePath="/teacher/assignments">
      <Assignments />
    </AppLayout>
  );
}