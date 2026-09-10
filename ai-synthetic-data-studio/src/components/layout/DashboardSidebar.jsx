import { NavLink } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`syn-sidebar ${open ? 'is-open' : ''}`} aria-label="Synthetic Data Studio Navigation">
      <div className="syn-brand">
        <div className="syn-brand-mark">
          <i className="bi bi-cpu-fill" aria-hidden="true" />
        </div>
        <div className="syn-brand-info">
          <strong>{APP_NAME}</strong>
          <span>{APP_TAGLINE}</span>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="syn-nav-group-label">{group.label}</p>
          <nav className="syn-nav">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `syn-nav-link ${isActive ? 'is-active' : ''}`}
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

      <div className="syn-sidebar-foot">
        <div className="syn-health-chip">
          <span className="syn-pulse" />
          <span>DP Engine · ε=0.85 Active</span>
        </div>
        <div style={{ marginTop: '0.6rem', fontSize: '0.71rem', color: 'var(--syn-sidebar-muted)' }}>
          Poluru Labs · Zero-Leakage Guarantee
        </div>
      </div>
    </aside>
  );
}
