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
  Select,
  showToast,
  useTheme,
} from '@poluru-labs/enterprise-design-system-react';
import {
  APP_NAME,
  BASE_PATH,
  CURRENT_USER,
  NAV_ITEMS,
  TIME_RANGE_OPTIONS,
} from '../../constants/navigation.js';
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatDateTime } from '../../lib/format.js';
import { searchCatalog } from '../../lib/search.js';
import { searchWorkspace } from '../../lib/workspaceSearch.js';
import notifications from '../../data/notifications.json';
import overview from '../../data/overview.json';
import cost from '../../data/cost.json';

export function DashboardNavbar({ onMenuToggle, sectionLabel }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { open: commandOpen, setOpen: setCommandOpen } = useCommandPalette();
  const [query, setQuery] = useState('');
  const [paletteQuery, setPaletteQuery] = useState('');
  const [timeRange, setTimeRange] = useState('24h');
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const catalog = useMemo(() => {
    const pages = NAV_ITEMS.map((item) => ({
      id: item.to,
      kind: 'Page',
      title: item.label,
      detail: item.description,
      href: item.to,
    }));
    return pages;
  }, []);

  const paletteHits = useMemo(() => {
    const needle = paletteQuery.trim();
    if (!needle) return catalog.slice(0, 8);
    const pageHits = searchCatalog(catalog, needle);
    const dataHits = searchWorkspace(needle).slice(0, 8);
    return [...pageHits, ...dataHits].slice(0, 12);
  }, [catalog, paletteQuery]);

  const runSearch = () => {
    const next = query.trim();
    if (!next) return;
    navigate(`${BASE_PATH}/search?q=${encodeURIComponent(next)}`);
  };

  const chips = [
    { label: 'Completion', value: overview.headerPulse.completion, hint: 'SLO' },
    { label: 'Alerts', value: overview.headerPulse.alerts, hint: 'open' },
    { label: 'Spend', value: `$${Math.round(cost.summary.spendToday)}`, hint: 'today' },
    { label: 'p95', value: overview.headerPulse.p95, hint: 'latency' },
  ];

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
            <strong>{APP_NAME}</strong>
            <span>{sectionLabel || 'Agent monitoring'}</span>
          </div>
        </div>
      </div>

      <div className="amd-command-strip" aria-label="Fleet pulse">
        {chips.map((chip) => (
          <div key={chip.label} className="amd-command-chip">
            <span>{chip.label}</span>
            <strong>{chip.value}</strong>
            <em>{chip.hint}</em>
          </div>
        ))}
      </div>

      <div className="amd-navbar-search">
        <Search
          placeholder="Search agents, traces, incidents…"
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
          onFocus={() => setCommandOpen(true)}
          clearable
        />
      </div>

      <div className="amd-navbar-end">
        <Select
          aria-label="Time range"
          size="sm"
          options={TIME_RANGE_OPTIONS}
          value={timeRange}
          onChange={(event) => setTimeRange(event.target.value)}
        />
        <Button
          variant="secondary"
          size="sm"
          accessibleLabel="Open command palette"
          onClick={() => setCommandOpen(true)}
        >
          <Kbd>⌘K</Kbd>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          accessibleLabel={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={toggleTheme}
        >
          <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`} aria-hidden="true" />
        </Button>
        <div className="amd-notify-wrap">
          <Button
            variant="secondary"
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
        <DropdownMenu
          open={menuOpen}
          onOpenChange={setMenuOpen}
          placement="bottom"
          trigger={
            <button type="button" className="amd-profile" aria-label={`${CURRENT_USER.name} menu`}>
              <Avatar name={CURRENT_USER.name} size="sm" />
              <div className="amd-profile-copy">
                <strong>{CURRENT_USER.name}</strong>
                <span>{CURRENT_USER.role}</span>
              </div>
            </button>
          }
        >
          <MenuItem label="Settings" value="settings" onSelect={() => navigate(`${BASE_PATH}/settings`)} />
          <MenuItem label="Incidents" value="incidents" onSelect={() => navigate(`${BASE_PATH}/incidents`)} />
          <MenuItem
            label="Sign out"
            value="signout"
            danger
            onSelect={() => showToast({ title: 'Signed out', description: CURRENT_USER.name, variant: 'info' })}
          />
        </DropdownMenu>
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

      <Modal
        open={commandOpen}
        onOpenChange={(open) => {
          setCommandOpen(open);
          if (!open) setPaletteQuery('');
        }}
        heading="Jump across AgentPulse"
      >
        <Search
          placeholder="Agents, incidents, tools, pages…"
          value={paletteQuery}
          onChange={(_, value) => setPaletteQuery(value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && paletteHits[0]) {
              event.preventDefault();
              setCommandOpen(false);
              navigate(paletteHits[0].href);
            }
          }}
          clearable
          onClear={() => setPaletteQuery('')}
        />
        <ul className="amd-cmd-list">
          {paletteHits.map((hit) => (
            <li key={`${hit.kind}-${hit.id}`}>
              <button
                type="button"
                onClick={() => {
                  setCommandOpen(false);
                  navigate(hit.href);
                }}
              >
                <small>{hit.kind}</small>
                <strong>{hit.title}</strong>
                <span>{hit.detail}</span>
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </header>
  );
}
