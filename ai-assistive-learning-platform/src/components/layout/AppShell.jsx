import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="learn-shell">
      <TopNavbar />
      <div className="learn-body">
        <SimpleSidebar />
        <main className="learn-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
