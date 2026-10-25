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
        label: "Page 1 (First 3)",
        title: "Unit 1: Introduction to Database Systems",
        content: "• Database Management System (DBMS) is software used to store, retrieve, and manage data efficiently.\n• Three-Schema Architecture:\n  1. Physical Level (Internal Schema): How data is physically stored in hardware.\n  2. Logical Level (Conceptual Schema): What data is stored and relationships among data.\n  3. View Level (External Schema): User-specific views of data subsets.\n• Data Independence: Logical vs Physical schema separation.",
        highlight: "Key Viva Question: Explain 3-tier DBMS architecture and physical data independence."
      },
      {
        pageNumber: 2,
        docPage: 2,
        label: "Page 2 (First 3)",
        title: "Unit 1: Entity-Relationship (ER) Modeling",
        content: "• Entity: Real-world object identifiable by attributes (e.g., Student, Course).\n• Entity Set: Collection of entities of the same type.\n• Key Types: Primary Key (No NULLs), Candidate Key, Foreign Key (Referential Integrity).\n• Cardinality Constraints: 1:1, 1:N, N:1, M:N.",
        highlight: "ER-to-Relational Mapping Rule: M:N relationship becomes a separate table with foreign keys."
      },
      {
        pageNumber: 3,
        docPage: 3,
        label: "Page 3 (First 3)",
        title: "Unit 2: Relational Algebra & Calculus",
        content: "• Fundamental Operations: Selection (σ), Projection (π), Union (∪), Set Difference (-), Cartesian Product (×), Rename (ρ).\n• Join Operations: Theta Join, Natural Join (⋈), Outer Joins (Left, Right, Full).\n• Division Operation (÷): Queries involving 'for all' conditions (e.g., students who took all courses).",
        highlight: "Exam Tip: Natural Join implicitly equates attributes having the exact same name across relations."
      },
      {
        pageNumber: 4,
        docPage: 20,
        label: "Page 20 (Last 3)",
        title: "Unit 5: Normalization & BCNF Decomposition",
        content: "• 1NF: Atomic attribute values only, no repeating groups.\n• 2NF: In 1NF and no partial dependency (non-prime attributes fully dependent on candidate keys).\n• 3NF: In 2NF and no transitive dependency (in X -> A, X is superkey or A is prime).\n• BCNF: For every functional dependency X -> A, X MUST be a superkey.",
        highlight: "Standard Proof: Every relation in BCNF is guaranteed in 3NF, but not vice-versa."
      },
      {
        pageNumber: 5,
        docPage: 21,
        label: "Page 21 (Last 3)",
        title: "Unit 5: Concurrency Control & Two-Phase Locking (2PL)",
        content: "• Conflict Serializability: Testing precedence graph for cycles.\n• Two-Phase Locking (2PL):\n  1. Growing Phase: Locks acquired, none released.\n  2. Shrinking Phase: Locks released, none acquired.\n• Strict 2PL: All exclusive locks held until commit to prevent cascading rollbacks.",
        highlight: "Viva Tip: Rigorous 2PL prevents deadlocks? No! 2PL guarantees serializability, but deadlocks can still occur."
      },
      {
        pageNumber: 6,
        docPage: 22,
        label: "Page 22 (Last 3)",
        title: "Unit 5: SQL Cheatsheet & High-Yield Queries",
        content: "• Nth Highest Salary:\n  SELECT DISTINCT salary FROM Employee e1 WHERE N-1 = (SELECT COUNT(DISTINCT salary) FROM Employee e2 WHERE e2.salary > e1.salary);\n• CTE with ROW_NUMBER() window function:\n  WITH Ranked AS (SELECT *, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM Employee) SELECT * FROM Ranked WHERE rnk = 2;",
        highlight: "Finals Gold: Understand DENSE_RANK() vs RANK() when handling tie values."
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
        label: "Page 1 (First 3)",
        title: "Unit 1: Asymptotic Notation & Array Operations",
        content: "• Big-O (Worst Case), Big-Omega (Best Case), Big-Theta (Average / Tight Bound).\n• Time Complexity Hierarchy: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n).\n• Dynamic Arrays (ArrayList in Java): Doubling strategy amortized insertion time = O(1).",
        highlight: "Master Theorem: T(n) = aT(n/b) + f(n)."
      },
      {
        pageNumber: 2,
        docPage: 2,
        label: "Page 2 (First 3)",
        title: "Unit 1: Linked Lists & Two-Pointer Patterns",
        content: "• Singly vs Doubly vs Circular Linked Lists.\n• Fast & Slow Pointers (Floyd's Cycle Finding):\n  - Slow moves 1 step, Fast moves 2 steps.\n  - Meeting point confirms cycle presence.\n  - Reset slow to head, move both 1 step to locate cycle entry point.",
        highlight: "Classic Question: Detect and remove loop in a singly linked list in O(n) time and O(1) space."
      },
      {
        pageNumber: 3,
        docPage: 3,
        label: "Page 3 (First 3)",
        title: "Unit 2: Stacks, Queues & Monotonic Sequences",
        content: "• Stack: LIFO (Infix to Postfix conversion, balanced parentheses, Next Greater Element).\n• Queue: FIFO (Circular Queue modulo arithmetic, PriorityQueue using min/max heaps).\n• Monotonic Stack: Maintaining ascending or descending order for O(n) histogram queries.",
        highlight: "Interview Tip: Largest Rectangle in Histogram solved in O(n) using a monotonic stack."
      },
      {
        pageNumber: 4,
        docPage: 33,
        label: "Page 33 (Last 3)",
        title: "Unit 5: Graph Algorithms (BFS, DFS & Shortest Paths)",
        content: "• Graph Representations: Adjacency Matrix O(V^2) vs Adjacency List O(V + E).\n• BFS: Queue-based level-order traversal, shortest path in unweighted graphs.\n• DFS: Recursive backtracking, topological sorting via visited + stack.\n• Dijkstra's: Greedy single-source shortest path using priority queue O((V + E) log V).",
        highlight: "Critical Rule: Dijkstra fails on negative weight edges. Use Bellman-Ford instead."
      },
      {
        pageNumber: 5,
        docPage: 34,
        label: "Page 34 (Last 3)",
        title: "Unit 5: Dynamic Programming State Formulations",
        content: "• 0/1 Knapsack: dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])\n• Longest Common Subsequence (LCS):\n  - If match: 1 + dp[i-1][j-1]\n  - Else: max(dp[i-1][j], dp[i][j-1])\n• Coin Change: Minimum coins to reach target amount.",
        highlight: "Tip: Identify overlapping subproblems and optimal substructure before writing memoization."
      },
      {
        pageNumber: 6,
        docPage: 35,
        label: "Page 35 (Last 3)",
        title: "Unit 5: Quick Revision Formulas & Complexities",
        content: "• QuickSort: O(N log N) average, O(N^2) worst case.\n• MergeSort: O(N log N) guaranteed, requires O(N) auxiliary memory.\n• HeapSort: In-place O(N log N) using binary max-heap.\n• Binary Search: O(log N) on sorted array.",
        highlight: "Exam Summary: Stable sorting algorithms preserve relative order of equal keys (MergeSort, InsertionSort)."
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
        label: "Page 1 (First 3)",
        title: "Unit 1: Process vs Thread & PCB Structure",
        content: "• Process: Program in execution with own address space.\n• Thread: Lightweight unit of CPU execution sharing code/data segment with peer threads.\n• Context Switching: Saving CPU register state to PCB and loading another process PCB.",
        highlight: "Key Concept: User-level threads vs Kernel-level threads mapping models."
      },
      {
        pageNumber: 2,
        docPage: 2,
        label: "Page 2 (First 3)",
        title: "Unit 1: CPU Scheduling Algorithms & Gantt Charts",
        content: "• FCFS (First Come First Served): Convoy effect with long CPU bursts.\n• SJF (Shortest Job First): Optimal average waiting time (provably minimal).\n• SRTF (Shortest Remaining Time First): Preemptive variant of SJF.\n• Round Robin: Time quantum q trade-off between turnaround and responsiveness.",
        highlight: "Formula: Turnaround Time = Completion Time - Arrival Time; Waiting Time = Turnaround - Burst."
      },
      {
        pageNumber: 3,
        docPage: 3,
        label: "Page 3 (First 3)",
        title: "Unit 2: Inter-Process Communication & Critical Section",
        content: "• Critical Section Problem: Mutual Exclusion, Progress, Bounded Waiting.\n• Peterson's Solution: 2-process software solution using turn variable and flag array.\n• Semaphores: Counting vs Binary (Mutex). wait() (P) decrements, signal() (V) increments.",
        highlight: "Exam Warning: Semaphores can lead to priority inversion unless priority inheritance is used."
      },
      {
        pageNumber: 4,
        docPage: 26,
        label: "Page 26 (Last 3)",
        title: "Unit 4: Deadlocks & Banker's Safety Algorithm",
        content: "• 4 Necessary Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.\n• Deadlock Avoidance: Banker's Algorithm with Allocation, Max, Available, Need matrices.\n• Need Matrix = Max - Allocation.\n• Safety Check: Finding a safe sequence where Work >= Need.",
        highlight: "Key Viva Point: Safe state guarantees deadlock-free execution, but unsafe does NOT always mean deadlocked."
      },
      {
        pageNumber: 5,
        docPage: 27,
        label: "Page 27 (Last 3)",
        title: "Unit 5: Virtual Memory & Page Replacement",
        content: "• Paging: Fixed-size frames in physical memory, logical pages in virtual address space.\n• TLB (Translation Lookaside Buffer): Hardware cache for fast page table address translation.\n• Page Replacement: FIFO (Belady's Anomaly), LRU (Least Recently Used), Optimal (Belady's Min).",
        highlight: "Belady's Anomaly: In FIFO, increasing frame count can paradoxically increase page faults."
      },
      {
        pageNumber: 6,
        docPage: 28,
        label: "Page 28 (Last 3)",
        title: "Unit 5: Unix File System & Inode Layout",
        content: "• Inode contains file metadata, size, permissions, and direct/indirect disk block pointers.\n• Direct pointers (12) + Single Indirect + Double Indirect + Triple Indirect pointers.\n• Maximum file size calculation based on block size.",
        highlight: "Exam Summary: Hard link shares inode number; Soft (symbolic) link has its own inode pointing to path."
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
        label: "Page 1 (First 3)",
        title: "Unit 1: OSI 7-Layer vs TCP/IP Architecture",
        content: "• Application: HTTP, DNS, SMTP, FTP.\n• Transport: TCP (Reliable), UDP (Fast).\n• Network: IP, ICMP, Routing.\n• Data Link: Framing, MAC addressing, CRC error detection.\n• Physical: Bit transmission over physical medium.",
        highlight: "Mnemonic: Please Do Not Throw Sausage Pizza Away."
      },
      {
        pageNumber: 2,
        docPage: 2,
        label: "Page 2 (First 3)",
        title: "Unit 2: Transport Layer & TCP 3-Way Handshake",
        content: "• TCP Connection Setup:\n  1. Client -> Server: SYN (seq = x)\n  2. Server -> Client: SYN-ACK (seq = y, ack = x + 1)\n  3. Client -> Server: ACK (seq = x + 1, ack = y + 1)\n• TCP Teardown: 4-Way FIN-ACK handshake.",
        highlight: "Interview Question: Why 3-way handshake? Prevents duplicate historical connection requests from confusing server."
      },
      {
        pageNumber: 3,
        docPage: 3,
        label: "Page 3 (First 3)",
        title: "Unit 2: Sliding Window Protocols & Flow Control",
        content: "• Stop-and-Wait: Efficiency η = 1 / (1 + 2a), where a = Tprop / Ttrans.\n• Go-Back-N (GBN): Sender window size N, Receiver window size 1. Cumulative acknowledgements.\n• Selective Repeat (SR): Sender window = Receiver window = 2^(k-1). Independent frame buffers.",
        highlight: "Exam Tip: In GBN, discarded out-of-order frames force retransmission of entire window."
      },
      {
        pageNumber: 4,
        docPage: 28,
        label: "Page 28 (Last 3)",
        title: "Unit 4: IPv4 Addressing & CIDR Subnetting Tricks",
        content: "• IPv4: 32 bits divided into Network ID and Host ID.\n• Classless Inter-Domain Routing (CIDR) notation: /24 means 24 network bits, 8 host bits.\n• Usable hosts formula = 2^(32 - prefix) - 2 (subtract Network address & Broadcast address).\n• Subnet mask calculation table.",
        highlight: "Shortcut: /27 has 32 - 27 = 5 host bits => 2^5 - 2 = 30 usable host IP addresses."
      },
      {
        pageNumber: 5,
        docPage: 29,
        label: "Page 29 (Last 3)",
        title: "Unit 5: Routing Protocols (Distance Vector & Link State)",
        content: "• Distance Vector (Bellman-Ford): RIP (Routing Information Protocol), Count-to-Infinity problem, split horizon fix.\n• Link State (Dijkstra): OSPF (Open Shortest Path First), flooding link-state advertisements (LSAs).\n• Border Gateway Protocol (BGP): Path-vector protocol between Autonomous Systems (AS).",
        highlight: "Viva Point: OSPF converges faster than RIP and avoids count-to-infinity."
      },
      {
        pageNumber: 6,
        docPage: 30,
        label: "Page 30 (Last 3)",
        title: "Unit 5: Application Protocols (DNS & HTTP Versions)",
        content: "• DNS: Port 53 UDP, hierarchical root -> TLD (.com, .edu) -> authoritative nameservers.\n• HTTP/1.1: Persistent TCP connections with head-of-line blocking.\n• HTTP/2: Binary framing, multiplexing multiple streams over single connection.\n• HTTP/3: QUIC protocol over UDP eliminating TCP HOL blocking.",
        highlight: "Exam Summary: HTTPS uses TLS on port 443 with asymmetric public key exchange and symmetric AES session encryption."
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
      { id: "s-1", name: "Aanya Sharma", isHost: true, online: true, page: 7 },
      { id: "s-2", name: "Rohan Gupta", isHost: false, online: true, page: 7 },
      { id: "s-3", name: "Meera Nair", isHost: false, online: true, page: 8 },
      { id: "s-4", name: "Vikram Sen", isHost: false, online: false, page: 6 }
    ],
    messages: [
      {
        id: "m-1",
        sender: "Aanya Sharma",
        text: "Let's review the Lossless Join decomposition theorem on Page 7.",
        time: "10:14 AM"
      },
      {
        id: "m-2",
        sender: "Rohan Gupta",
        text: "Does R1 ∩ R2 -> R1 or R2 condition apply here?",
        time: "10:15 AM"
      }
    ]
  },
  {
    id: "room-403",
    code: "#403",
    title: "DSA Graph Algorithms: Dijkstra & MST",
    topic: "Kruskal vs Prim Algorithms & Disjoint Set Union",
    subject: "Data Structures",
    noteId: 2,
    host: "Rahul Verma",
    hostCollege: "NIT Trichy",
    totalPages: 35,
    currentPage: 14,
    passcode: "dsa2026",
    isPrivate: true,
    activeStudents: [
      { id: "s-5", name: "Rahul Verma", isHost: true, online: true, page: 14 },
      { id: "s-6", name: "Sneha Roy", isHost: false, online: true, page: 14 }
    ],
    messages: [
      {
        id: "m-3",
        sender: "Rahul Verma",
        text: "Kruskal is optimal for sparse graphs O(E log V).",
        time: "11:02 AM"
      }
    ]
  }
];