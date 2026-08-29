import { useState } from 'react';
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
  Skeleton,
  Stat,
  Status,
  Tab,
  Tabs,
  Timeline,
} from '@poluru-labs/enterprise-design-system-react';
import { alerts, kpis, notifications, runs, scoreSeries, sparkPoints, timeline } from '../data';

export default function Overview({ onRun }) {
  const [range, setRange] = useState('week');
  const [refreshing, setRefreshing] = useState(false);
  const spark = sparkPoints(scoreSeries);
  const last = spark.split(' ').at(-1)?.split(',') || ['220', '8'];
  const live = runs.filter((item) => item.status === 'Running' || item.status === 'Needs review');

  function refresh() {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 420);
  }

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Workspace</span>
          <h1>Overview</h1>
          <p>FY26 Q3 · Meera Poluru · 6 live suites</p>
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
          <Button variant="secondary" size="sm" icon="refresh" onClick={refresh}>Refresh</Button>
          <Button icon="plus" onClick={onRun}>Run evaluation</Button>
        </div>
      </header>

      <Alert
        variant="warning"
        title="Lens Extractor is on watch"
        message="Invoice field accuracy is 87.4%. Madhav Poluru opened a review; hold new invoice traffic until PO recall recovers."
      />

      {refreshing ? (
        <section className="metrics" aria-label="Loading metrics">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} elevated>
              <Skeleton lines={3} />
            </Card>
          ))}
        </section>
      ) : (
        <section className="metrics" aria-label="Key metrics">
          {kpis.map((item) => (
            <Card key={item.label} elevated>
              <Stat label={item.label} value={item.value} hint={item.hint} trend={item.trend} trendValue={item.trendValue} />
            </Card>
          ))}
        </section>
      )}

      <div className="grid-2">
        <div className="stack">
          <Card header={<div><h2 className="h6 mb-0">Quality index</h2><p className="note">Weighted score · last 12 eval windows</p></div>}>
            <svg className="spark" viewBox="0 0 220 56" aria-hidden="true">
              <polyline points={spark} />
              <circle cx={last[0]} cy={last[1]} r="3.5" />
            </svg>
            <ProgressBar label="This week vs target 92" value={91.2} showValue />
            <Meter className="mt-3" label="Human agreement" value={88} showValue />
          </Card>
          <Card header="Needs attention">
            <div className="stack">
              {live.map((run) => (
                <a key={run.id} className="run-card" href={`#/run/${run.id}`}>
                  <strong>{run.name}</strong>
                  <span className="muted">{run.owner} · {run.suite} · {run.score}%</span>
                </a>
              ))}
            </div>
          </Card>
        </div>
        <div className="stack">
          <Card header="Eval coach">
            <Tabs className="prism-tabs">
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
          <Card header="Coverage">
            <div className="row" style={{ justifyContent: 'space-around', padding: '0.4rem 0' }}>
              <div style={{ textAlign: 'center' }}>
                <CircularProgress value={94} showValue />
                <div className="muted">Safety</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <CircularProgress value={88} showValue />
                <div className="muted">Grounding</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <CircularProgress value={91} showValue />
                <div className="muted">Accuracy</div>
              </div>
            </div>
            <Status label="Meera Poluru watching Lens" variant="warning" pulse />
          </Card>
        </div>
      </div>
    </>
  );
}
