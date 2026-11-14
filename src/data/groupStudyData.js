/**
 * Group Study Data for UniSphere
 * Includes active study circles, shared syllabus notes, and peer discussions.
 */

export const studyRoomsData = [
  {
    id: "room-cs301",
    code: "CS-301",
    subject: "Data Structures & Algorithms",
    category: "Data Structures",
    title: "Trees & Dynamic Programming Revision",
    description: "Collaborative review of AVL tree balancing rotations, binary search trees, and 0/1 knapsack recurrence formulas.",
    documentTitle: "Unit 3: AVL Balancing & Knapsack DP Patterns.pdf",
    schedule: "Daily 5:00 PM – 6:30 PM",
    status: "Active Circle",
    totalPages: 3,
    defaultPage: 1,
    host: "Rohan Patel",
    membersCount: 4,
    isJoined: false,
    activeStudents: [
      { id: "stu-2", name: "Rohan Patel", status: "Host", initials: "RP", color: "#3B302A" },
      { id: "stu-3", name: "Kavya Deshmukh", status: "Member", initials: "KD", color: "#8D857D" },
      { id: "stu-4", name: "Tanmay Sen", status: "Member", initials: "TS", color: "#B7A594" }
    ],
    chat: [
      { id: 1, sender: "Kavya Deshmukh", text: "Notice how the recurrence relation handles the base case when items have zero weight.", time: "07:15 PM", avatar: "KD" },
      { id: 2, sender: "Rohan Patel", text: "Yes! That matches Professor Sharma's derivation from Tuesday's lecture.", time: "07:18 PM", avatar: "RP" }
    ],
    documentSections: [
      {
        page: 1,
        title: "Section 3.1: AVL Tree Heights & Rotations",
        text: "An empty tree has height -1. A tree with only root has height 0. For any node, the balance factor BF is calculated as height(left) - height(right).\n\nWhenever |BF| > 1, a rotation is triggered:\n• LL Rotation: Single Right Rotation\n• RR Rotation: Single Left Rotation\n• LR Rotation: Left Rotation on Left Child, then Right Rotation on Root\n• RL Rotation: Right Rotation on Right Child, then Left Rotation on Root",
        insight: "In semester exams, always state the balance factor at each node before performing rotations."
      },
      {
        page: 2,
        title: "Section 3.2: 0/1 Knapsack Recurrence Formula",
        text: "Let dp[i][w] represent the maximum value obtainable using a subset of the first i items with a total weight capacity of w.\n\nCase 1 (Item not included): dp[i][w] = dp[i-1][w]\nCase 2 (Item included if wt[i-1] <= w): dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])",
        insight: "Remember that in 0/1 knapsack, each item can only be chosen once (unlike unbounded knapsack)."
      },
      {
        page: 3,
        title: "Section 3.3: Tabulation Grid & Backtracking",
        text: "After filling the table in O(N*W) time, we backtrack from dp[N][W] to find the exact subset of items chosen by checking if dp[i][w] != dp[i-1][w]. If different, item i was included.",
        insight: "Space complexity can be optimized from O(N*W) to O(W) using a single 1D rolling array."
      }
    ]
  },
  {
    id: "room-cs302",
    code: "CS-302",
    subject: "Database Management Systems",
    category: "DBMS",
    title: "SQL Query Optimization & 3NF Normalization",
    description: "Deep dive into Boyce-Codd Normal Form, functional dependencies, lossless join decomposition, and B+ tree indexing.",
    documentTitle: "Unit 2: Normal Forms & Transaction Schedules.pdf",
    schedule: "Tue & Thu 4:00 PM – 5:30 PM",
    status: "Upcoming Session",
    totalPages: 2,
    defaultPage: 1,
    host: "Sneha Reddy",
    membersCount: 3,
    isJoined: false,
    activeStudents: [
      { id: "stu-5", name: "Sneha Reddy", status: "Host", initials: "SR", color: "#3B302A" },
      { id: "stu-6", name: "Devansh Mehra", status: "Member", initials: "DM", color: "#8D857D" }
    ],
    chat: [
      { id: 1, sender: "Sneha Reddy", text: "Let's review BCNF vs 3NF dependency preservation before tomorrow's quiz.", time: "06:45 PM", avatar: "SR" }
    ],
    documentSections: [
      {
        page: 1,
        title: "Section 2.1: Third Normal Form (3NF)",
        text: "A relation schema R is in 3NF if for every functional dependency X -> Y, either:\n1. Y is a prime attribute (part of candidate key), OR\n2. X is a superkey of R.\n\n3NF guarantees both lossless join decomposition and dependency preservation.",
        insight: "Always check whether Y is prime before concluding that a transitive dependency violates 3NF."
      },
      {
        page: 2,
        title: "Section 2.2: Boyce-Codd Normal Form (BCNF)",
        text: "A relation R is in BCNF if for every non-trivial functional dependency X -> Y, X is a superkey of R.\n\nBCNF is strictly stronger than 3NF. However, decomposing into BCNF may not always preserve all functional dependencies.",
        insight: "If dependency preservation is strictly required, the schema is kept in 3NF."
      }
    ]
  },
  {
    id: "room-cs303",
    code: "CS-303",
    subject: "Operating Systems Principles",
    category: "Operating Systems",
    title: "Process Scheduling & Deadlock Avoidance",
    description: "Comparing Round Robin, Shortest Job First, and Banker's Algorithm safety state checks with numerical examples.",
    documentTitle: "Unit 4: CPU Scheduling & Banker Algorithm.pdf",
    schedule: "Mon, Wed & Fri 6:00 PM",
    status: "Active Circle",
    totalPages: 2,
    defaultPage: 1,
    host: "Ananya Iyer",
    membersCount: 5,
    isJoined: false,
    activeStudents: [
      { id: "stu-7", name: "Ananya Iyer", status: "Host", initials: "AI", color: "#3B302A" },
      { id: "stu-8", name: "Kunal Verma", status: "Member", initials: "KV", color: "#8D857D" }
    ],
    chat: [
      { id: 1, sender: "Ananya Iyer", text: "Uploaded solved numericals for Banker's Algorithm safety state vector checks.", time: "05:20 PM", avatar: "AI" }
    ],
    documentSections: [
      {
        page: 1,
        title: "Section 4.1: Banker's Algorithm Safety State",
        text: "The safety algorithm determines whether the system is in a safe state:\n1. Let Work = Available, and Finish[i] = false for all processes.\n2. Find an index i such that Finish[i] == false and Need[i] <= Work.\n3. If such i exists, Work = Work + Allocation[i], Finish[i] = true, and repeat step 2.\n4. If all Finish[i] == true, the system is in a safe state.",
        insight: "Remember that an unsafe state is NOT necessarily a deadlock; it simply means deadlock cannot be guaranteed to be avoided."
      },
      {
        page: 2,
        title: "Section 4.2: CPU Scheduling Comparison",
        text: "• FCFS: Non-preemptive, suffers from Convoy Effect.\n• SJF: Optimal average waiting time, but requires knowing burst time in advance; can cause starvation of long processes.\n• Round Robin: Preemptive with time quantum q. Too large q degenerates to FCFS; too small q increases context-switch overhead.",
        insight: "Rule of thumb: 80% of CPU bursts should be shorter than the chosen time quantum."
      }
    ]
  },
  {
    id: "room-cs304",
    code: "CS-304",
    subject: "Computer Networks & Security",
    category: "Computer Networks",
    title: "TCP 3-Way Handshake & Subnetting",
    description: "Protocol flow diagrams for TCP connection establishment, sliding window flow control, and CIDR subnet calculation.",
    documentTitle: "Unit 5: Transport Layer & CIDR Addressing.pdf",
    schedule: "Weekends 11:00 AM – 1:00 PM",
    status: "Weekend Sprint",
    totalPages: 2,
    defaultPage: 1,
    host: "Vikram Malhotra",
    membersCount: 4,
    isJoined: false,
    activeStudents: [
      { id: "stu-9", name: "Vikram Malhotra", status: "Host", initials: "VM", color: "#3B302A" },
      { id: "stu-10", name: "Priya Nair", status: "Member", initials: "PN", color: "#8D857D" }
    ],
    chat: [
      { id: 1, sender: "Vikram Malhotra", text: "Let's review SYN flood attacks and SYN cookies before viva.", time: "04:10 PM", avatar: "VM" }
    ],
    documentSections: [
      {
        page: 1,
        title: "Section 5.1: TCP 3-Way Handshake",
        text: "Step 1: Client sends SYN packet (seq = x) to server.\nStep 2: Server responds with SYN-ACK packet (seq = y, ack = x + 1).\nStep 3: Client sends ACK packet (seq = x + 1, ack = y + 1).\n\nConnection is established and bidirectional full-duplex data transfer can begin.",
        insight: "The sequence numbers are randomly generated (ISN) to prevent replay and spoofing attacks."
      },
      {
        page: 2,
        title: "Section 5.2: CIDR Subnetting Calculations",
        text: "For a /26 network:\n• Subnet mask = 255.255.255.192 (binary 11000000 in last octet).\n• Host bits = 32 - 26 = 6 bits.\n• Total addresses per subnet = 2^6 = 64.\n• Usable host addresses = 64 - 2 = 62 (first address is Network ID, last is Broadcast).",
        insight: "Always subtract 2 from total addresses when calculating usable host IPs."
      }
    ]
  }
];
