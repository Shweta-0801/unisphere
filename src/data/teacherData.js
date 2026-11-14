/**
 * Teacher & Faculty Academic Data for UniSphere
 * Tailored for Dr. Evelyn Reed (Head of Computer Science & Lead Faculty)
 */

export const facultyProfile = {
  id: "fac-cse-012",
  name: "Dr. Evelyn Reed",
  title: "Professor & Head of Department",
  rollNo: "FAC-CSE-012",
  department: "Computer Science & Engineering",
  email: "e.reed@unisphere.edu",
  office: "Faculty Wing B, Suite 405",
  officeHours: "Mon/Wed 02:00 PM – 04:00 PM",
  initials: "ER",
  role: "Faculty"
};

export const assignedClassesData = [
  {
    id: "cls-1",
    code: "CS-301",
    name: "Data Structures & Algorithms",
    section: "Section A",
    semester: "4th Semester",
    totalStudents: 62,
    schedule: "Tue / Thu • 09:30 AM – 11:00 AM",
    room: "Lecture Hall 302",
    credits: 4,
    classesHeld: 32,
    averageAttendance: 82.4,
    defaulterCount: 6,
    syllabusProgress: 78
  },
  {
    id: "cls-2",
    code: "CS-301",
    name: "Data Structures & Algorithms",
    section: "Section B",
    semester: "4th Semester",
    totalStudents: 58,
    schedule: "Mon / Wed • 11:15 AM – 12:45 PM",
    room: "Lecture Hall 204",
    credits: 4,
    classesHeld: 30,
    averageAttendance: 79.1,
    defaulterCount: 9,
    syllabusProgress: 75
  },
  {
    id: "cls-3",
    code: "CS-303",
    name: "Operating Systems Principles",
    section: "Section A",
    semester: "4th Semester",
    totalStudents: 60,
    schedule: "Wed / Fri • 02:00 PM – 03:30 PM",
    room: "Hall 108",
    credits: 3,
    classesHeld: 28,
    averageAttendance: 84.7,
    defaulterCount: 4,
    syllabusProgress: 82
  },
  {
    id: "cls-4",
    code: "CS-402",
    name: "Advanced Algorithms & Optimization",
    section: "Section C",
    semester: "6th Semester",
    totalStudents: 45,
    schedule: "Tue / Fri • 03:45 PM – 05:15 PM",
    room: "Systems Lab 3",
    credits: 4,
    classesHeld: 26,
    averageAttendance: 88.2,
    defaulterCount: 2,
    syllabusProgress: 70
  }
];

