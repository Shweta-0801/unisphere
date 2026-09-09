import { useState } from "react";

function SubjectDetails() {
  const [selectedSubject, setSelectedSubject] = useState("");

  const subjects = [
    {
      id: 1,
      name: "Data Structures",
      teacher: "Dr. Sharma",
      attended: 18,
      total: 20,
      room: "Block A - 201"
    },
    {
      id: 2,
      name: "Database Management",
      teacher: "Prof. Mehta",
      attended: 16,
      total: 20,
      room: "Block B - 105"
    },
    {
      id: 3,
      name: "Java Programming",
      teacher: "Dr. Kapoor",
      attended: 19,
      total: 22,
      room: "Block A - 305"
    },
    {
      id: 4,
      name: "Computer Networks",
      teacher: "Prof. Singh",
      attended: 15,
      total: 18,
      room: "Block C - 102"
    }
  ];

  function handleSubjectChange(event) {
    setSelectedSubject(event.target.value);
  }

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
          View detailed information about a subject
        </p>
      </div>

      {/* Subject Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Subject
        </label>

        <select
          value={selectedSubject}
          onChange={handleSubjectChange}
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

      {/* Details */}
      {subject && (
        <div className="border border-gray-200 rounded-xl p-5">

          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {subject.name}
              </h3>

              <p className="text-gray-500 mt-1">
                {subject.teacher}
              </p>
            </div>

            <span className="text-blue-600 font-semibold">
              {Math.round(
                (subject.attended / subject.total) * 100
              )}
              %
            </span>
          </div>

          {/* Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

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
                Classroom
              </p>

              <p className="text-lg font-semibold text-blue-600 mt-1">
                {subject.room}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default SubjectDetails;