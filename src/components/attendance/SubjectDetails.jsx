import { useState } from "react";

function SubjectDetails({ subjects }) {
  const [selectedSubject, setSelectedSubject] = useState("");

  const subject = subjects.find(
    (item) => item.id === Number(selectedSubject)
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Subject Details
        </h2>

        <p className="text-gray-500 mt-1">
          View detailed attendance information for a subject.
        </p>
      </div>

      {/* Subject Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Subject
        </label>

        <select
          value={selectedSubject}
          onChange={(event) => setSelectedSubject(event.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            Select a subject
          </option>

          {subjects.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Information */}
      {subject && (
        <div className="border border-gray-200 rounded-xl p-5">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {subject.name}
              </h3>

              <p className="text-gray-500 mt-1">
                Detailed attendance record
              </p>
            </div>

            <div className="text-3xl font-bold text-blue-600">
              {subject.total > 0
                ? Math.round(
                    (subject.attended / subject.total) * 100
                  )
                : 0}
              %
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Classes Attended
              </p>

              <p className="text-2xl font-bold text-green-600 mt-1">
                {subject.attended}
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Classes Missed
              </p>

              <p className="text-2xl font-bold text-red-600 mt-1">
                {subject.total - subject.attended}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Total Classes
              </p>

              <p className="text-2xl font-bold text-blue-600 mt-1">
                {subject.total}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default SubjectDetails;