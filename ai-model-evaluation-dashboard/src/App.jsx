import { useEffect, useMemo, useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Button,
  Combobox,
  DatePicker,
  Divider,
  DropdownMenu,
  Input,
  Kbd,
  List,
  MenuItem,
  Modal,
  NumberInput,
  Popover,
  Search,
  Select,
  SideNav,
  Slider,
  Stepper,
  Textarea,
  ThemeProvider,
  TimePicker,
  ToastProvider,
  Toolbar,
  Tooltip,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import {
  commands,
  currentUser,
  evalSteps,
  judgeOptions,
  modelOptions,
  navItems,
  notifications,
  ownerOptions,
  suiteOptions,
} from './data';
import Overview from './pages/Overview.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Suites from './pages/Suites.jsx';
import SuiteDetail from './pages/SuiteDetail.jsx';
import Runs from './pages/Runs.jsx';
import RunDetail from './pages/RunDetail.jsx';
import Compare from './pages/Compare.jsx';
import Review from './pages/Review.jsx';
import Settings from './pages/Settings.jsx';

function parseHash(hash) {
  const path = (hash || '#/overview').replace(/^#/, '') || '/overview';
  const parts = path.split('/').filter(Boolean);
  return { name: parts[0] || 'overview', id: parts[1] || '' };
}

const pages = {
  overview: Overview,
  leaderboard: Leaderboard,
  suites: Suites,
  suite: SuiteDetail,
  runs: Runs,
  run: RunDetail,
  compare: Compare,
  review: Review,
  settings: Settings,
};

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <PrismApp />
      </ToastProvider>
    </ThemeProvider>
  );
}

