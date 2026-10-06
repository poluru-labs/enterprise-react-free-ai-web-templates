import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="eod-shell">
      <TopNavbar />
      <div className="eod-body">
        <SimpleSidebar />
        <main className="eod-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
