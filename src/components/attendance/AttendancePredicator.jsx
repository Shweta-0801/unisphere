import { useState } from "react";

function AttendancePredictor() {
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [classesToAttend, setClassesToAttend] = useState("");

  const [result, setResult] = useState(null);

  function calculateAttendance() {
    const attendedClasses = Number(attended);
    const totalClasses = Number(total);
    const upcomingClasses = Number(classesToAttend);

    if (
      totalClasses <= 0 ||
      attendedClasses < 0 ||
      attendedClasses > totalClasses ||
      upcomingClasses < 0
    ) {
      setResult("Please enter valid values.");
      return;
    }

    const futureAttendance =
      ((attendedClasses + upcomingClasses) /
        (totalClasses + upcomingClasses)) *
      100;

    setResult(futureAttendance.toFixed(2));
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Attendance Predictor
        </h2>

        <p className="text-gray-500 mt-1">
          See how your attendance will change if you attend upcoming classes.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Attended Classes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Classes Attended
          </label>

          <input
            type="number"
            min="0"
            value={attended}
            onChange={(event) => setAttended(event.target.value)}
            placeholder="Example: 65"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total Classes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Classes
          </label>

          <input
            type="number"
            min="0"
            value={total}
            onChange={(event) => setTotal(event.target.value)}
            placeholder="Example: 80"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upcoming Classes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upcoming Classes to Attend
          </label>

          <input
            type="number"
            min="0"
            value={classesToAttend}
            onChange={(event) => setClassesToAttend(event.target.value)}
            placeholder="Example: 5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateAttendance}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Predict Attendance
      </button>

      {/* Result */}
      {result !== null && (
        <div className="mt-6 p-5 bg-blue-50 rounded-xl">

          {typeof result === "string" && result.includes("Please") ? (
            <p className="text-red-600 font-medium">
              {result}
            </p>
          ) : (
            <>
              <p className="text-gray-500 text-sm">
                Predicted Attendance
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-1">
                {result}%
              </p>
            </>
          )}

        </div>
      )}

    </div>
  );
}

export default AttendancePredictor;