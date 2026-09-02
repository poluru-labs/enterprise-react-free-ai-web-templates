import { useNavigate } from 'react-router-dom';
import sla from '../data/sla.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import {
  ChartSection,
  DataTable,
  PageHeader,
  SlaBadge,
  StatCard,
} from '../components/widgets/index.js';

export default function SlaPage() {
  const navigate = useNavigate();

  return (
    <div className="desk-page">
      <PageHeader
        title="SLA"
        description="P1 is 15 minutes. The Sunday breach is Contoso's 02:04 census page."
        crumbs={[BREADCRUMB_ROOT, { label: 'SLA' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Policies" value={sla.policies.length} icon="bi-hourglass-split" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="At risk" value={sla.policies.reduce((sum, item) => sum + item.atRisk, 0)} icon="bi-exclamation-triangle" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Breaches" value={sla.policies.reduce((sum, item) => sum + item.breaches, 0)} icon="bi-x-octagon" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Hottest clock" value="12m" hint="TKT-1847 Northwind" icon="bi-stopwatch" tone="danger" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        {sla.policies.map((policy) => (
          <div className="col-12 col-xl-4" key={policy.id}>
            <article className="desk-queue-card">
              <header>
                <h3>{policy.name}</h3>
                <SlaBadge sla={policy.status} />
              </header>
              <p>
                First response {policy.firstResponse} · resolve {policy.resolve}. {policy.coverage}.
              </p>
              <footer>
                <span>{policy.accounts}</span>
                <span>{policy.atRisk} at risk · {policy.breaches} breach</span>
              </footer>
            </article>
          </div>
        ))}
      </div>

      <ChartSection title="Breaches and near misses" subtitle="Notifications deep-link here">
        <DataTable
          rows={sla.breaches}
          onRowClick={(row) => navigate(`${BASE_PATH}/tickets/${row.ticket}`)}
          rowClassName={(row) => (row.status === 'breached' ? 'is-severe' : 'is-attention')}
          columns={[
            { key: 'ticket', label: 'Ticket', className: 'desk-mono' },
            { key: 'account', label: 'Account' },
            { key: 'policy', label: 'Policy' },
            { key: 'missed', label: 'Clock' },
            { key: 'target', label: 'Target' },
            { key: 'actual', label: 'Actual' },
            { key: 'owner', label: 'Owner' },
            {
              key: 'status',
              label: 'State',
              render: (value) => <SlaBadge sla={value} />,
            },
            {
              key: 'when',
              label: 'When',
              render: (value) => formatDateTime(value),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
