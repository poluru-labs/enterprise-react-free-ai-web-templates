import { Outlet } from 'react-router-dom';
import { MegaHeader } from './MegaHeader.jsx';
import { SimpleSidebar } from './SimpleSidebar.jsx';

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
    </div>
  );
}
