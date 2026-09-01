import { Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import { Link } from 'react-router-dom';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCompact, formatDateTime } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import {
  AlertPanel,
  ChartSection,
  ConfidenceBadge,
  DataTable,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function OverviewPage() {
  return (
    <div className="cvd-page">
      <PageHeader
        title="Vision operations"
        description="Live cameras, inference volume, model quality, and open safety incidents across four sites."
        crumbs={[BREADCRUMB_ROOT, { label: 'Overview' }]}
        actions={
          <>
            <Button
              variant="secondary"
              size="sm"
              icon="download"
              onClick={() => showToast({ title: 'Snapshot queued', variant: 'success' })}
            >
              Export
            </Button>
            <Button
              size="sm"
              icon="refresh"
              onClick={() => showToast({ title: 'Telemetry refreshed', variant: 'info' })}
            >
              Sync now
            </Button>
          </>
        }
      />

      <section className="cvd-hero">
        <div>
          <p className="cvd-kicker">{overview.kicker}</p>
          <h2>{overview.headline}</h2>
          <p>{overview.summary}</p>
        </div>
        <div className="cvd-hero-meta">
          <div>
            <span>Fleet mAP</span>
            <strong>0.841</strong>
          </div>
          <div>
            <span>p95 latency</span>
            <strong>38ms</strong>
          </div>
          <div>
            <span>Open incidents</span>
            <strong>3</strong>
          </div>
        </div>
      </section>

      <div className="row g-3 mb-3">
        {overview.kpis.map((kpi) => (
          <div className="col-12 col-sm-6 col-xl-4 col-xxl-2" key={kpi.id}>
            <StatCard
              label={kpi.label}
              value={typeof kpi.value === 'number' ? formatCompact(kpi.value) : kpi.value}
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
          <ChartSection title="Inference trend" subtitle="Throughput and detections over the last 7 days">
            <AreaChart labels={overview.inferenceTrend.labels} series={overview.inferenceTrend.series} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Class distribution" subtitle="Detections today by label">
            <DonutChart items={overview.classDistribution} centerLabel="Classes" centerValue="5" />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        {overview.cameraHealth.map((site) => (
          <div className="col-12 col-md-6 col-xl-3" key={site.id}>
            <article className={`cvd-camera-card status-${site.status}`}>
              <header>
                <div>
                  <h3>{site.site}</h3>
                  <p>
                    {site.live}/{site.total} streaming
                  </p>
                </div>
                <StatusBadge status={site.status} />
              </header>
              <dl>
                <div>
                  <dt>FPS</dt>
                  <dd>{site.fps}</dd>
                </div>
                <div>
                  <dt>GPU</dt>
                  <dd>{site.gpu}%</dd>
                </div>
              </dl>
              <p className="cvd-camera-note">{site.note}</p>
            </article>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection
            title="Recent detections"
            subtitle="Newest events from the production fleet"
            action={
              <Link className="cvd-text-link" to={`${BASE_PATH}/detections`}>
                View stream
              </Link>
            }
          >
            <DataTable
              rows={overview.recentDetections}
              columns={[
                { key: 'time', label: 'Time', render: (value) => formatDateTime(value) },
                { key: 'label', label: 'Class' },
                { key: 'camera', label: 'Camera', className: 'cvd-mono' },
                { key: 'site', label: 'Site' },
                {
                  key: 'confidence',
                  label: 'Confidence',
                  render: (value) => <ConfidenceBadge value={value} />,
                },
                { key: 'model', label: 'Model', className: 'cvd-mono' },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <AlertPanel alerts={overview.alerts} />
        </div>
      </div>
    </div>
  );
}
