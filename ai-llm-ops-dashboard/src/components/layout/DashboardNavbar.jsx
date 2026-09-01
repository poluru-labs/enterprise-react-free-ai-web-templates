import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Combobox,
  Drawer,
  DropdownMenu,
  Input,
  Kbd,
  MenuItem,
  Modal,
  Select,
  Stepper,
  showToast,
  useTheme,
} from '@poluru-labs/enterprise-design-system-react';
import {
  APP_NAME,
  APP_TAGLINE,
  BASE_PATH,
  COMMAND_ITEMS,
  DEPLOY_STEPS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import overview from '../../data/overview.json';
import notifications from '../../data/notifications.json';
import settings from '../../data/settings.json';
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatDateTime } from '../../lib/format.js';
import { modelOptions } from '../../lib/models.js';
import { searchRecords } from '../../lib/search.js';

function OpsMark({ className = 'llm-mark llm-mark-sm' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="7" y="7" width="18" height="18" rx="5" fill="#4338CA" />
      <rect x="11.5" y="11.5" width="9" height="9" rx="2" fill="#22D3EE" />
      <path d="M16 2.8 17.2 6 20.4 6.4 18 8.6 18.6 11.8 16 10 13.4 11.8 14 8.6 11.6 6.4 14.8 6Z" fill="#A5F3FC" />
      <rect x="15.2" y="1.6" width="1.6" height="4.2" rx="0.6" fill="#818CF8" />
      <rect x="15.2" y="26.2" width="1.6" height="4.2" rx="0.6" fill="#818CF8" />
      <rect x="1.6" y="15.2" width="4.2" height="1.6" rx="0.6" fill="#818CF8" />
      <rect x="26.2" y="15.2" width="4.2" height="1.6" rx="0.6" fill="#818CF8" />
    </svg>
  );
}

