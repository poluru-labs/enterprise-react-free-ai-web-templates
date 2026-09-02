import { Avatar, ProgressBar } from '@poluru-labs/enterprise-design-system-react';
import agents from '../data/agents.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { BarChart } from '../components/charts/BarChart.jsx';
import { ChartSection, PageHeader, StatusBadge, StatCard } from '../components/widgets/index.js';

export default function AgentsPage() {
  const occupancy = Math.round(agents.items.reduce((sum, item) => sum + item.occupancy, 0) / agents.items.length);

  return (
    <div className="desk-page">
      <PageHeader
        title="Agents"
        description="Eight on the Sunday desk. Harini is hottest on AI hold; Subrahmanyam is overflow."
        crumbs={[BREADCRUMB_ROOT, { label: 'Agents' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Online" value={agents.online} icon="bi-headset" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Avg occupancy" value={`${occupancy}%`} icon="bi-activity" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Open on desk" value={agents.items.reduce((sum, item) => sum + item.open, 0)} icon="bi-inbox" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Hottest" value="Harini" hint="82% on AI hold" icon="bi-thermometer-half" tone="danger" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-5">
          <ChartSection title="Occupancy" subtitle="Share of the last hour on ticket work">
            <BarChart
              items={agents.items.map((item) => ({
                name: item.name.split(' ')[0],
                value: item.occupancy,
                color: item.occupancy >= 75 ? '#dc2626' : item.occupancy >= 55 ? '#EA580C' : '#FDBA74',
              }))}
              unit="%"
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-7">
          <ChartSection title="Load" subtitle="Open tickets and shift">
            {agents.items.map((agent) => (
              <div key={agent.id} className="desk-member">
                <div className="desk-model-cell">
                  <Avatar name={agent.name} size="sm" />
                  <div>
                    <strong>{agent.name}</strong>
                    <div className="desk-subtle">{agent.role} · {agent.queue}</div>
                  </div>
                </div>
                <div className="desk-progress-cell">
                  <ProgressBar value={agent.occupancy} max={100} />
                  <span>{agent.occupancy}%</span>
                </div>
                <span>{agent.open} open</span>
                <StatusBadge status={agent.status} pulse />
              </div>
            ))}
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
