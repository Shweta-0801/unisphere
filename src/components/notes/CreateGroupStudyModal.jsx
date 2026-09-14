import React, { useState } from "react";

export default function CreateGroupStudyModal({
  notes,
  subjects,
  initialData,
  onClose,
  onSubmit
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    topic: initialData?.topic || "",
    subject: initialData?.subject || "DBMS",
    noteId: initialData?.noteId || (notes[0]?.id || 1),
    hostName: initialData?.hostName || "Alex Sharma",
    maxMembers: 6,
    isPrivate: false,
    passcode: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a study room title.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="module-modal-overlay" onClick={onClose}>
      <div className="module-modal-box modal-create-room" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <div className="modal-title-wrap">
            <span className="modal-icon">👥</span>
            <div>
              <h3>Create Group Study Room</h3>
              <p>Host a collaborative revision room around any note or subject.</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-content">
          <div className="form-field">
            <label>Study Room Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. DBMS Normalization Sprint & 3NF Proofs"
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
              <label>Attach Marketplace Note</label>
              <select
                value={formData.noteId}
                onChange={(e) => setFormData({ ...formData, noteId: Number(e.target.value) })}
                className="input-text"
              >
                {notes.map((n) => (
                  <option key={n.id} value={n.id}>{n.title} (₹{n.price})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label>Sprint Goal / Topic Description</label>
            <input
              type="text"
              placeholder="e.g. Solve 10 semester viva questions and review ACID properties"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="input-text"
            />
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label>Host Name</label>
              <input
                type="text"
                value={formData.hostName}
                onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                className="input-text"
              />
            </div>

            <div className="form-field">
              <label>Max Circle Members</label>
              <select
                value={formData.maxMembers}
                onChange={(e) => setFormData({ ...formData, maxMembers: Number(e.target.value) })}
                className="input-text"
              >
                <option value={4}>4 Members (Intimate Circle)</option>
                <option value={6}>6 Members (Recommended)</option>
                <option value={10}>10 Members (Batch Group)</option>
                <option value={20}>20 Members (Class Lecture)</option>
              </select>
            </div>
          </div>

          <div className="form-field checkbox-field">
            <label className="checkbox-wrap">
              <input
                type="checkbox"
                checked={formData.isPrivate}
                onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
              />
              <span>Require Passcode to Join (Private Room)</span>
            </label>
          </div>

          {formData.isPrivate && (
            <div className="form-field">
              <label>Room Passcode</label>
              <input
                type="text"
                placeholder="Enter 4-digit passcode (e.g. 1234)"
                value={formData.passcode}
                onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
                className="input-text"
              />
            </div>
          )}

          <div className="modal-buttons-row">
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-confirm-submit"> Launch Room Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}