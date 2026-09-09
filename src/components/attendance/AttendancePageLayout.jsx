import AttendanceSummary from "./AttendanceSummary";
import RecordAttendance from "./RecordAttendance";
import AttendanceCalculator from "./AttendanceCalculator";
import SubjectDetails from "./SubjectDetails";

function AttendancePageLayout() {
  return (
    <div className="space-y-8">

      {/* Attendance Summary */}
      <AttendanceSummary />

      {/* Record Attendance */}
      <RecordAttendance />

      {/* Calculator */}
      <AttendanceCalculator />

      {/* Subject Details */}
      <SubjectDetails />

    </div>
  );
}

export default AttendancePageLayout;