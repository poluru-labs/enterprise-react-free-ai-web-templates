import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <div className="d-flex vh-100 bg-white">
          <aside className="border-end p-3" style={{ width: 260 }}>
            <div className="d-flex align-items-center gap-2 mb-4">
              <i className="bi bi-grid-1x2-fill fs-4"></i>
              <span className="fw-semibold">AI Support Helpdesk Dashboard</span>
            </div>
            <nav className="nav flex-column gap-1">
              <a className="nav-link active" href="#">
                <i className="bi bi-speedometer2 me-2"></i>Overview
              </a>
              <a className="nav-link text-body" href="#">
                <i className="bi bi-graph-up me-2"></i>Analytics
              </a>
              <a className="nav-link text-body" href="#">
                <i className="bi bi-gear me-2"></i>Settings
              </a>
            </nav>
          </aside>
          <main className="flex-grow-1 p-4 overflow-auto">
            <header className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h4 mb-0">AI Support Helpdesk Dashboard</h1>
              <i className="bi bi-bell fs-5"></i>
            </header>
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <div className="card border h-100">
                  <div className="card-body">
                    <h2 className="h6 text-muted mb-2">Metric One</h2>
                    <p className="h3 mb-0">--</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card border h-100">
                  <div className="card-body">
                    <h2 className="h6 text-muted mb-2">Metric Two</h2>
                    <p className="h3 mb-0">--</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card border h-100">
                  <div className="card-body">
                    <h2 className="h6 text-muted mb-2">Metric Three</h2>
                    <p className="h3 mb-0">--</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
