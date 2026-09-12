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
    <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-2xl shadow-sm p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#241A1C]">
          Attendance Summary
        </h2>

        <p className="text-[#75666A] mt-1 text-sm">
          A quick overview of your attendance record
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[#75666A]">
            Overall Attendance
          </span>

          <span className="text-lg font-bold text-[#4F7A5A]">
            {percentage}%
          </span>
        </div>

        <div className="w-full h-3 bg-[#EFE8DC] rounded-full overflow-hidden">
          <div
            className="h-3 bg-[#6B1E2D] rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-[#4F7A5A]/10 border border-[#4F7A5A]/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-[#4F7A5A]">
            Present
          </p>

          <p className="text-2xl font-bold text-[#4F7A5A] mt-1">
            {attendance.present}
          </p>
        </div>

        <div className="bg-[#A63D40]/10 border border-[#A63D40]/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-[#A63D40]">
            Absent
          </p>

          <p className="text-2xl font-bold text-[#A63D40] mt-1">
            {attendance.absent}
          </p>
        </div>

        <div className="bg-[#FAF2F3] border border-[#E5DCD4] rounded-xl p-4">
          <p className="text-xs font-semibold text-[#6B1E2D]">
            Total Classes
          </p>

          <p className="text-2xl font-bold text-[#6B1E2D] mt-1">
            {attendance.total}
          </p>
        </div>

      </div>

    </div>
  );
}

export default AttendanceSummary;