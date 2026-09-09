function AttendanceSummary() {
  const attendance = {
    present: 65,
    absent: 15,
    total: 80
  };

  const percentage = Math.round(
    (attendance.present / attendance.total) * 100
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Attendance Summary
        </h2>

        <p className="text-gray-500 mt-1">
          A quick overview of your attendance record
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Overall Attendance
          </span>

          <span className="text-lg font-bold text-blue-600">
            {percentage}%
          </span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-blue-600 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Present
          </p>

          <p className="text-2xl font-bold text-green-600 mt-1">
            {attendance.present}
          </p>
        </div>

        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Absent
          </p>

          <p className="text-2xl font-bold text-red-600 mt-1">
            {attendance.absent}
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Total Classes
          </p>

          <p className="text-2xl font-bold text-blue-600 mt-1">
            {attendance.total}
          </p>
        </div>

      </div>

    </div>
  );
}

export default AttendanceSummary;