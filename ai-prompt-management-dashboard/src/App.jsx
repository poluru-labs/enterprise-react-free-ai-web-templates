import { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Combobox,
  Drawer,
  DropdownMenu,
  FileUpload,
  Input,
  Kbd,
  List,
  MenuItem,
  Modal,
  Search,
  Select,
  Stepper,
  Textarea,
  ThemeProvider,
  ToastProvider,
  Tooltip,
  VisuallyHidden,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import {
  commands,
  createSteps,
  currentUser,
  familyOptions,
  modelOptions,
  navItems,
  notifications,
  ownerOptions,
} from './data';
import Overview from './pages/Overview.jsx';
import Library from './pages/Library.jsx';
import Versions from './pages/Versions.jsx';
import Playground from './pages/Playground.jsx';
import Releases from './pages/Releases.jsx';
import Settings from './pages/Settings.jsx';

function parseHash(hash) {
  const path = (hash || '#/overview').replace(/^#/, '') || '/overview';
  const parts = path.split('/').filter(Boolean);
  return parts[0] || 'overview';
}

const pages = {
  overview: Overview,
  library: Library,
  versions: Versions,
  playground: Playground,
  releases: Releases,
  settings: Settings,
};

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <BureauApp />
      </ToastProvider>
    </ThemeProvider>
  );
}

