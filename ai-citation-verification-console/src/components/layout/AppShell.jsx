import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="cite-shell">
      <TopNavbar />
      <div className="cite-body">
        <SimpleSidebar />
        <main className="cite-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
