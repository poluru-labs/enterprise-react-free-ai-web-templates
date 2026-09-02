import analytics from '../data/analytics.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { BarChart, GroupedBarChart } from '../components/charts/BarChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import { ChartSection, PageHeader, StatCard } from '../components/widgets/index.js';

export default function AnalyticsPage() {
  return (
    <div className="desk-page">
      <PageHeader
        title="Analytics"
        description="CSAT, volume, and AI deflection for 24–30 Aug 2026. Weekend created volume is lighter; leftover P1s are not."
        crumbs={[BREADCRUMB_ROOT, { label: 'Analytics' }]}
      />

      <div className="row g-3 mb-3">
        {analytics.kpis.map((kpi) => (
          <div className="col-12 col-sm-6 col-xl-3" key={kpi.id}>
            <StatCard
              label={kpi.label}
              value={kpi.value}
              hint={kpi.hint}
              trend={kpi.trend}
              trendValue={kpi.trendValue}
              icon={kpi.icon}
              tone={kpi.tone}
              sparkline={kpi.sparkline}
            />
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Volume and deflection" subtitle="Created, resolved, and copilot closes">
            <GroupedBarChart labels={analytics.volume.labels} series={analytics.volume.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="CSAT" subtitle="Daily mean · 142 surveys">
            <AreaChart labels={analytics.csatTrend.labels} series={analytics.csatTrend.series} />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-6">
          <ChartSection title="Channels" subtitle="How work arrived">
            <DonutChart items={analytics.channels} centerLabel="Tickets" centerValue="463" />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-6">
          <ChartSection title="Topics" subtitle="Billing still leads the window">
            <BarChart items={analytics.topics} />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
