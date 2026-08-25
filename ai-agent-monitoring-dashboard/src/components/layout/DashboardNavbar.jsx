import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Drawer, Search, useTheme } from '@poluru-labs/enterprise-design-system-react';
import { APP_NAME, BASE_PATH } from '../../constants/navigation.js';
import notifications from '../../data/notifications.json';
import { formatDateTime } from '../../lib/format.js';

export function DashboardNavbar({ onMenuToggle, sectionLabel }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);

  const runSearch = () => {
    const next = query.trim();
    if (!next) return;
    navigate(`${BASE_PATH}/search?q=${encodeURIComponent(next)}`);
  };

  return (
    <header className="amd-navbar">
      <div className="amd-navbar-start">
        <Button
          className="amd-menu-btn"
          variant="secondary"
          size="sm"
          icon="menu"
          iconOnly
          accessibleLabel="Open navigation"
          onClick={onMenuToggle}
        />
        <div className="amd-navbar-title">
          <span className="amd-live-pill">
            <span className="amd-pulse" />
            Live
          </span>
          <div className="amd-navbar-heading">
            <strong>{sectionLabel || APP_NAME}</strong>
            <span>Agent monitoring</span>
          </div>
        </div>
      </div>

      <div className="amd-navbar-search">
        <Search
          placeholder="Search agents, tasks, traces, tools…"
          size="sm"
          value={query}
          onChange={(_, value) => setQuery(value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              runSearch();
            }
          }}
          onClear={() => setQuery('')}
          clearable
        />
      </div>

      <div className="amd-navbar-end">
        <Button
          variant="tertiary"
          size="sm"
          accessibleLabel={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={toggleTheme}
        >
          <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`} aria-hidden="true" />
        </Button>
        <div className="amd-notify-wrap">
          <Button
            variant="tertiary"
            size="sm"
            icon="bell"
            iconOnly
            accessibleLabel="Notifications"
            onClick={() => setNotifyOpen(true)}
          />
          {notifications.unread ? (
            <span className="amd-notify-count" aria-hidden="true">
              {notifications.unread}
            </span>
          ) : null}
        </div>
        <div className="amd-profile" title="Avery Poluru">
          <Avatar name="Avery Poluru" size="sm" />
          <div className="amd-profile-copy">
            <strong>Avery Poluru</strong>
            <span>Ops lead</span>
          </div>
        </div>
      </div>

      <Drawer
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        heading={`${notifications.unread} unread alerts`}
        size="md"
      >
        <ul className="amd-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`amd-notify-item tone-${item.tone}`}
                onClick={() => {
                  setNotifyOpen(false);
                  navigate(item.href);
                }}
              >
                <strong>{item.title}</strong>
                <p>{item.body}</p>
                <span>{formatDateTime(item.time)}</span>
              </button>
            </li>
          ))}
        </ul>
      </Drawer>
    </header>
  );
}
