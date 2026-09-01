import { NavLink } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`cvd-sidebar ${open ? 'is-open' : ''}`} aria-label="Sightline navigation">
      <div className="cvd-brand">
        <span className="cvd-brand-mark" aria-hidden="true">
          <i className="bi bi-eye" />
        </span>
        <div className="cvd-brand-copy">
          <strong>{APP_NAME}</strong>
          <span>{APP_TAGLINE}</span>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="cvd-nav-label">{group.label}</p>
          <nav className="cvd-nav">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `cvd-nav-link ${isActive ? 'is-active' : ''}`}
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

      <div className="cvd-sidebar-foot">
        <div className="cvd-health-chip">
          <span className="cvd-pulse" />
          46 cameras live
        </div>
        <p>Sightline mock fleet · 4 sites · last keyframe 12s ago</p>
      </div>
    </aside>
  );
}
