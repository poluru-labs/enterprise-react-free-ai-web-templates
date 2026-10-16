import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../../constants/navigation.js';

export function SimpleSidebar() {
  return (
    <aside className="hil-sidebar" aria-label="Org">
      <p className="hil-sidebar-label">Org</p>
      <nav className="hil-side-nav">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `hil-side-link ${isActive ? 'is-active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