export const sampleStudentsByClass = {
  "cls-1": [
    {
      id: "std-042",
      name: "Alex Sharma",
      rollNo: "2024-CSE-042",
      email: "alex.sharma@unisphere.edu",
      phone: "+91 98201 44521",
      classesAttended: 28,
      totalClasses: 32,
      attendancePercentage: 87.5,
      gradeAverage: 88.5,
      submissionsCount: 4,
      totalAssignments: 4,
      status: "Safe",
      mentorshipNotes: "Consistently attends morning lectures. Strong grasping of binary trees and recursive algorithmic structures.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Present" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Present" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Present" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Absent" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Present" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Present" }
      ]
    },
    {
      id: "std-018",
      name: "Rohan Gupta",
      rollNo: "2024-CSE-018",
      email: "rohan.g@unisphere.edu",
      phone: "+91 97112 88902",
      classesAttended: 21,
      totalClasses: 32,
      attendancePercentage: 65.6,
      gradeAverage: 64.0,
      submissionsCount: 2,
      totalAssignments: 4,
      status: "At Risk",
      mentorshipNotes: "Flagged for condonation deficit. Needs 5 consecutive attended classes without missing to reach safe 75%.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Absent" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Absent" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Present" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Absent" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Present" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Absent" }
      ]
    },
    {
      id: "std-001",
      name: "Ananya Verma",
      rollNo: "2024-CSE-001",
      email: "ananya.v@unisphere.edu",
      phone: "+91 99341 00214",
      classesAttended: 31,
      totalClasses: 32,
      attendancePercentage: 96.9,
      gradeAverage: 96.0,
      submissionsCount: 4,
      totalAssignments: 4,
      status: "Safe",
      mentorshipNotes: "Top academic candidate. Active class engagement and peer tutor in university group study lounges.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Present" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Present" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Present" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Present" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Present" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Present" }
      ]
    },
    {
      id: "std-014",
      name: "Kabir Sen",
      rollNo: "2024-CSE-014",
      email: "kabir.s@unisphere.edu",
      phone: "+91 98110 33201",
      classesAttended: 23,
      totalClasses: 32,
      attendancePercentage: 71.9,
      gradeAverage: 73.0,
      submissionsCount: 3,
      totalAssignments: 4,
      status: "At Risk",
      mentorshipNotes: "Borderline case. Advised to attend Friday review session and submit make-up quiz.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Absent" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Present" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Present" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Present" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Absent" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Present" }
      ]
    },
    {
      id: "std-029",
      name: "Priya Deshmukh",
      rollNo: "2024-CSE-029",
      email: "priya.d@unisphere.edu",
      phone: "+91 98451 90812",
      classesAttended: 29,
      totalClasses: 32,
      attendancePercentage: 90.6,
      gradeAverage: 89.0,
      submissionsCount: 4,
      totalAssignments: 4,
      status: "Safe",
      mentorshipNotes: "Very reliable performance across tests and coding labs.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Present" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Present" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Present" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Present" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Present" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Present" }
      ]
    },
    {
      id: "std-033",
      name: "Devansh Roy",
      rollNo: "2024-CSE-033",
      email: "devansh.r@unisphere.edu",
      phone: "+91 97722 55431",
      classesAttended: 27,
      totalClasses: 32,
      attendancePercentage: 84.4,
      gradeAverage: 81.0,
      submissionsCount: 3,
      totalAssignments: 4,
      status: "Safe",
      mentorshipNotes: "Solid work; needs slight improvement in graph proofs.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Present" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Present" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Absent" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Present" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Present" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Present" }
      ]
    },
    {
      id: "std-051",
      name: "Meera Nair",
      rollNo: "2024-CSE-051",
      email: "meera.n@unisphere.edu",
      phone: "+91 99104 22198",
      classesAttended: 30,
      totalClasses: 32,
      attendancePercentage: 93.8,
      gradeAverage: 92.5,
      submissionsCount: 4,
      totalAssignments: 4,
      status: "Safe",
      mentorshipNotes: "Excellent lab marks and consistent submission deadlines.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Present" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Present" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Present" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Present" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Present" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Present" }
      ]
    },
    {
      id: "std-064",
      name: "Tanya Kapoor",
      rollNo: "2024-CSE-064",
      email: "tanya.k@unisphere.edu",
      phone: "+91 98831 44109",
      classesAttended: 22,
      totalClasses: 32,
      attendancePercentage: 68.8,
      gradeAverage: 69.0,
      submissionsCount: 2,
      totalAssignments: 4,
      status: "At Risk",
      mentorshipNotes: "At risk (<75%). Needs to maintain strict attendance over the remaining 8 weeks.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Absent" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Absent" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Present" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Present" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Present" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Absent" }
      ]
    },
    {
      id: "std-007",
      name: "Aarav Patel",
      rollNo: "2024-CSE-007",
      email: "aarav.p@unisphere.edu",
      phone: "+91 97203 11845",
      classesAttended: 29,
      totalClasses: 32,
      attendancePercentage: 90.6,
      gradeAverage: 86.0,
      submissionsCount: 4,
      totalAssignments: 4,
      status: "Safe",
      mentorshipNotes: "Strong mathematical aptitude. Participated in inter-college competitive coding.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Present" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Present" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Present" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Present" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Absent" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Present" }
      ]
    },
    {
      id: "std-022",
      name: "Isha Malhotra",
      rollNo: "2024-CSE-022",
      email: "isha.m@unisphere.edu",
      phone: "+91 98115 67200",
      classesAttended: 28,
      totalClasses: 32,
      attendancePercentage: 87.5,
      gradeAverage: 84.0,
      submissionsCount: 3,
      totalAssignments: 4,
      status: "Safe",
      mentorshipNotes: "Good grasp of dynamic programming concepts.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Present" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Present" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Present" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Present" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Present" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Present" }
      ]
    },
    {
      id: "std-038",
      name: "Siddharth Joshi",
      rollNo: "2024-CSE-038",
      email: "sid.j@unisphere.edu",
      phone: "+91 99201 88312",
      classesAttended: 26,
      totalClasses: 32,
      attendancePercentage: 81.3,
      gradeAverage: 79.5,
      submissionsCount: 3,
      totalAssignments: 4,
      status: "Safe",
      mentorshipNotes: "Average participation. Needs encouragement on live whiteboard coding.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Present" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Present" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Absent" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Present" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Present" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Present" }
      ]
    },
    {
      id: "std-056",
      name: "Rhea Chawla",
      rollNo: "2024-CSE-056",
      email: "rhea.c@unisphere.edu",
      phone: "+91 98334 10092",
      classesAttended: 20,
      totalClasses: 32,
      attendancePercentage: 62.5,
      gradeAverage: 67.0,
      submissionsCount: 2,
      totalAssignments: 4,
      status: "At Risk",
      mentorshipNotes: "Critical attendance alert. Medical leave documentation submitted for late September; condonation under verification.",
      history: [
        { date: "Oct 20, 2026", topic: "B-Trees & 2-3 Trees Splitting", status: "Absent" },
        { date: "Oct 18, 2026", topic: "Red-Black Tree Rotations (Left/Right)", status: "Absent" },
        { date: "Oct 15, 2026", topic: "AVL Tree Double Rotations (LR/RL)", status: "Present" },
        { date: "Oct 13, 2026", topic: "Binary Search Trees Deletion Cases", status: "Absent" },
        { date: "Oct 11, 2026", topic: "Tree Traversal: Iterative In-order", status: "Present" },
        { date: "Oct 08, 2026", topic: "Binary Heap Properties & Heapify", status: "Absent" }
      ]
    }
  ],
  "cls-2": [
    {
      id: "std-201",
      name: "Aditya Menon",
      rollNo: "2024-CSE-071",
      email: "aditya.m@unisphere.edu",
      phone: "+91 98200 12345",
      classesAttended: 26,
      totalClasses: 30,
      attendancePercentage: 86.7,
      gradeAverage: 82.0,
      submissionsCount: 3,
      totalAssignments: 3,
      status: "Safe",
      mentorshipNotes: "Consistently on time.",
      history: [{ date: "Oct 19, 2026", topic: "AVL Trees", status: "Present" }]
    },
    {
      id: "std-202",
      name: "Sneha Kulkarni",
      rollNo: "2024-CSE-084",
      email: "sneha.k@unisphere.edu",
      phone: "+91 97111 54321",
      classesAttended: 21,
      totalClasses: 30,
      attendancePercentage: 70.0,
      gradeAverage: 71.5,
      submissionsCount: 2,
      totalAssignments: 3,
      status: "At Risk",
      mentorshipNotes: "Missed morning lab lectures.",
      history: [{ date: "Oct 19, 2026", topic: "AVL Trees", status: "Absent" }]
    },
    {
      id: "std-203",
      name: "Varun Nair",
      rollNo: "2024-CSE-092",
      email: "varun.n@unisphere.edu",
      phone: "+91 99222 67890",
      classesAttended: 27,
      totalClasses: 30,
      attendancePercentage: 90.0,
      gradeAverage: 87.0,
      submissionsCount: 3,
      totalAssignments: 3,
      status: "Safe",
      mentorshipNotes: "Excellent teamwork.",
      history: [{ date: "Oct 19, 2026", topic: "AVL Trees", status: "Present" }]
    }
  ],
  "cls-3": [
    {
      id: "std-301",
      name: "Rahul Nambiar",
      rollNo: "2024-CSE-103",
      email: "rahul.n@unisphere.edu",
      phone: "+91 98100 45678",
      classesAttended: 25,
      totalClasses: 28,
      attendancePercentage: 89.3,
      gradeAverage: 88.0,
      submissionsCount: 3,
      totalAssignments: 3,
      status: "Safe",
      mentorshipNotes: "Strong grasp on kernel architecture.",
      history: [{ date: "Oct 18, 2026", topic: "Virtual Memory Paging", status: "Present" }]
    },
    {
      id: "std-302",
      name: "Kritika Saini",
      rollNo: "2024-CSE-118",
      email: "kritika.s@unisphere.edu",
      phone: "+91 97120 78912",
      classesAttended: 19,
      totalClasses: 28,
      attendancePercentage: 67.9,
      gradeAverage: 65.0,
      submissionsCount: 1,
      totalAssignments: 3,
      status: "At Risk",
      mentorshipNotes: "Needs support in POSIX thread synchronization labs.",
      history: [{ date: "Oct 18, 2026", topic: "Virtual Memory Paging", status: "Absent" }]
    }
  ],
  "cls-4": [
    {
      id: "std-401",
      name: "Nikhil Bansal",
      rollNo: "2022-CSE-012",
      email: "nikhil.b@unisphere.edu",
      phone: "+91 98400 90123",
      classesAttended: 24,
      totalClasses: 26,
      attendancePercentage: 92.3,
      gradeAverage: 94.0,
      submissionsCount: 2,
      totalAssignments: 2,
      status: "Safe",
      mentorshipNotes: "Preparing for advanced algorithmic competitions.",
      history: [{ date: "Oct 17, 2026", topic: "Linear Programming Duality", status: "Present" }]
    }
  ]
};