function BureauApp() {
  const [hash, setHash] = useState(() => window.location.hash || '#/overview');
  const route = parseHash(hash);
  const Page = pages[route] || Overview;
  const [query, setQuery] = useState('');
  const [navOpen, setNavOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [createStep, setCreateStep] = useState(0);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftFamily, setDraftFamily] = useState('');
  const [draftOwner, setDraftOwner] = useState('sravani');
  const [draftModel, setDraftModel] = useState('gpt-4.1');
  const [draftBody, setDraftBody] = useState('');

  const filteredCommands = commands.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    if (!window.location.hash) window.location.hash = '#/overview';
    const sync = () => {
      setHash(window.location.hash || '#/overview');
      setNavOpen(false);
    };
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    const onCreate = () => {
      setCreateStep(0);
      setCreateOpen(true);
    };
    window.addEventListener('hashchange', sync);
    window.addEventListener('keydown', onKey);
    window.addEventListener('bureau:create', onCreate);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('bureau:create', onCreate);
    };
  }, []);

  function go(href) {
    window.location.hash = href;
    setCommandOpen(false);
    setQuery('');
  }

  function canAdvance() {
    if (createStep === 0) return draftName.trim().length > 1 && draftFamily.length > 0;
    if (createStep === 1) return draftBody.trim().length > 8;
    return true;
  }

  function advance() {
    if (!canAdvance()) return;
    if (createStep < 2) {
      setCreateStep((step) => step + 1);
      return;
    }
    setCreateOpen(false);
    setCreateStep(0);
    setDraftName('');
    setDraftFamily('');
    setDraftBody('');
    showToast({
      title: 'Prompt queued',
      description: `${draftName || 'New prompt'} will be reviewed by ${currentUser.name}.`,
      variant: 'success',
    });
    go('#/library');
  }

  return (
    <div className={`shell${navOpen ? ' nav-open' : ''}`}>
      <header className="topbar">
        <div className="topbar-inner">
          <Button
            className="menu-button topbar-icon"
            variant="tertiary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel="Open navigation"
            onClick={() => setNavOpen((open) => !open)}
          />
          <a className="brand" href="#/overview">
            <span className="brand-mark">P</span>
            <span className="brand-copy">
              <small>Poluru Cloud</small>
              <strong>Prompt Bureau</strong>
            </span>
          </a>
          <span className="live-pill">
            <Badge label="Live" variant="success" pill />
          </span>
          <Search
            className="topbar-search"
            size="md"
            placeholder="Search prompts, owners, versions..."
            clearable
            value={query}
            onChange={(_, value) => setQuery(value)}
            onFocus={() => setCommandOpen(true)}
          />
          <div className="topbar-actions">
            <Kbd className="topbar-kbd">⌘K</Kbd>
            <Tooltip content="Inbox">
              <Button
                className="topbar-icon"
                variant="tertiary"
                size="sm"
                icon="bell"
                iconOnly
                accessibleLabel="Open inbox"
                onClick={() => setInboxOpen(true)}
              />
            </Tooltip>
            <Button className="topbar-cta" variant="primary" size="sm" icon="plus" onClick={() => { setCreateStep(0); setCreateOpen(true); }}>
              New prompt
            </Button>
            <DropdownMenu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              trigger={(
                <button type="button" className="account">
                  <Avatar name={currentUser.name} size="sm" />
                  <span>
                    <strong>{currentUser.name}</strong>
                    <small>{currentUser.role}</small>
                  </span>
                </button>
              )}
            >
              <MenuItem value="settings" label="Workspace settings" onSelect={() => go('#/settings')} />
              <MenuItem value="create" label="New prompt" onSelect={() => { setCreateStep(0); setCreateOpen(true); }} />
            </DropdownMenu>
          </div>
        </div>
      </header>

      <aside className="sidebar">
        <nav className="nav" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={route === item.id ? 'is-active' : ''}
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <p className="quick-label">Quick links</p>
        <Button variant="primary" size="sm" icon="plus" fullWidth onClick={() => { setCreateStep(0); setCreateOpen(true); }}>
          New prompt
        </Button>
        <div className="profile">
          <Avatar name={currentUser.name} size="sm" />
          <div>
            <strong>{currentUser.name}</strong>
            <small>{currentUser.role}</small>
          </div>
        </div>
      </aside>

      <button type="button" className="backdrop" aria-label="Close navigation" onClick={() => setNavOpen(false)} />

      <div className="main">
        <main>
          <VisuallyHidden>Prompt Bureau prompt management workspace</VisuallyHidden>
          <Page />
        </main>
      </div>

      <Modal open={commandOpen} heading="Jump to" onOpenChange={setCommandOpen}>
        <Search placeholder="Prompts, pages, owners…" value={query} onChange={(_, value) => setQuery(value)} clearable />
        <div className="cmd-list">
          {filteredCommands.map((item) => (
            <button key={item.label} type="button" onClick={() => go(item.href)}>{item.label}</button>
          ))}
        </div>
      </Modal>

      <Modal
        open={createOpen}
        heading="Create a prompt"
        onOpenChange={setCreateOpen}
        footer={(
          <>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>Cancel</Button>
            {createStep > 0 ? <Button variant="tertiary" onClick={() => setCreateStep((step) => step - 1)}>Back</Button> : null}
            <Button disabled={!canAdvance()} onClick={advance}>{createStep === 2 ? 'Queue prompt' : 'Continue'}</Button>
          </>
        )}
      >
        <div className="modal-grid">
          <Stepper steps={createSteps} current={createStep} onStepClick={setCreateStep} />
          {createStep === 0 ? (
            <>
              <Input label="Prompt name" placeholder="Support copilot" icon="file" value={draftName} onChange={(event) => setDraftName(event.target.value)} />
              <Combobox label="Family" placeholder="Choose a family" options={familyOptions} value={draftFamily} onChange={setDraftFamily} />
            </>
          ) : createStep === 1 ? (
            <>
              <Select label="Owner" options={ownerOptions} value={draftOwner} onChange={(event) => setDraftOwner(event.target.value)} />
              <Select label="Model" options={modelOptions} value={draftModel} onChange={(event) => setDraftModel(event.target.value)} />
              <Textarea label="System prompt" rows={5} placeholder="You are a careful enterprise assistant…" value={draftBody} onChange={(event) => setDraftBody(event.target.value)} />
            </>
          ) : (
            <FileUpload label="Eval cases" hint="Optional CSV of golden questions." accept=".csv,.jsonl" />
          )}
        </div>
      </Modal>

      <Drawer open={inboxOpen} heading="Inbox" side="right" size="md" onOpenChange={setInboxOpen}>
        <div className="drawer-stack">
          <List items={notifications} divided />
        </div>
      </Drawer>
    </div>
  );
}
