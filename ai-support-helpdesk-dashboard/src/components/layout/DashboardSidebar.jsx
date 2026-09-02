import { NavLink } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';

export function RelayMark({ className = 'desk-mark' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="8" width="24" height="16" rx="3.2" fill="#EA580C" />
      <circle cx="4" cy="16" r="2.8" fill="#FFF7ED" />
      <circle cx="28" cy="16" r="2.8" fill="#FFF7ED" />
      <path
        d="M11.4 17.4c0-2.2 1.9-4 4.6-4s4.6 1.8 4.6 4"
        stroke="#FFF7ED"
        fill="none"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <rect x="10.6" y="16.4" width="2.2" height="4" rx="1.1" fill="#FFF7ED" />
      <rect x="19.2" y="16.4" width="2.2" height="4" rx="1.1" fill="#FFF7ED" />
    </svg>
  );
}

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`desk-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard">
      <div className="desk-brand">
        <RelayMark />
        <div className="desk-brand-copy">
          <strong>{APP_NAME}</strong>
          <span>{APP_TAGLINE}</span>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="desk-nav-label">{group.label}</p>
          <nav className="desk-nav">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `desk-nav-link ${isActive ? 'is-active' : ''}`}
                onClick={onNavigate}
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

      <div className="desk-sidebar-foot">
        <div className="desk-health-chip">
          <span className="desk-pulse" />
          Desk live · 47 open
        </div>
        <p>Mock fixtures · last sync 1 min ago</p>
      </div>
    </aside>
  );
}
