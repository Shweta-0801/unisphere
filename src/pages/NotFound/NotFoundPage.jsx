import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, Home, LayoutDashboard } from "lucide-react";
import "./NotFound.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-root">
      <header className="not-found-header">
        <div
          onClick={() => navigate("/")}
          className="not-found-brand"
          role="button"
          tabIndex={0}
        >
          <div className="not-found-logo-icon">
            <GraduationCap size={20} strokeWidth={2.4} />
          </div>
          <span className="not-found-brand-text">
            UNISPHERE
          </span>
        </div>
      </header>

      <main className="not-found-main">
        <div className="not-found-card">
          <span className="not-found-error-code">404</span>
          <h1 className="not-found-title">Campus Route Not Located</h1>
          <p className="not-found-desc">
            The page or student resource you requested is not indexed within the UNISPHERE academic operating system.
          </p>

          <div className="not-found-actions">
            <button
              onClick={() => navigate(-1)}
              className="not-found-btn not-found-btn-secondary"
            >
              <ArrowLeft size={15} />
              <span>Go Back</span>
            </button>
            <button
              onClick={() => navigate("/")}
              className="not-found-btn not-found-btn-secondary"
            >
              <Home size={15} />
              <span>Public Overview</span>
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="not-found-btn not-found-btn-primary"
            >
              <LayoutDashboard size={15} />
              <span>Student Dashboard</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
