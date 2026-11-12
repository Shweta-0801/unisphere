import { loadFromStorage, saveToStorage } from "../utils/storage";

// ============================================================================
// 1. FIXED LOGGED-IN TEACHER INFORMATION
// One Teacher -> One Subject -> Multiple Classes -> Multiple Students
// ============================================================================
export const teacherProfile = {
  name: "Dr. Ananya Sharma",
  title: "Associate Professor",
  department: "Computer Science & Engineering",
  subject: "Data Structures",
  subjectCode: "CS-301",
  classes: ["CSE-A", "CSE-B", "CSE-C", "CSE-D"],
  email: "ananya.sharma@unisphere.edu",
  cabin: "Faculty Block B, Room 304",
  officeHours: "Mon-Thu 03:00 PM - 05:00 PM",
  semester: "Semester III • Academic Year 2026"
};

export function getTeacherProfile(user) {
  if (user && user.name) {
    return {
      ...teacherProfile,
      name: user.name,
      email: user.email || teacherProfile.email,
      department: user.department || teacherProfile.department
    };
  }
  return teacherProfile;
}

export function updateTeacherProfile(user) {
  if (user && user.name) {
    teacherProfile.name = user.name;
    if (user.email) teacherProfile.email = user.email;
    if (user.department) teacherProfile.department = user.department;
  }
}

export const classesList = ["CSE-A", "CSE-B", "CSE-C", "CSE-D"];

// ============================================================================
// 2. 18 CONDUCTED LECTURES WITH REAL DATA STRUCTURES SYLLABUS TOPICS
// ============================================================================
export const syllabusLectures = [
  { id: 1, date: "2026-09-01", topic: "Introduction to Data Structures & Space-Time Complexity" },
  { id: 2, date: "2026-09-03", topic: "Asymptotic Notations (Big-O, Omega, and Theta)" },
  { id: 3, date: "2026-09-05", topic: "Arrays & Multi-Dimensional Matrix Addressing" },
  { id: 4, date: "2026-09-08", topic: "Singly Linked List: Insertion, Deletion & Traversal" },
  { id: 5, date: "2026-09-10", topic: "Doubly Linked Lists & Circular Linked Lists" },
  { id: 6, date: "2026-09-12", topic: "Stack ADT: Implementation using Arrays & Lists" },
  { id: 7, date: "2026-09-15", topic: "Applications of Stacks: Infix to Postfix Conversion" },
  { id: 8, date: "2026-09-17", topic: "Queue ADT: Linear & Circular Queue Implementation" },
  { id: 9, date: "2026-09-19", topic: "Priority Queues & Double-Ended Queues (Deque)" },
  { id: 10, date: "2026-09-22", topic: "Binary Trees: Terminology, Properties & Storage" },
  { id: 11, date: "2026-09-24", topic: "Binary Tree Traversals (Inorder, Preorder, Postorder)" },
  { id: 12, date: "2026-09-26", topic: "Binary Search Trees (BST): Search, Insert & Delete" },
  { id: 13, date: "2026-09-29", topic: "AVL Trees: Balance Factors & Self-Balancing Rotations" },
  { id: 14, date: "2026-10-01", topic: "Graph Representations: Adjacency Matrix & Lists" },
  { id: 15, date: "2026-10-03", topic: "Graph Traversals: Breadth First Search (BFS) & DFS" },
  { id: 16, date: "2026-10-06", topic: "Minimum Spanning Trees (Prim's & Kruskal's Algorithms)" },
  { id: 17, date: "2026-10-08", topic: "Shortest Path Algorithms: Dijkstra's Algorithm" },
  { id: 18, date: "2026-10-10", topic: "Hashing Techniques & Collision Resolution Strategies" }
];

