import { loadFromStorage, saveToStorage } from "./storage";
import { assignedClassesData, sampleStudentsByClass } from "../data/teacherData";
import { initialStudents } from "../data/teacherDashboardData";

export const FACULTY_CLASSES_KEY = "unisphere_faculty_classes";
export const FACULTY_STUDENTS_KEY = "unisphere_faculty_students";
export const UNIFIED_STUDENTS_KEY = "unisphere_teacher_students_v2";

/**
 * Enrolls a new student and synchronizes all teacher portals across UniSphere.
 * 
 * @param {Object} studentData
 * @param {string} studentData.name - Full name (e.g., "Rohan Verma")
 * @param {string} studentData.rollNo - University Roll Number (e.g., "2024-CSE-095")
 * @param {string} studentData.classId - Target Class ID ("cls-1", "cls-2", "cls-3", "cls-4")
 * @param {string} studentData.email - Institutional Email
 * @param {string} studentData.phone - Contact Phone Number
 * @returns {Object} { success: boolean, newStudent: Object }
 */
export function enrollNewStudent({ name, rollNo, classId = "cls-1", email, phone }) {
  if (!name || !rollNo) {
    throw new Error("Student Name and Roll Number are required.");
  }

  // 1. Map classId to section identifier (e.g. "cls-1" -> "CSE-A")
  const classSectionMap = {
    "cls-1": "CSE-A",
    "cls-2": "CSE-B",
    "cls-3": "CSE-C",
    "cls-4": "CSE-D"
  };
  const sectionCode = classSectionMap[classId] || "CSE-A";

  // Clean formatted numeric ID for tables
  const numericRoll = parseInt(rollNo.replace(/\D/g, ""), 10) || Math.floor(100 + Math.random() * 900);
  const studentId = `std-${Date.now().toString().slice(-4)}`;

  // --------------------------------------------------------------------------
  // LAYER 1: Update Class Rosters (My Classes)
  // --------------------------------------------------------------------------
  const allStudentsByClass = loadFromStorage(FACULTY_STUDENTS_KEY, sampleStudentsByClass);
  const currentRoster = allStudentsByClass[classId] || [];

  const newRosterStudent = {
    id: studentId,
    name: name.trim(),
    rollNo: rollNo.trim(),
    email: email?.trim() || `${name.toLowerCase().replace(/\s+/g, ".")}@unisphere.edu`,
    phone: phone?.trim() || "+91 98000 00000",
    classesAttended: 0,
    totalClasses: 32,
    attendancePercentage: 0.0,
    gradeAverage: 0.0,
    submissionsCount: 0,
    totalAssignments: 4,
    status: "At Risk", // Initial until classes attended
    mentorshipNotes: "Newly enrolled student. Initial orientation pending.",
    history: []
  };

  const updatedStudentsByClass = {
    ...allStudentsByClass,
    [classId]: [newRosterStudent, ...currentRoster]
  };
  saveToStorage(FACULTY_STUDENTS_KEY, updatedStudentsByClass);

  // --------------------------------------------------------------------------
  // LAYER 2: Update Class Counters (Teacher Dashboard KPIs)
  // --------------------------------------------------------------------------
  const classesList = loadFromStorage(FACULTY_CLASSES_KEY, assignedClassesData);
  const updatedClassesList = classesList.map((cls) => {
    if (cls.id === classId) {
      return {
        ...cls,
        totalStudents: (cls.totalStudents || 0) + 1,
        defaulterCount: (cls.defaulterCount || 0) + 1
      };
    }
    return cls;
  });
  saveToStorage(FACULTY_CLASSES_KEY, updatedClassesList);

  // --------------------------------------------------------------------------
  // LAYER 3: Update Unified Attendance & Marks Roster (Teacher Attendance & Performance)
  // --------------------------------------------------------------------------
  const unifiedStudents = loadFromStorage(UNIFIED_STUDENTS_KEY, initialStudents);
  const newUnifiedRecord = {
    id: Date.now(),
    rollNo: numericRoll,
    name: name.trim(),
    className: sectionCode,
    attendance: { present: 0, total: 18 },
    marks: { internal: 0, midTerm: 0, endTerm: 0 }
  };
  const updatedUnifiedStudents = [newUnifiedRecord, ...unifiedStudents];
  saveToStorage(UNIFIED_STUDENTS_KEY, updatedUnifiedStudents);

  // --------------------------------------------------------------------------
  // LAYER 4: Broadcast Live Event to All Components and Open Tabs
  // --------------------------------------------------------------------------
  try {
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(
      new CustomEvent("unisphere:student-enrolled", {
        detail: { student: newRosterStudent, classId, sectionCode }
      })
    );
  } catch (err) {
    console.warn("Event dispatch error:", err);
  }

  return { success: true, newStudent: newRosterStudent };
}

