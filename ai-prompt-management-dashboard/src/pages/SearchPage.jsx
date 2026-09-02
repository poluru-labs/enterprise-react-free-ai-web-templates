import { useMemo } from 'react';
import { Search } from '@poluru-labs/enterprise-design-system-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import prompts from '../data/prompts.json';
import versions from '../data/versions.json';
import evaluations from '../data/evaluations.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function SearchPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';

  const promptHits = useMemo(
    () => searchRecords(prompts.items, query, ['name', 'owner', 'family', 'body']),
    [query],
  );
  const versionHits = useMemo(
    () => searchRecords(versions.items, query, ['id', 'prompt', 'owner', 'version']),
    [query],
  );
  const evalHits = useMemo(
    () => searchRecords(evaluations.suites, query, ['name', 'prompt', 'owner']),
    [query],
  );

  return (
    <div className="pmt-page">
      <PageHeader
        title="Workspace search"
        description="Look up prompts, owners, and versions from the manuscript tray."
        crumbs={[BREADCRUMB_ROOT, { label: 'Search' }]}
      />

      <div className="pmt-filter-bar mb-3">
        <div className="pmt-filter-search">
          <Search
            value={query}
            placeholder="Search prompts, owners, versions"
            onChange={(_, value) => setParams(value ? { q: value } : {})}
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-4">
          <StatCard className="h-100" label="Prompts" value={promptHits.length} icon="bi-journal-text" tone="brand" />
        </div>
        <div className="col-12 col-md-4">
          <StatCard className="h-100" label="Versions" value={versionHits.length} icon="bi-layers" tone="info" />
        </div>
        <div className="col-12 col-md-4">
          <StatCard className="h-100" label="Eval suites" value={evalHits.length} icon="bi-clipboard-check" tone="success" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12">
          <ChartSection title="Prompts" subtitle={query ? `Matching “${query}”` : 'All catalog entries'}>
            <DataTable
              rows={promptHits}
              onRowClick={(row) => navigate(`${BASE_PATH}/library/${row.id}`)}
              emptyTitle="No prompts match"
              emptyDescription="Try an owner name or a family like Support."
              columns={[
                { key: 'name', label: 'Prompt' },
                { key: 'owner', label: 'Owner' },
                { key: 'family', label: 'Family' },
                {
                  key: 'score',
                  label: 'Score',
                  render: (value) => formatPercent(value),
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
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-6">
          <ChartSection title="Versions" subtitle="Lineage IDs and owners">
            <DataTable
              rows={versionHits}
              onRowClick={(row) => navigate(`${BASE_PATH}/library/${row.promptId}`)}
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'prompt', label: 'Prompt' },
                { key: 'version', label: 'Version' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-6">
          <ChartSection title="Evaluations" subtitle="Suites that mention this query">
            <DataTable
              rows={evalHits}
              columns={[
                { key: 'name', label: 'Suite' },
                { key: 'prompt', label: 'Prompt' },
                {
                  key: 'outcome',
                  label: 'Outcome',
                  render: (value) => <StatusBadge status={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
