import { useMemo, useState } from 'react';
import { ProgressBar, Search, Select } from '@poluru-labs/enterprise-design-system-react';
import audiences from '../data/audiences.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { DataTable, FilterBar, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function AudiencesPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    let rows = searchRecords(audiences, query, ['name', 'owner', 'source', 'notes']);
    if (status !== 'all') rows = rows.filter((row) => row.status.toLowerCase() === status);
    return rows;
  }, [query, status]);

  return (
    <div className="mq-page">
      <PageHeader
        title="Audiences"
        description="Six named segments. Kavya Poluru keeps trustees honest. Clinic ops sit on a HIPAA hold."
        crumbs={[BREADCRUMB_ROOT, { label: 'Audiences' }]}
      />

      <FilterBar
        onReset={() => {
          setQuery('');
          setStatus('all');
        }}
        search={
          <Search
            size="sm"
            placeholder="Search segment, owner, source"
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
            { value: 'live', label: 'Live' },
            { value: 'watch', label: 'Watch' },
            { value: 'draft', label: 'Draft' },
          ]}
        />
      </FilterBar>

      <DataTable
        rows={filtered}
        columns={[
          {
            key: 'name',
            label: 'Segment',
            render: (_, row) => (
              <div>
                <strong>{row.name}</strong>
                <div className="mq-subtle">{row.notes}</div>
              </div>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => <StatusBadge status={value} />,
          },
          {
            key: 'size',
            label: 'Reach',
            render: (value) => formatNumber(value),
          },
          { key: 'owner', label: 'Owner' },
          { key: 'source', label: 'Source' },
          { key: 'freshness', label: 'Fresh' },
          {
            key: 'fit',
            label: 'Fit',
            render: (value) => (
              <div className="mq-progress-cell">
                <ProgressBar value={value} max={100} />
                <span>{value}%</span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
