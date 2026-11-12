import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  GraduationCap,
  CalendarCheck,
  Search,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Lock,
  Mail,
  User,
  Hash,
  KeyRound,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
  Briefcase
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import ThemeToggle from "../components/common/ThemeToggle";
import LanguageSelector from "../components/common/LanguageSelector";
import "./Auth.css";

export default function LoginPage({ initialMode = "login" }) {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const queryMode = searchParams.get("mode");
  const roleParam = searchParams.get("role") || "student";
  const navigate = useNavigate();
  const { user, isAuthenticated, login, demoLogin } = useAuth();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Mode: "login" | "register" | "forgot"
  const [mode, setMode] = useState(
    queryMode === "register" || initialMode === "register"
      ? "register"
      : queryMode === "forgot"
      ? "forgot"
      : "login"
  );

  // Form Fields
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [semester, setSemester] = useState("4th Semester");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Forgot Password State
  const [forgotStep, setForgotStep] = useState(1);
  const [resetEmail, setResetEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (queryMode === "register") setMode("register");
    else if (queryMode === "forgot") setMode("forgot");
    else if (queryMode === "login") setMode("login");
  }, [queryMode]);

  const showToast = (msg, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(""), 4000);
    } else {
      setNotification(msg);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.trim() || !password) {
      showToast("Please enter your campus email and password.", true);
      return;
    }

    if (!emailPattern.test(email.trim())) {
      showToast("Please enter a valid campus email address.", true);
      return;
    }

    // Try finding previously registered user in localStorage
    let registeredUsers = [];
    try {
      registeredUsers = JSON.parse(localStorage.getItem("unisphere_registered_users") || "[]");
    } catch {
      registeredUsers = [];
    }
    const matched = registeredUsers.find(
      (u) => u.email?.toLowerCase() === email.trim().toLowerCase()
    );

    let resolvedName = matched?.name;

    if (!resolvedName) {
      const emailUser = email.trim().split("@")[0];
      const words = emailUser
        .split(/[\._\-]/)
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

      const candidate = words.join(" ");
      if (candidate.toLowerCase().startsWith("dr ") || candidate.toLowerCase() === "dr") {
        resolvedName = "Dr. " + candidate.slice(3).trim();
      } else if (roleParam === "faculty") {
        resolvedName = candidate.startsWith("Dr.") ? candidate : `Dr. ${candidate}`;
      } else {
        resolvedName = candidate;
      }
    }

    login({
      name: resolvedName,
      email: email.trim(),
      role: roleParam === "faculty" ? "Faculty" : (matched?.role || "Student"),
      department: matched?.department || department,
      semester: matched?.semester || (roleParam === "faculty" ? "Faculty • Associate Professor" : semester),
      rollNo: matched?.rollNo || rollNo
    });

    showToast("Signed in successfully!");
    navigate("/dashboard");
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name.trim()) {
      showToast("Please enter your full name.", true);
      return;
    }

    if (!rollNo.trim()) {
      showToast(`Please enter your ${roleParam === "faculty" ? "Faculty ID / Cabin Code" : "student roll / ID number"}.`, true);
      return;
    }

    if (!email.trim() || !emailPattern.test(email.trim())) {
      showToast("Please enter a valid campus email.", true);
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters long.", true);
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match.", true);
      return;
    }

    const newUser = {
      name: name.trim(),
      rollNo: rollNo.trim(),
      email: email.trim(),
      department,
      semester: roleParam === "faculty" ? "Faculty • Associate Professor" : semester,
      role: roleParam === "faculty" ? "Faculty" : "Student"
    };

    try {
      const registeredUsers = JSON.parse(localStorage.getItem("unisphere_registered_users") || "[]");
      const existingIdx = registeredUsers.findIndex(
        (u) => u.email?.toLowerCase() === email.trim().toLowerCase()
      );
      if (existingIdx >= 0) {
        registeredUsers[existingIdx] = newUser;
      } else {
        registeredUsers.push(newUser);
      }
      localStorage.setItem("unisphere_registered_users", JSON.stringify(registeredUsers));
    } catch (err) {
      console.warn("Could not save to registered users", err);
    }

    login(newUser);

    showToast("Account created successfully! Welcome to UniSphere.");
    navigate("/dashboard");
  };

  // Handle Forgot Password Step 1: Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      showToast("Please enter your campus email or roll number.", true);
      return;
    }
    setForgotStep(2);
    setOtpCode("482910");
    showToast("6-digit verification code sent to your email!");
  };

  // Handle Forgot Password Step 2: Reset Password
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (otpCode !== "482910" && otpCode.length < 4) {
      showToast("Invalid verification code. Please check your email.", true);
      return;
    }
    if (newPassword.length < 6) {
      showToast("New password must be at least 6 characters.", true);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showToast("Passwords do not match.", true);
      return;
    }

    login({
      email: resetEmail.trim(),
      role: roleParam === "faculty" ? "Faculty" : "Student"
    });
    showToast("Password reset successfully! Logged into your account.");
    navigate("/dashboard");
  };

  // One-click Demo Access
  const handleDemoAccess = () => {
    const isFaculty = roleParam === "faculty";
    demoLogin(isFaculty ? "Dr. Ananya Sharma" : "Alex Sharma", isFaculty ? "Faculty" : "Student");
    showToast(`Logged in with Demo ${isFaculty ? "Teacher (Dr. Ananya Sharma)" : "Student"} profile.`);
    navigate("/dashboard");
  };

  return (
    <div className="auth-page-root">
      {/* Ambient background glow */}
      <div className="auth-ambient-glow">
        <div className="auth-glow-top" />
        <div className="auth-glow-bottom" />
      </div>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="auth-toast auth-toast-success">
          <CheckCircle2 size={16} className="toast-icon-green" />
          <span>{notification}</span>
        </div>
      )}

      {errorMsg && (
        <div className="auth-toast auth-toast-error">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="auth-header">
        <button
          onClick={() => navigate("/role-selection")}
          className="auth-back-btn"
        >
          <ArrowLeft size={16} />
          <span>{t("auth.backHome", "Change Role / Back")}</span>
        </button>

        <div
          onClick={() => navigate("/")}
          className="auth-brand"
          role="button"
          tabIndex={0}
        >
          <div className="auth-brand-logo">
            <GraduationCap size={18} />
          </div>
          <span className="auth-brand-text">
            UNISPHERE
          </span>
        </div>

        {/* Global Language & Theme Switchers */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </header>

      {/* Center Container: Split Card Layout */}
      <main className="auth-main-container">
        <div className="auth-split-card">
          {/* Left Column: Project Showcase Panel */}
          <div className="auth-showcase-panel">
            <div className="auth-showcase-glow" />

            <div>
              <div className="auth-showcase-pill">
                <Sparkles size={12} className="showcase-sparkle" />
                <span>Unified Campus Ecosystem</span>
              </div>

              <h2 className="auth-showcase-title">
                One Portal. <br />
                All Campus Services.
              </h2>

              <p className="auth-showcase-desc">
                Check course attendance standings, simulate safe bunk buffers, resolve grievances, reserve library seats, or collaborate over semester notes.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="auth-feature-list">
              <div className="auth-feature-card">
                <div className="auth-feature-icon-wrap">
                  <CalendarCheck size={16} />
                </div>
                <div>
                  <div className="auth-feature-name">Smart Attendance Hub</div>
                  <div className="auth-feature-tagline">Formula simulator & safe bunks</div>
                </div>
              </div>

              <div className="auth-feature-card">
                <div className="auth-feature-icon-wrap">
                  <Search size={16} />
                </div>
                <div>
                  <div className="auth-feature-name">Lost & Found Network</div>
                  <div className="auth-feature-tagline">Interactive campus coordinate map</div>
                </div>
              </div>

              <div className="auth-feature-card">
                <div className="auth-feature-icon-wrap">
                  <BookOpen size={16} />
                </div>
                <div>
                  <div className="auth-feature-name">Notes & Group Study</div>
                  <div className="auth-feature-tagline">6-page preview & live peer rooms</div>
                </div>
              </div>
            </div>

            <div className="auth-showcase-footer">
              <ShieldCheck size={14} className="showcase-shield" />
              <span>Campus Data & Privacy Verified</span>
            </div>
          </div>

          {/* Right Column: Interactive Forms */}
          <div className="auth-form-panel">
            {/* Active Role Identifier Pill */}
            <div className="auth-role-header-banner">
              <div className="role-indicator-wrap">
                {roleParam === "faculty" ? (
                  <Briefcase size={14} className="role-header-icon" />
                ) : (
                  <GraduationCap size={14} className="role-header-icon" />
                )}
                <span className="role-header-text">
                  {roleParam === "faculty"
                    ? t("auth.facultyTab", "Faculty Member Portal")
                    : t("auth.studentTab", "Student Portal")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate("/role-selection")}
                className="role-switch-link"
              >
                Switch Identity
              </button>
            </div>

            {roleParam === "faculty" && (
              <div className="faculty-notice-box">
                <AlertCircle size={14} className="faculty-notice-icon" />
                <span>
                  Faculty Suite Architecture: Authenticating will connect you to the active academic workspace for platform demonstration.
                </span>
              </div>
            )}

            {/* Mode Switcher Tabs (Login vs Register) */}
            {mode !== "forgot" ? (
              <div className="auth-tabs-toggle">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`auth-tab-btn ${mode === "login" ? "active" : ""}`}
                >
                  {t("auth.signIn", "Sign In")}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={`auth-tab-btn ${mode === "register" ? "active" : ""}`}
                >
                  {t("auth.register", "Create Account")}
                </button>
              </div>
            ) : (
              <div className="auth-forgot-bar">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setForgotStep(1);
                  }}
                  className="auth-link-btn"
                >
                  <ArrowLeft size={14} /> Back to Sign In
                </button>
                <span className="auth-badge-subtle">
                  Password Recovery
                </span>
              </div>
            )}

            {/* ================= MODE: LOGIN ================= */}
            {mode === "login" && (
              <div>
                <div>
                  <h1 className="auth-title">{t("auth.welcome", "Welcome Back")}</h1>
                  <p className="auth-subtitle">
                    Enter your campus credentials to access your unified dashboard.
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="auth-form">
                  <div className="auth-field">
                    <label className="auth-label">Campus Email / Roll No</label>
                    <div className="auth-input-container">
                      <div className="auth-input-icon">
                        <Mail size={16} />
                      </div>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. alex.sharma@unisphere.edu"
                        className="auth-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="auth-field">
                    <div className="auth-field-header">
                      <label className="auth-label auth-label-inline">Password</label>
                      <button
                        type="button"
                        onClick={() => {
                          setResetEmail(email);
                          setMode("forgot");
                        }}
                        className="auth-link-btn"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="auth-input-container">
                      <div className="auth-input-icon">
                        <Lock size={16} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="auth-input auth-input-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="auth-toggle-pwd-btn"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="auth-primary-btn">
                    <span>Sign In to Dashboard</span>
                    <ArrowRight size={16} />
                  </button>
                </form>

                {/* Demo Quick Access */}
                <div className="auth-demo-section">
                  <p className="auth-demo-text">Testing without entering credentials?</p>
                  <button
                    type="button"
                    onClick={handleDemoAccess}
                    className="auth-demo-btn"
                  >
                    <Sparkles size={14} className="demo-sparkle" />
                    <span>
                      {roleParam === "faculty"
                        ? "⚡ Quick Demo Teacher Access (Dr. Ananya Sharma)"
                        : "⚡ Quick Demo Student Access (Alex Sharma)"}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* ================= MODE: REGISTER ================= */}
            {mode === "register" && (
              <div>
                <div>
                  <h1 className="auth-title">
                    {roleParam === "faculty" ? "Create Faculty Account" : "Create Student Account"}
                  </h1>
                  <p className="auth-subtitle">
                    {roleParam === "faculty"
                      ? "Enter your credentials to register your teacher profile in UniSphere."
                      : "Enter your real details to enroll your profile in UniSphere."}
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="auth-form compact">
                  <div className="auth-grid-2">
                    <div className="auth-field">
                      <label className="auth-label">
                        {roleParam === "faculty" ? "Full Name (e.g. Dr. Rajesh Verma) *" : "Full Name *"}
                      </label>
                      <div className="auth-input-container">
                        <div className="auth-input-icon">
                          <User size={15} />
                        </div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={roleParam === "faculty" ? "e.g. Dr. Rajesh Verma" : "e.g. Alex Sharma"}
                          className="auth-input sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="auth-field">
                      <label className="auth-label">
                        {roleParam === "faculty" ? "Faculty ID / Cabin Code *" : "Student Roll No *"}
                      </label>
                      <div className="auth-input-container">
                        <div className="auth-input-icon">
                          <Hash size={15} />
                        </div>
                        <input
                          type="text"
                          value={rollNo}
                          onChange={(e) => setRollNo(e.target.value)}
                          placeholder={roleParam === "faculty" ? "e.g. FAC-CSE-104" : "e.g. 2024-CSE-042"}
                          className="auth-input sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="auth-grid-2">
                    <div className="auth-field">
                      <label className="auth-label">Department</label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="auth-select"
                      >
                        <option value="Computer Science & Engineering">CSE (Computer Science)</option>
                        <option value="Information Technology">IT (Information Tech)</option>
                        <option value="Electronics & Communication">ECE (Electronics)</option>
                        <option value="Mechanical Engineering">Mechanical Eng</option>
                        <option value="Electrical Engineering">Electrical Eng</option>
                        <option value="Civil Engineering">Civil Eng</option>
                      </select>
                    </div>

                    <div className="auth-field">
                      <label className="auth-label">Semester</label>
                      <select
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="auth-select"
                      >
                        <option value="1st Semester">1st Semester</option>
                        <option value="2nd Semester">2nd Semester</option>
                        <option value="3rd Semester">3rd Semester</option>
                        <option value="4th Semester">4th Semester</option>
                        <option value="5th Semester">5th Semester</option>
                        <option value="6th Semester">6th Semester</option>
                        <option value="7th/8th Semester">7th / 8th Semester</option>
                      </select>
                    </div>
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Campus Email *</label>
                    <div className="auth-input-container">
                      <div className="auth-input-icon">
                        <Mail size={15} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex.sharma@unisphere.edu"
                        className="auth-input sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="auth-grid-2">
                    <div className="auth-field">
                      <label className="auth-label">Password *</label>
                      <div className="auth-input-container">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="auth-input sm auth-input-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="auth-toggle-pwd-btn"
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <div className="auth-field">
                      <label className="auth-label">Confirm Password *</label>
                      <div className="auth-input-container">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="auth-input sm auth-input-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="auth-toggle-pwd-btn"
                          aria-label="Toggle password visibility"
                        >
                          {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="auth-primary-btn sm">
                    <span>Complete Enrollment & Enter Portal</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              </div>
            )}

            {/* ================= MODE: FORGOT PASSWORD ================= */}
            {mode === "forgot" && (
              <div>
                <div>
                  <h1 className="auth-title">Reset Password</h1>
                  <p className="auth-subtitle">
                    {forgotStep === 1
                      ? "Enter your university email to receive a recovery code."
                      : "Enter the verification code sent to your campus inbox."}
                  </p>
                </div>

                {forgotStep === 1 ? (
                  <form onSubmit={handleSendOtp} className="auth-form">
                    <div className="auth-field">
                      <label className="auth-label">Registered Campus Email / Roll No</label>
                      <div className="auth-input-container">
                        <div className="auth-input-icon">
                          <Mail size={16} />
                        </div>
                        <input
                          type="text"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="e.g. student@unisphere.edu"
                          className="auth-input"
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="auth-primary-btn">
                      <span>Send Recovery Code</span>
                      <ArrowRight size={16} />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPasswordSubmit} className="auth-form">
                    <div className="auth-info-card">
                      <span>Code dispatched to: </span>
                      <strong>{resetEmail || "your email"}</strong>
                      <div className="auth-info-hint">
                        💡 Test helper: Demo OTP is <strong>482910</strong>
                      </div>
                    </div>

                    <div className="auth-field">
                      <label className="auth-label">6-Digit Verification Code</label>
                      <div className="auth-input-container">
                        <div className="auth-input-icon">
                          <KeyRound size={16} />
                        </div>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="482910"
                          className="auth-input code-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="auth-grid-2">
                      <div className="auth-field">
                        <label className="auth-label">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="auth-input sm no-icon"
                          required
                        />
                      </div>
                      <div className="auth-field">
                        <label className="auth-label">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="auth-input sm no-icon"
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="auth-primary-btn">
                      <span>Update Password & Log In</span>
                      <ArrowRight size={16} />
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Strip */}
      <footer className="auth-footer">
        <span>UNISPHERE Academic Suite • Campus Operating System</span>
      </footer>
    </div>
  );
}