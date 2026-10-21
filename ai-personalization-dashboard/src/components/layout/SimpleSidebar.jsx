import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../../constants/navigation.js';

export function SimpleSidebar() {
  return (
    <aside className="per-sidebar" aria-label="Workspace">
      <p className="per-sidebar-label">Workspace</p>
      <nav className="per-side-nav">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `per-side-link ${isActive ? 'is-active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
