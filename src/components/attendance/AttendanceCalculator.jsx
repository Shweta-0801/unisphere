import { useState } from "react";

function AttendanceCalculator() {
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [requiredPercentage, setRequiredPercentage] = useState("75");
  const [result, setResult] = useState(null);

  function calculateAttendance() {
    const attendedClasses = Number(attended);
    const totalClasses = Number(total);
    const required = Number(requiredPercentage);

    if (
      totalClasses <= 0 ||
      attendedClasses < 0 ||
      attendedClasses > totalClasses
    ) {
      setResult({
        type: "error",
        message: "Please enter valid attendance values."
      });

      return;
    }

    const currentPercentage =
      (attendedClasses / totalClasses) * 100;

    if (currentPercentage >= required) {
      setResult({
        type: "success",
        message: `Your attendance is already above ${required}%.`
      });

      return;
    }

    let classesNeeded = 0;

    while (
      ((attendedClasses + classesNeeded) /
        (totalClasses + classesNeeded)) *
        100 <
      required
    ) {
      classesNeeded++;
    }

    setResult({
      type: "result",
      currentPercentage: currentPercentage.toFixed(2),
      classesNeeded,
      required
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Attendance Calculator
        </h2>

        <p className="text-gray-500 mt-1">
          Find out how many classes you need to attend to reach your target.
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
            Required Attendance
          </label>

          <select
            value={requiredPercentage}
            onChange={(event) =>
              setRequiredPercentage(event.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="75">75%</option>
            <option value="80">80%</option>
            <option value="85">85%</option>
            <option value="90">90%</option>
          </select>
        </div>

      </div>

      <button
        onClick={calculateAttendance}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-6 p-5 rounded-xl bg-blue-50">

          {result.type === "error" && (
            <p className="text-red-600 font-medium">
              {result.message}
            </p>
          )}

          {result.type === "success" && (
            <p className="text-green-600 font-medium">
              {result.message}
            </p>
          )}

          {result.type === "result" && (
            <>
              <p className="text-sm text-gray-500">
                Current Attendance
              </p>

              <p className="text-3xl font-bold text-blue-600 mt-1">
                {result.currentPercentage}%
              </p>

              <p className="text-gray-700 mt-4">
                You need to attend{" "}
                <span className="font-bold">
                  {result.classesNeeded}
                </span>{" "}
                consecutive classes to reach{" "}
                <span className="font-bold">
                  {result.required}%
                </span>.
              </p>
            </>
          )}

        </div>
      )}

    </div>
  );
}

export default AttendanceCalculator;