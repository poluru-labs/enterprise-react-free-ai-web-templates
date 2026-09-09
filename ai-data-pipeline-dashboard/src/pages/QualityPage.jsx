import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SegmentedControl, Select, Tag, Toolbar } from '@poluru-labs/enterprise-design-system-react';
import quality from '../data/quality.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatDuration } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import { ChartSection, DataTable, FilterBar, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function QualityPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState('all');

  const filtered = useMemo(() => {
    let rows = searchRecords(quality, query, ['name', 'owner', 'dataset', 'dimension']);
    if (status !== 'all') rows = rows.filter((row) => row.status.toLowerCase() === status);
    if (view === 'attention') rows = rows.filter((row) => row.status === 'Failing' || row.status === 'Watch');
    return rows;
  }, [query, status, view]);

  const reset = () => {
    setQuery('');
    setStatus('all');
    setView('all');
  };

  const mix = [
    { name: 'Passing', value: quality.filter((item) => item.status === 'Passing').length, color: '#059669' },
    { name: 'Watch', value: quality.filter((item) => item.status === 'Watch').length, color: '#d97706' },
    { name: 'Failing', value: quality.filter((item) => item.status === 'Failing').length, color: '#D45060' },
  ];

  return (
    <div className="cd-page">
      <PageHeader
        title="Data quality"
        description="Freshness, nulls, uniqueness, and privacy checks on named datasets."
        crumbs={[BREADCRUMB_ROOT, { label: 'Quality' }]}
      />

      <Toolbar
        bordered
        start={
          <SegmentedControl
            size="sm"
            value={view}
            onChange={setView}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Attention', value: 'attention' },
            ]}
          />
        }
        end={
          <div className="cd-tag-row">
            <Tag label={`${filtered.length} checks`} variant="brand" />
          </div>
        }
      />

      <FilterBar
        onReset={reset}
        search={
          <Search
            size="sm"
            placeholder="Search check, dataset, owner"
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
            { value: 'passing', label: 'Passing' },
            { value: 'watch', label: 'Watch' },
            { value: 'failing', label: 'Failing' },
          ]}
        />
      </FilterBar>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-4">
          <ChartSection title="Check mix" subtitle="Passing, watch, and failing">
            <DonutChart items={mix} centerLabel="Checks" centerValue={quality.length} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-8">
          <ChartSection title="Checks" subtitle="Threshold vs observed">
            <DataTable
              rows={filtered}
              onRowClick={(row) => navigate(`${BASE_PATH}/pipelines/${row.pipelineId}`)}
              rowClassName={(row) => (row.status === 'Failing' ? 'is-severe' : row.status === 'Watch' ? 'is-attention' : '')}
              columns={[
                {
                  key: 'name',
                  label: 'Check',
                  render: (_, row) => (
                    <div>
                      <strong>{row.name}</strong>
                      <div className="cd-subtle">{row.dataset}</div>
                    </div>
                  ),
                },
                { key: 'dimension', label: 'Dimension' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
                { key: 'threshold', label: 'Threshold' },
                { key: 'observed', label: 'Observed' },
                {
                  key: 'freshnessMinutes',
                  label: 'Freshness',
                  render: (value) => formatDuration(value),
                },
                {
                  key: 'lastRun',
                  label: 'Last run',
                  render: (value) => formatDateTime(value),
                },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
