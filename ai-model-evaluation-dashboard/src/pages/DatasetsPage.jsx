import { useNavigate } from 'react-router-dom';
import datasetsData from '../data/datasets.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber } from '../lib/format.js';
import { ChartSection, DataTable, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function DatasetsPage() {
  const navigate = useNavigate();

  return (
    <div className="prism-page">
      <PageHeader
        title="Datasets"
        description="Gold packs for safety, notes, invoices, intent, Harbor retrieval, and Nimbus rank."
        crumbs={[BREADCRUMB_ROOT, { label: 'Datasets' }]}
      />

      <div className="row g-3 mb-3">
        {datasetsData.datasets.map((item) => (
          <div className="col-12 col-md-6 col-xl-4" key={item.id}>
            <button
              type="button"
              className="prism-suite-card"
              onClick={() => navigate(`${BASE_PATH}/suites/${item.suiteId}`)}
            >
              <header>
                <h3>{item.name}</h3>
                <StatusBadge status={item.status} />
              </header>
              <p className="prism-card-metric">
                <strong>{formatNumber(item.rows)}</strong>
                <span>rows · {formatNumber(item.holdout)} holdout</span>
              </p>
              <p className="prism-card-note">{item.note}</p>
              <footer>
                <span>{item.owner}</span>
                <span>{item.kind}</span>
              </footer>
            </button>
          </div>
        ))}
      </div>

      <ChartSection title="Gold pack inventory" subtitle="Owners and linked suites">
        <DataTable
          rows={datasetsData.datasets}
          onRowClick={(row) => navigate(`${BASE_PATH}/suites/${row.suiteId}`)}
          columns={[
            { key: 'name', label: 'Pack', className: 'prism-mono' },
            { key: 'suite', label: 'Suite' },
            { key: 'owner', label: 'Owner' },
            { key: 'rows', label: 'Rows', render: (value) => formatNumber(value) },
            { key: 'holdout', label: 'Holdout', render: (value) => formatNumber(value) },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