export const initialTeacherAssignments = [
  {
    id: "asg-1",
    classId: "cls-1",
    classCode: "CS-301",
    className: "Data Structures & Algorithms (Sec A)",
    title: "Assignment 4: Red-Black Tree Balancing & B-Trees",
    category: "Programming Task",
    totalMarks: 50,
    dueDate: "2026-10-28",
    dueTime: "23:59",
    description: "Implement a self-balancing Red-Black Tree in C++ or Python with insert, delete, and visual graph traversal operations. Include asymptotic complexity proofs for rotational adjustments.",
    allowedFormats: ["PDF", "ZIP", "CPP", "PY"],
    totalSubmissions: 10,
    pendingGrading: 3,
    gradedCount: 7,
    status: "Active",
    createdDate: "2026-10-14",
    submissions: [
      {
        id: "sub-101",
        studentName: "Alex Sharma",
        rollNo: "2024-CSE-042",
        submittedAt: "2026-10-26 18:32",
        status: "Pending Review",
        fileName: "2024-CSE-042_RBTree_AlexSharma.zip",
        fileSize: "2.4 MB",
        marks: null,
        feedback: "",
        codeSnippet: "class RedBlackTree {\n  Node* root;\n  void rotateLeft(Node*& root, Node*& pt) {\n    Node* pt_right = pt->right;\n    pt->right = pt_right->left;\n    if (pt->right != nullptr) pt->right->parent = pt;\n    pt_right->parent = pt->parent;\n    if (pt->parent == nullptr) root = pt_right;\n    else if (pt == pt->parent->left) pt->parent->left = pt_right;\n    else pt->parent->right = pt_right;\n    pt_right->left = pt;\n    pt->parent = pt_right;\n  }\n};"
      },
      {
        id: "sub-102",
        studentName: "Ananya Verma",
        rollNo: "2024-CSE-001",
        submittedAt: "2026-10-25 14:10",
        status: "Graded",
        fileName: "AnanyaVerma_RB_Tree_Report.pdf",
        fileSize: "4.1 MB",
        marks: 49,
        feedback: "Exemplary implementation and rigorous mathematical analysis of rotation cases. Benchmark timings are thorough and accurately visualized.",
        gradedAt: "2026-10-26"
      },
      {
        id: "sub-103",
        studentName: "Rohan Gupta",
        rollNo: "2024-CSE-018",
        submittedAt: null,
        status: "Not Submitted",
        fileName: null,
        fileSize: null,
        marks: null,
        feedback: ""
      },
      {
        id: "sub-104",
        studentName: "Priya Deshmukh",
        rollNo: "2024-CSE-029",
        submittedAt: "2026-10-26 21:05",
        status: "Pending Review",
        fileName: "PriyaD_Assignment4_DataStructures.zip",
        fileSize: "1.8 MB",
        marks: null,
        feedback: "",
        codeSnippet: "def balance_tree_after_insert(self, node):\n    while node != self.root and node.parent.color == RED:\n        # Symmetric cases for left/right uncle handling\n        pass"
      },
      {
        id: "sub-105",
        studentName: "Kabir Sen",
        rollNo: "2024-CSE-014",
        submittedAt: "2026-10-25 09:40",
        status: "Graded",
        fileName: "KabirSen_CS301_HW4.pdf",
        fileSize: "3.2 MB",
        marks: 42,
        feedback: "Good logic. Double rotation logic in RL case had a slight pointer re-linking error in edge deletions, but overall solid effort.",
        gradedAt: "2026-10-25"
      },
      {
        id: "sub-106",
        studentName: "Devansh Roy",
        rollNo: "2024-CSE-033",
        submittedAt: "2026-10-25 22:15",
        status: "Graded",
        fileName: "DevanshRoy_RBTree_v2.zip",
        fileSize: "2.1 MB",
        marks: 44,
        feedback: "Clear code comments and proper memory deallocation in destructors.",
        gradedAt: "2026-10-26"
      },
      {
        id: "sub-107",
        studentName: "Meera Nair",
        rollNo: "2024-CSE-051",
        submittedAt: "2026-10-26 11:45",
        status: "Graded",
        fileName: "MeeraNair_CS301_A4.pdf",
        fileSize: "3.9 MB",
        marks: 48,
        feedback: "Excellent graph plots comparing BST vs AVL vs Red-Black Tree search depths.",
        gradedAt: "2026-10-26"
      },
      {
        id: "sub-108",
        studentName: "Tanya Kapoor",
        rollNo: "2024-CSE-064",
        submittedAt: null,
        status: "Not Submitted",
        fileName: null,
        fileSize: null,
        marks: null,
        feedback: ""
      },
      {
        id: "sub-109",
        studentName: "Aarav Patel",
        rollNo: "2024-CSE-007",
        submittedAt: "2026-10-26 15:30",
        status: "Pending Review",
        fileName: "AaravPatel_RedBlackTree_Solution.zip",
        fileSize: "2.7 MB",
        marks: null,
        feedback: "",
        codeSnippet: "// Aarav Patel - Fast Template Red-Black Tree Implementation"
      },
      {
        id: "sub-110",
        studentName: "Isha Malhotra",
        rollNo: "2024-CSE-022",
        submittedAt: "2026-10-24 19:20",
        status: "Graded",
        fileName: "IshaM_Assignment4.pdf",
        fileSize: "3.5 MB",
        marks: 46,
        feedback: "Very clean step-by-step diagram showing recoloring versus rotational triggers.",
        gradedAt: "2026-10-25"
      }
    ]
  },
  {
    id: "asg-2",
    classId: "cls-1",
    classCode: "CS-301",
    className: "Data Structures & Algorithms (Sec A)",
    title: "Assignment 3: Graph Traversal & Dijkstra Shortest Path",
    category: "Lab Practical",
    totalMarks: 40,
    dueDate: "2026-10-12",
    dueTime: "23:59",
    description: "Benchmark Dijkstra's algorithm with min-heap priority queues against Bellman-Ford on sparse vs dense synthetic graphs. Plot time complexity scaling.",
    allowedFormats: ["PDF", "ZIP", "IPYNB"],
    totalSubmissions: 12,
    pendingGrading: 0,
    gradedCount: 12,
    status: "Completed",
    createdDate: "2026-09-28",
    submissions: [
      {
        id: "sub-201",
        studentName: "Alex Sharma",
        rollNo: "2024-CSE-042",
        submittedAt: "2026-10-11 20:15",
        status: "Graded",
        fileName: "AlexSharma_Dijkstra_Lab3.ipynb",
        fileSize: "3.1 MB",
        marks: 38,
        feedback: "Clean Jupyter notebook with beautiful matplotlib comparisons.",
        gradedAt: "2026-10-13"
      },
      {
        id: "sub-202",
        studentName: "Ananya Verma",
        rollNo: "2024-CSE-001",
        submittedAt: "2026-10-10 16:00",
        status: "Graded",
        fileName: "AnanyaVerma_GraphBenchmark.pdf",
        fileSize: "5.0 MB",
        marks: 40,
        feedback: "Flawless asymptotic empirical analysis.",
        gradedAt: "2026-10-13"
      }
    ]
  },
  {
    id: "asg-3",
    classId: "cls-3",
    classCode: "CS-303",
    className: "Operating Systems Principles (Sec A)",
    title: "Assignment 2: Multi-threaded CPU Scheduler Simulation",
    category: "Programming Task",
    totalMarks: 60,
    dueDate: "2026-10-30",
    dueTime: "18:00",
    description: "Implement Round-Robin, Shortest Job First, and Multi-Level Feedback Queue schedulers with POSIX mutexes and condition variables.",
    allowedFormats: ["C", "CPP", "TAR.GZ"],
    totalSubmissions: 8,
    pendingGrading: 4,
    gradedCount: 4,
    status: "Active",
    createdDate: "2026-10-15",
    submissions: [
      {
        id: "sub-301",
        studentName: "Rahul Nambiar",
        rollNo: "2024-CSE-103",
        submittedAt: "2026-10-25 10:12",
        status: "Graded",
        fileName: "RahulN_OS_Scheduler.tar.gz",
        fileSize: "1.2 MB",
        marks: 56,
        feedback: "Great POSIX thread locking hygiene.",
        gradedAt: "2026-10-26"
      },
      {
        id: "sub-302",
        studentName: "Kritika Saini",
        rollNo: "2024-CSE-118",
        submittedAt: "2026-10-26 19:40",
        status: "Pending Review",
        fileName: "KritikaS_SchedulerSim.c",
        fileSize: "450 KB",
        marks: null,
        feedback: ""
      }
    ]
  },
  {
    id: "asg-4",
    classId: "cls-4",
    classCode: "CS-402",
    className: "Advanced Algorithms (Sec C)",
    title: "Problem Set 3: Approximation Algorithms for Metric TSP",
    category: "Theoretical Problem Set",
    totalMarks: 50,
    dueDate: "2026-11-05",
    dueTime: "23:59",
    description: "Prove the 2-approximation factor using Minimum Spanning Tree preorder walks, and formalize Christofides 3/2-approximation algorithm.",
    allowedFormats: ["PDF", "TEX"],
    totalSubmissions: 6,
    pendingGrading: 1,
    gradedCount: 5,
    status: "Active",
    createdDate: "2026-10-20",
    submissions: [
      {
        id: "sub-401",
        studentName: "Nikhil Bansal",
        rollNo: "2022-CSE-012",
        submittedAt: "2026-10-24 11:20",
        status: "Graded",
        fileName: "NikhilB_MetricTSP_Proof.pdf",
        fileSize: "1.6 MB",
        marks: 48,
        feedback: "Rigorous proof of triangle inequality bounds.",
        gradedAt: "2026-10-25"
      }
    ]
  }
];

