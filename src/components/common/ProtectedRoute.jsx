import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * ProtectedRoute Component
 * Restricts access to authenticated users only.
 * Supports role-based protection (e.g., requiredRole="Faculty").
 * If unauthenticated, redirects to /login with state preserved.
 * If role unauthorized, redirects safely to /dashboard.
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const isFaculty = user?.role === "Faculty" || user?.role === "Teacher";

  if (requiredRole === "Faculty" && !isFaculty) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requiredRole === "Student" && isFaculty) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