/**
 * Removes a student from a class section and synchronizes all teacher portals across UniSphere.
 * 
 * @param {Object} params
 * @param {string} params.studentId - ID of student (e.g. "std-1" or "std-1234")
 * @param {string} [params.rollNo] - University Roll Number (e.g. "2024-CSE-095")
 * @param {string} params.classId - Target Class ID ("cls-1", "cls-2", "cls-3", "cls-4")
 * @returns {Object} { success: boolean, removedStudent: Object }
 */
export function removeStudent({ studentId, rollNo, classId = "cls-1" }) {
  if (!studentId && !rollNo) {
    throw new Error("Student ID or Roll Number is required for removal.");
  }

  // 1. Map classId to section identifier (e.g. "cls-1" -> "CSE-A")
  const classSectionMap = {
    "cls-1": "CSE-A",
    "cls-2": "CSE-B",
    "cls-3": "CSE-C",
    "cls-4": "CSE-D"
  };
  const sectionCode = classSectionMap[classId] || "CSE-A";
  const numericRoll = rollNo ? parseInt(rollNo.replace(/\D/g, ""), 10) : null;

  // --------------------------------------------------------------------------
  // LAYER 1: Update Class Rosters (My Classes)
  // --------------------------------------------------------------------------
  const allStudentsByClass = loadFromStorage(FACULTY_STUDENTS_KEY, sampleStudentsByClass);
  const currentRoster = allStudentsByClass[classId] || [];

  const studentToRemove = currentRoster.find(
    (s) => (studentId && s.id === studentId) || (rollNo && s.rollNo?.toLowerCase() === rollNo.toLowerCase())
  );

  const updatedRoster = currentRoster.filter(
    (s) => !((studentId && s.id === studentId) || (rollNo && s.rollNo?.toLowerCase() === rollNo.toLowerCase()))
  );

  const updatedStudentsByClass = {
    ...allStudentsByClass,
    [classId]: updatedRoster
  };
  saveToStorage(FACULTY_STUDENTS_KEY, updatedStudentsByClass);

  // --------------------------------------------------------------------------
  // LAYER 2: Update Class Counters (Teacher Dashboard KPIs)
  // --------------------------------------------------------------------------
  const wasAtRisk = studentToRemove ? studentToRemove.attendancePercentage < 75 : false;
  const classesList = loadFromStorage(FACULTY_CLASSES_KEY, assignedClassesData);
  const updatedClassesList = classesList.map((cls) => {
    if (cls.id === classId) {
      return {
        ...cls,
        totalStudents: Math.max(0, (cls.totalStudents || 1) - 1),
        defaulterCount: wasAtRisk ? Math.max(0, (cls.defaulterCount || 1) - 1) : cls.defaulterCount
      };
    }
    return cls;
  });
  saveToStorage(FACULTY_CLASSES_KEY, updatedClassesList);

  // --------------------------------------------------------------------------
  // LAYER 3: Update Unified Attendance & Marks Roster (Teacher Attendance & Performance)
  // --------------------------------------------------------------------------
  const unifiedStudents = loadFromStorage(UNIFIED_STUDENTS_KEY, initialStudents);
  const updatedUnifiedStudents = unifiedStudents.filter((s) => {
    if (numericRoll && s.rollNo === numericRoll && s.className === sectionCode) return false;
    if (studentToRemove && s.name?.toLowerCase() === studentToRemove.name?.toLowerCase()) return false;
    return true;
  });
  saveToStorage(UNIFIED_STUDENTS_KEY, updatedUnifiedStudents);

  // --------------------------------------------------------------------------
  // LAYER 4: Broadcast Live Events
  // --------------------------------------------------------------------------
  try {
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(
      new CustomEvent("unisphere:student-enrolled", { // Triggers existing reactive sync handlers
        detail: { removedStudent: studentToRemove, classId, sectionCode }
      })
    );
    window.dispatchEvent(
      new CustomEvent("unisphere:student-removed", {
        detail: { removedStudent: studentToRemove, classId, sectionCode }
      })
    );
  } catch (err) {
    console.warn("Event dispatch error:", err);
  }

  return { success: true, removedStudent: studentToRemove };
}