export const initialStudyMaterials = [
  {
    id: "mat-1",
    classId: "cls-1",
    classCode: "CS-301",
    title: "Lecture Deck: Red-Black Trees, Rotations & Proofs",
    unit: "Unit 3",
    type: "Lecture Slides",
    format: "PDF",
    size: "6.4 MB",
    uploadDate: "Oct 15, 2026",
    downloads: 142,
    approvedBy: "Dr. Evelyn Reed (Lead Faculty)",
    description: "Official institutional lecture slides with step-by-step coloring rules, null-leaf conventions, and 4 rotation derivations."
  },
  {
    id: "mat-2",
    classId: "cls-1",
    classCode: "CS-301",
    title: "Standard Algorithm Complexity Sheet & Master Theorem",
    unit: "Unit 1 & 2",
    type: "Formula Sheet",
    format: "PDF",
    size: "1.2 MB",
    uploadDate: "Sep 20, 2026",
    downloads: 210,
    approvedBy: "Dr. Evelyn Reed (Lead Faculty)",
    description: "Verified formula reference for recurrence relations, Master Theorem cases, and amortized complexity bounds."
  },
  {
    id: "mat-3",
    classId: "cls-3",
    classCode: "CS-303",
    title: "Lab Manual: POSIX Threads & Semaphore Concurrency",
    unit: "Unit 2",
    type: "Lab Guide",
    format: "PDF",
    size: "3.8 MB",
    uploadDate: "Oct 04, 2026",
    downloads: 98,
    approvedBy: "Dr. Evelyn Reed (Lead Faculty)",
    description: "Lab exercise walkthrough for Producer-Consumer problem and Dining Philosophers deadlock resolution."
  },
  {
    id: "mat-4",
    classId: "cls-4",
    classCode: "CS-402",
    title: "NP-Completeness Reductions & Approximation Algorithms",
    unit: "Unit 4",
    type: "Handwritten Notes",
    format: "PDF",
    size: "5.1 MB",
    uploadDate: "Oct 08, 2026",
    downloads: 67,
    approvedBy: "Dr. Evelyn Reed (Lead Faculty)",
    description: "Verified faculty lecture annotations on Cook-Levin theorem, 3-SAT reduction to Vertex Cover, and 2-approximation for Metric TSP."
  }
];

