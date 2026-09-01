import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Textarea, showToast } from '@poluru-labs/enterprise-design-system-react';
import searchData from '../data/search.json';
import documentsData from '../data/documents.json';
import collectionsData from '../data/collections.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function SearchPage() {
  const [params] = useSearchParams();
  const incoming = params.get('q') || '';
  const [draft, setDraft] = useState(incoming || searchData.defaultQuery);
  const [activeQuery, setActiveQuery] = useState(incoming || searchData.defaultQuery);

  useEffect(() => {
    if (!incoming) return;
    setDraft(incoming);
    setActiveQuery(incoming);
  }, [incoming]);

  const result = searchData.lastResult;

  const catalogHits = useMemo(() => {
    if (!incoming.trim()) return [];
    const docs = searchRecords(documentsData.documents, incoming, ['name', 'source', 'owner', 'collection']).map((item) => ({
      id: item.id,
      kind: 'Document',
      title: item.name,
      detail: `${item.source} · ${item.owner}`,
      status: item.status,
      href: `${BASE_PATH}/knowledge-base`,
    }));
    const collections = searchRecords(collectionsData.collections, incoming, ['name', 'owner', 'description']).map((item) => ({
      id: item.id,
      kind: 'Collection',
      title: item.name,
      detail: `${item.owner} · ${item.chunks} chunks`,
      status: item.status,
      href: `${BASE_PATH}/collections`,
    }));
    return [...docs, ...collections];
  }, [incoming]);

  const runQuery = () => {
    setActiveQuery(draft);
    showToast({ title: 'Answer generated in 1.2 seconds', variant: 'success' });
  };

  return (
    <div className="rag-page">
      <PageHeader
        title={incoming.trim() ? `Results for “${incoming}”` : 'Search & test'}
        description="See retrieved context, citation coverage, and answer quality before your users do."
        crumbs={[BREADCRUMB_ROOT, { label: 'Search & test' }]}
      />

      {incoming.trim() ? (
        <ChartSection
          className="mb-3"
          title={`${catalogHits.length} catalog matches`}
          subtitle="Documents and collections that match the header query"
        >
          {catalogHits.length ? (
            <ul className="rag-search-results">
              {catalogHits.map((item) => (
                <li key={`${item.kind}-${item.id}`}>
                  <Link to={item.href} className="rag-search-hit">
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
            <p className="rag-drawer-copy">No matches in the mock dataset.</p>
          )}
        </ChartSection>
      ) : null}

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Retrieval playground" subtitle={`${searchData.options.sources} · ${searchData.options.model} · ${searchData.options.mode}`}>
            <Textarea
              label="Test query"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={5}
            />
            <div className="rag-playground-actions">
              <Button size="sm" icon="search" onClick={runQuery}>
                Generate answer
              </Button>
              <span className="rag-subtle">Active query: {activeQuery}</span>
            </div>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection
            title="Last result"
            subtitle={`${result.latency} response time`}
            action={<span className="rag-score-badge">{result.match}% match</span>}
          >
            <p className="rag-answer-copy">{result.answer}</p>
            <p className="rag-faithfulness">
              Faithfulness <strong>{formatPercent(result.faithfulness)}</strong>
            </p>
            {result.citations.map((cite) => (
              <div className="rag-citation" key={cite.id}>
                <i className="bi bi-file-earmark-text" aria-hidden="true" />
                <span>
                  <strong>{cite.title}</strong>
                  <small>{cite.detail}</small>
                </span>
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </div>
            ))}
          </ChartSection>
        </div>
      </div>

      <ChartSection title="Retrieved chunks" subtitle="Ranked context that grounded the last answer">
        <ul className="rag-chunk-list">
          {result.chunks.map((chunk) => (
            <li key={chunk.id}>
              <strong>
                {chunk.doc} · {chunk.page}
              </strong>
              <p>{chunk.text}</p>
            </li>
          ))}
        </ul>
      </ChartSection>
    </div>
  );
}