function PrismApp() {
  const [hash, setHash] = useState(() => window.location.hash || '#/overview');
  const route = parseHash(hash);
  const Page = pages[route.name] || Overview;
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('prism-sidebar') === '1');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [evalOpen, setEvalOpen] = useState(false);
  const [evalStep, setEvalStep] = useState(0);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [runName, setRunName] = useState('');
  const [owner, setOwner] = useState('Meera Poluru');
  const [suite, setSuite] = useState('s_safety');
  const [model, setModel] = useState('aurora');
  const [judge, setJudge] = useState('llm');
  const [samples, setSamples] = useState(200);
  const [threshold, setThreshold] = useState(90);
  const [startDate, setStartDate] = useState('2026-08-29');
  const [startTime, setStartTime] = useState('16:30');
  const [notes, setNotes] = useState('');

  const sideItems = useMemo(
    () => navItems.map((item) => ({
      ...item,
      active: route.name === item.id || (item.id === 'suites' && route.name === 'suite') || (item.id === 'runs' && route.name === 'run'),
    })),
    [route.name],
  );

  const filteredCommands = commands.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (!window.location.hash) window.location.hash = '#/overview';
    const sync = () => {
      setHash(window.location.hash || '#/overview');
      setMobileOpen(false);
    };
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('hashchange', sync);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('prism-sidebar', collapsed ? '1' : '0');
  }, [collapsed]);

  function go(path) {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
  }

  function toggleSidebar() {
    if (window.matchMedia('(max-width: 860px)').matches) {
      setMobileOpen((open) => !open);
      return;
    }
    setCollapsed((value) => !value);
  }

  function queueEval() {
    if (!runName.trim()) {
      showToast({ title: 'Name required', description: 'Give the run a name first.', variant: 'warning' });
      setEvalStep(0);
      return;
    }
    setEvalOpen(false);
    setEvalStep(0);
    showToast({
      title: 'Eval queued',
      description: `${runName} will score ${modelOptions.find((item) => item.value === model)?.label}.`,
      variant: 'success',
    });
    setRunName('');
    go('#/runs');
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <button
        type="button"
        className={`backdrop ${mobileOpen ? 'is-on' : ''}`}
        aria-label="Close navigation"
        hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`shell ${collapsed ? 'is-collapsed' : ''}`}>
        <aside className={`sidebar ${mobileOpen ? 'is-mobile-open' : ''}`}>
          <a className="brand" href="#/overview">
            <span className="brand-mark" aria-hidden="true">P</span>
            <span className="brand-copy">
              <small>Poluru Cloud</small>
              <strong>Prism Eval</strong>
            </span>
          </a>
          <SideNav className="sidebar-nav" items={sideItems} collapsed={collapsed} onNavigate={(_, href) => href && go(href)} />
          <div className="quick-block">
            <p className="quick-label">Quick links</p>
            <div className="stack">
              <Button size="sm" icon="plus" onClick={() => { setEvalStep(0); setEvalOpen(true); }}>Run evaluation</Button>
            </div>
          </div>
          <DropdownMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            placement="top"
            trigger={(
              <button className="profile" type="button">
                <Avatar name={currentUser.name} size="md" />
                <span>
                  <strong>{currentUser.name}</strong>
                  <small>{currentUser.role}</small>
                </span>
              </button>
            )}
          >
            <MenuItem value="settings" label="Preferences" onSelect={() => go('#/settings')} />
            <MenuItem value="signout" label="Sign out" danger onSelect={() => showToast({ title: 'Signed out', description: 'Meera Poluru ended the Prism session.', variant: 'info' })} />
          </DropdownMenu>
        </aside>

        <div className="workspace">
          <Toolbar
            className="topbar"
            start={(
              <div className="row">
                <Tooltip content={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
                  <Button variant="tertiary" size="sm" icon="menu" iconOnly accessibleLabel="Toggle sidebar" onClick={toggleSidebar} />
                </Tooltip>
                <div className="search-wrap">
                  <Search
                    value={query}
                    placeholder="Search suites, models, owners…"
                    onChange={(_, value) => setQuery(value)}
                    onFocus={() => setCommandOpen(true)}
                  />
                </div>
              </div>
            )}
            end={(
              <div className="topbar-end">
                <Tooltip content="Open command palette">
                  <button type="button" className="profile" style={{ width: 'auto' }} onClick={() => setCommandOpen(true)}>
                    <Kbd>⌘K</Kbd>
                  </button>
                </Tooltip>
                <Popover open={inboxOpen} onOpenChange={setInboxOpen} heading="Inbox" placement="bottom" trigger={<Button variant="secondary" icon="bell" iconOnly accessibleLabel="Notifications" />}>
                  <List items={notifications} divided />
                </Popover>
                <Button icon="plus" onClick={() => { setEvalStep(0); setEvalOpen(true); }}>Run evaluation</Button>
              </div>
            )}
          />
          <main id="main" className="content">
            <Page routeId={route.id} query={query} onRun={() => { setEvalStep(0); setEvalOpen(true); }} />
          </main>
        </div>
      </div>

      <Modal open={commandOpen} onOpenChange={setCommandOpen} heading="Jump to anything">
        <Search value={query} placeholder="Type a suite, owner, or page" onChange={(_, value) => setQuery(value)} />
        {filteredCommands.length ? (
          <div className="cmd-list">
            {filteredCommands.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  setCommandOpen(false);
                  go(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : (
          <p className="note">Nothing matches. Try Lens or Meera Poluru.</p>
        )}
      </Modal>

      <Modal
        open={evalOpen}
        onOpenChange={(open) => { setEvalOpen(open); if (!open) setEvalStep(0); }}
        heading="Run evaluation"
        footer={(
          <>
            <Button variant="secondary" onClick={() => (evalStep === 0 ? setEvalOpen(false) : setEvalStep((step) => step - 1))}>{evalStep === 0 ? 'Cancel' : 'Back'}</Button>
            {evalStep < 2
              ? <Button onClick={() => setEvalStep((step) => step + 1)}>Next</Button>
              : <Button onClick={queueEval}>Queue eval</Button>}
          </>
        )}
      >
        <div className="stack" style={{ paddingTop: '0.4rem' }}>
          <Stepper steps={evalSteps} current={evalStep} onStepClick={(index) => { if (index <= evalStep) setEvalStep(index); }} />
          {evalStep === 0 ? (
            <div className="form-grid">
              <Input className="full" label="Run name" value={runName} placeholder="aurora-safety-29" onChange={(event) => setRunName(event.target.value)} />
              <Select className="full" label="Suite" value={suite} onChange={(event) => setSuite(event.target.value)} options={suiteOptions} />
            </div>
          ) : null}
          {evalStep === 1 ? (
            <div className="form-grid">
              <Combobox label="Model" value={model} options={modelOptions} onChange={setModel} />
              <Select label="Judge" value={judge} onChange={(event) => setJudge(event.target.value)} options={judgeOptions} />
              <NumberInput label="Sample size" value={samples} min={50} max={2000} step={10} onChange={(_, value) => setSamples(value)} />
              <Slider label="Pass threshold" min={70} max={100} value={threshold} showValue onChange={(_, value) => setThreshold(value)} />
            </div>
          ) : null}
          {evalStep === 2 ? (
            <div className="form-grid">
              <Autocomplete label="Owner" value={owner} suggestions={ownerOptions.map((item) => item.label)} onChange={setOwner} />
              <DatePicker label="Start date" value={startDate} onChange={setStartDate} />
              <TimePicker label="Start time" value={startTime} onChange={(_, value) => setStartTime(value)} />
              <Textarea className="full" label="Notes" value={notes} placeholder="What is Meera Poluru scoring?" onChange={(event) => setNotes(event.target.value)} />
              <Divider className="full" />
              <p className="note full">{runName || 'Unnamed run'} · {suiteOptions.find((item) => item.value === suite)?.label} · {modelOptions.find((item) => item.value === model)?.label} · {owner}</p>
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
}
