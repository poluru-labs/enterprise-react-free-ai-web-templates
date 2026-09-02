import { useMemo, useState } from 'react';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import { useNavigate } from 'react-router-dom';
import prompts from '../data/prompts.json';
import versions from '../data/versions.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDate } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  StatusBadge,
} from '../components/widgets/index.js';

function TreeNode({ node, depth, selectedId, onSelect }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = Boolean(node.children?.length);

  return (
    <div>
      <button
        type="button"
        className={`pmt-tree-node ${selectedId === node.id ? 'is-active' : ''}`}
        style={{ paddingLeft: `${0.35 + depth * 0.55}rem` }}
        onClick={() => {
          onSelect(node.id);
          if (hasChildren) setOpen((current) => !current);
        }}
      >
        {hasChildren ? (
          <i className={`bi ${open ? 'bi-chevron-down' : 'bi-chevron-right'} me-1`} aria-hidden="true" />
        ) : (
          <i className="bi bi-file-text me-1" aria-hidden="true" />
        )}
        {node.label}
      </button>
      {hasChildren && open ? (
        <div className="pmt-tree-children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function VersionsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selectedId, setSelectedId] = useState('support');

  const selectedPrompt = prompts.items.find((item) => item.id === selectedId);
  const selectedFamily = selectedPrompt?.family
    || (selectedId === 'bureau' ? null : selectedId.charAt(0).toUpperCase() + selectedId.slice(1));

  const filtered = useMemo(() => {
    const byFamily = versions.items.filter((item) => {
      if (!selectedFamily || selectedId === 'bureau') return true;
      if (selectedPrompt) return item.promptId === selectedPrompt.id;
      return item.family.toLowerCase() === selectedId;
    });
    const byStatus = byFamily.filter((item) => status === 'all' || item.status === status);
    return searchRecords(byStatus, query, ['id', 'prompt', 'owner', 'version']);
  }, [query, status, selectedId, selectedFamily, selectedPrompt]);

  return (
    <div className="pmt-page">
      <PageHeader
        title="Versions"
        description="Group prompts by family, inspect lineage, and keep Sravani Poluru’s catalog permission-aware."
        crumbs={[BREADCRUMB_ROOT, { label: 'Versions' }]}
      />

      <FilterBar
        search={<Search value={query} placeholder="Search versions" onChange={(_, value) => setQuery(value)} />}
        onReset={() => {
          setQuery('');
          setStatus('all');
          setSelectedId('bureau');
        }}
      >
        <Select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={[
            { value: 'all', label: 'All statuses' },
            { value: 'Live', label: 'Live' },
            { value: 'Review', label: 'Review' },
            { value: 'Canary', label: 'Canary' },
            { value: 'Failed', label: 'Failed' },
            { value: 'Draft', label: 'Draft' },
          ]}
        />
      </FilterBar>

      <div className="row g-3">
        <div className="col-12 col-xl-4">
          <ChartSection title="Family tree" subtitle="Prompt Bureau folio">
            <div className="pmt-tree">
              {prompts.tree.map((node) => (
                <TreeNode
                  key={node.id}
                  node={node}
                  depth={0}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              ))}
            </div>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-8">
          <ChartSection
            title={selectedPrompt?.name || selectedFamily || 'All families'}
            subtitle={`${filtered.length} versions in this branch`}
          >
            <DataTable
              rows={filtered}
              onRowClick={(row) => navigate(`${BASE_PATH}/library/${row.promptId}`)}
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'prompt', label: 'Prompt' },
                { key: 'version', label: 'Version' },
                { key: 'owner', label: 'Owner' },
                { key: 'stage', label: 'Stage' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
                {
                  key: 'updated',
                  label: 'Updated',
                  render: (value) => formatDate(value),
                },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