export const earlyWarningAlertsData = [
  {
    id: "al-1",
    type: "attendance",
    severity: "danger",
    title: "Attendance Cutoff Deficit (Below 75%)",
    studentName: "Rohan Gupta",
    rollNo: "2024-CSE-018",
    classCode: "CS-301 (Sec A)",
    stat: "65.6% Attendance",
    detail: "Student has missed 11 of 32 conducted lectures. Needs 5 consecutive attended sessions to cross mandatory 75% cutoff.",
    actionLabel: "Send Cutoff Notice",
    status: "Pending Action"
  },
  {
    id: "al-2",
    type: "attendance",
    severity: "warning",
    title: "Borderline Attendance Warning",
    studentName: "Tanya Kapoor",
    rollNo: "2024-CSE-064",
    classCode: "CS-301 (Sec A)",
    stat: "68.8% Attendance",
    detail: "Student missed last 2 consecutive classes. Current rate is below university examination condonation cutoff.",
    actionLabel: "Send Cutoff Notice",
    status: "Pending Action"
  },
  {
    id: "al-3",
    type: "assignment",
    severity: "warning",
    title: "Overdue Assignment Submission",
    studentName: "Rohan Gupta",
    rollNo: "2024-CSE-018",
    classCode: "CS-301 (Sec A)",
    stat: "Assignment 4 Overdue",
    detail: "No code or write-up submitted for Red-Black Tree problem set. Automated reminder window active.",
    actionLabel: "Send Reminder Ping",
    status: "Pending"
  },
  {
    id: "al-4",
    type: "concern",
    severity: "info",
    title: "Academic Grievance Escalated",
    studentName: "Alex Sharma",
    rollNo: "2024-CSE-042",
    classCode: "CS-301 (Sec A)",
    stat: "Ticket #GR-882",
    detail: "Student filed a request for lab equipment recalibration and attendance condonation for hackathon participation.",
    actionLabel: "Review in Grievances",
    status: "Under Review"
  }
];

