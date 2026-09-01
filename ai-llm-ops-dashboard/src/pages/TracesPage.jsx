import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Drawer,
  Pagination,
  Search,
  Select,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import traces from '../data/traces.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, DataTable, FilterBar, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

export default function TracesPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(traces[0]);
  const pageSize = 8;

  useEffect(() => {
    const exportTraces = () => showToast({ title: 'Export started', description: 'CSV will land with Kavya Poluru.', variant: 'info' });
    window.addEventListener('llm:export-traces', exportTraces);
    return () => window.removeEventListener('llm:export-traces', exportTraces);
  }, []);

  const filtered = useMemo(() => {
    const statusOk = traces.filter((item) => status === 'all' || item.status === status);
    return searchRecords(statusOk, query, ['id', 'model', 'user', 'status']);
  }, [query, status]);

  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const errors = traces.filter((item) => item.status === 'error').length;
  const warns = traces.filter((item) => item.status === 'warn').length;

  return (
    <div className="llm-page">
      <PageHeader
        title="Live traces"
        description="Last 15 minutes · p95 still on Lens. Inspect latency, tokens, and failures."
        crumbs={[BREADCRUMB_ROOT, { label: 'Traces' }]}
        actions={
          <Button
            size="sm"
            variant="secondary"
            icon="download"
            onClick={() => showToast({ title: 'Export started', description: 'CSV will land with Kavya Poluru.', variant: 'info' })}
          >
            Export
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Traces" value={traces.length} icon="bi-activity" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="OK" value={traces.length - errors - warns} icon="bi-check-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Watch" value={warns} icon="bi-eye" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Errors" value={errors} hint="Priya Poluru’s Aurora timeout" icon="bi-exclamation-triangle" tone="danger" />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            value={query}
            placeholder="Search traces"
            onChange={(_, value) => {
              setQuery(value);
              setPage(1);
            }}
          />
        }
        onReset={() => {
          setQuery('');
          setStatus('all');
          setPage(1);
        }}
      >
        <Select
          label="Status"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          options={[
            { value: 'all', label: 'All statuses' },
            { value: 'ok', label: 'OK' },
            { value: 'warn', label: 'Watch' },
            { value: 'error', label: 'Error' },
          ]}
        />
      </FilterBar>

      <ChartSection title={`${filtered.length} traces in this window`} subtitle="Click a row to inspect">
        <DataTable
          rows={rows}
          onRowClick={(item) => {
            setActive(item);
            setOpen(true);
          }}
          rowClassName={(row) => (row.status === 'error' ? 'is-severe' : row.status === 'warn' ? 'is-attention' : '')}
          columns={[
            { key: 'id', label: 'Trace', className: 'llm-mono' },
            { key: 'model', label: 'Model' },
            { key: 'user', label: 'Caller' },
            {
              key: 'latency',
              label: 'Latency',
              render: (value) => `${value}ms`,
            },
            { key: 'tokens', label: 'Tokens' },
            { key: 'when', label: 'When' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
          ]}
        />
        <div className="llm-footer-row">
          <span className="llm-subtle">{filtered.length} traces in this window</span>
          <Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
        </div>
      </ChartSection>

      <Drawer open={open} onOpenChange={setOpen} heading={active.id} footer={<Button onClick={() => setOpen(false)}>Close</Button>}>
        <p className="llm-subtle">{active.model} · {active.user}</p>
        <StatusBadge status={active.status} />
        <p className="llm-note" style={{ marginTop: 12 }}>{active.latency}ms · {active.tokens} tokens · {active.when}</p>
        <p className="llm-note">Priya Poluru’s timeout on Aurora is the only error in this window.</p>
        <Button
          className="mt-3"
          size="sm"
          variant="secondary"
          icon="copy"
          onClick={() => showToast({ title: 'Trace copied', description: `${active.id} is on the clipboard.`, variant: 'info' })}
        >
          Copy id
        </Button>
      </Drawer>
    </div>
  );
}
