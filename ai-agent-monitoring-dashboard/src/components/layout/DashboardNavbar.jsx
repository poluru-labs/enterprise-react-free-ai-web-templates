import { Avatar, Button, Search, showToast } from '@poluru-labs/enterprise-design-system-react';
import { APP_NAME } from '../../constants/navigation.js';

export function DashboardNavbar({ onMenuToggle, sectionLabel }) {
  return (
    <header className="amd-navbar">
      <div className="amd-navbar-start">
        <Button
          className="amd-menu-btn"
          variant="secondary"
          size="sm"
          icon="menu"
          iconOnly
          accessibleLabel="Open navigation"
          onClick={onMenuToggle}
        />
        <div className="amd-navbar-title">
          <span className="amd-live-pill">
            <span className="amd-pulse" />
            Live
          </span>
          <div className="amd-navbar-heading">
            <strong>{sectionLabel || APP_NAME}</strong>
            <span>Agent monitoring</span>
          </div>
        </div>
      </div>

      <div className="amd-navbar-search">
        <Search
          placeholder="Search agents, tasks, tools…"
          size="sm"
          onChange={(_, value) => {
            if (value.length > 24) {
              showToast({ title: 'Try a shorter query', variant: 'info' });
            }
          }}
        />
      </div>

      <div className="amd-navbar-end">
        <Button
          variant="tertiary"
          size="sm"
          icon="bell"
          iconOnly
          accessibleLabel="Notifications"
          onClick={() =>
            showToast({
              title: '3 open alerts',
              description: 'Loop rate, memory degradation, and tool latency.',
              variant: 'warning',
            })
          }
        />
        <div className="amd-profile" title="Avery Poluru">
          <Avatar name="Avery Poluru" size="sm" />
          <div className="amd-profile-copy">
            <strong>Avery Poluru</strong>
            <span>Ops lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}
