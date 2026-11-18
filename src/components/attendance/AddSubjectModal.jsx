import { useState } from "react";
import { X, BookOpen, User, Hash, CheckCircle, AlertCircle } from "lucide-react";

function AddSubjectModal({ isOpen, onClose, onSave, subjectToEdit = null }) {
  const [name, setName] = useState(subjectToEdit?.name || "");
  const [code, setCode] = useState(subjectToEdit?.code || "");
  const [faculty, setFaculty] = useState(subjectToEdit?.faculty || "");
  const [attended, setAttended] = useState(subjectToEdit?.attended || 0);
  const [total, setTotal] = useState(subjectToEdit?.total || 0);
  const [color, setColor] = useState(subjectToEdit?.color || "blue");
  const [error, setError] = useState("");

  const colorOptions = [
    { id: "blue", bg: "#3b82f6", label: "Blue" },
    { id: "indigo", bg: "#6366f1", label: "Indigo" },
    { id: "purple", bg: "#a855f7", label: "Purple" },
    { id: "emerald", bg: "#10b981", label: "Emerald" },
    { id: "amber", bg: "#f59e0b", label: "Amber" },
    { id: "rose", bg: "#ef4444", label: "Rose" }
  ];

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter a subject name.");
      return;
    }

    const attendedNum = Number(attended);
    const totalNum = Number(total);

    if (isNaN(attendedNum) || isNaN(totalNum) || attendedNum < 0 || totalNum < 0) {
      setError("Attended and total classes must be positive numbers.");
      return;
    }

    if (attendedNum > totalNum) {
      setError("Classes attended cannot exceed total classes.");
      return;
    }

    const payload = {
      id: subjectToEdit ? subjectToEdit.id : Date.now(),
      name: trimmedName,
      code: code.trim().toUpperCase() || "SUB" + Math.floor(100 + Math.random() * 900),
      faculty: faculty.trim() || "Course Faculty",
      attended: attendedNum,
      total: totalNum,
      color: color
    };

    onSave(payload);
    onClose();
  }

  return (
    <div className="att-modal-overlay">
      <div className="att-modal-window" role="dialog" aria-modal="true">
        {/* Header */}
        <div className="att-modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.75rem",
              background: "rgba(255, 255, 255, 0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <BookOpen style={{ width: "1.25rem", height: "1.25rem", color: "#ffffff" }} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>
                {subjectToEdit ? "Edit Subject" : "Add New Subject"}
              </h2>
              <p style={{ fontSize: "0.75rem", color: "#e0e7ff", margin: "0.2rem 0 0 0" }}>
                {subjectToEdit ? "Update course attendance records" : "Enrol a new course into your tracker"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#ffffff"
            }}
            aria-label="Close modal"
          >
            <X style={{ width: "1rem", height: "1rem" }} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="att-modal-body">
          {error && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem",
              fontSize: "0.8125rem",
              color: "var(--att-danger-text)",
              background: "var(--att-danger-light)",
              border: "1px solid var(--att-danger-border)",
              borderRadius: "0.75rem"
            }}>
              <AlertCircle style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="att-input-label">Subject Name *</label>
            <div style={{ position: "relative" }}>
              <BookOpen style={{
                width: "1rem",
                height: "1rem",
                color: "var(--att-text-subtle)",
                position: "absolute",
                left: "0.85rem",
                top: "50%",
                transform: "translateY(-50%)"
              }} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Distributed Operating Systems"
                className="att-form-control"
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            <div>
              <label className="att-input-label">Course Code</label>
              <div style={{ position: "relative" }}>
                <Hash style={{
                  width: "1rem",
                  height: "1rem",
                  color: "var(--att-text-subtle)",
                  position: "absolute",
                  left: "0.85rem",
                  top: "50%",
                  transform: "translateY(-50%)"
                }} />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. CS-402"
                  className="att-form-control"
                  style={{ paddingLeft: "2.5rem", textTransform: "uppercase" }}
                />
              </div>
            </div>

            <div>
              <label className="att-input-label">Faculty / Instructor</label>
              <div style={{ position: "relative" }}>
                <User style={{
                  width: "1rem",
                  height: "1rem",
                  color: "var(--att-text-subtle)",
                  position: "absolute",
                  left: "0.85rem",
                  top: "50%",
                  transform: "translateY(-50%)"
                }} />
                <input
                  type="text"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  placeholder="e.g. Prof. Sharma"
                  className="att-form-control"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            <div>
              <label className="att-input-label">Classes Attended</label>
              <input
                type="number"
                min="0"
                value={attended}
                onChange={(e) => setAttended(e.target.value)}
                className="att-form-control"
              />
            </div>

            <div>
              <label className="att-input-label">Total Classes</label>
              <input
                type="number"
                min="0"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="att-form-control"
              />
            </div>
          </div>

          {/* Color theme picker */}
          <div>
            <label className="att-input-label">Card Accent Color</label>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.35rem" }}>
              {colorOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setColor(opt.id)}
                  style={{
                    width: "1.85rem",
                    height: "1.85rem",
                    borderRadius: "50%",
                    backgroundColor: opt.bg,
                    border: color === opt.id ? "3px solid #0f172a" : "2px solid transparent",
                    transform: color === opt.id ? "scale(1.1)" : "scale(1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                  title={opt.label}
                >
                  {color === opt.id && <CheckCircle style={{ width: "0.85rem", height: "0.85rem", color: "#ffffff" }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.75rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--att-border-subtle)",
            marginTop: "0.5rem"
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.65rem 1.15rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--att-text-muted)",
                background: "var(--att-surface-alt)",
                border: "none",
                borderRadius: "var(--att-radius-sm)",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "0.65rem 1.4rem",
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "#ffffff",
                background: "var(--att-primary-gradient)",
                border: "none",
                borderRadius: "var(--att-radius-sm)",
                boxShadow: "0 4px 12px var(--att-primary-glow)",
                cursor: "pointer"
              }}
            >
              {subjectToEdit ? "Save Changes" : "Add Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSubjectModal;
