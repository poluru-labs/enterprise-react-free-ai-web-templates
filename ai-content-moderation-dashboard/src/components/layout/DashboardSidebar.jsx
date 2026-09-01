import { NavLink } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';

function ShieldMark() {
  return (
    <svg className="cmb-shield" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 3.2 6.5 7.1v7.4c0 6.2 4 11.3 9.5 13.3 5.5-2 9.5-7.1 9.5-13.3V7.1L16 3.2Z"
        fill="#7C3AED"
      />
      <path
        d="m11.2 16.1 3 3.1 6.7-6.8"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`cmb-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard">
      <div className="cmb-brand">
        <ShieldMark />
        <div className="cmb-brand-copy">
          <strong>{APP_NAME}</strong>
          <span>{APP_TAGLINE}</span>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="cmb-nav-label">{group.label}</p>
          <nav className="cmb-nav">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `cmb-nav-link ${isActive ? 'is-active' : ''}`}
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

      <div className="cmb-sidebar-foot">
        <div className="cmb-health-chip">
          <span className="cmb-pulse" />
          Queue watch · 78% auto
        </div>
        <p>Mock fixtures · last sync 9s ago</p>
      </div>
    </aside>
  );
}
