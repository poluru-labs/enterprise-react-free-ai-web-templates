import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import queueData from '../../data/queue.json';
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatDateTime } from '../../lib/format.js';
import { searchRecords } from '../../lib/search.js';

function ShieldMark() {
  return (
    <svg className="cmb-shield cmb-shield-sm" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 3.2 6.5 7.1v7.4c0 6.2 4 11.3 9.5 13.3 5.5-2 9.5-7.1 9.5-13.3V7.1L16 3.2Z"
        fill="#7C3AED"
      />
      <path
        d="m11.2 16.1 3 3.1 6.7-6.8"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardNavbar({ onMenuToggle }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();
  const [query, setQuery] = useState('');
  const [paletteQuery, setPaletteQuery] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const ticker = overview.ticker;
  const reviewers = queueData.reviewers;

  const paletteHits = useMemo(
    () => searchRecords(COMMAND_ITEMS, paletteQuery, ['label', 'hint', 'group']),
    [paletteQuery],
  );

  const runSearch = () => {
    const next = query.trim();
    if (!next) return;
    navigate(`${BASE_PATH}/search?q=${encodeURIComponent(next)}`);
  };

  const assignNext = () => {
    const nextItem = queueData.items.find((item) => item.assignee === 'Unassigned');
    if (!nextItem) {
      showToast({ title: 'Queue is clear', description: 'No unassigned items right now.', variant: 'info' });
      return;
    }
    showToast({
      title: `Assigned ${nextItem.id}`,
      description: `${nextItem.title} is now with ${SIGNED_IN_USER.name}.`,
      variant: 'success',
    });
    navigate(`${BASE_PATH}/queue?focus=${nextItem.id}`);
  };

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
    <header className="cmb-navbar">
      <div className="cmb-navbar-stripe" aria-hidden="true" />
      <div className="cmb-navbar-inner">
        <div className="cmb-navbar-start">
          <Button
            className="cmb-menu-btn"
            variant="secondary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel="Open navigation"
            onClick={onMenuToggle}
          />
          <div className="cmb-navbar-brand">
            <ShieldMark />
            <div>
              <strong>{APP_NAME}</strong>
              <span>{APP_TAGLINE}</span>
            </div>
          </div>
        </div>

        <div className="cmb-ticker" aria-label="Queue SLA ticker">
          <span className="cmb-ticker-chip">
            <i className="bi bi-inbox" aria-hidden="true" />
            Pending <strong>{ticker.pending}</strong>
          </span>
          <span className="cmb-ticker-chip">
            <i className="bi bi-hourglass-split" aria-hidden="true" />
            Median SLA <strong>{ticker.medianSlaMinutes}m</strong>
          </span>
          <span className="cmb-ticker-chip">
            <i className="bi bi-cpu" aria-hidden="true" />
            Auto-mod <strong>{ticker.autoModRate}%</strong>
          </span>
          <span className="cmb-ticker-chip cmb-ticker-people">
            <span className="cmb-avatar-cluster" aria-hidden="true">
                  {reviewers.slice(0, 4).map((person) => (
                <Avatar key={person.name} name={person.name} size="sm" />
              ))}
            </span>
            Reviewers <strong>{ticker.reviewersOnline} online</strong>
          </span>
        </div>

        <label className="cmb-underline-search">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search cases, policies, reporters"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                runSearch();
              }
            }}
            aria-label="Search the workspace"
          />
          <button type="button" className="cmb-kbd-btn" onClick={() => setPaletteOpen(true)}>
            <Kbd>⌘K</Kbd>
          </button>
        </label>

        <div className="cmb-navbar-end">
          <Button size="sm" icon="plus" onClick={assignNext}>
            Assign next
          </Button>
          <div className="cmb-notify-wrap">
            <Button
              variant="tertiary"
              size="sm"
              icon="bell"
              iconOnly
              accessibleLabel="Notifications"
              onClick={() => setNotifyOpen(true)}
            />
            {notifications.unread ? (
              <span className="cmb-notify-count" aria-hidden="true">
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
              <button type="button" className="cmb-profile" title={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}>
                <Avatar name={SIGNED_IN_USER.name} size="sm" />
                <div className="cmb-profile-copy">
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
          </DropdownMenu>
        </div>
      </div>

      <Drawer
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        heading={`${notifications.unread} unread alerts`}
        size="md"
      >
        <ul className="cmb-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`cmb-notify-item tone-${item.tone}`}
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
        heading="Jump to a screen"
      >
        <label className="cmb-palette-search">
          Search pages and actions
          <input
            autoFocus
            value={paletteQuery}
            onChange={(event) => setPaletteQuery(event.target.value)}
            placeholder="Queue, appeals, assign next…"
          />
        </label>
        <ul className="cmb-palette-list">
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
