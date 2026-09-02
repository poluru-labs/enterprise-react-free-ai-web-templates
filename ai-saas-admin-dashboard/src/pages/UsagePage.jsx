import { useNavigate } from 'react-router-dom';
import usage from '../data/usage.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCompact, formatCurrency, formatNumber } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { BarChart } from '../components/charts/BarChart.jsx';
import { ChartSection, DataTable, PageHeader, StatCard } from '../components/widgets/index.js';

export default function UsagePage() {
  const navigate = useNavigate();

  return (
    <div className="nx-page">
      <PageHeader
        title="Usage"
        description={`${usage.window} · API calls and tokens by tenant.`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Usage' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-4">
          <StatCard label="API calls" value={formatCompact(usage.totals.apiCalls)} icon="bi-activity" tone="brand" />
        </div>
        <div className="col-12 col-md-4">
          <StatCard label="Tokens" value={`${usage.totals.tokensM}M`} icon="bi-hash" tone="info" />
        </div>
        <div className="col-12 col-md-4">
          <StatCard label="Overage" value={formatCurrency(usage.totals.overageUsd)} icon="bi-receipt" tone="warning" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Daily volume" subtitle="API calls and tokens">
            <AreaChart labels={usage.daily.labels} series={usage.daily.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="API by tenant" subtitle="Calls this window">
            <BarChart
              items={usage.byTenant.map((item) => ({
                name: item.name,
                value: item.api,
                color: item.color,
              }))}
            />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <ChartSection title="Token burn" subtitle="Millions of tokens by workspace">
            <DataTable
              rows={usage.byTenant}
              onRowClick={(row) => navigate(`${BASE_PATH}/tenants/${row.id}`)}
              columns={[
                { key: 'name', label: 'Tenant' },
                { key: 'api', label: 'API calls', render: (value) => formatNumber(value) },
                { key: 'tokens', label: 'Tokens (M)', render: (value) => `${value}M` },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
