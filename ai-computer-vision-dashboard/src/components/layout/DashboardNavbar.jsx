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
import notifications from '../../data/notifications.json';
import telemetry from '../../data/telemetry.json';
import camerasData from '../../data/cameras.json';
import modelsData from '../../data/models.json';
import incidentsData from '../../data/incidents.json';

function IrisMark() {
  return (
    <span className="cvd-iris" aria-hidden="true">
      <span className="cvd-iris-ring" />
      <span className="cvd-iris-core" />
    </span>
  );
}

export function DashboardNavbar({ onMenuToggle, sectionLabel }) {
  const navigate = useNavigate();
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
    const cameras = camerasData.cameras.map((camera) => ({
      id: camera.id,
      kind: 'Camera',
      title: camera.code,
      detail: `${camera.name} · ${camera.site}`,
      status: camera.status,
      href: `${BASE_PATH}/cameras`,
    }));
    const models = modelsData.models.map((model) => ({
      id: model.id,
      kind: 'Model',
      title: model.name,
      detail: `v${model.version} · ${model.task}`,
      status: model.status,
      href: `${BASE_PATH}/models`,
    }));
    const incidents = incidentsData.incidents.map((incident) => ({
      id: incident.id,
      kind: 'Incident',
      title: incident.title,
      detail: `${incident.id} · ${incident.site}`,
      status: incident.status,
      href: `${BASE_PATH}/incidents`,
    }));
    return [...pages, ...cameras, ...models, ...incidents];
  }, []);

  const paletteHits = useMemo(() => {
    const needle = paletteQuery.trim();
    if (!needle) return catalog.slice(0, 8);
    return searchCatalog(catalog, needle).slice(0, 10);
  }, [catalog, paletteQuery]);

  const runSearch = (value = query) => {
    const next = value.trim();
    if (!next) return;
    navigate(`${BASE_PATH}/search?q=${encodeURIComponent(next)}`);
  };

  const chips = [
    { label: 'Cameras live', value: telemetry.camerasLive, icon: 'bi-camera-video' },
    { label: 'FPS', value: telemetry.fps, icon: 'bi-speedometer2' },
    { label: 'GPU', value: `${telemetry.gpu}%`, icon: 'bi-gpu-card' },
    { label: 'Incidents', value: telemetry.incidents, icon: 'bi-exclamation-octagon' },
  ];

  return (
    <header className="cvd-navbar">
      <div className="cvd-navbar-left">
        <Button
          className="cvd-menu-btn"
          variant="secondary"
          size="sm"
          icon="menu"
          iconOnly
          accessibleLabel="Open navigation"
          onClick={onMenuToggle}
        />
        <IrisMark />
        <div className="cvd-navbar-identity">
          <strong>{APP_NAME}</strong>
          <span>{sectionLabel || 'Overview'}</span>
        </div>
      </div>

      <div className="cvd-telemetry" aria-label="Live telemetry">
        {chips.map((chip) => (
          <div key={chip.label} className="cvd-chip">
            <i className={`bi ${chip.icon}`} aria-hidden="true" />
            <em>{chip.label}</em>
            <strong>{chip.value}</strong>
          </div>
        ))}
      </div>

      <div className="cvd-navbar-tools">
        <div className="cvd-search-pill">
          <Search
            placeholder="Find a camera or model"
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
          icon="refresh"
          accessibleLabel="Refresh telemetry"
          onClick={() => showToast({ title: 'Streams refreshed', variant: 'info' })}
        >
          Refresh
        </Button>
        <Button
          variant="secondary"
          size="sm"
          accessibleLabel="Open command palette"
          onClick={() => setCommandOpen(true)}
        >
          <Kbd keys="⌘K" />
        </Button>
        <div className="cvd-notify-wrap">
          <Button
            variant="secondary"
            size="sm"
            icon="bell"
            iconOnly
            accessibleLabel="Notifications"
            onClick={() => setNotifyOpen(true)}
          />
          {notifications.unread ? (
            <span className="cvd-notify-count" aria-hidden="true">
              {notifications.unread}
            </span>
          ) : null}
        </div>
        <DropdownMenu
          open={menuOpen}
          onOpenChange={setMenuOpen}
          placement="bottom"
          trigger={
            <button type="button" className="cvd-avatar-btn" aria-label={`${CURRENT_USER.name} menu`}>
              <Avatar name={CURRENT_USER.name} size="sm" />
              <span className="cvd-avatar-copy">
                <strong>{CURRENT_USER.name}</strong>
                <em>{CURRENT_USER.role}</em>
              </span>
            </button>
          }
        >
          <MenuItem
            value="profile"
            label="Profile"
            onSelect={() => showToast({ title: `${CURRENT_USER.name} · signed in`, variant: 'info' })}
          />
          <MenuItem
            value="settings"
            label="Workspace settings"
            onSelect={() => navigate(`${BASE_PATH}/settings`)}
          />
          <MenuItem
            value="signout"
            label="Sign out"
            danger
            onSelect={() => showToast({ title: 'Signed out', description: CURRENT_USER.name, variant: 'info' })}
          />
        </DropdownMenu>
      </div>

      <Drawer
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        heading={`${notifications.unread} unread vision alerts`}
        size="md"
      >
        <ul className="cvd-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`cvd-notify-item tone-${item.tone}`}
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

      <Modal open={commandOpen} onOpenChange={setCommandOpen} heading="Jump across Sightline">
        <Search
          placeholder="Cameras, models, incidents, pages…"
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
        <ul className="cvd-cmd-list">
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