export const facultyAlerts = earlyWarningAlertsData;

export const todayFacultySchedule = [
  {
    id: "sch-1",
    time: "09:30 AM – 11:00 AM",
    subject: "Data Structures & Algorithms",
    code: "CS-301",
    section: "Section A",
    room: "Lecture Hall 302",
    topic: "Red-Black Tree Rotations & Deletion Cases",
    attendanceStatus: "Pending Marking",
    totalStudents: 62
  },
  {
    id: "sch-2",
    time: "11:15 AM – 12:45 PM",
    subject: "Data Structures & Algorithms",
    code: "CS-301",
    section: "Section B",
    room: "Lecture Hall 204",
    topic: "Binary Search Trees vs AVL Tree Balancing",
    attendanceStatus: "Marked (88% Present)",
    totalStudents: 58
  },
  {
    id: "sch-3",
    time: "02:00 PM – 04:00 PM",
    subject: "Faculty Consultation & Office Hours",
    code: "OFFICE",
    section: "All Sections",
    room: "Block B, Room 405",
    topic: "Student Doubts, Mentorship & Grade Inquiries",
    attendanceStatus: "Walk-in Open",
    totalStudents: 12
  }
];

// ============================================================================
// LEGACY FACULTY & STUDENT COMPATIBILITY EXPORTS (PRESERVED FROM PRIMARY CODEBASE)
// ============================================================================
import { loadFromStorage, saveToStorage } from "../utils/storage";