export function DashboardNavbar({ onMenuToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();
  const [query, setQuery] = useState('');
  const [paletteQuery, setPaletteQuery] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [synced, setSynced] = useState('2 min ago');
  const [deployOpen, setDeployOpen] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [deployName, setDeployName] = useState('');
  const [deployOwner, setDeployOwner] = useState('subrahmanyam');
  const [deployModel, setDeployModel] = useState('aurora');

  const ticker = overview.ticker;

  const paletteHits = useMemo(
    () => searchRecords(COMMAND_ITEMS, paletteQuery, ['label', 'hint', 'group']),
    [paletteQuery],
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('deploy') === '1') {
      setDeployStep(0);
      setDeployOpen(true);
    }
    if (params.get('run') === '1') {
      window.dispatchEvent(new Event('llm:run-playground'));
    }
  }, [location.search]);

  const openDeploy = () => {
    setDeployStep(0);
    setDeployOpen(true);
  };

  const deploy = () => {
    if (!deployName.trim()) {
      showToast({ title: 'Name required', description: 'Give the endpoint a name first.', variant: 'warning' });
      setDeployStep(0);
      return;
    }
    setDeployOpen(false);
    setDeployStep(0);
    const modelLabel = modelOptions.find((item) => item.value === deployModel)?.label;
    showToast({
      title: 'Deploy queued',
      description: `${deployName} will land on ${modelLabel}.`,
      variant: 'success',
    });
    setDeployName('');
    navigate(`${BASE_PATH}/models`);
  };

  const goCommand = (item) => {
    setPaletteOpen(false);
    setPaletteQuery('');
    if (item.id === 'deploy-model') {
      openDeploy();
      return;
    }
    if (item.id === 'generate') {
      navigate(`${BASE_PATH}/playground`);
      window.setTimeout(() => window.dispatchEvent(new Event('llm:run-playground')), 40);
      return;
    }
    navigate(item.to);
  };

  return (
    <header className="llm-navbar">
      <div className="llm-navbar-stripe" aria-hidden="true" />
      <div className="llm-navbar-inner">
        <div className="llm-navbar-start">
          <Button
            className="llm-menu-btn"
            variant="secondary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel="Open navigation"
            onClick={onMenuToggle}
          />
          <div className="llm-navbar-brand">
            <OpsMark />
            <div>
              <strong>{APP_NAME}</strong>
              <span>
                <span className="llm-pulse" aria-hidden="true" />
                {APP_TAGLINE}
              </span>
            </div>
          </div>
        </div>

        <div className="llm-ticker" aria-label="Live telemetry">
          <span className="llm-ticker-chip">
            <i className="bi bi-stopwatch" aria-hidden="true" />
            p95 <strong>{ticker.p95}</strong>
          </span>
          <span className="llm-ticker-chip">
            <i className="bi bi-exclamation-triangle" aria-hidden="true" />
            errors <strong>{ticker.errors}</strong>
          </span>
          <span className="llm-ticker-chip">
            <i className="bi bi-wallet2" aria-hidden="true" />
            spend <strong>{ticker.spend}</strong>
          </span>
          <span className="llm-ticker-chip">
            <i className="bi bi-activity" aria-hidden="true" />
            <strong>{ticker.requests}</strong> req
          </span>
        </div>

        <label className="llm-inset-search">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search models, traces, owners"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => {
              setPaletteQuery(query);
              setPaletteOpen(true);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                setPaletteQuery(query);
                setPaletteOpen(true);
              }
            }}
            aria-label="Search the workspace"
          />
        </label>

        <div className="llm-navbar-end">
          <Button
            variant="tertiary"
            size="sm"
            icon="refresh"
            onClick={() => {
              setSynced('just now');
              showToast({ title: 'Refreshed', description: 'Metrics pulled from production.', variant: 'info' });
            }}
          >
            Refresh
          </Button>
          <button type="button" className="llm-kbd-btn" onClick={() => setPaletteOpen(true)}>
            <Kbd>⌘K</Kbd>
          </button>
          <div className="llm-notify-wrap">
            <Button
              variant="tertiary"
              size="sm"
              icon="bell"
              iconOnly
              accessibleLabel="Notifications"
              onClick={() => setNotifyOpen(true)}
            />
            {notifications.unread ? (
              <span className="llm-notify-count" aria-hidden="true">
                {notifications.unread}
              </span>
            ) : null}
          </div>
          <Button
            variant="tertiary"
            size="sm"
            accessibleLabel={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggleTheme}
          >
            <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`} aria-hidden="true" />
          </Button>
          <Button size="sm" icon="plus" onClick={openDeploy}>
            Deploy model
          </Button>
          <DropdownMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            trigger={
              <button type="button" className="llm-profile" title={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}>
                <Avatar name={SIGNED_IN_USER.name} size="sm" />
                <div className="llm-profile-copy">
                  <strong>{SIGNED_IN_USER.name}</strong>
                  <span>{SIGNED_IN_USER.role}</span>
                </div>
              </button>
            }
          >
            <MenuItem
              label="Workspace settings"
              value="settings"
              onSelect={() => {
                setMenuOpen(false);
                navigate(`${BASE_PATH}/settings`);
              }}
            />
            <MenuItem
              label="Open command palette"
              value="palette"
              onSelect={() => {
                setMenuOpen(false);
                setPaletteOpen(true);
              }}
            />
            <MenuItem
              label="Sign out"
              value="signout"
              danger
              onSelect={() =>
                showToast({
                  title: 'Signed out',
                  description: `${SIGNED_IN_USER.name} ended the session.`,
                  variant: 'info',
                })
              }
            />
          </DropdownMenu>
        </div>
      </div>

      <Drawer
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        heading={`${notifications.unread} unread alerts`}
        size="md"
      >
        <p className="llm-subtle">Synced {synced}</p>
        <ul className="llm-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`llm-notify-item tone-${item.tone}`}
                onClick={() => {
                  setNotifyOpen(false);
                  navigate(item.href);
                }}
              >
                <strong>{item.title}</strong>
                <p>{item.body}</p>
                <span>{formatDateTime(item.time)}</span>
              </button>
            </li>
          ))}
        </ul>
      </Drawer>

      <Modal
        open={paletteOpen}
        onOpenChange={(open) => {
          setPaletteOpen(open);
          if (!open) setPaletteQuery('');
        }}
        heading="Jump to anything"
      >
        <label className="llm-palette-search">
          Search pages and actions
          <input
            autoFocus
            value={paletteQuery}
            onChange={(event) => setPaletteQuery(event.target.value)}
            placeholder="Models, traces, deploy…"
          />
        </label>
        <ul className="llm-palette-list">
          {paletteHits.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => goCommand(item)}>
                <strong>{item.label}</strong>
                <span>{item.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </Modal>

      <Modal
        open={deployOpen}
        onOpenChange={(open) => {
          setDeployOpen(open);
          if (!open) setDeployStep(0);
        }}
        heading="Deploy model"
        footer={(
          <>
            <Button variant="secondary" onClick={() => (deployStep === 0 ? setDeployOpen(false) : setDeployStep((step) => step - 1))}>
              {deployStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            {deployStep < 2 ? (
              <Button onClick={() => setDeployStep((step) => step + 1)}>Next</Button>
            ) : (
              <Button onClick={deploy}>Queue deploy</Button>
            )}
          </>
        )}
      >
        <div className="llm-form-stack">
          <Stepper
            steps={DEPLOY_STEPS}
            current={deployStep}
            onStepClick={(index) => {
              if (index <= deployStep) setDeployStep(index);
            }}
          />
          {deployStep === 0 ? (
            <Input
              label="Endpoint name"
              value={deployName}
              placeholder="aurora-chat-prod"
              onChange={(event) => setDeployName(event.target.value)}
            />
          ) : null}
          {deployStep === 1 ? (
            <Combobox label="Base model" value={deployModel} options={modelOptions} onChange={setDeployModel} />
          ) : null}
          {deployStep === 2 ? (
            <>
              <Select
                label="Owner"
                value={deployOwner}
                onChange={(event) => setDeployOwner(event.target.value)}
                options={settings.ownerOptions}
              />
              <p className="llm-note">
                {deployName || 'Unnamed endpoint'} · {modelOptions.find((item) => item.value === deployModel)?.label} ·{' '}
                {settings.ownerOptions.find((item) => item.value === deployOwner)?.label}
              </p>
            </>
          ) : null}
        </div>
      </Modal>
    </header>
  );
}
