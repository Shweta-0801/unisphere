import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("unisphere_auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (credentials) => {
    const displayName = credentials.name || credentials.email?.split("@")[0] || "Student";
    const initials = displayName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const fullUser = {
      name: displayName,
      rollNo: credentials.rollNo || "2024-CSE-042",
      email: credentials.email || "student@unisphere.edu",
      department: credentials.department || "Computer Science & Engineering",
      semester: credentials.semester || "4th Semester",
      role: "Student",
      initials: initials || "ST",
      ...credentials
    };

    setUser(fullUser);
    localStorage.setItem("unisphere_auth_user", JSON.stringify(fullUser));
    return fullUser;
  };

  const demoLogin = (name = "Alex Sharma") => {
    const demoUser = {
      name,
      rollNo: "2024-CSE-042",
      email: "student@unisphere.edu",
      department: "Computer Science & Engineering",
      semester: "4th Semester",
      role: "Student",
      initials: "AS"
    };
    setUser(demoUser);
    localStorage.setItem("unisphere_auth_user", JSON.stringify(demoUser));
    return demoUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("unisphere_auth_user");
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...(prev || {}), ...updatedFields };
      localStorage.setItem("unisphere_auth_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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
      login: () => {},
      demoLogin: () => {},
      logout: () => {},
      updateUser: () => {}
    };
  }
  return context;
}