import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  Search,
  BookOpen,
  LogOut,
  ExternalLink,
  Bell,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Menu,
  X,
  GraduationCap,
  ArrowUpRight
} from "lucide-react";

function DashboardPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", active: true },
    { label: "Attendance Hub", icon: CalendarCheck, path: "/attendance" },
    { label: "Complaints Portal", icon: MessageSquare, path: "/complaints" },
    { label: "Lost & Found", icon: Search, path: "/lost-found" },
    { label: "Study Notes", icon: BookOpen, path: "/notes" }
  ];

  const modules = [
    {
      id: "attendance",
      title: "Attendance Hub",
      description: "Track lecture percentages, calculate safe bunks, and verify exam eligibility.",
      icon: CalendarCheck,
      color: "blue",
      stat: "88.4% Overall",
      route: "/attendance",
      btnText: "Open Attendance →"
    },
    {
      id: "complaints",
      title: "Complaints & Redressal",
      description: "Report hostel, lab, cafeteria, or academic issues with real-time tracking.",
      icon: MessageSquare,
      color: "purple",
      stat: "0 Pending Tickets",
      route: "/complaints",
      btnText: "Open Complaints →"
    },
    {
      id: "lostfound",
      title: "Lost & Found Network",
      description: "Post missing belongings or search found student items by campus zones.",
      icon: Search,
      color: "emerald",
      stat: "120+ Recovered",
      route: "/lost-found",
      btnText: "Open Lost & Found →"
    },
    {
      id: "notes",
      title: "Study Notes & Circle",
      description: "Access semester study resources, lecture summaries, and peer study groups.",
      icon: BookOpen,
      color: "amber",
      stat: "450+ Uploads",
      route: "/notes",
      btnText: "Open Study Notes →"
    }
  ];

  const todayClasses = [
    {
      time: "09:30 AM",
      subject: "Data Structures & Algorithms",
      code: "CS-301",
      faculty: "Dr. Rajesh Sharma",
      room: "Room 302",
      status: "Attended"
    },
    {
      time: "11:15 AM",
      subject: "DBMS Practical Lab",
      code: "CS-302L",
      faculty: "Prof. Sunita Rao",
      room: "Lab 4",
      status: "Upcoming"
    },
    {
      time: "02:30 PM",
      subject: "Computer Networks",
      code: "CS-304",
      faculty: "Prof. Priya Nair",
      room: "Hall 105",
      status: "Upcoming"
    }
  ];

  const notices = [
    {
      tag: "Exams",
      title: "Semester 4 Midterm Timetable Published",
      date: "Today, 10:00 AM"
    },
    {
      tag: "Campus",
      title: "Central Library 24/7 Reading Rooms Open",
      date: "Sep 09, 2026"
    },
    {
      tag: "Notice",
      title: "Cafeteria Block B renovation completed",
      date: "Sep 08, 2026"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased">
      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 sticky top-0 h-screen justify-between z-30">
        <div>
          {/* Brand Header */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap size={20} />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-none">
                Uni<span className="text-blue-600">Sphere</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                Campus Student Portal
              </span>
            </div>
          </div>

          {/* Nav List */}
          <div className="p-4 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    item.active
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={17} className={item.active ? "text-blue-600" : "text-slate-400"} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Public Section */}
            <div className="pt-5 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Overview
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ExternalLink size={17} className="text-slate-400" />
                <span>Public Home Page</span>
              </div>
              <ArrowUpRight size={14} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* User Profile Box */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                AS
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-800 truncate">Alex Sharma</div>
                <div className="text-[10px] text-slate-400 truncate">CSE • Semester 4</div>
              </div>
            </div>

            <button
              onClick={() => navigate("/login")}
              title="Logout"
              className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-white transition cursor-pointer shrink-0"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />
          <div className="relative w-64 bg-white h-full flex flex-col justify-between p-4 z-10 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <GraduationCap size={18} />
                  </div>
                  <span className="font-bold text-slate-900">UniSphere</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate(item.path);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        item.active
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 mt-4 border-t border-slate-100"
                >
                  <ExternalLink size={16} />
                  <span>Public Home Page</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-xs font-bold text-red-600 p-2.5 rounded-xl bg-red-50 hover:bg-red-100 transition"
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= MAIN WRAPPER ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 md:hidden cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-none">
                Dashboard Overview
              </h1>
              <span className="text-[11px] text-slate-400">
                Academic Year 2025–26 • Term II
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Clock size={13} className="text-slate-400" />
              <span>Thursday, Sep 10, 2026</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition cursor-pointer relative"
              >
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-bold text-slate-900">
                    <span>Notifications</span>
                    <span className="text-[10px] text-blue-600 cursor-pointer">Clear</span>
                  </div>
                  <div className="mt-2 text-xs space-y-2 text-slate-600">
                    <p className="p-2 rounded-lg bg-slate-50">
                      Attendance logged for CS-301 (Present).
                    </p>
                    <p className="p-2 rounded-lg bg-slate-50">
                      Midterm schedule announced.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/login")}
              className="text-xs font-semibold text-slate-600 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* CLEAN WELCOME STRIP */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Welcome back, Alex 👋
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Here is your campus summary for today. Everything is running smoothly.
              </p>
            </div>

            <button
              onClick={() => navigate("/attendance")}
              className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-xs cursor-pointer"
            >
              <CalendarCheck size={15} />
              <span>Mark Today's Attendance</span>
            </button>
          </div>

          {/* 4 DISTINCT METRIC CARDS (NON-REPETITIVE) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Attendance Status
              </div>
              <div className="text-2xl font-black text-blue-600 mt-1">
                88.4%
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Safely above 75%</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Today's Lectures
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                3 Classes
              </div>
              <div className="mt-1 text-xs text-slate-500">
                1 attended • 2 upcoming
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Active Grievances
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                0 Pending
              </div>
              <div className="mt-1 text-xs text-emerald-600 font-medium">
                All campus tickets resolved
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Study Materials
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                450+ Notes
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Semester 4 repository live
              </div>
            </div>
          </div>

          {/* 4 CORE GATEWAYS */}
          <div>
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Campus Modules
              </h3>
              <p className="text-xs text-slate-500">
                Quick access to all four integrated university tools.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {modules.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-200 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                          <Icon size={20} className={`text-${m.color}-600`} />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {m.stat}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900">
                        {m.title}
                      </h4>

                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {m.description}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(m.route)}
                      className="mt-5 w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-xs border border-slate-200 hover:border-blue-200 transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>{m.btnText}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2-COLUMN SECTION: TODAY'S SCHEDULE + CAMPUS NOTICES */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Today's Schedule */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Today's Lecture Schedule
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">
                  3 Lectures Scheduled
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {todayClasses.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">
                          {item.subject}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
                          {item.code}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-3">
                        <span>{item.time}</span>
                        <span>•</span>
                        <span>{item.room}</span>
                        <span>•</span>
                        <span>{item.faculty}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === "Attended"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Notices */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-amber-500" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Campus Noticeboard
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">
                  Latest Announcements
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {notices.map((n, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/70"
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="font-bold text-blue-600 uppercase tracking-wider">
                        {n.tag}
                      </span>
                      <span className="text-slate-400">{n.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 leading-snug">
                      {n.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;