import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CodeSnippet, Search, Select, Tag, Toolbar } from '@poluru-labs/enterprise-design-system-react';
import transformations from '../data/transformations.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCompact, formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, DataTable, FilterBar, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function TransformationsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [engine, setEngine] = useState('all');
  const [selected, setSelected] = useState(transformations[0]);

  const filtered = useMemo(() => {
    let rows = searchRecords(transformations, query, ['name', 'owner', 'engine', 'sql']);
    if (engine !== 'all') rows = rows.filter((row) => row.engine.toLowerCase().includes(engine));
    return rows;
  }, [query, engine]);

  const reset = () => {
    setQuery('');
    setEngine('all');
  };

  return (
    <div className="cd-page">
      <PageHeader
        title="Transformations"
        description="Spark, dbt, Flink, and Python jobs that reshape landed data."
        crumbs={[BREADCRUMB_ROOT, { label: 'Transformations' }]}
      />

      <Toolbar
        bordered
        end={
          <div className="cd-tag-row">
            <Tag label={`${filtered.length} jobs`} variant="brand" />
          </div>
        }
      />

      <FilterBar
        onReset={reset}
        search={
          <Search
            size="sm"
            placeholder="Search job, owner, SQL"
            value={query}
            onChange={(_, value) => setQuery(value)}
          />
        }
      >
        <Select
          label="Engine"
          size="sm"
          value={engine}
          onChange={(event) => setEngine(event.target.value)}
          options={[
            { value: 'all', label: 'All engines' },
            { value: 'spark', label: 'Spark' },
            { value: 'dbt', label: 'dbt' },
            { value: 'flink', label: 'Flink' },
            { value: 'python', label: 'Python' },
          ]}
        />
      </FilterBar>

      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Jobs" subtitle="Runtime, output rows, and last run">
            <DataTable
              rows={filtered}
              onRowClick={setSelected}
              rowClassName={(row) => (row.status === 'Failed' ? 'is-severe' : row.status === 'Delayed' || row.status === 'Queued' ? 'is-attention' : '')}
              columns={[
                {
                  key: 'name',
                  label: 'Transform',
                  render: (_, row) => (
                    <div>
                      <strong>{row.name}</strong>
                      <div className="cd-subtle">{row.owner}</div>
                    </div>
                  ),
                },
                { key: 'engine', label: 'Engine' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
                { key: 'runtime', label: 'Runtime' },
                {
                  key: 'rowsOut',
                  label: 'Rows out',
                  render: (value) => formatCompact(value),
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
        <div className="col-12 col-xl-5">
          <ChartSection
            title={selected.name}
            subtitle={`${selected.engine} · ${selected.owner}`}
            action={
              <button type="button" className="cd-text-link" onClick={() => navigate(`${BASE_PATH}/pipelines/${selected.pipelineId}`)}>
                Open pipeline
              </button>
            }
          >
            <p className="cd-note mb-3">SQL below is the last compiled statement.</p>
            <CodeSnippet language="sql" code={selected.sql} />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
