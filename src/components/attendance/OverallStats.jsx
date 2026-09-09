import { CheckCircle, XCircle, Percent } from "lucide-react";

function OverallStats() {
  const totalClasses = 80;
  const attendedClasses = 65;
  const missedClasses = totalClasses - attendedClasses;

  const attendancePercentage = Math.round(
    (attendedClasses / totalClasses) * 100
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Overall Attendance */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Percent className="text-blue-600" size={24} />
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Overall Attendance
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              {attendancePercentage}%
            </h2>
          </div>
        </div>

      </div>


      {/* Classes Attended */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <CheckCircle className="text-green-600" size={24} />
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Classes Attended
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              {attendedClasses}
            </h2>
          </div>
        </div>

      </div>


      {/* Classes Missed */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <XCircle className="text-red-600" size={24} />
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Classes Missed
            </p>

            <h2 className="text-3xl font-bold text-gray-800">
              {missedClasses}
            </h2>
          </div>
        </div>

      </div>

    </div>
  );
}

export default OverallStats;