import { useState } from "react";

function AttendanceCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const attendanceData = {
    1: "present",
    2: "present",
    3: "absent",
    4: "present",
    5: "present",
    6: "holiday",
    7: "holiday",
    8: "present",
    9: "absent",
    10: "present",
    11: "present",
    12: "present",
    13: "absent",
    14: "holiday",
    15: "present",
    16: "present",
    17: "present",
    18: "absent",
    19: "present",
    20: "present",
    21: "holiday",
    22: "holiday",
    23: "present",
    24: "present",
    25: "absent",
    26: "present",
    27: "present",
    28: "present",
    29: "absent",
    30: "present"
  };

  const daysInMonth = 30;

  function handleDateClick(day) {
    setSelectedDate(day);
  }

  function getDayClass(status) {
    if (status === "present") {
      return "bg-green-100 text-green-700 hover:bg-green-200";
    }

    if (status === "absent") {
      return "bg-red-100 text-red-700 hover:bg-red-200";
    }

    if (status === "holiday") {
      return "bg-gray-100 text-gray-500 hover:bg-gray-200";
    }

    return "bg-white text-gray-700 hover:bg-blue-50";
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Attendance Calendar
        </h2>

        <p className="text-gray-500 mt-1">
          View your daily attendance
        </p>
      </div>

      {/* Month */}
      <div className="flex items-center justify-between mb-5">
        <button className="px-3 py-2 rounded-lg hover:bg-gray-100">
          ←
        </button>

        <h3 className="text-lg font-semibold text-gray-800">
          September 2026
        </h3>

        <button className="px-3 py-2 rounded-lg hover:bg-gray-100">
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          )
        )}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">

        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const status = attendanceData[day];

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`h-12 rounded-lg font-medium transition ${getDayClass(
                status
              )}`}
            >
              {day}
            </button>
          );
        })}

      </div>

      {/* Selected Date */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-500">
            Selected date
          </p>

          <p className="text-lg font-semibold text-blue-600">
            September {selectedDate}, 2026
          </p>

          <p className="text-sm mt-1 text-gray-600">
            Status:{" "}
            <span className="font-medium">
              {attendanceData[selectedDate] || "No record"}
            </span>
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-5 mt-6 text-sm">

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          Present
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          Absent
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
          Holiday
        </div>

      </div>

    </div>
  );
}

export default AttendanceCalendar;