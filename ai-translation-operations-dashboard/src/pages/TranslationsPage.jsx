import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Autocomplete,
  Badge,
  Button,
  CodeSnippet,
  DescriptionList,
  Drawer,
  EmptyState,
  Pagination,
  ProgressBar,
  Rating,
  Search,
  SegmentedControl,
  Select,
  Status,
  Toolbar,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import translations from '../data/translations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { JOB_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;
const OWNERS = [...new Set(translations.map((row) => row.owner))];

export default function TranslationsPage() {
  const [params] = useSearchParams();
  const queryFromUrl = params.get('q') ?? '';
  const [query, setQuery] = useState(queryFromUrl);
  const [localeFilter, setLocaleFilter] = useState('all');
  const [owner, setOwner] = useState('');
  const [view, setView] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(4);

  useEffect(() => {
    setQuery(queryFromUrl);
    setPage(1);
  }, [queryFromUrl]);

  useEffect(() => {
    setScore(
      selected
        ? Math.min(5, Math.ceil(((selected.quality ?? selected.progress) || 0) / 20))
        : 4,
    );
  }, [selected]);

  const filtered = useMemo(() => {
    let rows = searchRecords(translations, query, ['id', 'name', 'locale', 'owner', 'status']);
    if (localeFilter !== 'all') rows = rows.filter((row) => row.locale === localeFilter);
    if (owner.trim()) {
      const needle = owner.trim().toLowerCase();
      rows = rows.filter((row) => row.owner.toLowerCase().includes(needle));
    }
    if (view === 'review') rows = rows.filter((row) => row.status === 'In review');
    return rows;
  }, [query, localeFilter, owner, view]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > pages) setPage(1);
  }, [filtered.length, page]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="trn-page">
      <PageHeader
        title="Translations"
        description="Jobs by locale and quality score. Maya Poluru owns production with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Translations' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Job created', variant: 'success' })}
          >
            New job
          </Button>
        }
      />

      <Toolbar
        bordered
        start={
          <SegmentedControl
            size="sm"
            value={view}
            onChange={(value) => {
              setView(value);
              setPage(1);
            }}
            options={[
              { label: 'All', value: 'all' },
              { label: 'In review', value: 'review' },
            ]}
          />
        }
      />

      <div className="trn-filters">
        <Search
          placeholder="Search job, locale, or id"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <div className="trn-filter-field">
          <Select
            label="Locale"
            options={[
              { label: 'All locales', value: 'all' },
              { label: 'es-MX', value: 'es-MX' },
              { label: 'fr-FR', value: 'fr-FR' },
              { label: 'de-DE', value: 'de-DE' },
              { label: 'ja-JP', value: 'ja-JP' },
            ]}
            value={localeFilter}
            onChange={(event) => {
              setLocaleFilter(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="trn-filter-field">
          <Autocomplete
            label="Owner"
            placeholder="Filter by owner"
            value={owner}
            suggestions={OWNERS}
            onChange={setOwner}
            onSelect={(value) => {
              setOwner(value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {paged.length === 0 ? (
        <div className="trn-panel">
          <EmptyState
            heading="No translations match"
            description="Clear the filters or ask Maya Poluru for a new job."
            actions={
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setQuery('');
                  setLocaleFilter('all');
                  setOwner('');
                  setView('all');
                }}
              >
                Clear filters
              </Button>
            }
          />
        </div>
      ) : (
        <div className="trn-table-wrap">
          <table className="trn-table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Locale</th>
                <th>Progress %</th>
                <th>Words</th>
                <th>Quality</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => (
                <tr key={row.id} onClick={() => setSelected(row)}>
                  <td>
                    <span className="trn-mono">{row.id}</span>
                    <strong className="trn-cell-title">{row.name}</strong>
                  </td>
                  <td>
                    <Badge label={row.locale} variant="brand" soft size="sm" />
                  </td>
                  <td>{formatPercent(row.progress, 0)}</td>
                  <td>
                    <div className="trn-score-cell">
                      <span>{String(row.words)}</span>
                      <ProgressBar value={row.progress} max={100} />
                    </div>
                  </td>
                  <td>{row.quality ? formatPercent(row.quality, 0) : '—'}</td>
                  <td>
                    <Status label={row.status} variant={JOB_STATUS[row.status] ?? 'neutral'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length > 0 ? (
        <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onChange={setPage} />
      ) : null}

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        heading={selected?.name ?? 'Job'}
        size="md"
      >
        {selected ? (
          <div className="trn-stack">
            <DescriptionList
              columns={2}
              items={[
                { term: 'Id', description: selected.id },
                { term: 'Owner', description: selected.owner },
                { term: 'Locale', description: selected.locale },
                { term: 'Progress', description: formatPercent(selected.progress, 0) },
                { term: 'Quality', description: selected.quality ? formatPercent(selected.quality, 0) : '—' },
                { term: 'Words', description: String(selected.words) },
                { term: 'Updated', description: formatDateTime(selected.updated) },
                { term: 'Status', description: selected.status },
              ]}
            />
            <Rating
              value={score}
              max={5}
              onChange={(value) => {
                setScore(value);
                showToast({ title: `Priority set to ${value}`, variant: 'info' });
              }}
            />
            <CodeSnippet
              language="json"
              code={JSON.stringify(
                {
                  name: selected.name,
                  locale: selected.locale,
                  progress: selected.progress,
                  quality: selected.quality,
                  words: selected.words,
                },
                null,
                2,
              )}
            />
            <div className="trn-drawer-actions">
              <Button size="sm" onClick={() => showToast({ title: 'Bundle queued', variant: 'success' })}>
                Publish bundle
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => showToast({ title: 'Sent to review', variant: 'info' })}
              >
                Send to review
              </Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
