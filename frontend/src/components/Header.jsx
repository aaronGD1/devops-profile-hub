import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#logoGrad)" />
              <path
                d="M8 14C8 10.686 10.686 8 14 8s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z"
                stroke="white" strokeWidth="1.5" fill="none"
              />
              <circle cx="14" cy="14" r="2.5" fill="white" />
              <path d="M14 6v2M14 20v2M6 14h2M20 14h2" stroke="white"
                    strokeWidth="1.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#1f6feb" />
                  <stop offset="1" stopColor="#388bfd" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1 className="header-title">DevOps Profile Hub</h1>
            <p className="header-subtitle">Personal Portfolio Management System</p>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge badge--blue">React</span>
          <span className="badge badge--green">Spring Boot</span>
          <span className="badge badge--orange">Docker</span>
          <span className="badge badge--purple">Jenkins</span>
        </div>
      </div>
    </header>
  );
}
