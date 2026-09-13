import React, { useState } from "react";

export default function UploadNoteForm({ subjects, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "DBMS",
    topic: "",
    description: "",
    price: 39,
    isFree: false,
    semester: "4th Sem",
    pages: 15,
    sellerName: "Alex Sharma",
    sellerCollege: "Campus Verified"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a note title");
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
              <h3>Publish & Sell Course Notes</h3>
              <p>Upload your semester revision notes and earn 70% royalty per download.</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-content">
          <div className="form-field">
            <label>Note Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Complete Operating Systems & CPU Scheduling Notes"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

          <div className="form-grid-2">
            <div className="form-field">
              <label>Price (₹)</label>
              <input
                type="number"
                disabled={formData.isFree}
                value={formData.isFree ? 0 : formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="input-text"
                min="0"
                max="199"
              />
            </div>

            <div className="form-field checkbox-field" style={{ paddingTop: "28px" }}>
              <label className="checkbox-wrap">
                <input
                  type="checkbox"
                  checked={formData.isFree}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isFree: e.target.checked,
                      price: e.target.checked ? 0 : 39
                    })
                  }
                />
                <span>Make this note FREE for students</span>
              </label>
            </div>
          </div>

          <div className="file-upload-dropzone">
            <span className="dropzone-icon">📁</span>
            <p>Drag & drop PDF note file here, or click to browse</p>
            <small>Supported format: PDF (Max 50MB)</small>
          </div>

          <div className="modal-buttons-row">
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-confirm-submit">Publish Note</button>
          </div>
        </form>
      </div>
    </div>
  );
}