import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Button, DropdownMenu, MenuItem, showToast } from '@poluru-labs/enterprise-design-system-react';
import { APP_NAME, APP_TAGLINE, BASE_PATH, NAV_GROUPS, SIGNED_IN_USER } from '../../constants/navigation.js';

function ScoreOrb({ compact = false }) {
  const radius = 13;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - 0.946);
  return (
    <svg className={`prism-score-orb ${compact ? 'is-sm' : ''}`} viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r={radius} className="prism-score-track" />
      <circle
        cx="18"
        cy="18"
        r={radius}
        className="prism-score-ring"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 18 18)"
      />
      <text x="18" y="20.4" textAnchor="middle" className="prism-score-text">
        94.6
      </text>
    </svg>
  );
}

export function DashboardSidebar({ open, collapsed, onNavigate, onRun }) {
  const navigate = useNavigate();

  return (
    <aside
      className={`prism-sidebar ${open ? 'is-open' : ''} ${collapsed ? 'is-collapsed' : ''}`}
      aria-label="Dashboard"
    >
      <NavLink className="prism-brand" to={`${BASE_PATH}/overview`} onClick={onNavigate}>
        <ScoreOrb compact={collapsed} />
        <div className="prism-brand-copy">
          <strong>{APP_NAME}</strong>
          <span>{APP_TAGLINE}</span>
        </div>
      </NavLink>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="prism-nav-label">{group.label}</p>
          <nav className="prism-nav">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `prism-nav-link ${isActive ? 'is-active' : ''}`}
                onClick={onNavigate}
                title={item.label}
              >
                <i className={`bi ${item.icon}`} aria-hidden="true" />
                <span>
                  <em>{item.label}</em>
                  <small>{item.description}</small>
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      ))}

      <div className="prism-sidebar-foot">
        <div className="prism-quick-block">
          <Button size="sm" icon="plus" onClick={onRun}>
            Run evaluation
          </Button>
        </div>
        <DropdownMenu
          placement="top"
          trigger={
            <button className="prism-sidebar-profile" type="button">
              <Avatar name={SIGNED_IN_USER.name} size="sm" />
              <span>
                <strong>{SIGNED_IN_USER.name}</strong>
                <small>{SIGNED_IN_USER.role}</small>
              </span>
            </button>
          }
        >
          <MenuItem
            value="settings"
            label="Preferences"
            onSelect={() => {
              onNavigate?.();
              navigate(`${BASE_PATH}/settings`);
            }}
          />
          <MenuItem
            value="signout"
            label="Sign out"
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
        <div className="prism-health-chip">
          <span className="prism-pulse" />
          6 live suites · 94.6%
        </div>
        <p>Mock fixtures · last sync 11s ago</p>
      </div>
    </aside>
  );
}
