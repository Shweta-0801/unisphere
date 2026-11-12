import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  CheckCircle2,
  Calendar,
  Zap,
  Info,
  Clock,
  BookmarkCheck,
  Check,
  RotateCcw,
  Bell,
  AlertTriangle,
  LayoutDashboard,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import AppLayout from "../../components/layout/AppLayout";
import { useLanguage } from "../../context/LanguageContext";
import {
  initialLibrarySeats,
  libraryBooksCatalog,
  initialIssuedBooks,
  calculateBookStatus,
  formatDisplayDate
} from "../../data/libraryData";
import IssuedBookCard from "../../components/library/IssuedBookCard";
import { useAuth } from "../../context/AuthContext";
import { loadFromStorage, saveToStorage } from "../../utils/storage";
import "./Library.css";

const SEAT_STORAGE_KEY = "unisphere_library_seats";
const SEAT_RESERVATION_DURATION_MS = 30 * 60 * 1000;

function releaseExpiredReservations(savedSeats, now = Date.now()) {
  if (!Array.isArray(savedSeats)) return initialLibrarySeats;

  return savedSeats.map((seat) => {
    const reservationExpired =
      seat.reservedByUserId &&
      seat.reservedAt &&
      now - seat.reservedAt >= SEAT_RESERVATION_DURATION_MS;

    if (!reservationExpired) return seat;

    const { reservedByUserId, reservedAt, occupiedBy, ...availableSeat } = seat;
    return { ...availableSeat, isOccupied: false };
  });
}

function buildDefaultSeatsForUser(userId, userName) {
  return initialLibrarySeats.map((seat) => {
    if (!seat.isOccupied || !seat.occupiedBy?.includes("(You)")) return seat;
    return {
      ...seat,
      occupiedBy: userName || "Current user",
      reservedByUserId: userId,
      reservedAt: Date.now()
    };
  });
}

function getInitialSeats(userId, userName) {
  const savedSeats = loadFromStorage(SEAT_STORAGE_KEY, null);
  const seatsToLoad = Array.isArray(savedSeats)
    ? savedSeats
    : buildDefaultSeatsForUser(userId, userName);
  return releaseExpiredReservations(seatsToLoad);
}

