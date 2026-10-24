import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  Search,
  BookOpen,
  Users,
  Library,
  LogOut,
  Menu,
  X,
  GraduationCap,
  User,
  LogIn,
  FileText,
  Award
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AppLayout({ children, activePath }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentPath = activePath || location.pathname;
  const isFaculty = user?.role === "Faculty" || user?.role === "Teacher";

  // Core Student Modules + Dashboard (Retained in full)
  const studentNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Attendance Hub", icon: CalendarCheck, path: "/attendance" },
    { label: "Complaints Portal", icon: MessageSquare, path: "/complaints" },
    { label: "Lost & Found", icon: Search, path: "/lost-found" },
    { label: "Notes Marketplace", icon: BookOpen, path: "/notes" },
    { label: "Group Study Hub", icon: Users, path: "/group-study" },
    { label: "Smart Library", icon: Library, path: "/library" }
  ];

  // Dedicated Faculty / Teacher Modules (Strictly the 5 required modules)
  const facultyNavItems = [
    { label: "My Classes & Students", icon: GraduationCap, path: "/teacher/classes" },
    { label: "Teacher Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Assignments Portal", icon: FileText, path: "/teacher/assignments" },
    { label: "Academic Performance", icon: Award, path: "/academic-performance" },
    { label: "Attendance Management", icon: CalendarCheck, path: "/attendance-management" }
  ];

  const navItems = isFaculty ? facultyNavItems : studentNavItems;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isItemActive = (itemPath) => {
    if (currentPath === itemPath) return true;
    if (itemPath === "/dashboard" && (currentPath === "/teacher/dashboard" || currentPath === "/dashboard")) return true;
    if (itemPath === "/teacher/classes" && currentPath === "/my-classes") return true;
    if (itemPath === "/teacher/assignments" && currentPath === "/assignments") return true;
    if (itemPath === "/academic-performance" && currentPath === "/teacher/academic-performance") return true;
    if (itemPath === "/attendance-management" && (currentPath === "/teacher/attendance" || currentPath === "/teacher/attendance-management")) return true;
    if (itemPath !== "/dashboard" && currentPath.startsWith(itemPath)) return true;
    return false;
  };

  return (
    <div className="app-shell">
      {/* ================= MOBILE HEADER BAR ================= */}
      <header className="app-mobile-header">
        <div
          className="mobile-header-brand-wrap"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          title="Return to Public Homepage"
          aria-label="UniSphere Homepage"
          style={{ cursor: "pointer" }}
        >
          <div className="app-sidebar-logo-icon">
            <GraduationCap size={18} />
          </div>
          <span className="app-sidebar-logo-title">UNISPHERE</span>
        </div>

        <div className="mobile-header-actions-wrap">
          {user ? (
            <div className="app-sidebar-user-avatar">
              {user.initials || (isFaculty ? "FC" : "ST")}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="unisphere-btn unisphere-btn-secondary"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-header-toggle-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ================= DESKTOP PERSISTENT SIDEBAR ================= */}
      <aside className="app-sidebar">
        <div>
          {/* Brand Header: Logo & UniSphere title prominently displayed; clicking navigates to public homepage ("/") */}
          <div
            onClick={handleLogoClick}
            className="app-sidebar-header"
            role="button"
            tabIndex={0}
            title="UniSphere — Return to Public Homepage"
            aria-label="UniSphere — Return to Public Homepage"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleLogoClick();
              }
            }}
          >
            <div className="app-sidebar-logo-icon">
              <GraduationCap size={20} />
            </div>
            <div className="app-sidebar-header-text">
              <div className="app-sidebar-logo-title-row">
                <span className="app-sidebar-logo-title">UNISPHERE</span>
                <span className="app-sidebar-home-pill">Home ↗</span>
              </div>
              <span className="app-sidebar-logo-sub">
                Academic Campus Suite
              </span>
            </div>
          </div>

          {/* Navigation Items List */}
          <div className="app-sidebar-nav">
            <div className="app-sidebar-nav-title">
              {isFaculty ? "Faculty Services" : "Campus Services"}
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`app-sidebar-link ${isActive ? "active" : ""}`}
                >
                  <div className="app-sidebar-link-inner">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <span className="app-sidebar-active-dot" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* User Profile Box at Bottom */}
        <div className="app-sidebar-footer">
          {user ? (
            <div className="app-sidebar-user-card">
              <div className="user-card-inner">
                <div className="app-sidebar-user-avatar">
                  {user.initials || (isFaculty ? "FC" : "ST")}
                </div>
                <div className="user-card-text">
                  <div className="app-sidebar-user-name">{user.name}</div>
                  <div className="app-sidebar-user-role">
                    {isFaculty
                      ? `${user.department?.includes("Computer") ? "CSE" : user.department || "Faculty"} • Faculty`
                      : `${user.department?.includes("Computer") ? "CSE" : user.department || "Student"} • ${user.semester || "Enrolled"}`}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Log out"
                className="app-sidebar-logout-btn"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="app-sidebar-user-card">
              <div className="user-card-guest">
                <User size={16} />
                <span>Guest Student</span>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="user-card-signin-btn"
              >
                <LogIn size={13} /> Sign In
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ================= MOBILE SLIDE-OUT DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="app-mobile-drawer-root">
          <div
            className="app-mobile-drawer-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="app-mobile-drawer">
            <div>
              <div className="mobile-drawer-header">
                <div
                  className="mobile-header-brand-wrap"
                  onClick={() => {
                    handleLogoClick();
                    setMobileMenuOpen(false);
                  }}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                  title="Return to Public Homepage"
                  aria-label="UniSphere Homepage"
                >
                  <div className="app-sidebar-logo-icon">
                    <GraduationCap size={18} />
                  </div>
                  <span className="app-sidebar-logo-title">UNISPHERE</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-header-toggle-btn"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mobile-drawer-nav-list">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isItemActive(item.path);
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        navigate(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`app-sidebar-link ${isActive ? "active" : ""}`}
                    >
                      <div className="app-sidebar-link-inner">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <span className="app-sidebar-active-dot" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile User Profile */}
            <div className="mobile-drawer-footer">
              {user ? (
                <div className="app-sidebar-user-card">
                  <div className="user-card-inner">
                    <div className="app-sidebar-user-avatar">
                      {user.initials || (isFaculty ? "FC" : "ST")}
                    </div>
                    <div className="user-card-text">
                      <div className="app-sidebar-user-name">{user.name}</div>
                      <div className="app-sidebar-user-role">
                        {isFaculty ? `${user.role || "Faculty"} • Department of CS` : user.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="app-sidebar-logout-btn"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="unisphere-btn unisphere-btn-primary full-width"
                >
                  Sign In to UniSphere
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT VIEWPORT ================= */}
      <div className="app-main-viewport">
        {children}
      </div>
    </div>
  );
}
