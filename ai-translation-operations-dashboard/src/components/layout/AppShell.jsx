import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="trn-shell">
      <TopNavbar />
      <div className="trn-body">
        <SimpleSidebar />
        <main className="trn-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
