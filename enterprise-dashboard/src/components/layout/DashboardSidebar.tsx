import { Badge, Button, SideNav, type SideNavItem } from '@poluru-labs/enterprise-design-system-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, NAV_ITEMS, SITE_COUNT_LABEL } from '../../constants/navigation';

type DashboardSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const items: SideNavItem[] = NAV_ITEMS.map((item) => ({
    label: item.label,
    icon: item.icon,
    active:
      item.path === '/'
        ? location.pathname === '/'
        : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`),
  }));

  return (
    <aside className="dashboard__sidebar">
      <div className="dashboard__brand">
        <span className="dashboard__brand-mark" aria-hidden="true" />
        {!collapsed ? (
          <div className="dashboard__brand-text">
            <strong>{APP_NAME}</strong>
            <span>{APP_TAGLINE}</span>
          </div>
        ) : null}
      </div>

      <SideNav
        className="dashboard__sidenav"
        collapsed={collapsed}
        items={items}
        onNavigate={(label) => {
          const match = NAV_ITEMS.find((item) => item.label === label);
          if (match) navigate(match.path);
        }}
      />

      <div className="dashboard__sidebar-foot">
        {!collapsed ? (
          <>
            <Badge label="Live fleet" variant="brand" soft pill />
            <p>Monitoring {SITE_COUNT_LABEL}</p>
          </>
        ) : null}
        <Button
          variant="tertiary"
          size="sm"
          icon={collapsed ? 'chevron-right' : 'chevron-left'}
          iconOnly={collapsed}
          accessibleLabel={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={onToggle}
        >
          {collapsed ? null : 'Collapse'}
        </Button>
      </div>
    </aside>
  );
}
