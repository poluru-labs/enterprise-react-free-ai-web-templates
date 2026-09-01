import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Drawer,
  DropdownMenu,
  Kbd,
  MenuItem,
  Modal,
  showToast,
  useTheme,
} from '@poluru-labs/enterprise-design-system-react';
import {
  APP_NAME,
  APP_TAGLINE,
  BASE_PATH,
  COMMAND_ITEMS,
  SIGNED_IN_USER,
} from '../../constants/navigation.js';
import overview from '../../data/overview.json';
import notifications from '../../data/notifications.json';
import { useCommandPalette } from '../../hooks/useCommandPalette.js';
import { formatCompact, formatDateTime, formatNumber } from '../../lib/format.js';
import { searchRecords } from '../../lib/search.js';

export function DocumentMark({ className = 'rag-mark rag-mark-sm' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7.5 4.5h12.2L26 10.6V26a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 5 26V7a2.5 2.5 0 0 1 2.5-2.5Z" fill="#0F766E" />
      <path d="M19.6 4.5V11H26" fill="#134E4A" />
      <path d="M19.6 4.5 26 11h-4.2A2.2 2.2 0 0 1 19.6 8.8V4.5Z" fill="#99F6E4" />
      <rect x="9.2" y="14.2" width="13.2" height="1.6" rx="0.6" fill="#F7F4EE" />
      <rect x="9.2" y="18" width="10.2" height="1.6" rx="0.6" fill="#CCFBF1" />
      <rect x="9.2" y="21.8" width="7.4" height="1.6" rx="0.6" fill="#99F6E4" />
    </svg>
  );
}

export function DashboardNavbar({ onMenuToggle }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { open: paletteOpen, setOpen: setPaletteOpen } = useCommandPalette();
  const [query, setQuery] = useState('');
  const [paletteQuery, setPaletteQuery] = useState('');
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const ticker = overview.ticker;

  const paletteHits = useMemo(
    () => searchRecords(COMMAND_ITEMS, paletteQuery, ['label', 'hint', 'group']),
    [paletteQuery],
  );

  const runSearch = () => {
    const next = query.trim();
    if (!next) return;
    navigate(`${BASE_PATH}/search?q=${encodeURIComponent(next)}`);
  };

  const uploadDocuments = () => {
    showToast({
      title: 'Upload panel opened',
      description: 'Drop PDFs or connect a source to grow the index.',
      variant: 'info',
    });
    navigate(`${BASE_PATH}/knowledge-base?upload=1`);
  };

  const goCommand = (item) => {
    setPaletteOpen(false);
    setPaletteQuery('');
    if (item.id === 'upload-docs') {
      uploadDocuments();
      return;
    }
    navigate(item.to);
  };

  return (
    <header className="rag-navbar">
      <div className="rag-navbar-row rag-navbar-primary">
        <div className="rag-navbar-start">
          <Button
            className="rag-menu-btn"
            variant="secondary"
            size="sm"
            icon="menu"
            iconOnly
            accessibleLabel="Open navigation"
            onClick={onMenuToggle}
          />
          <div className="rag-navbar-brand">
            <DocumentMark />
            <div>
              <strong>{APP_NAME}</strong>
              <span>{APP_TAGLINE}</span>
            </div>
          </div>
        </div>

        <label className="rag-pill-search">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search documents, collections, citations"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                runSearch();
              }
            }}
            aria-label="Search the knowledge base"
          />
          <button type="button" className="rag-kbd-btn" onClick={() => setPaletteOpen(true)}>
            <Kbd>⌘K</Kbd>
          </button>
        </label>

        <div className="rag-navbar-end">
          <Button size="sm" icon="upload" onClick={uploadDocuments}>
            Upload documents
          </Button>
          <div className="rag-notify-wrap">
            <Button
              variant="tertiary"
              size="sm"
              icon="bell"
              iconOnly
              accessibleLabel="Notifications"
              onClick={() => setNotifyOpen(true)}
            />
            {notifications.unread ? (
              <span className="rag-notify-count" aria-hidden="true">
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
          <DropdownMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            trigger={
              <button type="button" className="rag-profile" title={`${SIGNED_IN_USER.name} · ${SIGNED_IN_USER.role}`}>
                <Avatar name={SIGNED_IN_USER.name} size="sm" />
                <div className="rag-profile-copy">
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
          </DropdownMenu>
        </div>
      </div>

      <div className="rag-navbar-row rag-navbar-ticker" aria-label="Citation ticker">
        <span className="rag-ticker-chip">
          <i className="bi bi-files" aria-hidden="true" />
          Indexed <strong>{formatNumber(ticker.indexedDocs)} docs</strong>
        </span>
        <span className="rag-ticker-chip">
          <i className="bi bi-layers" aria-hidden="true" />
          Chunks <strong>{formatCompact(ticker.chunks)}</strong>
        </span>
        <span className="rag-ticker-chip">
          <i className="bi bi-arrow-repeat" aria-hidden="true" />
          Last crawl <strong>{ticker.lastCrawl}</strong>
        </span>
        <span className="rag-ticker-chip">
          <span className="rag-pulse" />
          <strong>{ticker.healthySources} sources</strong> healthy
        </span>
      </div>

      <Drawer
        open={notifyOpen}
        onOpenChange={setNotifyOpen}
        heading={`${notifications.unread} unread alerts`}
        size="md"
      >
        <ul className="rag-notify-list">
          {notifications.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`rag-notify-item tone-${item.tone}`}
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
        heading="Jump to a screen"
      >
        <label className="rag-palette-search">
          Search pages and actions
          <input
            autoFocus
            value={paletteQuery}
            onChange={(event) => setPaletteQuery(event.target.value)}
            placeholder="Knowledge base, collections, upload…"
          />
        </label>
        <ul className="rag-palette-list">
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
    </header>
  );
}
