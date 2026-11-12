import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, ArrowRight, ArrowLeft, Shield, Users, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSelector from "../../components/common/LanguageSelector";
import ThemeToggle from "../../components/common/ThemeToggle";
import "./RoleSelection.css";

export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const handleSelectRole = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="role-selection-root">
      {/* Top Header */}
      <header className="role-selection-header">
        <div className="role-header-container">
          <div
            onClick={() => navigate("/")}
            className="role-brand"
            role="button"
            tabIndex={0}
          >
            <div className="role-brand-icon">
              <GraduationCap size={20} strokeWidth={2.4} />
            </div>
            <div>
              <span className="role-brand-title">
                UNISPHERE
              </span>
              <span className="role-brand-sub">Campus Operating System</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => navigate("/")}
              className="role-btn-back-home"
            >
              <ArrowLeft size={14} />
              <span>{t("roleSelection.backHome", "Back to Public Overview")}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="role-selection-main">
        <div className="role-selection-card-box">
          {isAuthenticated && (
            <div className="role-logged-in-banner" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              background: "#EFEAE4",
              border: "1px solid #D6D0C8",
              borderRadius: "12px",
              padding: "12px 18px",
              marginBottom: "24px",
              flexWrap: "wrap"
            }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#3B302A" }}>
                Active session detected: <strong>{user?.name}</strong> ({user?.role || "Student"})
              </span>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#3B302A",
                  color: "#FAF9F6",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "6px 14px",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                <span>Continue to Dashboard</span>
                <ArrowRight size={12} />
              </button>
            </div>
          )}

          <div className="role-eyebrow">
            <Shield size={14} className="role-eyebrow-icon" />
            <span>Institutional Access Control</span>
          </div>

          <h1 className="role-heading">{t("roleSelection.title", "Select Your Campus Identity")}</h1>
          <p className="role-subheading">
            {t("roleSelection.subtitle", "Choose your university affiliation to access personalized academic services, schedules, and administrative workspaces.")}
          </p>

          <div className="role-cards-grid">
            {/* Student Role Card */}
            <div className="role-card role-card-student">
              <div className="role-card-badge">Primary Student Suite</div>
              <div className="role-icon-halo halo-student">
                <GraduationCap size={32} />
              </div>
              <h2 className="role-card-title">Undergraduate & Graduate Student</h2>
              <p className="role-card-desc">
                Defend your mandatory 75% attendance cutoff, locate misplaced items on campus maps, collaborate in live study rooms, review verified peer notes, and check library seat availability.
              </p>

              <div className="role-features-list">
                <div className="role-feature-item">
                  <CheckCircle2 size={14} className="feature-check-icon" />
                  <span>Attendance Bunk & Recovery Simulator</span>
                </div>
                <div className="role-feature-item">
                  <CheckCircle2 size={14} className="feature-check-icon" />
                  <span>Interactive Campus Lost & Found Map</span>
                </div>
                <div className="role-feature-item">
                  <CheckCircle2 size={14} className="feature-check-icon" />
                  <span>Peer Notes & Collaborative Study Circles</span>
                </div>
                <div className="role-feature-item">
                  <CheckCircle2 size={14} className="feature-check-icon" />
                  <span>Smart Library Seat Reservation & Catalog</span>
                </div>
              </div>

              <div className="role-card-actions">
                <button
                  onClick={() => handleSelectRole("student")}
                  className="role-btn-primary btn-student"
                >
                  <span>Continue as Student</span>
                  <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => navigate("/register?role=student")}
                  className="role-btn-link"
                >
                  Create New Student Profile
                </button>
              </div>
            </div>

            {/* Faculty Role Card */}
            <div className="role-card role-card-faculty">
              <div className="role-card-badge badge-faculty">Academic Staff Portal</div>
              <div className="role-icon-halo halo-faculty">
                <BookOpen size={32} />
              </div>
              <h2 className="role-card-title">Faculty Member & Department Head</h2>
              <p className="role-card-desc">
                Review course section enrollments, inspect department-wide attendance condonation reports, broadcast lecture notices, and supervise student grievances.
              </p>

              <div className="role-features-list">
                <div className="role-feature-item">
                  <CheckCircle2 size={14} className="feature-check-icon" />
                  <span>Academic Performance &amp; Marks Evaluation Ledger</span>
                </div>
                <div className="role-feature-item">
                  <CheckCircle2 size={14} className="feature-check-icon" />
                  <span>Course Roll Call &amp; 75% Cutoff Defense</span>
                </div>
                <div className="role-feature-item">
                  <CheckCircle2 size={14} className="feature-check-icon" />
                  <span>Department Grievance Escalation Queue</span>
                </div>
                <div className="role-feature-item">
                  <CheckCircle2 size={14} className="feature-check-icon" />
                  <span>Real-Time Student Attendance Sync</span>
                </div>
              </div>

              <div className="role-card-actions">
                <button
                  onClick={() => handleSelectRole("faculty")}
                  className="role-btn-primary btn-faculty"
                >
                  <span>Continue as Faculty</span>
                  <ArrowRight size={15} />
                </button>
                <span className="role-phase-note">
                  Faculty Suite Active • Academic Performance &amp; Attendance Management
                </span>
              </div>
            </div>
          </div>

          <div className="role-footer-help">
            <Users size={14} className="help-icon" />
            <span>Need assistance logging in? Contact UNISPHERE Campus IT Support at support@unisphere.edu</span>
          </div>
        </div>
      </main>
    </div>
  );
}