export const studentsList = [
  { id: 1, name: "Aditi", rollNo: "CSE-01" },
  { id: 2, name: "Rahul", rollNo: "CSE-02" },
  { id: 3, name: "Priya", rollNo: "CSE-03" }
];

export const subjectsList = [
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Operating Systems Principles"
];

export const legacyClassesList = ["CSE 4A", "CSE 4B"];

export const initialMarks = [
  { id: 1, student: "Aditi", subject: "Data Structures & Algorithms", marks: 78, attendance: 85 },
  { id: 2, student: "Rahul", subject: "Data Structures & Algorithms", marks: 34, attendance: 65 },
  { id: 3, student: "Priya", subject: "Data Structures & Algorithms", marks: 88, attendance: 92 },
  { id: 4, student: "Aditi", subject: "Database Management Systems", marks: 82, attendance: 88 },
  { id: 5, student: "Rahul", subject: "Database Management Systems", marks: 38, attendance: 70 },
  { id: 6, student: "Priya", subject: "Database Management Systems", marks: 91, attendance: 95 }
];

export const initialStudentAttendance = [
  { id: 1, name: "Aditi", attended: 17, total: 20 },
  { id: 2, name: "Rahul", attended: 13, total: 20 },
  { id: 3, name: "Priya", attended: 19, total: 20 }
];

