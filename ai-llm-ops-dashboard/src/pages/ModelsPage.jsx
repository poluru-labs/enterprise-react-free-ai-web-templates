import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Select } from '@poluru-labs/enterprise-design-system-react';
import models from '../data/models.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { searchRecords } from '../lib/search.js';
import { FilterBar, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Production', value: 'Production' },
  { label: 'Review', value: 'Review' },
];

const PROVIDER_OPTIONS = [
  { label: 'All providers', value: 'all' },
  { label: 'OpenAI', value: 'OpenAI' },
  { label: 'Anthropic', value: 'Anthropic' },
  { label: 'Google', value: 'Google' },
  { label: 'Azure', value: 'Azure' },
];

export default function ModelsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [provider, setProvider] = useState('all');

  const rows = useMemo(() => {
    const filtered = models.filter((model) => {
      const statusOk = status === 'all' || model.status === status;
      const providerOk = provider === 'all' || model.provider === provider;
      return statusOk && providerOk;
    });
    return searchRecords(filtered, query, ['name', 'owner', 'provider', 'version']);
  }, [query, status, provider]);

  const live = models.filter((model) => model.status === 'Production').length;

  return (
    <div className="llm-page">
      <PageHeader
        title="Model registry"
        description="Six serving stacks on Poluru Cloud. Filter by owner, provider, or live vs review."
        crumbs={[BREADCRUMB_ROOT, { label: 'Models' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Registered" value={models.length} icon="bi-cpu" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Production" value={live} hint="Serving live traffic" icon="bi-broadcast" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="In review" value={models.length - live} icon="bi-eye" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Owners" value="6" hint="Poluru platform team" icon="bi-people" tone="info" />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            value={query}
            placeholder="Search models or owners"
            onChange={(_, value) => setQuery(value)}
          />
        }
        onReset={() => {
          setQuery('');
          setStatus('all');
          setProvider('all');
        }}
      >
        <Select label="Status" options={STATUS_OPTIONS} value={status} onChange={(event) => setStatus(event.target.value)} />
        <Select label="Provider" options={PROVIDER_OPTIONS} value={provider} onChange={(event) => setProvider(event.target.value)} />
      </FilterBar>

      <div className="row g-3">
        {rows.map((model) => (
          <div className="col-12 col-md-6 col-xl-4" key={model.id}>
            <article
              className="llm-model-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`${BASE_PATH}/models/${model.id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') navigate(`${BASE_PATH}/models/${model.id}`);
              }}
            >
              <header>
                <div>
                  <h3>{model.name}</h3>
                  <span className="llm-subtle">{model.provider} · {model.version}</span>
                </div>
                <StatusBadge status={model.status} />
              </header>
              <p className="llm-policy-metric">
                <strong>{model.calls}</strong>
                <span>requests · {model.latency} p95</span>
              </p>
              <p className="llm-policy-note">{model.owner} · {model.region}</p>
              <footer>
                <span>{model.success}% success</span>
                <span>{model.spend}</span>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
