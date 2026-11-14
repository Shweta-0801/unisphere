import React, { createContext, useContext, useState, useEffect } from "react";
import { updateTeacherProfile } from "../data/teacherDashboardData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Synchronous restoration from localStorage guarantees no initial null flash
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("unisphere_auth_user");
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed) {
        updateTeacherProfile(parsed);
      }
      return parsed;
    } catch (e) {
      console.warn("Error restoring session from localStorage:", e);
      return null;
    }
  });

  const [isInitialized, setIsInitialized] = useState(true);

  // Synchronize authentication state across browser tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "unisphere_auth_user") {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : null;
          setUser(parsed);
          if (parsed) updateTeacherProfile(parsed);
        } catch {
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (user) {
      updateTeacherProfile(user);
    }
  }, [user]);

  const login = (credentials) => {
    const isFaculty = credentials.role === "Faculty" || credentials.role === "Teacher";
    const displayName = credentials.name || (isFaculty ? "Dr. Ananya Sharma" : credentials.email?.split("@")[0] || "Student");
    
    // Smart initials calculation
    const words = displayName.replace(/[^\w\s]/gi, "").trim().split(/\s+/).filter(Boolean);
    let initials = "UN";
    if (words.length >= 2) {
      if (["dr", "prof"].includes(words[0].toLowerCase()) && words.length >= 3) {
        initials = (words[1][0] + words[2][0]).toUpperCase();
      } else {
        initials = (words[0][0] + words[1][0]).toUpperCase();
      }
    } else if (words.length === 1 && words[0].length >= 2) {
      initials = words[0].substring(0, 2).toUpperCase();
    } else if (words.length === 1) {
      initials = words[0][0].toUpperCase();
    }

    const fullUser = {
      name: displayName,
      rollNo: credentials.rollNo || (isFaculty ? "FAC-CSE-104" : "2024-CSE-042"),
      email: credentials.email || (isFaculty ? "faculty@unisphere.edu" : "student@unisphere.edu"),
      department: credentials.department || "Computer Science & Engineering",
      semester: credentials.semester || (isFaculty ? "Faculty • Associate Professor" : "4th Semester"),
      role: isFaculty ? "Faculty" : "Student",
      subject: isFaculty ? "Data Structures" : undefined,
      initials: initials || (isFaculty ? "FA" : "ST"),
      ...credentials
    };

    setUser(fullUser);
    updateTeacherProfile(fullUser);
    try {
      localStorage.setItem("unisphere_auth_user", JSON.stringify(fullUser));
    } catch (e) {
      console.warn("Unable to save session to localStorage:", e);
    }
    return fullUser;
  };

  const demoLogin = (name = "Alex Sharma", role = "Student") => {
    const isFaculty = role === "Faculty" || role === "Teacher";
    const demoUser = {
      name: isFaculty ? "Dr. Ananya Sharma" : name,
      rollNo: isFaculty ? "FAC-CSE-104" : "2024-CSE-042",
      email: isFaculty ? "ananya.sharma@unisphere.edu" : "student@unisphere.edu",
      department: "Computer Science & Engineering",
      semester: isFaculty ? "Faculty • Associate Professor" : "4th Semester",
      role: isFaculty ? "Faculty" : "Student",
      subject: isFaculty ? "Data Structures" : undefined,
      initials: isFaculty ? "AS" : "AS"
    };
    setUser(demoUser);
    updateTeacherProfile(demoUser);
    try {
      localStorage.setItem("unisphere_auth_user", JSON.stringify(demoUser));
    } catch (e) {
      console.warn("Unable to save demo session to localStorage:", e);
    }
    return demoUser;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("unisphere_auth_user");
    } catch (e) {
      console.warn("Unable to remove session from localStorage:", e);
    }
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...(prev || {}), ...updatedFields };
      updateTeacherProfile(updated);
      try {
        localStorage.setItem("unisphere_auth_user", JSON.stringify(updated));
      } catch (e) {
        console.warn("Unable to update session in localStorage:", e);
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isInitialized,
        login,
        demoLogin,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      isInitialized: true,
      login: () => {},
      demoLogin: () => {},
      logout: () => {},
      updateUser: () => {}
    };
  }
  return context;
}