// ============================================================================
// 3. COMPLETE STUDENT DATASET (80 Students across 4 Classes)
// Viva-friendly simple object structure requested:
// { rollNo, name, className, attendance: { present, total }, marks: { internal, midTerm, endTerm } }
// ============================================================================
export const initialStudents = [
  // ----------------------------------------------------
  // SECTION: CSE-A (20 Students, Roll 101 - 120)
  // ----------------------------------------------------
  {
    id: 101,
    rollNo: 101,
    name: "Aarav Sharma",
    className: "CSE-A",
    attendance: { present: 16, total: 18 },
    marks: { internal: 24, midTerm: 22, endTerm: 43 }
  },
  {
    id: 102,
    rollNo: 102,
    name: "Riya Gupta",
    className: "CSE-A",
    attendance: { present: 17, total: 18 },
    marks: { internal: 27, midTerm: 24, endTerm: 46 }
  },
  {
    id: 103,
    rollNo: 103,
    name: "Arjun Verma",
    className: "CSE-A",
    attendance: { present: 13, total: 18 },
    marks: { internal: 18, midTerm: 19, endTerm: 36 }
  },
  {
    id: 104,
    rollNo: 104,
    name: "Ananya Kapoor",
    className: "CSE-A",
    attendance: { present: 15, total: 18 },
    marks: { internal: 22, midTerm: 20, endTerm: 41 }
  },
  {
    id: 105,
    rollNo: 105,
    name: "Rohan Mehta",
    className: "CSE-A",
    attendance: { present: 18, total: 18 },
    marks: { internal: 26, midTerm: 25, endTerm: 44 }
  },
  {
    id: 106,
    rollNo: 106,
    name: "Sneha Patel",
    className: "CSE-A",
    attendance: { present: 16, total: 18 },
    marks: { internal: 21, midTerm: 23, endTerm: 40 }
  },
  {
    id: 107,
    rollNo: 107,
    name: "Vikramaditya Rao",
    className: "CSE-A",
    attendance: { present: 14, total: 18 },
    marks: { internal: 20, midTerm: 21, endTerm: 38 }
  },
  {
    id: 108,
    rollNo: 108,
    name: "Ishaan Joshi",
    className: "CSE-A",
    attendance: { present: 17, total: 18 },
    marks: { internal: 25, midTerm: 23, endTerm: 42 }
  },
  {
    id: 109,
    rollNo: 109,
    name: "Kavya Iyer",
    className: "CSE-A",
    attendance: { present: 18, total: 18 },
    marks: { internal: 28, midTerm: 26, endTerm: 45 }
  },
  {
    id: 110,
    rollNo: 110,
    name: "Devansh Singhania",
    className: "CSE-A",
    attendance: { present: 12, total: 18 }, // Shortage (66.7%)
    marks: { internal: 14, midTerm: 15, endTerm: 28 }
  },
  {
    id: 111,
    rollNo: 111,
    name: "Priya Nair",
    className: "CSE-A",
    attendance: { present: 16, total: 18 },
    marks: { internal: 23, midTerm: 22, endTerm: 39 }
  },
  {
    id: 112,
    rollNo: 112,
    name: "Aditya Kulkarni",
    className: "CSE-A",
    attendance: { present: 15, total: 18 },
    marks: { internal: 20, midTerm: 21, endTerm: 37 }
  },
  {
    id: 113,
    rollNo: 113,
    name: "Tanvi Deshmukh",
    className: "CSE-A",
    attendance: { present: 17, total: 18 },
    marks: { internal: 26, midTerm: 24, endTerm: 43 }
  },
  {
    id: 114,
    rollNo: 114,
    name: "Harsh Vardhan",
    className: "CSE-A",
    attendance: { present: 13, total: 18 }, // Shortage (72.2%)
    marks: { internal: 17, midTerm: 18, endTerm: 31 }
  },
  {
    id: 115,
    rollNo: 115,
    name: "Pooja Choudhary",
    className: "CSE-A",
    attendance: { present: 16, total: 18 },
    marks: { internal: 22, midTerm: 21, endTerm: 40 }
  },
  {
    id: 116,
    rollNo: 116,
    name: "Kabir Malhotra",
    className: "CSE-A",
    attendance: { present: 15, total: 18 },
    marks: { internal: 21, midTerm: 20, endTerm: 38 }
  },
  {
    id: 117,
    rollNo: 117,
    name: "Meera Nambiar",
    className: "CSE-A",
    attendance: { present: 18, total: 18 },
    marks: { internal: 27, midTerm: 25, endTerm: 44 }
  },
  {
    id: 118,
    rollNo: 118,
    name: "Ayush Saxena",
    className: "CSE-A",
    attendance: { present: 16, total: 18 },
    marks: { internal: 24, midTerm: 22, endTerm: 41 }
  },
  {
    id: 119,
    rollNo: 119,
    name: "Neha Tiwari",
    className: "CSE-A",
    attendance: { present: 17, total: 18 },
    marks: { internal: 25, midTerm: 24, endTerm: 42 }
  },
  {
    id: 120,
    rollNo: 120,
    name: "Siddharth Sen",
    className: "CSE-A",
    attendance: { present: 15, total: 18 },
    marks: { internal: 21, midTerm: 21, endTerm: 39 }
  },

  // ----------------------------------------------------
  // SECTION: CSE-B (20 Students, Roll 201 - 220)
  // ----------------------------------------------------
  {
    id: 201,
    rollNo: 201,
    name: "Manish Agarwal",
    className: "CSE-B",
    attendance: { present: 16, total: 18 },
    marks: { internal: 23, midTerm: 21, endTerm: 40 }
  },
  {
    id: 202,
    rollNo: 202,
    name: "Deepika Padukone",
    className: "CSE-B",
    attendance: { present: 17, total: 18 },
    marks: { internal: 26, midTerm: 24, endTerm: 44 }
  },
  {
    id: 203,
    rollNo: 203,
    name: "Rahul Bhatt",
    className: "CSE-B",
    attendance: { present: 12, total: 18 }, // Shortage (66.7%)
    marks: { internal: 11, midTerm: 12, endTerm: 21 } // Support needed
  },
  {
    id: 204,
    rollNo: 204,
    name: "Simran Kaur",
    className: "CSE-B",
    attendance: { present: 15, total: 18 },
    marks: { internal: 21, midTerm: 20, endTerm: 38 }
  },
  {
    id: 205,
    rollNo: 205,
    name: "Varun Dhawan",
    className: "CSE-B",
    attendance: { present: 14, total: 18 },
    marks: { internal: 19, midTerm: 18, endTerm: 35 }
  },
  {
    id: 206,
    rollNo: 206,
    name: "Divya Reddy",
    className: "CSE-B",
    attendance: { present: 18, total: 18 },
    marks: { internal: 28, midTerm: 25, endTerm: 45 }
  },
  {
    id: 207,
    rollNo: 207,
    name: "Karan Johar",
    className: "CSE-B",
    attendance: { present: 13, total: 18 }, // Shortage (72.2%)
    marks: { internal: 16, midTerm: 17, endTerm: 30 }
  },
  {
    id: 208,
    rollNo: 208,
    name: "Pallavi Ghosh",
    className: "CSE-B",
    attendance: { present: 17, total: 18 },
    marks: { internal: 25, midTerm: 23, endTerm: 41 }
  },
  {
    id: 209,
    rollNo: 209,
    name: "Nikhil Menon",
    className: "CSE-B",
    attendance: { present: 16, total: 18 },
    marks: { internal: 22, midTerm: 22, endTerm: 39 }
  },
  {
    id: 210,
    rollNo: 210,
    name: "Aparna Sundaram",
    className: "CSE-B",
    attendance: { present: 17, total: 18 },
    marks: { internal: 26, midTerm: 24, endTerm: 43 }
  },
  {
    id: 211,
    rollNo: 211,
    name: "Gaurav Pandey",
    className: "CSE-B",
    attendance: { present: 15, total: 18 },
    marks: { internal: 20, midTerm: 19, endTerm: 37 }
  },
  {
    id: 212,
    rollNo: 212,
    name: "Shreya Chawla",
    className: "CSE-B",
    attendance: { present: 16, total: 18 },
    marks: { internal: 24, midTerm: 22, endTerm: 41 }
  },
  {
    id: 213,
    rollNo: 213,
    name: "Prateek Rawat",
    className: "CSE-B",
    attendance: { present: 14, total: 18 },
    marks: { internal: 18, midTerm: 18, endTerm: 34 }
  },
  {
    id: 214,
    rollNo: 214,
    name: "Anusha Hegde",
    className: "CSE-B",
    attendance: { present: 17, total: 18 },
    marks: { internal: 25, midTerm: 23, endTerm: 42 }
  },
  {
    id: 215,
    rollNo: 215,
    name: "Yash Chopra",
    className: "CSE-B",
    attendance: { present: 15, total: 18 },
    marks: { internal: 21, midTerm: 20, endTerm: 38 }
  },
  {
    id: 216,
    rollNo: 216,
    name: "Bhavna Mishra",
    className: "CSE-B",
    attendance: { present: 16, total: 18 },
    marks: { internal: 23, midTerm: 22, endTerm: 40 }
  },
  {
    id: 217,
    rollNo: 217,
    name: "Rishi Trivedi",
    className: "CSE-B",
    attendance: { present: 15, total: 18 },
    marks: { internal: 20, midTerm: 21, endTerm: 36 }
  },
  {
    id: 218,
    rollNo: 218,
    name: "Komal Swaminathan",
    className: "CSE-B",
    attendance: { present: 18, total: 18 },
    marks: { internal: 27, midTerm: 25, endTerm: 44 }
  },
  {
    id: 219,
    rollNo: 219,
    name: "Ashwin Pillai",
    className: "CSE-B",
    attendance: { present: 14, total: 18 },
    marks: { internal: 19, midTerm: 19, endTerm: 35 }
  },
  {
    id: 220,
    rollNo: 220,
    name: "Isha Singhal",
    className: "CSE-B",
    attendance: { present: 16, total: 18 },
    marks: { internal: 22, midTerm: 21, endTerm: 39 }
  },

  // ----------------------------------------------------
  // SECTION: CSE-C (20 Students, Roll 301 - 320)
  // ----------------------------------------------------
  {
    id: 301,
    rollNo: 301,
    name: "Akash Singhal",
    className: "CSE-C",
    attendance: { present: 17, total: 18 },
    marks: { internal: 26, midTerm: 24, endTerm: 43 }
  },
  {
    id: 302,
    rollNo: 302,
    name: "Trisha Mukherjee",
    className: "CSE-C",
    attendance: { present: 18, total: 18 },
    marks: { internal: 29, midTerm: 26, endTerm: 46 }
  },
  {
    id: 303,
    rollNo: 303,
    name: "Dhruv Saxena",
    className: "CSE-C",
    attendance: { present: 16, total: 18 },
    marks: { internal: 22, midTerm: 21, endTerm: 39 }
  },
  {
    id: 304,
    rollNo: 304,
    name: "Nandini Rathi",
    className: "CSE-C",
    attendance: { present: 17, total: 18 },
    marks: { internal: 25, midTerm: 24, endTerm: 42 }
  },
  {
    id: 305,
    rollNo: 305,
    name: "Abhishek Jain",
    className: "CSE-C",
    attendance: { present: 16, total: 18 },
    marks: { internal: 23, midTerm: 22, endTerm: 40 }
  },
  {
    id: 306,
    rollNo: 306,
    name: "Kritika Soni",
    className: "CSE-C",
    attendance: { present: 18, total: 18 },
    marks: { internal: 28, midTerm: 25, endTerm: 45 }
  },
  {
    id: 307,
    rollNo: 307,
    name: "Samir Kothari",
    className: "CSE-C",
    attendance: { present: 15, total: 18 },
    marks: { internal: 20, midTerm: 20, endTerm: 37 }
  },
  {
    id: 308,
    rollNo: 308,
    name: "Garima Kaushik",
    className: "CSE-C",
    attendance: { present: 17, total: 18 },
    marks: { internal: 24, midTerm: 23, endTerm: 41 }
  },
  {
    id: 309,
    rollNo: 309,
    name: "Chirag Bhattacharya",
    className: "CSE-C",
    attendance: { present: 12, total: 18 }, // Shortage (66.7%)
    marks: { internal: 15, midTerm: 16, endTerm: 29 }
  },
  {
    id: 310,
    rollNo: 310,
    name: "Payal Goswami",
    className: "CSE-C",
    attendance: { present: 16, total: 18 },
    marks: { internal: 23, midTerm: 22, endTerm: 39 }
  },
  {
    id: 311,
    rollNo: 311,
    name: "Vikas Bishnoi",
    className: "CSE-C",
    attendance: { present: 17, total: 18 },
    marks: { internal: 25, midTerm: 23, endTerm: 42 }
  },
  {
    id: 312,
    rollNo: 312,
    name: "Swati Narang",
    className: "CSE-C",
    attendance: { present: 18, total: 18 },
    marks: { internal: 27, midTerm: 25, endTerm: 44 }
  },
  {
    id: 313,
    rollNo: 313,
    name: "Tarun Bajaj",
    className: "CSE-C",
    attendance: { present: 15, total: 18 },
    marks: { internal: 21, midTerm: 20, endTerm: 38 }
  },
  {
    id: 314,
    rollNo: 314,
    name: "Monika Rathore",
    className: "CSE-C",
    attendance: { present: 16, total: 18 },
    marks: { internal: 22, midTerm: 21, endTerm: 40 }
  },
  {
    id: 315,
    rollNo: 315,
    name: "Lalit Mohan",
    className: "CSE-C",
    attendance: { present: 17, total: 18 },
    marks: { internal: 24, midTerm: 23, endTerm: 41 }
  },
  {
    id: 316,
    rollNo: 316,
    name: "Rachna Vohra",
    className: "CSE-C",
    attendance: { present: 18, total: 18 },
    marks: { internal: 28, midTerm: 26, endTerm: 45 }
  },
  {
    id: 317,
    rollNo: 317,
    name: "Saurabh Goyal",
    className: "CSE-C",
    attendance: { present: 16, total: 18 },
    marks: { internal: 23, midTerm: 22, endTerm: 39 }
  },
  {
    id: 318,
    rollNo: 318,
    name: "Pallavi Bhasin",
    className: "CSE-C",
    attendance: { present: 17, total: 18 },
    marks: { internal: 26, midTerm: 24, endTerm: 43 }
  },
  {
    id: 319,
    rollNo: 319,
    name: "Kunal Somani",
    className: "CSE-C",
    attendance: { present: 15, total: 18 },
    marks: { internal: 20, midTerm: 21, endTerm: 37 }
  },
  {
    id: 320,
    rollNo: 320,
    name: "Ekta Chhabra",
    className: "CSE-C",
    attendance: { present: 18, total: 18 },
    marks: { internal: 29, midTerm: 26, endTerm: 46 }
  },

  // ----------------------------------------------------
  // SECTION: CSE-D (20 Students, Roll 401 - 420)
  // ----------------------------------------------------
  {
    id: 401,
    rollNo: 401,
    name: "Deepak Yadav",
    className: "CSE-D",
    attendance: { present: 15, total: 18 },
    marks: { internal: 21, midTerm: 20, endTerm: 37 }
  },
  {
    id: 402,
    rollNo: 402,
    name: "Pooja Hegde",
    className: "CSE-D",
    attendance: { present: 16, total: 18 },
    marks: { internal: 23, midTerm: 22, endTerm: 39 }
  },
  {
    id: 403,
    rollNo: 403,
    name: "Sanjay Singhal",
    className: "CSE-D",
    attendance: { present: 11, total: 18 }, // Shortage (61.1%)
    marks: { internal: 12, midTerm: 14, endTerm: 24 } // Support needed
  },
  {
    id: 404,
    rollNo: 404,
    name: "Preeti Mahajan",
    className: "CSE-D",
    attendance: { present: 17, total: 18 },
    marks: { internal: 25, midTerm: 23, endTerm: 42 }
  },
  {
    id: 405,
    rollNo: 405,
    name: "Manav Sood",
    className: "CSE-D",
    attendance: { present: 14, total: 18 },
    marks: { internal: 19, midTerm: 18, endTerm: 34 }
  },
  {
    id: 406,
    rollNo: 406,
    name: "Natasha Roy",
    className: "CSE-D",
    attendance: { present: 16, total: 18 },
    marks: { internal: 22, midTerm: 21, endTerm: 38 }
  },
  {
    id: 407,
    rollNo: 407,
    name: "Girish Kulkarni",
    className: "CSE-D",
    attendance: { present: 13, total: 18 }, // Shortage (72.2%)
    marks: { internal: 16, midTerm: 17, endTerm: 31 }
  },
  {
    id: 408,
    rollNo: 408,
    name: "Lavanya Murthy",
    className: "CSE-D",
    attendance: { present: 17, total: 18 },
    marks: { internal: 26, midTerm: 24, endTerm: 43 }
  },
  {
    id: 409,
    rollNo: 409,
    name: "Bhavesh Parmar",
    className: "CSE-D",
    attendance: { present: 15, total: 18 },
    marks: { internal: 20, midTerm: 19, endTerm: 36 }
  },
  {
    id: 410,
    rollNo: 410,
    name: "Smriti Irani",
    className: "CSE-D",
    attendance: { present: 16, total: 18 },
    marks: { internal: 24, midTerm: 22, endTerm: 40 }
  },
  {
    id: 411,
    rollNo: 411,
    name: "Mayank Dixit",
    className: "CSE-D",
    attendance: { present: 14, total: 18 },
    marks: { internal: 18, midTerm: 18, endTerm: 33 }
  },
  {
    id: 412,
    rollNo: 412,
    name: "Ritu Chandra",
    className: "CSE-D",
    attendance: { present: 17, total: 18 },
    marks: { internal: 25, midTerm: 23, endTerm: 41 }
  },
  {
    id: 413,
    rollNo: 413,
    name: "Omkar Salunkhe",
    className: "CSE-D",
    attendance: { present: 15, total: 18 },
    marks: { internal: 21, midTerm: 20, endTerm: 37 }
  },
  {
    id: 414,
    rollNo: 414,
    name: "Anjali Sehgal",
    className: "CSE-D",
    attendance: { present: 16, total: 18 },
    marks: { internal: 23, midTerm: 21, endTerm: 39 }
  },
  {
    id: 415,
    rollNo: 415,
    name: "Tanmay Deshmukh",
    className: "CSE-D",
    attendance: { present: 15, total: 18 },
    marks: { internal: 20, midTerm: 20, endTerm: 36 }
  },
  {
    id: 416,
    rollNo: 416,
    name: "Vidya Balan",
    className: "CSE-D",
    attendance: { present: 18, total: 18 },
    marks: { internal: 27, midTerm: 25, endTerm: 44 }
  },
  {
    id: 417,
    rollNo: 417,
    name: "Kishore Kumar",
    className: "CSE-D",
    attendance: { present: 13, total: 18 }, // Shortage (72.2%)
    marks: { internal: 15, midTerm: 16, endTerm: 30 }
  },
  {
    id: 418,
    rollNo: 418,
    name: "Sunidhi Chauhan",
    className: "CSE-D",
    attendance: { present: 16, total: 18 },
    marks: { internal: 24, midTerm: 22, endTerm: 40 }
  },
  {
    id: 419,
    rollNo: 419,
    name: "Hemant Bisht",
    className: "CSE-D",
    attendance: { present: 14, total: 18 },
    marks: { internal: 19, midTerm: 19, endTerm: 35 }
  },
  {
    id: 420,
    rollNo: 420,
    name: "Charu Lata",
    className: "CSE-D",
    attendance: { present: 17, total: 18 },
    marks: { internal: 26, midTerm: 24, endTerm: 42 }
  }
];

