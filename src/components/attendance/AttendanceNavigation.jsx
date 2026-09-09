function AttendanceNavigation({ activeSection, setActiveSection }) {
  const sections = [
    "Overview",
    "Calendar",
    "Record Attendance",
    "Calculator",
    "Predictor",
    "Subject Details"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-2">
      <div className="flex gap-2 overflow-x-auto">

        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
              activeSection === section
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {section}
          </button>
        ))}

      </div>
    </div>
  );
}

export default AttendanceNavigation;