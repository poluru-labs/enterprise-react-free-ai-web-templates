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
import runsData from '../../data/runs.json';
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatDateTime } from '../../lib/format.js';
import { searchRecords } from '../../lib/search.js';
import { FlameMark } from './FlameMark.jsx';

function GpuMeter({ sku, util, region }) {
  const heat =
    util >= 90 ? '#9A3412' : util >= 70 ? '#de3e3e' : util >= 50 ? '#EA580C' : '#F59E0B';

  return (
    <div className="kiln-gpu-meter">
      <div className="kiln-gpu-meter-meta">
        <strong>{sku}</strong>
        <span>{region}</span>
        <em>{util}%</em>
      </div>
      <div className="kiln-gpu-meter-track" aria-hidden="true">
        <div className="kiln-gpu-meter-fill" style={{ width: `${util}%`, background: heat }} />
      </div>
    </div>
  );
}

export function DashboardNavbar({ onMenuToggle, onLaunch, onUpload }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();
  const [query, setQuery] = useState('');
  const [paletteQuery, setPaletteQuery] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const ticker = overview.ticker;
  const meters = overview.gpuMeters;

  const paletteHits = useMemo(
    () => searchRecords(COMMAND_ITEMS, paletteQuery, ['label', 'hint', 'group']),
    [paletteQuery],
  );

  const runSearch = () => {
    const next = query.trim();
    if (!next) return;
    const match = searchRecords(runsData.items, next, ['name', 'experiment', 'owner', 'id']);
    if (match.length === 1) {
      navigate(`${BASE_PATH}/runs/${match[0].id}`);
      return;
    }
    navigate(`${BASE_PATH}/runs?q=${encodeURIComponent(next)}`);
  };

  const goCommand = (item) => {
    setPaletteOpen(false);
    setPaletteQuery('');
    if (item.id === 'launch-run') {
      onLaunch?.();
      return;
    }
    if (item.id === 'upload-dataset') {
      onUpload?.();
      return;
    }
    navigate(item.to);
  };

  return (
    <header className="kiln-navbar">
      <div className="kiln-navbar-heat" aria-hidden="true" />
      <div className="kiln-navbar-inner">
        <div className="kiln-navbar-start">
          <Button
            className="kiln-menu-btn"
            variant="secondary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel="Open navigation"
            onClick={onMenuToggle}
          />
          <div className="kiln-navbar-brand">
            <FlameMark className="kiln-flame kiln-flame-sm" />
            <div>
              <strong>{APP_NAME}</strong>
              <span>{APP_TAGLINE}</span>
            </div>
          </div>
        </div>

        <div className="kiln-gpu-meters" aria-label="GPU utilization">
          {meters.map((meter) => (
            <GpuMeter key={meter.id} sku={meter.sku} util={meter.util} region={meter.region} />
          ))}
        </div>

        <div className="kiln-ticker" aria-label="Foundry ticker">
          <span className="kiln-ticker-chip">
            <i className="bi bi-fire" aria-hidden="true" />
            <strong>{ticker.liveRuns}</strong> live runs
          </span>
          <span className="kiln-ticker-chip">
            <i className="bi bi-hourglass-split" aria-hidden="true" />
            queue <strong>{ticker.queueWaitMinutes}m</strong>
          </span>
          <span className="kiln-ticker-chip">
            <i className="bi bi-bullseye" aria-hidden="true" />
            val <strong>{ticker.valAccuracy}%</strong>
          </span>
        </div>

        <label className="kiln-sand-search">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search runs, experiments, owners"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                runSearch();
              }
            }}
            aria-label="Search the foundry"
          />
          <button type="button" className="kiln-kbd-btn" onClick={() => setPaletteOpen(true)}>
            <Kbd>⌘K</Kbd>
          </button>
        </label>

        <div className="kiln-navbar-end">
          <Button size="sm" icon="plus" onClick={onLaunch}>
            Launch run
          </Button>
          <div className="kiln-notify-wrap">
            <Button
              variant="tertiary"
              size="sm"
              icon="bell"
              iconOnly
              accessibleLabel="Notifications"
              onClick={() => setNotifyOpen(true)}
            />
            {notifications.unread ? (
              <span className="kiln-notify-count" aria-hidden="true">
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
              <button type="button" className="kiln-profile" title={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}>
                <Avatar name={SIGNED_IN_USER.name} size="sm" />
                <div className="kiln-profile-copy">
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
              onSelect={() => {
                setMenuOpen(false);
                showToast({
                  title: 'Signed out',
                  description: 'Kavya Poluru ended the Kiln session.',
                  variant: 'info',
                });
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
        <ul className="kiln-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`kiln-notify-item tone-${item.tone}`}
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
        <label className="kiln-palette-search">
          Search pages and actions
          <input
            autoFocus
            value={paletteQuery}
            onChange={(event) => setPaletteQuery(event.target.value)}
            placeholder="Harbor, clusters, launch run…"
          />
        </label>
        <ul className="kiln-palette-list">
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
