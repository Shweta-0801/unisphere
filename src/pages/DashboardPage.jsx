import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  MessageSquare,
  Search,
  BookOpen,
  Bell,
  Clock,
  ChevronRight,
  Sparkles
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const firstName = user?.name ? user.name.split(" ")[0] : "Student";
  const deptText = user?.department || "Computer Science & Engineering";
  const semText = user?.semester || "4th Semester";

  const modules = [
    {
      id: "attendance",
      title: "Attendance & Exam Hub",
      description: "Track lecture percentages, calculate safe bunks, and verify end-semester exam eligibility.",
      icon: CalendarCheck,
      stat: "88.4% Aggregate",
      route: "/attendance",
      btnText: "Open Attendance Hub →"
    },
    {
      id: "complaints",
      title: "Grievances & Redressal",
      description: "Report hostel, lab, cafeteria, or academic issues with transparent real-time tracking.",
      icon: MessageSquare,
      stat: "0 Pending Tickets",
      route: "/complaints",
      btnText: "Open Complaints Portal →"
    },
    {
      id: "lostfound",
      title: "Lost & Found Network",
      description: "Post missing belongings or inspect found student items plotted on the interactive campus map.",
      icon: Search,
      stat: "120+ Recovered",
      route: "/lost-found",
      btnText: "Open Lost & Found →"
    },
    {
      id: "notes",
      title: "Study Notes & Circle",
      description: "Access semester study resources, unit summaries, and collaborate with peer study groups.",
      icon: BookOpen,
      stat: "450+ Verified",
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
      room: "Hall 302",
      status: "Attended"
    },
    {
      time: "11:15 AM",
      subject: "DBMS Practical Laboratory",
      code: "CS-302L",
      faculty: "Prof. Sunita Rao",
      room: "Lab 4",
      status: "Upcoming"
    },
    {
      time: "02:30 PM",
      subject: "Computer Networks & Security",
      code: "CS-304",
      faculty: "Prof. Priya Nair",
      room: "Auditorium 105",
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
      tag: "Academic",
      title: "Hostel Wi-Fi Upgrade Completed in Block B",
      date: "Sep 08, 2026"
    }
  ];

  return (
    <AppLayout activePath="/dashboard">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 bg-[#FFFDF8]/90 backdrop-blur-md border-b border-[#E5DCD4] h-16 flex items-center justify-between px-6 shrink-0">
        <div>
          <h1 className="text-base font-black text-[#241A1C] leading-none">
            Academic Dashboard
          </h1>
          <p className="text-[11px] font-bold text-[#75666A] mt-1">
            {semText} • {deptText}
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl text-[#75666A] hover:text-[#241A1C] hover:bg-[#FAF6F0] transition relative cursor-pointer"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6B1E2D]" />
            </button>

            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-[#FFFDF8] border border-[#E5DCD4] rounded-2xl shadow-xl p-4 z-30 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5DCD4]">
                    <span className="text-xs font-black text-[#241A1C]">Campus Alerts</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F8F1F2] text-[#6B1E2D]">
                      3 Unread
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {notices.map((n, i) => (
                      <div key={i} className="p-2.5 rounded-xl hover:bg-[#FAF6F0] transition text-xs border border-[#E5DCD4]/60">
                        <span className="text-[10px] font-bold text-[#B8A08A] uppercase tracking-wider block">
                          {n.tag}
                        </span>
                        <span className="font-bold text-[#241A1C] block mt-0.5">{n.title}</span>
                        <span className="text-[10px] text-[#75666A] mt-1 block">{n.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => navigate("/attendance")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6B1E2D] hover:bg-[#48121E] text-white text-xs font-bold transition shadow-xs active:scale-95 cursor-pointer"
          >
            <CalendarCheck size={14} />
            <span>Attendance Hub</span>
          </button>
        </div>
      </header>

      {/* Dashboard Body */}
      <main className="p-6 md:p-8 space-y-8 max-w-7xl">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#48121E] via-[#6B1E2D] to-[#351019] text-white p-6 md:p-8 shadow-md shadow-[#6B1E2D]/15">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 rounded-full bg-[#B8A08A]/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D8CBBE] text-xs font-bold border border-white/10">
                <Sparkles size={13} className="text-[#B8A08A]" />
                <span>Academic Overview • Spring 2026</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Welcome back, {firstName}!
              </h2>
              <p className="text-xs md:text-sm text-[#D8CBBE] leading-relaxed">
                Your academic attendance stands safely at <strong>88.4%</strong> across all enrolled subjects. No shortage warnings active.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                <span className="text-2xl font-black text-white block leading-none">88.4%</span>
                <span className="text-[10px] font-bold text-[#D8CBBE] uppercase tracking-wider mt-1 block">Overall</span>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                <span className="text-2xl font-black text-[#D8CBBE] block leading-none">4/4</span>
                <span className="text-[10px] font-bold text-[#D8CBBE] uppercase tracking-wider mt-1 block">Courses Safe</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Modules Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-[#241A1C] tracking-tight">
                Campus Service Modules
              </h3>
              <p className="text-xs text-[#75666A]">
                Centralized access to all campus services and student tools.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  className="bg-[#FFFDF8] rounded-3xl p-6 border border-[#E5DCD4] shadow-xs hover:border-[#B8A08A] hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#FAF6F0] text-[#6B1E2D] border border-[#E5DCD4] flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAF6F0] text-[#75666A] border border-[#E5DCD4]">
                        {mod.stat}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#241A1C] mb-2">{mod.title}</h4>
                    <p className="text-xs text-[#75666A] leading-relaxed mb-6">
                      {mod.description}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(mod.route)}
                    className="w-full py-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#6B1E2D] text-[#6B1E2D] hover:text-white border border-[#E5DCD4] hover:border-[#6B1E2D] text-xs font-bold transition-all flex items-center justify-center gap-1.5 group cursor-pointer"
                  >
                    <span>{mod.btnText}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Column Grid: Today's Classes & University Notices */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Today's Schedule Card */}
          <div className="lg:col-span-7 bg-[#FFFDF8] rounded-3xl p-6 md:p-7 border border-[#E5DCD4] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DCD4]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FAF6F0] text-[#6B1E2D] flex items-center justify-center border border-[#E5DCD4]">
                  <Clock size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#241A1C]">Today's Schedule</h3>
                  <p className="text-[11px] font-semibold text-[#75666A]">
                    Thursday • 3 Lectures Scheduled
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/attendance")}
                className="text-xs font-bold text-[#6B1E2D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Attendance</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-3">
              {todayClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#E5DCD4] hover:bg-white transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 text-center shrink-0">
                      <span className="text-[11px] font-black text-[#241A1C] block leading-tight">
                        {cls.time.split(" ")[0]}
                      </span>
                      <span className="text-[10px] font-bold text-[#75666A] block">
                        {cls.time.split(" ")[1]}
                      </span>
                    </div>

                    <div className="w-px h-8 bg-[#E5DCD4]" />

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FFFDF8] text-[#6B1E2D] border border-[#E5DCD4]">
                          {cls.code}
                        </span>
                        <span className="text-xs font-bold text-[#241A1C] truncate">{cls.subject}</span>
                      </div>
                      <div className="text-[11px] text-[#75666A] mt-0.5">
                        {cls.faculty} • {cls.room}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      cls.status === "Attended"
                        ? "bg-[#F0F5F2] text-[#4F7A5A] border border-[#C8DACD]"
                        : "bg-[#FAF6F0] text-[#75666A] border border-[#E5DCD4]"
                    }`}>
                      {cls.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notice Board & Important Updates */}
          <div className="lg:col-span-5 bg-[#FFFDF8] rounded-3xl p-6 md:p-7 border border-[#E5DCD4] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DCD4]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FAF6F0] text-[#6B1E2D] flex items-center justify-center border border-[#E5DCD4]">
                  <Bell size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#241A1C]">
                    University Notices
                  </h3>
                  <p className="text-[11px] font-semibold text-[#75666A]">
                    Dean & Department Bulletins
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-bold text-[#B8A08A] uppercase tracking-wider">
                Verified
              </span>
            </div>

            <div className="space-y-3">
              {notices.map((nt, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#E5DCD4] hover:bg-white transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B1E2D] bg-[#F8F1F2] px-2 py-0.5 rounded border border-[#E5DCD4]">
                      {nt.tag}
                    </span>
                    <span className="text-[10px] text-[#75666A] font-semibold">{nt.date}</span>
                  </div>
                  <h5 className="text-xs font-bold text-[#241A1C] mt-2 leading-snug">
                    {nt.title}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}

export default DashboardPage;
