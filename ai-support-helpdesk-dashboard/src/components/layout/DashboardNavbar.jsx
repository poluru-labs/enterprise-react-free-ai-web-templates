import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Drawer,
  DropdownMenu,
  Kbd,
  MenuItem,
  Modal,
  showToast,
  useTheme,
} from '@poluru-labs/enterprise-design-system-react';
import {
  APP_NAME,
  APP_TAGLINE,
  BASE_PATH,
  COMMAND_ITEMS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import overview from '../../data/overview.json';
import notifications from '../../data/notifications.json';
import agents from '../../data/agents.json';
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatDateTime } from '../../lib/format.js';
import { searchRecords } from '../../lib/search.js';
import { firstUnassigned } from '../../lib/tickets.js';
import { RelayMark } from './DashboardSidebar.jsx';

function SlaRing({ item }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(1, Math.max(0.08, item.minutes / item.limit));
  const offset = circumference * (1 - ratio);
  const stroke = item.tone === 'danger' ? '#dc2626' : item.tone === 'warning' ? '#d97706' : '#EA580C';

  return (
    <div className={`desk-sla-chip tone-${item.tone}`} title={`${item.label} first-response clock`}>
      <svg viewBox="0 0 40 40" className="desk-sla-ring" aria-hidden="true">
        <circle cx="20" cy="20" r={radius} className="desk-sla-track" />
        <circle
          cx="20"
          cy="20"
          r={radius}
          className="desk-sla-progress"
          stroke={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div>
        <em>{item.label}</em>
        <strong>{item.remaining}</strong>
      </div>
    </div>
  );
}

export function DashboardNavbar({ onMenuToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();
  const [query, setQuery] = useState('');
  const [paletteQuery, setPaletteQuery] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const paletteHits = useMemo(
    () => searchRecords(COMMAND_ITEMS, paletteQuery, ['label', 'hint', 'group']),
    [paletteQuery],
  );

  const assignNext = () => {
    const ticket = firstUnassigned();
    if (!ticket) {
      showToast({ title: 'Queue is clear', description: 'Every ticket already has an owner.', variant: 'info' });
      return;
    }
    showToast({
      title: 'Assigned to Meera Poluru',
      description: `${ticket.id} · ${ticket.subject}`,
      variant: 'success',
    });
    navigate(`${BASE_PATH}/tickets/${ticket.id}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('assign') === '1') {
      assignNext();
      navigate(location.pathname, { replace: true });
    }
  }, [location.search]);

  const goCommand = (item) => {
    setPaletteOpen(false);
    setPaletteQuery('');
    if (item.id === 'assign-next') {
      assignNext();
      return;
    }
    navigate(item.to);
  };

  return (
    <header className="desk-navbar">
      <div className="desk-navbar-stripe" aria-hidden="true" />
      <div className="desk-navbar-stack">
        <div className="desk-navbar-inner">
          <div className="desk-navbar-start">
            <Button
              className="desk-menu-btn"
              variant="secondary"
              size="sm"
              icon="menu"
              iconOnly
              accessibleLabel="Open navigation"
              onClick={onMenuToggle}
            />
            <div className="desk-navbar-brand">
              <RelayMark className="desk-mark desk-mark-sm" />
              <div>
                <strong>{APP_NAME}</strong>
                <span>
                  <span className="desk-pulse" aria-hidden="true" />
                  {APP_TAGLINE}
                </span>
              </div>
            </div>
          </div>

          <div className="desk-sla-cluster" aria-label="SLA countdown">
            {overview.slaCountdown.map((item) => (
              <SlaRing key={item.id} item={item} />
            ))}
          </div>

          <div className="desk-queue-density" aria-label={`${overview.openCount} open tickets`}>
            <span className="desk-density-dots">
              {overview.queueDensity.map((dot) => (
                <i key={dot.id} style={{ background: dot.color }} title={dot.label} />
              ))}
            </span>
            <strong>{overview.openCount} open</strong>
          </div>

          <label className="desk-inset-search">
            <i className="bi bi-search" aria-hidden="true" />
            <input
              type="search"
              placeholder="Tickets, customers, macros"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => {
                setPaletteQuery(query);
                setPaletteOpen(true);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  if (query.trim()) {
                    navigate(`${BASE_PATH}/search?q=${encodeURIComponent(query)}`);
                  } else {
                    setPaletteQuery(query);
                    setPaletteOpen(true);
                  }
                }
              }}
              aria-label="Search tickets, customers, and macros"
            />
          </label>

          <div className="desk-navbar-end">
            <Button size="sm" icon="arrow-right" onClick={assignNext}>
              Assign next
            </Button>
            <button type="button" className="desk-kbd-btn" onClick={() => setPaletteOpen(true)}>
              <Kbd>⌘K</Kbd>
            </button>
            <div className="desk-notify-wrap">
              <Button
                variant="tertiary"
                size="sm"
                icon="bell"
                iconOnly
                accessibleLabel="Notifications"
                onClick={() => setNotifyOpen(true)}
              />
              {notifications.unread ? (
                <span className="desk-notify-count" aria-hidden="true">
                  {notifications.unread}
                </span>
              ) : null}
            </div>
            <Button
              variant="tertiary"
              size="sm"
              accessibleLabel={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              onClick={toggleTheme}
            >
              <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`} aria-hidden="true" />
            </Button>
            <DropdownMenu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              trigger={
                <button type="button" className="desk-profile" title={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}>
                  <Avatar name={SIGNED_IN_USER.name} size="sm" />
                  <div className="desk-profile-copy">
                    <strong>{SIGNED_IN_USER.name}</strong>
                    <span>{SIGNED_IN_USER.role}</span>
                  </div>
                </button>
              }
            >
              <MenuItem
                label="Workspace settings"
                value="settings"
                onSelect={() => {
                  setMenuOpen(false);
                  navigate(`${BASE_PATH}/settings`);
                }}
              />
              <MenuItem
                label="Open command palette"
                value="palette"
                onSelect={() => {
                  setMenuOpen(false);
                  setPaletteOpen(true);
                }}
              />
              <MenuItem
                label="Sign out"
                value="signout"
                danger
                onSelect={() =>
                  showToast({
                    title: 'Signed out',
                    description: `${SIGNED_IN_USER.name} ended the session.`,
                    variant: 'info',
                  })
                }
              />
            </DropdownMenu>
          </div>
        </div>

        <div className="desk-presence" aria-label="Agent presence">
          <span className="desk-presence-live">
            <span className="desk-pulse" />
            {agents.online} agents online
          </span>
          <div className="desk-avatar-cluster">
            {agents.items.map((agent) => (
              <Avatar key={agent.id} name={agent.name} size="sm" title={`${agent.name} · ${agent.queue}`} />
            ))}
          </div>
        </div>
      </div>

      <Drawer
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        heading={`${notifications.unread} SLA alerts`}
        size="md"
      >
        <p className="desk-subtle">Sunday desk · last sync 1 min ago</p>
        <ul className="desk-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`desk-notify-item tone-${item.tone}`}
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

      <Modal
        open={paletteOpen}
        onOpenChange={(open) => {
          setPaletteOpen(open);
          if (!open) setPaletteQuery('');
        }}
        heading="Jump the desk"
      >
        <label className="desk-palette-search">
          Search pages and actions
          <input
            autoFocus
            value={paletteQuery}
            onChange={(event) => setPaletteQuery(event.target.value)}
            placeholder="Inbox, macros, assign next…"
          />
        </label>
        <ul className="desk-palette-list">
          {paletteHits.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => goCommand(item)}>
                <strong>{item.label}</strong>
                <span>{item.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </header>
  );
}