// ============================================================================
// 4. VIVA-FRIENDLY CALCULATION & HELPER FUNCTIONS
// Simple JavaScript: formulas, map, filter, reduce
// ============================================================================

/**
 * Attendance % = (Present Classes / Total Classes) * 100
 */
export function calculateAttendancePercentage(present, total) {
  if (!total || total === 0) return 0;
  return Number(((present / total) * 100).toFixed(1));
}

/**
 * Total Marks = Internal + Mid-Term + End-Term
 */
export function calculateTotalMarks(marks) {
  if (!marks) return 0;
  return (marks.internal || 0) + (marks.midTerm || 0) + (marks.endTerm || 0);
}

/**
 * Grade mapping based on university criteria:
 * >= 90: A+
 * 80 - 89: A
 * 70 - 79: B
 * 60 - 69: C
 * 50 - 59: D
 * < 50: F (Needs Improvement / Support)
 */
export function calculateGrade(total) {
  if (total >= 90) return "A+";
  if (total >= 80) return "A";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  return "F";
}

/**
 * Filter students belonging to a specific class section
 */
export function getStudentsByClass(students, className) {
  return students.filter((student) => student.className === className);
}

/**
 * Summary metrics for a class section (Attendance & Performance)
 */
export function getClassMetrics(students, className) {
  const classStudents = getStudentsByClass(students, className);
  const totalStudents = classStudents.length;

  if (totalStudents === 0) {
    return {
      className,
      totalStudents: 0,
      lecturesHeld: 18,
      avgAttendance: 0,
      shortageCount: 0,
      avgMarks: 0,
      highestMarks: 0,
      lowestMarks: 0,
      passCount: 0
    };
  }

  // Attendance metrics
  const totalAttended = classStudents.reduce((sum, s) => sum + s.attendance.present, 0);
  const totalPossible = classStudents.reduce((sum, s) => sum + s.attendance.total, 0);
  const avgAttendance = Number(((totalAttended / totalPossible) * 100).toFixed(1));

  const shortageCount = classStudents.filter((s) => {
    const pct = calculateAttendancePercentage(s.attendance.present, s.attendance.total);
    return pct < 75;
  }).length;

  // Marks metrics
  const marksList = classStudents.map((s) => calculateTotalMarks(s.marks));
  const totalMarksSum = marksList.reduce((sum, m) => sum + m, 0);
  const avgMarks = Number((totalMarksSum / totalStudents).toFixed(1));
  const highestMarks = Math.max(...marksList);
  const lowestMarks = Math.min(...marksList);
  const passCount = marksList.filter((m) => m >= 40).length;

  return {
    className,
    totalStudents,
    lecturesHeld: 18,
    avgAttendance,
    shortageCount,
    avgMarks,
    highestMarks,
    lowestMarks,
    passCount
  };
}

