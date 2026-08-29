import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  DescriptionList,
  Meter,
  ProgressBar,
  Rating,
  Status,
  Tab,
  Tabs,
  Tag,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { activities, findModel, models, statusVariant, traces } from '../data';

export default function ModelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const model = findModel(id);
  const [rating, setRating] = useState(model.status === 'Production' ? 5 : 3);
  const related = traces.filter((item) => item.model === model.name).slice(0, 4);
  const peers = models.filter((item) => item.id !== model.id).slice(0, 3);

  useEffect(() => {
    setRating(model.status === 'Production' ? 5 : 3);
  }, [model.id, model.status]);

  return (
    <>
      <div
        onClick={(event) => {
          const link = event.target.closest('a[href="/models"]');
          if (link) {
            event.preventDefault();
            navigate('/models');
          }
        }}
      >
        <Breadcrumb items={[{ label: 'Models', href: '/models' }, { label: model.name }]} />
      </div>
      <div className="llm-content-grid" style={{ marginTop: 16 }}>
        <div className="stack-gap">
          <Card header={model.name}>
            <Status label={model.status} variant={statusVariant(model.status)} />
            <DescriptionList
              items={[
                { term: 'Owner', description: model.owner },
                { term: 'Provider', description: model.provider },
                { term: 'Version', description: model.version },
                { term: 'Latency', description: model.latency },
                { term: 'Spend', description: model.spend },
              ]}
            />
            <div className="llm-slo-row" style={{ marginTop: 16 }}>
              <CircularProgress value={model.success} showValue />
              <div className="llm-progress-cell">
                <ProgressBar label="Success" value={model.success} showValue />
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <span className="llm-muted">Quality rating</span>
              <Rating value={rating} onChange={setRating} />
            </div>
            <ButtonGroup size="sm" className="mt-3">
              <Button variant="secondary" icon="refresh" onClick={() => showToast({ title: 'Rolled back', description: `${model.name} stays on ${model.version}.`, variant: 'info' })}>Rollback</Button>
              <Button variant="tertiary" icon="star" onClick={() => showToast({ title: 'Eval queued', description: `Harini Poluru will score ${model.name}.`, variant: 'success' })}>Score</Button>
            </ButtonGroup>
          </Card>
          <Card header="Peers">
            {peers.map((item) => (
              <Link key={item.id} className="llm-member llm-model-cell" to={`/models/${item.id}`}>
                <strong>{item.name}</strong>
                <span>{item.latency} · {item.success}%</span>
              </Link>
            ))}
          </Card>
        </div>
        <Card padded={false}>
          <div className="llm-card-heading">
            <div>
              <h2>Workspace</h2>
              <p>Traces, evals, and recent motion</p>
            </div>
            <Tag label={model.provider} variant="brand" />
          </div>
          <div style={{ padding: '8px 22px 22px' }}>
            <Tabs className="llm-tabs">
              <Tab label="Traces">
                {related.map((item) => (
                  <div key={item.id} className="llm-member">
                    <strong>{item.id}</strong>
                    <span>{item.user} · {item.latency}ms</span>
                  </div>
                ))}
                <Link to="/traces">Open live traces</Link>
              </Tab>
              <Tab label="History">
                <Timeline items={activities} />
              </Tab>
              <Tab label="Serving">
                <p className="note">Endpoint {model.id}-prod is healthy in us-east-1. Owned by {model.owner}.</p>
                <Meter className="mt-3" label="Budget share" value={Number.parseInt(model.spend.replace(/\D/g, ''), 10) / 30} max={100} showValue />
              </Tab>
            </Tabs>
          </div>
        </Card>
      </div>
    </>
  );
}
