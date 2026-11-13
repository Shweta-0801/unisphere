import { useState, useRef } from 'react';

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
    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      errs.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      errs.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      errs.description = 'Description must be at least 10 characters';
    }

    if (!formData.location.trim()) {
      errs.location = 'Specific location is required';
    }

    if (!formData.date) {
      errs.date = 'Date of occurrence is required';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
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
      {/* Category banner */}
      <div className={`form-header-badge complaint-category-border--${category.id}`}>
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
            <div className="priority-level-group">
              <label className="form-label priority-level-label">Priority Level</label>
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
            <span className="form-character-count">
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
            Supporting Photograph / Document <span className="form-optional-label">(Optional)</span>
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
                className="file-input-hidden"
                onChange={handleFileChange}
              />
              <span className="upload-dropzone-icon">📎</span>
              <span className="upload-dropzone-title">
                Click to attach photo or proof document
              </span>
              <p className="upload-dropzone-help">
                PNG, JPG, or PDF up to 5MB
              </p>
            </div>
          ) : (
            <div className="upload-preview">
              <div className="upload-preview-details">
                {filePreview.startsWith('data:image') ? (
                  <img src={filePreview} alt="attachment" />
                ) : (
                  <span>📄</span>
                )}
                <div>
                  <div className="upload-preview-name">{formData.attachmentName}</div>
                  <div className="upload-preview-status">Attachment ready</div>
                </div>
              </div>
              <button
                type="button"
                className="upload-remove-btn"
                onClick={() => {
                  setFilePreview(null);
                  setFormData((p) => ({ ...p, attachmentName: '', attachmentUrl: null }));
                }}
              >
                Remove
              </button>
            </div>
          )}
          {errors.attachment && <span className="form-error">{errors.attachment}</span>}
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

export default ComplaintForm;
