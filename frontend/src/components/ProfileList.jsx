import React, { useState, useEffect, useCallback } from 'react';
import { getProfiles, deleteProfile } from '../api/profileApi.js';
import './ProfileList.css';

const AVATAR_FALLBACK = 'https://api.dicebear.com/7.x/avataaars/svg?seed=devops';

export default function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [deleting, setDeleting] = useState(null);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getProfiles();
      setProfiles(data);
    } catch {
      setError('Could not load profiles. Make sure the backend is running on port 8083.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProfiles(); }, [fetchProfiles]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this profile?')) return;
    setDeleting(id);
    try {
      await deleteProfile(id);
      setProfiles((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError('Failed to delete profile.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="list-page">
      <div className="list-page__header">
        <div>
          <h2 className="list-page__title">All Profiles</h2>
          <p className="list-page__desc">
            {profiles.length} profile{profiles.length !== 1 ? 's' : ''} stored in the H2 database.
          </p>
        </div>
        <button className="btn-refresh" onClick={fetchProfiles} disabled={loading}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               className={loading ? 'spin' : ''}>
            <path d="M13.5 8A5.5 5.5 0 112.5 5" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2 2.5v3h3" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Refresh
        </button>
      </div>

      {error && <div className="alert alert--error">{error}</div>}

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card">
              <div className="skeleton-avatar" />
              <div className="skeleton-lines">
                <div className="skeleton-line skeleton-line--wide" />
                <div className="skeleton-line" />
                <div className="skeleton-line skeleton-line--short" />
              </div>
            </div>
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="empty-list">
          <div className="empty-list__icon">📭</div>
          <h3>No profiles yet</h3>
          <p>Create a profile using the <strong>Create Profile</strong> tab.</p>
        </div>
      ) : (
        <div className="profiles-grid">
          {profiles.map((profile) => (
            <article key={profile.id} className="list-card">
              <div className="list-card__top">
                <img
                  className="list-card__avatar"
                  src={profile.imageUrl || AVATAR_FALLBACK}
                  alt={profile.name}
                  onError={(e) => { e.target.src = AVATAR_FALLBACK; }}
                />
                <div className="list-card__identity">
                  <h3 className="list-card__name">{profile.name}</h3>
                  <p className="list-card__college">{profile.college}</p>
                  <span className="list-card__id">#{profile.id}</span>
                </div>
              </div>

              {profile.skills && profile.skills.length > 0 && (
                <div className="list-card__skills">
                  {profile.skills.slice(0, 4).map((s, i) => (
                    <span key={i} className="mini-tag">{s}</span>
                  ))}
                  {profile.skills.length > 4 && (
                    <span className="mini-tag mini-tag--more">
                      +{profile.skills.length - 4}
                    </span>
                  )}
                </div>
              )}

              {profile.certifications && profile.certifications.length > 0 && (
                <div className="list-card__certs">
                  <span className="cert-count-badge">
                    🏆 {profile.certifications.length} certification{profile.certifications.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}

              <div className="list-card__footer">
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(profile.id)}
                  disabled={deleting === profile.id}
                >
                  {deleting === profile.id ? (
                    <span className="spinner spinner--sm" />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 3.5h10M5 3.5V2h4v1.5M5.5 6v4M8.5 6v4M3 3.5l.7 8h6.6l.7-8"
                            stroke="currentColor" strokeWidth="1.2"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
