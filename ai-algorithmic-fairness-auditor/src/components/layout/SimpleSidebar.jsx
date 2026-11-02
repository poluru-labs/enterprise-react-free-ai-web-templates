import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../../constants/navigation.js';

export function SimpleSidebar() {
  return (
    <aside className="fair-sidebar" aria-label="Workspace">
      <p className="fair-sidebar-label">Workspace</p>
      <nav className="fair-side-nav">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `fair-side-link ${isActive ? 'is-active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
