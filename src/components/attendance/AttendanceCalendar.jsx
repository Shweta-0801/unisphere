import { useState } from "react";

function AttendanceCalendar() {
  const [selectedDate, setSelectedDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState("");

  function markAttendance(status) {
    if (selectedDate === "") {
      setMessage("Please select a date first.");
      return;
    }

    setAttendance({
      ...attendance,
      [selectedDate]: status
    });

    setMessage(
      `${status === "present" ? "Present" : "Absent"} marked for ${selectedDate}.`
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Attendance Calendar
        </h2>

        <p className="text-gray-500 mt-1">
          Select a date to view or mark attendance.
        </p>
      </div>

      <div className="max-w-md">

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>

        <input
          type="date"
          value={selectedDate}
          onChange={(event) => {
            setSelectedDate(event.target.value);
            setMessage("");
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-3 mt-5">

          <button
            onClick={() => markAttendance("present")}
            className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Present
          </button>

          <button
            onClick={() => markAttendance("absent")}
            className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition"
          >
            Absent
          </button>

        </div>

      </div>

      {selectedDate && attendance[selectedDate] && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">

          <p className="text-sm text-gray-500">
            Attendance for {selectedDate}
          </p>

          <p
            className={`text-lg font-semibold mt-1 ${
              attendance[selectedDate] === "present"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {attendance[selectedDate] === "present"
              ? "Present"
              : "Absent"}
          </p>

        </div>
      )}

      {message && (
        <p className="mt-4 text-blue-600 font-medium">
          {message}
        </p>
      )}

    </div>
  );
}

export default AttendanceCalendar;