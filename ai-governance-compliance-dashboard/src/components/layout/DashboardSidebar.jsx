import { NavLink } from 'react-router-dom';
import { Status } from '@poluru-labs/enterprise-design-system-react';
import { NAV_ITEMS } from '../../constants/navigation.js';

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`gov-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard">
      <nav className="gov-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `gov-nav-link ${isActive ? 'is-active' : ''}`}
            onClick={onNavigate}
          >
            <i className={`bi ${item.icon}`} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="gov-sidebar-foot">
        <Status label="Live register" variant="info" pulse />
        <p>Mock fixtures · last sync 2 min ago</p>
      </div>
    </aside>
  );
}
