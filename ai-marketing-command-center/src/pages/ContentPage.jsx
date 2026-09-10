import { useMemo, useState } from 'react';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import content from '../data/content.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { BarChart } from '../components/charts/BarChart.jsx';
import { ChartSection, DataTable, FilterBar, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function ContentPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');

  const filtered = useMemo(() => {
    let rows = searchRecords(content, query, ['name', 'owner', 'campaign', 'type']);
    if (type !== 'all') rows = rows.filter((row) => row.type === type);
    return rows;
  }, [query, type]);

  const bars = content
    .filter((item) => item.impressions > 0)
    .map((item) => ({ name: item.name, value: item.ctr, color: '#3E0F8D' }));

  return (
    <div className="mq-page">
      <PageHeader
        title="Content"
        description="Creative performance. Priya Poluru owns long-form. Ishaan Poluru’s RSA is the watch item."
        crumbs={[BREADCRUMB_ROOT, { label: 'Content' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-12">
          <ChartSection title="CTR by asset" subtitle="Live and watch creative only">
            <BarChart items={bars} unit="%" />
          </ChartSection>
        </div>
      </div>

      <FilterBar
        onReset={() => {
          setQuery('');
          setType('all');
        }}
        search={
          <Search
            size="sm"
            placeholder="Search title, owner, campaign"
            value={query}
            onChange={(_, value) => setQuery(value)}
          />
        }
      >
        <Select
          label="Type"
          size="sm"
          value={type}
          onChange={(event) => setType(event.target.value)}
          options={[
            { value: 'all', label: 'All types' },
            ...[...new Set(content.map((item) => item.type))].map((value) => ({ value, label: value })),
          ]}
        />
      </FilterBar>

      <DataTable
        rows={filtered}
        columns={[
          {
            key: 'name',
            label: 'Asset',
            render: (_, row) => (
              <div>
                <strong>{row.name}</strong>
                <div className="mq-subtle">{row.campaign} · {row.channel}</div>
              </div>
            ),
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => <StatusBadge status={value} />,
          },
          { key: 'type', label: 'Type' },
          { key: 'owner', label: 'Owner' },
          {
            key: 'impressions',
            label: 'Impressions',
            render: (value) => formatNumber(value),
          },
          {
            key: 'ctr',
            label: 'CTR',
            render: (value) => formatPercent(value, 1),
          },
          {
            key: 'dwell',
            label: 'Dwell',
            render: (value) => (value ? `${value}s` : '—'),
          },
          {
            key: 'conversions',
            label: 'Conv.',
            render: (value) => formatNumber(value),
          },
        ]}
      />
    </div>
  );
}
