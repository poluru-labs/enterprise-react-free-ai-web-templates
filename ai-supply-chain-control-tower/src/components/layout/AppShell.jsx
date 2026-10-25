import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="sct-shell">
      <TopNavbar />
      <div className="sct-body">
        <SimpleSidebar />
        <main className="sct-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
