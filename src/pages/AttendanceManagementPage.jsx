import AppLayout from "../components/layout/AppLayout";
import AttendanceManagement from "../components/attendanceManagement/AttendanceManagement";

export default function AttendanceManagementPage() {
  return (
    <AppLayout activePath="/attendance-management">
      <AttendanceManagement />
    </AppLayout>
  );
}