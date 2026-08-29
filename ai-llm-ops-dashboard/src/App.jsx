import { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  Combobox,
  DropdownMenu,
  Input,
  Kbd,
  List,
  MenuItem,
  Modal,
  Popover,
  Search,
  Select,
  Stepper,
  ThemeProvider,
  ToastProvider,
  Tooltip,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { BrowserRouter, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { commands, currentUser, deploySteps, findModel, modelOptions, notifications, ownerOptions } from './data';
import OverviewPage from './pages/OverviewPage.jsx';
import ModelsPage from './pages/ModelsPage.jsx';
import ModelDetailPage from './pages/ModelDetailPage.jsx';
import PromptsPage from './pages/PromptsPage.jsx';
import TracesPage from './pages/TracesPage.jsx';
import EvaluationsPage from './pages/EvaluationsPage.jsx';
import PlaygroundPage from './pages/PlaygroundPage.jsx';
import CostsPage from './pages/CostsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

const navItems = [
  { label: 'Overview', path: '/overview', icon: 'bi-grid-1x2' },
  { label: 'Models', path: '/models', icon: 'bi-cpu' },
  { label: 'Prompts', path: '/prompts', icon: 'bi-chat-square-text' },
  { label: 'Traces', path: '/traces', icon: 'bi-activity' },
  { label: 'Evaluations', path: '/evaluations', icon: 'bi-clipboard-check' },
  { label: 'Playground', path: '/playground', icon: 'bi-terminal' },
  { label: 'Costs', path: '/costs', icon: 'bi-wallet2' },
];

const heroes = {
  '/overview': { eyebrow: 'Workspace', title: 'Overview', blurb: 'FY26 Q3 · Subrahmanyam Poluru · 111.2K requests' },
  '/models': { eyebrow: 'Registry', title: 'Models', blurb: 'Four production stacks · Poluru Cloud' },
  '/prompts': { eyebrow: 'Library', title: 'Prompts', blurb: 'Reusable instructions across Aurora and Atlas' },
  '/traces': { eyebrow: 'Live', title: 'Traces', blurb: 'Last 15 minutes · p95 still on Lens' },
  '/evaluations': { eyebrow: 'Quality', title: 'Evaluations', blurb: 'Safety, groundedness, and field accuracy' },
  '/playground': { eyebrow: 'Sandbox', title: 'Playground', blurb: 'Draft against Aurora before you publish' },
  '/costs': { eyebrow: 'Finance', title: 'Costs', blurb: '87% of the monthly envelope used' },
  '/settings': { eyebrow: 'Workspace', title: 'Settings', blurb: 'Alerts, keys, and team access' },
};

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [timeRange, setTimeRange] = useState('7d');
  const [lastSynced, setLastSynced] = useState('2 min ago');
  const [commandOpen, setCommandOpen] = useState(false);
  const [deployOpen, setDeployOpen] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deployName, setDeployName] = useState('');
  const [deployOwner, setDeployOwner] = useState('subrahmanyam');
  const [deployModel, setDeployModel] = useState('aurora');

  const current = navItems.find((item) => location.pathname.startsWith(item.path)) || { label: 'Settings', path: '/settings' };
  const modelMatch = location.pathname.match(/^\/models\/([^/]+)/);
  const detailModel = modelMatch ? findModel(modelMatch[1]) : null;
  const hero = heroes[location.pathname]
    || (detailModel
      ? { eyebrow: 'Model', title: detailModel.name, blurb: `${detailModel.owner} · ${detailModel.provider} · ${detailModel.calls}` }
      : heroes['/settings']);
  const filteredCommands = commands.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const primaryAction = useMemo(() => {
    if (current.path === '/overview' || current.path === '/models') return { label: 'Deploy model', run: () => { setDeployStep(0); setDeployOpen(true); } };
    if (current.path === '/prompts') return { label: 'Create prompt', run: () => window.dispatchEvent(new Event('llm:create-prompt')) };
    if (current.path === '/evaluations') return { label: 'Run evaluation', run: () => window.dispatchEvent(new Event('llm:run-eval')) };
    if (current.path === '/playground') return { label: 'Generate', run: () => window.dispatchEvent(new Event('llm:run-playground')), icon: 'star' };
    if (current.path === '/traces') return { label: 'Export traces', run: () => window.dispatchEvent(new Event('llm:export-traces')) };
    if (current.path === '/costs') return { label: 'Export report', run: () => window.dispatchEvent(new Event('llm:export-costs')) };
    return null;
  }, [current.path]);

  function deploy() {
    if (!deployName.trim()) {
      showToast({ title: 'Name required', description: 'Give the endpoint a name first.', variant: 'warning' });
      setDeployStep(0);
      return;
    }
    setDeployOpen(false);
    setDeployStep(0);
    showToast({ title: 'Deploy queued', description: `${deployName} will land on ${modelOptions.find((item) => item.value === deployModel)?.label}.`, variant: 'success' });
    setDeployName('');
    navigate('/models');
  }

  return (
    <div className="llm-shell">
      <header className="llm-header">
        <a className="llm-brand" href="/overview" onClick={(event) => { event.preventDefault(); navigate('/overview'); }}>
          <span className="llm-brand-mark"><i className="bi bi-stars" /></span>
          <span>Poluru <strong>LLM Ops</strong></span>
        </a>
        <div className="llm-header-search">
          <Search value={query} placeholder="Search models, prompts, owners…" onChange={(_, value) => setQuery(value)} onFocus={() => setCommandOpen(true)} />
        </div>
        <div className="llm-header-actions">
          <span className="llm-sync"><span className="llm-live-dot" />Synced {lastSynced}</span>
          <Button variant="tertiary" size="sm" icon="refresh" onClick={() => { setLastSynced('just now'); showToast({ title: 'Refreshed', description: 'Metrics pulled from production.', variant: 'info' }); }}>Refresh</Button>
          <Tooltip content="Command palette">
            <button type="button" className="llm-icon-button" onClick={() => setCommandOpen(true)}><Kbd>⌘K</Kbd></button>
          </Tooltip>
          <Popover open={inboxOpen} onOpenChange={setInboxOpen} heading="Inbox" placement="bottom" trigger={<Button variant="secondary" size="sm" icon="bell" iconOnly accessibleLabel="Notifications" />}>
            <List items={notifications} divided />
          </Popover>
          <DropdownMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            trigger={<button type="button" className="llm-icon-button" aria-label="Account"><Avatar name={currentUser.name} size="sm" /></button>}
          >
            <MenuItem value="settings" label="Preferences" onSelect={() => navigate('/settings')} />
            <MenuItem value="signout" label="Sign out" danger onSelect={() => showToast({ title: 'Signed out', description: 'Subrahmanyam Poluru ended the session.', variant: 'info' })} />
          </DropdownMenu>
        </div>
      </header>

      <div className="llm-body">
        <aside className="llm-sidebar">
          <nav aria-label="Main navigation">
            <p className="llm-nav-label">Workspace</p>
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `llm-nav-item ${isActive ? 'is-active' : ''}`}>
                <i className={`bi ${item.icon}`} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="llm-sidebar-bottom">
            <NavLink to="/settings" className={({ isActive }) => `llm-nav-item ${isActive ? 'is-active' : ''}`}>
              <i className="bi bi-gear" />
              <span>Settings</span>
            </NavLink>
            <Button size="sm" icon="plus" onClick={() => { setDeployStep(0); setDeployOpen(true); }}>Deploy model</Button>
          </div>
        </aside>

        <main className="llm-main">
          <header className="llm-page-heading">
            <div className="llm-hero-copy">
              <p className="llm-eyebrow">{hero.eyebrow}</p>
              <h1>{hero.title}</h1>
              <p className="llm-muted">{hero.blurb}</p>
            </div>
            <div className="llm-hero-actions">
              {primaryAction ? <Button icon={primaryAction.icon || 'plus'} onClick={primaryAction.run}>{primaryAction.label}</Button> : null}
            </div>
          </header>
          <Routes>
            <Route path="overview" element={<OverviewPage query={query} setQuery={setQuery} timeRange={timeRange} setTimeRange={setTimeRange} onOpenTraces={() => navigate('/traces')} />} />
            <Route path="models" element={<ModelsPage />} />
            <Route path="models/:id" element={<ModelDetailPage />} />
            <Route path="prompts" element={<PromptsPage />} />
            <Route path="traces" element={<TracesPage />} />
            <Route path="evaluations" element={<EvaluationsPage />} />
            <Route path="playground" element={<PlaygroundPage />} />
            <Route path="costs" element={<CostsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="overview" replace />} />
          </Routes>
        </main>
      </div>

      <Modal
        open={commandOpen}
        onOpenChange={setCommandOpen}
        heading="Jump to anything"
      >
        <Search value={query} placeholder="Type a model, owner, or page" onChange={(_, value) => setQuery(value)} />
        <div className="llm-cmd-list">
          {filteredCommands.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCommandOpen(false);
                navigate(item.href);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Modal>

      <Modal
        open={deployOpen}
        onOpenChange={(open) => { setDeployOpen(open); if (!open) setDeployStep(0); }}
        heading="Deploy model"
        footer={(
          <>
            <Button variant="secondary" onClick={() => (deployStep === 0 ? setDeployOpen(false) : setDeployStep((step) => step - 1))}>{deployStep === 0 ? 'Cancel' : 'Back'}</Button>
            {deployStep < 2
              ? <Button onClick={() => setDeployStep((step) => step + 1)}>Next</Button>
              : <Button onClick={deploy}>Queue deploy</Button>}
          </>
        )}
      >
        <div className="llm-form-stack">
          <Stepper steps={deploySteps} current={deployStep} onStepClick={(index) => { if (index <= deployStep) setDeployStep(index); }} />
          {deployStep === 0 ? (
            <Input label="Endpoint name" value={deployName} placeholder="aurora-chat-prod" onChange={(event) => setDeployName(event.target.value)} />
          ) : null}
          {deployStep === 1 ? (
            <Combobox label="Base model" value={deployModel} options={modelOptions} onChange={setDeployModel} />
          ) : null}
          {deployStep === 2 ? (
            <>
              <Select label="Owner" value={deployOwner} onChange={(event) => setDeployOwner(event.target.value)} options={ownerOptions} />
              <p className="note">{deployName || 'Unnamed endpoint'} · {modelOptions.find((item) => item.value === deployModel)?.label} · {ownerOptions.find((item) => item.value === deployOwner)?.label}</p>
            </>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
