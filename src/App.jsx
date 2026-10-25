import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/common/ScrollToTop";
import AppLayout from "./components/layout/AppLayout";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";
import LibraryPage from "./pages/Library/LibraryPage";
import AssignmentsPage from "./pages/Teacher/AssignmentsPage";

// Clean placeholder for other team members' modules in progress
const TeammateModulePlaceholder = ({ name, path }) => (
  <AppLayout activePath={path}>
    <div style={{ padding: "5rem 2rem", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "var(--cream-light, #F5F2EB)",
          border: "1px solid var(--light-border, #E6E1D8)",
          marginBottom: "1.25rem",
          fontSize: "24px"
        }}
      >
        ⏳
      </div>
      <h2
        style={{
          fontFamily: "var(--font-serif, serif)",
          fontSize: "1.75rem",
          marginBottom: "0.75rem",
          color: "var(--unisphere-text-dark, #211D1A)"
        }}
      >
        {name}
      </h2>
      <p
        style={{
          color: "var(--unisphere-text-muted, #8D857D)",
          lineHeight: 1.6,
          fontSize: "0.95rem"
        }}
      >
        This module is assigned to a teammate and will be fully integrated when their respective branch is merged into the project repository.
      </p>
    </div>
  </AppLayout>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* ================= PUBLIC ROUTES ================= */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/role-selection" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            <Route path="/register" element={<Navigate to="/dashboard" replace />} />

            {/* ================= CORE DASHBOARD ================= */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* ================= SHWETA'S ASSIGNED MODULES ================= */}
            {/* 1. Student Attendance (Preserved PE-I Work) */}
            <Route path="/attendance" element={<AttendancePage />} />

            {/* 2. Smart Library & Issued Books Enhancement (PE-II Work) */}
            <Route path="/library" element={<LibraryPage />} />

            {/* 3. Assignments Portal (PE-II Work) */}
            <Route path="/teacher/assignments" element={<AssignmentsPage />} />
            <Route path="/assignments" element={<Navigate to="/teacher/assignments" replace />} />

            {/* ================= TEAMMATE ROUTE PLACEHOLDERS ================= */}
            {/* Aanvi: Lost & Found, My Classes & Students, Teacher Dashboard */}
            <Route
              path="/lost-found"
              element={<TeammateModulePlaceholder name="Lost & Found" path="/lost-found" />}
            />
            <Route
              path="/teacher/classes"
              element={<TeammateModulePlaceholder name="My Classes & Students" path="/teacher/classes" />}
            />
            <Route path="/my-classes" element={<Navigate to="/teacher/classes" replace />} />
            <Route path="/teacher/students" element={<Navigate to="/teacher/classes" replace />} />
            <Route path="/teacher/dashboard" element={<Navigate to="/dashboard" replace />} />
            <Route path="/teacher" element={<Navigate to="/teacher/classes" replace />} />

            {/* Aditi: Notes Marketplace, Group Study Hub, Academic Performance */}
            <Route
              path="/notes"
              element={<TeammateModulePlaceholder name="Notes Marketplace" path="/notes" />}
            />
            <Route
              path="/group-study"
              element={<TeammateModulePlaceholder name="Group Study Hub" path="/group-study" />}
            />
            <Route
              path="/academic-performance"
              element={<TeammateModulePlaceholder name="Academic Performance" path="/academic-performance" />}
            />
            <Route path="/teacher/academic-performance" element={<Navigate to="/academic-performance" replace />} />
            <Route path="/teacher/performance" element={<Navigate to="/academic-performance" replace />} />

            {/* Gungun: Complaints Portal, Attendance Management */}
            <Route
              path="/complaints"
              element={<TeammateModulePlaceholder name="Complaints Portal" path="/complaints" />}
            />
            <Route
              path="/attendance-management"
              element={<TeammateModulePlaceholder name="Attendance Management" path="/attendance-management" />}
            />
            <Route path="/teacher/attendance" element={<Navigate to="/attendance-management" replace />} />
            <Route path="/teacher/attendance-management" element={<Navigate to="/attendance-management" replace />} />

            {/* ================= 404 FALLBACK ================= */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
