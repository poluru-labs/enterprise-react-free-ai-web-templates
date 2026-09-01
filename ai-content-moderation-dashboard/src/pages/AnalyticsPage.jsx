import analytics from '../data/analytics.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber, formatPercent } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { BarChart } from '../components/charts/BarChart.jsx';
import { ChartSection, PageHeader, StatCard } from '../components/widgets/index.js';

export default function AnalyticsPage() {
  return (
    <div className="cmb-page">
      <PageHeader
        title="Analytics"
        description="Reviewer throughput, sampled agreement, and where the desk still disagrees."
        crumbs={[BREADCRUMB_ROOT, { label: 'Analytics' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Throughput" value={formatNumber(analytics.summary.throughput)} hint="Human decisions today" icon="bi-speedometer2" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Agreement" value={formatPercent(analytics.summary.agreement)} hint={`${analytics.summary.sampled} sampled audits`} icon="bi-people" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Median handle" value={`${analytics.summary.medianHandleMinutes}m`} icon="bi-stopwatch" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Reviewers" value={analytics.reviewers.length} hint="All online this shift" icon="bi-person-badge" tone="warning" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Reviewer throughput" subtitle="Human decisions versus sampled audits">
            <AreaChart labels={analytics.throughputTrend.labels} series={analytics.throughputTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Agreement by category" subtitle="Sampled dual-review this week">
            <BarChart items={analytics.agreementByCategory} unit="%" />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3">
        {analytics.reviewers.map((person) => (
          <div className="col-12 col-md-6 col-xl-4" key={person.name}>
            <article className="cmb-reviewer-card">
              <header>
                <h3>{person.name}</h3>
                <span>{person.focus}</span>
              </header>
              <dl>
                <div>
                  <dt>Reviewed</dt>
                  <dd>{formatNumber(person.reviewed)}</dd>
                </div>
                <div>
                  <dt>Agreement</dt>
                  <dd>{formatPercent(person.agreement)}</dd>
                </div>
                <div>
                  <dt>Median</dt>
                  <dd>{person.medianMinutes}m</dd>
                </div>
              </dl>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
