import { NavLink } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';
import { FlameMark } from './FlameMark.jsx';

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`kiln-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard">
      <div className="kiln-brand">
        <FlameMark />
        <div className="kiln-brand-copy">
          <strong>{APP_NAME}</strong>
          <span>{APP_TAGLINE}</span>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="kiln-nav-label">{group.label}</p>
          <nav className="kiln-nav">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `kiln-nav-link ${isActive ? 'is-active' : ''}`}
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

      <div className="kiln-sidebar-foot">
        <div className="kiln-health-chip">
          <span className="kiln-pulse" />
          Foundry · 18 live · 86% GPU
        </div>
        <p>Mock fixtures · last sync 6s ago</p>
      </div>
    </aside>
  );
}
