import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="frd-shell">
      <TopNavbar />
      <div className="frd-body">
        <SimpleSidebar />
        <main className="frd-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
