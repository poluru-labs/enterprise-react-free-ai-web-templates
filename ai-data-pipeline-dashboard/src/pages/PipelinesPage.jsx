import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Pagination,
  Search,
  SegmentedControl,
  Select,
  Tag,
  Toolbar,
} from '@poluru-labs/enterprise-design-system-react';
import pipelines from '../data/pipelines.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCompact, formatDuration } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { DataTable, FilterBar, PageHeader, SlaBadge, StatusBadge } from '../components/widgets/index.js';

const PAGE_SIZE = 6;

export default function PipelinesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [stage, setStage] = useState('all');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let rows = searchRecords(pipelines, query, ['name', 'owner', 'source', 'destination', 'engine']);
    if (stage !== 'all') rows = rows.filter((row) => row.stage === stage);
    if (status !== 'all') rows = rows.filter((row) => row.status.toLowerCase() === status);
    if (view === 'attention') rows = rows.filter((row) => row.status === 'Delayed' || row.status === 'Failed');
    return rows;
  }, [query, stage, status, view]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => {
    setQuery('');
    setStage('all');
    setStatus('all');
    setView('all');
    setPage(1);
  };

  return (
    <div className="cd-page">
      <PageHeader
        title="Pipelines"
        description="Named lanes with owners, SLA, and quality score."
        crumbs={[BREADCRUMB_ROOT, { label: 'Pipelines' }]}
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
              { label: 'Attention', value: 'attention' },
            ]}
          />
        }
        end={
          <div className="cd-tag-row">
            <Tag label={`${filtered.length} pipelines`} variant="brand" />
          </div>
        }
      />

      <FilterBar
        onReset={reset}
        search={
          <Search
            size="sm"
            placeholder="Search name, owner, engine"
            value={query}
            onChange={(_, value) => {
              setQuery(value);
              setPage(1);
            }}
          />
        }
      >
        <Select
          label="Stage"
          size="sm"
          value={stage}
          onChange={(event) => {
            setStage(event.target.value);
            setPage(1);
          }}
          options={[
            { value: 'all', label: 'All stages' },
            { value: 'ingest', label: 'Ingest' },
            { value: 'transform', label: 'Transform' },
          ]}
        />
        <Select
          label="Status"
          size="sm"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          options={[
            { value: 'all', label: 'All statuses' },
            { value: 'running', label: 'Running' },
            { value: 'healthy', label: 'Healthy' },
            { value: 'delayed', label: 'Delayed' },
            { value: 'failed', label: 'Failed' },
          ]}
        />
      </FilterBar>

      <DataTable
        rows={paged}
        onRowClick={(row) => navigate(`${BASE_PATH}/pipelines/${row.id}`)}
        rowClassName={(row) => (row.status === 'Failed' ? 'is-severe' : row.status === 'Delayed' ? 'is-attention' : '')}
        columns={[
          {
            key: 'name',
            label: 'Pipeline',
            render: (_, row) => (
              <div>
                <strong>{row.name}</strong>
                <div className="cd-subtle">{row.owner} · {row.engine}</div>
              </div>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => <StatusBadge status={value} />,
          },
          {
            key: 'sla',
            label: 'SLA',
            render: (value) => <SlaBadge sla={value} />,
          },
          {
            key: 'lagMinutes',
            label: 'Lag',
            render: (value) => formatDuration(value),
          },
          {
            key: 'volume24h',
            label: '24h volume',
            render: (value) => formatCompact(value),
          },
          {
            key: 'qualityScore',
            label: 'Quality',
            render: (value) => `${value}%`,
          },
        ]}
      />

      {filtered.length > PAGE_SIZE ? (
        <div className="mt-3">
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={filtered.length}
            onChange={setPage}
          />
        </div>
      ) : null}
    </div>
  );
}
