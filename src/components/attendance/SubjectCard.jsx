function SubjectCard({ subject, attended, total }) {
  const missed = total - attended;

  const percentage =
    total > 0
      ? Math.round((attended / total) * 100)
      : 0;

  let status = "Good";
  let statusColor = "text-green-600";
  let progressColor = "bg-green-500";

  if (percentage < 75) {
    status = "Low";
    statusColor = "text-red-600";
    progressColor = "bg-red-500";
  } else if (percentage < 85) {
    status = "Average";
    statusColor = "text-yellow-600";
    progressColor = "bg-yellow-500";
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">

      <div className="flex items-start justify-between">

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {subject}
          </h3>

          <p className={`text-sm font-medium mt-1 ${statusColor}`}>
            {status} attendance
          </p>
        </div>

        <p className="text-2xl font-bold text-gray-800">
          {percentage}%
        </p>

      </div>

      {/* Progress Bar */}
      <div className="mt-5">
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className={`h-2 rounded-full ${progressColor}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Attendance Information */}
      <div className="grid grid-cols-2 gap-4 mt-5">

        <div className="bg-green-50 rounded-xl p-3">
          <p className="text-sm text-gray-500">
            Attended
          </p>

          <p className="text-lg font-semibold text-green-600">
            {attended}
          </p>
        </div>

        <div className="bg-red-50 rounded-xl p-3">
          <p className="text-sm text-gray-500">
            Missed
          </p>

          <p className="text-lg font-semibold text-red-600">
            {missed}
          </p>
        </div>

      </div>

      <p className="text-sm text-gray-500 mt-4">
        Total classes: {total}
      </p>

    </div>
  );
}

export default SubjectCard;