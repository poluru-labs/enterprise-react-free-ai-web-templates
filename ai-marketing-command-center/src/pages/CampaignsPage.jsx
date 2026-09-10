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
import campaigns from '../data/campaigns.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { DataTable, FilterBar, PageHeader, StatusBadge } from '../components/widgets/index.js';

const PAGE_SIZE = 6;

export default function CampaignsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [channel, setChannel] = useState('all');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let rows = searchRecords(campaigns, query, ['name', 'owner', 'audience', 'channel']);
    if (channel !== 'all') rows = rows.filter((row) => row.channel === channel);
    if (status !== 'all') rows = rows.filter((row) => row.status.toLowerCase() === status);
    if (view === 'attention') rows = rows.filter((row) => row.status === 'Watch' || row.status === 'Paused');
    return rows;
  }, [query, channel, status, view]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => {
    setQuery('');
    setChannel('all');
    setStatus('all');
    setView('all');
    setPage(1);
  };

  return (
    <div className="mq-page">
      <PageHeader
        title="Campaigns"
        description="Named flights with owners, spend, and ROAS. Kavya Poluru owns email. Maya Poluru owns paid."
        crumbs={[BREADCRUMB_ROOT, { label: 'Campaigns' }]}
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
          <div className="mq-tag-row">
            <Tag label={`${filtered.length} flights`} variant="brand" />
          </div>
        }
      />

      <FilterBar
        onReset={reset}
        search={
          <Search
            size="sm"
            placeholder="Search name, owner, audience"
            value={query}
            onChange={(_, value) => {
              setQuery(value);
              setPage(1);
            }}
          />
        }
      >
        <Select
          label="Channel"
          size="sm"
          value={channel}
          onChange={(event) => {
            setChannel(event.target.value);
            setPage(1);
          }}
          options={[
            { value: 'all', label: 'All channels' },
            { value: 'Email', label: 'Email' },
            { value: 'Paid', label: 'Paid' },
            { value: 'Content', label: 'Content' },
            { value: 'Automation', label: 'Automation' },
            { value: 'Event', label: 'Event' },
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
            { value: 'live', label: 'Live' },
            { value: 'watch', label: 'Watch' },
            { value: 'paused', label: 'Paused' },
            { value: 'scheduled', label: 'Scheduled' },
            { value: 'draft', label: 'Draft' },
          ]}
        />
      </FilterBar>

      <DataTable
        rows={paged}
        onRowClick={(row) => navigate(`${BASE_PATH}/campaigns/${row.id}`)}
        rowClassName={(row) => (row.status === 'Paused' ? 'is-severe' : row.status === 'Watch' ? 'is-attention' : '')}
        columns={[
          {
            key: 'name',
            label: 'Campaign',
            render: (_, row) => (
              <div>
                <strong>{row.name}</strong>
                <div className="mq-subtle">{row.owner} · {row.audience}</div>
              </div>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => <StatusBadge status={value} />,
          },
          { key: 'channel', label: 'Channel' },
          {
            key: 'spend',
            label: 'Spend',
            render: (value) => formatCurrency(value),
          },
          {
            key: 'roas',
            label: 'ROAS',
            render: (value) => (value ? `${value}x` : '—'),
          },
          {
            key: 'ctr',
            label: 'CTR',
            render: (value) => formatPercent(value, 1),
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
