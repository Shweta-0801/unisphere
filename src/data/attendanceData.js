/**
 * Sample Attendance and Timetable Data for UniSphere
 * Designed for 3rd/4th Semester Computer Science & Engineering
 */

export const initialAttendanceData = {
  // Aggregate baseline figures
  studentName: "Alex Sharma",
  rollNo: "2024-CSE-042",
  department: "Computer Science & Engineering",
  semester: "4th Semester",
  requiredCutoff: 75.0, // Mandatory university condonation barrier

  // Subject-wise attendance records
  subjects: [
    {
      id: "cs301",
      code: "CS-301",
      name: "Data Structures & Algorithms",
      attended: 34,
      total: 38,
      faculty: "Dr. Rajesh Sharma",
      credits: 4,
      room: "Hall 302"
    },
    {
      id: "cs302",
      code: "CS-302",
      name: "Database Management Systems",
      attended: 28,
      total: 32,
      faculty: "Prof. Sunita Rao",
      credits: 4,
      room: "Hall 204"
    },
    {
      id: "cs303",
      code: "CS-303",
      name: "Operating Systems Principles",
      attended: 25,
      total: 34,
      faculty: "Dr. Arvind Iyer",
      credits: 3,
      room: "Hall 108"
    },
    {
      id: "cs304",
      code: "CS-304",
      name: "Computer Networks & Security",
      attended: 30,
      total: 32,
      faculty: "Prof. Priya Nair",
      credits: 3,
      room: "Auditorium 105"
    },
    {
      id: "cs305",
      code: "CS-305L",
      name: "Full-Stack Web Development Lab",
      attended: 14,
      total: 16,
      faculty: "Prof. Vikram Mehta",
      credits: 2,
      room: "Lab 4 (Systems)"
    }
  ],

  // Today's schedule for daily timetable module
  todayTimetable: [
    {
      id: "t1",
      time: "09:00 AM – 10:00 AM",
      subject: "Data Structures & Algorithms",
      code: "CS-301",
      faculty: "Dr. Rajesh Sharma",
      room: "Hall 302",
      type: "Lecture",
      status: "Completed"
    },
    {
      id: "t2",
      time: "10:15 AM - 11:15 AM",
      subject: "Database Management Systems",
      code: "CS-302",
      faculty: "Prof. Sunita Rao",
      room: "Hall 204",
      type: "Lecture",
      status: "In Progress"
    },
    {
      id: "t3",
      time: "11:30 AM - 01:00 PM",
      subject: "Full-Stack Web Development Lab",
      code: "CS-305L",
      faculty: "Prof. Vikram Mehta",
      room: "Lab 4",
      type: "Practical",
      status: "Upcoming"
    },
    {
      id: "t4",
      time: "02:00 PM - 03:00 PM",
      subject: "Computer Networks & Security",
      code: "CS-304",
      faculty: "Prof. Priya Nair",
      room: "Auditorium 105",
      type: "Lecture",
      status: "Upcoming"
    }
  ]
};