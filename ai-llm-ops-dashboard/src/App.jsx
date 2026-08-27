import { useState } from 'react';
import { Avatar, Button, ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { BrowserRouter, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import CostsPage from './pages/CostsPage.jsx';
import EvaluationsPage from './pages/EvaluationsPage.jsx';
import ModelsPage from './pages/ModelsPage.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import PromptsPage from './pages/PromptsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

const navItems = [
  { label: 'Overview', path: '/overview', icon: 'bi-grid-1x2-fill' },
  { label: 'Models', path: '/models', icon: 'bi-cpu' },
  { label: 'Prompts', path: '/prompts', icon: 'bi-chat-square-text' },
  { label: 'Evaluations', path: '/evaluations', icon: 'bi-clipboard-check' },
  { label: 'Costs', path: '/costs', icon: 'bi-bar-chart-line' },
];

function Dashboard() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [timeRange, setTimeRange] = useState('Last 7 days');
  const [lastSynced, setLastSynced] = useState('2 min ago');
  const currentItem = navItems.find((item) => location.pathname.endsWith(item.path)) || { label: 'Settings' };

  return <div className="llm-shell">
    <header className="llm-header">
      <div className="llm-brand"><span className="llm-brand-mark"><i className="bi bi-stars" /></span><span>Poluru <strong>LLM Ops</strong></span></div>
      <div className="llm-header-actions"><span className="llm-sync"><span className="llm-live-dot" />Synced {lastSynced}</span><Button variant="tertiary" size="sm" icon="arrow-clockwise" onClick={() => setLastSynced('just now')}>Refresh</Button><button className="llm-icon-button" aria-label="Notifications"><i className="bi bi-bell" /></button><Avatar name="Subrahmanyam Poluru" size="sm" /></div>
    </header>
    <div className="llm-body">
      <aside className="llm-sidebar"><nav aria-label="Main navigation"><p className="llm-nav-label">Workspace</p>{navItems.map((item) => <NavLink key={item.path} to={item.path} className={({ isActive }) => `llm-nav-item ${isActive ? 'is-active' : ''}`}><i className={`bi ${item.icon}`} /><span>{item.label}</span></NavLink>)}</nav><div className="llm-sidebar-bottom"><NavLink to="/settings" className={({ isActive }) => `llm-nav-item ${isActive ? 'is-active' : ''}`}><i className="bi bi-gear" /><span>Settings</span></NavLink><div className="llm-help"><i className="bi bi-life-preserver" /><span>Need help?</span><button aria-label="Open help"><i className="bi bi-arrow-up-right" /></button></div></div></aside>
      <main className="llm-main"><div className="llm-page-heading"><div><p className="llm-eyebrow">Workspace / {currentItem.label}</p><h1>{currentItem.label === 'Overview' ? 'Good morning, Subrahmanyam' : currentItem.label}</h1><p className="llm-muted">{currentItem.label === 'Overview' ? 'Here is what is happening across your language model stack.' : `Manage and monitor your ${currentItem.label.toLowerCase()} workspace.`}</p></div>{currentItem.label !== 'Settings' ? <Button variant="primary" icon="plus">{currentItem.label === 'Overview' || currentItem.label === 'Models' ? 'Deploy model' : 'Create new'}</Button> : null}</div><Routes><Route path="overview" element={<OverviewPage query={query} setQuery={setQuery} timeRange={timeRange} setTimeRange={setTimeRange} />} /><Route path="models" element={<ModelsPage />} /><Route path="prompts" element={<PromptsPage />} /><Route path="evaluations" element={<EvaluationsPage />} /><Route path="costs" element={<CostsPage />} /><Route path="settings" element={<SettingsPage />} /><Route path="*" element={<Navigate to="overview" replace />} /></Routes></main>
    </div>
  </div>;
}

export default function App() {
  return <ThemeProvider defaultTheme="light"><ToastProvider><BrowserRouter><Routes><Route path="/*" element={<Dashboard />} /></Routes></BrowserRouter></ToastProvider></ThemeProvider>;
}
