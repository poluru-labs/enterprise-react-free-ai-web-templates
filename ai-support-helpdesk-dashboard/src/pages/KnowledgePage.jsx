import { useMemo, useState } from 'react';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import knowledge from '../data/knowledge.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDate } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatusBadge,
  StatCard,
} from '../components/widgets/index.js';

export default function KnowledgePage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const rows = useMemo(() => {
    const filtered = knowledge.items.filter((item) => status === 'all' || item.status === status);
    return searchRecords(filtered, query, ['id', 'title', 'owner', 'summary']);
  }, [query, status]);

  return (
    <div className="desk-page">
      <PageHeader
        title="Knowledge"
        description="Articles the Relay copilot cites. KB-204 still teaches the old 14-day annual refund."
        crumbs={[BREADCRUMB_ROOT, { label: 'Knowledge' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Articles" value={knowledge.items.length} icon="bi-journal-text" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Needs review" value={knowledge.items.filter((item) => item.status === 'Needs review').length} icon="bi-eye" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Drafts" value={knowledge.items.filter((item) => item.status === 'Draft').length} icon="bi-pencil" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Copilot uses" value={knowledge.items.reduce((sum, item) => sum + item.usedByCopilot, 0)} icon="bi-robot" tone="brand" />
        </div>
      </div>

      <FilterBar
        search={<Search value={query} placeholder="Search articles" onChange={(_, value) => setQuery(value)} />}
        onReset={() => {
          setQuery('');
          setStatus('all');
        }}
      >
        <Select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={[
            { value: 'all', label: 'All' },
            { value: 'Published', label: 'Published' },
            { value: 'Needs review', label: 'Needs review' },
            { value: 'Draft', label: 'Draft' },
          ]}
        />
      </FilterBar>

      <ChartSection title="Copilot sources" subtitle="Used counts are this window, 24–30 Aug">
        <DataTable
          rows={rows}
          columns={[
            {
              key: 'title',
              label: 'Article',
              render: (_, row) => (
                <div>
                  <strong>{row.title}</strong>
                  <div className="desk-subtle">{row.id} · {row.summary}</div>
                </div>
              ),
            },
            { key: 'owner', label: 'Owner' },
            { key: 'usedByCopilot', label: 'Copilot uses' },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'updatedAt',
              label: 'Updated',
              render: (value) => formatDate(value),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
