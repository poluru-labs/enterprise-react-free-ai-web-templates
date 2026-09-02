import { NavLink } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';

function BureauMark({ className = 'pmt-mark' }) {
  return (
    <span className={className} aria-hidden="true">
      P
    </span>
  );
}

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`pmt-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard">
      <div className="pmt-brand">
        <BureauMark />
        <div className="pmt-brand-copy">
          <strong>{APP_NAME}</strong>
          <span>{APP_TAGLINE}</span>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="pmt-nav-label">{group.label}</p>
          <nav className="pmt-nav">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `pmt-nav-link ${isActive ? 'is-active' : ''}`}
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

      <div className="pmt-sidebar-foot">
        <div className="pmt-health-chip">
          <span className="pmt-pulse" />
          Bureau desk · v12 live
        </div>
        <p>Mock fixtures · last sync 2 min ago</p>
      </div>
    </aside>
  );
}
