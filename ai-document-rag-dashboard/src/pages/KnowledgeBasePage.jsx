import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Search, Select, showToast } from '@poluru-labs/enterprise-design-system-react';
import documentsData from '../data/documents.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatNumber } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, DataTable, FilterBar, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

const SOURCE_OPTIONS = [
  { label: 'All sources', value: 'all' },
  { label: 'PDF', value: 'PDF' },
  { label: 'Drive', value: 'Drive' },
  { label: 'Notion', value: 'Notion' },
  { label: 'SharePoint', value: 'SharePoint' },
  { label: 'Slack', value: 'Slack' },
];

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Ready', value: 'Ready' },
  { label: 'Indexing', value: 'Indexing' },
  { label: 'Stale', value: 'Stale' },
];

export default function KnowledgeBasePage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('all');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    if (params.get('upload') === '1') {
      showToast({ title: 'Upload panel opened', description: 'Drop files onto the knowledge base.', variant: 'info' });
    }
  }, [params]);

  const rows = useMemo(() => {
    const filtered = documentsData.documents.filter((doc) => {
      const matchesSource = source === 'all' || doc.source === source;
      const matchesStatus = status === 'all' || doc.status === status;
      return matchesSource && matchesStatus;
    });
    return searchRecords(filtered, query, ['name', 'source', 'owner', 'collection', 'id']);
  }, [query, source, status]);

  return (
    <div className="rag-page">
      <PageHeader
        title="Knowledge base"
        description={`${formatNumber(documentsData.summary.total)} documents across ${documentsData.summary.sources} sources. Keep every useful detail in reach.`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Knowledge base' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => showToast({ title: 'Connect source dialog opened', variant: 'info' })}>
            Connect source
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Ready" value={formatNumber(documentsData.summary.ready)} hint="Queryable now" icon="bi-check-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Indexing" value={formatNumber(documentsData.summary.indexing)} hint="Chunks in flight" icon="bi-hourglass-split" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Stale" value={formatNumber(documentsData.summary.stale)} hint="Need a recrawl" icon="bi-exclamation-triangle" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Sources" value={formatNumber(documentsData.summary.sources)} hint="Drive, Notion, uploads" icon="bi-plug" tone="brand" />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search documents"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setQuery('');
          setSource('all');
          setStatus('all');
        }}
      >
        <Select label="Source" options={SOURCE_OPTIONS} value={source} onChange={(event) => setSource(event.target.value)} />
        <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(event) => setStatus(event.target.value)} />
      </FilterBar>

      <ChartSection title={`${rows.length} documents`} subtitle="Google Drive, Notion, PDF uploads · Ready, Indexing, Stale">
        <DataTable
          rows={rows}
          rowClassName={(row) => (row.status === 'Stale' ? 'is-attention' : '')}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'source', label: 'Source' },
            { key: 'owner', label: 'Owner' },
            { key: 'collection', label: 'Collection' },
            {
              key: 'updated',
              label: 'Updated',
              render: (value) => formatDateTime(value),
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
