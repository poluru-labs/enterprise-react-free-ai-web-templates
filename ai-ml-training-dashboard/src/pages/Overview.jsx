import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  Card,
  CircularProgress,
  List,
  Meter,
  ProgressBar,
  SegmentedControl,
  Stat,
  Status,
  Tab,
  Tabs,
  Timeline,
} from '@poluru-labs/enterprise-design-system-react';
import { useState } from 'react';
import { alerts, kpis, lossSeries, notifications, runs, sparkPoints, timeline } from '../data';

export default function Overview({ onLaunch }) {
  const [range, setRange] = useState('day');
  const spark = sparkPoints(lossSeries);
  const live = runs.filter((item) => item.status === 'Running');

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Workspace</span>
          <h1>Overview</h1>
          <p>FY26 Q3 · Kavya Poluru · 18 live jobs</p>
        </div>
        <div className="row">
          <SegmentedControl
            value={range}
            onChange={setRange}
            options={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
            ]}
          />
          <Button icon="plus" onClick={onLaunch}>Launch run</Button>
        </div>
      </header>

      <Alert
        variant="warning"
        title="eu-west-1 is hot"
        message="H100 wait is 11 minutes. Keep Harbor in the queue and delay nimbus-ranker-12 if Kavya Poluru needs a second replica."
      />

      <section className="metrics">
        {kpis.map((item) => (
          <Card key={item.label} elevated>
            <Stat label={item.label} value={item.value} hint={item.hint} trend={item.trend} trendValue={item.trendValue} />
          </Card>
        ))}
      </section>

      <div className="grid-2">
        <div className="stack">
          <Card header={<div><h2 className="h6 mb-0">Loss curve</h2><p className="note">harbor-encoder-v3 · last 12 epochs</p></div>}>
            <svg className="spark" viewBox="0 0 220 56" aria-hidden="true">
              <polyline points={spark} />
              <circle cx="220" cy="52" r="3.5" />
            </svg>
            <ProgressBar label="Epoch 12 / 20" value={60} showValue />
            <Meter className="mt-3" label="GPU util" value={86} showValue />
          </Card>
          <Card header="Live runs">
            <div className="stack">
              {live.map((run) => (
                <a key={run.id} className="run-card" href={`#/run/${run.id}`}>
                  <strong>{run.name}</strong>
                  <span className="muted">{run.owner} · {run.gpu} · {run.eta}</span>
                </a>
              ))}
            </div>
          </Card>
        </div>
        <div className="stack">
          <Card header="Training coach">
            <Tabs className="forge-tabs">
              <Tab label="Alerts">
                <Accordion>
                  {alerts.map((item) => (
                    <AccordionItem key={item.heading} heading={item.heading}>{item.children}</AccordionItem>
                  ))}
                </Accordion>
              </Tab>
              <Tab label="Motion">
                <Timeline items={timeline} />
              </Tab>
              <Tab label="Inbox">
                <List items={notifications} divided />
              </Tab>
            </Tabs>
          </Card>
          <Card header="Cluster heat">
            <div className="row" style={{ justifyContent: 'space-around', padding: '0.4rem 0' }}>
              <div style={{ textAlign: 'center' }}>
                <CircularProgress value={94} showValue />
                <div className="muted">eu-west-1</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <CircularProgress value={82} showValue />
                <div className="muted">us-east-1</div>
              </div>
            </div>
            <Status label="Luca Poluru watching H100s" variant="warning" pulse />
          </Card>
        </div>
      </div>
    </>
  );
}
