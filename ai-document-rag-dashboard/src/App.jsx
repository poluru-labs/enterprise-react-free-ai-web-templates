import { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider, ToastProvider } from '@poluru-labs/enterprise-design-system-react';
import { ConversationsPage, EvaluationsPage, KnowledgeBasePage, OverviewPage, SearchPage, SettingsPage } from './Pages.jsx';

const navigation = [['Overview', '/', 'bi-grid-1x2'], ['Knowledge base', '/knowledge-base', 'bi-database'], ['Search & test', '/search', 'bi-search'], ['Conversations', '/conversations', 'bi-chat-square-text'], ['Evaluations', '/evaluations', 'bi-clipboard2-check']];

function Sidebar() {
  return <aside className="sidebar"><NavLink className="brand" to="/"><div className="brand-mark"><i className="bi bi-stars"></i></div><span>Contextly</span></NavLink><nav className="side-nav" aria-label="Main navigation"><p className="nav-label">Workspace</p>{navigation.map(([label, path, icon]) => <NavLink className={({ isActive }) => `side-link ${isActive ? 'is-active' : ''}`} end={path === '/'} key={path} to={path}><i className={`bi ${icon}`}></i><span>{label}</span></NavLink>)}<p className="nav-label nav-label-lower">Manage</p><NavLink className={({ isActive }) => `side-link ${isActive ? 'is-active' : ''}`} to="/settings"><i className="bi bi-sliders"></i><span>Settings</span></NavLink></nav><div className="sidebar-footer"><div className="usage-card"><div className="usage-copy"><span>Storage</span><strong>72%</strong></div><div className="progress-track"><span></span></div><small>7.2 GB of 10 GB used</small></div><button className="account" type="button"><span className="avatar">MP</span><span><strong>Maya Poluru</strong><small>Admin</small></span><i className="bi bi-three-dots"></i></button></div></aside>;
}

function Dashboard() {
  const [notice, setNotice] = useState('');
  const showNotice = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2600); };
  const location = useLocation();
  const pageTitles = { '/': 'Overview', '/knowledge-base': 'Knowledge base', '/search': 'Search & test', '/conversations': 'Conversations', '/evaluations': 'Evaluations', '/settings': 'Settings' };
  return <div className="app-shell"><Sidebar /><main className="main-content"><header className="topbar"><div><p className="eyebrow">Good morning, Maya</p><h1>{pageTitles[location.pathname] || 'Workspace'}</h1></div><div className="topbar-actions"><button className="icon-button" type="button" aria-label="Notifications"><i className="bi bi-bell"></i><span></span></button><button className="primary-button" type="button" onClick={() => showNotice('Upload panel opened')}><i className="bi bi-plus-lg"></i> Add documents</button></div></header><Routes><Route path="/" element={<OverviewPage onNotify={showNotice} />} /><Route path="/knowledge-base" element={<KnowledgeBasePage onNotify={showNotice} />} /><Route path="/search" element={<SearchPage onNotify={showNotice} />} /><Route path="/conversations" element={<ConversationsPage />} /><Route path="/evaluations" element={<EvaluationsPage onNotify={showNotice} />} /><Route path="/settings" element={<SettingsPage onNotify={showNotice} />} /><Route path="*" element={<OverviewPage onNotify={showNotice} />} /></Routes></main>{notice && <div className="notice"><i className="bi bi-check-circle-fill"></i>{notice}</div>}</div>;
}

export default function App() {
  return <ThemeProvider defaultTheme="light"><ToastProvider><BrowserRouter><Dashboard /></BrowserRouter></ToastProvider></ThemeProvider>;
}
