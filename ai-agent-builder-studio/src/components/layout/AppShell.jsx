import { Outlet } from 'react-router-dom';
import { MegaHeader } from './MegaHeader.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="abs-shell">
      <MegaHeader />
      <div className="abs-body">
        <SimpleSidebar />
        <main className="abs-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
