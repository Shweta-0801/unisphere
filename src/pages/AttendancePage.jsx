import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AttendanceHeader from "../components/attendance/AttendanceHeader";
import AttendanceNavigation from "../components/attendance/AttendanceNavigation";
import OverallStats from "../components/attendance/OverallStats";
import SubjectCard from "../components/attendance/SubjectCard";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import AttendancePredictor from "../components/attendance/AttendancePredictor";
import RecordAttendance from "../components/attendance/RecordAttendance";
import AttendanceCalculator from "../components/attendance/AttendanceCalculator";
import SubjectDetails from "../components/attendance/SubjectDetails";

function AttendancePage() {
  const [activeSection, setActiveSection] = useState("Overview");

  const navigate = useNavigate();

  const subjects = [
    {
      id: 1,
      name: "Data Structures",
      attended: 18,
      total: 20
    },
    {
      id: 2,
      name: "Database Management",
      attended: 16,
      total: 20
    },
    {
      id: 3,
      name: "Java Programming",
      attended: 19,
      total: 22
    },
    {
      id: 4,
      name: "Computer Networks",
      attended: 15,
      total: 18
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 text-blue-600 font-medium hover:underline"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <AttendanceHeader />

      {/* Navigation */}
      <div className="mt-8">
        <AttendanceNavigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {/* Overview */}
      {activeSection === "Overview" && (
        <>
          <OverallStats />

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Subject-wise Attendance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject.name}
                  attended={subject.attended}
                  total={subject.total}
                />
              ))}

            </div>
          </div>
        </>
      )}

      {/* Calendar */}
      {activeSection === "Calendar" && (
        <AttendanceCalendar />
      )}

      {/* Record Attendance */}
      {activeSection === "Record Attendance" && (
        <RecordAttendance />
      )}

      {/* Calculator */}
      {activeSection === "Calculator" && (
        <AttendanceCalculator />
      )}

      {/* Predictor */}
      {activeSection === "Predictor" && (
        <AttendancePredictor />
      )}

      {/* Subject Details */}
      {activeSection === "Subject Details" && (
        <SubjectDetails />
      )}

    </div>
  );
}

export default AttendancePage;