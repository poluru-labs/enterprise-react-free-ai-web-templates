import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="priv-shell">
      <TopNavbar />
      <div className="priv-body">
        <SimpleSidebar />
        <main className="priv-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
