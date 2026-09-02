import { useMemo, useState } from 'react';
import { Search, Select, showToast } from '@poluru-labs/enterprise-design-system-react';
import macros from '../data/macros.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDate } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { FilterBar, PageHeader, StatusBadge, StatCard } from '../components/widgets/index.js';

export default function MacrosPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const rows = useMemo(() => {
    const filtered = macros.items.filter((item) => status === 'all' || item.status === status);
    return searchRecords(filtered, query, ['name', 'owner', 'body']);
  }, [query, status]);

  return (
    <div className="desk-page">
      <PageHeader
        title="Macros"
        description="Canned replies the desk and copilot share. Equal-height cards so a long body does not break the grid."
        crumbs={[BREADCRUMB_ROOT, { label: 'Macros' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Library" value={macros.items.length} icon="bi-lightning" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Published" value={macros.items.filter((item) => item.status === 'Published').length} icon="bi-check-circle" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Drafts" value={macros.items.filter((item) => item.status === 'Draft').length} icon="bi-pencil" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Uses this window" value={macros.items.reduce((sum, item) => sum + item.uses, 0)} icon="bi-bar-chart" tone="info" />
        </div>
      </div>

      <FilterBar
        search={<Search value={query} placeholder="Search macros" onChange={(_, value) => setQuery(value)} />}
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
            { value: 'Draft', label: 'Draft' },
          ]}
        />
      </FilterBar>

      <div className="row g-3">
        {rows.map((macro) => (
          <div className="col-12 col-md-6 col-xl-3" key={macro.id}>
            <article className="desk-macro-card">
              <header>
                <h3>{macro.name}</h3>
                <StatusBadge status={macro.status} />
              </header>
              <p>{macro.body}</p>
              <footer>
                <span>{macro.owner} · {macro.uses} uses · {formatDate(macro.updatedAt)}</span>
                <button
                  type="button"
                  className="desk-text-link"
                  onClick={() => showToast({ title: 'Copied to composer', description: macro.name, variant: 'success' })}
                >
                  Copy
                </button>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
