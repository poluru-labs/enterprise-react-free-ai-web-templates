import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  DropdownMenu,
  MenuItem,
  Search,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { APP_NAME, APP_TAGLINE, MEGA_MENU, SIDEBAR_ITEMS } from '../../constants/navigation.js';

function MegaPanel({ menu, onNavigate }) {
  return (
    <div className="fpl-mega-panel" role="menu">
      {menu.columns.map((column) => (
        <div key={column.heading} className="fpl-mega-col">
          <p className="fpl-mega-heading">{column.heading}</p>
          {column.items.map((item) => (
            <Link key={item.title} to={item.to} className="fpl-mega-item" onClick={onNavigate}>
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

  useEffect(() => {
    const onDoc = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpenId(null);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <header className="fpl-header" ref={wrapRef}>
      <div className="fpl-header-inner">
        <div className="fpl-header-left">
          <Button
            className="fpl-menu-btn"
            variant="secondary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel="Open menu"
            onClick={() => setMobileOpen(true)}
          />
          <Link to="/forecast/overview" className="fpl-wordmark">
            <span className="fpl-mark">P</span>
            <span>
              <strong>{APP_NAME}</strong>
              <em>{APP_TAGLINE}</em>
            </span>
          </Link>
        </div>

        <nav className="fpl-mega" aria-label="Primary">
          {MEGA_MENU.map((menu) => {
            const open = openId === menu.id;
            return (
              <div
                key={menu.id}
                className={`fpl-mega-root ${open ? 'is-open' : ''}`}
                onMouseEnter={() => setOpenId(menu.id)}
                onMouseLeave={() => setOpenId(null)}
              >
                <button
                  type="button"
                  className="fpl-mega-trigger"
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

        <div className="fpl-header-right">
          <div className="fpl-header-search">
            <Search
              placeholder="Search SKU or owner"
              size="sm"
              onChange={(_, value) => {
                if (value.length > 24) {
                  showToast({ title: 'Shorten the query', variant: 'info' });
                }
              }}
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast({ title: 'Signed in as Avery Poluru', variant: 'success' })}
          >
            Sign in
          </Button>
          <Button
            size="sm"
            icon="plus"
            onClick={() => {
              showToast({
                title: 'Scenario drafted',
                description: 'Priya Poluru will review assumptions.',
                variant: 'success',
              });
              navigate('/forecast/scenarios');
            }}
          >
            New scenario
          </Button>
          <DropdownMenu
            open={userOpen}
            onOpenChange={setUserOpen}
            trigger={
              <button type="button" className="fpl-avatar-btn" aria-label="Account">
                <Avatar name="Avery Poluru" size="sm" />
              </button>
            }
            onSelect={({ value }) => {
              if (value === 'settings') navigate('/forecast/settings');
              if (value === 'home') navigate('/forecast/overview');
              setUserOpen(false);
            }}
          >
            <MenuItem label="Home" value="home" />
            <MenuItem label="Settings" value="settings" />
          </DropdownMenu>
        </div>
      </div>

      <Drawer open={mobileOpen} onOpenChange={setMobileOpen} heading="Menu" side="left" size="sm">
        <div className="fpl-mobile-nav">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="fpl-mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Badge label="Avery Poluru" variant="brand" soft />
        </div>
      </Drawer>
    </header>
  );
}
