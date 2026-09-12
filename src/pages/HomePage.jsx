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
  Sparkles,
  Layers,
  ChevronRight,
  Award,
  Clock,
  Lock,
  CheckCircle2,
  MapPin,
  FileText,
  TrendingUp,
  BarChart3,
  Users,
  Check,
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
      tag: "Mandatory 75% Cutoff Defense",
      description:
        "Effortlessly monitor your lectures, labs, and attendance percentages with decimal accuracy. UniSphere calculates safe bunks, warns when approaching condonation thresholds, and forecasts exam eligibility before semester finals.",
      highlights: [
        "Real-time attendance ratio & institutional criteria breakdown",
        "Predictive safe-bunk and consecutive class recovery calculator",
        "Interactive schedule calendar & one-click session roll call register",
        "Configurable target thresholds (65% condonation, 75% standard, 80%, 85%)"
      ],
      previewStats: {
        metric: "88.4%",
        label: "Current Semester Average",
        status: "Safe Exam Standing"
      }
    },
    {
      id: "complaints",
      title: "Complaints & Grievances",
      subtitle: "Transparent Campus Resolution System",
      icon: MessageSquare,
      tag: "Direct Administration Escalation",
      description:
        "A formal, transparent channel for students to lodge campus grievances regarding laboratories, hostels, canteens, infrastructure, and faculty. Track every ticket's status through to verified resolution.",
      highlights: [
        "9 structured categories (Hostel, Mess, Wi-Fi, Classrooms, Transport)",
        "Automated routing to appropriate campus administrators",
        "Live progress timeline: Submitted → Pending → In Progress → Resolved",
        "Document and photo attachment support with student privacy assurance"
      ],
      previewStats: {
        metric: "94.2%",
        label: "Tickets Resolved On-Time",
        status: "High Efficiency"
      }
    },
    {
      id: "lostfound",
      title: "Lost & Found Network",
      subtitle: "Coordinate-Mapped Campus Recovery",
      icon: Search,
      tag: "Interactive Campus Coordinate Grid",
      description:
        "Misplaced your student ID, calculator, laptop charger, or notebook? The Lost & Found network connects finders and owners across all campus blocks with visual pins on an interactive canvas map.",
      highlights: [
        "Interactive campus map with pinpoint zone coordinates",
        "Color-coded status pins: Lost (Crimson) vs Found (Forest Sage)",
        "Photo uploads, secure claim verification, and contact notes",
        "Community recognition & karma reward points for helpful students"
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
      subtitle: "Curated Academic Knowledge Base",
      icon: BookOpen,
      tag: "Collaborative Learning Hub",
      description:
        "Never scramble before midterms or finals again. Access verified lecture summaries, unit-wise question banks, and handwritten cheatsheets, or collaborate in synchronous live study rooms.",
      highlights: [
        "Semester-wise course repositories & unit summaries",
        "Handwritten notes marketplace with free & premium community options",
        "First-3 / last-3 page preview modal before unlocking",
        "Realtime virtual study rooms with synchronous cursors and reactions"
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
    <div className="min-h-screen bg-[#F8F3EA] text-[#241A1C] font-sans selection:bg-[#B8A08A]/30 selection:text-[#351019]">
      {/* Subtle ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[500px] bg-gradient-to-tr from-[#EFE8DC]/60 via-[#F8F3EA]/40 to-[#D8CBBE]/30 blur-3xl rounded-full" />
        <div className="absolute top-[40%] -right-40 w-[450px] h-[450px] bg-[#6B1E2D]/5 blur-3xl rounded-full" />
        <div className="absolute bottom-10 -left-40 w-[450px] h-[450px] bg-[#B8A08A]/10 blur-3xl rounded-full" />
      </div>

      {/* Top Academic Status Ticker */}
      <div className="relative z-50 bg-[#351019] text-[#D8CBBE] text-[11px] font-medium py-1.5 px-6 border-b border-[#48121E]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4F7A5A] animate-pulse" />
            <span>Academic Term 2026 Active • Institutional Verification Online</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#D8CBBE]/80">
            <span>Mandatory Cutoff: 75.0%</span>
            <span>•</span>
            <span>Daily Roll Calls Enabled</span>
          </div>
        </div>
      </div>

      {/* Modern Navigation Header with Login & Register */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FFFDF8]/90 border-b border-[#E5DCD4] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#6B1E2D] flex items-center justify-center text-[#FFFDF8] shadow-sm shadow-[#6B1E2D]/20 group-hover:bg-[#48121E] transition-all">
              <GraduationCap size={22} strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold tracking-tight text-[#241A1C]">
                  Uni<span className="text-[#6B1E2D]">Sphere</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF6F0] text-[#75666A] border border-[#E5DCD4]">
                  University Edition
                </span>
              </div>
              <p className="text-[10px] text-[#75666A] font-medium -mt-0.5">
                Integrated Campus Management Operating System
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#75666A]">
            <a href="#about" className="hover:text-[#6B1E2D] transition-colors">
              Platform Overview
            </a>
            <a href="#modules" className="hover:text-[#6B1E2D] transition-colors">
              Core Pillars
            </a>
            <a href="#workflow" className="hover:text-[#6B1E2D] transition-colors">
              Workflow
            </a>
            <a href="#comparison" className="hover:text-[#6B1E2D] transition-colors">
              Why UniSphere
            </a>
          </nav>

          {/* Action CTAs: Login + Register + Dashboard */}
          <div className="flex items-center gap-2.5">
            {/* Login Button */}
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#241A1C] hover:text-[#6B1E2D] px-3.5 sm:px-4 py-2 rounded-xl border border-[#E5DCD4] hover:border-[#B8A08A] bg-[#FFFDF8] hover:bg-[#F8F3EA] transition-all cursor-pointer shadow-2xs"
            >
              <Lock size={14} className="text-[#B8A08A]" />
              <span>Log In</span>
            </button>

            {/* Register Button */}
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FFFDF8] bg-[#6B1E2D] hover:bg-[#48121E] px-4 sm:px-5 py-2 rounded-xl shadow-sm shadow-[#6B1E2D]/25 transition-all cursor-pointer active:scale-95"
            >
              <span>Register</span>
              <Sparkles size={14} className="text-[#D8CBBE]" />
            </button>

            {/* Direct Dashboard Quick Access */}
            <button
              onClick={() => navigate("/dashboard")}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-[#75666A] hover:text-[#241A1C] px-3 py-2 rounded-xl hover:bg-[#E5DCD4]/40 transition cursor-pointer"
              title="Quick demo access directly to Dashboard"
            >
              <span>Demo Hub</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-16 pb-20 px-6 max-w-7xl mx-auto text-center">
          {/* Announcement pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8] border border-[#E5DCD4] text-[#6B1E2D] text-xs font-bold mb-6 shadow-xs animate-fade-in">
            <Sparkles size={14} className="text-[#B8A08A]" />
            <span>Executive Campus SaaS Suite • Burgundy Luxe Architecture</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#241A1C] max-w-4xl mx-auto leading-[1.15]">
            Unified Campus Operations. <br />
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#6B1E2D] via-[#48121E] to-[#B8A08A] bg-clip-text text-transparent">
              Engineered for Academic Distinction.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-[#75666A] max-w-2xl mx-auto font-normal leading-relaxed">
            UniSphere unifies mathematical attendance defense, peer lecture repositories, transparent grievance resolution, and lost property recovery into a single, cohesive student operating workspace.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#6B1E2D] hover:bg-[#48121E] text-white font-bold text-sm shadow-md shadow-[#6B1E2D]/20 hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
            >
              <span>Create Free Student Account</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFFDF8] hover:bg-[#FAF6F0] border border-[#E5DCD4] text-[#241A1C] font-bold text-sm shadow-xs hover:border-[#B8A08A] transition-all cursor-pointer"
            >
              <Lock size={15} className="text-[#B8A08A]" />
              <span>Student Portal Login</span>
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-bold text-[#75666A] hover:text-[#6B1E2D] transition-colors cursor-pointer"
            >
              <span>Enter Demo Dashboard</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* INTERACTIVE LIVE MINI-PREVIEW COCKPIT CARD */}
          <div className="mt-14 max-w-4xl mx-auto bg-[#FFFDF8] rounded-3xl border border-[#E5DCD4] shadow-xl shadow-[#241A1C]/5 overflow-hidden text-left">
            {/* Cockpit Window Header */}
            <div className="bg-[#FAF6F0] px-6 py-3.5 border-b border-[#E5DCD4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#6B1E2D]" />
                  <div className="w-3 h-3 rounded-full bg-[#B8A08A]" />
                  <div className="w-3 h-3 rounded-full bg-[#4F7A5A]" />
                </div>
                <div className="h-4 w-px bg-[#E5DCD4]" />
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4F7A5A]" />
                  <span className="text-xs font-bold text-[#241A1C]">Alex Sharma</span>
                  <span className="text-[11px] text-[#75666A]">· B.Tech Computer Science, Semester 4</span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-[#75666A] bg-[#FFFDF8] px-2.5 py-0.5 rounded-full border border-[#E5DCD4]">
                portal.unisphere.edu/dashboard
              </span>
            </div>

            {/* 4 Interactive Snapshot Widgets */}
            <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#FFFDF8]">
              {/* Widget 1: Attendance */}
              <div
                onClick={() => navigate("/attendance")}
                className="p-4 rounded-2xl bg-[#F8F3EA]/70 border border-[#E5DCD4] hover:border-[#B8A08A] hover:bg-[#F8F3EA] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#B8A08A] uppercase tracking-wider">Attendance</span>
                  <CalendarCheck size={16} className="text-[#6B1E2D]" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-serif font-bold text-[#241A1C]">88.4%</span>
                  <span className="text-[10px] text-[#4F7A5A] font-bold">Safe</span>
                </div>
                <div className="mt-2 text-[11px] text-[#75666A] flex items-center justify-between">
                  <span>Target: 75.0%</span>
                  <span className="text-[#4F7A5A] font-semibold">+4 Safe Bunks</span>
                </div>
              </div>

              {/* Widget 2: Grievances */}
              <div
                onClick={() => navigate("/complaints")}
                className="p-4 rounded-2xl bg-[#F8F3EA]/70 border border-[#E5DCD4] hover:border-[#B8A08A] hover:bg-[#F8F3EA] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#B8A08A] uppercase tracking-wider">Grievance Portal</span>
                  <MessageSquare size={16} className="text-[#6B1E2D]" />
                </div>
                <div className="text-sm font-serif font-bold text-[#241A1C] truncate">
                  Hostel Wi-Fi Upgrade
                </div>
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#EBF2EC] text-[#4F7A5A] text-[10px] font-bold">
                  <Check size={11} />
                  <span>Resolved Today</span>
                </div>
              </div>

              {/* Widget 3: Lost & Found */}
              <div
                onClick={() => navigate("/lost-found")}
                className="p-4 rounded-2xl bg-[#F8F3EA]/70 border border-[#E5DCD4] hover:border-[#B8A08A] hover:bg-[#F8F3EA] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#B8A08A] uppercase tracking-wider">Campus Grid</span>
                  <Search size={16} className="text-[#6B1E2D]" />
                </div>
                <div className="text-sm font-serif font-bold text-[#241A1C] truncate">
                  Calculator (FX-991EX)
                </div>
                <div className="mt-2 text-[11px] text-[#75666A] flex items-center gap-1">
                  <MapPin size={12} className="text-[#B8A08A]" />
                  <span>Library 2nd Floor</span>
                </div>
              </div>

              {/* Widget 4: Notes */}
              <div
                onClick={() => navigate("/notes")}
                className="p-4 rounded-2xl bg-[#F8F3EA]/70 border border-[#E5DCD4] hover:border-[#B8A08A] hover:bg-[#F8F3EA] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#B8A08A] uppercase tracking-wider">Peer Notes</span>
                  <BookOpen size={16} className="text-[#6B1E2D]" />
                </div>
                <div className="text-sm font-serif font-bold text-[#241A1C] truncate">
                  DSA Normalization PDF
                </div>
                <div className="mt-2 text-[11px] text-[#B8A08A] font-semibold flex items-center gap-1">
                  <span>★ 4.8 Rating</span>
                  <span className="text-[#75666A] font-normal">(18 reviews)</span>
                </div>
              </div>
            </div>

            {/* Footer inside Cockpit */}
            <div className="bg-[#FAF6F0] px-6 py-3 border-t border-[#E5DCD4] flex items-center justify-between text-xs text-[#75666A]">
              <span>Real-time local data persistence active</span>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-[#6B1E2D] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Launch Full Workspace</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Quick Metrics Banner */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-2xl p-5 shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#6B1E2D]">4-in-1</div>
              <div className="text-[11px] font-bold text-[#75666A] mt-1 uppercase tracking-wider">
                Integrated Modules
              </div>
            </div>

            <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-2xl p-5 shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#4F7A5A]">75.0%</div>
              <div className="text-[11px] font-bold text-[#75666A] mt-1 uppercase tracking-wider">
                Cutoff Defense
              </div>
            </div>

            <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-2xl p-5 shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#241A1C]">Real-Time</div>
              <div className="text-[11px] font-bold text-[#75666A] mt-1 uppercase tracking-wider">
                Status Resolution
              </div>
            </div>

            <div className="bg-[#FFFDF8] border border-[#E5DCD4] rounded-2xl p-5 shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#B8A08A]">100%</div>
              <div className="text-[11px] font-bold text-[#75666A] mt-1 uppercase tracking-wider">
                Student Focused
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT / PROBLEM SOLVED SECTION */}
        <section id="about" className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E5DCD4]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1E2D] bg-[#FFFDF8] px-3.5 py-1 rounded-full border border-[#E5DCD4]">
              Campus Bottlenecks Solved
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241A1C] mt-3">
              Engineered to Eliminate Campus Friction
            </h2>
            <p className="text-[#75666A] mt-3 text-base sm:text-lg leading-relaxed">
              University life shouldn't be scattered across informal WhatsApp chats, unbacked spreadsheets, lost noticeboards, and disconnected department websites.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#FFFDF8] rounded-3xl p-7 border border-[#E5DCD4] shadow-xs hover:border-[#B8A08A] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F1F2] text-[#6B1E2D] flex items-center justify-center mb-5 border border-[#E5DCD4]">
                <Clock size={22} />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#241A1C]">
                Attendance Shortage Surprises
              </h3>
              <p className="text-sm text-[#75666A] mt-2 leading-relaxed">
                Students frequently miscalculate safe bunk allowances and discover too late that they fall beneath the university's 75% condonation barrier.
              </p>
              <div className="mt-5 pt-4 border-t border-[#E5DCD4] flex items-center gap-2 text-xs font-bold text-[#6B1E2D]">
                <CheckCircle2 size={15} className="text-[#4F7A5A]" />
                <span>UniSphere's Bunk Simulator eliminates ambiguity</span>
              </div>
            </div>

            <div className="bg-[#FFFDF8] rounded-3xl p-7 border border-[#E5DCD4] shadow-xs hover:border-[#B8A08A] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] text-[#75666A] flex items-center justify-center mb-5 border border-[#E5DCD4]">
                <MessageSquare size={22} />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#241A1C]">
                Unresolved Campus Grievances
              </h3>
              <p className="text-sm text-[#75666A] mt-2 leading-relaxed">
                Defective lab equipment, hostel maintenance bottlenecks, and canteen complaints stall when submitted through informal oral channels.
              </p>
              <div className="mt-5 pt-4 border-t border-[#E5DCD4] flex items-center gap-2 text-xs font-bold text-[#6B1E2D]">
                <CheckCircle2 size={15} className="text-[#4F7A5A]" />
                <span>Structured department tickets with transparent timelines</span>
              </div>
            </div>

            <div className="bg-[#FFFDF8] rounded-3xl p-7 border border-[#E5DCD4] shadow-xs hover:border-[#B8A08A] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#EFE8DC] text-[#241A1C] flex items-center justify-center mb-5 border border-[#E5DCD4]">
                <Layers size={22} />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#241A1C]">
                Fragmented Academic Materials
              </h3>
              <p className="text-sm text-[#75666A] mt-2 leading-relaxed">
                Essential lecture summaries and lost valuable items vanish into fast-moving group message logs where links expire and files corrupt.
              </p>
              <div className="mt-5 pt-4 border-t border-[#E5DCD4] flex items-center gap-2 text-xs font-bold text-[#6B1E2D]">
                <CheckCircle2 size={15} className="text-[#4F7A5A]" />
                <span>Curated PDF repositories & campus coordinate recovery map</span>
              </div>
            </div>
          </div>
        </section>

        {/* CORE MODULES INTERACTIVE SHOWCASE */}
        <section id="modules" className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1E2D] bg-[#FFFDF8] px-3 py-1 rounded-full border border-[#E5DCD4]">
              Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241A1C] mt-3">
              Explore the 4 Pillars of UniSphere
            </h2>
            <p className="text-[#75666A] mt-2 text-base">
              Select any core pillar below to inspect its dedicated tools and capabilities.
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-10 p-1.5 bg-[#EFE8DC] rounded-2xl border border-[#E5DCD4]">
            {modules.map((m) => {
              const Icon = m.icon;
              const isActive = activeTab === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#6B1E2D] text-white shadow-xs"
                      : "text-[#75666A] hover:text-[#241A1C] hover:bg-[#FFFDF8]"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-[#B8A08A]" : "text-[#75666A]"} />
                  <span>{m.title.split(" ")[0]}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B8A08A]" />}
                </button>
              );
            })}
          </div>

          {/* Active Module Showcase Card */}
          <div className="bg-[#FFFDF8] rounded-3xl p-8 sm:p-12 border border-[#E5DCD4] shadow-sm max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Details */}
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold bg-[#FAF6F0] text-[#6B1E2D] border border-[#E5DCD4] mb-4">
                  <span>{activeModuleData.tag}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#241A1C]">
                  {activeModuleData.title}
                </h3>
                <p className="text-xs font-bold text-[#B8A08A] uppercase tracking-wider mt-1">
                  {activeModuleData.subtitle}
                </p>

                <p className="mt-4 text-[#75666A] text-sm leading-relaxed">
                  {activeModuleData.description}
                </p>

                {/* Highlights List */}
                <div className="mt-6 space-y-2.5">
                  {activeModuleData.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-[#F8F1F2] text-[#6B1E2D] flex items-center justify-center flex-shrink-0 border border-[#E5DCD4]">
                        <CheckCircle2 size={13} />
                      </div>
                      <span className="text-xs font-semibold text-[#241A1C]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Direct Action Link */}
                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B1E2D] hover:bg-[#48121E] text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
                  >
                    <span>Open in Dashboard</span>
                    <ArrowRight size={14} />
                  </button>

                  <span className="text-xs text-[#75666A] font-medium">
                    Integrated with UniSphere Auth
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Preview Box */}
              <div className="md:col-span-5 bg-[#FAF6F0] p-6 rounded-2xl border border-[#E5DCD4]">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5DCD4]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6B1E2D]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#B8A08A]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4F7A5A]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#75666A]">
                    unisphere://{activeModuleData.id}
                  </span>
                </div>

                <div className="mt-6 text-center py-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFFDF8] shadow-xs border border-[#E5DCD4] mx-auto flex items-center justify-center mb-4 text-[#6B1E2D]">
                    <activeModuleData.icon size={30} />
                  </div>

                  <div className="text-4xl font-serif font-bold text-[#241A1C]">
                    {activeModuleData.previewStats.metric}
                  </div>
                  <div className="text-xs font-bold text-[#75666A] mt-1">
                    {activeModuleData.previewStats.label}
                  </div>

                  <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2F3] text-[#6B1E2D] border border-[#E5DCD4] text-xs font-bold">
                    <ShieldCheck size={14} className="text-[#B8A08A]" />
                    <span>{activeModuleData.previewStats.status}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#E5DCD4] text-center">
                  <p className="text-[11px] text-[#75666A]">
                    Designed for students, faculty & administrators
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW SECTION */}
        <section id="workflow" className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E5DCD4]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1E2D] bg-[#FFFDF8] px-3.5 py-1 rounded-full border border-[#E5DCD4]">
              Frictionless Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241A1C] mt-3">
              How Students Use UniSphere
            </h2>
            <p className="text-[#75666A] mt-2 text-base">
              A 3-step streamlined workflow tailored to fast-paced university schedules.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative bg-[#FFFDF8] rounded-3xl p-7 border border-[#E5DCD4] shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#B8A08A] mb-3">01</div>
              <h3 className="text-base font-serif font-bold text-[#241A1C]">
                Register with University Email
              </h3>
              <p className="text-xs text-[#75666A] mt-2 leading-relaxed">
                Create your verified profile in seconds or access immediately via the one-click demo sandbox.
              </p>
            </div>

            <div className="relative bg-[#FFFDF8] rounded-3xl p-7 border border-[#E5DCD4] shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#B8A08A] mb-3">02</div>
              <h3 className="text-base font-serif font-bold text-[#241A1C]">
                Simulate Bunks & Lodge Tickets
              </h3>
              <p className="text-xs text-[#75666A] mt-2 leading-relaxed">
                Log daily classes, forecast safe bunks with what-if scenarios, register complaints, and drop recovery pins on campus maps.
              </p>
            </div>

            <div className="relative bg-[#FFFDF8] rounded-3xl p-7 border border-[#E5DCD4] shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#B8A08A] mb-3">03</div>
              <h3 className="text-base font-serif font-bold text-[#241A1C]">
                Clear Exam Admittance
              </h3>
              <p className="text-xs text-[#75666A] mt-2 leading-relaxed">
                Defend your mandatory 75% attendance criteria with zero last-minute surprises and collaborate over peer study materials.
              </p>
            </div>
          </div>
        </section>

        {/* COMPARISON / WHY UNISPHERE SECTION */}
        <section id="comparison" className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E5DCD4]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B1E2D] bg-[#FFFDF8] px-3.5 py-1 rounded-full border border-[#E5DCD4]">
              System Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241A1C] mt-3">
              The UniSphere Advantage
            </h2>
            <p className="text-[#75666A] mt-2 text-base">
              Comparing chaotic informal channels against UniSphere's unified student workspace.
            </p>
          </div>

          <div className="bg-[#FFFDF8] rounded-3xl border border-[#E5DCD4] overflow-hidden shadow-sm max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#FAF6F0] border-b border-[#E5DCD4]">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#75666A]">Campus Workflow</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#A63D40]">Traditional Channels</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#6B1E2D]">UniSphere Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DCD4]">
                  <tr>
                    <td className="p-4 font-bold text-[#241A1C]">Attendance Cutoff Defense</td>
                    <td className="p-4 text-[#75666A] text-xs">Spreadsheet guesswork & sudden condonation fines</td>
                    <td className="p-4 text-[#4F7A5A] text-xs font-bold">Predictive safe bunk formula with automated alerts</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#241A1C]">Campus Grievances</td>
                    <td className="p-4 text-[#75666A] text-xs">Unanswered paper complaint books & forgotten forms</td>
                    <td className="p-4 text-[#4F7A5A] text-xs font-bold">Transparent status timeline & admin escalation</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#241A1C]">Lost & Found Recovery</td>
                    <td className="p-4 text-[#75666A] text-xs">Spamming 500-person WhatsApp groups & noticeboards</td>
                    <td className="p-4 text-[#4F7A5A] text-xs font-bold">Interactive canvas map with precise building pins</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#241A1C]">Lecture Notes & Sharing</td>
                    <td className="p-4 text-[#75666A] text-xs">Broken Google Drive links & expiring attachments</td>
                    <td className="p-4 text-[#4F7A5A] text-xs font-bold">Curated PDF previews & collaborative study circles</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#48121E] via-[#6B1E2D] to-[#351019] rounded-3xl p-10 sm:p-14 text-center text-white shadow-xl shadow-[#6B1E2D]/15 relative overflow-hidden">
            {/* Subtle background ambient glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#B8A08A]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full text-[#D8CBBE] border border-white/10">
                <Sparkles size={13} className="text-[#B8A08A]" />
                <span>Ready to Experience UniSphere?</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white mt-2">
                Elevate Your Campus Journey Today
              </h2>

              <p className="text-[#D8CBBE] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Create your student account in under 30 seconds or sign in to verify your courses, calculate safe bunks, and resolve campus tickets.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => navigate("/register")}
                  className="px-7 py-3.5 rounded-xl bg-[#FFFDF8] text-[#6B1E2D] font-bold text-xs hover:bg-[#F8F3EA] transition shadow-md shadow-black/10 cursor-pointer active:scale-95"
                >
                  Create Student Account →
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-[#FFFDF8] font-bold text-xs transition cursor-pointer"
                >
                  Log In to Existing Account
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-5 py-3.5 rounded-xl text-xs font-bold text-[#D8CBBE] hover:text-white transition cursor-pointer"
                >
                  Explore Demo Dashboard
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#E5DCD4] bg-[#FFFDF8] py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#6B1E2D] text-white flex items-center justify-center">
                <GraduationCap size={18} />
              </div>
              <span className="font-serif font-bold text-lg text-[#241A1C] tracking-tight">
                Uni<span className="text-[#6B1E2D]">Sphere</span>
              </span>
            </div>
            <p className="text-xs text-[#75666A] max-w-sm leading-relaxed">
              Intelligent academic and campus operations platform uniting attendance defense, peer knowledge, grievance escalation, and campus asset recovery.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#4F7A5A] font-semibold pt-2">
              <span className="w-2 h-2 rounded-full bg-[#4F7A5A] animate-pulse" />
              <span>All Campus Services Operational • 2026</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#241A1C] mb-3">Core Modules</h4>
            <ul className="space-y-2 text-xs text-[#75666A]">
              <li><button onClick={() => navigate("/attendance")} className="hover:text-[#6B1E2D] cursor-pointer">Attendance Calculator & Predictor</button></li>
              <li><button onClick={() => navigate("/complaints")} className="hover:text-[#6B1E2D] cursor-pointer">Campus Grievance Portal</button></li>
              <li><button onClick={() => navigate("/lost-found")} className="hover:text-[#6B1E2D] cursor-pointer">Lost & Found Coordinate Grid</button></li>
              <li><button onClick={() => navigate("/notes")} className="hover:text-[#6B1E2D] cursor-pointer">Peer Notes & Study Circle</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#241A1C] mb-3">Student Access</h4>
            <ul className="space-y-2 text-xs text-[#75666A]">
              <li><button onClick={() => navigate("/login")} className="hover:text-[#6B1E2D] cursor-pointer">Student Portal Log In</button></li>
              <li><button onClick={() => navigate("/register")} className="hover:text-[#6B1E2D] cursor-pointer">Register New Account</button></li>
              <li><button onClick={() => navigate("/dashboard")} className="hover:text-[#6B1E2D] cursor-pointer">Live Demo Workspace</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[#E5DCD4] flex flex-col sm:flex-row items-center justify-between text-xs text-[#75666A]">
          <p>© 2026 UniSphere Academic Operating System • Burgundy Luxe Edition.</p>
          <p className="mt-2 sm:mt-0">Designed for student success and administrative transparency.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
