import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  CalendarCheck,
  Search,
  BookOpen,
  MessageSquare,
  Users,
  Library,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Lock,
  CheckCircle2,
  Check,
  Menu,
  X,
  Terminal,
  Cpu,
  Compass,
  Award,
  BookCheck,
  HelpCircle,
  Clock,
  Layers,
  MapPin,
  RotateCcw,
  Maximize2,
  Minimize2,
  LogOut,
  Image as ImageIcon
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/common/ThemeToggle";
import "./Home.css";

// Campus imagery assets for editorial hero composition
import campusReferenceImg from "../assets/campus-columns.jpg";
import campusPillarsImg from "../assets/campus-pillars.png";
import campusColumnsImg from "../assets/campus-columns.jpg";

function HomePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModuleTab, setActiveModuleTab] = useState("attendance");
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  // Smooth scroll back to top of homepage when brand logo/name is clicked
  const handleBrandClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Role Selection Modal State
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Listen for Escape key to close modal & toggle body scroll lock class
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsRoleModalOpen(false);
      }
    };
    if (isRoleModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [isRoleModalOpen]);

  // Accordion state for FAQ section
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const heroAnnouncements = [
    {
      year: "2026",
      tag: "Academic Excellence",
      title: "Admissions Open for Undergraduate & Engineering Cohorts 2026–2027",
      desc: "Explore interdisciplinary programs blending computer science, software engineering, and university leadership."
    },
    {
      year: "2026",
      tag: "Campus Innovation",
      title: "Fully Funded Research Fellowships & Undergraduate Innovation Grants",
      desc: "Review available research positions across cutting-edge systems and collaborative laboratories."
    },
    {
      year: "2026",
      tag: "Frontend Engineering",
      title: "Full-Stack Single Page Application Curriculum Now Live",
      desc: "Master modern React, State Architecture, and Component Systems integrated with campus operations."
    }
  ];

  const nextHeroSlide = () => {
    setHeroSlideIndex((prev) => (prev + 1) % heroAnnouncements.length);
  };

  const prevHeroSlide = () => {
    setHeroSlideIndex((prev) => (prev - 1 + heroAnnouncements.length) % heroAnnouncements.length);
  };

  const currentAnnouncement = heroAnnouncements[heroSlideIndex];

  // Complete 6 Core Campus Operating Modules
  const campusModules = [
    {
      id: "attendance",
      title: "Smart Attendance Hub",
      subtitle: "Predictive Analytics & Cutoff Defense",
      icon: CalendarCheck,
      tag: "Integrated in Dashboard",
      route: "/dashboard",
      description:
        "Accurately track lectures, laboratory sessions, and attendance percentages with decimal precision. UniSphere calculates safe bunks, warns ahead of condonation thresholds, and forecasts exam admittance.",
      highlights: [
        "Mathematical formula: (Attended / Total Scheduled) × 100",
        "Predictive safe-bunk and consecutive class recovery calculator",
        "Today's interactive timetable with 1-click attendance marking",
        "Configurable target thresholds (65% condonation, 75% standard, 85% honors)"
      ],
      metric: "88.4%",
      metricLabel: "Active Cohort Standing",
      status: "Safe Exam Admittance"
    },
    {
      id: "lostfound",
      title: "Lost & Found Network",
      subtitle: "Coordinate-Mapped Campus Recovery",
      icon: Search,
      tag: "Interactive Campus Grid",
      route: "/lost-found",
      description:
        "Misplaced your student ID, calculator, laptop charger, or notebook? The Lost & Found network links finders and owners across all campus blocks with pinpoint location coordinates.",
      highlights: [
        "Interactive campus block map with pinpoint zone coordinates",
        "Distinct status markers: Missing (Crimson) vs Recovered (Sage)",
        "3-hour live map visibility filter with permanent archive history",
        "Community recognition: Earn +100 recovery points (1,000 pts = Cafe voucher)"
      ],
      metric: "120+",
      metricLabel: "Belongings Recovered",
      status: "Active Campus Grid"
    },
    {
      id: "complaints",
      title: "Complaints & Grievances",
      subtitle: "Transparent Campus Resolution System",
      icon: MessageSquare,
      tag: "Direct Escalation",
      route: "/complaints",
      description:
        "A formal, transparent channel for students to lodge and track campus grievances regarding laboratories, hostels, dining facilities, Wi-Fi connectivity, and academic infrastructure.",
      highlights: [
        "9 standardized categories (Hostel, Mess, Wi-Fi, Classrooms, Transport, etc.)",
        "Automated routing to appropriate department administrators",
        "Live status timeline: Submitted → Under Review → In Progress → Resolved",
        "Photo evidence upload and community +1 issue upvoting"
      ],
      metric: "94.2%",
      metricLabel: "Resolution Efficiency",
      status: "Verified Timeline"
    },
    {
      id: "notes",
      title: "Notes Marketplace",
      subtitle: "Curated Academic Knowledge Base",
      icon: BookOpen,
      tag: "Collaborative Learning",
      route: "/notes",
      description:
        "Never scramble before midterms or finals again. Access verified lecture summaries, unit-wise question banks, handwritten cheatsheets, and synchronous virtual study circles.",
      highlights: [
        "Semester-wise course repositories and unit lecture notes",
        "6-Page Sample Preview Modal (first 3 and last 3 pages) before buy",
        "Verified student cheatsheet repository with peer ratings",
        "Instant purchase demo flow with immediate library download"
      ],
      metric: "450+",
      metricLabel: "Verified Resources",
      status: "Updated Daily"
    },
    {
      id: "group-study",
      title: "Virtual Study Lounge",
      subtitle: "Synchronous Real-Time Collaboration",
      icon: Users,
      tag: "Synchronous Rooms",
      route: "/group-study",
      description:
        "Join virtual peer study rooms designed for focused academic sprints. Share notes, view active peer pages, track mock cursors, and keep your focus with Pomodoro timers.",
      highlights: [
        "Live peer presence status ('Person 1 — Online') and page tracking",
        "Interactive mock peer cursors with participant name tags",
        "Non-disruptive reaction stickers and integrated discussion chat",
        "Integrated 25-minute Pomodoro focus timer with interval alerts"
      ],
      metric: "24",
      metricLabel: "Peers Online Now",
      status: "Synchronous Pods"
    },
    {
      id: "library",
      title: "Smart Library System",
      subtitle: "Live Floor Layout & Catalog System",
      icon: Library,
      tag: "36-Seat Floor Map",
      route: "/library",
      description:
        "Eliminate study desk hunting. View a live 36-seat visual map across quiet, collaborative, and terminal zones, and track expected return dates for high-demand engineering textbooks.",
      highlights: [
        "Visual 36-seat interactive floor grid (Quiet, Pods, Terminals)",
        "Strict count matching: Total (36) === Available + Occupied seats",
        "1-click interactive seat reservation and instant release",
        "Book catalog with search, category filters, and expected return dates"
      ],
      metric: "17 / 36",
      metricLabel: "Seats Available",
      status: "Live Floor Layout"
    }
  ];

  const activeModuleIndex = campusModules.findIndex((m) => m.id === activeModuleTab);
  const activeModule = campusModules[activeModuleIndex !== -1 ? activeModuleIndex : 0];

  const handleNextModule = () => {
    const nextIdx = (activeModuleIndex + 1) % campusModules.length;
    setActiveModuleTab(campusModules[nextIdx].id);
  };

  const handlePrevModule = () => {
    const prevIdx = (activeModuleIndex - 1 + campusModules.length) % campusModules.length;
    setActiveModuleTab(campusModules[prevIdx].id);
  };

  // Comprehensive FAQ Accordion Data for All 6 Modules
  const faqItems = [
    {
      id: "faq-attendance",
      category: "Attendance & Cutoff Defense",
      question: "How does the Smart Attendance safe-bunk formula calculate safe bunks and recovery classes?",
      answer:
        "UniSphere applies the university mathematical formula: (Attended Classes / Total Scheduled Classes) ≥ 75.0%. To calculate safe bunks, the algorithm computes: Safe Bunks = floor((Attended - (0.75 × Total)) / 0.75). This is the exact number of future consecutive classes you can afford to miss without falling below the 75% threshold. If your attendance is currently below 75%, it calculates the required recovery classes: Required Classes = ceil(((0.75 × Total) - Attended) / 0.25). This ensures zero last-minute condonation surprises before exam hall tickets are issued."
    },
    {
      id: "faq-lostfound",
      category: "Lost & Found Campus Network",
      question: "How does the campus map work, how long do reports stay visible, and what are voucher rewards?",
      answer:
        "The Lost & Found network visualizes campus zones (Library, Turing Block, Academic Block, Cafeteria, Hostel, Main Gate, Sports Ground) with Crimson pins for missing belongings and Sage pins for found items. Active reports remain highlighted on the live campus map for 3 hours to encourage immediate local recovery, after which they remain permanently accessible under your 'My Reports' history. Students who report or return found items earn +100 recovery points. Accumulating 1,000 points unlocks a 1-day food discount voucher redeemable at campus cafes like Bev Cafe."
    },
    {
      id: "faq-complaints",
      category: "Grievances & Redressal",
      question: "Which 9 categories are supported in the Complaint Portal and how are grievances tracked?",
      answer:
        "Complaints can be lodged across 9 structured categories: Hostel Facilities, Mess & Dining, Wi-Fi & Network, Classrooms & Labs, Campus Transportation, Cleanliness & Hygiene, Faculty & Academic, Campus Infrastructure, and Other Inquiries. Every complaint is assigned a tracking ID and moves through a 4-stage lifecycle: Submitted → Under Department Review → In Progress (Maintenance Assigned) → Resolved. Students can upload photo attachments and view department resolution updates in real-time."
    },
    {
      id: "faq-notes",
      category: "Notes Marketplace",
      question: "How does the Notes Marketplace 6-Page Preview feature work before unlocking a document?",
      answer:
        "To guarantee academic quality, every note listing features an interactive 6-page preview modal. The reader opens with the first 3 pages (fundamental syllabus introduction, definitions, and core formulas) and the last 3 pages (high-yield exam cheat sheets, solved semester questions, and final summary tables). This allows students to verify handwriting legibility and curriculum relevance before downloading or completing the demo purchase flow."
    },
    {
      id: "faq-groupstudy",
      category: "Virtual Study Lounge",
      question: "What collaborative features are available in the Group Study Lounge?",
      answer:
        "The Group Study Lounge is a synchronous digital collaboration space. It displays real-time peer presence indicators ('Person 1 — Online', active page numbers), a shared PDF/document viewer, simulated peer cursors with names moving across the document, quick reaction emojis/stickers for instant non-disruptive feedback, an integrated peer discussion chat, and a 25-minute Pomodoro study focus timer with interval alerts."
    },
    {
      id: "faq-library",
      category: "Smart Library System",
      question: "How does the Smart Library 36-seat live layout work and how are book return dates determined?",
      answer:
        "The Smart Library features a 36-seat interactive floor grid divided into three distinct zones: Quiet Study Zone (12 seats), Collaborative Pods (12 seats), and Tech Terminal Zone (12 seats). The total displayed seat count strictly matches the individual seat states: Total (36) = Available (17) + Occupied (19). Clicking any seat allows instant local reservation. In the book catalog, checked-out volumes display their expected return dates and reservation queue counts."
    }
  ];

  return (
    <div className="unisphere-root">
      {/* =========================================================================
          TOP INSTITUTIONAL TICKER
          ========================================================================= */}
      <div className="unisphere-ticker">
        <div className="unisphere-container unisphere-ticker-inner">
          <div className="ticker-left">
            <span className="ticker-pulse-dot" />
            <span className="ticker-text-primary">
              {isAuthenticated
                ? `UNISPHERE ACADEMIC SYSTEM • SIGNED IN: ${user?.name?.toUpperCase() || "STUDENT"} (${user?.role?.toUpperCase() || "STUDENT"})`
                : "UNISPHERE ACADEMIC SYSTEM • 2026 TERM ACTIVE"}
            </span>
          </div>
          <div className="ticker-center">
            <span className="ticker-text-secondary">
              Mandatory Cutoff Defense: 75.0% • Engineering Syllabus Integrated
            </span>
          </div>
          <div className="ticker-right">
            {isAuthenticated ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="ticker-action-link"
                title="Go to Campus Dashboard"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={12} />
              </button>
            ) : (
              <button
                onClick={() => setIsRoleModalOpen(true)}
                className="ticker-action-link"
              >
                <span>Choose Role</span>
                <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          PRIMARY NAVIGATION BAR
          ========================================================================= */}
      <header className="unisphere-navbar">
        <div className="unisphere-container unisphere-nav-inner">
          {/* Brand Logo: Clicking smoothly scrolls to top of page */}
          <div
            onClick={handleBrandClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleBrandClick();
              }
            }}
            className="unisphere-brand"
            role="button"
            tabIndex={0}
            title="UniSphere Academic System — Return to Top"
            aria-label="UniSphere Academic System — Return to Top"
          >
            <div className="brand-monogram">
              <GraduationCap size={20} strokeWidth={2.4} />
            </div>
            <div className="brand-text-group">
              <span className="brand-name">
                UNI<span className="brand-name-serif">SPHERE</span>
              </span>
              <span className="brand-sub">University Academic System</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="unisphere-desktop-nav" aria-label="Main Navigation">
            <a href="#hero" className="nav-item-link active">
              Home
            </a>
            <a href="#campus" className="nav-item-link">Programs</a>
            <a href="#workflow" className="nav-item-link">How It Works</a>
            <a href="#value" className="nav-item-link">Campus</a>
            <a href="#glance" className="nav-item-link">About</a>
          </nav>

          {/* Navigation CTAs */}
          <div className="unisphere-nav-cta-group">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <div
                  className="nav-user-badge"
                  onClick={() => navigate("/dashboard")}
                  title={`Signed in as ${user?.name || "Student"} (${user?.role || "Student"})`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="nav-user-avatar">
                    {user?.initials || "ST"}
                  </div>
                  <div className="nav-user-info">
                    <span className="nav-user-name">{user?.name?.split(" ")[0] || "User"}</span>
                    <span className="nav-user-role-chip">{user?.role || "Student"}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn-nav-primary btn-nav-dashboard"
                >
                  <span>Dashboard</span>
                  <ArrowRight size={13} />
                </button>

                <button
                  onClick={() => logout()}
                  className="btn-nav-signout"
                  title="Sign out of UniSphere"
                >
                  <LogOut size={13} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="btn-nav-login"
                >
                  <Lock size={13} />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => setIsRoleModalOpen(true)}
                  className="btn-nav-primary btn-nav-choose-role"
                >
                  <span>Choose Role</span>
                  <ArrowRight size={13} />
                </button>
              </>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-mobile-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="unisphere-mobile-drawer">
            <nav className="mobile-nav-links">
              <a
                href="#hero"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#glance"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                UNISPHERE at a Glance
              </a>
              <a
                href="#campus"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                Campus Modules (All 6)
              </a>
              <a
                href="#workflow"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#value"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                Student &amp; Faculty Value
              </a>
              <a
                href="#faq"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                Module FAQ &amp; Guidance
              </a>
            </nav>
            <div className="mobile-drawer-actions">
              <div style={{ padding: "0.5rem 0", display: "flex", justifyContent: "flex-end" }}>
                <ThemeToggle />
              </div>
              {isAuthenticated ? (
                <>
                  <div className="mobile-drawer-user-info">
                    <div className="nav-user-avatar">
                      {user?.initials || "ST"}
                    </div>
                    <div>
                      <div className="mobile-drawer-user-name">{user?.name || "User"}</div>
                      <div className="mobile-drawer-user-role">{user?.role || "Student"} • {user?.department || "Campus"}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/dashboard");
                    }}
                    className="btn-mobile-dashboard"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="btn-mobile-logout"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsRoleModalOpen(true);
                    }}
                    className="btn-mobile-register"
                  >
                    <span>Choose Role</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/login");
                    }}
                    className="btn-mobile-login"
                  >
                    <Lock size={14} />
                    <span>Student Portal Login</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Full-screen cinematic campus hero inspired by the reference */}
      <section id="hero" className="unisphere-hero-editorial-section reference-hero">
        <img className="reference-hero-image" src={campusReferenceImg} alt="Classical university campus framed by grand columns" />
        <div className="reference-hero-shade" />
        <div className="reference-hero-content">
          <span className="reference-hero-kicker"><span /> YOUR CAMPUS. ONE CONNECTED WORLD.</span>
          <h1 className="reference-hero-title">UniSphere<span>.</span></h1>
          <p className="reference-hero-subtitle">A smarter way to experience university life.</p>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="reference-hero-cta"
              aria-label="Continue to your campus dashboard"
            >
              <span>Go to Dashboard</span>
              <span className="reference-hero-arrow"><ArrowRight size={17} /></span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsRoleModalOpen(true)}
              className="reference-hero-cta"
              aria-label="Choose whether you are a student or teacher"
            >
              <span>Choose Role</span>
              <span className="reference-hero-arrow"><ArrowRight size={17} /></span>
            </button>
          )}
        </div>
        <button
          type="button"
          className="reference-hero-scroll"
          onClick={() => document.getElementById("glance")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span>SCROLL TO EXPLORE</span><ChevronDown size={16} />
        </button>
        <div className="reference-hero-stats">
          <div><strong>6</strong><span>Campus tools</span></div>
          <i />
          <div><strong>One</strong><span>Connected platform</span></div>
          <i />
          <div><strong>Every day</strong><span>Made simpler</span></div>
        </div>
      </section>

      {/* =========================================================================
          INTRODUCTION & AT A GLANCE
          ========================================================================= */}
      <section id="glance" className="unisphere-glance-section">
        <div className="unisphere-container">
          <div className="glance-intro-grid">
            {/* Left Column */}
            <div className="glance-left-col">
              <span className="section-eyebrow-label">2026 RECAP</span>
              <h2 className="glance-main-title">
                UNISPHERE at a Glance
              </h2>
              <div className="editorial-divider-line" />
              <p className="glance-sub-note">
                An integrated platform uniting academic governance, curriculum engineering, and student campus welfare.
              </p>
            </div>

            {/* Right Column */}
            <div className="glance-right-col">
              <span className="section-mini-tag">About UNISPHERE</span>
              <h3 className="glance-editorial-quote">
                Our numbers reflect a tradition of academic distinction and forward-thinking impact in education, research, and campus innovation.
              </h3>
              <p className="glance-editorial-paragraph">
                University life should not be fragmented between informal group chats, forgotten paper complaint books, unverified notes, and unexpected attendance shortages. UNISPHERE bridges classroom pedagogy, real-time analytics, and campus life into a cohesive, high-performance ecosystem.
              </p>
            </div>
          </div>

          {/* Statistics & Highlights Cards Grid */}
          <div className="glance-cards-grid">
            {/* Card 1: Students */}
            <div className="glance-stat-card card-cream">
              <div className="stat-card-header">
                <span className="stat-card-category">Students</span>
                <Users size={20} className="stat-icon-taupe" />
              </div>
              <div className="stat-card-number">40,000+</div>
              <p className="stat-card-caption">
                Undergraduate, graduate, and engineering scholars thriving across connected digital campuses.
              </p>
              <div className="stat-card-footer-pill">
                <CheckCircle2 size={13} className="footer-pill-check" />
                <span>Verified Enrollment</span>
              </div>
            </div>

            {/* Card 2: Research Centers */}
            <div className="glance-stat-card card-dark-chocolate">
              <div className="stat-card-header">
                <span className="stat-card-category text-light-beige">Research Centers</span>
                <Cpu size={20} className="stat-icon-gold" />
              </div>
              <div className="stat-card-number text-cream">100+</div>
              <p className="stat-card-caption text-light-taupe">
                World-leading innovation laboratories, developer study pods, and specialized computational research units.
              </p>
              <div className="stat-card-footer-pill pill-dark-mode">
                <Sparkles size={13} className="footer-pill-gold" />
                <span>Interdisciplinary Hubs</span>
              </div>
            </div>

            {/* Card 3: Attendance Defense */}
            <div className="glance-stat-card card-offwhite">
              <div className="stat-card-header">
                <span className="stat-card-category">Cutoff Defense</span>
                <CalendarCheck size={20} className="stat-icon-taupe" />
              </div>
              <div className="stat-card-number">75.0%</div>
              <p className="stat-card-caption">
                Rigorous mathematical safe-bunk formula safeguarding students from semester condonation penalties.
              </p>
              <div className="stat-card-footer-pill">
                <ShieldCheck size={13} className="footer-pill-check" />
                <span>Zero Shortage Surprises</span>
              </div>
            </div>

            {/* Card 4: Curated Resources */}
            <div className="glance-stat-card card-warm-taupe">
              <div className="stat-card-header">
                <span className="stat-card-category">Academic Notes</span>
                <BookCheck size={20} className="stat-icon-taupe" />
              </div>
              <div className="stat-card-number">450+</div>
              <p className="stat-card-caption">
                Verified lecture repositories, unit-wise question banks, and collaborative cheatsheets shared campus-wide.
              </p>
              <div className="stat-card-footer-pill">
                <CheckCircle2 size={13} className="footer-pill-check" />
                <span>Peer-Reviewed Archives</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CAMPUS OPERATING PILLARS (Interactive Sliding Cards for ALL 6 MODULES)
          ========================================================================= */}
      <section id="campus" className="unisphere-pillars-section">
        <div className="unisphere-container">
          <div className="pillars-section-header">
            <span className="section-eyebrow-label">INTEGRATED PLATFORM</span>
            <h2 className="section-main-title">
              The 6 Operating Pillars of UniSphere
            </h2>
            <p className="section-main-description">
              Browse any foundational module below to inspect live metrics, architectural capabilities, and launch its dedicated student workspace.
            </p>
          </div>

          {/* Module Carousel Controls Header */}
          <div className="pillars-carousel-controls-bar">
            <div className="pillars-carousel-arrows">
              <button
                type="button"
                onClick={handlePrevModule}
                className="carousel-arrow-btn"
                aria-label="Previous Campus Module"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="carousel-counter-label">
                0{activeModuleIndex + 1} / 0{campusModules.length}
              </span>
              <button
                type="button"
                onClick={handleNextModule}
                className="carousel-arrow-btn"
                aria-label="Next Campus Module"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Module Selector Pill Bar */}
            <div className="pillars-tab-nav">
              {campusModules.map((mod) => {
                const Icon = mod.icon;
                const isCurrent = activeModuleTab === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModuleTab(mod.id)}
                    className={`pillar-nav-btn ${isCurrent ? "active" : ""}`}
                  >
                    <Icon size={16} className="pillar-nav-icon" />
                    <span>{mod.title.split(" ")[0]}</span>
                    {isCurrent && <span className="pillar-active-indicator" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Module Showcase Card */}
          <div className="pillar-showcase-card">
            <div className="pillar-showcase-grid">
              {/* Pillar Details */}
              <div className="pillar-details-pane">
                <div className="pillar-tag-row">
                  <span className="pillar-meta-tag">{activeModule.tag}</span>
                  <span className="pillar-status-chip">
                    <CheckCircle2 size={12} className="status-chip-icon" />
                    <span>Active in Term 2026</span>
                  </span>
                </div>

                <h3 className="pillar-display-title">{activeModule.title}</h3>
                <p className="pillar-display-subtitle">{activeModule.subtitle}</p>
                <p className="pillar-display-desc">{activeModule.description}</p>

                {/* Highlights */}
                <div className="pillar-highlights-group">
                  {activeModule.highlights.map((point, pIdx) => (
                    <div key={pIdx} className="pillar-highlight-line">
                      <div className="highlight-check-bullet">
                        <Check size={12} />
                      </div>
                      <span className="highlight-point-text">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Action Link to Role Selection or Route */}
                <div className="pillar-action-row">
                  <button
                    onClick={() => navigate("/role-selection")}
                    className="pillar-launch-btn"
                  >
                    <span>Launch {activeModule.title}</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => navigate("/role-selection")}
                    className="pillar-secondary-btn"
                  >
                    <span>Access via Student Suite</span>
                  </button>
                </div>
              </div>

              {/* Pillar Metric Preview Pane */}
              <div className="pillar-metric-pane">
                <div className="metric-pane-header">
                  <span className="metric-pane-route">
                    unisphere://workspace{activeModule.route}
                  </span>
                  <span className="metric-pane-live-badge">Live System</span>
                </div>

                <div className="metric-pane-center">
                  <div className="metric-pane-icon-halo">
                    <activeModule.icon size={36} className="metric-pane-icon" />
                  </div>

                  <div className="metric-pane-big-number">{activeModule.metric}</div>
                  <div className="metric-pane-label">{activeModule.metricLabel}</div>

                  <div className="metric-pane-standing-pill">
                    <ShieldCheck size={14} className="standing-shield-icon" />
                    <span>{activeModule.status}</span>
                  </div>
                </div>

                <div className="metric-pane-footer">
                  <span className="metric-footer-note">
                    Integrated with UniSphere Client-Side Persistence
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS (Step-by-Step Experience for Students & Teachers)
          ========================================================================= */}
      <section id="workflow" className="unisphere-workflow-section">
        <div className="unisphere-container">
          <div className="workflow-section-header">
            <span className="section-eyebrow-label">STREAMLINED ONBOARDING</span>
            <h2 className="section-main-title">
              How Students &amp; Teachers Use UniSphere
            </h2>
            <p className="section-main-description">
              A frictionless three-stage onboarding journey designed to eliminate administrative friction, protect academic standing, and foster collaborative learning.
            </p>
          </div>

          <div className="workflow-cards-grid workflow-grid-3">
            {/* Step 1: Choose Role */}
            <div className="workflow-step-card">
              <div className="step-num-watermark">01</div>
              <span className="step-tag-pill">Stage 01 • Identification</span>
              <h3 className="step-card-title">
                Choose Your Affiliation
              </h3>
              <p className="step-card-desc">
                Select your university profile as a Student or Teacher. Seamlessly enter the dedicated portal tailored to your daily academic workflows.
              </p>
              <div className="step-card-footer">
                <button
                  type="button"
                  onClick={() => setIsRoleModalOpen(true)}
                  className="step-footer-action-link"
                >
                  <span>Choose Role Now</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Step 2: Access Modules */}
            <div className="workflow-step-card">
              <div className="step-num-watermark">02</div>
              <span className="step-tag-pill">Stage 02 • Digital Ecosystem</span>
              <h3 className="step-card-title">
                Access Unified Modules
              </h3>
              <p className="step-card-desc">
                Log roll call records, browse verified 6-page note previews, join synchronous study lounges with Pomodoro timers, and view the 36-seat live library map.
              </p>
              <div className="step-card-footer">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("campus");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="step-footer-action-link"
                >
                  <span>Explore All 6 Modules</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Step 3: Excel with Safeguards */}
            <div className="workflow-step-card">
              <div className="step-num-watermark">03</div>
              <span className="step-tag-pill">Stage 03 • Academic Mastery</span>
              <h3 className="step-card-title">
                Defend Cutoffs &amp; Collaborate
              </h3>
              <p className="step-card-desc">
                Receive proactive attendance shortage warnings before condonation deadlines, resolve grievances with photo tracking, and earn campus cafe vouchers.
              </p>
              <div className="step-card-footer">
                <button
                  type="button"
                  onClick={() => setIsRoleModalOpen(true)}
                  className="step-footer-action-link"
                >
                  <span>Launch Campus Hub</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STUDENT & TEACHER VALUE SECTION (Side-by-Side Comparison Panels)
          ========================================================================= */}
      <section id="value" className="unisphere-value-section">
        <div className="unisphere-container">
          <div className="value-section-header">
            <span className="section-eyebrow-label">TAILORED IMPACT</span>
            <h2 className="section-main-title">
              Designed for Both Students &amp; Teachers
            </h2>
            <p className="section-main-description">
              UniSphere provides distinct, purpose-built toolsets for every member of the university community.
            </p>
          </div>

          <div className="value-grid-2col">
            {/* Panel 1: For Students */}
            <div className="value-card value-card-student">
              <div className="value-card-header">
                <div className="value-role-badge badge-student-luxe">
                  <GraduationCap size={16} />
                  <span>FOR STUDENTS</span>
                </div>
                <span className="value-card-tag">Academic Excellence &amp; Welfare</span>
              </div>

              <h3 className="value-card-title">
                Master Your Studies &amp; Campus Life
              </h3>

              <p className="value-card-desc">
                Everything you need to safeguard your attendance, collaborate with classmates, and navigate university facilities with confidence.
              </p>

              <div className="value-features-list">
                <div className="value-feature-item">
                  <div className="value-check-icon"><Check size={13} /></div>
                  <div className="value-feature-text">
                    <strong>Mandatory 75% Cutoff Defense:</strong> Mathematical safe-bunk formula and consecutive recovery calculator.
                  </div>
                </div>

                <div className="value-feature-item">
                  <div className="value-check-icon"><Check size={13} /></div>
                  <div className="value-feature-text">
                    <strong>Verified Notes Marketplace:</strong> Unit-wise cheat sheets with interactive 6-page previews before downloading.
                  </div>
                </div>

                <div className="value-feature-item">
                  <div className="value-check-icon"><Check size={13} /></div>
                  <div className="value-feature-text">
                    <strong>Synchronous Virtual Study Lounge:</strong> Live peer presence, simulated cursors, and 25-minute Pomodoro timers.
                  </div>
                </div>

                <div className="value-feature-item">
                  <div className="value-check-icon"><Check size={13} /></div>
                  <div className="value-feature-text">
                    <strong>36-Seat Smart Library &amp; Lost Map:</strong> Real-time desk booking and coordinate-mapped recovery with cafe vouchers.
                  </div>
                </div>
              </div>

              <div className="value-card-cta-wrap">
                <button
                  type="button"
                  onClick={() => navigate("/login?role=student")}
                  className="value-btn-primary btn-student"
                >
                  <span>Enter Student Portal</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Panel 2: For Teachers */}
            <div className="value-card value-card-faculty">
              <div className="value-card-header">
                <div className="value-role-badge badge-faculty-luxe">
                  <BookOpen size={16} />
                  <span>FOR TEACHERS &amp; FACULTY</span>
                </div>
                <span className="value-card-tag">Curriculum Governance &amp; Mentorship</span>
              </div>

              <h3 className="value-card-title">
                Streamline Academic Administration
              </h3>

              <p className="value-card-desc">
                Empower your lectures with instant cohort attendance tracking, syllabus material distribution, and transparent grievance redressal.
              </p>

              <div className="value-features-list">
                <div className="value-feature-item">
                  <div className="value-check-icon check-faculty"><Check size={13} /></div>
                  <div className="value-feature-text">
                    <strong>Cohort Attendance Insights:</strong> Automated condonation risk alerts and instant roll call administration.
                  </div>
                </div>

                <div className="value-feature-item">
                  <div className="value-check-icon check-faculty"><Check size={13} /></div>
                  <div className="value-feature-text">
                    <strong>Curriculum &amp; Notes Distribution:</strong> Upload verified lecture summaries, course schemes, and question banks.
                  </div>
                </div>

                <div className="value-feature-item">
                  <div className="value-check-icon check-faculty"><Check size={13} /></div>
                  <div className="value-feature-text">
                    <strong>Department Grievance Resolution:</strong> Review assigned laboratory, classroom, or infrastructure maintenance tickets.
                  </div>
                </div>

                <div className="value-feature-item">
                  <div className="value-check-icon check-faculty"><Check size={13} /></div>
                  <div className="value-feature-text">
                    <strong>Campus Announcements &amp; Office Hours:</strong> Broadcast critical academic notices and schedule mentorship sessions.
                  </div>
                </div>
              </div>

              <div className="value-card-cta-wrap">
                <button
                  type="button"
                  onClick={() => navigate("/login?role=faculty")}
                  className="value-btn-primary btn-faculty"
                >
                  <span>Enter Faculty Portal</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMPREHENSIVE MODULE FAQ SECTION (Interactive Accordion for All 6 Modules)
          ========================================================================= */}
      <section id="faq" className="unisphere-faq-section">
        <div className="unisphere-container">
          <div className="faq-section-header">
            <span className="section-eyebrow-label">STUDENT GUIDANCE &amp; SYLLABUS FAQ</span>
            <h2 className="section-main-title">
              Frequently Asked Questions
            </h2>
            <p className="section-main-description">
              Detailed answers explaining how UniSphere calculates safe bunks, handles campus recoveries, verifies lecture notes, synchronizes study lounges, and coordinates library seats.
            </p>
          </div>

          <div className="faq-accordion-container">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.id}
                  className={`faq-accordion-item ${isOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="faq-question-button"
                    aria-expanded={isOpen}
                  >
                    <div className="faq-question-text-wrap">
                      <span className="faq-category-tag">{faq.category}</span>
                      <span className="faq-question-heading">{faq.question}</span>
                    </div>
                    <div className="faq-toggle-icon">
                      <ChevronDown
                        size={18}
                        className={`chevron-icon ${isOpen ? "rotated" : ""}`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-panel">
                      <div className="faq-answer-inner">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION BANNER (Dark Chocolate Luxe Card)
          ========================================================================= */}
      <section className="unisphere-cta-section">
        <div className="unisphere-container">
          <div className="cta-banner-card">
            <div className="cta-card-content">
              <div className="cta-pill-badge">
                <Sparkles size={13} className="cta-sparkle-icon" />
                <span>Begin Your Academic &amp; Engineering Journey</span>
              </div>

              <h2 className="cta-banner-title">
                Elevate Your University Experience Today
              </h2>

              <p className="cta-banner-subtitle">
                Join over 40,000 students defending their attendance cutoffs, resolving campus tickets, accessing verified notes, collaborating in virtual study lounges, and checking library seats.
              </p>

              <div className="cta-buttons-cluster">
                <button
                  onClick={() => setIsRoleModalOpen(true)}
                  className="btn-cta-primary"
                >
                  <span>Choose Role</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => navigate("/login?role=student")}
                  className="btn-cta-secondary"
                >
                  <Lock size={14} />
                  <span>Student Portal Login</span>
                </button>

                <button
                  onClick={() => navigate("/login?role=faculty")}
                  className="btn-cta-ghost"
                >
                  <span>Faculty Access</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER (Clean, Minimal, Sophisticated)
          ========================================================================= */}
      <footer className="unisphere-footer">
        <div className="unisphere-container">
          <div className="footer-top-grid">
            {/* Brand Column */}
            <div className="footer-col-brand">
              <div
                className="footer-brand-lockup"
                onClick={handleBrandClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleBrandClick();
                  }
                }}
                role="button"
                tabIndex={0}
                style={{ cursor: "pointer" }}
                title="Scroll back to top"
                aria-label="UniSphere — Scroll to top"
              >
                <div className="brand-monogram">
                  <GraduationCap size={18} strokeWidth={2.4} />
                </div>
                <span className="footer-brand-title">
                  UNI<span className="brand-name-serif">SPHERE</span>
                </span>
              </div>
              <p className="footer-brand-bio">
                The premier university operating system uniting academic governance, curriculum engineering, attendance defense, peer knowledge, study lounges, and campus student welfare.
              </p>
              <div className="footer-status-indicator">
                <span className="ticker-pulse-dot" />
                <span className="status-indicator-text">
                  All 6 Campus Systems Operational • 2026 Academic Term
                </span>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="footer-col-nav">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-links-list">
                <li><a href="#hero" className="footer-nav-link">Home</a></li>
                <li><a href="#glance" className="footer-nav-link">UNISPHERE at a Glance</a></li>
                <li><a href="#campus" className="footer-nav-link">Campus Operating Pillars</a></li>
                <li><a href="#workflow" className="footer-nav-link">How It Works</a></li>
                <li><a href="#value" className="footer-nav-link">Student &amp; Faculty Value</a></li>
                <li><a href="#faq" className="footer-nav-link">Module FAQ</a></li>
              </ul>
            </div>

            {/* Core 6 Modules Column */}
            <div className="footer-col-nav">
              <h4 className="footer-heading">Campus Modules</h4>
              <ul className="footer-links-list">
                <li>
                  <button onClick={() => navigate("/dashboard")} className="footer-btn-link">
                    Student Dashboard &amp; Attendance
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/complaints")} className="footer-btn-link">
                    Complaints &amp; Grievances
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/lost-found")} className="footer-btn-link">
                    Lost &amp; Found Campus Map
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/notes")} className="footer-btn-link">
                    Notes Marketplace (6-Pg Preview)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/group-study")} className="footer-btn-link">
                    Virtual Study Lounge
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/library")} className="footer-btn-link">
                    Smart Library (36 Seats)
                  </button>
                </li>
              </ul>
            </div>

            {/* Access & Authentication Column */}
            <div className="footer-col-nav">
              <h4 className="footer-heading">University Access</h4>
              <ul className="footer-links-list">
                <li>
                  <button onClick={() => setIsRoleModalOpen(true)} className="footer-btn-link">
                    Choose Role
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/login?role=student")} className="footer-btn-link">
                    Student Portal Login
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/login?role=faculty")} className="footer-btn-link">
                    Faculty Portal Login
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/register")} className="footer-btn-link">
                    Register Verified Account
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <p className="footer-copyright-text">
              © 2026 UNISPHERE Academic Operating System. Engineered with academic distinction.
            </p>
            <div className="footer-bottom-meta">
              <span>Warm Neutral Editorial Edition</span>
              <span>•</span>
              <span>React 19 &amp; Pure CSS3</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          CHOOSE ROLE MODAL (Accessible, Custom Editorial Dialog)
          ========================================================================= */}
      {isRoleModalOpen && (
        <div
          className="role-modal-overlay"
          onClick={() => setIsRoleModalOpen(false)}
          role="presentation"
        >
          <div
            className="role-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-modal-title"
          >
            {/* Modal Header */}
            <div className="role-modal-header">
              <div className="role-modal-title-group">
                <div className="role-modal-eyebrow">
                  <Sparkles size={13} />
                  <span>UNISPHERE ACADEMIC SYSTEM</span>
                </div>
                <h2 id="role-modal-title" className="role-modal-title">
                  Choose Your Role
                </h2>
                <p className="role-modal-subtitle">
                  Select your university affiliation to enter the UniSphere portal and access your personalized academic tools.
                </p>
                {isAuthenticated && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    background: "#EFEAE4",
                    border: "1px solid #D6D0C8",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    margin: "12px 0 4px",
                    fontSize: "12.5px",
                    color: "#3B302A"
                  }}>
                    <span>Active session: <strong>{user?.name}</strong> ({user?.role || "Student"})</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsRoleModalOpen(false);
                        navigate("/dashboard");
                      }}
                      style={{
                        background: "#3B302A",
                        color: "#FAF9F6",
                        border: "none",
                        borderRadius: "9999px",
                        padding: "5px 12px",
                        fontSize: "11.5px",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      Go to Dashboard →
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsRoleModalOpen(false)}
                className="role-modal-close-btn"
                aria-label="Close role selector"
              >
                <X size={18} />
              </button>
            </div>

            {/* Role Options Grid */}
            <div className="role-options-grid">
              {/* Option 1: Student */}
              <div
                className="role-choice-card student-choice-card"
                onClick={() => {
                  setIsRoleModalOpen(false);
                  navigate("/login?role=student");
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsRoleModalOpen(false);
                    navigate("/login?role=student");
                  }
                }}
              >
                <div className="role-choice-top">
                  <div className="role-choice-icon-wrap icon-student">
                    <GraduationCap size={28} />
                  </div>
                  <span className="role-choice-chip chip-student">Student</span>
                </div>

                <h3 className="role-choice-title">Student</h3>

                <p className="role-choice-desc">
                  Explore campus life, discover resources, and connect with your university community.
                </p>

                <div className="role-choice-features">
                  <div className="role-feature-bullet">
                    <Check size={12} className="bullet-check" />
                    <span>75% Cutoff Defense &amp; Safe Bunks</span>
                  </div>
                  <div className="role-feature-bullet">
                    <Check size={12} className="bullet-check" />
                    <span>6-Page Notes Preview &amp; Cheat Sheets</span>
                  </div>
                  <div className="role-feature-bullet">
                    <Check size={12} className="bullet-check" />
                    <span>Synchronous Study Lounge &amp; 36-Seat Library</span>
                  </div>
                </div>

                <div className="role-choice-action-btn btn-action-student">
                  <span>Continue as Student</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Option 2: Teacher */}
              <div
                className="role-choice-card teacher-choice-card"
                onClick={() => {
                  setIsRoleModalOpen(false);
                  navigate("/login?role=faculty");
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsRoleModalOpen(false);
                    navigate("/login?role=faculty");
                  }
                }}
              >
                <div className="role-choice-top">
                  <div className="role-choice-icon-wrap icon-teacher">
                    <BookOpen size={28} />
                  </div>
                  <span className="role-choice-chip chip-teacher">Teacher / Faculty</span>
                </div>

                <h3 className="role-choice-title">Teacher</h3>

                <p className="role-choice-desc">
                  Access your teaching resources and connect with your university community.
                </p>

                <div className="role-choice-features">
                  <div className="role-feature-bullet">
                    <Check size={12} className="bullet-check" />
                    <span>Cohort Attendance Insights &amp; Cutoff Alerts</span>
                  </div>
                  <div className="role-feature-bullet">
                    <Check size={12} className="bullet-check" />
                    <span>Curriculum &amp; Verified Lecture Notes</span>
                  </div>
                  <div className="role-feature-bullet">
                    <Check size={12} className="bullet-check" />
                    <span>Department Grievance Escalations</span>
                  </div>
                </div>

                <div className="role-choice-action-btn btn-action-teacher">
                  <span>Continue as Teacher</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="role-modal-footer">
              <span className="modal-footer-note">
                Need an account? New students can register via the student portal.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
