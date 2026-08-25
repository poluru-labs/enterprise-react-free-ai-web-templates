import { Badge } from '@poluru-labs/enterprise-design-system-react';
import cost from '../data/cost.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency, formatPercent } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import { HorizontalBarChart } from '../components/charts/BarChart.jsx';
import { ChartSection, DataTable, PageHeader, StatCard } from '../components/widgets/index.js';

export default function CostPage() {
  const remaining = cost.summary.budgetUsd - cost.summary.spendToday;

  return (
    <div className="amd-page">
      <PageHeader
        title="Cost and tokens"
        description="Daily LLM spend, token volume, and budget burn by agent and model."
        crumbs={[BREADCRUMB_ROOT, { label: 'Cost & tokens' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Spend today"
            value={formatCurrency(cost.summary.spendToday, 0)}
            hint={`vs ${formatCurrency(cost.summary.spendYesterday, 0)} yesterday`}
            icon="bi-currency-dollar"
            tone="brand"
            trend="up"
            trendValue="+8.6%"
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Tokens in / out"
            value={`${(cost.summary.tokensIn / 1_000_000).toFixed(1)}M`}
            hint={`${(cost.summary.tokensOut / 1_000_000).toFixed(1)}M completion tokens`}
            icon="bi-hash"
            tone="info"
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Budget used"
            value={formatPercent(cost.summary.budgetUsed, 0)}
            hint={`${formatCurrency(remaining, 0)} remaining of ${formatCurrency(cost.summary.budgetUsd, 0)}`}
            icon="bi-pie-chart"
            tone="warning"
          />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard
            label="Cost per task"
            value={formatCurrency(cost.summary.costPerTask, 2)}
            hint="Blended across the fleet"
            icon="bi-calculator"
            tone="success"
            trend="down"
            trendValue="-$0.04"
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Daily spend" subtitle="USD versus a $800 daily guide line">
            <AreaChart labels={cost.trend.labels} series={cost.trend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Spend by model" subtitle="Share of today's $741">
            <DonutChart
              items={cost.byModel.map((item) => ({ name: item.name, value: item.value, color: item.color }))}
              centerLabel="Today"
              centerValue={formatCurrency(cost.summary.spendToday, 0)}
            />
          </ChartSection>
        </div>
        <div className="col-12">
          <ChartSection title="Spend by agent" subtitle="Helix and Quill dominate token cost">
            <HorizontalBarChart items={cost.byAgent} />
          </ChartSection>
        </div>
      </div>

      <ChartSection title="Provider invoices" subtitle="Accrued usage for the current week">
        <DataTable
          rows={cost.invoices}
          columns={[
            { key: 'id', label: 'Invoice', className: 'amd-mono' },
            { key: 'vendor', label: 'Vendor' },
            { key: 'window', label: 'Window' },
            { key: 'tokens', label: 'Tokens' },
            {
              key: 'amount',
              label: 'Amount',
              render: (value) => formatCurrency(value, 1),
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => (
                <Badge label={value} variant={value === 'draft' ? 'warning' : 'info'} soft pill size="sm" />
              ),
            },
          ]}
        />
      </ChartSection>
    </div>
  );
}
