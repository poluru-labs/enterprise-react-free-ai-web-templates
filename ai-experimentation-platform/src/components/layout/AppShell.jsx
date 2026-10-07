import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';
import { SiteFooter } from './SiteFooter.jsx';

export function AppShell() {
  return (
    <div className="lex-shell">
      <TopNavbar />
      <div className="lex-body">
        <SimpleSidebar />
        <main className="lex-main">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
