import { NavLink } from 'react-router-dom';
import { Status } from '@poluru-labs/enterprise-design-system-react';
import { NAV_ITEMS } from '../../constants/navigation.js';

export function DashboardSidebar({ open, onNavigate }) {
  return (
    <aside className={`mq-sidebar ${open ? 'is-open' : ''}`} aria-label="Dashboard">
      <nav className="mq-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `mq-nav-link ${isActive ? 'is-active' : ''}`}
            onClick={onNavigate}
          >
            <i className={`bi ${item.icon}`} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mq-sidebar-foot">
        <Status label="Live flights" variant="info" pulse />
        <p>Mock fixtures · last sync 32s ago</p>
      </div>
    </aside>
  );
}
