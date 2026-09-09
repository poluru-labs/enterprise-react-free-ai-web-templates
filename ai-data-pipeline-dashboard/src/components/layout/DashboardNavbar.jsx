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
  BASE_PATH,
  COMMAND_ITEMS,
  REPLAY_STEPS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import overview from '../../data/overview.json';
import notifications from '../../data/notifications.json';
import settings from '../../data/settings.json';
import { ConduitMark } from './ConduitMark.jsx';
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatDateTime } from '../../lib/format.js';
import { pipelineOptions } from '../../lib/pipelines.js';
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
  const [synced, setSynced] = useState('47s ago');
  const [replayOpen, setReplayOpen] = useState(false);
  const [replayStep, setReplayStep] = useState(0);
  const [replayName, setReplayName] = useState('');
  const [replayOwner, setReplayOwner] = useState('maya');
  const [replayJob, setReplayJob] = useState('quill-transcripts');

  const ticker = overview.ticker;
  const stages = overview.stages;
  const jobs = pipelineOptions();

  const paletteHits = useMemo(
    () => searchRecords(COMMAND_ITEMS, paletteQuery, ['label', 'hint', 'group']),
    [paletteQuery],
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('replay') === '1') {
      setReplayStep(0);
      setReplayOpen(true);
    }
  }, [location.search]);

  const openReplay = () => {
    setReplayStep(0);
    setReplayOpen(true);
  };

  const submitReplay = () => {
    if (!replayName.trim()) {
      showToast({ title: 'Window required', description: 'Name the replay window first.', variant: 'warning' });
      setReplayStep(0);
      return;
    }
    setReplayOpen(false);
    setReplayStep(0);
    const jobLabel = jobs.find((item) => item.value === replayJob)?.label;
    showToast({
      title: 'Replay queued',
      description: `${replayName} is running against ${jobLabel}.`,
      variant: 'success',
    });
    setReplayName('');
    navigate(`${BASE_PATH}/pipelines`);
  };

  const goCommand = (item) => {
    setPaletteOpen(false);
    setPaletteQuery('');
    if (item.id === 'replay-job') {
      openReplay();
      return;
    }
    navigate(item.to);
  };

  return (
    <header className="cd-navbar">
      <div className="cd-navbar-inner">
        <div className="cd-navbar-start">
          <Button
            className="cd-menu-btn"
            variant="secondary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel="Open navigation"
            onClick={onMenuToggle}
          />
          <div className="cd-navbar-brand">
            <ConduitMark className="cd-mark cd-mark-sm" />
            <div>
              <strong>{APP_NAME}</strong>
              <span>
                <span className="cd-pulse" aria-hidden="true" />
                {APP_TAGLINE}
              </span>
            </div>
          </div>
        </div>

        <div className="cd-rail" aria-label="Live pipeline stages">
          {stages.map((stage, index) => (
            <span key={stage.id} className="cd-inline">
              {index > 0 ? <span className="cd-rail-join" aria-hidden="true">→</span> : null}
              <span className={`cd-rail-step ${stage.tone === 'warn' ? 'is-warn' : ''} ${stage.tone === 'danger' ? 'is-danger' : ''}`}>
                {stage.label} <strong>{stage.count}</strong>
              </span>
            </span>
          ))}
          <span className="cd-rail-meter">
            {ticker.rowsPerSec}/s · lag {ticker.lag}
          </span>
        </div>

        <Search
          className="cd-header-search"
          size="sm"
          placeholder="Search jobs, owners, datasets"
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

        <div className="cd-navbar-end">
          <Button
            variant="secondary"
            size="sm"
            icon="refresh"
            onClick={() => {
              setSynced('just now');
              showToast({ title: 'Refreshed', description: 'Jobs pulled from production.', variant: 'info' });
            }}
          >
            Refresh
          </Button>
          <button type="button" className="cd-kbd-btn" onClick={() => setPaletteOpen(true)}>
            <Kbd>⌘K</Kbd>
          </button>
          <div className="cd-notify-wrap">
            <Button
              variant="secondary"
              size="sm"
              icon="bell"
              iconOnly
              accessibleLabel="Notifications"
              onClick={() => setNotifyOpen(true)}
            />
            {notifications.unread ? (
              <span className="cd-notify-count" aria-hidden="true">
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
            label="Replay job"
            size="sm"
            onClick={openReplay}
            onSelect={({ value }) => {
              if (value === 'quality') navigate(`${BASE_PATH}/quality`);
              if (value === 'lineage') navigate(`${BASE_PATH}/lineage`);
            }}
          >
            <MenuItem label="Open quality" value="quality" />
            <MenuItem label="Open lineage" value="lineage" />
          </SplitButton>
          <DropdownMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            trigger={
              <button type="button" className="cd-profile" title={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}>
                <Avatar name={SIGNED_IN_USER.name} size="sm" />
                <div className="cd-profile-copy">
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
        <p className="cd-subtle">Synced {synced}</p>
        <ul className="cd-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`cd-notify-item tone-${item.tone}`}
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
          placeholder="Jobs, quality, lineage…"
          value={paletteQuery}
          onChange={(_, value) => setPaletteQuery(value)}
          aria-label="Search pages and actions"
        />
        <ul className="cd-palette-list">
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
        open={replayOpen}
        onOpenChange={(open) => {
          setReplayOpen(open);
          if (!open) setReplayStep(0);
        }}
        heading="Replay a job"
        footer={(
          <>
            <Button variant="secondary" onClick={() => (replayStep === 0 ? setReplayOpen(false) : setReplayStep((step) => step - 1))}>
              {replayStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            {replayStep < 2 ? (
              <Button onClick={() => setReplayStep((step) => step + 1)}>Next</Button>
            ) : (
              <Button onClick={submitReplay}>Queue replay</Button>
            )}
          </>
        )}
      >
        <div className="cd-form-stack">
          <Stepper
            steps={REPLAY_STEPS}
            current={replayStep}
            onStepClick={(index) => {
              if (index <= replayStep) setReplayStep(index);
            }}
          />
          {replayStep === 0 ? (
            <Combobox label="Pipeline" value={replayJob} options={jobs} onChange={setReplayJob} />
          ) : null}
          {replayStep === 1 ? (
            <Input
              label="Window label"
              value={replayName}
              placeholder="Quill midnight offsets"
              onChange={(event) => setReplayName(event.target.value)}
            />
          ) : null}
          {replayStep === 2 ? (
            <>
              <Select
                label="Owner"
                value={replayOwner}
                onChange={(event) => setReplayOwner(event.target.value)}
                options={settings.ownerOptions}
              />
              <p className="cd-note">
                {replayName || 'Untitled window'} · {jobs.find((item) => item.value === replayJob)?.label} ·{' '}
                {settings.ownerOptions.find((item) => item.value === replayOwner)?.label}
              </p>
            </>
          ) : null}
        </div>
      </Modal>
    </header>
  );
}
