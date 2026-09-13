import React from "react";

export default function SubjectGrid({ subjects, selectedSubject, onSelectSubject }) {
  return (
    <div className="subject-chips-slider">
      {subjects.map((subj) => (
        <button
          key={subj}
          onClick={() => onSelectSubject(subj)}
          className={`subject-chip ${selectedSubject === subj ? "active" : ""}`}
        >
          {subj === "All Subjects" && "📑 "}
          {subj === "DBMS" && "🗄️ "}
          {subj === "Data Structures" && "🌳 "}
          {subj === "Operating Systems" && "⚡ "}
          {subj === "Computer Networks" && "🌐 "}
          {subj === "AI & Machine Learning" && "🤖 "}
          {subj === "Compiler Design" && "⚙️ "}
          {subj}
        </button>
      ))}
    </div>
  );
}