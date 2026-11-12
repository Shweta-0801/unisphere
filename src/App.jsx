import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";
import AppLayout from "./components/layout/AppLayout";

import HomePage from "./pages/HomePage";
import RoleSelectionPage from "./pages/RoleSelection/RoleSelectionPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";
import LibraryPage from "./pages/Library/LibraryPage";
import MyClassesPage from "./pages/Teacher/MyClassesPage";
import AssignmentsPage from "./pages/Teacher/AssignmentsPage";
import TeacherDashboardPage from "./pages/Teacher/TeacherDashboardPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

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
            <Route path="/role-selection" element={<RoleSelectionPage />} />
            <Route path="/login" element={<LoginPage initialMode="login" />} />
            <Route path="/register" element={<LoginPage initialMode="register" />} />

            {/* ================= CORE DASHBOARD (ROLE-ADAPTIVE) ================= */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* ================= SHWETA'S ASSIGNED MODULES ================= */}
            {/* 1. Student Attendance (Preserved PE-I Work) */}
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <AttendancePage />
                </ProtectedRoute>
              }
            />

            {/* 2. Smart Library & Issued Books Enhancement (PE-II Work) */}
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              }
            />

            {/* 3. Teacher Dashboard & Modules */}
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute requiredRole="Faculty">
                  <TeacherDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />

            <Route
              path="/teacher/classes"
              element={
                <ProtectedRoute requiredRole="Faculty">
                  <MyClassesPage />
                </ProtectedRoute>
              }
            />
            <Route path="/my-classes" element={<Navigate to="/teacher/classes" replace />} />
            <Route path="/teacher/students" element={<Navigate to="/teacher/classes" replace />} />

            <Route
              path="/teacher/assignments"
              element={
                <ProtectedRoute requiredRole="Faculty">
                  <AssignmentsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/assignments" element={<Navigate to="/teacher/assignments" replace />} />

            {/* ================= TEAMMATE ROUTE PLACEHOLDERS ================= */}
            {/* Aanvi: Lost & Found */}
            <Route
              path="/lost-found"
              element={<TeammateModulePlaceholder name="Lost & Found Hub" path="/lost-found" />}
            />

            {/* Aditi: Notes Repository & Group Study Hub */}
            <Route
              path="/notes"
              element={<TeammateModulePlaceholder name="Notes Repository" path="/notes" />}
            />
            <Route
              path="/group-study"
              element={<TeammateModulePlaceholder name="Group Study Hub" path="/group-study" />}
            />

            {/* Academic Performance */}
            <Route
              path="/academic-performance"
              element={<TeammateModulePlaceholder name="Academic Performance" path="/academic-performance" />}
            />
            <Route path="/teacher/academic-performance" element={<Navigate to="/academic-performance" replace />} />
            <Route path="/teacher/performance" element={<Navigate to="/academic-performance" replace />} />

            {/* Gungun: Complaints Portal & Attendance Management */}
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

            {/* ================= 404 CATCH-ALL ================= */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
