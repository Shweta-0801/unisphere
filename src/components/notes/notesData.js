export const INITIAL_NOTES = [
  {
    id: 1,
    title: "Complete DBMS Notes & SQL Cheatsheet",
    subject: "DBMS",
    topic: "SQL, Normalization (1NF-BCNF), Indexing & Transactions",
    description: "Crisp handwritten + typed revision notes covering ER diagrams, Relational Algebra, B+ Trees, Concurrency Control & ACID properties with 50+ solved semester questions.",
    seller: "Aanya Sharma",
    sellerCollege: "IIT Delhi '25",
    price: 49,
    rating: 4.8,
    reviews: 28,
    semester: "4th Sem",
    course: "B.Tech CSE",
    pages: 22,
    badge: "Bestseller",
    color: "#6B1E2D",
    verified: true,
    previewPages: [
      {
        pageNumber: 1,
        docPage: 1,
        title: "Unit 1: Introduction to Database Systems",
        content: "• Database Management System (DBMS) is software used to store, retrieve, and manage data efficiently.\n• Three-Schema Architecture:\n  1. Physical Level (Internal Schema): How data is physically stored in hardware.\n  2. Logical Level (Conceptual Schema): What data is stored and relationships among data.\n  3. View Level (External Schema): User-specific views of data subsets.\n• Data Independence: Logical vs Physical schema separation.",
        highlight: "Key Viva Question: Explain 3-tier DBMS architecture and physical data independence."
      },
      {
        pageNumber: 2,
        docPage: 2,
        title: "Unit 1: Entity-Relationship (ER) Modeling",
        content: "• Entity: Real-world object identifiable by attributes (e.g., Student, Course).\n• Entity Set: Collection of entities of the same type.\n• Key Types: Primary Key (No NULLs), Candidate Key, Foreign Key (Referential Integrity).\n• Cardinality Constraints: 1:1, 1:N, N:1, M:N.",
        highlight: "ER-to-Relational Mapping Rule: M:N relationship becomes a separate table with foreign keys."
      },
      {
        pageNumber: 3,
        docPage: 7,
        title: "Unit 3: Normalization & Functional Dependencies",
        content: "• 1NF: Atomic values only, no repeated groups.\n• 2NF: 1NF + No partial dependency (every non-prime attribute fully functionally dependent on candidate key).\n• 3NF: 2NF + No transitive dependency (for X -> Y, either X is Superkey OR Y is Prime Attribute).\n• BCNF (Boyce-Codd): For every non-trivial functional dependency X -> Y, X MUST be a Superkey.",
        highlight: "Exam Tip: Every BCNF relation is in 3NF, but not every 3NF relation is in BCNF."
      }
    ]
  },
  {
    id: 2,
    title: "Data Structures & Algorithms in Java",
    subject: "Data Structures",
    topic: "Trees, Graphs, DP, Sorting & Complexity Analysis",
    description: "Complete DSA notes with clean Java code snippets, visual memory diagrams for LinkedLists, recursion trees, and dynamic programming state transitions.",
    seller: "Rahul Verma",
    sellerCollege: "NIT Trichy '24",
    price: 69,
    rating: 4.9,
    reviews: 42,
    semester: "3rd Sem",
    course: "B.Tech CSE/IT",
    pages: 35,
    badge: "Trending",
    color: "#059669",
    verified: true,
    previewPages: [
      {
        pageNumber: 1,
        docPage: 1,
        title: "Unit 1: Asymptotic Notation & Array Operations",
        content: "• Big-O (Worst Case), Big-Omega (Best Case), Big-Theta (Average / Tight Bound).\n• Time Complexity Hierarchy: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n).\n• Dynamic Arrays (ArrayList in Java): Doubling strategy amortized insertion time = O(1).",
        highlight: "Master Theorem: T(n) = aT(n/b) + f(n)."
      }
    ]
  },
  {
    id: 3,
    title: "Operating Systems: Core Concepts & CPU Scheduling",
    subject: "Operating Systems",
    topic: "Processes, Threads, Semaphores, Deadlocks & Virtual Memory",
    description: "In-depth university exam prep covering Process Synchronization, Paging, TLB, Page Replacement (LRU/FIFO) and Inode structures.",
    seller: "Priya Patel",
    sellerCollege: "DTU Delhi '25",
    price: 39,
    rating: 4.7,
    reviews: 19,
    semester: "4th Sem",
    course: "B.Tech CSE",
    pages: 28,
    badge: "Popular",
    color: "#D97706",
    verified: true,
    previewPages: [
      {
        pageNumber: 1,
        docPage: 1,
        title: "Unit 1: Process vs Thread & PCB Structure",
        content: "• Process: Program in execution with own address space.\n• Thread: Lightweight unit of CPU execution sharing code/data segment with peer threads.\n• Context Switching: Saving CPU register state to PCB and loading another process PCB.",
        highlight: "Key Concept: User-level threads vs Kernel-level threads mapping models."
      }
    ]
  },
  {
    id: 4,
    title: "Computer Networks: Top-Down Approach Notes",
    subject: "Computer Networks",
    topic: "OSI & TCP/IP Layers, Subnetting (CIDR), Routing Protocols",
    description: "Illustrated guide to OSI 7 Layers, TCP 3-Way Handshake, Sliding Window Protocols, IPv4/IPv6 Subnetting tricks, and DNS.",
    seller: "Arjun Mehta",
    sellerCollege: "IIIT Hyderabad '24",
    price: 0,
    rating: 4.9,
    reviews: 55,
    semester: "5th Sem",
    course: "B.Tech CSE/ECE",
    pages: 30,
    badge: "Free Gem",
    color: "#2563EB",
    verified: true,
    previewPages: [
      {
        pageNumber: 1,
        docPage: 1,
        title: "Unit 1: OSI 7-Layer vs TCP/IP Architecture",
        content: "• Application: HTTP, DNS, SMTP, FTP.\n• Transport: TCP (Reliable), UDP (Fast).\n• Network: IP, ICMP, Routing.\n• Data Link: Framing, MAC addressing, CRC error detection.\n• Physical: Bit transmission over physical medium.",
        highlight: "Mnemonic: Please Do Not Throw Sausage Pizza Away."
      }
    ]
  }
];

