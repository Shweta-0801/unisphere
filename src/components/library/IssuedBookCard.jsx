import React from "react";
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  BookMarked
} from "lucide-react";
import { formatDisplayDate } from "../../data/libraryData";

/**
 * IssuedBookCard Component
 * 
 * PE-II Concepts Used:
 * - Functional Component & JSX
 * - Props: receives `book`, `statusInfo`, and `onReturn`
 * - Conditional Rendering: renders appropriate badge & notice based on status
 * - Pure JavaScript Date Formatting: displays human-readable calendar dates
 */
export default function IssuedBookCard({ book, statusInfo, onReturn }) {
  // Determine badge CSS class based on dynamically calculated status
  const getBadgeClass = (status) => {
    switch (status) {
      case "Due Tomorrow":
        return "badge-due-tomorrow";
      case "Due Today":
        return "badge-due-today";
      case "Overdue":
        return "badge-overdue";
      case "Issued":
      default:
        return "badge-issued";
    }
  };

  const formattedIssueDate = formatDisplayDate(book.issueDate);
  const formattedReturnDate = formatDisplayDate(book.returnDate);

  return (
    <div className={`issued-book-card ${statusInfo.alertType ? `card-${statusInfo.alertType}` : ""}`}>
      {/* Top Header Row: Status Badge & Shelf/Call Number */}
      <div className="issued-card-top">
        <span className={`issued-status-badge ${getBadgeClass(statusInfo.status)}`}>
          {statusInfo.status === "Due Today" && <AlertTriangle size={12} />}
          {statusInfo.status === "Due Tomorrow" && <Clock size={12} />}
          {statusInfo.status === "Overdue" && <AlertTriangle size={12} />}
          {statusInfo.status === "Issued" && <CheckCircle size={12} />}
          <span>{statusInfo.status}</span>
        </span>

        {book.callNumber && (
          <span className="issued-call-no">
            <BookMarked size={11} style={{ display: "inline", marginRight: "3px" }} />
            {book.callNumber}
          </span>
        )}
      </div>

      {/* Book Title & Author */}
      <h3 className="issued-book-title">{book.title}</h3>
      <p className="issued-book-author">By {book.author}</p>

      {/* Short Description */}
      <p className="issued-book-desc">{book.description}</p>

      {/* Dates Information Container */}
      <div className="issued-dates-box">
        <div className="date-field">
          <span className="date-label">Issue Date</span>
          <span className="date-value">{formattedIssueDate}</span>
        </div>

        <div className="date-divider" />

        <div className="date-field">
          <span className="date-label">Last Date to Return</span>
          <span
            className={`date-value ${
              statusInfo.alertType === "overdue" || statusInfo.alertType === "today"
                ? "date-urgent"
                : ""
            }`}
          >
            {formattedReturnDate}
          </span>
        </div>
      </div>

      {/* Contextual Status Message / Due Timeline */}
      <div className={`status-hint-row hint-${statusInfo.alertType || "normal"}`}>
        <Calendar size={13} />
        <span>{statusInfo.message}</span>
      </div>

      {/* Demonstration Action: Return Book */}
      {onReturn && (
        <div className="issued-card-actions">
          <button
            type="button"
            onClick={() => onReturn(book)}
            className="btn-return-book"
            title="Demonstrate returning this book to the circulation desk"
          >
            <RotateCcw size={12} />
            <span>Mark as Returned</span>
          </button>
        </div>
      )}
    </div>
  );
}