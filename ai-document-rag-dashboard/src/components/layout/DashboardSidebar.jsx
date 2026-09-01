import { NavLink } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, NAV_GROUPS } from '../../constants/navigation.js';
import { DocumentMark } from './DashboardNavbar.jsx';

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`rag-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard">
      <div className="rag-brand">
        <DocumentMark className="rag-mark" />
        <div className="rag-brand-copy">
          <strong>{APP_NAME}</strong>
          <span>{APP_TAGLINE}</span>
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="rag-nav-label">{group.label}</p>
          <nav className="rag-nav">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `rag-nav-link ${isActive ? 'is-active' : ''}`}
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

      <div className="rag-sidebar-foot">
        <div className="rag-health-chip">
          <span className="rag-pulse" />
          Index watch · 1,284 docs
        </div>
        <p>Storage 7.2 GB of 10 GB · last crawl 9s ago</p>
      </div>
    </aside>
  );
}
