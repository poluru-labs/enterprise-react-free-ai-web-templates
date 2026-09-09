import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from '@poluru-labs/enterprise-design-system-react';
import lineage from '../data/lineage.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, DataTable, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function LineagePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('job-quill');

  const nodes = useMemo(
    () => searchRecords(lineage.nodes, query, ['label', 'owner', 'kind', 'status']),
    [query],
  );

  const selected = lineage.nodes.find((node) => node.id === selectedId) || lineage.nodes[0];
  const relatedIds = new Set(
    lineage.edges
      .filter((edge) => edge.from === selected.id || edge.to === selected.id)
      .flatMap((edge) => [edge.from, edge.to]),
  );

  const neighbors = lineage.nodes.filter((node) => relatedIds.has(node.id) && node.id !== selected.id);

  const edges = lineage.edges.map((edge) => {
    const from = lineage.nodes.find((node) => node.id === edge.from);
    const to = lineage.nodes.find((node) => node.id === edge.to);
    return {
      id: edge.id,
      from: from?.label,
      to: to?.label,
      fromOwner: from?.owner,
      toOwner: to?.owner,
    };
  });

  return (
    <div className="cd-page">
      <PageHeader
        title="Lineage"
        description="Upstream sources through ingest, transform, and serving. Select a node to see neighbors."
        crumbs={[BREADCRUMB_ROOT, { label: 'Lineage' }]}
      />

      <div className="mb-3">
        <Search
          size="sm"
          placeholder="Filter nodes by name or owner"
          value={query}
          onChange={(_, value) => setQuery(value)}
        />
      </div>

      <div className="cd-lineage mb-3">
        {lineage.columns.map((column) => (
          <div className="cd-lineage-col" key={column.id}>
            <h3>{column.label}</h3>
            {nodes
              .filter((node) => node.column === column.id)
              .map((node) => {
                const active = node.id === selected.id;
                const related = relatedIds.has(node.id);
                return (
                  <button
                    type="button"
                    key={node.id}
                    className={`cd-lineage-node ${active ? 'is-active' : ''} ${related && !active ? 'is-related' : ''}`}
                    onClick={() => setSelectedId(node.id)}
                  >
                    <strong>{node.label}</strong>
                    <span className="cd-subtle">{node.owner}</span>
                    <div className="mt-2">
                      <StatusBadge status={node.status} />
                    </div>
                  </button>
                );
              })}
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-5">
          <ChartSection
            title={selected.label}
            subtitle={`${selected.kind} · ${selected.owner}`}
            action={
              selected.pipelineId ? (
                <button
                  type="button"
                  className="cd-text-link"
                  onClick={() => navigate(`${BASE_PATH}/pipelines/${selected.pipelineId}`)}
                >
                  Open pipeline
                </button>
              ) : null
            }
          >
            <p className="cd-note mb-3">Connected assets for this node.</p>
            <DataTable
              rows={neighbors}
              rowKey="id"
              columns={[
                { key: 'label', label: 'Asset' },
                { key: 'kind', label: 'Kind' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-7">
          <ChartSection title="Edges" subtitle="Directed hops from source to serving">
            <DataTable
              rows={edges}
              columns={[
                { key: 'from', label: 'From' },
                { key: 'to', label: 'To' },
                { key: 'fromOwner', label: 'Upstream owner' },
                { key: 'toOwner', label: 'Downstream owner' },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
