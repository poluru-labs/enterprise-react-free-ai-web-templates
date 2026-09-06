import { useParams } from 'react-router-dom';
import {
  Badge,
  CodeSnippet,
  DescriptionList,
  List,
  Meter,
  ProgressBar,
  Tab,
  Tabs,
  Tag,
  Timeline,
} from '@poluru-labs/enterprise-design-system-react';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { findModel } from '../lib/inventory.js';
import { PageHeader, SeverityBadge, StatusBadge } from '../components/widgets/index.js';

export default function InventoryDetailPage() {
  const { id } = useParams();
  const model = findModel(id);

  return (
    <div className="gov-page">
      <PageHeader
        title={model.name}
        description={`${model.useCase} · owned by ${model.owner} · steward ${model.steward}`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Inventory', to: `${BASE_PATH}/inventory` }, { label: model.name }]}
        actions={
          <div className="gov-inline">
            <SeverityBadge severity={model.risk} />
            <StatusBadge status={model.status} pulse={model.status === 'Production'} />
          </div>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <section className="gov-panel">
            <header className="gov-panel-header">
              <div>
                <h2>Record</h2>
                <p>Purpose, data classes, and named approver.</p>
              </div>
            </header>
            <div className="gov-panel-body">
              <DescriptionList
                columns={2}
                items={[
                  { term: 'Version', description: model.version },
                  { term: 'Vendor', description: model.vendor },
                  { term: 'Region', description: model.region },
                  { term: 'Framework', description: model.framework },
                  { term: 'Approver', description: model.approver },
                  { term: 'Last review', description: model.lastReview },
                ]}
              />
              <p className="gov-note mt-3">{model.purpose}</p>
              <div className="gov-tag-row mt-3">
                {model.dataClasses.map((item) => (
                  <Tag key={item} label={item} variant="info" />
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="col-12 col-xl-5">
          <section className="gov-panel">
            <header className="gov-panel-header">
              <div>
                <h2>Control coverage</h2>
                <p>Mapped controls on this system.</p>
              </div>
            </header>
            <div className="gov-panel-body">
              <ProgressBar value={model.coverage} max={100} label="Coverage" showValue />
              <Meter className="mt-3" value={model.coverage} max={100} label="Residual confidence" showValue />
              <List divided items={model.controls.map((control) => ({ label: control, icon: 'check' }))} />
            </div>
          </section>
        </div>
      </div>

      <section className="gov-panel">
        <div className="gov-panel-body" style={{ paddingTop: '1rem' }}>
          <Tabs>
            <Tab label="Activity">
              <Timeline
                items={[
                  {
                    title: 'Review scheduled',
                    description: `Next review ${model.nextReview} · ${model.approver}`,
                    timestamp: model.nextReview,
                    status: 'current',
                  },
                  {
                    title: 'Last signed review',
                    description: `${model.lastReview} · ${model.owner}`,
                    timestamp: model.lastReview,
                    status: 'complete',
                  },
                  {
                    title: 'Registered',
                    description: `${model.vendor} · ${model.region}`,
                    status: 'complete',
                  },
                ]}
              />
            </Tab>
            <Tab label="Policy snippet">
              <CodeSnippet
                label="Intended purpose"
                language="text"
                code={`${model.name} (${model.id})\nPurpose: ${model.purpose}\nRisk: ${model.risk}\nFramework: ${model.framework}`}
              />
            </Tab>
            <Tab label="Tags">
              <div className="gov-tag-row">
                <Badge label={model.framework} variant="brand" />
                <Badge label={model.region} variant="neutral" />
                <Badge label={`v${model.version}`} variant="info" />
              </div>
            </Tab>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
