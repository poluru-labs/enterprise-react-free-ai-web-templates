import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Meter,
  Rating,
  Tab,
  Tabs,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import models from '../data/models.json';
import traces from '../data/traces.json';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { findModel } from '../lib/models.js';
import { ChartSection, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

export default function ModelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const model = findModel(id);
  const [rating, setRating] = useState(model.status === 'Production' ? 5 : 3);
  const related = traces.filter((item) => item.model === model.name).slice(0, 5);
  const peers = models.filter((item) => item.id !== model.id).slice(0, 3);

  useEffect(() => {
    setRating(model.status === 'Production' ? 5 : 3);
  }, [model.id, model.status]);

  return (
    <div className="llm-page">
      <PageHeader
        title={model.name}
        description={`${model.owner} · ${model.provider} · ${model.calls} requests this window.`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Models', to: `${BASE_PATH}/models` }, { label: model.name }]}
        actions={
          <ButtonGroup size="sm">
            <Button
              variant="secondary"
              icon="refresh"
              onClick={() => showToast({ title: 'Rolled back', description: `${model.name} stays on ${model.version}.`, variant: 'info' })}
            >
              Rollback
            </Button>
            <Button
              icon="star"
              onClick={() => showToast({ title: 'Eval queued', description: `Harini Poluru will score ${model.name}.`, variant: 'success' })}
            >
              Score
            </Button>
          </ButtonGroup>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Requests" value={model.calls} icon="bi-activity" tone="brand" sparkline={model.sparkline} />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Latency" value={model.latency} icon="bi-stopwatch" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Tokens" value={model.tokens} icon="bi-hash" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Spend" value={model.spend} hint={`${model.inputCost} in · ${model.outputCost} out`} icon="bi-wallet2" tone="warning" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-5">
          <ChartSection title="Serving" subtitle={`${model.region} · ${model.version}`}>
            <StatusBadge status={model.status} />
            <dl className="llm-settings-list mt-3">
              <div>
                <dt>Owner</dt>
                <dd>{model.owner}</dd>
              </div>
              <div>
                <dt>Provider</dt>
                <dd>{model.provider}</dd>
              </div>
              <div>
                <dt>Success</dt>
                <dd>{model.success}%</dd>
              </div>
              <div>
                <dt>Input</dt>
                <dd>{model.inputCost}</dd>
              </div>
              <div>
                <dt>Output</dt>
                <dd>{model.outputCost}</dd>
              </div>
              <div>
                <dt>Quality</dt>
                <dd>
                  <Rating value={rating} onChange={setRating} />
                </dd>
              </div>
            </dl>
            <Meter className="mt-3" label="Budget share" value={Math.min(100, Math.round(model.spendNum / 30))} max={100} showValue />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-7">
          <ChartSection title="Workspace" subtitle="Traces, history, and serving notes">
            <Tabs className="llm-tabs">
              <Tab label="Traces">
                {related.map((item) => (
                  <div key={item.id} className="llm-member">
                    <strong>{item.id}</strong>
                    <span>{item.user} · {item.latency}ms</span>
                  </div>
                ))}
                <Link className="llm-text-link" to={`${BASE_PATH}/traces`}>
                  Open live traces
                </Link>
              </Tab>
              <Tab label="History">
                <Timeline items={overview.activities} />
              </Tab>
              <Tab label="Peers">
                {peers.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="llm-member llm-peer-btn"
                    onClick={() => navigate(`${BASE_PATH}/models/${item.id}`)}
                  >
                    <strong>{item.name}</strong>
                    <span>{item.latency} · {item.success}%</span>
                  </button>
                ))}
              </Tab>
            </Tabs>
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
