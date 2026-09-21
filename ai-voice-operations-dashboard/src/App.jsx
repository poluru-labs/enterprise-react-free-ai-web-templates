import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { SiteFooter } from './components/SiteFooter.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <div className="vod-shell">
          <main className="starter-app">
            <p className="starter-eyebrow">Enterprise React starter</p>
            <h1>Build something great.</h1>
            <p className="starter-copy">
              Replace this starter view with your application.
            </p>
          </main>
          <SiteFooter />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
