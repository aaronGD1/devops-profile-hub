import React from 'react';
import './ProfileCard.css';

const AVATAR_FALLBACK = 'https://api.dicebear.com/7.x/avataaars/svg?seed=devops';

export default function ProfileCard({ profile }) {
  if (!profile) {
    return (
      <div className="card-page">
        <div className="empty-state">
          <div className="empty-state__icon">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="27" stroke="#30363d" strokeWidth="1.5"/>
              <circle cx="28" cy="22" r="9" stroke="#8b949e" strokeWidth="1.5" fill="none"/>
              <path d="M10 48c0-9.941 8.059-18 18-18s18 8.059 18 18"
                    stroke="#8b949e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <h3 className="empty-state__title">No Profile Yet</h3>
          <p className="empty-state__desc">
            Create your profile using the <strong>Create Profile</strong> tab to see it displayed here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-page">
      <div className="card-page__header">
        <h2 className="card-page__title">Your Profile</h2>
        <span className="card-page__meta">ID: #{profile.id}</span>
      </div>

      <div className="profile-card">
        {/* Hero section */}
        <div className="profile-hero">
          <div className="profile-hero__bg" />
          <div className="profile-hero__content">
            <div className="profile-avatar">
              <img
                src={profile.imageUrl || AVATAR_FALLBACK}
                alt={profile.name}
                onError={(e) => { e.target.src = AVATAR_FALLBACK; }}
              />
            </div>
            <div className="profile-identity">
              <h2 className="profile-name">{profile.name}</h2>
              <p className="profile-college">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1L1 4.5v1l6 3.5 6-3.5v-1L7 1z"
                        stroke="#8b949e" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M1 5.5V10" stroke="#8b949e" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M3.5 6.8V11a7 7 0 007 0V6.8"
                        stroke="#8b949e" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {profile.college}
              </p>
              <div className="profile-stats">
                <span className="stat-pill">
                  <span className="stat-dot stat-dot--blue" />
                  {profile.skills?.length ?? 0} Skills
                </span>
                <span className="stat-pill">
                  <span className="stat-dot stat-dot--green" />
                  {profile.certifications?.length ?? 0} Certifications
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="profile-body">
          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <section className="profile-section">
              <h3 className="section-title">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l2 4h4.5L11 8l1.5 4.5L8 10l-4.5 2.5L5 8 1.5 5H6L8 1z"
                        stroke="#58a6ff" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
                </svg>
                Skills
              </h3>
              <div className="tags-grid">
                {profile.skills.map((skill, i) => (
                  <span key={i} className="tag tag--skill">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {profile.certifications && profile.certifications.length > 0 && (
            <section className="profile-section">
              <h3 className="section-title">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="10" rx="2"
                        stroke="#3fb950" strokeWidth="1.2" fill="none"/>
                  <path d="M4 7h8M4 10h5" stroke="#3fb950"
                        strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Certifications
              </h3>
              <div className="certs-list">
                {profile.certifications.map((cert, i) => (
                  <div key={i} className="cert-item">
                    <span className="cert-icon">🏆</span>
                    <span className="cert-name">{cert}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
