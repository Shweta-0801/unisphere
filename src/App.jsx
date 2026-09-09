import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";
import LostFoundPage from "./pages/LostFoundPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/attendance" element={<AttendancePage />} />

      <Route path="/lost-found" element={<LostFoundPage />} />

      <Route path="/complaints" element={<ComplaintsPage />} />

      <Route path="/notes" element={<NotesPage />} />

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;