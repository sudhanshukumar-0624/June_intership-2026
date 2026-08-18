import React, { useState } from 'react';

const Navbar = ({ totalTasks, completedTasks, onOpenAdd }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const pendingTasks = totalTasks - completedTasks;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="topnav">
        <div className="topnav-left">
          <div className="brand">
            <div className="brand-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="brand-name">Task Flow</span>
          </div>
        </div>

        <div className="topnav-center">
          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="topnav-right">
          <button className="nav-add-btn" onClick={onOpenAdd} id="nav-add-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Add task
          </button>
          <button className="avatar-btn" aria-label="User profile">
            <span>TF</span>
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="hero-header">
        <div className="hero-left">
          <p className="hero-date">{todayFormatted}</p>
          <h1 className="hero-greeting">{greeting()}, let's get it done. ✦</h1>
          <div className="hero-stats">
            <span className="hero-stat-pill pill-total">
              <span className="pill-dot dot-dark" />
              {totalTasks} Total
            </span>
            <span className="hero-stat-pill pill-done">
              <span className="pill-dot dot-green" />
              {completedTasks} Done
            </span>
            <span className="hero-stat-pill pill-pending">
              <span className="pill-dot dot-yellow" />
              {pendingTasks} Pending
            </span>
          </div>
        </div>

        {totalTasks > 0 && (
          <div className="hero-progress-ring">
            <svg viewBox="0 0 80 80" width="80" height="80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#e8e2d9" strokeWidth="8"/>
              <circle
                cx="40" cy="40" r="32"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - completedTasks / totalTasks)}`}
                style={{ transition: 'stroke-dashoffset 0.7s ease', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
              />
            </svg>
            <div className="ring-label">
              <span className="ring-pct">{totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%</span>
              <span className="ring-sub">done</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
