import { NavLink } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';

export function NexusMark({ className = 'nx-mark' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <polygon points="16,2.4 28.4,9.4 28.4,22.6 16,29.6 3.6,22.6 3.6,9.4" fill="#059669" />
      <rect x="10.2" y="10.2" width="4.6" height="4.6" rx="1" fill="#D1FAE5" />
      <rect x="17.2" y="10.2" width="4.6" height="4.6" rx="1" fill="#A7F3D0" />
      <rect x="10.2" y="17.2" width="4.6" height="4.6" rx="1" fill="#A7F3D0" />
      <rect x="17.2" y="17.2" width="4.6" height="4.6" rx="1" fill="#10B981" />
    </svg>
  );
}

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`nx-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard">
      <div className="nx-brand">
        <NexusMark />
        <div className="nx-brand-copy">
          <strong>{APP_NAME}</strong>
          <span>{APP_TAGLINE}</span>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="nx-nav-label">{group.label}</p>
          <nav className="nx-nav">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nx-nav-link ${isActive ? 'is-active' : ''}`}
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

      <div className="nx-sidebar-foot">
        <div className="nx-health-chip">
          <span className="nx-pulse" />
          Platform · 42 tenants live
        </div>
        <p>Mock fixtures · last sync 3 min ago</p>
      </div>
    </aside>
  );
}
