import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="prov-shell">
      <TopNavbar />
      <div className="prov-body">
        <SimpleSidebar />
        <main className="prov-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
