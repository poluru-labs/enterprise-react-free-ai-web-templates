import { useEffect, useState } from 'react';
import { Alert, Badge, Button, DateRangePicker, ProgressBar, showToast } from '@poluru-labs/enterprise-design-system-react';
import costs from '../data/costs.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency } from '../lib/format.js';
import { BarChart } from '../components/charts/BarChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import { ChartSection, PageHeader, StatCard } from '../components/widgets/index.js';

export default function CostsPage() {
  const [start, setStart] = useState(costs.start);
  const [end, setEnd] = useState(costs.end);

  useEffect(() => {
    const exportCosts = () => showToast({ title: 'Report exported', description: 'CSV sent to Subrahmanyam Poluru.', variant: 'success' });
    window.addEventListener('llm:export-costs', exportCosts);
    return () => window.removeEventListener('llm:export-costs', exportCosts);
  }, []);

  return (
    <div className="llm-page">
      <PageHeader
        title="Costs"
        description="87% of the monthly envelope used. Aurora Chat is still the largest share."
        crumbs={[BREADCRUMB_ROOT, { label: 'Costs' }]}
        actions={
          <Button
            size="sm"
            variant="secondary"
            icon="download"
            onClick={() => showToast({ title: 'Report exported', description: 'CSV sent to Subrahmanyam Poluru.', variant: 'success' })}
          >
            Export report
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard label="Period spend" value={formatCurrency(costs.periodSpend)} hint={`$${costs.remaining} remaining`} icon="bi-wallet2" tone="brand" />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard label="Budget used" value={`${costs.budgetUsed}%`} trend="up" trendValue="+4.2%" icon="bi-pie-chart" tone="warning" />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard label="Projected month-end" value={formatCurrency(costs.projected)} trend="up" trendValue="+$356" icon="bi-graph-up" tone="info" />
        </div>
        <div className="col-12 col-md-6 col-xl-3">
          <StatCard label="Daily peak" value="$429" hint="Friday token burn" icon="bi-bar-chart" tone="danger" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Daily burn" subtitle={`Token spend ${start} to ${end}`}>
            <DateRangePicker
              label="Period"
              startValue={start}
              endValue={end}
              onChange={(nextStart, nextEnd) => {
                setStart(nextStart);
                setEnd(nextEnd);
              }}
            />
            <div className="mt-3">
              <BarChart items={costs.daily} unit="" />
            </div>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Model share" subtitle="Aurora is 36% of spend">
            <DonutChart
              items={costs.share.map((item) => ({ name: item.name, value: item.value, color: item.color }))}
              centerLabel="USD"
              centerValue={formatCurrency(costs.periodSpend)}
            />
            <ProgressBar className="mt-3" label="Budget used" value={costs.budgetUsed} showValue />
            <div className="mt-2"><Badge variant="warning" soft>87% of budget used</Badge></div>
          </ChartSection>
        </div>
      </div>

      <Alert
        variant="warning"
        title="Envelope tight"
        message="Aurora Chat is the largest share. Kavya Poluru can cap tokens on customer reply."
      />
    </div>
  );
}
