/**
 * Sample Notes Marketplace Data for UniSphere
 * Includes subject categories, curated note cards, and 6-page preview content
 */

export const noteSubjects = [
  { id: "all", name: "All Subjects", count: 18 },
  { id: "dsa", name: "Data Structures", code: "CS-301", count: 6 },
  { id: "dbms", name: "DBMS & SQL", code: "CS-302", count: 4 },
  { id: "os", name: "Operating Systems", code: "CS-303", count: 3 },
  { id: "cn", name: "Computer Networks", code: "CS-304", count: 3 },
  { id: "web", name: "Full-Stack React", code: "CS-305", count: 2 }
];

export const initialNotesList = [
  {
    id: "note-101",
    title: "Complete DSA Hand-Drawn Notes: Trees, Graphs & DP",
    subject: "Data Structures",
    subjectId: "dsa",
    code: "CS-301",
    description: "In-depth visual trees, AVL balancing formulas, graph traversals (BFS/DFS), and 20 dynamic programming patterns with clean step diagrams.",
    price: 0, // Free
    seller: "Kavya Deshmukh",
    semester: "3rd Semester",
    rating: 4.9,
    reviewsCount: 38,
    downloads: 240,
    totalPages: 36,
    previewPages: [
      { page: 1, label: "Page 1 (First 3)", title: "Unit 1: Binary Tree Fundamentals & Properties", content: "• Definition: A non-linear hierarchical data structure consisting of nodes connected by edges.\n• Full vs Complete Binary Trees: Every level filled except possibly the last.\n• Maximum nodes at level i: 2^i.\n• Maximum nodes for height h: 2^(h+1) - 1." },
      { page: 2, label: "Page 2 (First 3)", title: "Unit 1: Tree Traversals & Recursion Traces", content: "• In-order (Left, Root, Right): Produces sorted sequence in Binary Search Trees.\n• Pre-order (Root, Left, Right): Used to create copy of tree or prefix expressions.\n• Post-order (Left, Right, Root): Used in garbage collection & postfix evaluation." },
      { page: 3, label: "Page 3 (First 3)", title: "Unit 2: AVL Trees & Self-Balancing Rotations", content: "• Balance Factor BF = height(Left) - height(Right) ∈ {-1, 0, +1}.\n• LL Rotation: Single right rotation around unbalanced ancestor.\n• RR Rotation: Single left rotation.\n• LR & RL Double Rotations: Inner child balancing." },
      { page: 34, label: "Page 34 (Last 3)", title: "Unit 5: Dynamic Programming State Transitions", content: "• Optimal Substructure: Solution to problem contains solutions to subproblems.\n• Overlapping Subproblems: Memoization (top-down) vs Tabulation (bottom-up).\n• 0/1 Knapsack DP Table recurrence:\n  dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])" },
      { page: 35, label: "Page 35 (Last 3)", title: "Unit 5: Longest Common Subsequence (LCS)", content: "• If str1[i-1] == str2[j-1] => dp[i][j] = 1 + dp[i-1][j-1]\n• Else => dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n• Space Optimization: Only previous row required (O(N) space complexity)." },
      { page: 36, label: "Page 36 (Last 3)", title: "Exam Cheat Sheet: Time & Space Complexities", content: "• Binary Search: O(log N) time, O(1) space\n• Merge Sort: O(N log N) time, O(N) space\n• Quick Sort: O(N log N) avg, O(N^2) worst case\n• Dijkstra's Algorithm: O((V + E) log V) with min-heap." }
    ]
  },
  {
    id: "note-102",
    title: "Relational Database Normalization & SQL Cheatsheet",
    subject: "DBMS & SQL",
    subjectId: "dbms",
    code: "CS-302",
    description: "Step-by-step 1NF, 2NF, 3NF, BCNF decomposition rules, functional dependencies, indexing trade-offs, and ACID transaction isolation guarantees.",
    price: 49,
    seller: "Rahul Verma",
    semester: "4th Semester",
    rating: 4.8,
    reviewsCount: 29,
    downloads: 185,
    totalPages: 24,
    previewPages: [
      { page: 1, label: "Page 1 (First 3)", title: "1NF & Functional Dependency Fundamentals", content: "• First Normal Form: Atomic values only, no repeating groups or arrays.\n• Functional Dependency (X -> Y): X uniquely determines Y.\n• Trivial vs Non-Trivial Dependencies." },
      { page: 2, label: "Page 2 (First 3)", title: "2NF & Partial Dependency Elimination", content: "• Second Normal Form: In 1NF and no non-prime attribute is partially dependent on any candidate key.\n• Example: (StudentID, CourseID) -> CourseFee violates 2NF because CourseID -> CourseFee." },
      { page: 3, label: "Page 3 (First 3)", title: "3NF & Transitive Dependency Decomposition", content: "• Third Normal Form: In 2NF and no non-prime attribute transitively depends on primary key.\n• Formal Rule: In X -> A, either X is a superkey or A is a prime attribute." },
      { page: 22, label: "Page 22 (Last 3)", title: "Indexing & B+ Tree Storage Structures", content: "• Clustered vs Non-Clustered Indexes: Data record order vs Pointer list.\n• B+ Tree Leaf Nodes linked for sequential scanning." },
      { page: 23, label: "Page 23 (Last 3)", title: "ACID Guarantees & Transaction Schedules", content: "• Atomicity: All or nothing.\n• Consistency: Database invariants preserved.\n• Isolation: Serializable schedules avoid dirty reads.\n• Durability: WAL logging ensures commit permanence." },
      { page: 24, label: "Page 24 (Last 3)", title: "Finals Revision: Top 10 SQL Interview Queries", content: "• Finding Nth highest salary using DENSE_RANK()\n• Correlated subqueries vs Common Table Expressions (CTEs)\n• Self Joins for organizational hierarchy." }
    ]
  },
  {
    id: "note-103",
    title: "Operating Systems: Concurrency, Deadlocks & Memory",
    subject: "Operating Systems",
    subjectId: "os",
    code: "CS-303",
    description: "Process synchronization, semaphores, Peterson's algorithm, Banker's avoidance algorithm, virtual memory paging, and TLB address translation.",
    price: 39,
    seller: "Ananya Iyer",
    semester: "4th Semester",
    rating: 4.7,
    reviewsCount: 22,
    downloads: 140,
    totalPages: 28,
    previewPages: [
      { page: 1, label: "Page 1 (First 3)", title: "Process Life Cycle & Context Switching", content: "• Process States: New, Ready, Running, Waiting, Terminated.\n• Process Control Block (PCB): Registers, PC, State, Memory Limits.\n• CPU Scheduling Criteria: Turnaround Time, Waiting Time, Response Time." },
      { page: 2, label: "Page 2 (First 3)", title: "Process Synchronization & Critical Section", content: "• Three Requirements: Mutual Exclusion, Progress, Bounded Waiting.\n• Peterson's Algorithm for two processes using turn and flag arrays." },
      { page: 3, label: "Page 3 (First 3)", title: "Semaphores & Classical IPC Problems", content: "• Counting Semaphores vs Binary Semaphores (Mutex).\n• Producer-Consumer Problem using empty, full, and mutex semaphores.\n• Dining Philosophers deadlocks." },
      { page: 26, label: "Page 26 (Last 3)", title: "Deadlock Prevention & Banker's Algorithm", content: "• Four Coffman Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.\n• Safety Algorithm: Work and Finish vectors check safe sequence." },
      { page: 27, label: "Page 27 (Last 3)", title: "Virtual Memory & Paging Mechanisms", content: "• Page Table Base Register (PTBR) and TLB hits vs misses.\n• Page Fault Handling steps and OS trap overhead." },
      { page: 28, label: "Page 28 (Last 3)", title: "Page Replacement Algorithms Compared", content: "• FIFO (Belady's Anomaly), Optimal (Bélády), and LRU (Least Recently Used) approximation." }
    ]
  },
  {
    id: "note-104",
    title: "Modern React & Single Page Application Architecture",
    subject: "Full-Stack React",
    subjectId: "web",
    code: "CS-305",
    description: "Component composition, React Router v7 client navigation, Context API architecture, controlled forms with validation, and responsive pure CSS3.",
    price: 0,
    seller: "Vikram Mehta",
    semester: "3rd/4th Semester",
    rating: 5.0,
    reviewsCount: 46,
    downloads: 310,
    totalPages: 32,
    previewPages: [
      { page: 1, label: "Page 1 (First 3)", title: "React Fundamentals & JSX Transpilation", content: "• Declarative UI: React builds virtual DOM and reconciles changes efficiently.\n• JSX syntactic sugar transforms into React.createElement() calls." },
      { page: 2, label: "Page 2 (First 3)", title: "State vs Props & One-Way Data Binding", content: "• Props are immutable inputs passed from parent to child.\n• State represents mutable local data managed within component using useState()." },
      { page: 3, label: "Page 3 (First 3)", title: "React Router v7: Declarative Client Routing", content: "• BrowserRouter, Routes, Route, and Link components enable SPA transitions without page reloads.\n• Dynamic route parameters via useParams() and URL query params via useSearchParams()." },
      { page: 30, label: "Page 30 (Last 3)", title: "Context API for Application State", content: "• createContext, Provider, and useContext hook prevent prop drilling in multi-tier component trees.\n• Pairing Context with localStorage for persistent sessions." },
      { page: 31, label: "Page 31 (Last 3)", title: "Controlled Form Handling & Validation", content: "• React state acts as the single source of truth for form inputs.\n• Synchronous validation logic with instant error feedback to users." },
      { page: 32, label: "Page 32 (Last 3)", title: "Production Vite Bundling & Optimization", content: "• ES Modules during dev server and optimized Rollup chunks for production distribution." }
    ]
  }
];