export const SUBJECTS_LIST = [
  "All Subjects",
  "DBMS",
  "Data Structures",
  "Operating Systems",
  "Computer Networks",
  "AI & Machine Learning",
  "Compiler Design"
];

export const INITIAL_STUDY_ROOMS = [
  {
    id: "room-402",
    code: "#402",
    title: "DBMS Exam Sprint: Normalization & BCNF",
    topic: "BCNF vs 3NF Decomposition & Lossless Join Tests",
    subject: "DBMS",
    noteId: 1,
    host: "Aanya Sharma",
    hostCollege: "IIT Delhi",
    totalPages: 22,
    currentPage: 7,
    passcode: "",
    isPrivate: false,
    activeStudents: [
      { id: 1, name: "Aanya Sharma", page: 7, avatar: "AS", color: "#8B5CF6", action: "Highlighting BCNF proof", active: true },
      { id: 2, name: "Rahul Verma", page: 7, avatar: "RV", color: "#10B981", action: "Reading Section 3.2", active: true },
      { id: 3, name: "Alex Sharma (You)", page: 7, avatar: "YOU", color: "#6B1E2D", action: "Active in Study Room", active: true }
    ],
    pagesData: {
      6: {
        title: "Unit 3: Normalization & Functional Dependencies",
        heading: "Section 3.1 — Armstrong's Axioms",
        content: [
          "A functional dependency X -> Y specifies that the value of X uniquely determines Y.",
          "1. Reflexivity: If Y is subset of X, then X -> Y.",
          "2. Augmentation: If X -> Y, then XZ -> YZ.",
          "3. Transitivity: If X -> Y and Y -> Z, then X -> Z."
        ],
        diagram: "FD Graph: [StudentID] ──> [StudentName, Department, CGPA]",
        callout: "Aanya: 'Decomposition rule ONLY applies to RHS!'"
      },
      7: {
        title: "Unit 3: Normalization (3NF vs BCNF)",
        heading: "Section 3.2 — Boyce-Codd Normal Form (BCNF)",
        content: [
          "A relation R is in BCNF if for every non-trivial FD X -> Y, X is a Superkey of R.",
          "• Lossless Join Decomposition is ALWAYS achievable in BCNF.",
          "• Dependency Preservation is NOT always guaranteed in BCNF."
        ],
        diagram: "Decomposition: R(A, B, C) with A->B, B->C ==> R1(A, B), R2(B, C)",
        callout: "Rahul: 'Check if non-trivial FDs exist between overlapping candidate keys!'"
      }
    },
    chat: [
      { id: 1, sender: "Aanya Sharma", text: "Hey everyone! Let's conquer BCNF lossless join proof today 🔥", time: "10:14 AM", color: "#8B5CF6" },
      { id: 2, sender: "Rahul Verma", text: "Look at Section 3.2, that decomposition formula is asked every year!", time: "10:15 AM", color: "#10B981" }
    ]
  },
  {
    id: "room-108",
    code: "#108",
    title: "DSA Graph Algorithms Live Practice",
    topic: "Dijkstra with PriorityQueue & Cycle Detection",
    subject: "Data Structures",
    noteId: 2,
    host: "Rahul Verma",
    totalPages: 35,
    currentPage: 33,
    activeStudents: [
      { id: 1, name: "Rahul Verma", page: 33, avatar: "RV", color: "#10B981", action: "Explaining Min-Heap", active: true },
      { id: 2, name: "Alex Sharma (You)", page: 33, avatar: "YOU", color: "#6B1E2D", action: "Active in Room", active: true }
    ],
    pagesData: {
      33: {
        title: "Unit 5: Shortest Path Algorithms",
        heading: "Section 5.2 — Dijkstra's Algorithm",
        content: [
          "Finds shortest path from single source vertex in non-negative weighted graph.",
          "Greedy strategy with Min-Heap priority queue: O((V + E) log V)."
        ],
        diagram: "dist[u]=4 + wt(u,v)=3 < dist[v]=9 ==> dist[v] becomes 7",
        callout: "Rahul: 'Dijkstra fails on negative edge weights!'"
      }
    },
    chat: [
      { id: 1, sender: "Rahul Verma", text: "Welcome! We are working on Dijkstra queue implementation.", time: "10:30 AM", color: "#10B981" }
    ]
  }
];