import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Drawer,
  DescriptionList,
  Pagination,
  Search,
  SegmentedControl,
  Select,
  Status,
  Tag,
  Toolbar,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import campaigns from '../data/campaigns.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency, formatDateTime, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const PAGE_SIZE = 5;

const STATUS_MAP = {
  Live: 'success',
  Watch: 'warning',
  Paused: 'neutral',
};

export default function CampaignsPage() {
  const [query, setQuery] = useState('');
  const [channel, setChannel] = useState('all');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let rows = searchRecords(campaigns, query, ['name', 'owner', 'audience', 'channel']);
    if (channel !== 'all') rows = rows.filter((row) => row.channel === channel);
    if (status !== 'all') rows = rows.filter((row) => row.status === status);
    if (view === 'attention') rows = rows.filter((row) => row.status === 'Watch' || row.status === 'Paused');
    return rows;
  }, [query, channel, status, view]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="mid-page">
      <PageHeader
        title="Campaigns"
        description="Named flights with spend and ROAS. Maya Poluru owns paid; Kavya Poluru owns email."
        crumbs={[BREADCRUMB_ROOT, { label: 'Campaigns' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Draft created', variant: 'success' })}
          >
            New flight
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
              { label: 'Needs attention', value: 'attention' },
            ]}
          />
        }
        end={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setQuery('');
              setChannel('all');
              setStatus('all');
              setView('all');
              setPage(1);
            }}
          >
            Reset
          </Button>
        }
      />

      <div className="mid-filters">
        <Search
          placeholder="Search name, owner, or audience"
          value={query}
          clearable
          onChange={(_, value) => {
            setQuery(value);
            setPage(1);
          }}
          onClear={() => setQuery('')}
        />
        <Select
          label="Channel"
          options={[
            { label: 'All channels', value: 'all' },
            { label: 'Paid', value: 'Paid' },
            { label: 'Email', value: 'Email' },
            { label: 'Display', value: 'Display' },
          ]}
          value={channel}
          onChange={(event) => {
            setChannel(event.target.value);
            setPage(1);
          }}
        />
        <Select
          label="Status"
          options={[
            { label: 'All statuses', value: 'all' },
            { label: 'Live', value: 'Live' },
            { label: 'Watch', value: 'Watch' },
            { label: 'Paused', value: 'Paused' },
          ]}
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="mid-table-wrap">
        <table className="mid-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Owner</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Spend</th>
              <th>ROAS</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="mid-mono">{row.id}</span>
                  <strong className="mid-cell-title">{row.name}</strong>
                  <Tag label={row.audience} variant="neutral" soft size="sm" />
                </td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.channel} variant="brand" soft size="sm" />
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status] ?? 'neutral'} />
                </td>
                <td>{formatCurrency(row.spend)}</td>
                <td>{row.roas.toFixed(1)}×</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        pageSize={PAGE_SIZE}
        total={filtered.length}
        onPageChange={setPage}
      />

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        heading={selected?.name ?? 'Campaign'}
        size="md"
      >
        {selected ? (
          <>
            <DescriptionList
              items={[
                { term: 'Owner', description: selected.owner },
                { term: 'Audience', description: selected.audience },
                { term: 'CTR', description: formatPercent(selected.ctr) },
                { term: 'Conversions', description: String(selected.conversions) },
                { term: 'Updated', description: formatDateTime(selected.updated) },
              ]}
            />
            <p className="mid-copy mid-drawer-note">
              Budget pacing alerts notify {selected.owner} when daily spend drifts more than 8%.
            </p>
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
