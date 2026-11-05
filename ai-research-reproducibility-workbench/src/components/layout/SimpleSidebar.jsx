import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../../constants/navigation.js';

export function SimpleSidebar() {
  return (
    <aside className="repro-sidebar" aria-label="Workspace">
      <p className="repro-sidebar-label">Workspace</p>
      <nav className="repro-side-nav">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `repro-side-link ${isActive ? 'is-active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
