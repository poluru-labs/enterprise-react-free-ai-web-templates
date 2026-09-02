import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Combobox,
  Drawer,
  DropdownMenu,
  FileUpload,
  Input,
  Kbd,
  MenuItem,
  Modal,
  Select,
  Stepper,
  Textarea,
  showToast,
  useTheme,
} from '@poluru-labs/enterprise-design-system-react';
import {
  APP_NAME,
  BASE_PATH,
  COMMAND_ITEMS,
  CREATE_STEPS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import overview from '../../data/overview.json';
import notifications from '../../data/notifications.json';
import settings from '../../data/settings.json';
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatDateTime } from '../../lib/format.js';
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
  const [createOpen, setCreateOpen] = useState(false);
  const [createStep, setCreateStep] = useState(0);
  const [draftName, setDraftName] = useState('');
  const [draftFamily, setDraftFamily] = useState('');
  const [draftOwner, setDraftOwner] = useState('sravani');
  const [draftModel, setDraftModel] = useState('gpt-4.1');
  const [draftBody, setDraftBody] = useState('');

  const ticker = overview.ticker;

  const paletteHits = useMemo(
    () => searchRecords(COMMAND_ITEMS, paletteQuery, ['label', 'hint', 'group']),
    [paletteQuery],
  );

  const openCreate = () => {
    setCreateStep(0);
    setCreateOpen(true);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('create') === '1') {
      openCreate();
    }
  }, [location.search]);

  const canAdvance = () => {
    if (createStep === 0) return draftName.trim().length > 1 && draftFamily.length > 0;
    if (createStep === 1) return draftBody.trim().length > 8;
    return true;
  };

  const advance = () => {
    if (!canAdvance()) {
      showToast({
        title: 'Complete this step',
        description: createStep === 0 ? 'Add a name and family.' : 'Draft a system prompt first.',
        variant: 'warning',
      });
      return;
    }
    if (createStep < 2) {
      setCreateStep((step) => step + 1);
      return;
    }
    setCreateOpen(false);
    setCreateStep(0);
    showToast({
      title: 'Prompt queued',
      description: `${draftName || 'New prompt'} will be reviewed by ${SIGNED_IN_USER.name}.`,
      variant: 'success',
    });
    setDraftName('');
    setDraftFamily('');
    setDraftBody('');
    navigate(`${BASE_PATH}/library`);
  };

  const goCommand = (item) => {
    setPaletteOpen(false);
    setPaletteQuery('');
    if (item.id === 'new-prompt') {
      openCreate();
      return;
    }
    navigate(item.to);
  };

  const submitSearch = () => {
    const next = query.trim();
    navigate(next ? `${BASE_PATH}/search?q=${encodeURIComponent(next)}` : `${BASE_PATH}/search`);
  };

  return (
    <header className="pmt-navbar">
      <div className="pmt-mast">
        <div className="pmt-mast-inner">
          <div className="pmt-mast-start">
            <Button
              className="pmt-menu-btn"
              variant="secondary"
              size="sm"
              icon="menu"
              iconOnly
              accessibleLabel="Open navigation"
              onClick={onMenuToggle}
            />
            <a className="pmt-mast-brand" href={`${BASE_PATH}/overview`} onClick={(event) => {
              event.preventDefault();
              navigate(`${BASE_PATH}/overview`);
            }}>
              <span className="pmt-mark pmt-mark-mast" aria-hidden="true">P</span>
              <strong>{APP_NAME}</strong>
            </a>
            <span className="pmt-live-chip">
              <span className="pmt-pulse" aria-hidden="true" />
              v12 live
            </span>
          </div>

          <div className="pmt-mast-end">
            <Button
              variant="tertiary"
              size="sm"
              accessibleLabel={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              onClick={toggleTheme}
            >
              <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`} aria-hidden="true" />
            </Button>
            <div className="pmt-notify-wrap">
              <Button
                variant="tertiary"
                size="sm"
                icon="bell"
                iconOnly
                accessibleLabel="Notifications"
                onClick={() => setNotifyOpen(true)}
              />
              {notifications.unread ? (
                <span className="pmt-notify-count" aria-hidden="true">
                  {notifications.unread}
                </span>
              ) : null}
            </div>
            <DropdownMenu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              trigger={
                <button type="button" className="pmt-profile" title={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}>
                  <Avatar name={SIGNED_IN_USER.name} size="sm" />
                  <div className="pmt-profile-copy">
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
      </div>

      <div className="pmt-tray">
        <div className="pmt-tray-inner">
          <label className="pmt-underline-search">
            <i className="bi bi-search" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search prompts, owners, versions"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  submitSearch();
                }
              }}
              aria-label="Search prompts, owners, versions"
            />
          </label>

          <div className="pmt-ticker" aria-label="Live bureau metrics">
            <span className="pmt-ticker-chip">
              Live prompts <strong>{ticker.live}</strong>
            </span>
            <span className="pmt-ticker-chip">
              Eval pass <strong>{ticker.evalPass}</strong>
            </span>
            <span className="pmt-ticker-chip">
              Pending review <strong>{ticker.pending}</strong>
            </span>
            <span className="pmt-ticker-chip">
              p95 <strong>{ticker.p95}</strong>
            </span>
          </div>

          <div className="pmt-tray-end">
            <button type="button" className="pmt-kbd-btn" onClick={() => setPaletteOpen(true)}>
              <Kbd>⌘K</Kbd>
            </button>
            <Button size="sm" icon="plus" onClick={openCreate}>
              New prompt
            </Button>
          </div>
        </div>
      </div>

      <Drawer
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        heading={`${notifications.unread} unread alerts`}
        size="md"
      >
        <p className="pmt-subtle">Synced 2 min ago</p>
        <ul className="pmt-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`pmt-notify-item tone-${item.tone}`}
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
        <label className="pmt-palette-search">
          Search pages and actions
          <input
            autoFocus
            value={paletteQuery}
            onChange={(event) => setPaletteQuery(event.target.value)}
            placeholder="Library, playground, new prompt…"
          />
        </label>
        <ul className="pmt-palette-list">
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
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open);
          if (!open) setCreateStep(0);
        }}
        heading="Create a prompt"
        footer={(
          <>
            <Button variant="secondary" onClick={() => (createStep === 0 ? setCreateOpen(false) : setCreateStep((step) => step - 1))}>
              {createStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button disabled={!canAdvance()} onClick={advance}>
              {createStep === 2 ? 'Queue prompt' : 'Continue'}
            </Button>
          </>
        )}
      >
        <div className="pmt-form-stack">
          <Stepper
            steps={CREATE_STEPS}
            current={createStep}
            onStepClick={(index) => {
              if (index <= createStep) setCreateStep(index);
            }}
          />
          {createStep === 0 ? (
            <>
              <Input
                label="Prompt name"
                placeholder="Support copilot"
                icon="file"
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
              />
              <Combobox
                label="Family"
                placeholder="Choose a family"
                options={settings.familyOptions}
                value={draftFamily}
                onChange={setDraftFamily}
              />
            </>
          ) : null}
          {createStep === 1 ? (
            <>
              <Select
                label="Owner"
                options={settings.ownerOptions}
                value={draftOwner}
                onChange={(event) => setDraftOwner(event.target.value)}
              />
              <Select
                label="Model"
                options={settings.modelOptions}
                value={draftModel}
                onChange={(event) => setDraftModel(event.target.value)}
              />
              <Textarea
                label="System prompt"
                rows={5}
                placeholder="You are a careful enterprise assistant…"
                value={draftBody}
                onChange={(event) => setDraftBody(event.target.value)}
              />
            </>
          ) : null}
          {createStep === 2 ? (
            <>
              <FileUpload label="Eval cases" hint="Optional CSV of golden questions." accept=".csv,.jsonl" />
              <p className="pmt-note">
                {draftName || 'Unnamed prompt'} · {settings.familyOptions.find((item) => item.value === draftFamily)?.label} ·{' '}
                {settings.ownerOptions.find((item) => item.value === draftOwner)?.label} · {draftModel}
              </p>
            </>
          ) : null}
        </div>
      </Modal>
    </header>
  );
}
