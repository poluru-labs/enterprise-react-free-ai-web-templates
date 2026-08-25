import { NavLink } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`amd-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard">
      <div className="amd-brand">
        <span className="amd-brand-mark" aria-hidden="true">
          A
        </span>
        <div className="amd-brand-copy">
          <strong>{APP_NAME}</strong>
          <span>{APP_TAGLINE}</span>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="amd-nav-label">{group.label}</p>
          <nav className="amd-nav">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `amd-nav-link ${isActive ? 'is-active' : ''}`}
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

      <div className="amd-sidebar-foot">
        <div className="amd-health-chip">
          <span className="amd-pulse" />
          Fleet watch · 91
        </div>
        <p>Mock telemetry · 8 agents · last sync 12s ago</p>
      </div>
    </aside>
  );
}
