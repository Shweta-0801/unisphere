import OverallStats from "../components/attendance/OverallStats";
import SubjectCard from "../components/attendance/SubjectCard";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import AttendancePredictor from "../components/attendance/AttendancePredictor";

function AttendancePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Attendance
        </h1>

        <p className="text-gray-500 mt-2">
          Track and manage your attendance
        </p>
      </div>

      {/* Overall Attendance */}
      <OverallStats />

      {/* Subject Attendance */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Subject-wise Attendance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SubjectCard
            subject="Data Structures"
            attended={18}
            total={20}
          />

          <SubjectCard
            subject="Database Management"
            attended={16}
            total={20}
          />

          <SubjectCard
            subject="Java Programming"
            attended={19}
            total={22}
          />

          <SubjectCard
            subject="Computer Networks"
            attended={15}
            total={18}
          />
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-8">
        <AttendanceCalendar />
      </div>

      {/* Attendance Predictor */}
      <div className="mt-8">
        <AttendancePredictor />
      </div>

    </div>
  );
}

export default AttendancePage;