import React, { useState } from 'react';
import { saveProfile } from '../api/profileApi.js';
import './ProfileForm.css';

const INITIAL_STATE = {
  name: '',
  college: '',
  skillsInput: '',
  certificationsInput: '',
  imageUrl: '',
};

export default function ProfileForm({ onProfileSaved }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const parseList = (raw) =>
    raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

  const validate = () => {
    if (!form.name.trim())    return 'Full name is required.';
    if (!form.college.trim()) return 'College name is required.';
    if (!form.skillsInput.trim()) return 'At least one skill is required.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    const payload = {
      name: form.name.trim(),
      college: form.college.trim(),
      skills: parseList(form.skillsInput),
      certifications: parseList(form.certificationsInput),
      imageUrl: form.imageUrl.trim() || null,
    };

    setLoading(true);
    setError('');
    try {
      const { data } = await saveProfile(payload);
      setSuccess(`Profile saved successfully! (ID: ${data.id})`);
      setForm(INITIAL_STATE);
      if (onProfileSaved) onProfileSaved(data);
    } catch (err) {
      const msg = err.response?.data?.message
        || err.message
        || 'Failed to save profile. Make sure the backend is running on port 8083.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-page__header">
        <h2 className="form-page__title">Create Your Profile</h2>
        <p className="form-page__desc">
          Fill in the details below to create your DevOps portfolio profile.
          Skills and certifications can be entered as comma-separated values.
        </p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} noValidate>

          {/* Profile Image Preview */}
          <div className="avatar-row">
            <div className="avatar-preview">
              {form.imageUrl ? (
                <img src={form.imageUrl} alt="Profile preview"
                     onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <div className="avatar-placeholder">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="16" r="8" stroke="#58a6ff" strokeWidth="1.5" fill="none"/>
                    <path d="M4 36c0-8.837 7.163-16 16-16s16 7.163 16 16"
                          stroke="#58a6ff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="avatar-info">
              <p className="avatar-info__title">Profile Photo</p>
              <p className="avatar-info__hint">Paste an image URL below to set your profile photo</p>
            </div>
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label className="form-label" htmlFor="imageUrl">
              Profile Image URL
              <span className="label-optional">optional</span>
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              className="form-input"
              placeholder="https://example.com/your-photo.jpg"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </div>

          {/* Two-column row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name <span className="label-required">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="e.g. John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="college">
                College / University <span className="label-required">*</span>
              </label>
              <input
                id="college"
                name="college"
                type="text"
                className="form-input"
                placeholder="e.g. MIT"
                value={form.college}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Skills */}
          <div className="form-group">
            <label className="form-label" htmlFor="skillsInput">
              Skills <span className="label-required">*</span>
            </label>
            <textarea
              id="skillsInput"
              name="skillsInput"
              className="form-input form-textarea"
              placeholder="e.g. Docker, Kubernetes, Jenkins, AWS, Terraform, Ansible"
              value={form.skillsInput}
              onChange={handleChange}
              rows={3}
            />
            <p className="form-hint">Separate each skill with a comma</p>
          </div>

          {/* Certifications */}
          <div className="form-group">
            <label className="form-label" htmlFor="certificationsInput">
              Certifications
              <span className="label-optional">optional</span>
            </label>
            <textarea
              id="certificationsInput"
              name="certificationsInput"
              className="form-input form-textarea"
              placeholder="e.g. AWS Solutions Architect, CKA, Docker Certified Associate"
              value={form.certificationsInput}
              onChange={handleChange}
              rows={3}
            />
            <p className="form-hint">Separate each certification with a comma</p>
          </div>

          {/* Status messages */}
          {error   && <div className="alert alert--error">{error}</div>}
          {success && <div className="alert alert--success">{success}</div>}

          {/* Submit */}
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" />
                Saving Profile…
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1v16M1 9h16" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Save Profile
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