export default function LibraryPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const currentUserId = String(user?.email || user?.rollNo || user?.name || "anonymous").toLowerCase();
  // Navigation: Sub-navbar Tab State ("overview" | "issued" | "catalog" | "seats")
  const [activeLibraryTab, setActiveLibraryTab] = useState("overview");

  // Seats state
  const [seats, setSeats] = useState(() => getInitialSeats(currentUserId, user?.name));
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [activeZoneFilter, setActiveZoneFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Books state
  const [books, setBooks] = useState(libraryBooksCatalog);
  const [bookSearchQuery, setBookSearchQuery] = useState("");
  const [bookCategoryFilter, setBookCategoryFilter] = useState("all");

  // =========================================================================
  // PE-II FEATURE: MY ISSUED BOOKS & RETURN REMINDERS STATE
  // =========================================================================
  const [issuedBooks, setIssuedBooks] = useState(initialIssuedBooks);
  const [reminders, setReminders] = useState([]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Keep seat reservations across reloads and automatically free them after 30 minutes.
  useEffect(() => {
    saveToStorage(SEAT_STORAGE_KEY, seats);
  }, [seats]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);
      setSeats((previousSeats) => {
        let expiredCount = 0;
        const nextSeats = releaseExpiredReservations(previousSeats, now);
        expiredCount = previousSeats.filter((seat, index) => seat !== nextSeats[index]).length;
        if (expiredCount > 0) {
          setToastMessage(`Your ${expiredCount === 1 ? "seat reservation has" : "seat reservations have"} expired after 30 minutes.`);
        }
        return expiredCount > 0 ? nextSeats : previousSeats;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const syncSeatsFromStorage = (event) => {
      if (event.key === SEAT_STORAGE_KEY && event.newValue) {
        try {
          setSeats(releaseExpiredReservations(JSON.parse(event.newValue)));
        } catch {
          // Ignore malformed updates from another browser tab.
        }
      }
    };
    window.addEventListener("storage", syncSeatsFromStorage);
    return () => window.removeEventListener("storage", syncSeatsFromStorage);
  }, []);

  useEffect(() => {
    if (!selectedSeat) return;
    const latestSeat = seats.find((seat) => seat.id === selectedSeat.id);
    if (latestSeat && latestSeat !== selectedSeat) setSelectedSeat(latestSeat);
  }, [seats, selectedSeat]);

  /**
   * useEffect: Checks and calculates return reminders whenever issuedBooks changes.
   * Compares pure calendar dates using built-in JavaScript Date.
   */
  useEffect(() => {
    const activeNotices = [];
    issuedBooks.forEach((book) => {
      const statusInfo = calculateBookStatus(book.returnDate);
      // Reminders generated for books due tomorrow (1 day before return date),
      // books due today, or books whose return date has passed (overdue)
      if (statusInfo.isUrgent) {
        let reminderText = "";
        if (statusInfo.status === "Due Tomorrow") {
          reminderText = `Reminder: Your book "${book.title}" is due tomorrow (${formatDisplayDate(book.returnDate)})!`;
        } else if (statusInfo.status === "Due Today") {
          reminderText = `Notice: Your book "${book.title}" is due today! Please return it to the circulation desk by 08:00 PM.`;
        } else {
          reminderText = `Overdue Notice: Your book "${book.title}" was due on ${formatDisplayDate(book.returnDate)}. Please return it to avoid library fines.`;
        }

        activeNotices.push({
          id: book.id,
          bookTitle: book.title,
          status: statusInfo.status,
          alertType: statusInfo.alertType,
          returnDate: book.returnDate,
          message: reminderText
        });
      }
    });

    setReminders(activeNotices);
  }, [issuedBooks]);

  // Handler to return an issued book (demonstration)
  const handleReturnIssuedBook = (book) => {
    setIssuedBooks((prev) => prev.filter((b) => b.id !== book.id));
    showToast(`✓ Book "${book.title}" returned to Central Circulation Desk.`);
  };

  // Handler to reset sample issued books (restores all 4 test scenarios)
  const handleResetIssuedBooks = () => {
    setIssuedBooks(initialIssuedBooks);
    showToast("Sample issued books reloaded (Due Tomorrow, Due Today, Overdue, Future).");
  };

  // Handler to test scenario 5: student with no issued books
  const handleClearIssuedBooks = () => {
    setIssuedBooks([]);
    showToast("All issued books cleared (Testing empty state).");
  };

  // 1. Calculate Seat Summary Metrics
  const totalSeats = seats.length;
  const occupiedSeats = seats.filter((s) => s.isOccupied).length;
  const availableSeats = totalSeats - occupiedSeats;

  // Zone specific metrics for Overview
  const silentTotal = seats.filter((s) => s.zone.includes("Silent")).length;
  const silentAvail = seats.filter((s) => s.zone.includes("Silent") && !s.isOccupied).length;
  const podsTotal = seats.filter((s) => s.zone.includes("Pods")).length;
  const podsAvail = seats.filter((s) => s.zone.includes("Pods") && !s.isOccupied).length;
  const windowTotal = seats.filter((s) => s.zone.includes("Window")).length;
  const windowAvail = seats.filter((s) => s.zone.includes("Window") && !s.isOccupied).length;

  const myActiveSeat = seats.find(
    (seat) => seat.isOccupied && seat.reservedByUserId === currentUserId
  );
  const remainingSeatMs = myActiveSeat
    ? Math.max(0, SEAT_RESERVATION_DURATION_MS - (currentTime - myActiveSeat.reservedAt))
    : 0;
  const remainingSeatTime = `${String(Math.floor(remainingSeatMs / 60000)).padStart(2, "0")}:${String(Math.floor((remainingSeatMs % 60000) / 1000)).padStart(2, "0")}`;

  // A user can release only their own reservation and may hold one seat at a time.
  const handleToggleSeat = (seatId) => {
    const seat = seats.find((item) => item.id === seatId);
    if (!seat) return;

    if (seat.isOccupied && seat.reservedByUserId !== currentUserId) {
      showToast(`Seat ${seat.id} is occupied by someone else. You can only release your own seat.`);
      return;
    }

    if (!seat.isOccupied && myActiveSeat) {
      showToast(`You already have seat ${myActiveSeat.id}. Release it before reserving another seat.`);
      return;
    }

    const now = Date.now();
    const updatedSeat = seat.isOccupied
      ? (({ reservedByUserId, reservedAt, occupiedBy, ...availableSeat }) => ({
          ...availableSeat,
          isOccupied: false
        }))(seat)
      : {
          ...seat,
          isOccupied: true,
          occupiedBy: user?.name || "Current user",
          reservedByUserId: currentUserId,
          reservedAt: now
        };

    setSeats((previousSeats) => previousSeats.map((item) => item.id === seatId ? updatedSeat : item));
    setSelectedSeat(updatedSeat);
    showToast(
      seat.isOccupied
        ? `Seat ${seat.id} released.`
        : `Seat ${seat.id} reserved. It will be released automatically after 30 minutes.`
    );
  };

  const handleResetSeats = () => {
    setSeats(buildDefaultSeatsForUser(currentUserId, user?.name));
    setSelectedSeat(null);
    showToast("Library seat occupancy restored to default campus sample.");
  };

  // Filtered Seats by Zone
  const filteredSeats = seats.filter((s) => {
    if (activeZoneFilter === "all") return true;
    if (activeZoneFilter === "silent") return s.zone.includes("Silent");
    if (activeZoneFilter === "pods") return s.zone.includes("Pods");
    if (activeZoneFilter === "window") return s.zone.includes("Window");
    return true;
  });

  // Filtered Books
  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
      b.isbn.toLowerCase().includes(bookSearchQuery.toLowerCase());
    const matchesCategory =
      bookCategoryFilter === "all" || b.category.toLowerCase().includes(bookCategoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Handle Demo Borrow Action
  const handleBorrowBook = (book) => {
    if (book.status === "Not Available") {
      showToast(`Notice: "${book.title}" is currently checked out. Expected return: ${book.returnDate}.`);
      return;
    }

    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === book.id) {
          const newCopies = b.availableCopies - 1;
          return {
            ...b,
            availableCopies: newCopies,
            status: newCopies <= 0 ? "Not Available" : "Available",
            returnDate: newCopies <= 0 ? "31 Oct 2026" : b.returnDate
          };
        }
        return b;
      })
    );

    showToast(`Borrow request logged for "${book.title}". Collect from Central Circulation Desk.`);
  };

  return (
    <AppLayout activePath="/library">
      <div className="library-page-root">
        {/* Toast feedback */}
        {toastMessage && (
          <div className="library-toast">
            <Check size={14} className="toast-check-icon" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <header className="library-header-bar">
          <div>
            <div className="library-tag-row">
              <span className="library-badge">Central Academic Library</span>
              <span className="library-hours">Open Daily: 08:00 AM – 11:00 PM</span>
            </div>
            <h1 className="library-main-title">{t("library.title", "Smart Library System")}</h1>
            <p className="library-sub-text">
              {t("library.subtitle", "Unified campus library system: real-time visual desk availability, active textbook loans with return-date alerts, and physical book stacks.")}
            </p>
          </div>

          <div className="library-header-actions">
            <button
              onClick={handleResetSeats}
              className="library-btn-reset"
              title="Reset sample seat states"
            >
              <RotateCcw size={14} />
              <span>{t("common.cancel", "Reset")}</span>
            </button>
          </div>
        </header>

        {/* =====================================================================
            DEDICATED LIBRARY NAVIGATION BAR (TABBED HEADER)
            Allows clean switching between Overview, Issued Books, Catalog, Seats
            ===================================================================== */}
        <div className="library-subnav-wrapper">
          <nav className="library-subnav" aria-label="Library Navigation Tabs">
            <button
              type="button"
              onClick={() => setActiveLibraryTab("overview")}
              className={`library-tab-btn ${activeLibraryTab === "overview" ? "active" : ""}`}
            >
              <LayoutDashboard size={15} />
              <span>{t("library.overviewTab", "Library Overview")}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveLibraryTab("issued")}
              className={`library-tab-btn ${activeLibraryTab === "issued" ? "active" : ""}`}
            >
              <BookmarkCheck size={15} />
              <span>{t("library.issuedTab", "My Issued Books & Reminders")}</span>
              <span className={`library-nav-pill ${reminders.length > 0 ? "pill-urgent" : ""}`}>
                {issuedBooks.length}
              </span>
              {reminders.length > 0 && (
                <span className="library-nav-alert-dot" title={`${reminders.length} urgent return reminders`} />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveLibraryTab("catalog")}
              className={`library-tab-btn ${activeLibraryTab === "catalog" ? "active" : ""}`}
            >
              <BookOpen size={15} />
              <span>{t("library.catalogTab", "Browse Books & Stacks")}</span>
              <span className="library-nav-pill">
                {books.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveLibraryTab("seats")}
              className={`library-tab-btn ${activeLibraryTab === "seats" ? "active" : ""}`}
            >
              <Zap size={15} />
              <span>{t("library.seatsTab", "Seat Reservation & Floor")}</span>
              <span className="library-nav-pill pill-success">
                {availableSeats} Free
              </span>
            </button>
          </nav>
        </div>

        {/* =====================================================================
            TAB 1: LIBRARY OVERVIEW / HOME
            Institutional dashboard with quick stats, alerts, and modular previews
            ===================================================================== */}
        {activeLibraryTab === "overview" && (
          <div className="library-overview-container">
            {/* Quick Metrics Grid */}
            <div className="library-overview-stats-grid">
              {/* Stat 1: My Issued Books */}
              <div
                className="overview-stat-card"
                onClick={() => setActiveLibraryTab("issued")}
                role="button"
                tabIndex={0}
                title="Open My Issued Books tab"
              >
                <div className="stat-card-top">
                  <span className="stat-card-label">My Issued Books</span>
                  <div className="stat-card-icon-wrap icon-burgundy">
                    <BookmarkCheck size={16} />
                  </div>
                </div>
                <div className="stat-card-value">{issuedBooks.length}</div>
                <div className="stat-card-footer">
                  <span className={`stat-card-hint ${reminders.length > 0 ? "hint-urgent" : ""}`}>
                    {reminders.length > 0
                      ? `${reminders.length} return reminder(s) pending`
                      : "All loans in good standing"}
                  </span>
                  <span className="stat-card-action">View Loans →</span>
                </div>
              </div>

              {/* Stat 2: Desk Availability */}
              <div
                className="overview-stat-card"
                onClick={() => setActiveLibraryTab("seats")}
                role="button"
                tabIndex={0}
                title="Open Seat Reservation tab"
              >
                <div className="stat-card-top">
                  <span className="stat-card-label">Study Desk Availability</span>
                  <div className="stat-card-icon-wrap icon-green">
                    <Zap size={16} />
                  </div>
                </div>
                <div className="stat-card-value value-green">
                  {availableSeats} <span className="stat-card-total">/ {totalSeats}</span>
                </div>
                <div className="stat-card-footer">
                  <span className="stat-card-hint">
                    Level 2 North Reading Atrium • {occupiedSeats} in session
                  </span>
                  <span className="stat-card-action">Reserve Desk →</span>
                </div>
              </div>

              {/* Stat 3: Book Stacks */}
              <div
                className="overview-stat-card"
                onClick={() => setActiveLibraryTab("catalog")}
                role="button"
                tabIndex={0}
                title="Open Catalog tab"
              >
                <div className="stat-card-top">
                  <span className="stat-card-label">Physical Book Stacks</span>
                  <div className="stat-card-icon-wrap icon-taupe">
                    <BookOpen size={16} />
                  </div>
                </div>
                <div className="stat-card-value">{books.length}</div>
                <div className="stat-card-footer">
                  <span className="stat-card-hint">
                    CSE, Mathematics &amp; Electronics Stacks
                  </span>
                  <span className="stat-card-action">Browse Catalog →</span>
                </div>
              </div>

              {/* Stat 4: Library Hours */}
              <div className="overview-stat-card stat-card-hours">
                <div className="stat-card-top">
                  <span className="stat-card-label">Circulation Hours</span>
                  <span className="stat-card-badge-open">Open Today</span>
                </div>
                <div className="stat-card-value-small">08:00 AM - 11:00 PM</div>
                <div className="stat-card-footer">
                  <span className="stat-card-hint">
                    Desk Assistance Ground Level • All 36 Desks Powered
                  </span>
                </div>
              </div>
            </div>

            {/* In-app Return Notice Alert Box if any reminders exist */}
            {reminders.length > 0 && (
              <div className="overview-reminders-banner">
                <div className="reminders-banner-left">
                  <div className="reminders-alert-icon-wrap">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h4 className="reminders-banner-title">
                      Active Return Notices ({reminders.length})
                    </h4>
                    <p className="reminders-banner-desc">
                      You have borrowed books with return dates today, tomorrow, or past due. Please review your deadlines to avoid overdue holds.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLibraryTab("issued")}
                  className="btn-reminders-banner-action"
                >
                  <span>Review Reminders</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}

            {/* Two-Column Overview Split */}
            <div className="overview-split-grid">
              {/* Left Column: Issued Books Snapshot */}
              <div className="overview-module-card">
                <div className="module-card-header">
                  <div>
                    <h3 className="module-card-title">My Issued Books Snapshot</h3>
                    <p className="module-card-subtitle">
                      Your current borrowed volumes and dynamic calendar deadlines
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveLibraryTab("issued")}
                    className="module-card-link-btn"
                  >
                    <span>View All ({issuedBooks.length})</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                {issuedBooks.length === 0 ? (
                  <div className="overview-empty-box">
                    <BookOpen size={28} className="empty-box-icon" />
                    <h5>No Books Currently Borrowed</h5>
                    <p>You have zero active textbook loans. Search the physical catalog to borrow course materials.</p>
                    <button
                      type="button"
                      onClick={() => setActiveLibraryTab("catalog")}
                      className="btn-empty-action"
                    >
                      Browse Book Stacks
                    </button>
                  </div>
                ) : (
                  <div className="overview-issued-preview-list">
                    {issuedBooks.slice(0, 2).map((book) => {
                      const statusInfo = calculateBookStatus(book.returnDate);
                      return (
                        <IssuedBookCard
                          key={book.id}
                          book={book}
                          statusInfo={statusInfo}
                          onReturn={handleReturnIssuedBook}
                        />
                      );
                    })}
                    {issuedBooks.length > 2 && (
                      <div className="overview-more-banner">
                        <span>+ {issuedBooks.length - 2} more issued book(s) in your student account.</span>
                        <button
                          type="button"
                          onClick={() => setActiveLibraryTab("issued")}
                          className="overview-more-btn"
                        >
                          Open Issued Books Tab →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Live Floor Occupancy Glance */}
              <div className="overview-module-card">
                <div className="module-card-header">
                  <div>
                    <h3 className="module-card-title">Reading Atrium Occupancy</h3>
                    <p className="module-card-subtitle">
                      Level 2 North Reading Atrium • Real-time zone breakdown
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveLibraryTab("seats")}
                    className="module-card-link-btn"
                  >
                    <span>Floor Plan</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                <div className="overview-zone-breakdown-list">
                  <div className="zone-breakdown-row">
                    <div className="zone-breakdown-info">
                      <span className="zone-name">Silent Study Bay</span>
                      <span className="zone-desc">Dedicated individual quiet reading carrels</span>
                    </div>
                    <div className="zone-breakdown-metric">
                      <span className="zone-count-avail">{silentAvail} Free</span>
                      <span className="zone-count-total">/ {silentTotal}</span>
                    </div>
                  </div>

                  <div className="zone-breakdown-row">
                    <div className="zone-breakdown-info">
                      <span className="zone-name">Collaborative Study Pods</span>
                      <span className="zone-desc">Group work tables with shared power points</span>
                    </div>
                    <div className="zone-breakdown-metric">
                      <span className="zone-count-avail">{podsAvail} Free</span>
                      <span className="zone-count-total">/ {podsTotal}</span>
                    </div>
                  </div>

                  <div className="zone-breakdown-row">
                    <div className="zone-breakdown-info">
                      <span className="zone-name">Window Reading Carrels</span>
                      <span className="zone-desc">Natural daylight seating overlooking campus gardens</span>
                    </div>
                    <div className="zone-breakdown-metric">
                      <span className="zone-count-avail">{windowAvail} Free</span>
                      <span className="zone-count-total">/ {windowTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="overview-floor-cta-box">
                  <div className="floor-cta-features">
                    <div className="cta-feat-item">
                      <CheckCircle2 size={13} className="text-success" />
                      <span>Individual 230V outlets</span>
                    </div>
                    <div className="cta-feat-item">
                      <CheckCircle2 size={13} className="text-success" />
                      <span>Instant one-click reservation</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveLibraryTab("seats")}
                    className="btn-open-floor-plan"
                  >
                    <span>Launch 36-Desk Interactive Layout</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Popular Catalog Preview */}
            <div className="overview-catalog-preview-section">
              <div className="catalog-preview-header">
                <div>
                  <h3 className="module-card-title">Featured Academic Textbooks</h3>
                  <p className="module-card-subtitle">
                    Core computer science and engineering volumes available in the physical stacks
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLibraryTab("catalog")}
                  className="module-card-link-btn"
                >
                  <span>Search All {books.length} Books</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <div className="catalog-preview-grid">
                {books.slice(0, 3).map((book) => (
                  <div key={book.id} className="catalog-preview-card">
                    <div className="preview-card-header">
                      <span className="book-category-chip">{book.category}</span>
                      <span className={`preview-avail-badge ${book.status === "Available" ? "avail" : "unavail"}`}>
                        {book.status === "Available" ? `${book.availableCopies} Available` : "Checked Out"}
                      </span>
                    </div>
                    <h4 className="preview-book-title">{book.title}</h4>
                    <p className="preview-book-author">By {book.author}</p>
                    <div className="preview-card-footer">
                      <span className="preview-call-no">{book.callNumber}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setBookSearchQuery(book.title);
                          setActiveLibraryTab("catalog");
                        }}
                        className="btn-preview-find"
                      >
                        Locate Stacks →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: PE-II FEATURE: MY ISSUED BOOKS & RETURN REMINDERS
            Displays student's borrowed books with dynamic calendar return statuses
            ===================================================================== */}
        {activeLibraryTab === "issued" && (
          <div className="library-tab-pane">
            {/* Return-Date Reminders Banner */}
            {reminders.length > 0 && (
              <div className="library-reminders-container">
                <div className="library-reminders-head">
                  <div className="library-reminders-title-wrap">
                    <Bell size={18} style={{ color: "#8C2A3E" }} />
                    <h3 className="library-reminders-title">Library Return-Date Reminders</h3>
                    <span className="library-reminders-badge">
                      {reminders.length} Active Notice{reminders.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="reminder-alerts-list">
                  {reminders.map((r) => (
                    <div key={r.id} className={`reminder-alert-card alert-${r.alertType}`}>
                      <div className="reminder-icon-box">
                        {r.alertType === "overdue" && <AlertTriangle size={16} />}
                        {r.alertType === "today" && <AlertTriangle size={16} />}
                        {r.alertType === "tomorrow" && <Clock size={16} />}
                      </div>
                      <div className="reminder-text-box">
                        <span>{r.message}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="reminder-caption">
                  <Info size={12} />
                  <span>In-app return alerts appear inside UniSphere when you visit the Library portal.</span>
                </div>
              </div>
            )}

            <section className="library-section issued-books-section">
              <div className="section-header-row">
                <div>
                  <h2 className="section-title">My Issued Books ({issuedBooks.length})</h2>
                  <p className="section-desc">
                    Active textbook loans, issue dates, and return deadlines calculated dynamically from university library records.
                  </p>
                </div>

                {/* Demonstration Scenario Controls for Viva / Evaluation */}
                <div className="issued-demo-actions">
                  <button
                    type="button"
                    onClick={handleClearIssuedBooks}
                    className="btn-demo-pill"
                    title="Test Scenario 5: Student with no issued books"
                  >
                    Test Empty State (0 Books)
                  </button>
                  <button
                    type="button"
                    onClick={handleResetIssuedBooks}
                    className="btn-demo-pill"
                    title="Reload all 4 sample books (Due Tomorrow, Due Today, Overdue, Future)"
                  >
                    Reset Sample Books (4 Scenarios)
                  </button>
                </div>
              </div>

              <div className="my-active-seat-card">
                <div className="my-active-seat-copy">
                  <span className="my-active-seat-kicker">Seat reservation</span>
                  <h3>My Active Seat</h3>
                  {myActiveSeat ? (
                    <>
                      <p>
                        <strong>{myActiveSeat.id}</strong> · {myActiveSeat.zone}, Row {myActiveSeat.row}
                      </p>
                      <span className="my-active-seat-expiry">
                        Automatically releases in <strong>{remainingSeatTime}</strong>
                      </span>
                    </>
                  ) : (
                    <p>You do not have an active seat reservation.</p>
                  )}
                </div>
                {myActiveSeat ? (
                  <button
                    type="button"
                    className="my-active-seat-release"
                    onClick={() => handleToggleSeat(myActiveSeat.id)}
                  >
                    <RotateCcw size={14} />
                    <span>Release My Seat</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="my-active-seat-release"
                    onClick={() => setActiveLibraryTab("seats")}
                  >
                    <span>Find a Seat</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {/* Conditional Rendering: Empty State vs Cards Grid */}
              {issuedBooks.length === 0 ? (
                <div className="issued-empty-box">
                  <div className="issued-empty-icon">
                    <BookOpen size={36} />
                  </div>
                  <h4>No Books Currently Issued</h4>
                  <p>
                    You do not have any borrowed library books at the moment. Browse the physical stacks catalog to inspect call numbers and borrow course textbooks.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetIssuedBooks}
                    className="btn-load-sample-books"
                  >
                    <RotateCcw size={13} />
                    <span>Load Sample Books (Demonstration)</span>
                  </button>
                </div>
              ) : (
                <div className="issued-books-grid">
                  {issuedBooks.map((book) => {
                    const statusInfo = calculateBookStatus(book.returnDate);
                    return (
                      <IssuedBookCard
                        key={book.id}
                        book={book}
                        statusInfo={statusInfo}
                        onReturn={handleReturnIssuedBook}
                      />
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}

        {/* =====================================================================
            TAB 3: PHYSICAL BOOK STACKS CATALOG & SEARCH
            Search and filter physical textbooks with call numbers and shelf IDs
            ===================================================================== */}
        {activeLibraryTab === "catalog" && (
          <div className="library-tab-pane">
            <section className="library-section">
              <div className="section-header-row">
                <div>
                  <h2 className="section-title">Physical Book Stacks &amp; Lending Status</h2>
                  <p className="section-desc">
                    Search university course textbooks, reference guides, and engineering monographs with real-time call numbers and return forecasts.
                  </p>
                </div>
              </div>

              {/* Book Search & Filter Controls */}
              <div className="book-controls-bar">
                <div className="book-search-input-wrap">
                  <Search size={16} className="book-search-icon" />
                  <input
                    type="text"
                    placeholder="Search by book title, author, or ISBN..."
                    value={bookSearchQuery}
                    onChange={(e) => setBookSearchQuery(e.target.value)}
                    className="book-search-input"
                  />
                </div>

                <div className="book-category-buttons">
                  <button
                    onClick={() => setBookCategoryFilter("all")}
                    className={`cat-btn ${bookCategoryFilter === "all" ? "active" : ""}`}
                  >
                    All Categories ({books.length})
                  </button>
                  <button
                    onClick={() => setBookCategoryFilter("computer")}
                    className={`cat-btn ${bookCategoryFilter === "computer" ? "active" : ""}`}
                  >
                    Computer Science
                  </button>
                  <button
                    onClick={() => setBookCategoryFilter("mathematics")}
                    className={`cat-btn ${bookCategoryFilter === "mathematics" ? "active" : ""}`}
                  >
                    Mathematics
                  </button>
                  <button
                    onClick={() => setBookCategoryFilter("electronics")}
                    className={`cat-btn ${bookCategoryFilter === "electronics" ? "active" : ""}`}
                  >
                    Electronics
                  </button>
                </div>
              </div>

              {/* Books List Grid */}
              <div className="books-cards-grid">
                {filteredBooks.map((book) => {
                  const isAvailable = book.status === "Available";
                  return (
                    <div key={book.id} className="book-card">
                      <div className="book-card-header">
                        <span className="book-category-chip">{book.category}</span>
                        <div className="book-status-indicator">
                          {isAvailable ? (
                            <span className="book-badge-available">
                              <CheckCircle2 size={12} />
                              <span>Available ({book.availableCopies}/{book.totalCopies})</span>
                            </span>
                          ) : (
                            <div className="book-unavailable-wrapper">
                              <span className="book-badge-unavailable">Not Available</span>
                              {book.returnDate && (
                                <span className="book-return-forecast">
                                  <Calendar size={11} className="return-calendar-icon" />
                                  <span>Expected: {book.returnDate}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="book-title">{book.title}</h3>
                      <p className="book-author">By {book.author}</p>

                      <div className="book-meta-details">
                        <div className="book-meta-line">
                          <span className="meta-lbl">Edition:</span>
                          <span className="meta-val">{book.edition}</span>
                        </div>
                        <div className="book-meta-line">
                          <span className="meta-lbl">Call Number:</span>
                          <span className="meta-val code-font">{book.callNumber}</span>
                        </div>
                        <div className="book-meta-line">
                          <span className="meta-lbl">Location:</span>
                          <span className="meta-val">{book.shelf}</span>
                        </div>
                        <div className="book-meta-line">
                          <span className="meta-lbl">ISBN:</span>
                          <span className="meta-val code-font">{book.isbn}</span>
                        </div>
                      </div>

                      <div className="book-card-actions">
                        <button
                          onClick={() => handleBorrowBook(book)}
                          className={`book-borrow-btn ${isAvailable ? "btn-can-borrow" : "btn-reserve-wait"}`}
                        >
                          <BookOpen size={14} />
                          <span>{isAvailable ? "Borrow Book Copy" : "Join Waiting List"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredBooks.length === 0 && (
                <div className="books-empty-state">
                  <h4>No Books Matching Your Filter</h4>
                  <p>Try searching for a different keyword or reset the category filter.</p>
                  <button
                    onClick={() => {
                      setBookSearchQuery("");
                      setBookCategoryFilter("all");
                    }}
                    className="library-btn-reset"
                  >
                    Reset Search Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* =====================================================================
            TAB 4: INTERACTIVE SEAT MAP & FLOOR LAYOUT
            36-seat floor layout with zone filters and inspector panel
            ===================================================================== */}
        {activeLibraryTab === "seats" && (
          <div className="library-tab-pane">
            <section className="library-section">
              <div className="section-header-row">
                <div>
                  <h2 className="section-title">Floor Layout &amp; Seat Reservation</h2>
                  <p className="section-desc">
                    Select any desk below to inspect power outlets and reserve your quiet reading carrel or collaborative study pod.
                  </p>
                </div>

                {/* Zone Filter Tabs */}
                <div className="zone-filter-tabs">
                  <button
                    onClick={() => setActiveZoneFilter("all")}
                    className={`zone-tab-btn ${activeZoneFilter === "all" ? "active" : ""}`}
                  >
                    All Zones ({totalSeats})
                  </button>
                  <button
                    onClick={() => setActiveZoneFilter("silent")}
                    className={`zone-tab-btn ${activeZoneFilter === "silent" ? "active" : ""}`}
                  >
                    Silent Bay ({silentTotal})
                  </button>
                  <button
                    onClick={() => setActiveZoneFilter("pods")}
                    className={`zone-tab-btn ${activeZoneFilter === "pods" ? "active" : ""}`}
                  >
                    Study Pods ({podsTotal})
                  </button>
                  <button
                    onClick={() => setActiveZoneFilter("window")}
                    className={`zone-tab-btn ${activeZoneFilter === "window" ? "active" : ""}`}
                  >
                    Window Carrels ({windowTotal})
                  </button>
                </div>
              </div>

              {/* Seat Summary Cards */}
              <div className="seat-summary-grid">
                <div className="summary-card card-total">
                  <span className="summary-label">Total Floor Capacity</span>
                  <div className="summary-number">{totalSeats}</div>
                  <span className="summary-sub">Mapped Study Desks</span>
                </div>

                <div className="summary-card card-available">
                  <span className="summary-label">Available Desks</span>
                  <div className="summary-number number-available">{availableSeats}</div>
                  <span className="summary-sub">Ready to Occupy</span>
                </div>

                <div className="summary-card card-occupied">
                  <span className="summary-label">Currently Occupied</span>
                  <div className="summary-number number-occupied">{occupiedSeats}</div>
                  <span className="summary-sub">In Active Study Session</span>
                </div>
              </div>

              {/* Seat Map Canvas & Detail Side Panel */}
              <div className="seat-map-layout-grid">
                {/* Visual Floor Grid */}
                <div className="seat-floor-container">
                  <div className="floor-indicator-bar">
                    <span className="floor-label">LEVEL 2 • NORTH READING ATRIUM</span>
                    <span className="floor-doors">ENTRY &amp; CIRCULATION DESK ↓</span>
                  </div>

                  {/* Legend */}
                  <div className="seat-legend-bar">
                    <div className="legend-item">
                      <div className="seat-swatch swatch-available" />
                      <span>Available</span>
                    </div>
                    <div className="legend-item">
                      <div className="seat-swatch swatch-occupied" />
                      <span>Occupied</span>
                    </div>
                    <div className="legend-item">
                      <div className="seat-swatch swatch-selected" />
                      <span>Selected Desk</span>
                    </div>
                    <div className="legend-item">
                      <Zap size={13} className="power-icon-gold" />
                      <span>230V Power Outlet</span>
                    </div>
                  </div>

                  {/* Grid of 36 Seats */}
                  <div className="seats-grid-canvas">
                    {filteredSeats.map((seat) => {
                      const isSelected = selectedSeat?.id === seat.id;
                      return (
                        <button
                          key={seat.id}
                          onClick={() => setSelectedSeat(seat)}
                          className={`seat-box ${
                            seat.isOccupied ? "occupied" : "available"
                          } ${isSelected ? "selected" : ""}`}
                          aria-pressed={isSelected}
                          aria-label={`Desk ${seat.id}, ${seat.isOccupied ? "occupied" : "free"}`}
                          title={`Desk ${seat.id} (${seat.zone}) • ${
                            seat.isOccupied ? "Occupied" : "Available"
                          }`}
                        >
                          <span className="seat-header-row">
                            <span className="seat-id-tag">{seat.id}</span>
                            {seat.hasPowerOutlet && (
                              <Zap size={10} className="seat-power-indicator" aria-label="Power outlet" />
                            )}
                          </span>
                          <span className="seat-status-text">
                            {seat.isOccupied ? "Occupied" : "Free"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="floor-footer-note">
                    <Info size={12} className="info-icon" />
                    <span>Seat states reflect real-time local state. Reservation applies to your active session.</span>
                  </div>
                </div>

                {/* Selected Seat Inspector Panel */}
                <div className="seat-detail-panel">
                  {selectedSeat ? (
                    <div className="selected-seat-content">
                      <div className="panel-badge-row">
                        <span className="panel-seat-badge">{selectedSeat.id}</span>
                        <span
                          className={`panel-status-pill ${
                            selectedSeat.isOccupied ? "status-pill-occupied" : "status-pill-available"
                          }`}
                        >
                          {selectedSeat.isOccupied ? "Occupied" : "Available"}
                        </span>
                      </div>

                      <h3 className="panel-seat-title">{selectedSeat.zone}</h3>
                      <p className="panel-seat-desc">
                        Row {selectedSeat.row}, Station #{selectedSeat.number}
                      </p>

                      <div className="panel-amenities-box">
                        <span className="amenities-title">Desk amenities</span>
                        <div className="amenity-item">
                          <Zap size={14} className="amenity-icon" />
                          <span>{selectedSeat.hasPowerOutlet ? "230V power outlet available" : "No power outlet"}</span>
                        </div>
                      </div>

                      <div className="panel-occupant-note">
                        <span className="occupant-label">Current occupant</span>
                        <p className="occupant-val">{selectedSeat.occupiedBy || "None (Vacant)"}</p>
                      </div>

                      <div className="panel-action-box">
                        {selectedSeat.isOccupied ? (
                          selectedSeat.reservedByUserId === currentUserId ? (
                            <>
                              <p className="seat-reservation-note">Your seat will be released automatically in {remainingSeatTime}.</p>
                              <button
                                onClick={() => handleToggleSeat(selectedSeat.id)}
                                className="panel-toggle-btn btn-release"
                              >
                                <RotateCcw size={14} />
                                <span>Release My Seat</span>
                              </button>
                            </>
                          ) : (
                            <p className="seat-reservation-note">This seat is occupied by another student. Only the student who reserved it can release it.</p>
                          )
                        ) : myActiveSeat ? (
                          <p className="seat-reservation-note">You already reserved {myActiveSeat.id}. Release it before choosing another seat.</p>
                        ) : (
                          <button
                            onClick={() => handleToggleSeat(selectedSeat.id)}
                            className="panel-toggle-btn btn-reserve"
                          >
                            <CheckCircle2 size={14} />
                            <span>Reserve This Seat</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="seat-placeholder-empty">
                      <div className="placeholder-icon-wrap">
                        <BookmarkCheck size={24} />
                      </div>
                      <h4>No Seat Selected</h4>
                      <p>Click any desk marker on the floor layout to inspect details, power outlets, or toggle reservation.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </AppLayout>
  );
}