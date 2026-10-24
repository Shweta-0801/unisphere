/**
 * Sample Smart Library Data for UniSphere
 * Includes interactive seat layout (totals strictly match seat states)
 * and books catalog with expected return dates for issued copies.
 */

// Generate 36 distinct library seats across 3 specialized zones
export const initialLibrarySeats = [
  // Zone A: Silent Reading Bay (Seats 1 - 12)
  { id: "S-01", zone: "Silent Reading Bay", row: "A", number: 1, isOccupied: false, hasPowerOutlet: true },
  { id: "S-02", zone: "Silent Reading Bay", row: "A", number: 2, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Student 2024-CSE-012" },
  { id: "S-03", zone: "Silent Reading Bay", row: "A", number: 3, isOccupied: false, hasPowerOutlet: false },
  { id: "S-04", zone: "Silent Reading Bay", row: "A", number: 4, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Student 2024-ECE-034" },
  { id: "S-05", zone: "Silent Reading Bay", row: "A", number: 5, isOccupied: false, hasPowerOutlet: true },
  { id: "S-06", zone: "Silent Reading Bay", row: "A", number: 6, isOccupied: false, hasPowerOutlet: false },
  { id: "S-07", zone: "Silent Reading Bay", row: "B", number: 7, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Student 2024-IT-008" },
  { id: "S-08", zone: "Silent Reading Bay", row: "B", number: 8, isOccupied: false, hasPowerOutlet: true },
  { id: "S-09", zone: "Silent Reading Bay", row: "B", number: 9, isOccupied: false, hasPowerOutlet: false },
  { id: "S-10", zone: "Silent Reading Bay", row: "B", number: 10, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Student 2024-CSE-055" },
  { id: "S-11", zone: "Silent Reading Bay", row: "B", number: 11, isOccupied: false, hasPowerOutlet: true },
  { id: "S-12", zone: "Silent Reading Bay", row: "B", number: 12, isOccupied: false, hasPowerOutlet: false },

  // Zone B: Collaborative Study Pods (Seats 13 - 24)
  { id: "P-13", zone: "Collaborative Study Pods", row: "C", number: 13, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Group Alpha (3 students)" },
  { id: "P-14", zone: "Collaborative Study Pods", row: "C", number: 14, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Group Alpha" },
  { id: "P-15", zone: "Collaborative Study Pods", row: "C", number: 15, isOccupied: false, hasPowerOutlet: true },
  { id: "P-16", zone: "Collaborative Study Pods", row: "C", number: 16, isOccupied: false, hasPowerOutlet: true },
  { id: "P-17", zone: "Collaborative Study Pods", row: "C", number: 17, isOccupied: false, hasPowerOutlet: false },
  { id: "P-18", zone: "Collaborative Study Pods", row: "C", number: 18, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Student 2024-ME-021" },
  { id: "P-19", zone: "Collaborative Study Pods", row: "D", number: 19, isOccupied: false, hasPowerOutlet: true },
  { id: "P-20", zone: "Collaborative Study Pods", row: "D", number: 20, isOccupied: false, hasPowerOutlet: true },
  { id: "P-21", zone: "Collaborative Study Pods", row: "D", number: 21, isOccupied: true, hasPowerOutlet: false, occupiedBy: "Student 2024-CSE-091" },
  { id: "P-22", zone: "Collaborative Study Pods", row: "D", number: 22, isOccupied: false, hasPowerOutlet: true },
  { id: "P-23", zone: "Collaborative Study Pods", row: "D", number: 23, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Student 2024-EE-014" },
  { id: "P-24", zone: "Collaborative Study Pods", row: "D", number: 24, isOccupied: false, hasPowerOutlet: false },

  // Zone C: Window View Carrels (Seats 25 - 36)
  { id: "W-25", zone: "Window View Carrels", row: "E", number: 25, isOccupied: false, hasPowerOutlet: true },
  { id: "W-26", zone: "Window View Carrels", row: "E", number: 26, isOccupied: false, hasPowerOutlet: true },
  { id: "W-27", zone: "Window View Carrels", row: "E", number: 27, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Student 2024-CSE-042 (You)" },
  { id: "W-28", zone: "Window View Carrels", row: "E", number: 28, isOccupied: false, hasPowerOutlet: false },
  { id: "W-29", zone: "Window View Carrels", row: "E", number: 29, isOccupied: false, hasPowerOutlet: true },
  { id: "W-30", zone: "Window View Carrels", row: "E", number: 30, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Student 2024-IT-019" },
  { id: "W-31", zone: "Window View Carrels", row: "F", number: 31, isOccupied: false, hasPowerOutlet: false },
  { id: "W-32", zone: "Window View Carrels", row: "F", number: 32, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Student 2024-ECE-061" },
  { id: "W-33", zone: "Window View Carrels", row: "F", number: 33, isOccupied: false, hasPowerOutlet: true },
  { id: "W-34", zone: "Window View Carrels", row: "F", number: 34, isOccupied: false, hasPowerOutlet: false },
  { id: "W-35", zone: "Window View Carrels", row: "F", number: 35, isOccupied: true, hasPowerOutlet: true, occupiedBy: "Student 2024-CSE-077" },
  { id: "W-36", zone: "Window View Carrels", row: "F", number: 36, isOccupied: false, hasPowerOutlet: true }
];

export const libraryBooksCatalog = [
  {
    id: "bk-101",
    title: "Introduction to Algorithms (CLRS)",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    category: "Computer Science",
    edition: "4th Edition",
    isbn: "978-0262046305",
    callNumber: "QA76.6 .C662 2022",
    shelf: "Stack CS-02 / Shelf 3",
    status: "Available", // "Available" | "Not Available"
    availableCopies: 3,
    totalCopies: 5,
    returnDate: null
  },
  {
    id: "bk-102",
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry F. Korth, S. Sudarshan",
    category: "Computer Science",
    edition: "7th Edition",
    isbn: "978-0078022159",
    callNumber: "QA76.9.D3 S56 2020",
    shelf: "Stack CS-04 / Shelf 1",
    status: "Not Available",
    availableCopies: 0,
    totalCopies: 4,
    returnDate: "24 Oct 2026" // Expected return date shown beneath Not Available
  },
  {
    id: "bk-103",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin, Greg Gagne",
    category: "Computer Science",
    edition: "10th Edition",
    isbn: "978-1119456338",
    callNumber: "QA76.76.O63 S55 2018",
    shelf: "Stack CS-05 / Shelf 2",
    status: "Available",
    availableCopies: 2,
    totalCopies: 6,
    returnDate: null
  },
  {
    id: "bk-104",
    title: "Computer Networks: A Systems Approach",
    author: "Larry L. Peterson, Bruce S. Davie",
    category: "Computer Science",
    edition: "6th Edition",
    isbn: "978-0128182000",
    callNumber: "TK5105.5 .P479 2021",
    shelf: "Stack CS-07 / Shelf 4",
    status: "Not Available",
    availableCopies: 0,
    totalCopies: 3,
    returnDate: "28 Oct 2026"
  },
  {
    id: "bk-105",
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth H. Rosen",
    category: "Mathematics",
    edition: "8th Edition",
    isbn: "978-1259676512",
    callNumber: "QA39.3 .R67 2019",
    shelf: "Stack MATH-01 / Shelf 2",
    status: "Available",
    availableCopies: 5,
    totalCopies: 5,
    returnDate: null
  },
  {
    id: "bk-106",
    title: "Digital Design: With an Introduction to Verilog HDL",
    author: "M. Morris Mano, Michael D. Ciletti",
    category: "Electronics",
    edition: "6th Edition",
    isbn: "978-0134549897",
    callNumber: "TK7888.3 .M35 2018",
    shelf: "Stack EC-03 / Shelf 1",
    status: "Not Available",
    availableCopies: 0,
    totalCopies: 2,
    returnDate: "22 Oct 2026"
  },
  {
    id: "bk-107",
    title: "Clean Architecture: A Craftsman's Guide to Software Structure",
    author: "Robert C. Martin",
    category: "Software Engineering",
    edition: "1st Edition",
    isbn: "978-0134494166",
    callNumber: "QA76.758 .M37 2017",
    shelf: "Stack CS-09 / Shelf 3",
    status: "Available",
    availableCopies: 1,
    totalCopies: 3,
    returnDate: null
  }
];

/**
 * =============================================================================
 * PE-II FEATURE: MY ISSUED BOOKS & RETURN REMINDERS DATA & DATE UTILITIES
 * Pure JavaScript Date Handling • No External Libraries
 * =============================================================================
 */

/**
 * Helper to compute date string formatted as YYYY-MM-DD relative to today.
 * Ensures sample dates dynamically adapt whenever tested.
 */
export function getRelativeDateString(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Helper to format YYYY-MM-DD into readable English date (e.g., "21 Oct 2026")
 */
export function formatDisplayDate(dateString) {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;
  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);
  const date = new Date(year, month, day);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

/**
 * Dynamically calculates book return status and reminder urgency
 * by comparing pure calendar dates (ignoring hours/minutes).
 * 
 * Returns:
 * - "Due Tomorrow": if return date is 1 day away (reminder date is today)
 * - "Due Today": if return date is today
 * - "Overdue": if return date has passed (difference < 0)
 * - "Issued": if return date is further in the future (> 1 day)
 */
export function calculateBookStatus(returnDateString) {
  if (!returnDateString) {
    return {
      status: "Issued",
      dayDifference: 0,
      isUrgent: false,
      alertType: "normal",
      message: "No return date recorded"
    };
  }

  // Current calendar date at midnight
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  // Return calendar date at midnight
  const parts = returnDateString.split("-");
  const returnYear = Number(parts[0]);
  const returnMonth = Number(parts[1]) - 1;
  const returnDay = Number(parts[2]);
  const returnMidnight = new Date(returnYear, returnMonth, returnDay).getTime();

  // Calendar day difference in full 24-hour periods
  const msPerDay = 1000 * 60 * 60 * 24;
  const dayDifference = Math.round((returnMidnight - todayMidnight) / msPerDay);

  if (dayDifference < 0) {
    const overdueDays = Math.abs(dayDifference);
    return {
      status: "Overdue",
      dayDifference,
      isUrgent: true,
      alertType: "overdue",
      message: `Overdue by ${overdueDays} day${overdueDays > 1 ? "s" : ""}! Please return immediately.`
    };
  } else if (dayDifference === 0) {
    return {
      status: "Due Today",
      dayDifference: 0,
      isUrgent: true,
      alertType: "today",
      message: "Due today! Must be returned to the circulation desk by 08:00 PM."
    };
  } else if (dayDifference === 1) {
    return {
      status: "Due Tomorrow",
      dayDifference: 1,
      isUrgent: true,
      alertType: "tomorrow",
      message: "Reminder: Due tomorrow! Plan your return or renewal."
    };
  } else {
    return {
      status: "Issued",
      dayDifference,
      isUrgent: false,
      alertType: "normal",
      message: `Due in ${dayDifference} days.`
    };
  }
}

/**
 * Sample Issued Books Data (Demonstration Data)
 * Covers all 4 dynamic test scenarios:
 * 1. Due Tomorrow (+1 day)
 * 2. Due Today (0 days)
 * 3. Overdue (-2 days)
 * 4. Future Return Date (+6 days)
 */
export const initialIssuedBooks = [
  {
    id: "issued-101",
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry F. Korth, S. Sudarshan",
    description: "Standard course reference covering relational algebra, SQL transactions, 3NF normalization, and ACID properties.",
    isbn: "978-0078022159",
    callNumber: "QA76.9.D3 S56",
    issueDate: getRelativeDateString(-13),
    returnDate: getRelativeDateString(1) // Due Tomorrow!
  },
  {
    id: "issued-102",
    title: "Computer Networks: A Systems Approach",
    author: "Larry L. Peterson, Bruce S. Davie",
    description: "Core textbook for TCP/IP protocol stack, sliding window flow control, packet routing, and network socket programming.",
    isbn: "978-0128182000",
    callNumber: "TK5105.5 .P479",
    issueDate: getRelativeDateString(-14),
    returnDate: getRelativeDateString(0) // Due Today!
  },
  {
    id: "issued-103",
    title: "Introduction to Algorithms (CLRS)",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest",
    description: "Comprehensive university reference for asymptotic analysis, AVL trees, dynamic programming, and greedy algorithms.",
    isbn: "978-0262046305",
    callNumber: "QA76.6 .C662",
    issueDate: getRelativeDateString(-16),
    returnDate: getRelativeDateString(-2) // Overdue by 2 days!
  },
  {
    id: "issued-104",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin, Greg Gagne",
    description: "Essential guide to process scheduling, virtual memory paging, deadlock Banker's algorithm, and file systems.",
    isbn: "978-1119456338",
    callNumber: "QA76.76.O63",
    issueDate: getRelativeDateString(-8),
    returnDate: getRelativeDateString(6) // Due in the future (Issued)
  }
];