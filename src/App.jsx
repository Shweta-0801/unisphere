import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/common/ScrollToTop";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";
import LibraryPage from "./pages/Library/LibraryPage";
import MyClassesPage from "./pages/Teacher/MyClassesPage";

// Clean placeholder for other team members' modules in progress
const TeammateModulePlaceholder = ({ name }) => (
  <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--unisphere-text-dark, #211D1A)" }}>
    <h2 style={{ fontFamily: "var(--font-serif, serif)", fontSize: "1.75rem", marginBottom: "0.75rem" }}>{name}</h2>
    <p style={{ color: "var(--unisphere-text-muted, #8D857D)", maxWidth: "450px", margin: "0 auto" }}>
      This module is assigned to a teammate and will be fully integrated when their respective branch is merged.
    </p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* ================= PUBLIC & MAIN DASHBOARD ================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* ================= SHWETA'S ASSIGNED MODULES ================= */}
        {/* 1. Student Attendance */}
        <Route path="/attendance" element={<AttendancePage />} />

        {/* 2. Smart Library */}
        <Route path="/library" element={<LibraryPage />} />

        {/* 3. My Classes & Students (Teacher) */}
        <Route path="/teacher/classes" element={<MyClassesPage />} />
        <Route path="/my-classes" element={<Navigate to="/teacher/classes" replace />} />
        <Route path="/teacher/students" element={<Navigate to="/teacher/classes" replace />} />

        {/* ================= TEAMMATE ROUTE PLACEHOLDERS ================= */}
        <Route path="/lost-found" element={<TeammateModulePlaceholder name="Lost & Found" />} />
        <Route path="/complaints" element={<TeammateModulePlaceholder name="Complaints Portal" />} />
        <Route path="/notes" element={<TeammateModulePlaceholder name="Notes Marketplace" />} />
        <Route path="/group-study" element={<TeammateModulePlaceholder name="Group Study Hub" />} />
        <Route path="/teacher/assignments" element={<TeammateModulePlaceholder name="Assignments Portal" />} />
        <Route path="/assignments" element={<Navigate to="/teacher/assignments" replace />} />
        <Route path="/academic-performance" element={<TeammateModulePlaceholder name="Academic Performance" />} />
        <Route path="/attendance-management" element={<TeammateModulePlaceholder name="Attendance Management" />} />
        <Route path="/teacher/dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/teacher" element={<Navigate to="/teacher/classes" replace />} />

        {/* ================= 404 FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
