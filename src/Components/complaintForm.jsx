import React, { useState, useRef } from 'react';

export function ComplaintForm({ category, onSubmit, onCancel, onChangeCategory }) {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    attachmentName: '',
    attachmentUrl: null
  });

  const [errors, setErrors] = useState({});
  const [filePreview, setFilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const validate = () => {
    const errs = {};
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.location.trim()) errs.location = 'Specific location is required';
    if (!formData.date) errs.date = 'Date is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, attachment: 'File size must be under 5MB' }));
      return;
    }
    setFormData((prev) => ({ ...prev, attachmentName: file.name }));
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setFilePreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview('DOC_ATTACHMENT');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit({
        ...formData,
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
        categoryColor: category.color,
        attachmentUrl: filePreview
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="complaint-form-wrapper">
      <style>{`
        .complaint-form-wrapper {
          background: var(--bg-card, #FFFDF8);
          border: 1.5px solid var(--border-color, #E5DCD4);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          font-family: inherit;
        }
        .form-header-badge {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          border-radius: 14px;
          margin-bottom: 24px;
        }
        .form-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .form-header-icon {
          font-size: 1.6rem;
        }
        .form-header-name {
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text-primary, #241A1C);
          margin: 0;
        }
        .form-header-sub {
          font-size: 0.8rem;
          color: var(--text-secondary, #75666A);
          margin: 0;
        }
        .switch-category-btn {
          background: #FFFDF8;
          border: 1px solid var(--border-color, #D8CBBE);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          color: var(--text-secondary, #75666A);
          transition: all 0.2s;
        }
        .switch-category-btn:hover {
          border-color: #6B1E2D;
          color: #6B1E2D;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .form-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary, #241A1C);
          margin-bottom: 6px;
          display: block;
        }
        .form-input, .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid var(--border-color, #D8CBBE);
          font-size: 0.92rem;
          background: var(--bg-card, #FFFDF8);
          color: var(--text-primary, #241A1C);
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #6B1E2D;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.15);
        }
        .form-input--error {
          border-color: #A63D40 !important;
        }
        .form-error {
          font-size: 0.75rem;
          color: #A63D40;
          margin-top: 4px;
          display: block;
          font-weight: 600;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr; }
        }
        .quick-locations {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }
        .location-chip {
          background: var(--bg-card-subtle, #FAF6F0);
          border: 1px solid var(--border-color, #E5DCD4);
          border-radius: 9999px;
          padding: 3px 10px;
          font-size: 0.75rem;
          color: var(--text-secondary, #75666A);
          cursor: pointer;
          transition: background 0.15s;
        }
        .location-chip:hover {
          background: #E5DCD4;
          color: #241A1C;
        }
        .priority-options {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }
        .priority-pill {
          flex: 1;
          text-align: center;
          padding: 8px 6px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid var(--border-color, #E5DCD4);
          background: var(--bg-card, #FFFDF8);
          color: var(--text-secondary, #75666A);
          transition: all 0.15s;
        }
        .priority-pill input { display: none; }
        .priority-pill--active {
          border-color: #6B1E2D;
          background: #F8F3EA;
          color: #065f46;
          font-weight: 700;
        }
        .upload-dropzone {
          border: 2px dashed var(--border-color, #D8CBBE);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .upload-dropzone:hover {
          border-color: #6B1E2D;
          background: #f0fdf4;
        }
        .upload-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: var(--bg-card-subtle, #F8F3EA);
          border: 1px solid var(--border-color, #E5DCD4);
          border-radius: 10px;
        }
        .upload-preview img {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          object-fit: cover;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid var(--border-color, #E5DCD4);
        }
        .btn-cancel {
          padding: 10px 20px;
          border-radius: 10px;
          border: 1px solid var(--border-color, #D8CBBE);
          background: var(--bg-card, #FFFDF8);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-secondary, #75666A);
          cursor: pointer;
        }
        .btn-submit {
          padding: 10px 24px;
          border-radius: 10px;
          border: none;
          background: #6B1E2D;
          color: #FFFDF8;
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(107, 30, 45, 0.3);
          transition: all 0.2s;
        }
        .btn-submit:hover {
          background: #48121E;
          transform: translateY(-1px);
        }
      `}</style>

      {/* Category banner */}
      <div
        className="form-header-badge"
        style={{
          backgroundColor: `${category.color}15`,
          border: `1px solid ${category.color}35`
        }}
      >
        <div className="form-header-left">
          <span className="form-header-icon">{category.icon}</span>
          <div>
            <h3 className="form-header-name">{category.name} Grievance</h3>
            <p className="form-header-sub">{category.description}</p>
          </div>
        </div>
        {onChangeCategory && (
          <button type="button" className="switch-category-btn" onClick={onChangeCategory}>
            Switch Category
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Subject */}
        <div className="form-group">
          <label className="form-label">Subject / Issue Summary *</label>
          <input
            name="subject"
            type="text"
            className={`form-input ${errors.subject ? 'form-input--error' : ''}`}
            placeholder="e.g. Broken water tap in washroom, Wi-Fi speed issue"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <span className="form-error">{errors.subject}</span>}
        </div>

        {/* Location & Date */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Specific Location / Venue *</label>
            <input
              name="location"
              type="text"
              className={`form-input ${errors.location ? 'form-input--error' : ''}`}
              placeholder="e.g. Block B Room 304"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <span className="form-error">{errors.location}</span>}

            {category.suggestedLocations && (
              <div className="quick-locations">
                {category.suggestedLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    className="location-chip"
                    onClick={() => setFormData((p) => ({ ...p, location: loc }))}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Date of Occurrence *</label>
            <input
              name="date"
              type="date"
              className={`form-input ${errors.date ? 'form-input--error' : ''}`}
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <span className="form-error">{errors.date}</span>}

            {/* Priority */}
            <div style={{ marginTop: '10px' }}>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Priority Level</label>
              <div className="priority-options">
                {['Low', 'Medium', 'High', 'Urgent'].map((lvl) => (
                  <label
                    key={lvl}
                    className={`priority-pill ${formData.priority === lvl ? 'priority-pill--active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={lvl}
                      checked={formData.priority === lvl}
                      onChange={handleChange}
                    />
                    {lvl}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <div className="form-label-row">
            <label className="form-label">Detailed Description *</label>
            <span style={{ fontSize: '0.75rem', color: '#9C8E92' }}>
              {formData.description.length} chars
            </span>
          </div>
          <textarea
            name="description"
            rows="4"
            className={`form-textarea ${errors.description ? 'form-input--error' : ''}`}
            placeholder="Describe what happened, when it started, and the impact..."
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <span className="form-error">{errors.description}</span>}
        </div>

        {/* Supporting Image / Document */}
        <div className="form-group">
          <label className="form-label">
            Supporting Photograph / Document <span style={{ color: '#9C8E92', fontSize: '0.75rem' }}>(Optional)</span>
          </label>
          {!filePreview ? (
            <div
              className="upload-dropzone"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '6px' }}>📎</span>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#6B1E2D' }}>
                Click to attach photo or proof document
              </span>
              <p style={{ fontSize: '0.75rem', color: '#9C8E92', margin: '4px 0 0 0' }}>
                PNG, JPG, or PDF up to 5MB
              </p>
            </div>
          ) : (
            <div className="upload-preview">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {filePreview.startsWith('data:image') ? (
                  <img src={filePreview} alt="attachment" />
                ) : (
                  <span>📄</span>
                )}
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{formData.attachmentName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B1E2D' }}>Attachment ready</div>
                </div>
              </div>
              <button
                type="button"
                style={{ color: '#A63D40', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => {
                  setFilePreview(null);
                  setFormData((p) => ({ ...p, attachmentName: '', attachmentUrl: null }));
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register Complaint'}
          </button>
        </div>
      </form>
    </div>
  );
}