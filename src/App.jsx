import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";

import HomePage from "./pages/HomePage";
import RoleSelectionPage from "./pages/RoleSelection/RoleSelectionPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LostFoundPage from "./pages/LostFoundPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import NotesPage from "./pages/NotesPage";
import GroupStudyPage from "./pages/GroupStudy/GroupStudyPage";
import LibraryPage from "./pages/Library/LibraryPage";
import AttendancePage from "./pages/AttendancePage";
import AcademicPerformancePage from "./pages/AcademicPerformancePage";
import AttendanceManagementPage from "./pages/AttendanceManagementPage";
import MyClassesPage from "./pages/Teacher/MyClassesPage";
import AssignmentsPage from "./pages/Teacher/AssignmentsPage";
import TeacherDashboardPage from "./pages/Teacher/TeacherDashboardPage";
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

            {/* ================= STUDENT MODULES (FULLY PRESERVED) ================= */}
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <AttendancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lost-found"
              element={
                <ProtectedRoute>
                  <LostFoundPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/complaints"
              element={
                <ProtectedRoute>
                  <ComplaintsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <NotesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/group-study"
              element={
                <ProtectedRoute>
                  <GroupStudyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              }
            />

            {/* ================= THE FIVE TEACHER MODULES ================= */}
            {/* Module A: My Classes & Students */}
            <Route
              path="/teacher/classes"
              element={
                <ProtectedRoute requiredRole="Faculty">
                  <MyClassesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-classes"
              element={<Navigate to="/teacher/classes" replace />}
            />
            <Route
              path="/teacher/students"
              element={<Navigate to="/teacher/classes" replace />}
            />

            {/* Module B: Teacher Dashboard */}
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute requiredRole="Faculty">
                  <TeacherDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher"
              element={<Navigate to="/teacher/dashboard" replace />}
            />

            {/* Module C: Assignments Portal */}
            <Route
              path="/teacher/assignments"
              element={
                <ProtectedRoute requiredRole="Faculty">
                  <AssignmentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assignments"
              element={<Navigate to="/teacher/assignments" replace />}
            />

            {/* Module D: Academic Performance */}
            <Route
              path="/academic-performance"
              element={
                <ProtectedRoute requiredRole="Faculty">
                  <AcademicPerformancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/academic-performance"
              element={<Navigate to="/academic-performance" replace />}
            />
            <Route
              path="/teacher/performance"
              element={<Navigate to="/academic-performance" replace />}
            />

            {/* Module E: Attendance Management */}
            <Route
              path="/attendance-management"
              element={
                <ProtectedRoute requiredRole="Faculty">
                  <AttendanceManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/attendance"
              element={<Navigate to="/attendance-management" replace />}
            />
            <Route
              path="/teacher/attendance-management"
              element={<Navigate to="/attendance-management" replace />}
            />

            {/* ================= 404 CATCH-ALL ================= */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
     </AuthProvider>
    </LanguageProvider>
  </ThemeProvider>
  );
}

export default App;