import { NavLink } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';

function OpsMark({ className = 'llm-mark' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="7" y="7" width="18" height="18" rx="5" fill="#4338CA" />
      <rect x="11.5" y="11.5" width="9" height="9" rx="2" fill="#0891B2" />
      <path d="M16 2.8 17.2 6 20.4 6.4 18 8.6 18.6 11.8 16 10 13.4 11.8 14 8.6 11.6 6.4 14.8 6Z" fill="#67E8F9" />
      <rect x="15.2" y="1.6" width="1.6" height="4.2" rx="0.6" fill="#A5B4FC" />
      <rect x="15.2" y="26.2" width="1.6" height="4.2" rx="0.6" fill="#A5B4FC" />
      <rect x="1.6" y="15.2" width="4.2" height="1.6" rx="0.6" fill="#A5B4FC" />
      <rect x="26.2" y="15.2" width="4.2" height="1.6" rx="0.6" fill="#A5B4FC" />
    </svg>
  );
}

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`llm-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard">
      <div className="llm-brand">
        <OpsMark />
        <div className="llm-brand-copy">
          <strong>{APP_NAME}</strong>
          <span>{APP_TAGLINE}</span>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="llm-nav-label">{group.label}</p>
          <nav className="llm-nav">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `llm-nav-link ${isActive ? 'is-active' : ''}`}
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

      <div className="llm-sidebar-foot">
        <div className="llm-health-chip">
          <span className="llm-pulse" />
          Live · p95 684ms
        </div>
        <p>Mock fixtures · last sync 2 min ago</p>
      </div>
    </aside>
  );
}
