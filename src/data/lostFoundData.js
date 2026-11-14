/**
 * Sample Lost & Found Data for UniSphere
 * Includes campus coordinates, reports, points, and food discount voucher details
 */

export const campusLocations = [
  { id: "loc_lib", name: "Central Library", x: 28, y: 32, label: "Library" },
  { id: "loc_blockA", name: "Academic Block A (CS/IT)", x: 45, y: 22, label: "Block A" },
  { id: "loc_blockB", name: "Academic Block B (Mech/Civil)", x: 70, y: 28, label: "Block B" },
  { id: "loc_canteen", name: "University Food Court & Canteen", x: 38, y: 65, label: "Canteen" },
  { id: "loc_hostel", name: "Student Hostels (B & C)", x: 80, y: 72, label: "Hostels" },
  { id: "loc_sports", name: "Sports Arena & Gym", x: 62, y: 55, label: "Sports" },
  { id: "loc_admin", name: "Administration & Registrars", x: 18, y: 70, label: "Admin" }
];

// Helper to generate simulated timestamps (hours ago)
const hoursAgo = (hours) => Date.now() - hours * 60 * 60 * 1000;

export const initialLostFoundReports = [
  {
    id: "lf-001",
    type: "Lost", // "Lost" (Red marker) or "Found" (Green marker)
    title: "Scientific Calculator (Casio fx-991EX)",
    category: "Electronics",
    location: "Central Library",
    shortNote: "Lost near 2nd floor silent reading zone",
    description: "Matte black casing with a small blue sticker on the rear battery compartment. Left on desk 14.",
    timestamp: hoursAgo(1.2), // Active (< 3 hours)
    reportedBy: "Alex Sharma",
    isCurrentUser: true,
    status: "Active", // "Active" | "Resolved"
    contact: "alex.sharma@unisphere.edu",
    coordinates: { x: 31, y: 35 }
  },
  {
    id: "lf-002",
    type: "Found",
    title: "Campus ID Card & Lanyard",
    category: "Identity / Cards",
    location: "Academic Block A (CS/IT)",
    shortNote: "Found near CS Lab 2 entrance corridor",
    description: "Third semester CSE lanyard with student ID card for Roll 2024-CSE-089. Safely deposited with the lab attendant.",
    timestamp: hoursAgo(0.8), // Active
    reportedBy: "Rohan Patel",
    isCurrentUser: false,
    status: "Active",
    contact: "cs-lab2@unisphere.edu",
    coordinates: { x: 47, y: 25 }
  },
  {
    id: "lf-003",
    type: "Found",
    title: "Dell 65W Type-C Laptop Charger",
    category: "Electronics",
    location: "University Food Court & Canteen",
    shortNote: "Found near Canteen Counter 3",
    description: "Black Dell USB-C fast charger wrapped in blue velcro. Handed over to canteen cashier desk.",
    timestamp: hoursAgo(2.1), // Active
    reportedBy: "Alex Sharma",
    isCurrentUser: true,
    status: "Active",
    contact: "alex.sharma@unisphere.edu",
    coordinates: { x: 40, y: 67 }
  },
  {
    id: "lf-004",
    type: "Lost",
    title: "Spiral Notebook — Database Normalization Notes",
    category: "Stationery / Books",
    location: "Academic Block B (Mech/Civil)",
    shortNote: "Lost in Classroom 201 during elective",
    description: "Ruled Classmate notebook with 'DBMS Unit 3' handwritten on front cover.",
    timestamp: hoursAgo(4.5), // Older than 3 hours (archived from live map)
    reportedBy: "Sneha Reddy",
    isCurrentUser: false,
    status: "Active",
    contact: "sneha.r@unisphere.edu",
    coordinates: { x: 72, y: 31 }
  },
  {
    id: "lf-005",
    type: "Found",
    title: "Stainless Steel Water Flask (Milton)",
    category: "Personal Items",
    location: "Sports Arena & Gym",
    shortNote: "Found by badminton courts",
    description: "Silver 750ml thermal flask found near bench 4.",
    timestamp: hoursAgo(6.0),
    reportedBy: "Alex Sharma",
    isCurrentUser: true,
    status: "Resolved", // Successfully resolved (+100 points rewarded)
    contact: "alex.sharma@unisphere.edu",
    coordinates: { x: 64, y: 57 }
  }
];

export const userPointsProfile = {
  totalPoints: 1000, // Eligible for 1,000 points food discount voucher demonstration
  pointsPerResolvedFound: 100,
  redeemThreshold: 1000,
  activeReward: {
    title: "Campus Bistro 20% Discount Voucher",
    code: "UNISPHERE-FOOD-20",
    outlet: "Central Food Court Bistro",
    validDays: 1,
    status: "Active (Valid Today Only)",
    expiresIn: "Today, 11:59 PM"
  }
};
