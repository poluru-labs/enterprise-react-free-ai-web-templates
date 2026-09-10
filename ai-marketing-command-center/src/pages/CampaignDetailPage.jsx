import { useParams } from 'react-router-dom';
import {
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
import { findCampaign } from '../lib/campaigns.js';
import { formatCurrency, formatDateTime, formatDuration, formatNumber, formatPercent } from '../lib/format.js';
import { DataTable, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function CampaignDetailPage() {
  const { id } = useParams();
  const campaign = findCampaign(id);

  return (
    <div className="mq-page">
      <PageHeader
        title={campaign.name}
        description={`${campaign.purpose} Owned by ${campaign.owner} · steward ${campaign.steward}.`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Campaigns', to: `${BASE_PATH}/campaigns` }, { label: campaign.name }]}
        actions={
          <div className="mq-inline">
            <StatusBadge status={campaign.status} pulse={campaign.status === 'Live'} />
          </div>
        }
      />

      <div className="mq-stage-strip">
        {campaign.stages.map((stage) => (
          <div className="mq-stage-chip" key={stage.label}>
            <span>{stage.label}</span>
            <strong>
              <StatusBadge status={stage.status} />
            </strong>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <section className="mq-panel">
            <header className="mq-panel-header">
              <div>
                <h2>Record</h2>
                <p>Channel, audience, and schedule.</p>
              </div>
            </header>
            <div className="mq-panel-body">
              <DescriptionList
                columns={2}
                items={[
                  { term: 'Channel', description: campaign.channel },
                  { term: 'Audience', description: campaign.audience },
                  { term: 'Schedule', description: campaign.schedule },
                  { term: 'Spend', description: formatCurrency(campaign.spend) },
                  { term: 'ROAS', description: campaign.roas ? `${campaign.roas}x` : '—' },
                  { term: 'CTR', description: formatPercent(campaign.ctr, 1) },
                  { term: 'Last send', description: formatDateTime(campaign.lastRun) },
                  { term: 'Conversions', description: formatNumber(campaign.conversions) },
                ]}
              />
              <div className="mq-tag-row mt-3">
                {campaign.tags.map((item) => (
                  <Tag key={item} label={item} variant="info" />
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="col-12 col-xl-5">
          <section className="mq-panel">
            <header className="mq-panel-header">
              <div>
                <h2>Efficiency</h2>
                <p>ROAS against a 4.0x floor.</p>
              </div>
            </header>
            <div className="mq-panel-body">
              <ProgressBar value={Math.min(campaign.roas * 20, 100)} max={100} label="ROAS vs floor" showValue />
              <Meter className="mt-3" value={Math.min(campaign.ctr * 12, 100)} max={100} label="CTR confidence" showValue />
              <List
                divided
                className="mt-3"
                items={campaign.stages.map((stage) => ({ label: `${stage.label} · ${stage.status}`, icon: 'check' }))}
              />
            </div>
          </section>
        </div>
      </div>

      <section className="mq-panel">
        <header className="mq-panel-header">
          <div>
            <h2>Sends and activity</h2>
            <p>Recent windows and operator notes.</p>
          </div>
        </header>
        <div className="mq-panel-body">
          <Tabs>
            <Tab label="Sends">
              <DataTable
                rows={campaign.runs}
                emptyTitle="No sends yet"
                emptyDescription="Draft flights have no windows."
                columns={[
                  { key: 'id', label: 'Send' },
                  {
                    key: 'started',
                    label: 'Started',
                    render: (value) => formatDateTime(value),
                  },
                  {
                    key: 'duration',
                    label: 'Duration',
                    render: (value) => formatDuration(value),
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    render: (value) => <StatusBadge status={value} />,
                  },
                  {
                    key: 'rows',
                    label: 'Reached',
                    render: (value) => formatNumber(value),
                  },
                ]}
              />
            </Tab>
            <Tab label="Activity">
              <Timeline
                items={(campaign.runs.length ? campaign.runs : [{ id: 'Draft', started: campaign.lastRun, duration: 0, status: 'Draft', rows: 0 }]).map((run) => ({
                  title: `${run.id} ${run.status.toLowerCase()}`,
                  description: `${formatNumber(run.rows)} reached · ${formatDuration(run.duration)}`,
                  timestamp: formatDateTime(run.started),
                  status: run.status === 'Succeeded' ? 'complete' : 'current',
                }))}
              />
            </Tab>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
