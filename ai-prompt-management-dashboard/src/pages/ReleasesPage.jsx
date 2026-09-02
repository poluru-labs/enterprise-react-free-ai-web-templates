import { Stepper } from '@poluru-labs/enterprise-design-system-react';
import { useNavigate } from 'react-router-dom';
import releases from '../data/releases.json';
import versions from '../data/versions.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import {
  ChartSection,
  DataTable,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const STEPS = [
  { label: 'Draft', description: 'Author' },
  { label: 'Eval', description: 'Golden set' },
  { label: 'Review', description: 'Owner sign-off' },
  { label: 'Canary', description: '10% traffic' },
  { label: 'Publish', description: 'Production' },
];

export default function ReleasesPage() {
  const navigate = useNavigate();

  return (
    <div className="pmt-page">
      <PageHeader
        title="Releases"
        description="Draft, evaluate, canary, and publish. Lakshmi Poluru’s support copilot is the current live pack."
        crumbs={[BREADCRUMB_ROOT, { label: 'Releases' }]}
      />

      <div className="row g-3 mb-3">
        {releases.pipeline.map((stage) => (
          <div className="col-6 col-xl" key={stage.label}>
            <StatCard
              className="h-100"
              label={stage.label}
              value={stage.count}
              hint={stage.description}
              icon="bi-rocket-takeoff"
              tone={stage.label === 'Publish' ? 'success' : stage.label === 'Eval' ? 'warning' : 'brand'}
            />
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12">
          <ChartSection title="Canonical pipeline" subtitle="Review is the current gate for Legal summarizer">
            <Stepper steps={STEPS} current={releases.current} />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3 mb-3">
        {releases.cards.map((card) => (
          <div className="col-12 col-md-6 col-xl" key={card.stage}>
            <article className="pmt-stage-card h-100">
              <header>
                <h3>{card.stage}</h3>
                <StatusBadge status={card.stage === 'Publish' ? 'Live' : card.stage} />
              </header>
              <ul>
                {card.items.map((item) => (
                  <li key={item.id}>
                    <strong>{item.prompt}</strong>
                    <span>{item.id} · {item.owner}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-12">
          <ChartSection title="Active versions" subtitle="Every pack currently in the pipeline">
            <DataTable
              rows={versions.items}
              onRowClick={(row) => navigate(`${BASE_PATH}/library/${row.promptId}`)}
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'prompt', label: 'Prompt' },
                { key: 'owner', label: 'Owner' },
                { key: 'stage', label: 'Stage' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
