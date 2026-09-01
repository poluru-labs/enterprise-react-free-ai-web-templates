import { Link, useSearchParams } from 'react-router-dom';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { searchWorkspace } from '../lib/workspaceSearch.js';
import { ChartSection, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function SearchPage() {
  const [params] = useSearchParams();
  const raw = params.get('q') || '';
  const results = searchWorkspace(raw);

  return (
    <div className="amd-page">
      <PageHeader
        title={raw.trim() ? `Results for “${raw}”` : 'Search'}
        description="Looks across agents, tasks, traces, tools, guardrails, failures, and incidents."
        crumbs={[BREADCRUMB_ROOT, { label: 'Search' }]}
      />

      <ChartSection
        title={`${results.length} matches`}
        subtitle={raw.trim() ? 'Click a result to open the related page' : 'Use the header search and press Enter'}
      >
        {results.length ? (
          <ul className="amd-search-results">
            {results.map((item) => (
              <li key={`${item.kind}-${item.id}`}>
                <Link to={item.href} className="amd-search-hit">
                  <div>
                    <small>{item.kind}</small>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <StatusBadge status={item.status} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="amd-drawer-copy">
            {raw.trim() ? 'No matches in the mock dataset.' : 'Type a query in the header and press Enter.'}
          </p>
        )}
      </ChartSection>
    </div>
  );
}
