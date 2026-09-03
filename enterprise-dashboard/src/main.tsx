import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { demoBasename } from './demoBasename';
import {
  ThemeProvider,
  ToastProvider,
} from '@poluru-labs/enterprise-design-system-react';
import '@poluru-labs/enterprise-design-system-react/styles.css';
import './styles/global.scss';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={demoBasename()}>
      <ThemeProvider defaultTheme="light">
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
