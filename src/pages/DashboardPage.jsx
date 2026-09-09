import { CalendarCheck, MessageSquare, Search, BookOpen, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-blue-600">
          UniSphere
        </h1>

        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
          <LogOut size={20} />
          Logout
        </button>

      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to UniSphere
          </h2>

          <p className="text-gray-500 mt-2">
            Your smart campus management platform
          </p>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Attendance */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">

            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <CalendarCheck className="text-blue-600" size={24} />
            </div>

            <h3 className="text-xl font-semibold text-gray-800">
              Attendance
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Check your attendance and track your classes.
            </p>

            <button
              onClick={() => navigate("/attendance")}
              className="mt-5 text-blue-600 font-medium hover:underline"
            >
              Open Attendance →
            </button>

          </div>

          {/* Complaints */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">

            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare className="text-purple-600" size={24} />
            </div>

            <h3 className="text-xl font-semibold text-gray-800">
              Complaints
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Submit and track your campus complaints.
            </p>

            <button
              onClick={() => navigate("/complaints")}
              className="mt-5 text-purple-600 font-medium hover:underline"
            >
              Open Complaints →
            </button>

          </div>

          {/* Lost & Found */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">

            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Search className="text-green-600" size={24} />
            </div>

            <h3 className="text-xl font-semibold text-gray-800">
              Lost & Found
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Report and find lost items around campus.
            </p>

            <button
              onClick={() => navigate("/lost-found")}
              className="mt-5 text-green-600 font-medium hover:underline"
            >
              Open Lost & Found →
            </button>

          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">

            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="text-orange-600" size={24} />
            </div>

            <h3 className="text-xl font-semibold text-gray-800">
              Notes
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Find and share useful study notes.
            </p>

            <button
              onClick={() => navigate("/notes")}
              className="mt-5 text-orange-600 font-medium hover:underline"
            >
              Open Notes →
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default DashboardPage;