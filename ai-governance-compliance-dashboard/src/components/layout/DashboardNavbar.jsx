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
  Search,
  Select,
  SplitButton,
  Stepper,
  showToast,
  useTheme,
} from '@poluru-labs/enterprise-design-system-react';
import {
  APP_NAME,
  APP_TAGLINE,
  APPROVAL_STEPS,
  BASE_PATH,
  COMMAND_ITEMS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import overview from '../../data/overview.json';
import notifications from '../../data/notifications.json';
import settings from '../../data/settings.json';
import { GovMark } from './GovMark.jsx';
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatDateTime } from '../../lib/format.js';
import { modelOptions } from '../../lib/inventory.js';
import { searchRecords } from '../../lib/search.js';

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
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [changeName, setChangeName] = useState('');
  const [changeOwner, setChangeOwner] = useState('kavya');
  const [changeModel, setChangeModel] = useState('aurora');

  const ticker = overview.ticker;

  const paletteHits = useMemo(
    () => searchRecords(COMMAND_ITEMS, paletteQuery, ['label', 'hint', 'group']),
    [paletteQuery],
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('submit') === '1' || params.get('deploy') === '1') {
      setSubmitStep(0);
      setSubmitOpen(true);
    }
  }, [location.search]);

  const openSubmit = () => {
    setSubmitStep(0);
    setSubmitOpen(true);
  };

  const submitChange = () => {
    if (!changeName.trim()) {
      showToast({ title: 'Title required', description: 'Name the change request first.', variant: 'warning' });
      setSubmitStep(0);
      return;
    }
    setSubmitOpen(false);
    setSubmitStep(0);
    const modelLabel = modelOptions.find((item) => item.value === changeModel)?.label;
    showToast({
      title: 'Submitted for approval',
      description: `${changeName} is queued against ${modelLabel}.`,
      variant: 'success',
    });
    setChangeName('');
    navigate(`${BASE_PATH}/approvals`);
  };

  const goCommand = (item) => {
    setPaletteOpen(false);
    setPaletteQuery('');
    if (item.id === 'submit-approval') {
      openSubmit();
      return;
    }
    navigate(item.to);
  };

  return (
    <header className="gov-navbar">
      <div className="gov-navbar-inner">
        <div className="gov-navbar-start">
          <Button
            className="gov-menu-btn"
            variant="secondary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel="Open navigation"
            onClick={onMenuToggle}
          />
          <div className="gov-navbar-brand">
            <GovMark className="gov-mark gov-mark-sm" />
            <div>
              <strong>{APP_NAME}</strong>
              <span>
                <span className="gov-pulse" aria-hidden="true" />
                {APP_TAGLINE}
              </span>
            </div>
          </div>
        </div>

        <div className="gov-ticker" aria-label="Live governance metrics">
          <span className="gov-ticker-chip">
            <i className="bi bi-collection" aria-hidden="true" />
            models <strong>{ticker.models}</strong>
          </span>
          <span className="gov-ticker-chip">
            <i className="bi bi-hourglass-split" aria-hidden="true" />
            pending <strong>{ticker.pending}</strong>
          </span>
          <span className="gov-ticker-chip">
            <i className="bi bi-shield-exclamation" aria-hidden="true" />
            high risk <strong>{ticker.highRisk}</strong>
          </span>
          <span className="gov-ticker-chip">
            <i className="bi bi-check2-circle" aria-hidden="true" />
            coverage <strong>{ticker.coverage}</strong>
          </span>
        </div>

        <Search
          className="gov-header-search"
          size="sm"
          placeholder="Search inventory, policies, owners"
          value={query}
          onChange={(_, value) => setQuery(value)}
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

        <div className="gov-navbar-end">
          <Button
            variant="secondary"
            size="sm"
            icon="refresh"
            onClick={() => {
              setSynced('just now');
              showToast({ title: 'Refreshed', description: 'Register pulled from production.', variant: 'info' });
            }}
          >
            Refresh
          </Button>
          <button type="button" className="gov-kbd-btn" onClick={() => setPaletteOpen(true)}>
            <Kbd>⌘K</Kbd>
          </button>
          <div className="gov-notify-wrap">
            <Button
              variant="secondary"
              size="sm"
              icon="bell"
              iconOnly
              accessibleLabel="Notifications"
              onClick={() => setNotifyOpen(true)}
            />
            {notifications.unread ? (
              <span className="gov-notify-count" aria-hidden="true">
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
          <SplitButton
            label="Submit for approval"
            size="sm"
            onClick={openSubmit}
            onSelect={({ value }) => {
              if (value === 'exception') navigate(`${BASE_PATH}/exceptions?new=1`);
              if (value === 'inventory') navigate(`${BASE_PATH}/inventory`);
            }}
          >
            <MenuItem label="Request exception" value="exception" />
            <MenuItem label="Open inventory" value="inventory" />
          </SplitButton>
          <DropdownMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            trigger={
              <button type="button" className="gov-profile" title={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}>
                <Avatar name={SIGNED_IN_USER.name} size="sm" />
                <div className="gov-profile-copy">
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
        <p className="gov-subtle">Synced {synced}</p>
        <ul className="gov-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`gov-notify-item tone-${item.tone}`}
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
        <Search
          autoFocus
          placeholder="Inventory, policies, approvals…"
          value={paletteQuery}
          onChange={(_, value) => setPaletteQuery(value)}
          aria-label="Search pages and actions"
        />
        <ul className="gov-palette-list">
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
        open={submitOpen}
        onOpenChange={(open) => {
          setSubmitOpen(open);
          if (!open) setSubmitStep(0);
        }}
        heading="Submit for approval"
        footer={(
          <>
            <Button variant="secondary" onClick={() => (submitStep === 0 ? setSubmitOpen(false) : setSubmitStep((step) => step - 1))}>
              {submitStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            {submitStep < 2 ? (
              <Button onClick={() => setSubmitStep((step) => step + 1)}>Next</Button>
            ) : (
              <Button onClick={submitChange}>Submit</Button>
            )}
          </>
        )}
      >
        <div className="gov-form-stack">
          <Stepper
            steps={APPROVAL_STEPS}
            current={submitStep}
            onStepClick={(index) => {
              if (index <= submitStep) setSubmitStep(index);
            }}
          />
          {submitStep === 0 ? (
            <Input
              label="Change title"
              value={changeName}
              placeholder="Raise Aurora Chat to EU high-risk"
              onChange={(event) => setChangeName(event.target.value)}
            />
          ) : null}
          {submitStep === 1 ? (
            <Combobox label="System" value={changeModel} options={modelOptions} onChange={setChangeModel} />
          ) : null}
          {submitStep === 2 ? (
            <>
              <Select
                label="Approver"
                value={changeOwner}
                onChange={(event) => setChangeOwner(event.target.value)}
                options={settings.ownerOptions}
              />
              <p className="gov-note">
                {changeName || 'Untitled change'} · {modelOptions.find((item) => item.value === changeModel)?.label} ·{' '}
                {settings.ownerOptions.find((item) => item.value === changeOwner)?.label}
              </p>
            </>
          ) : null}
        </div>
      </Modal>
    </header>
  );
}
