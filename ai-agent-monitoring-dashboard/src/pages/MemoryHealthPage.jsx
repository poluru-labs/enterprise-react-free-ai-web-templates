import { CircularProgress, ProgressBar, Status } from '@poluru-labs/enterprise-design-system-react';
import memory from '../data/memoryHealth.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatPercent } from '../lib/format.js';
import { AreaChart } from '../components/charts/AreaChart.jsx';
import { ChartSection, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function MemoryHealthPage() {
  return (
    <div className="amd-page">
      <PageHeader
        title="Memory health"
        description="Working set, stale entries, retrieval quality, and context saturation by agent."
        crumbs={[BREADCRUMB_ROOT, { label: 'Memory Health' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-4">
          <article className="amd-score-card">
            <p>Fleet memory score</p>
            <CircularProgress value={memory.fleetScore} max={100} size={148} showValue />
            <Status label="Watch Helix Data" variant="warning" pulse />
          </article>
        </div>
        {memory.metrics.map((metric) => (
          <div className="col-12 col-md-6 col-xl-2" key={metric.id}>
            <article className="amd-metric-card">
              <h3>{metric.label}</h3>
              <p className="amd-metric-value">
                {metric.value}
                {metric.unit}
              </p>
              <ProgressBar value={metric.value} max={metric.max} showValue={false} />
              <small>{metric.hint}</small>
            </article>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12">
          <ChartSection
            title="Health and retrieval trend"
            subtitle="Fleet score versus grounded retrieval quality"
          >
            <AreaChart labels={memory.trend.labels} series={memory.trend.series} />
          </ChartSection>
        </div>
      </div>

      <ChartSection title="Agent-wise health" subtitle="Usage, staleness, retrieval, and saturation risk">
        <div className="row g-3">
          {memory.agents.map((agent) => (
            <div className="col-12 col-md-6 col-xl-4" key={agent.id}>
              <article className={`amd-agent-card status-${agent.status}`}>
                <header>
                  <div>
                    <h3>{agent.name}</h3>
                    <p>{agent.tokens} tokens</p>
                  </div>
                  <StatusBadge status={agent.status} />
                </header>
                <dl>
                  <div>
                    <dt>Usage</dt>
                    <dd>
                      <ProgressBar value={agent.usage} max={100} label="" showValue={false} />
                      <span>{formatPercent(agent.usage, 0)}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Stale entries</dt>
                    <dd>
                      <ProgressBar value={agent.staleEntries} max={100} showValue={false} />
                      <span>{formatPercent(agent.staleEntries, 0)}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Retrieval quality</dt>
                    <dd>
                      <ProgressBar value={agent.retrievalQuality} max={100} showValue={false} />
                      <span>{agent.retrievalQuality}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Saturation risk</dt>
                    <dd>
                      <ProgressBar value={agent.saturationRisk} max={100} showValue={false} />
                      <span>{formatPercent(agent.saturationRisk, 0)}</span>
                    </dd>
                  </div>
                </dl>
              </article>
            </div>
          ))}
        </div>
      </ChartSection>
    </div>
  );
}
