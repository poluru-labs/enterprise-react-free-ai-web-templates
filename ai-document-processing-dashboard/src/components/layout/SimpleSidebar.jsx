import { NavLink } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../../constants/navigation.js';

export function SimpleSidebar() {
  return (
    <aside className="dpd-sidebar" aria-label="Desk">
      <p className="dpd-sidebar-label">Desk</p>
      <nav className="dpd-side-nav">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `dpd-side-link ${isActive ? 'is-active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
