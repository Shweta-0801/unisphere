import { useState } from "react";
import { UserPlus, X, Check, Mail, Phone, Hash, User, GraduationCap, AlertCircle } from "lucide-react";
import { enrollNewStudent } from "../../utils/enrollmentService";

export default function EnrollStudentModal({ isOpen, onClose, defaultClassId = "cls-1", onEnrolled }) {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [classId, setClassId] = useState(defaultClassId);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  
const handleSubmit = (e) => {
  e.preventDefault();
  setError(null);

  // 1. Check required fields
  if (!name.trim() || !rollNo.trim()) {
    setError(
      "Please provide both Student Full Name and University Roll Number."
    );
    return;
  }

  // 2. Validate institutional email
  const trimmedEmail = email.trim();

  const emailRegex = /^[^\s@]+@unisphere\.edu$/i;

  if (!emailRegex.test(trimmedEmail)) {
    setError(
      "Please enter a valid institutional email ending with @unisphere.edu."
    );
    return;
  }

  // 3. Validate Indian mobile number
  const digits = phone.replace(/\D/g, "");

  let normalizedPhone = digits;

  // Accept +91 followed by 10 digits
  if (digits.startsWith("91") && digits.length === 12) {
    normalizedPhone = digits.slice(2);
  }
  // Accept 0 followed by 10 digits
  else if (digits.startsWith("0") && digits.length === 11) {
    normalizedPhone = digits.slice(1);
  }

  // Indian mobile numbers start with 6, 7, 8, or 9
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(normalizedPhone)) {
    setError(
      "Please enter a valid 10-digit Indian mobile number."
    );
    return;
  }

  // 4. Enroll the student only if validation passes
  try {
    const { newStudent } = enrollNewStudent({
      name: name.trim(),
      rollNo: rollNo.trim(),
      classId,
      email: trimmedEmail,
      phone: normalizedPhone
    });

    if (onEnrolled) {
      onEnrolled(newStudent, classId);
    }

    onClose();
  } catch (err) {
    setError(err.message || "Failed to enroll student.");
  }
};


  return (
    <div className="att-modal-overlay">
      <div className="att-modal-window" style={{ maxWidth: "34rem" }}>
        {/* Header */}
        <div className="att-modal-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <UserPlus size={18} color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0, color: "#FFFFFF" }}>
                Enroll New Student
              </h2>
              <p style={{ fontSize: "0.75rem", margin: "2px 0 0", color: "rgba(255, 255, 255, 0.85)" }}>
                Adds student to section rosters, grade ledgers, and attendance registers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            style={{ background: "none", border: "none", color: "#FFFFFF", cursor: "pointer", opacity: 0.85 }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {error && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "0.6rem 0.85rem",
              borderRadius: "8px",
              background: "var(--error-bg, rgba(140, 42, 62, 0.15))",
              border: "1px solid var(--error-border, #ECCBCB)",
              color: "var(--error, #8C2A3E)",
              fontSize: "12px",
              fontWeight: 600
            }}>
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {/* Student Name */}
          <div>
            <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, marginBottom: "4px" }}>
              Full Student Name *
            </label>
            <div style={{ position: "relative" }}>
              <User size={15} style={{ position: "absolute", left: "10px", top: "12px", opacity: 0.5 }} />
              <input
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 10px 9px 34px",
                  borderRadius: "8px",
                  border: "1px solid var(--light-border, #D6D0C8)",
                  fontSize: "13px",
                  outline: "none"
                }}
                required
              />
            </div>
          </div>

          {/* Roll Number & Target Section */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, marginBottom: "4px" }}>
                Roll Number / ID *
              </label>
              <div style={{ position: "relative" }}>
                <Hash size={15} style={{ position: "absolute", left: "10px", top: "12px", opacity: 0.5 }} />
                <input
                  type="text"
                  placeholder="2024-CSE-095"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 10px 9px 34px",
                    borderRadius: "8px",
                    border: "1px solid var(--light-border, #D6D0C8)",
                    fontSize: "13px",
                    outline: "none"
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, marginBottom: "4px" }}>
                Assign Class Section *
              </label>
              <div style={{ position: "relative" }}>
                <GraduationCap size={15} style={{ position: "absolute", left: "10px", top: "12px", opacity: 0.5 }} />
                <select
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 10px 9px 34px",
                    borderRadius: "8px",
                    border: "1px solid var(--light-border, #D6D0C8)",
                    fontSize: "13px",
                    outline: "none"
                  }}
                >
                  <option value="cls-1">CS-301 • Section A</option>
                  <option value="cls-2">CS-301 • Section B</option>
                  <option value="cls-3">CS-303 • Section A</option>
                  <option value="cls-4">CS-303 • Section B</option>
                </select>
              </div>
            </div>
          </div>

          {/* Email & Phone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, marginBottom: "4px" }}>
                Institutional Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{ position: "absolute", left: "10px", top: "12px", opacity: 0.5 }} />
                <input
                  type="email"
                  placeholder="student@unisphere.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 10px 9px 34px",
                    borderRadius: "8px",
                    border: "1px solid var(--light-border, #D6D0C8)",
                    fontSize: "13px",
                    outline: "none"
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, marginBottom: "4px" }}>
                Contact Phone
              </label>
              <div style={{ position: "relative" }}>
                <Phone size={15} style={{ position: "absolute", left: "10px", top: "12px", opacity: 0.5 }} />
                <input
                  type="tel"
                  placeholder="+91 98000 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 10px 9px 34px",
                    borderRadius: "8px",
                    border: "1px solid var(--light-border, #D6D0C8)",
                    fontSize: "13px",
                    outline: "none"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
            paddingTop: "1rem",
            borderTop: "1px solid var(--light-border, #E5E0D8)",
            marginTop: "0.5rem"
          }}>
            <button
              type="button"
              onClick={onClose}
              className="unisphere-btn unisphere-btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="unisphere-btn unisphere-btn-primary"
            >
              <Check size={16} />
              <span>Confirm &amp; Enroll Student</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}