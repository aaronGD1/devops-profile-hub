import React, { useState } from 'react';
import ProfileForm from './components/ProfileForm.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import ProfileList from './components/ProfileList.jsx';
import Header from './components/Header.jsx';
import './styles/App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('form');
  const [savedProfile, setSavedProfile] = useState(null);

  const handleProfileSaved = (profile) => {
    setSavedProfile(profile);
    setActiveTab('view');
  };

  return (
    <div className="app-root">
      <Header />

      <nav className="tab-nav">
        <div className="tab-nav__inner">
          <button
            className={`tab-btn ${activeTab === 'form' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            <span className="tab-icon">✏️</span>
            Create Profile
          </button>
          <button
            className={`tab-btn ${activeTab === 'view' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('view')}
          >
            <span className="tab-icon">👤</span>
            My Profile
          </button>
          <button
            className={`tab-btn ${activeTab === 'list' ? 'tab-btn--active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <span className="tab-icon">📋</span>
            All Profiles
          </button>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'form' && (
          <ProfileForm onProfileSaved={handleProfileSaved} />
        )}
        {activeTab === 'view' && (
          <ProfileCard profile={savedProfile} />
        )}
        {activeTab === 'list' && (
          <ProfileList />
        )}
      </main>

      <footer className="app-footer">
        <p>
          <span className="footer-badge">DevOps Profile Hub</span>
          &nbsp;·&nbsp; Built with React + Spring Boot + Docker + Jenkins
        </p>
      </footer>
    </div>
  );
}
