import AppLayout from "../../components/layout/AppLayout";
import TeacherDashboard from "../../components/teacher/TeacherDashboard";

export default function TeacherDashboardPage() {
  return (
    <AppLayout activePath="/dashboard">
      <TeacherDashboard />
    </AppLayout>
  );
}
