import AppLayout from "../components/layout/AppLayout";
import AcademicPerformance from "../components/academicPerformance/AcademicPerformance";

export default function AcademicPerformancePage() {
  return (
    <AppLayout activePath="/academic-performance">
      <AcademicPerformance />
    </AppLayout>
  );
}