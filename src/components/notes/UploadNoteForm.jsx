import React, { useState } from "react";

export default function UploadNoteForm({ subjects, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "DBMS",
    topic: "",
    description: "",
    semester: "4th Sem",
    pages: 15,
    sellerName: "Alex Sharma",
    sellerCollege: "Campus Verified"
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setErrorMessage("Please enter a note title.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="module-modal-overlay" onClick={onClose}>
      <div className="module-modal-box modal-upload" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div className="modal-title-wrap">
            <span className="modal-icon">📤</span>
            <div>
              <h3>Upload Semester Notes</h3>
              <p>Share verified semester revision notes with fellow students.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="modal-close">✕</button>
        </div>

        {errorMessage && (
          <div style={{ color: "var(--error, #8C2A3E)", background: "var(--error-bg, #FAF0F0)", padding: "8px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "600", marginBottom: "12px", border: "1px solid var(--error-border, #ECCBCB)" }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form-content">
          <div className="form-field">
            <label>Note Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Complete Operating Systems & CPU Scheduling Notes"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errorMessage) setErrorMessage("");
              }}
              className="input-text"
            />
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label>Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="input-text"
              >
                {subjects.filter((s) => s !== "All Subjects").map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Target Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="input-text"
              >
                <option value="1st Sem">1st Semester</option>
                <option value="2nd Sem">2nd Semester</option>
                <option value="3rd Sem">3rd Semester</option>
                <option value="4th Sem">4th Semester</option>
                <option value="5th Sem">5th Semester</option>
                <option value="6th Sem">6th Semester</option>
                <option value="7th/8th Sem">7th / 8th Semester</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label>Key Topics Covered</label>
            <input
              type="text"
              placeholder="e.g. Deadlocks, Banker's Algorithm, Paging, Virtual Memory"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="input-text"
            />
          </div>

          <div className="form-field">
            <label>Short Description</label>
            <textarea
              rows="3"
              placeholder="Brief summary of what these notes cover..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-text"
              style={{ width: "100%", resize: "vertical" }}
            />
          </div>

          <div className="modal-buttons-row">
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-confirm-submit">Upload Note</button>
          </div>
        </form>
      </div>
    </div>
  );
}