import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Drawer,
  DropdownMenu,
  Input,
  Kbd,
  MenuItem,
  Modal,
  SegmentedControl,
  Select,
  showToast,
  useTheme,
} from '@poluru-labs/enterprise-design-system-react';
import {
  APP_NAME,
  APP_TAGLINE,
  BASE_PATH,
  COMMAND_ITEMS,
  PRODUCT_SWITCHER,
  ROLE_OPTIONS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import overview from '../../data/overview.json';
import notifications from '../../data/notifications.json';
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatDateTime } from '../../lib/format.js';
import { searchRecords } from '../../lib/search.js';
import { NexusMark } from './DashboardSidebar.jsx';

function switcherValue(pathname) {
  if (pathname.includes('/billing') || pathname.includes('/usage') || pathname.includes('/plans')) {
    return 'billing';
  }
  if (pathname.includes('/audit') || pathname.includes('/flags') || pathname.includes('/settings')) {
    return 'security';
  }
  return 'platform';
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
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const ribbon = overview.ribbon;
  const segment = switcherValue(location.pathname);

  const paletteHits = useMemo(
    () => searchRecords(COMMAND_ITEMS, paletteQuery, ['label', 'hint', 'group']),
    [paletteQuery],
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('invite') === '1') {
      setInviteOpen(true);
    }
  }, [location.search]);

  useEffect(() => {
    const openInvite = () => setInviteOpen(true);
    window.addEventListener('nx:invite', openInvite);
    return () => window.removeEventListener('nx:invite', openInvite);
  }, []);

  const submitInvite = () => {
    if (!inviteName.trim() || !inviteEmail.trim()) {
      showToast({
        title: 'Name and email required',
        description: 'Add both before Nexus can send the seat.',
        variant: 'warning',
      });
      return;
    }
    const roleLabel = ROLE_OPTIONS.find((item) => item.value === inviteRole)?.label;
    showToast({
      title: 'Invite sent',
      description: `${inviteName} will join as ${roleLabel}.`,
      variant: 'success',
    });
    setInviteOpen(false);
    setInviteName('');
    setInviteEmail('');
    setInviteRole('member');
    navigate(`${BASE_PATH}/users`);
  };

  const goSearch = () => {
    const next = query.trim();
    navigate(next ? `${BASE_PATH}/search?q=${encodeURIComponent(next)}` : `${BASE_PATH}/search`);
  };

  const goCommand = (item) => {
    setPaletteOpen(false);
    setPaletteQuery('');
    if (item.id === 'invite-user') {
      setInviteOpen(true);
      return;
    }
    navigate(item.to);
  };

  return (
    <header className="nx-navbar">
      <div className="nx-navbar-inner">
        <div className="nx-navbar-start">
          <Button
            className="nx-menu-btn"
            variant="secondary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel="Open navigation"
            onClick={onMenuToggle}
          />
          <div className="nx-navbar-brand">
            <NexusMark className="nx-mark nx-mark-sm" />
            <div>
              <strong>{APP_NAME}</strong>
              <span>{APP_TAGLINE}</span>
            </div>
          </div>
        </div>

        <div className="nx-navbar-center">
          <label className="nx-pill-search">
            <i className="bi bi-search" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search tenants, users, invoices"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => {
                setPaletteQuery(query);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  goSearch();
                }
              }}
              aria-label="Search tenants, users, invoices"
            />
            <button type="button" className="nx-kbd-btn" onClick={() => setPaletteOpen(true)}>
              <Kbd>⌘K</Kbd>
            </button>
          </label>
          <div className="nx-kpi-ribbon" aria-label="Workspace KPIs">
            <span>
              MRR <strong>{ribbon.mrr}</strong>
            </span>
            <span>
              Churn <strong>{ribbon.churn}</strong>
            </span>
            <span>
              Seats used <strong>{ribbon.seats}</strong>
            </span>
            <span>
              Failed invoices <strong>{ribbon.failedInvoices}</strong>
            </span>
          </div>
        </div>

        <div className="nx-navbar-end">
          <SegmentedControl
            size="sm"
            className="nx-switcher"
            value={segment}
            onChange={(value) => {
              const next = PRODUCT_SWITCHER.find((item) => item.value === value);
              if (next) navigate(next.to);
            }}
            options={PRODUCT_SWITCHER.map((item) => ({ value: item.value, label: item.label }))}
          />
          <Button
            variant="tertiary"
            size="sm"
            accessibleLabel={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggleTheme}
          >
            <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`} aria-hidden="true" />
          </Button>
          <div className="nx-notify-wrap">
            <Button
              variant="tertiary"
              size="sm"
              icon="bell"
              iconOnly
              accessibleLabel="Notifications"
              onClick={() => setNotifyOpen(true)}
            />
            {notifications.unread ? (
              <span className="nx-notify-count" aria-hidden="true">
                {notifications.unread}
              </span>
            ) : null}
          </div>
          <Button size="sm" icon="user" onClick={() => setInviteOpen(true)}>
            Invite user
          </Button>
          <DropdownMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            trigger={
              <button type="button" className="nx-profile" title={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}>
                <Avatar name={SIGNED_IN_USER.name} size="sm" />
                <div className="nx-profile-copy">
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
      <div className="nx-navbar-rule" aria-hidden="true" />

      <Drawer
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        heading={`${notifications.unread} unread alerts`}
        size="md"
      >
        <p className="nx-subtle">Lakshmi Poluru · last sync 3 min ago</p>
        <ul className="nx-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nx-notify-item tone-${item.tone}`}
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
        <label className="nx-palette-search">
          Search pages and actions
          <input
            autoFocus
            value={paletteQuery}
            onChange={(event) => setPaletteQuery(event.target.value)}
            placeholder="Tenants, invoices, invite…"
          />
        </label>
        <ul className="nx-palette-list">
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

      <Modal
        open={inviteOpen}
        onOpenChange={(open) => {
          setInviteOpen(open);
          if (!open) {
            setInviteName('');
            setInviteEmail('');
            setInviteRole('member');
          }
        }}
        heading="Invite user"
        footer={(
          <>
            <Button variant="secondary" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitInvite}>Send invite</Button>
          </>
        )}
      >
        <div className="nx-form-stack">
          <Input
            label="Full name"
            value={inviteName}
            placeholder="Ananya Poluru"
            onChange={(event) => setInviteName(event.target.value)}
          />
          <Input
            label="Work email"
            type="email"
            value={inviteEmail}
            placeholder="ananya.poluru@northwind.example"
            onChange={(event) => setInviteEmail(event.target.value)}
          />
          <Select
            label="Role"
            value={inviteRole}
            onChange={(event) => setInviteRole(event.target.value)}
            options={ROLE_OPTIONS}
          />
        </div>
      </Modal>
    </header>
  );
}
