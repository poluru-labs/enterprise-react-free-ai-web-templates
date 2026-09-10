import { useMemo, useState } from 'react';
import { Search, Select, showToast, Button } from '@poluru-labs/enterprise-design-system-react';
import journeys from '../data/automation.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { DataTable, FilterBar, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function AutomationPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    let rows = searchRecords(journeys, query, ['name', 'owner', 'trigger', 'goal']);
    if (status !== 'all') rows = rows.filter((row) => row.status.toLowerCase() === status);
    return rows;
  }, [query, status]);

  return (
    <div className="mq-page">
      <PageHeader
        title="Automation"
        description="Triggered journeys. Leela Poluru’s welcome sequence is the one that actually sends overnight."
        crumbs={[BREADCRUMB_ROOT, { label: 'Automation' }]}
        actions={
          <Button
            size="sm"
            icon="lightning"
            onClick={() => showToast({ title: 'Journey drafted (demo)', variant: 'success' })}
          >
            New journey
          </Button>
        }
      />

      <FilterBar
        onReset={() => {
          setQuery('');
          setStatus('all');
        }}
        search={
          <Search
            size="sm"
            placeholder="Search journey, trigger, owner"
            value={query}
            onChange={(_, value) => setQuery(value)}
          />
        }
      >
        <Select
          label="Status"
          size="sm"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={[
            { value: 'all', label: 'All statuses' },
            { value: 'sending', label: 'Sending' },
            { value: 'live', label: 'Live' },
            { value: 'scheduled', label: 'Scheduled' },
          ]}
        />
      </FilterBar>

      <DataTable
        rows={filtered}
        columns={[
          {
            key: 'name',
            label: 'Journey',
            render: (_, row) => (
              <div>
                <strong>{row.name}</strong>
                <div className="mq-subtle">{row.trigger}</div>
              </div>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => <StatusBadge status={value} pulse={value === 'Sending'} />,
          },
          { key: 'owner', label: 'Owner' },
          { key: 'channel', label: 'Channel' },
          {
            key: 'enrolled',
            label: 'Enrolled',
            render: (value) => formatNumber(value),
          },
          {
            key: 'exit',
            label: 'Exits',
            render: (value) => formatNumber(value),
          },
          { key: 'goal', label: 'Goal' },
        ]}
      />
    </div>
  );
}
