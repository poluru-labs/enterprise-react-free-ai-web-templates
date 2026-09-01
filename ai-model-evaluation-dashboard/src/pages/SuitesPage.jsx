import { Button, TreeView } from '@poluru-labs/enterprise-design-system-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import suitesData from '../data/suites.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber, formatPercent } from '../lib/format.js';
import { ChartSection, DataTable, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function SuitesPage() {
  const navigate = useNavigate();
  const { onRun } = useOutletContext();

  return (
    <div className="prism-page">
      <PageHeader
        title="Suites"
        description="Safety, grounding, and field packs · Meera Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Suites' }]}
        actions={
          <Button size="sm" icon="plus" onClick={onRun}>
            Run evaluation
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        {suitesData.suites.map((item) => (
          <div className="col-12 col-md-6 col-xl-4" key={item.id}>
            <button
              type="button"
              className="prism-suite-card"
              onClick={() => navigate(`${BASE_PATH}/suites/${item.id}`)}
            >
              <header>
                <h3>{item.name}</h3>
                <StatusBadge status={item.status} pulse={item.status === 'Watch'} />
              </header>
              <p className="prism-card-metric">
                <strong>{formatPercent(item.pass)}</strong>
                <span>{formatNumber(item.cases)} cases · {item.model}</span>
              </p>
              <p className="prism-card-note">{item.note}</p>
              <footer>
                <span>{item.owner}</span>
                <span>{item.dataset}</span>
              </footer>
            </button>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Suite table" subtitle="Cases, pass rate, and owners">
            <DataTable
              rows={suitesData.suites}
              onRowClick={(row) => navigate(`${BASE_PATH}/suites/${row.id}`)}
              columns={[
                { key: 'name', label: 'Suite' },
                { key: 'owner', label: 'Owner' },
                { key: 'model', label: 'Model' },
                { key: 'cases', label: 'Cases', render: (value) => formatNumber(value) },
                { key: 'pass', label: 'Pass', render: (value) => formatPercent(value) },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Gold packs" subtitle="Holdout rows stay with Meera Poluru">
            <TreeView items={suitesData.datasetTree} />
            <p className="prism-note">Judges never train on holdout files.</p>
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
