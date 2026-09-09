import { useState } from "react";

function RecordAttendance({ subjects, setSubjects }) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (selectedSubject === "" || status === "") {
      setMessage("Please select a subject and attendance status.");
      return;
    }

    const subjectId = Number(selectedSubject);

    const selectedSubjectData = subjects.find(
      (subject) => subject.id === subjectId
    );

    const updatedSubjects = subjects.map((subject) => {
      if (subject.id !== subjectId) {
        return subject;
      }

      return {
        ...subject,
        attended:
          status === "present"
            ? subject.attended + 1
            : subject.attended,
        total: subject.total + 1
      };
    });

    setSubjects(updatedSubjects);

    setMessage(
      `${status === "present" ? "Present" : "Absent"} marked for ${
        selectedSubjectData.name
      }.`
    );

    setSelectedSubject("");
    setStatus("");
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Record Attendance
        </h2>

        <p className="text-gray-500 mt-1">
          Mark your attendance for a class.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Subject */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Subject
          </label>

          <select
            value={selectedSubject}
            onChange={(event) => {
              setSelectedSubject(event.target.value);
              setMessage("");
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Select a subject
            </option>

            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Attendance Status
          </label>

          <div className="flex gap-6">

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="present"
                checked={status === "present"}
                onChange={(event) => setStatus(event.target.value)}
              />

              <span className="text-gray-700">
                Present
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="absent"
                checked={status === "absent"}
                onChange={(event) => setStatus(event.target.value)}
              />

              <span className="text-gray-700">
                Absent
              </span>
            </label>

          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Mark Attendance
        </button>

      </form>

      {/* Message */}
      {message && (
        <div className="mt-5 p-4 bg-blue-50 rounded-xl">
          <p className="text-blue-700 font-medium">
            {message}
          </p>
        </div>
      )}

    </div>
  );
}

export default RecordAttendance;