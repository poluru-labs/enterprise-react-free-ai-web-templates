import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { EmptyState, Search, Tag } from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT } from '../constants/navigation';
import { buildSearchIndex } from '../data';
import { searchRecords } from '../lib/search';
import { ChartSection } from '../components/widgets/ChartSection';
import { PageHeader } from '../components/widgets/PageHeader';
import './pages.scss';

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const index = useMemo(() => buildSearchIndex(), []);
  const hits = useMemo(
    () => searchRecords(index, query, ['title', 'subtitle', 'type']),
    [index, query],
  );

  return (
    <div className="page">
      <PageHeader
        title={query.trim() ? `Results for “${query}”` : 'Search operations'}
        description="Facilities, hosts, alerts, and tickets from the live ops index."
        crumbs={[BREADCRUMB_ROOT, { label: 'Search' }]}
      />

      <Search
        placeholder="Search racks, hosts, tickets…"
        value={query}
        onChange={(_event, value) => {
          const next = new URLSearchParams(params);
          if (value.trim()) next.set('q', value);
          else next.delete('q');
          setParams(next, { replace: true });
        }}
      />

      <ChartSection
        title={`${hits.length} match${hits.length === 1 ? '' : 'es'}`}
        subtitle={query.trim() ? `Query: ${query}` : 'Type a query to filter the catalog'}
      >
        {hits.length === 0 ? (
          <EmptyState
            heading="No matches"
            description={query.trim() ? `Nothing found for “${query}”.` : 'Start with a facility, hostname, or ticket id.'}
          />
        ) : (
          <ul className="search-page-results">
            {hits.map((hit) => (
              <li key={`${hit.type}-${hit.id}`}>
                <Link to={hit.path} className="search-page-hit">
                  <Tag label={hit.type} variant="brand" />
                  <span>
                    <strong>{hit.title}</strong>
                    <span className="muted">{hit.subtitle}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </ChartSection>
    </div>
  );
}
