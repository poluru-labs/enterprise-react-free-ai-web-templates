import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="hco-shell">
      <TopNavbar />
      <div className="hco-body">
        <SimpleSidebar />
        <main className="hco-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
