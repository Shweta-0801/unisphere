function AttendanceHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Attendance
        </h1>

        <p className="text-gray-500 mt-1">
          Track your attendance and stay on top of your classes.
        </p>
      </div>

      <div className="bg-white px-5 py-3 rounded-xl shadow-sm">
        <p className="text-sm text-gray-500">
          Current Semester
        </p>

        <p className="font-semibold text-gray-800">
          Semester 1
        </p>
      </div>

    </div>
  );
}

export default AttendanceHeader;