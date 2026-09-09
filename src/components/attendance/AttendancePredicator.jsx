import { useState } from "react";

function AttendancePredictor() {
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [upcomingClasses, setUpcomingClasses] = useState("");
  const [classesToAttend, setClassesToAttend] = useState("");
  const [result, setResult] = useState(null);

  function predictAttendance() {
    const attendedClasses = Number(attended);
    const totalClasses = Number(total);
    const upcoming = Number(upcomingClasses);

    if (
      totalClasses <= 0 ||
      attendedClasses < 0 ||
      attendedClasses > totalClasses ||
      upcoming < 0
    ) {
      setResult({
        type: "error",
        message: "Please enter valid attendance values."
      });

      return;
    }

    const currentPercentage =
      (attendedClasses / totalClasses) * 100;

    if (upcoming === 0) {
      setResult({
        type: "result",
        percentage: currentPercentage.toFixed(2),
        classesToAttend: 0
      });

      return;
    }

    const missedUpcoming = upcoming;
    const futurePercentage =
      (attendedClasses / (totalClasses + missedUpcoming)) * 100;

    setClassesToAttend(
      Math.max(
        0,
        Math.ceil(
          (75 * (totalClasses + upcoming) - 100 * attendedClasses) /
            25
        )
      )
    );

    setResult({
      type: "result",
      percentage: futurePercentage.toFixed(2),
      classesToAttend: Math.min(
        upcoming,
        Math.max(
          0,
          Math.ceil(
            (75 * (totalClasses + upcoming) -
              100 * attendedClasses) /
              25
          )
        )
      )
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Attendance Predictor
        </h2>

        <p className="text-gray-500 mt-1">
          See how your attendance could change with upcoming classes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Classes Attended
          </label>

          <input
            type="number"
            min="0"
            value={attended}
            onChange={(event) => setAttended(event.target.value)}
            placeholder="Example: 60"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upcoming Classes
          </label>

          <input
            type="number"
            min="0"
            value={upcomingClasses}
            onChange={(event) =>
              setUpcomingClasses(event.target.value)
            }
            placeholder="Example: 10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      <button
        onClick={predictAttendance}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Predict Attendance
      </button>

      {result && (
        <div className="mt-6 p-5 rounded-xl bg-blue-50">

          {result.type === "error" && (
            <p className="text-red-600 font-medium">
              {result.message}
            </p>
          )}

          {result.type === "result" && (
            <>
              <p className="text-sm text-gray-500">
                Projected Attendance
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-1">
                {result.percentage}%
              </p>

              <p className="text-gray-700 mt-4">
                You need to attend{" "}
                <span className="font-bold">
                  {result.classesToAttend}
                </span>{" "}
                of the upcoming classes to maintain or reach 75%
                attendance.
              </p>
            </>
          )}

        </div>
      )}

    </div>
  );
}

export default AttendancePredictor;