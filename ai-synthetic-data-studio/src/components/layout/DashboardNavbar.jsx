import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import notificationsData from '../../data/notifications.json';
import { BASE_PATH } from '../../constants/navigation.js';

export function DashboardNavbar({ onToggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${BASE_PATH}/datasets?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="syn-navbar">
      <div className="syn-navbar-left">
        <button
          type="button"
          className="syn-mobile-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <i className="bi bi-list" aria-hidden="true" />
        </button>

        <form onSubmit={handleSearchSubmit} className="syn-nav-search">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search synthetic datasets, models, schemas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search synthetic datasets"
          />
        </form>
      </div>

      <div className="syn-navbar-right">
        <Link to={`${BASE_PATH}/generator`} className="syn-btn-brand">
          <i className="bi bi-plus-circle-fill" aria-hidden="true" />
          <span>New Synthetic Batch</span>
        </Link>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="syn-btn-secondary"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label={`Notifications (${unreadCount} unread)`}
            style={{ position: 'relative', padding: '0.48rem 0.75rem' }}
          >
            <i className="bi bi-bell-fill" aria-hidden="true" />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#dc2626',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '360px',
                background: '#ffffff',
                border: '1px solid var(--syn-line)',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 25px rgba(5, 51, 156, 0.12)',
                zIndex: 1000,
                padding: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid var(--syn-line-soft)',
                }}
              >
                <strong style={{ fontSize: '0.9rem', color: 'var(--syn-ink)' }}>
                  Studio Notifications
                </strong>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--syn-brand)',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '320px', overflowY: 'auto' }}>
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '0.6rem',
                      borderRadius: '0.5rem',
                      background: item.unread ? 'var(--syn-brand-soft)' : '#f8fafc',
                      border: '1px solid var(--syn-line-soft)',
                      fontSize: '0.8rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600', color: 'var(--syn-ink)', marginBottom: '0.2rem' }}>
                      <i className={`bi ${item.icon}`} style={{ color: 'var(--syn-brand)' }} />
                      <span>{item.title}</span>
                    </div>
                    <p style={{ margin: '0 0 0.3rem', color: 'var(--syn-muted)', fontSize: '0.76rem', lineHeight: '1.4' }}>
                      {item.message}
                    </p>
                    <span style={{ fontSize: '0.7rem', color: 'var(--syn-subtle)' }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Pill with Poluru */}
        <Link
          to={`${BASE_PATH}/team`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.35rem 0.65rem 0.35rem 0.4rem',
            background: 'var(--syn-canvas)',
            border: '1px solid var(--syn-line)',
            borderRadius: '2rem',
            textDecoration: 'none',
            color: 'var(--syn-ink)',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#05339C',
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
              fontWeight: '700',
              fontSize: '0.75rem',
            }}
          >
            SP
          </div>
          <div style={{ lineHeight: 1.1, textAlign: 'left' }}>
            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--syn-ink)' }}>
              Subbu Poluru
            </span>
            <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--syn-muted)' }}>
              Lead AI Architect
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
