import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import QueryLensDashboard from './QueryLensDashboard.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <QueryLensDashboard />
      </ToastProvider>
    </ThemeProvider>
  );
}
