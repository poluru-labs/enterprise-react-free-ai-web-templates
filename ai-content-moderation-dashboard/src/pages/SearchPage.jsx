import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import queueData from '../data/queue.json';
import reviews from '../data/reviews.json';
import policies from '../data/policies.json';
import appeals from '../data/appeals.json';
import automation from '../data/automation.json';
import reporters from '../data/reporters.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const cases = searchRecords(queueData.items, query, ['id', 'title', 'snippet', 'category', 'assignee']).map((item) => ({
      id: item.id,
      kind: 'Queue',
      title: item.title,
      detail: `${item.id} · ${item.source} · ${item.assignee}`,
      status: item.status,
      href: `${BASE_PATH}/queue?focus=${item.id}`,
    }));
    const decisions = searchRecords(reviews.decisions, query, ['id', 'title', 'reviewer', 'policy']).map((item) => ({
      id: item.id,
      kind: 'Review',
      title: item.title,
      detail: `${item.id} · ${item.reviewer}`,
      status: item.decision,
      href: `${BASE_PATH}/reviews`,
    }));
    const policyHits = searchRecords(policies.policies, query, ['name', 'owner', 'falsePositiveNotes']).map((item) => ({
      id: item.id,
      kind: 'Policy',
      title: item.name,
      detail: `${item.mode} · ${item.owner}`,
      status: item.mode,
      href: `${BASE_PATH}/policies`,
    }));
    const appealHits = searchRecords(appeals.appeals, query, ['id', 'requester', 'subject', 'owner']).map((item) => ({
      id: item.id,
      kind: 'Appeal',
      title: item.subject,
      detail: `${item.id} · ${item.requester}`,
      status: item.status,
      href: `${BASE_PATH}/appeals`,
    }));
    const rules = searchRecords(automation.rules, query, ['id', 'name', 'policy', 'pattern']).map((item) => ({
      id: item.id,
      kind: 'Rule',
      title: item.name,
      detail: `${item.type} · ${item.policy}`,
      status: item.status,
      href: `${BASE_PATH}/automation`,
    }));
    const desks = searchRecords(reporters.reporters, query, ['name', 'focus', 'contact']).map((item) => ({
      id: item.id,
      kind: 'Reporter',
      title: item.name,
      detail: `${item.type} · ${item.focus}`,
      status: item.status,
      href: `${BASE_PATH}/reporters`,
    }));
    return [...cases, ...decisions, ...policyHits, ...appealHits, ...rules, ...desks];
  }, [query]);

  return (
    <div className="cmb-page">
      <PageHeader
        title={query.trim() ? `Results for “${query}”` : 'Search'}
        description="Looks across the queue, completed reviews, policies, appeals, automation, and reporters."
        crumbs={[BREADCRUMB_ROOT, { label: 'Search' }]}
      />

      <ChartSection
        title={`${results.length} matches`}
        subtitle={query.trim() ? 'Open a result to jump to the related screen' : 'Use the header field or ⌘K'}
      >
        {results.length ? (
          <ul className="cmb-search-results">
            {results.map((item) => (
              <li key={`${item.kind}-${item.id}`}>
                <Link to={item.href} className="cmb-search-hit">
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
          <p className="cmb-drawer-copy">
            {query.trim() ? 'No matches in the mock dataset.' : 'Type a query in the header and press Enter.'}
          </p>
        )}
      </ChartSection>
    </div>
  );
}
