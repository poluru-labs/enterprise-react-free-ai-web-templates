import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SegmentedControl, Select, Tag, Toolbar } from '@poluru-labs/enterprise-design-system-react';
import ingestion from '../data/ingestion.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatDuration, formatRowsPerSec } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { DataTable, FilterBar, PageHeader, StatusBadge } from '../components/widgets/index.js';
import { BarChart } from '../components/charts/BarChart.jsx';
import { ChartSection } from '../components/widgets/ChartSection.jsx';

export default function IngestionPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState('all');

  const filtered = useMemo(() => {
    let rows = searchRecords(ingestion, query, ['name', 'owner', 'source', 'connector']);
    if (status !== 'all') rows = rows.filter((row) => row.status.toLowerCase() === status);
    if (view === 'attention') rows = rows.filter((row) => row.status === 'Delayed' || row.status === 'Failed');
    return rows;
  }, [query, status, view]);

  const reset = () => {
    setQuery('');
    setStatus('all');
    setView('all');
  };

  const volume = ingestion.map((row) => ({
    name: row.source,
    value: row.rowsPerSec,
    color: row.status === 'Failed' ? '#dc2626' : row.status === 'Delayed' ? '#d97706' : '#D45060',
  }));

  return (
    <div className="cd-page">
      <PageHeader
        title="Ingestion"
        description="Landing jobs from Salesforce, Kafka, S3, Kinesis, Drive, and Zendesk."
        crumbs={[BREADCRUMB_ROOT, { label: 'Ingestion' }]}
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
            <Tag label={`${filtered.length} sources`} variant="brand" />
          </div>
        }
      />

      <FilterBar
        onReset={reset}
        search={
          <Search
            size="sm"
            placeholder="Search source, owner, connector"
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
            { value: 'healthy', label: 'Healthy' },
            { value: 'streaming', label: 'Streaming' },
            { value: 'delayed', label: 'Delayed' },
            { value: 'failed', label: 'Failed' },
          ]}
        />
      </FilterBar>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-5">
          <ChartSection title="Throughput" subtitle="Rows per second by source">
            <BarChart items={volume} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-7">
          <ChartSection title="Jobs" subtitle="Lag, errors, and last sync">
            <DataTable
              rows={filtered}
              onRowClick={(row) => navigate(`${BASE_PATH}/pipelines/${row.pipelineId}`)}
              rowClassName={(row) => (row.status === 'Failed' ? 'is-severe' : row.status === 'Delayed' ? 'is-attention' : '')}
              columns={[
                {
                  key: 'name',
                  label: 'Job',
                  render: (_, row) => (
                    <div>
                      <strong>{row.name}</strong>
                      <div className="cd-subtle">{row.owner} · {row.connector}</div>
                    </div>
                  ),
                },
                { key: 'source', label: 'Source' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
                {
                  key: 'lagMinutes',
                  label: 'Lag',
                  render: (value) => formatDuration(value),
                },
                {
                  key: 'rowsPerSec',
                  label: 'Rate',
                  render: (value) => formatRowsPerSec(value),
                },
                {
                  key: 'lastSync',
                  label: 'Last sync',
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
