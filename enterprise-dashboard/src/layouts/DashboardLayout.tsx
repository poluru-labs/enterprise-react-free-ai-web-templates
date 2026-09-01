import { useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  DropdownMenu,
  MenuItem,
  Modal,
  Search,
  SideNav,
  Tag,
  type SideNavItem,
} from '@poluru-labs/enterprise-design-system-react';
import { buildSearchIndex, notifications } from '../data/mock';
import './DashboardLayout.scss';

const navItems: Array<SideNavItem & { path: string }> = [
  { label: 'Overview', path: '/', icon: 'home' },
  { label: 'Facilities', path: '/facilities', icon: 'folder' },
  { label: 'Infrastructure', path: '/infrastructure', icon: 'link' },
  { label: 'Power & cooling', path: '/power', icon: 'refresh' },
  { label: 'Capacity', path: '/capacity', icon: 'star' },
  { label: 'Maintenance', path: '/maintenance', icon: 'calendar' },
  { label: 'Alerts', path: '/alerts', icon: 'bell' },
  { label: 'Tickets', path: '/tickets', icon: 'file' },
  { label: 'Settings', path: '/settings', icon: 'settings' },
];

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const searchIndex = useMemo(() => buildSearchIndex(), []);
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return searchIndex.slice(0, 6);
    return searchIndex
      .filter(
        (hit) =>
          hit.title.toLowerCase().includes(q) ||
          hit.subtitle.toLowerCase().includes(q) ||
          hit.type.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [searchIndex, searchQuery]);

  const items: SideNavItem[] = navItems.map((item) => ({
    label: item.label,
    icon: item.icon,
    active: item.path === location.pathname,
  }));

  const current =
    navItems.find((item) => item.path === location.pathname)?.label ?? 'Overview';
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div className={`dashboard ${collapsed ? 'dashboard--collapsed' : ''}`}>
      <aside className="dashboard__sidebar">
        <div className="dashboard__brand">
          <span className="dashboard__brand-mark" aria-hidden="true" />
          {!collapsed ? (
            <div className="dashboard__brand-text">
              <strong>Poluru DC</strong>
              <span>Data Center Ops</span>
            </div>
          ) : null}
        </div>

        <SideNav
          className="dashboard__sidenav"
          collapsed={collapsed}
          items={items}
          onNavigate={(label) => {
            const match = navItems.find((item) => item.label === label);
            if (match) navigate(match.path);
          }}
        />

        <div className="dashboard__sidebar-foot">
          {!collapsed ? (
            <>
              <Badge label="Live fleet" variant="brand" soft pill />
              <p>Monitoring 12 facilities · US regions</p>
            </>
          ) : null}
          <Button
            variant="tertiary"
            size="sm"
            icon={collapsed ? 'chevron-right' : 'chevron-left'}
            iconOnly={collapsed}
            accessibleLabel={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? null : 'Collapse'}
          </Button>
        </div>
      </aside>

      <div className="dashboard__main">
        <header className="dashboard__header">
          <div className="dashboard__header-left">
            <nav className="dashboard__crumbs" aria-label="Breadcrumb">
              <NavLink to="/">Operations</NavLink>
              <span aria-hidden="true">/</span>
              <span>{current}</span>
            </nav>
            <h1 className="dashboard__title">{current}</h1>
          </div>

          <div className="dashboard__header-actions">
            <div className="dashboard__search-trigger">
              <Search
                placeholder="Search racks, hosts…"
                size="sm"
                aria-label="Open search"
                onFocus={() => setSearchOpen(true)}
                onClick={() => setSearchOpen(true)}
                readOnly
              />
            </div>
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
            <DropdownMenu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              placement="bottom"
              trigger={
                <button type="button" className="dashboard__avatar-btn" aria-label="Account menu">
                  <Avatar name="Alex Rivera" size="sm" />
                </button>
              }
              onSelect={({ value }) => {
                setMenuOpen(false);
                if (value === 'settings') navigate('/settings');
                if (value === 'tickets') navigate('/tickets');
              }}
            >
              <MenuItem label="Settings" value="settings" />
              <MenuItem label="My tickets" value="tickets" />
              <MenuItem label="Sign out" value="signout" danger />
            </DropdownMenu>
          </div>
        </header>

        <main className="dashboard__content">{children}</main>
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
          onChange={(_e, value) => setSearchQuery(value)}
          autoFocus
        />
        <ul className="search-results">
          {searchResults.map((hit) => (
            <li key={`${hit.type}-${hit.id}`}>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                  navigate(hit.path);
                }}
              >
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
              <strong>{item.title}</strong>
              <span className="muted">{item.time}</span>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
}
