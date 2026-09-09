function OverallStats({ totalClasses, attendedClasses }) {
  const missedClasses = totalClasses - attendedClasses;

  const attendancePercentage =
    totalClasses > 0
      ? Math.round((attendedClasses / totalClasses) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Overall Attendance */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        <p className="text-sm text-gray-500">
          Overall Attendance
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {attendancePercentage}%
        </h2>

        <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${attendancePercentage}%` }}
          ></div>
        </div>

      </div>

      {/* Classes Attended */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        <p className="text-sm text-gray-500">
          Classes Attended
        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">
          {attendedClasses}
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Out of {totalClasses} classes
        </p>

      </div>

      {/* Classes Missed */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        <p className="text-sm text-gray-500">
          Classes Missed
        </p>

        <h2 className="text-3xl font-bold text-red-600 mt-2">
          {missedClasses}
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          Out of {totalClasses} classes
        </p>

      </div>

    </div>
  );
}

export default OverallStats;