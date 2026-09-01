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
  Search,
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
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatDateTime } from '../../lib/format.js';
import { searchRecords } from '../../lib/search.js';

function ScoreOrb() {
  const radius = 14;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - overview.ticker.passRate / 100);
  return (
    <svg className="prism-score-orb" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r={radius} className="prism-score-track" />
      <circle
        cx="20"
        cy="20"
        r={radius}
        className="prism-score-ring"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 20 20)"
      />
      <text x="20" y="21.6" textAnchor="middle" className="prism-score-text">
        {overview.ticker.passRate}%
      </text>
    </svg>
  );
}

export function DashboardNavbar({ onMenuToggle, onRun, collapsed }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();
  const [query, setQuery] = useState('');
  const [paletteQuery, setPaletteQuery] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const ticker = overview.ticker;

  const paletteHits = useMemo(
    () => searchRecords(COMMAND_ITEMS, paletteQuery, ['label', 'hint', 'group']),
    [paletteQuery],
  );

  const runSearch = () => {
    const next = query.trim();
    if (!next) {
      setPaletteOpen(true);
      return;
    }
    const hit = searchRecords(COMMAND_ITEMS, next, ['label', 'hint'])[0];
    if (hit) {
      navigate(hit.to);
      setQuery('');
      return;
    }
    navigate(`${BASE_PATH}/runs`);
  };

  const goCommand = (item) => {
    setPaletteOpen(false);
    setPaletteQuery('');
    if (item.id === 'queue-eval') {
      onRun?.();
      return;
    }
    navigate(item.to);
  };

  const chips = [
    { label: 'Mean score', value: ticker.meanScore, icon: 'bi-graph-up' },
    { label: 'Open reviews', value: ticker.openReviews, icon: 'bi-clipboard' },
    { label: 'Live suites', value: ticker.liveSuites, icon: 'bi-collection' },
    { label: 'Judges waiting', value: ticker.judgesWaiting, icon: 'bi-hourglass-split' },
  ];

  return (
    <header className="prism-navbar">
      <div className="prism-navbar-inner">
        <div className="prism-navbar-start">
          <Button
            variant="tertiary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={onMenuToggle}
          />
          <div className="prism-navbar-brand">
            <ScoreOrb />
            <div>
              <strong>{APP_NAME}</strong>
              <span>{APP_TAGLINE}</span>
            </div>
          </div>
        </div>

        <div className="prism-ticker" aria-label="Eval score ticker">
          {chips.map((chip) => (
            <span key={chip.label} className="prism-ticker-chip">
              <i className={`bi ${chip.icon}`} aria-hidden="true" />
              {chip.label} <strong>{chip.value}</strong>
            </span>
          ))}
        </div>

        <label className="prism-search-glass">
          <i className="bi bi-search" aria-hidden="true" />
          <Search
            value={query}
            placeholder="Search suites, models, owners…"
            onChange={(_, value) => setQuery(value)}
            onFocus={() => setPaletteOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                runSearch();
              }
            }}
          />
          <button type="button" className="prism-kbd-btn" onClick={() => setPaletteOpen(true)}>
            <Kbd>⌘K</Kbd>
          </button>
        </label>

        <div className="prism-navbar-end">
          <div className="prism-notify-wrap">
            <Button
              variant="tertiary"
              size="sm"
              icon="bell"
              iconOnly
              accessibleLabel="Notifications"
              onClick={() => setNotifyOpen(true)}
            />
            {notifications.unread ? (
              <span className="prism-notify-count" aria-hidden="true">
                {notifications.unread}
              </span>
            ) : null}
          </div>
          <Button size="sm" icon="plus" onClick={onRun}>
            Run evaluation
          </Button>
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
              <button type="button" className="prism-profile" title={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}>
                <Avatar name={SIGNED_IN_USER.name} size="sm" />
                <div className="prism-profile-copy">
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
                  description: 'Meera Poluru ended the Prism session.',
                  variant: 'info',
                })
              }
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
        <ul className="prism-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`prism-notify-item tone-${item.tone}`}
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
        heading="Jump to anything"
      >
        <label className="prism-palette-search">
          Search suites, owners, or pages
          <input
            autoFocus
            value={paletteQuery}
            onChange={(event) => setPaletteQuery(event.target.value)}
            placeholder="Lens, Meera Poluru, runs…"
          />
        </label>
        <ul className="prism-palette-list">
          {paletteHits.length ? (
            paletteHits.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => goCommand(item)}>
                  <strong>{item.label}</strong>
                  <span>{item.hint}</span>
                </button>
              </li>
            ))
          ) : (
            <li className="prism-note">Nothing matches. Try Lens or Meera Poluru.</li>
          )}
        </ul>
      </Modal>
    </header>
  );
}
