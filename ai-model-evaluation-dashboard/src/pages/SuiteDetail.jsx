import { useState } from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  DescriptionList,
  Link,
  ProgressBar,
  Rating,
  Status,
  Tab,
  Tabs,
  Tag,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { findSuite, runs, statusTone, timeline } from '../data';

export default function SuiteDetail({ routeId }) {
  const suite = findSuite(routeId);
  const [rating, setRating] = useState(suite.status === 'Live' ? 5 : 3);
  const related = runs.filter((item) => item.suite === suite.name).slice(0, 4);

  return (
    <>
      <Breadcrumb items={[{ label: 'Suites', href: '#/suites' }, { label: suite.name }]} />
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Suite</span>
          <h1>{suite.name}</h1>
          <p>{suite.owner} · {suite.model} · {suite.cases} cases</p>
        </div>
        <div className="row">
          <Status label={suite.status} variant={statusTone(suite.status)} pulse={suite.status === 'Watch'} />
          <Badge label={`${suite.pass}%`} variant="brand" pill />
        </div>
      </header>
      <div className="grid-2">
        <div className="stack">
          <Card header="Coverage">
            <div className="row" style={{ alignItems: 'center' }}>
              <CircularProgress value={suite.pass} showValue />
              <ProgressBar label="Pass rate" value={suite.pass} showValue />
            </div>
            <DescriptionList
              compact
              items={[
                { term: 'Owner', description: suite.owner },
                { term: 'Model', description: suite.model },
                { term: 'Cases', description: String(suite.cases) },
                { term: 'Status', description: suite.status },
              ]}
            />
            <div className="row" style={{ marginTop: '0.85rem' }}>
              <span className="muted">Judge confidence</span>
              <Rating value={rating} onChange={setRating} />
            </div>
            <ButtonGroup size="sm" className="mt-3">
              <Button variant="secondary" icon="refresh" onClick={() => showToast({ title: 'Re-score queued', description: `${suite.name} is back with ${suite.owner}.`, variant: 'info' })}>Re-score</Button>
              <Button variant="tertiary" icon="star" onClick={() => showToast({ title: 'Promoted', description: `${suite.name} stays live for ${suite.owner}.`, variant: 'success' })}>Promote</Button>
            </ButtonGroup>
          </Card>
          <Card header="Linked runs">
            {related.map((item) => (
              <a key={item.id} className="member" href={`#/run/${item.id}`}>
                <strong>{item.name}</strong>
                <span className="muted">{item.score}% · {item.status}</span>
              </a>
            ))}
            <Link href="#/runs">Open all runs</Link>
          </Card>
        </div>
        <Card header="Workspace">
          <Tabs className="prism-tabs">
            <Tab label="History">
              <Timeline items={timeline} />
            </Tab>
            <Tab label="Rubric">
              <p className="note">Safety, groundedness, and field accuracy gates owned by {suite.owner}.</p>
              <div style={{ marginTop: '0.55rem' }}>
                <Tag label={suite.model} variant="brand" />
              </div>
            </Tab>
          </Tabs>
        </Card>
      </div>
    </>
  );
}
