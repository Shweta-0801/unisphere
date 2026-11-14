import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";

import HomePage from "./pages/HomePage";
import RoleSelectionPage from "./pages/RoleSelection/RoleSelectionPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";
import LibraryPage from "./pages/Library/LibraryPage";
import MyClassesPage from "./pages/Teacher/MyClassesPage";
import AssignmentsPage from "./pages/Teacher/AssignmentsPage";
import TeacherDashboardPage from "./pages/Teacher/TeacherDashboardPage";
import LostFoundPage from "./pages/LostFoundPage";
import NotesPage from "./pages/NotesPage";
import GroupStudyPage from "./pages/GroupStudy/GroupStudyPage";
import AcademicPerformancePage from "./pages/AcademicPerformancePage";
import ComplaintsPage from "./pages/ComplaintsPage";
import AttendanceManagementPage from "./pages/AttendanceManagementPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

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

            {/* Faculty Coursework & Grading Portal */}
            <Route
              path="/teacher/assignments"
              element={
                <ProtectedRoute requiredRole="Faculty">
                  <AssignmentsPage initialMode="faculty" />
                </ProtectedRoute>
              }
            />

            {/* Student Coursework & Submissions Portal */}
            <Route
              path="/assignments"
              element={
                <ProtectedRoute>
                  <AssignmentsPage initialMode="student" />
                </ProtectedRoute>
              }
            />

            {/* ================= AANVI'S MODULES ================= */}
            {/* Lost & Found Network */}
            <Route
              path="/lost-found"
              element={
                <ProtectedRoute>
                  <LostFoundPage />
                </ProtectedRoute>
              }
            />

            {/* ================= ADITI'S MODULES ================= */}
            {/* Notes Repository */}
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <NotesPage />
                </ProtectedRoute>
              }
            />

            {/* Group Study Hub */}
            <Route
              path="/group-study"
              element={
                <ProtectedRoute>
                  <GroupStudyPage />
                </ProtectedRoute>
              }
            />

            {/* Academic Performance */}
            <Route
              path="/academic-performance"
              element={
                <ProtectedRoute>
                  <AcademicPerformancePage />
                </ProtectedRoute>
              }
            />
            <Route path="/teacher/academic-performance" element={<Navigate to="/academic-performance" replace />} />
            <Route path="/teacher/performance" element={<Navigate to="/academic-performance" replace />} />

            {/* ================= GUNGUN'S MODULES ================= */}
            {/* Complaints Portal */}
            <Route
              path="/complaints"
              element={
                <ProtectedRoute>
                  <ComplaintsPage />
                </ProtectedRoute>
              }
            />

            {/* Attendance Management */}
            <Route
              path="/attendance-management"
              element={
                <ProtectedRoute requiredRole="Faculty">
                  <AttendanceManagementPage />
                </ProtectedRoute>
              }
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
