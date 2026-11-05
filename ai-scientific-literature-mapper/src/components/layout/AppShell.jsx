import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="lit-shell">
      <TopNavbar />
      <div className="lit-body">
        <SimpleSidebar />
        <main className="lit-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
