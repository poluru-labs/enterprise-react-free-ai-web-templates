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
  Search,
  Select,
  Tag,
  showToast,
  useTheme,
} from '@poluru-labs/enterprise-design-system-react';
import { COMMAND_ITEMS, SIGNED_IN_USER, SITE_COUNT_LABEL } from '../../constants/navigation';
import { ackFirstCritical, buildSearchIndex, coolingSparkline, facilities, fleetPue, notifications } from '../../data';
import { useCommandPalette } from '../../hooks/useCommandPalette';
import { searchGroups, searchRecords } from '../../lib/search';
import { Sparkline } from '../charts/Sparkline';

export function DashboardNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [paletteQuery, setPaletteQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const facilityFromPath = location.pathname.startsWith('/facilities/')
    ? location.pathname.split('/')[2]
    : undefined;
  const selectedFacility =
    facilityFromPath && facilities.some((facility) => facility.id === facilityFromPath)
      ? facilityFromPath
      : 'all';

  const searchIndex = useMemo(() => buildSearchIndex(), []);
  const searchResults = useMemo(
    () => searchRecords(searchIndex, searchQuery, ['title', 'subtitle', 'type']).slice(0, 8),
    [searchIndex, searchQuery],
  );

  const paletteGroups = useMemo(() => {
    const grouped = ['Go to', 'Facilities', 'Tickets'].map((group) => ({
      group,
      items: COMMAND_ITEMS.filter((item) => item.group === group),
    }));
    return searchGroups(grouped, paletteQuery);
  }, [paletteQuery]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable);
      if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const unread = notifications.filter((item) => item.unread).length;

  const goSearch = (path: string) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(path);
  };

  const ackCritical = () => {
    const alert = ackFirstCritical();
    if (!alert) {
      showToast({ title: 'No unacked critical alerts', variant: 'info' });
      return;
    }
    showToast({
      title: 'Critical alert acknowledged',
      description: alert.title,
      variant: 'success',
    });
  };

  return (
    <header className="dashboard__header">
      <div className="dashboard__header-left">
        <Select
          size="sm"
          aria-label="Facility switcher"
          value={selectedFacility}
          onChange={(event) => {
            const next = event.target.value;
            navigate(next === 'all' ? '/facilities' : `/facilities/${next}`);
          }}
          options={[
            { label: 'All facilities', value: 'all' },
            ...facilities.map((facility) => ({ label: facility.name, value: facility.id })),
          ]}
        />
      </div>

      <div className="dashboard__telemetry" aria-label="Live fleet telemetry">
        <span className="dashboard__live-dot" aria-hidden="true" />
        <span className="dashboard__pue">
          PUE <strong>{fleetPue.toFixed(2)}</strong>
        </span>
        <Sparkline values={coolingSparkline} color="#30AFFF" width={72} height={22} />
        <span className="dashboard__sites">{SITE_COUNT_LABEL}</span>
      </div>

      <button
        type="button"
        className="dashboard__search"
        onClick={() => setSearchOpen(true)}
        aria-label="Open search"
      >
        <span>Search racks, hosts, tickets</span>
        <Kbd>/</Kbd>
      </button>

      <div className="dashboard__header-actions">
        <Button
          variant="tertiary"
          size="sm"
          icon={theme === 'dark' ? 'eye' : 'eye-off'}
          iconOnly
          accessibleLabel={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={toggleTheme}
        />
        <div className="dashboard__notif-wrap">
          <Button
            variant="secondary"
            size="sm"
            icon="bell"
            iconOnly
            accessibleLabel="Notifications"
            onClick={() => setNotifOpen(true)}
          />
          {unread > 0 ? (
            <span className="dashboard__notif-dot" aria-hidden="true">
              {unread}
            </span>
          ) : null}
        </div>
        <Button variant="primary" size="sm" icon="check" onClick={ackCritical}>
          Ack critical
        </Button>
        <DropdownMenu
          open={menuOpen}
          onOpenChange={setMenuOpen}
          placement="bottom"
          trigger={
            <button
              type="button"
              className="dashboard__avatar-btn"
              aria-label={`${SIGNED_IN_USER.name}, ${SIGNED_IN_USER.role}`}
            >
              <Avatar name={SIGNED_IN_USER.name} size="sm" />
              <span className="dashboard__avatar-copy">
                <strong>{SIGNED_IN_USER.name}</strong>
                <span>{SIGNED_IN_USER.role}</span>
              </span>
            </button>
          }
          onSelect={({ value }) => {
            setMenuOpen(false);
            if (value === 'settings') navigate('/settings');
            if (value === 'tickets') navigate('/tickets');
            if (value === 'palette') setPaletteOpen(true);
          }}
        >
          <MenuItem label="Settings" value="settings" />
          <MenuItem label="My tickets" value="tickets" />
          <MenuItem label="Command palette" value="palette" />
          <MenuItem label="Sign out" value="signout" danger />
        </DropdownMenu>
      </div>

      <Modal
        open={searchOpen}
        onOpenChange={(open) => {
          setSearchOpen(open);
          if (!open) setSearchQuery('');
        }}
        heading="Search operations"
      >
        <Search
          placeholder="Facilities, hosts, alerts, tickets…"
          value={searchQuery}
          onChange={(_event, value) => setSearchQuery(value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && searchQuery.trim()) {
              event.preventDefault();
              goSearch(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            }
          }}
          autoFocus
        />
        <ul className="search-results">
          {searchResults.map((hit) => (
            <li key={`${hit.type}-${hit.id}`}>
              <button type="button" onClick={() => goSearch(hit.path)}>
                <Tag label={hit.type} variant="brand" />
                <span>
                  <strong>{hit.title}</strong>
                  <span className="muted">{hit.subtitle}</span>
                </span>
              </button>
            </li>
          ))}
          {searchResults.length === 0 ? (
            <li className="search-results__empty">No matches for “{searchQuery}”</li>
          ) : null}
        </ul>
      </Modal>

      <Modal
        open={paletteOpen}
        onOpenChange={(open) => {
          setPaletteOpen(open);
          if (!open) setPaletteQuery('');
        }}
        heading="Command palette"
      >
        <Search
          placeholder="Jump to pages, facilities, tickets…"
          value={paletteQuery}
          onChange={(_event, value) => setPaletteQuery(value)}
          autoFocus
        />
        <ul className="search-results">
          {paletteGroups.flatMap((group) =>
            group.items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setPaletteOpen(false);
                    setPaletteQuery('');
                    navigate(item.to);
                  }}
                >
                  <Tag label={group.group ?? item.group} variant="neutral" />
                  <span>
                    <strong>{item.label}</strong>
                    <span className="muted">{item.hint}</span>
                  </span>
                </button>
              </li>
            )),
          )}
          {paletteGroups.length === 0 ? (
            <li className="search-results__empty">No commands for “{paletteQuery}”</li>
          ) : null}
        </ul>
      </Modal>

      <Drawer
        open={notifOpen}
        onOpenChange={setNotifOpen}
        heading="Notifications"
        side="right"
        footer={
          <Button variant="tertiary" onClick={() => setNotifOpen(false)}>
            Close
          </Button>
        }
      >
        <ul className="notif-list">
          {notifications.map((item) => (
            <li key={item.id} className={item.unread ? 'is-unread' : undefined}>
              <button
                type="button"
                onClick={() => {
                  setNotifOpen(false);
                  navigate(item.path);
                }}
              >
                <strong>{item.title}</strong>
                <span className="muted">{item.time}</span>
              </button>
            </li>
          ))}
        </ul>
      </Drawer>
    </header>
  );
}
