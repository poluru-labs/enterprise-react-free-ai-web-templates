import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import datasetsData from '../data/datasets.json';
import { PageHeader, FilterBar, StatusBadge, DataTable } from '../components/widgets/index.js';
import { BASE_PATH } from '../constants/navigation.js';

export default function DatasetsPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [search, setSearch] = useState(initialQuery);
  const [domainFilter, setDomainFilter] = useState('ALL');
  const [privacyFilter, setPrivacyFilter] = useState('ALL');

  const filteredData = useMemo(() => {
    return datasetsData.filter((item) => {
      const matchSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        item.creator.toLowerCase().includes(search.toLowerCase());

      const matchDomain = domainFilter === 'ALL' || item.domain === domainFilter;
      const matchPrivacy =
        privacyFilter === 'ALL' ||
        (privacyFilter === 'STRICT' && item.epsilon <= 0.8) ||
        (privacyFilter === 'STANDARD' && item.epsilon > 0.8);

      return matchSearch && matchDomain && matchPrivacy;
    });
  }, [search, domainFilter, privacyFilter]);

  const columns = [
    {
      key: 'name',
      header: 'Dataset Name & Domain',
      render: (val, row) => (
        <div>
          <Link
            to={`${BASE_PATH}/datasets/${row.id}`}
            style={{ fontWeight: '700', color: 'var(--syn-brand)', textDecoration: 'none', fontSize: '0.92rem' }}
          >
            {val}
          </Link>
          <div style={{ fontSize: '0.74rem', color: 'var(--syn-muted)', marginTop: '0.15rem' }}>
            <span style={{ fontWeight: '600' }}>{row.domain}</span> · {row.modality} · {row.columnCount} columns
          </div>
          <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
            {row.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.68rem',
                  padding: '0.1rem 0.4rem',
                  background: '#f1f5f9',
                  borderRadius: '3px',
                  color: 'var(--syn-muted)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'rowCountDisplay',
      header: 'Volume & Size',
      render: (val, row) => (
        <div>
          <strong style={{ fontFamily: 'Roboto', display: 'block' }}>{val}</strong>
          <span style={{ fontSize: '0.72rem', color: 'var(--syn-subtle)' }}>{row.fileSize}</span>
        </div>
      ),
    },
    {
      key: 'privacyLevel',
      header: 'Differential Privacy',
      render: (val, row) => (
        <div>
          <StatusBadge status={`ε = ${row.epsilon}`} />
          <div style={{ fontSize: '0.72rem', color: 'var(--syn-muted)', marginTop: '0.2rem' }}>
            Re-ID: <strong style={{ color: '#059669' }}>{row.reIdRisk}</strong>
          </div>
        </div>
      ),
    },
    {
      key: 'fidelityScore',
      header: 'Quality / Parity',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: '800', color: '#05339C', fontFamily: 'Roboto' }}>{val}%</div>
          <div style={{ fontSize: '0.72rem', color: '#059669' }}>TSTR: {row.mlUtilityScore}%</div>
        </div>
      ),
    },
    {
      key: 'creator',
      header: 'Author & Role',
      render: (val, row) => (
        <div style={{ fontSize: '0.8rem' }}>
          <div style={{ fontWeight: '600', color: 'var(--syn-ink)' }}>{val}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--syn-muted)' }}>{row.creatorRole}</div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <Link
            to={`${BASE_PATH}/datasets/${row.id}`}
            className="syn-btn-brand"
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
          >
            Inspect
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Dataset Repository"
        title="Enterprise Synthetic Datasets Catalog"
        subtitle="Explore mathematically validated synthetic datasets ready for ML training, privacy-safe analytics, and staging test environments."
        actions={
          <Link to={`${BASE_PATH}/generator`} className="syn-btn-brand">
            <i className="bi bi-plus-circle-fill" aria-hidden="true" />
            Synthesize New Dataset
          </Link>
        }
      />

      <FilterBar
        searchPlaceholder="Search by dataset title, tag, domain, or creator (e.g. Poluru, Subbu)..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            value: domainFilter,
            onChange: setDomainFilter,
            options: [
              { label: 'All Domains', value: 'ALL' },
              { label: 'Healthcare & Life Sciences', value: 'Healthcare & Life Sciences' },
              { label: 'Banking & FinTech', value: 'Banking & FinTech' },
              { label: 'E-Commerce & Retail', value: 'E-Commerce & Retail' },
              { label: 'IoT & Telemetry', value: 'IoT & Telemetry' },
              { label: 'Conversational AI & LLMs', value: 'Conversational AI & LLMs' },
            ],
          },
          {
            value: privacyFilter,
            onChange: setPrivacyFilter,
            options: [
              { label: 'All Privacy Budgets', value: 'ALL' },
              { label: 'Strict DP (ε ≤ 0.8)', value: 'STRICT' },
              { label: 'Standard DP (ε > 0.8)', value: 'STANDARD' },
            ],
          },
        ]}
        onClear={() => {
          setSearch('');
          setDomainFilter('ALL');
          setPrivacyFilter('ALL');
        }}
      />

      <div className="syn-card">
        <DataTable
          columns={columns}
          data={filteredData}
          keyField="id"
          pageSize={6}
          emptyMessage="No synthetic datasets match your search filters."
        />
      </div>
    </div>
  );
}
