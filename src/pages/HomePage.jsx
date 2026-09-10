import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  CalendarCheck,
  Search,
  BookOpen,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight,
  Award,
  Clock,
  Lock,
  ExternalLink
} from "lucide-react";

function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("attendance");

  const modules = [
    {
      id: "attendance",
      title: "Smart Attendance Hub",
      subtitle: "Academic Precision & Safe Bunk Analytics",
      icon: CalendarCheck,
      color: "blue",
      tag: "Academic Module",
      description:
        "Effortlessly monitor your lectures, labs, and attendance percentages. UniSphere calculates safe bunks, alerts you when approaching risk thresholds (e.g. 75%), and predicts exam eligibility before semester finals.",
      highlights: [
        "Real-time attendance ratio & criteria breakdown",
        "Predictive safe-bunk and class recovery calculator",
        "Interactive calendar view & one-click session logs",
        "Target threshold alert system (75% / 80% / 85%)"
      ],
      previewStats: {
        metric: "88.4%",
        label: "Overall Campus Attendance",
        status: "Safe Standing"
      }
    },
    {
      id: "complaints",
      title: "Complaints & Grievances",
      subtitle: "Transparent Campus Resolution System",
      icon: MessageSquare,
      color: "purple",
      tag: "Administration & Facilities",
      description:
        "A formal, transparent channel for students to register campus grievances regarding labs, hostels, canteens, infrastructure, and academics. Track resolution status in real-time.",
      highlights: [
        "Structured category tags (Hostel, Canteen, Labs, Wi-Fi)",
        "Direct escalation to campus administration",
        "Transparent timeline and resolution tracking",
        "Anonymous feedback and privacy protection"
      ],
      previewStats: {
        metric: "94.2%",
        label: "Issues Resolved On-Time",
        status: "High Efficiency"
      }
    },
    {
      id: "lostfound",
      title: "Lost & Found Network",
      subtitle: "Community-Driven Item Recovery",
      icon: Search,
      color: "emerald",
      tag: "Student Community",
      description:
        "Misplaced your ID card, calculator, laptop charger, or notebook? The Lost & Found portal connects finders and owners across all campus blocks with photo proofs and verified returns.",
      highlights: [
        "Campus zone tagging (Library, Auditorium, Cafeteria)",
        "Photo upload and item detail documentation",
        "Secure verification flow for rightful claimants",
        "Reward & community recognition points"
      ],
      previewStats: {
        metric: "120+",
        label: "Belongings Returned Safely",
        status: "Active Campus Grid"
      }
    },
    {
      id: "notes",
      title: "Peer Notes & Study Circle",
      subtitle: "Shared Academic Knowledge Base",
      icon: BookOpen,
      color: "amber",
      tag: "Collaborative Learning",
      description:
        "Never scramble before exams again. Access curated lecture notes, syllabus summaries, previous year question papers, and collaborate with peers in virtual study groups.",
      highlights: [
        "Semester-wise subject repositories & unit summaries",
        "Peer-reviewed lecture notes & PDF previews",
        "Group study coordination and question banks",
        "Top contributor badges and student ratings"
      ],
      previewStats: {
        metric: "450+",
        label: "Verified Study Resources",
        status: "Updated Daily"
      }
    }
  ];

  const activeModuleData = modules.find((m) => m.id === activeTab) || modules[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[500px] bg-gradient-to-tr from-blue-300/30 via-indigo-200/25 to-purple-200/20 blur-3xl rounded-full" />
        <div className="absolute top-[45%] -right-40 w-[450px] h-[450px] bg-blue-200/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 -left-40 w-[450px] h-[450px] bg-indigo-200/25 blur-3xl rounded-full" />
      </div>

      {/* Modern Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/70 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap size={22} strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Uni<span className="text-blue-600">Sphere</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5">
                Smart Digital Campus Platform
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About Project
            </a>
            <a href="#modules" className="hover:text-blue-600 transition-colors">
              Core Modules
            </a>
            <a href="#workflow" className="hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-blue-600 transition-colors">
              Key Benefits
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-slate-100/80 transition-colors cursor-pointer"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-5 py-2.5 rounded-xl shadow-sm shadow-blue-500/25 hover:shadow-md hover:shadow-blue-500/35 transition-all cursor-pointer"
            >
              <span>Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-16 pb-20 px-6 max-w-7xl mx-auto text-center">
          {/* Announcement pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold mb-6 shadow-sm animate-fade-in">
            <Sparkles size={14} className="text-blue-600" />
            <span>Campus Life Unified • Everything in One Single Sphere</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
            Everything Campus. <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              One Smart Digital Sphere.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            UniSphere brings academic attendance tracking, collaborative study notes, campus grievance resolution, and lost & found recovery into a modern, centralized student workspace.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Explore Dashboard</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-800 font-semibold text-base shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Lock size={16} className="text-slate-500" />
              <span>Student Login</span>
            </button>

            <a
              href="#modules"
              className="inline-flex items-center gap-1.5 px-5 py-3.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <span>See Core Modules</span>
              <ChevronRight size={16} />
            </a>
          </div>

          {/* Quick Metrics Banner */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="text-3xl font-black text-blue-600">4-in-1</div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Integrated Modules
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="text-3xl font-black text-emerald-600">75%</div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Attendance Guardrail
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="text-3xl font-black text-indigo-600">Real-Time</div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Status Tracking
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="text-3xl font-black text-purple-600">100%</div>
              <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                Student Focused
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT OUR PROJECT SECTION */}
        <section id="about" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Why We Built UniSphere
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Built to Solve Real Campus Bottlenecks
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              University life shouldn't be scattered across informal WhatsApp groups, forgotten noticeboards, physical paper registers, and separate department portals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-5">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                The Attendance Guesswork
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Students often lose track of safe bunks and eligibility margins, finding out they are below the mandatory 75% requirement when it's already too late.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-600">
                <CheckCircle2 size={16} />
                <span>UniSphere's Bunk Calculator fixes this</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Unheard Student Grievances
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Broken lab projectors, dirty canteen benches, and hostel Wi-Fi issues remain unresolved because there is no transparent ticket tracking mechanism.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-purple-600">
                <CheckCircle2 size={16} />
                <span>Categorized complaints with live status</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                <Layers size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Disorganized Peer Resources
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Crucial exam notes, syllabus units, and lost belongings are posted in chaotic group chats where messages quickly get buried and lost.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <CheckCircle2 size={16} />
                <span>Searchable study notes & campus recovery grid</span>
              </div>
            </div>
          </div>
        </section>

        {/* CORE MODULES INTERACTIVE SHOWCASE */}
        <section id="modules" className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Explore the 4 Pillars of UniSphere
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Click any module below to inspect its purpose, tools, and capabilities.
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-10 p-1.5 bg-slate-200/60 rounded-2xl">
            {modules.map((m) => {
              const Icon = m.icon;
              const isActive = activeTab === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Icon size={18} />
                  <span>{m.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Module Showcase Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Details */}
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 mb-4">
                  <span>{activeModuleData.tag}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {activeModuleData.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  {activeModuleData.subtitle}
                </p>

                <p className="mt-4 text-slate-600 text-base leading-relaxed">
                  {activeModuleData.description}
                </p>

                {/* Highlights List */}
                <div className="mt-6 space-y-2.5">
                  {activeModuleData.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Direct Action Link */}
                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition shadow-sm cursor-pointer"
                  >
                    <span>View in Dashboard</span>
                    <ArrowRight size={15} />
                  </button>

                  <span className="text-xs text-slate-400 font-medium">
                    Integrated with UniSphere Auth
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Preview Box */}
              <div className="md:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/50 p-6 rounded-2xl border border-slate-200/80">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    module://{activeModuleData.id}
                  </span>
                </div>

                <div className="mt-6 text-center py-6">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 mx-auto flex items-center justify-center mb-4">
                    <activeModuleData.icon size={32} className="text-blue-600" />
                  </div>

                  <div className="text-4xl font-black text-slate-900">
                    {activeModuleData.previewStats.metric}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    {activeModuleData.previewStats.label}
                  </div>

                  <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold">
                    <ShieldCheck size={14} />
                    <span>{activeModuleData.previewStats.status}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                  <p className="text-xs text-slate-500">
                    Designed for students, faculty & administrators
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW SECTION */}
        <section id="workflow" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Quick Setup
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              How Students Use UniSphere
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              A frictionless 3-step workflow designed for busy college schedules.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative bg-white rounded-2xl p-7 border border-slate-200 shadow-xs">
              <div className="text-4xl font-black text-blue-200 mb-3">01</div>
              <h3 className="text-lg font-bold text-slate-900">
                Log In with Campus ID
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Sign in with your email to access your personalized campus dashboard with zero complicated configuration.
              </p>
            </div>

            <div className="relative bg-white rounded-2xl p-7 border border-slate-200 shadow-xs">
              <div className="text-4xl font-black text-indigo-200 mb-3">02</div>
              <h3 className="text-lg font-bold text-slate-900">
                Track & Calculate
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Log today's attended classes, calculate bunk limits, check pending complaints, or find study notes for next week's exam.
              </p>
            </div>

            <div className="relative bg-white rounded-2xl p-7 border border-slate-200 shadow-xs">
              <div className="text-4xl font-black text-purple-200 mb-3">03</div>
              <h3 className="text-lg font-bold text-slate-900">
                Stay Ahead of Targets
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Meet your mandatory 75% attendance criteria, get lost items back, and collaborate with your semester classmates.
              </p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-10 sm:p-14 text-center text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
            {/* Decorative background circles */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-blue-100">
                Ready to Experience UniSphere?
              </span>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-4">
                Step into Your Unified Campus Hub
              </h2>

              <p className="text-blue-100 mt-3 text-base sm:text-lg">
                Log in to check your attendance records, inspect grievances, locate misplaced items, or download study material.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-7 py-3.5 rounded-xl bg-white text-blue-600 font-bold hover:bg-blue-50 transition shadow-lg shadow-black/10 cursor-pointer"
                >
                  Enter Dashboard Now →
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-7 py-3.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 border border-white/20 text-white font-semibold transition cursor-pointer"
                >
                  Student Login
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <GraduationCap size={18} />
            </div>
            <div>
              <span className="font-black text-slate-900 tracking-tight">
                UniSphere
              </span>
              <p className="text-xs text-slate-500">
                Academic & Campus Management System
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center">
            © 2026 UniSphere Team • Empowering students with intelligent campus tools.
          </p>

          <div className="flex items-center gap-5 text-xs font-medium text-slate-600">
            <button
              onClick={() => navigate("/login")}
              className="hover:text-blue-600 transition cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-blue-600 transition cursor-pointer"
            >
              Dashboard
            </button>
            <a
              href="#about"
              className="hover:text-blue-600 transition cursor-pointer"
            >
              About
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
