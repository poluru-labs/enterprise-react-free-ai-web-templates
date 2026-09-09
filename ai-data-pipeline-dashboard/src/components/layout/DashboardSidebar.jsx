import { NavLink } from 'react-router-dom';
import { Status } from '@poluru-labs/enterprise-design-system-react';
import { NAV_ITEMS } from '../../constants/navigation.js';

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`cd-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard">
      <nav className="cd-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `cd-nav-link ${isActive ? 'is-active' : ''}`}
            onClick={onNavigate}
          >
            <i className={`bi ${item.icon}`} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="cd-sidebar-foot">
        <Status label="Live pipelines" variant="info" pulse />
        <p>Mock fixtures · last sync 47s ago</p>
      </div>
    </aside>
  );
}