export const initialHistory = [
  { id: 1, date: "2026-10-21", subject: "Data Structures & Algorithms", student: "Aditi", status: "Present" },
  { id: 2, date: "2026-10-21", subject: "Data Structures & Algorithms", student: "Rahul", status: "Absent" },
  { id: 3, date: "2026-10-21", subject: "Data Structures & Algorithms", student: "Priya", status: "Present" }
];

export function getStoredAttendanceHistory() {
  return loadFromStorage("teacherAttendanceHistory", initialHistory);
}

export function saveTeacherAttendance(subject, className, date, statusMap) {
  const currentHistory = loadFromStorage("teacherAttendanceHistory", initialHistory);
  const newRecords = studentsList.map((st) => ({
    id: Date.now() + Math.random(),
    date: date,
    subject: subject,
    student: st.name,
    status: statusMap[st.id] || "Present"
  }));
  const updatedHistory = [...newRecords, ...currentHistory];
  saveToStorage("teacherAttendanceHistory", updatedHistory);

  const currentSummary = loadFromStorage("teacherClassSummary", initialStudentAttendance);
  const updatedSummary = currentSummary.map((st) => {
    const isPresent = statusMap[st.id] === "Present";
    return {
      ...st,
      attended: isPresent ? st.attended + 1 : st.attended,
      total: st.total + 1
    };
  });
  saveToStorage("teacherClassSummary", updatedSummary);

  const studentSubjects = loadFromStorage("attendanceSubjects", null);
  if (studentSubjects && Array.isArray(studentSubjects)) {
    const isPresent = statusMap[1] === "Present";
    const updatedStudentSubjects = studentSubjects.map((sub) => {
      if (sub.name.toLowerCase().includes(subject.toLowerCase().slice(0, 4))) {
        return {
          ...sub,
          attended: isPresent ? (sub.attended || 0) + 1 : (sub.attended || 0),
          total: (sub.total || 0) + 1
        };
      }
      return sub;
    });
    saveToStorage("attendanceSubjects", updatedStudentSubjects);
  }

  try {
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Storage event error:", err);
  }

  return { updatedHistory, updatedSummary };
}
