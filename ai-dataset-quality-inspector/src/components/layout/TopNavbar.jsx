import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  DropdownMenu,
  Kbd,
  MenuItem,
  Search,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { APP_NAME, APP_TAGLINE, BASE_PATH, MEGA_MENU, SIDEBAR_ITEMS } from '../../constants/navigation.js';

function MegaPanel({ menu, onNavigate }) {
  return (
    <div className="qual-mega-panel" role="menu">
      {menu.columns.map((column) => (
        <div key={column.heading}>
          <p className="qual-mega-heading">{column.heading}</p>
          {column.items.map((item) => (
            <Link key={item.title} to={item.to} className="qual-mega-item" onClick={onNavigate}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TopNavbar() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const onDoc = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) setOpenId(null);
    };
    const onKey = (event) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      event.preventDefault();
      searchRef.current?.focus();
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className="qual-header" ref={wrapRef}>
      <div className="qual-header-inner">
        <div className="qual-header-left">
          <Button
            className="qual-menu-btn"
            variant="secondary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel="Open menu"
            onClick={() => setMobileOpen(true)}
          />
          <Link to={`${BASE_PATH}/overview`} className="qual-wordmark">
            <span className="qual-mark">F</span>
            <span>
              <strong>{APP_NAME}</strong>
              <em>{APP_TAGLINE}</em>
            </span>
          </Link>
        </div>

        <nav className="qual-mega" aria-label="Primary">
          {MEGA_MENU.map((menu) => {
            const open = openId === menu.id;
            return (
              <div
                key={menu.id}
                className={`qual-mega-root ${open ? 'is-open' : ''}`}
                onMouseEnter={() => setOpenId(menu.id)}
                onMouseLeave={() => setOpenId(null)}
              >
                <button
                  type="button"
                  className="qual-mega-trigger"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : menu.id)}
                >
                  {menu.label}
                </button>
                {open ? <MegaPanel menu={menu} onNavigate={() => setOpenId(null)} /> : null}
              </div>
            );
          })}
        </nav>

        <div className="qual-header-right">
          <div className="qual-header-search">
            <div className="qual-search-wrap">
              <Search
                ref={searchRef}
                placeholder="Search schemas or tables"
                size="sm"
                onKeyDown={(event) => {
                  if (event.key !== 'Enter') return;
                  const value = event.currentTarget.value.trim();
                  navigate(`${BASE_PATH}/schemas?q=${encodeURIComponent(value)}`);
                }}
              />
              <Kbd>/</Kbd>
            </div>
          </div>
          <div className="qual-header-actions">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => showToast({ title: 'Signed in as Leela Poluru', variant: 'success' })}
            >
              Sign in
            </Button>
            <Button
              size="sm"
              icon="plus"
              onClick={() => {
                showToast({
                  title: 'Scan queued',
                  description: 'Leela Poluru reviews schema run.',
                  variant: 'success',
                });
                navigate(`${BASE_PATH}/schemas`);
              }}
            >
              Run schema scan
            </Button>
          </div>
          <DropdownMenu
            open={userOpen}
            onOpenChange={setUserOpen}
            trigger={
              <button type="button" className="qual-avatar-btn" aria-label="Account menu">
                <Avatar name="Leela Poluru" size="sm" />
              </button>
            }
            onSelect={({ value }) => {
              if (value === 'settings') navigate(`${BASE_PATH}/settings`);
              if (value === 'home') navigate(`${BASE_PATH}/overview`);
              setUserOpen(false);
            }}
          >
            <MenuItem label="Home" value="home" />
            <MenuItem label="Settings" value="settings" />
          </DropdownMenu>
        </div>
      </div>

      <Drawer open={mobileOpen} onOpenChange={setMobileOpen} heading="Menu" side="left" size="sm">
        <div className="qual-mobile-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="qual-mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Badge label="Leela Poluru" variant="brand" soft />
        </div>
      </Drawer>
    </header>
  );
}
