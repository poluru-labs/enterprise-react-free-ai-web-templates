import { Button, ProgressBar } from '@poluru-labs/enterprise-design-system-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import prompts from '../data/prompts.json';
import versions from '../data/versions.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDate, formatPercent } from '../lib/format.js';
import {
  ChartSection,
  DataTable,
  PageHeader,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function PromptDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const prompt = prompts.items.find((item) => item.id === id);

  if (!prompt) {
    return <Navigate to={`${BASE_PATH}/library`} replace />;
  }

  const lineage = versions.items.filter((item) => item.promptId === prompt.id);

  return (
    <div className="pmt-page">
      <PageHeader
        title={prompt.name}
        description={`${prompt.family} · owned by ${prompt.owner} · last published ${formatDate(prompt.updated)}.`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Library', to: `${BASE_PATH}/library` }, { label: prompt.name }]}
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate(`${BASE_PATH}/playground`)}>
              Open playground
            </Button>
            <Button size="sm" icon="plus" onClick={() => navigate(`${BASE_PATH}/library?create=1`)}>
              New prompt
            </Button>
          </>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard className="h-100" label="Version" value={prompt.version} hint={prompt.env} icon="bi-layers" tone="brand" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard className="h-100" label="Score" value={formatPercent(prompt.score)} hint="Latest eval" icon="bi-graph-up" tone="success" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <StatCard className="h-100" label="Owner" value={prompt.owner.split(' ')[0]} hint={prompt.owner} icon="bi-person" tone="info" />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="pmt-stat-card h-100 tone-brand">
            <p className="pmt-stat-label">Status</p>
            <div className="mt-2">
              <StatusBadge status={prompt.status} pulse={prompt.status === 'Live'} />
            </div>
            <p className="pmt-stat-hint mt-auto">{prompt.model}</p>
          </article>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="System prompt" subtitle="Body preview from the live pack">
            <pre className="pmt-preview">{prompt.body}</pre>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Eval score" subtitle={`${prompt.owner} signed the last suite`}>
            <div className="pmt-score-row">
              <strong>Groundedness</strong>
              <ProgressBar value={prompt.score} max={100} />
              <span>{formatPercent(prompt.score)}</span>
            </div>
            <p className="pmt-note mt-3">Family {prompt.family}. Environment {prompt.env}. Updated {formatDate(prompt.updated)}.</p>
          </ChartSection>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <ChartSection title="Versions" subtitle="Lineage for this prompt family">
            <DataTable
              rows={lineage}
              emptyTitle="No versions yet"
              emptyDescription="Queue a draft from the header."
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'version', label: 'Version' },
                { key: 'stage', label: 'Stage' },
                { key: 'owner', label: 'Owner' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
                {
                  key: 'updated',
                  label: 'Updated',
                  render: (value) => formatDate(value),
                },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
