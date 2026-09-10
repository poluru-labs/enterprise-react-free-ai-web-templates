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
  LAUNCH_STEPS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import overview from '../../data/overview.json';
import notifications from '../../data/notifications.json';
import settings from '../../data/settings.json';
import { MarqueeMark } from './MarqueeMark.jsx';
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatDateTime } from '../../lib/format.js';
import { campaignOptions } from '../../lib/campaigns.js';
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
  const [synced, setSynced] = useState('32s ago');
  const [launchOpen, setLaunchOpen] = useState(false);
  const [launchStep, setLaunchStep] = useState(0);
  const [launchName, setLaunchName] = useState('');
  const [launchOwner, setLaunchOwner] = useState('kavya');
  const [launchAudience, setLaunchAudience] = useState('trustees');

  const ticker = overview.ticker;
  const stages = overview.stages;
  const audiences = campaignOptions();

  const paletteHits = useMemo(
    () => searchRecords(COMMAND_ITEMS, paletteQuery, ['label', 'hint', 'group']),
    [paletteQuery],
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('launch') === '1') {
      setLaunchStep(0);
      setLaunchOpen(true);
    }
  }, [location.search]);

  const openLaunch = () => {
    setLaunchStep(0);
    setLaunchOpen(true);
  };

  const submitLaunch = () => {
    if (!launchName.trim()) {
      showToast({ title: 'Name required', description: 'Name the flight first.', variant: 'warning' });
      setLaunchStep(0);
      return;
    }
    setLaunchOpen(false);
    setLaunchStep(0);
    const audienceLabel = audiences.find((item) => item.value === launchAudience)?.label;
    showToast({
      title: 'Draft queued',
      description: `${launchName} is staged against ${audienceLabel}.`,
      variant: 'success',
    });
    setLaunchName('');
    navigate(`${BASE_PATH}/campaigns`);
  };

  const goCommand = (item) => {
    setPaletteOpen(false);
    setPaletteQuery('');
    if (item.id === 'launch-campaign') {
      openLaunch();
      return;
    }
    navigate(item.to);
  };

  return (
    <header className="mq-navbar">
      <div className="mq-navbar-inner">
        <div className="mq-navbar-start">
          <Button
            className="mq-menu-btn"
            variant="secondary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel="Open navigation"
            onClick={onMenuToggle}
          />
          <div className="mq-navbar-brand">
            <MarqueeMark className="mq-mark mq-mark-sm" />
            <div>
              <strong>{APP_NAME}</strong>
              <span>
                <span className="mq-pulse" aria-hidden="true" />
                {APP_TAGLINE}
              </span>
            </div>
          </div>
        </div>

        <div className="mq-rail" aria-label="Live marketing funnel">
          {stages.map((stage, index) => (
            <span key={stage.id} className="mq-inline">
              {index > 0 ? <span className="mq-rail-join" aria-hidden="true">→</span> : null}
              <span className={`mq-rail-step ${stage.tone === 'warn' ? 'is-warn' : ''} ${stage.tone === 'danger' ? 'is-danger' : ''}`}>
                {stage.label} <strong>{stage.count}</strong>
              </span>
            </span>
          ))}
          <span className="mq-rail-meter">
            ROAS {ticker.roas} · {ticker.spend}
          </span>
        </div>

        <Search
          className="mq-header-search"
          size="sm"
          placeholder="Search campaigns, audiences, creative"
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

        <div className="mq-navbar-end">
          <Button
            variant="secondary"
            size="sm"
            icon="refresh"
            onClick={() => {
              setSynced('just now');
              showToast({ title: 'Refreshed', description: 'Flights pulled from ad and email desks.', variant: 'info' });
            }}
          >
            Refresh
          </Button>
          <button type="button" className="mq-kbd-btn" onClick={() => setPaletteOpen(true)}>
            <Kbd>⌘K</Kbd>
          </button>
          <div className="mq-notify-wrap">
            <Button
              variant="secondary"
              size="sm"
              icon="bell"
              iconOnly
              accessibleLabel="Notifications"
              onClick={() => setNotifyOpen(true)}
            />
            {notifications.unread ? (
              <span className="mq-notify-count" aria-hidden="true">
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
            label="Launch campaign"
            size="sm"
            onClick={openLaunch}
            onSelect={({ value }) => {
              if (value === 'audiences') navigate(`${BASE_PATH}/audiences`);
              if (value === 'automation') navigate(`${BASE_PATH}/automation`);
            }}
          >
            <MenuItem label="Open audiences" value="audiences" />
            <MenuItem label="Open automation" value="automation" />
          </SplitButton>
          <DropdownMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            trigger={
              <button type="button" className="mq-profile" title={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}>
                <Avatar name={SIGNED_IN_USER.name} size="sm" />
                <div className="mq-profile-copy">
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
        <p className="mq-subtle">Synced {synced}</p>
        <ul className="mq-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`mq-notify-item tone-${item.tone}`}
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
          placeholder="Campaigns, audiences, journeys…"
          value={paletteQuery}
          onChange={(_, value) => setPaletteQuery(value)}
          aria-label="Search pages and actions"
        />
        <ul className="mq-palette-list">
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
        open={launchOpen}
        onOpenChange={(open) => {
          setLaunchOpen(open);
          if (!open) setLaunchStep(0);
        }}
        heading="Launch a campaign"
        footer={(
          <>
            <Button variant="secondary" onClick={() => (launchStep === 0 ? setLaunchOpen(false) : setLaunchStep((step) => step - 1))}>
              {launchStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            {launchStep < 2 ? (
              <Button onClick={() => setLaunchStep((step) => step + 1)}>Next</Button>
            ) : (
              <Button onClick={submitLaunch}>Queue draft</Button>
            )}
          </>
        )}
      >
        <div className="mq-form-stack">
          <Stepper
            steps={LAUNCH_STEPS}
            current={launchStep}
            onStepClick={(index) => {
              if (index <= launchStep) setLaunchStep(index);
            }}
          />
          {launchStep === 0 ? (
            <Input
              label="Flight name"
              value={launchName}
              placeholder="Autumn trustee nurture"
              onChange={(event) => setLaunchName(event.target.value)}
            />
          ) : null}
          {launchStep === 1 ? (
            <Combobox label="Audience" value={launchAudience} options={audiences} onChange={setLaunchAudience} />
          ) : null}
          {launchStep === 2 ? (
            <>
              <Select
                label="Owner"
                value={launchOwner}
                onChange={(event) => setLaunchOwner(event.target.value)}
                options={settings.ownerOptions}
              />
              <p className="mq-note">
                {launchName || 'Untitled flight'} · {audiences.find((item) => item.value === launchAudience)?.label} ·{' '}
                {settings.ownerOptions.find((item) => item.value === launchOwner)?.label}
              </p>
            </>
          ) : null}
        </div>
      </Modal>
    </header>
  );
}
