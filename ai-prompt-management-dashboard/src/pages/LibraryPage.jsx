import { useMemo, useState } from 'react';
import { Button, Pagination, Search, Select } from '@poluru-labs/enterprise-design-system-react';
import { useNavigate } from 'react-router-dom';
import prompts from '../data/prompts.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDate, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatusBadge,
} from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'Live', label: 'Live' },
  { value: 'Review', label: 'Review' },
  { value: 'Canary', label: 'Canary' },
  { value: 'Failed', label: 'Failed' },
  { value: 'Draft', label: 'Draft' },
];

const PAGE_SIZE = 6;

export default function LibraryPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [family, setFamily] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const byStatus = prompts.items.filter((item) => status === 'all' || item.status === status);
    const byFamily = byStatus.filter((item) => family === 'all' || item.family === family);
    return searchRecords(byFamily, query, ['name', 'owner', 'family', 'version']);
  }, [query, status, family]);

  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => {
    setQuery('');
    setStatus('all');
    setFamily('all');
    setPage(1);
  };

  return (
    <div className="pmt-page">
      <PageHeader
        title="Library"
        description="Filter the catalog, open a prompt, or queue a new draft for Sravani Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Library' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => navigate(`${BASE_PATH}/library?create=1`)}>
            New prompt
          </Button>
        }
      />

      <FilterBar
        search={(
          <Search
            value={query}
            placeholder="Search prompts or owners"
            onChange={(_, value) => {
              setQuery(value);
              setPage(1);
            }}
          />
        )}
        onReset={reset}
      >
        <Select
          label="Status"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          options={STATUS_OPTIONS}
        />
        <Select
          label="Family"
          value={family}
          onChange={(event) => {
            setFamily(event.target.value);
            setPage(1);
          }}
          options={prompts.families}
        />
      </FilterBar>

      <div className="row g-3 mb-3">
        <div className="col-12">
          <ChartSection title={`${filtered.length} prompts`} subtitle="Click a row to open versions, score, and body">
            <DataTable
              rows={rows}
              onRowClick={(row) => navigate(`${BASE_PATH}/library/${row.id}`)}
              emptyTitle="No prompts match"
              emptyDescription="Clear filters or create a new prompt."
              columns={[
                {
                  key: 'name',
                  label: 'Prompt',
                  render: (_, row) => (
                    <div>
                      <strong>{row.name}</strong>
                      <div className="pmt-subtle">{row.family} · {row.model}</div>
                    </div>
                  ),
                },
                { key: 'owner', label: 'Owner' },
                { key: 'version', label: 'Version' },
                { key: 'env', label: 'Env' },
                {
                  key: 'score',
                  label: 'Score',
                  render: (value) => formatPercent(value),
                },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} pulse={value === 'Live'} />,
                },
                {
                  key: 'updated',
                  label: 'Updated',
                  render: (value) => formatDate(value),
                },
              ]}
            />
            <div className="pmt-pager">
              <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onChange={setPage} />
            </div>
          </ChartSection>
        </div>
      </div>

      <div className="row g-3">
        {prompts.items.slice(0, 3).map((item) => (
          <div className="col-12 col-md-4" key={item.id}>
            <article className="pmt-prompt-card h-100">
              <header>
                <h3>{item.name}</h3>
                <StatusBadge status={item.status} />
              </header>
              <p className="pmt-subtle">{item.family} · {item.version} · {formatPercent(item.score)}</p>
              <p className="pmt-note">{item.owner}</p>
              <Button
                variant="tertiary"
                size="sm"
                iconTrailing="chevron-right"
                onClick={() => navigate(`${BASE_PATH}/library/${item.id}`)}
              >
                Open
              </Button>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
