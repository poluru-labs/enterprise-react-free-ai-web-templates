import { useMemo, useState } from 'react';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import modelsData from '../data/models.json';
import settings from '../data/settings.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatScore } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, DataTable, FilterBar, PageHeader, StatusBadge } from '../components/widgets/index.js';
import { BarChart } from '../components/charts/BarChart.jsx';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'Production', label: 'Production' },
  { value: 'Review', label: 'Review' },
  { value: 'Candidate', label: 'Candidate' },
  { value: 'Tuning', label: 'Tuning' },
];

export default function LeaderboardPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [owner, setOwner] = useState('all');

  const ranked = useMemo(() => {
    const byStatus = modelsData.models.filter((item) => status === 'all' || item.status === status);
    const byOwner = byStatus.filter((item) => owner === 'all' || item.owner.toLowerCase().includes(owner));
    return searchRecords(byOwner, query, ['name', 'owner', 'provider'])
      .slice()
      .sort((a, b) => b.score - a.score)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }, [query, status, owner]);

  return (
    <div className="prism-page">
      <PageHeader
        title="Leaderboard"
        description={`${ranked.length} models · Nova leads · Meera Poluru’s quality index.`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Leaderboard' }]}
      />

      <FilterBar
        search={
          <Search
            placeholder="Search models or owners"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setQuery('');
          setStatus('all');
          setOwner('all');
        }}
      >
        <Select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={STATUS_OPTIONS}
        />
        <Select
          label="Owner"
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
          options={[{ value: 'all', label: 'All owners' }, ...settings.ownerOptions]}
        />
      </FilterBar>

      <div className="row g-3 mb-3">
        {ranked.map((item) => (
          <div className="col-12 col-md-6 col-xl-4" key={item.id}>
            <article className="prism-model-card">
              <header>
                <h3>{item.name}</h3>
                <StatusBadge status={item.status} />
              </header>
              <p className="prism-card-metric">
                <strong>{formatScore(item.score)}</strong>
                <span>#{item.rank} · {item.provider}</span>
              </p>
              <p className="prism-card-note">{item.note}</p>
              <footer>
                <span>{item.owner}</span>
                <span>Safety {formatScore(item.safety)}</span>
              </footer>
            </article>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Index table" subtitle="Safety, ground, accuracy, and latency">
            <DataTable
              rows={ranked}
              emptyTitle="No models match"
              emptyDescription="Clear filters or try Meera Poluru."
              columns={[
                { key: 'rank', label: '#' },
                { key: 'name', label: 'Model' },
                { key: 'owner', label: 'Owner' },
                { key: 'safety', label: 'Safety', render: (value) => formatScore(value) },
                { key: 'ground', label: 'Ground', render: (value) => formatScore(value) },
                { key: 'accuracy', label: 'Accuracy', render: (value) => formatScore(value) },
                { key: 'score', label: 'Index', render: (value) => formatScore(value) },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Index bars" subtitle="Ranked quality score">
            <BarChart
              items={ranked.map((item, index) => ({
                name: item.name,
                value: item.score,
                color: index === 0 ? '#BE185D' : index === 1 ? '#DB2777' : '#F9A8D4',
              }))}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