/**
 * Overall summary metrics across all 4 classes for Dr. Ananya Sharma
 */
export function getTeacherDashboardStats(students) {
  const totalStudents = students.length;
  const totalClasses = classesList.length;
  const lecturesPerClass = 18;
  const totalLecturesConducted = totalClasses * lecturesPerClass;

  // Cumulative Attendance
  const totalAttended = students.reduce((sum, s) => sum + s.attendance.present, 0);
  const totalPossible = students.reduce((sum, s) => sum + s.attendance.total, 0);
  const overallAvgAttendance = Number(((totalAttended / totalPossible) * 100).toFixed(1));

  const studentsBelow75 = students.filter((s) => {
    const pct = calculateAttendancePercentage(s.attendance.present, s.attendance.total);
    return pct < 75;
  });

  // Cumulative Marks
  const allMarks = students.map((s) => calculateTotalMarks(s.marks));
  const overallAvgMarks = Number((allMarks.reduce((a, b) => a + b, 0) / totalStudents).toFixed(1));
  const overallHighest = Math.max(...allMarks);
  const overallLowest = Math.min(...allMarks);
  const totalPassed = allMarks.filter((m) => m >= 40).length;
  const needingImprovement = allMarks.filter((m) => m < 50).length;

  return {
    teacher: teacherProfile,
    totalClasses,
    totalStudents,
    lecturesPerClass,
    totalLecturesConducted,
    overallAvgAttendance,
    shortageCount: studentsBelow75.length,
    studentsBelow75,
    overallAvgMarks,
    overallHighest,
    overallLowest,
    totalPassed,
    needingImprovement
  };
}

// ============================================================================
// 5. LOCAL STORAGE SYNCHRONIZATION HELPERS
// Ensures updates made during teacher viva demonstration persist reliably
// ============================================================================
const STORAGE_KEY_STUDENTS = "unisphere_teacher_students_v2";

export function loadStoredStudents() {
  return loadFromStorage(STORAGE_KEY_STUDENTS, initialStudents);
}

export function saveStoredStudents(students) {
  saveToStorage(STORAGE_KEY_STUDENTS, students);
  try {
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Storage event error:", err);
  }
}
