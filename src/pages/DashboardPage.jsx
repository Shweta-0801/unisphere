import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Search,
  BookOpen,
  Users,
  Library,
  Bell,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import InteractiveAttendanceCard from "../components/dashboard/InteractiveAttendanceCard";
import "./Dashboard.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const firstName = user?.name ? user.name.split(" ")[0] : "Student";
  const deptText = user?.department || "Computer Science & Engineering";
  const semText = user?.semester || "4th Semester";

  // Core Campus Student Modules (Attendance integrated directly on the Dashboard)
  const modules = [
    {
      id: "complaints",
      title: "Grievances & Redressal",
      description: "Report hostel, lab, cafeteria, or academic infrastructure issues with 9-stage transparent tracking.",
      icon: MessageSquare,
      stat: "0 Pending Tickets",
      tag: "Direct Escalation",
      route: "/complaints",
      btnText: "Open Grievances"
    },
    {
      id: "lostfound",
      title: "Lost & Found Network",
      description: "Locate misplaced belongings plotted on the interactive campus map and earn voucher points.",
      icon: Search,
      stat: "120+ Recovered",
      tag: "Campus Grid",
      route: "/lost-found",
      btnText: "Open Lost & Found"
    },
    {
      id: "notes",
      title: "Notes Marketplace",
      description: "Access verified semester lecture notes, handwritten cheatsheets, and sample 6-page previews.",
      icon: BookOpen,
      stat: "450+ Verified",
      tag: "Peer Knowledge",
      route: "/notes",
      btnText: "Open Notes Market"
    },
    {
      id: "group-study",
      title: "Virtual Study Lounge",
      description: "Collaborate in synchronous study rooms with live peer presence, shared notes, and Pomodoro focus timer.",
      icon: Users,
      stat: "24 Active Peers",
      tag: "Live Sync",
      route: "/group-study",
      btnText: "Enter Study Lounge"
    },
    {
      id: "library",
      title: "Smart Library System",
      description: "Check 36-seat live floor layout availability, reserve study desks, and search catalog return dates.",
      icon: Library,
      stat: "17 Seats Available",
      tag: "Seat Map",
      route: "/library",
      btnText: "Open Smart Library"
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
      tag: "Infrastructure",
      title: "Hostel Wi-Fi Upgrade Completed in Block B",
      date: "Sep 08, 2026"
    }
  ];

  return (
    <AppLayout activePath="/dashboard">
      <div className="dashboard-root">
        {/* Top Header Bar */}
        <header className="dash-top-header">
          <div>
            <h1 className="dash-header-title">Academic Dashboard</h1>
            <p className="dash-header-subtitle">
              {semText} • {deptText}
            </p>
          </div>

          <div className="dash-header-actions">
            <div className="dash-notif-wrap">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="dash-icon-btn"
                aria-label="View Campus Notifications"
              >
                <Bell size={18} />
                <span className="dash-notif-dot" />
              </button>

              {notificationsOpen && (
                <>
                  <div
                    className="dash-notif-backdrop"
                    onClick={() => setNotificationsOpen(false)}
                  />
                  <div className="dash-notif-dropdown">
                    <div className="dash-notif-head">
                      <span className="dash-notif-title">Campus Alerts</span>
                      <span className="dash-notif-badge">3 Unread</span>
                    </div>
                    <div className="dash-notif-list">
                      {notices.map((n, i) => (
                        <div key={i} className="dash-notif-item">
                          <span className="dash-notif-tag">{n.tag}</span>
                          <span className="dash-notif-item-title">{n.title}</span>
                          <span className="dash-notif-date">{n.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="unisphere-btn unisphere-btn-primary"
            >
              <BookOpen size={14} />
              <span>Notes Marketplace</span>
            </button>
          </div>
        </header>

        {/* Welcome Banner */}
        <section className="dash-welcome-card">
          <div className="dash-welcome-blur-1" />
          <div className="dash-welcome-blur-2" />

          <div className="dash-welcome-content">
            <div className="dash-welcome-left">
              <div className="dash-welcome-badge">
                <Sparkles size={13} />
                <span>Academic Overview • Term 2026</span>
              </div>

              <h2 className="dash-welcome-headline">
                Welcome back, {firstName}
              </h2>

              <p className="dash-welcome-desc">
                Your cumulative attendance stands well above the 75% university condonation cutoff. Review today's schedule, reserve study seats, or inspect recovery pins on campus.
              </p>

              <div className="dash-welcome-quicklinks">
                <button
                  type="button"
                  onClick={() => navigate("/lost-found")}
                  className="dash-welcome-pill-btn"
                >
                  <Search size={14} />
                  <span>Lost &amp; Found Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/group-study")}
                  className="dash-welcome-ghost-btn"
                >
                  <Users size={14} />
                  <span>Join Study Room</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/library")}
                  className="dash-welcome-ghost-btn"
                >
                  <Library size={14} />
                  <span>View Seat Map</span>
                </button>
              </div>
            </div>

            <div className="dash-standing-box">
              <span className="dash-standing-val">88.4%</span>
              <div className="dash-standing-meta">
                <span className="dash-standing-label">Cohort Standing</span>
                <span className="dash-standing-status">Exam Admittance Safe</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Attendance Calculator (Requirement 3) */}
        <InteractiveAttendanceCard />

        {/* Quick Metrics Row */}
        <section className="dash-metrics-grid">
          <div className="dash-metric-card">
            <div className="dash-metric-head">
              <span className="dash-metric-label">Safe Bunks</span>
              <ShieldCheck size={18} className="dash-metric-icon" />
            </div>
            <span className="dash-metric-number">4 Classes</span>
            <span className="dash-metric-sub">Without violating 75%</span>
          </div>

          <div className="dash-metric-card">
            <div className="dash-metric-head">
              <span className="dash-metric-label">Library Seats</span>
              <Library size={18} className="dash-metric-icon" />
            </div>
            <span className="dash-metric-number">17 / 36</span>
            <span className="dash-metric-sub">Seats currently available</span>
          </div>

          <div className="dash-metric-card">
            <div className="dash-metric-head">
              <span className="dash-metric-label">Voucher Rewards</span>
              <Compass size={18} className="dash-metric-icon" />
            </div>
            <span className="dash-metric-number">200 Pts</span>
            <span className="dash-metric-sub">1,000 pts = Cafe voucher</span>
          </div>

          <div className="dash-metric-card">
            <div className="dash-metric-head">
              <span className="dash-metric-label">Study Rooms</span>
              <Users size={18} className="dash-metric-icon" />
            </div>
            <span className="dash-metric-number">3 Active</span>
            <span className="dash-metric-sub">Synced live peer rooms</span>
          </div>
        </section>

        {/* Core 6 Modules Grid */}
        <section>
          <div className="dash-section-head">
            <div>
              <h2 className="dash-section-title">Campus Operating Pillars</h2>
              <p className="dash-section-desc">
                Integrated modules providing full control over your academic journey.
              </p>
            </div>
          </div>

          <div className="dash-modules-grid">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  className="dash-module-card"
                  onClick={() => navigate(mod.route)}
                  role="button"
                  tabIndex={0}
                >
                  <div>
                    <div className="dash-mod-head">
                      <div className="dash-mod-icon-halo">
                        <Icon size={20} />
                      </div>
                      <span className="dash-mod-tag">{mod.tag}</span>
                    </div>

                    <div className="dash-mod-body">
                      <h3 className="dash-mod-title">{mod.title}</h3>
                      <p className="dash-mod-desc">{mod.description}</p>
                    </div>
                  </div>

                  <div className="dash-mod-footer">
                    <span className="dash-mod-stat">{mod.stat}</span>
                    <span className="dash-mod-link">
                      <span>{mod.btnText}</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timetable Schedule & Campus Announcements */}
        <section className="dash-bottom-grid">
          {/* Today's Timetable */}
          <div className="dash-panel-card">
            <div className="dash-panel-head">
              <h3 className="dash-panel-title">Today's Class Schedule</h3>
              <span className="dash-panel-pill">Tuesday • Term 2026</span>
            </div>

            <div className="dash-schedule-list">
              {todayClasses.map((cls, idx) => (
                <div key={idx} className="dash-schedule-row">
                  <div className="dash-schedule-left">
                    <div className="dash-schedule-time">
                      <Clock size={13} />
                      <span>{cls.time}</span>
                    </div>
                    <div className="dash-schedule-info">
                      <span className="dash-schedule-subject">
                        {cls.subject} ({cls.code})
                      </span>
                      <span className="dash-schedule-details">
                        {cls.faculty} • {cls.room}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`dash-schedule-status ${
                      cls.status === "Attended"
                        ? "status-attended"
                        : "status-upcoming"
                    }`}
                  >
                    {cls.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Bulletins */}
          <div className="dash-panel-card">
            <div className="dash-panel-head">
              <h3 className="dash-panel-title">Campus Bulletins</h3>
              <span className="dash-panel-pill">Verified</span>
            </div>

            <div className="dash-schedule-list">
              {notices.map((n, idx) => (
                <div key={idx} className="dash-notif-item">
                  <span className="dash-notif-tag">{n.tag}</span>
                  <span className="dash-notif-item-title">{n.title}</span>
                  <span className="dash-notif-date">{n.date}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}