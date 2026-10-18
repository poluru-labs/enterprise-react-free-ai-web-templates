import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="lci-shell">
      <TopNavbar />
      <div className="lci-body">
        <SimpleSidebar />
        <main className="lci-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
