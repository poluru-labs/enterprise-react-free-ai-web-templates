import { useEffect, useMemo, useState } from 'react';
import {
  Autocomplete,
  Avatar,
  Button,
  Combobox,
  DatePicker,
  Divider,
  Drawer,
  DropdownMenu,
  FileUpload,
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
  Textarea,
  ThemeProvider,
  TimePicker,
  ToastProvider,
  Toolbar,
  Tooltip,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import {
  clusterOptions,
  commands,
  currentUser,
  navItems,
  notifications,
  ownerOptions,
} from './data';
import Overview from './pages/Overview.jsx';
import Runs from './pages/Runs.jsx';
import RunDetail from './pages/RunDetail.jsx';
import Experiments from './pages/Experiments.jsx';
import Datasets from './pages/Datasets.jsx';
import Models from './pages/Models.jsx';
import Clusters from './pages/Clusters.jsx';
import Settings from './pages/Settings.jsx';

function parseHash(hash) {
  const path = (hash || '#/overview').replace(/^#/, '') || '/overview';
  const parts = path.split('/').filter(Boolean);
  return { name: parts[0] || 'overview', id: parts[1] || '' };
}

const pages = {
  overview: Overview,
  runs: Runs,
  run: RunDetail,
  experiments: Experiments,
  datasets: Datasets,
  models: Models,
  clusters: Clusters,
  settings: Settings,
};

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <KilnApp />
      </ToastProvider>
    </ThemeProvider>
  );
}

function KilnApp() {
  const [hash, setHash] = useState(() => window.location.hash || '#/overview');
  const route = parseHash(hash);
  const Page = pages[route.name] || Overview;
  const [query, setQuery] = useState('');
  const [commandOpen, setCommandOpen] = useState(false);
  const [runOpen, setRunOpen] = useState(false);
  const [datasetOpen, setDatasetOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [runName, setRunName] = useState('');
  const [owner, setOwner] = useState('kavya');
  const [cluster, setCluster] = useState('c_west');
  const [epochs, setEpochs] = useState(20);
  const [lr, setLr] = useState(3);
  const [startDate, setStartDate] = useState('2026-08-28');
  const [startTime, setStartTime] = useState('22:00');
  const [notes, setNotes] = useState('');

  const sideItems = useMemo(
    () => navItems.map((item) => ({ ...item, active: route.name === item.id })),
    [route.name],
  );

  const filteredCommands = commands.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (!window.location.hash) window.location.hash = '#/overview';
    const sync = () => setHash(window.location.hash || '#/overview');
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

  function go(path) {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
  }

  function launchRun() {
    if (!runName.trim()) {
      showToast({ title: 'Name required', description: 'Give the job a run name first.', variant: 'warning' });
      return;
    }
    setRunOpen(false);
    showToast({
      title: 'Run queued',
      description: `${runName} will start on ${clusterOptions.find((item) => item.value === cluster)?.label}.`,
      variant: 'success',
    });
    setRunName('');
    go('#/runs');
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="shell">
        <aside className="sidebar">
          <a className="brand" href="#/overview">
            <span className="brand-mark" aria-hidden="true">K</span>
            <span>
              <small>Poluru Cloud</small>
              <strong>Kiln Training</strong>
            </span>
          </a>
          <SideNav className="sidebar-nav" items={sideItems} onNavigate={(_, href) => href && go(href)} />
          <div>
            <p className="quick-label">Quick links</p>
            <div className="stack">
              <Button size="sm" icon="plus" onClick={() => setRunOpen(true)}>Launch run</Button>
              <Button size="sm" variant="secondary" icon="upload" onClick={() => setDatasetOpen(true)}>Upload dataset</Button>
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
            <MenuItem value="signout" label="Sign out" danger onSelect={() => showToast({ title: 'Signed out', description: 'Kavya Poluru ended the Kiln session.', variant: 'info' })} />
          </DropdownMenu>
        </aside>

        <div className="workspace">
          <Toolbar
            className="topbar"
            start={(
              <div className="search-wrap">
                <Search
                  value={query}
                  placeholder="Search runs, experiments, owners…"
                  onChange={(_, value) => setQuery(value)}
                  onFocus={() => setCommandOpen(true)}
                />
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
                <Button icon="plus" onClick={() => setRunOpen(true)}>Launch run</Button>
              </div>
            )}
          />
          <main id="main" className="content">
            <Page
              routeId={route.id}
              query={query}
              onLaunch={() => setRunOpen(true)}
              onUpload={() => setDatasetOpen(true)}
            />
          </main>
        </div>
      </div>

      <Modal open={commandOpen} onOpenChange={setCommandOpen} heading="Jump to anything">
        <Search value={query} placeholder="Type a run, owner, or page" onChange={(_, value) => setQuery(value)} />
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
          <p className="note">Nothing matches. Try Harbor or Kavya Poluru.</p>
        )}
      </Modal>

      <Modal
        open={runOpen}
        onOpenChange={setRunOpen}
        heading="Launch training run"
        footer={(
          <>
            <Button variant="secondary" onClick={() => setRunOpen(false)}>Cancel</Button>
            <Button onClick={launchRun}>Queue run</Button>
          </>
        )}
      >
        <div className="form-grid">
          <Input className="full" label="Run name" value={runName} placeholder="harbor-encoder-v4" onChange={(event) => setRunName(event.target.value)} />
          <Autocomplete label="Owner" value={ownerOptions.find((item) => item.value === owner)?.label || ''} suggestions={ownerOptions.map((item) => item.label)} onChange={(value) => setOwner(value)} />
          <Combobox label="Cluster" value={cluster} options={clusterOptions} onChange={setCluster} />
          <NumberInput label="Epochs" value={epochs} min={1} max={200} onChange={(_, value) => setEpochs(value)} />
          <Slider label="Learning rate ×1e-4" min={1} max={10} value={lr} showValue onChange={(_, value) => setLr(value)} />
          <DatePicker label="Start date" value={startDate} onChange={setStartDate} />
          <TimePicker label="Start time" value={startTime} onChange={(_, value) => setStartTime(value)} />
          <Textarea className="full" label="Notes" value={notes} placeholder="What is Kavya Poluru optimizing?" onChange={(event) => setNotes(event.target.value)} />
        </div>
      </Modal>

      <Drawer
        open={datasetOpen}
        onOpenChange={setDatasetOpen}
        heading="Upload dataset"
        footer={<Button onClick={() => { setDatasetOpen(false); showToast({ title: 'Dataset queued', description: 'Hana Poluru will review labels before mix-in.', variant: 'success' }); }}>Save draft</Button>}
      >
        <div className="stack">
          <Select label="Owner" options={ownerOptions} defaultValue="hana" />
          <FileUpload label="Parquet or JSONL" accept=".parquet,.jsonl" multiple hint="Gold labels stay with Hana Poluru" />
          <Divider />
          <p className="note">Kiln checksums files before they land in train/val splits.</p>
        </div>
      </Drawer>
    </>
  );
}
