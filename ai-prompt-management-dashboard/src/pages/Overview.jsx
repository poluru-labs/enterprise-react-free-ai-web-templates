import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  DataTable,
  DescriptionList,
  Divider,
  List,
  Meter,
  ProgressBar,
  Rating,
  SegmentedControl,
  Stat,
  Status,
  Tab,
  Tabs,
  Tag,
  Timeline,
} from '@poluru-labs/enterprise-design-system-react';
import { activity, hourly, kpis, owners, prompts, sla, statusVariant } from '../data';

export default function Overview() {
  const [period, setPeriod] = useState('week');
  const [tab, setTab] = useState(0);

  return (
    <>
      <section className="page-head">
        <div>
          <Breadcrumb items={[{ label: 'Prompt Bureau', href: '#/overview' }, { label: 'Overview' }]} />
          <p className="eyebrow">Prompt operations</p>
          <h1>Library health</h1>
          <p className="summary">Version, evaluate, and release enterprise prompts so copilots stay cited and on-brand.</p>
        </div>
        <div className="head-actions">
          <SegmentedControl
            size="sm"
            value={period}
            onChange={setPeriod}
            options={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
            ]}
          />
          <ButtonGroup size="sm">
            <Button variant="secondary" icon="refresh">Refresh</Button>
            <Button icon="plus" onClick={() => window.dispatchEvent(new Event('bureau:create'))}>New prompt</Button>
          </ButtonGroup>
        </div>
      </section>

      <Alert
        variant="warning"
        title="Legal summarizer is pending review"
        message="Venkata Poluru held v4 until contract ACLs are signed. Retrieval stays paused for that family."
      />

      <section className="grid-4" style={{ marginTop: '1rem' }}>
        {kpis.map((item) => (
          <Card key={item.label} elevated>
            <Stat label={item.label} value={item.value} hint={`${item.hint} · ${period}`} trend={item.trend} trendValue={item.trendValue} />
          </Card>
        ))}
      </section>

      <section className="split" style={{ marginTop: '0.9rem' }}>
        <Card elevated>
          <div className="card-body">
            <div className="section-head">
              <div>
                <p className="eyebrow">Volume</p>
                <h2>Playground runs</h2>
              </div>
              <Badge label="Today" variant="brand" soft pill />
            </div>
            <div className="hours">
              {hourly.map((item) => (
                <div className="hour" key={item.hour}>
                  <div className="hour-bar"><i style={{ height: `${item.value}%` }} /></div>
                  <small>{item.hour}</small>
                </div>
              ))}
            </div>
            <Divider spacing="md" />
            <div className="meter-row">
              <span><span>Weekly target 2,000</span><strong>93%</strong></span>
              <ProgressBar value={93} max={100} label="Weekly target" showValue />
            </div>
            <div className="meter-row">
              <span><span>Eval coverage</span><strong>92 of 100</strong></span>
              <Meter value={92} max={100} label="Eval coverage" showValue optimum={100} high={90} low={50} />
            </div>
          </div>
        </Card>

        <Card elevated>
          <div className="card-body">
            <div className="section-head">
              <div>
                <p className="eyebrow">Coach</p>
                <h2>Prompt health</h2>
              </div>
              <CircularProgress value={94.2} max={100} size={64} showValue />
            </div>
            <Tabs selectedIndex={tab} onChange={setTab}>
              <Tab label="Alerts">Open review holds and failed evals.</Tab>
              <Tab label="Motion">Recent publish and canary events.</Tab>
              <Tab label="Inbox">Mentions for Sravani Poluru.</Tab>
            </Tabs>
            {tab === 0 ? (
              <Accordion>
                <AccordionItem heading="Legal summarizer pending access review" defaultOpen>
                  Venkata Poluru flagged 412 contracts that still lack a collection ACL.
                </AccordionItem>
                <AccordionItem heading="RAG citation drifted overnight">
                  Meera Poluru’s eval set dropped 2.1 pts after the help-center crawl.
                </AccordionItem>
                <AccordionItem heading="Safety canary at 10%">
                  Arjun Poluru started a refusal-pack canary on production traffic.
                </AccordionItem>
              </Accordion>
            ) : tab === 1 ? (
              <Timeline
                items={activity.map((entry, index) => ({
                  title: entry.title,
                  description: entry.detail,
                  timestamp: entry.time,
                  status: index === 0 ? 'current' : index < 3 ? 'complete' : 'upcoming',
                }))}
              />
            ) : (
              <List items={activity.map((entry) => ({ label: entry.title, description: entry.detail }))} divided />
            )}
          </div>
        </Card>
      </section>

      <section className="split" style={{ marginTop: '0.9rem' }}>
        <Card elevated>
          <div className="card-body">
            <div className="section-head">
              <div>
                <p className="eyebrow">Catalog</p>
                <h2>Live prompts</h2>
              </div>
              <Tag label="8 families" variant="brand" />
            </div>
            <div className="table-wrap">
              <DataTable
                striped
                compact
                columns={[
                  { key: 'name', label: 'Prompt', sortable: true },
                  { key: 'owner', label: 'Owner', sortable: true },
                  { key: 'version', label: 'Version' },
                  { key: 'score', label: 'Score', sortable: true },
                  { key: 'status', label: 'Status' },
                ]}
                rows={prompts.slice(0, 5).map((item) => ({
                  name: item.name,
                  owner: item.owner,
                  version: item.version,
                  score: item.score,
                  status: item.status,
                }))}
              />
            </div>
          </div>
        </Card>

        <Card elevated>
          <div className="card-body">
            <div className="section-head">
              <div>
                <p className="eyebrow">Quality</p>
                <h2>Grounding rating</h2>
              </div>
              <Status label="Stable" variant="success" pulse />
            </div>
            <Rating value={4.5} allowHalf readonly size="lg" />
            <p className="meta">Scored on Sravani Poluru’s eval set.</p>
            <Divider spacing="md" label="Workspace" />
            <DescriptionList
              compact
              items={[
                { term: 'Workspace', description: 'FY26 Q3 · Knowledge' },
                { term: 'Prompt lead', description: 'Sravani Poluru' },
                { term: 'Default model', description: 'gpt-4.1' },
                { term: 'Citation required', description: 'On for Knowledge' },
              ]}
            />
          </div>
        </Card>
      </section>

      <section className="grid-3" style={{ marginTop: '0.9rem' }}>
        <Card elevated>
          <div className="card-body">
            <p className="eyebrow">Owners</p>
            <h2>Editor load</h2>
            {owners.map((person) => (
              <div className="owner-row" key={person.name}>
                <span><span>{person.name}</span><strong>{person.load}%</strong></span>
                <ProgressBar value={person.load} max={100} label={person.focus} />
              </div>
            ))}
          </div>
        </Card>
        <Card elevated>
          <div className="card-body">
            <p className="eyebrow">SLA</p>
            <h2>Release freshness</h2>
            {sla.map((item) => (
              <div className="meter-row" key={item.label}>
                <span><span>{item.label}</span><strong>{item.value}</strong></span>
                <Meter value={item.value} max={100} label={item.label} showValue optimum={100} high={90} low={50} />
              </div>
            ))}
          </div>
        </Card>
        <Card elevated>
          <div className="card-body">
            <p className="eyebrow">Live</p>
            <h2>Prompt updates</h2>
            {activity.map((entry) => (
              <div className="query-hit" key={entry.title}>
                <div>
                  <strong>{entry.title}</strong>
                  <p className="meta">{entry.detail}</p>
                </div>
                <Status label={entry.status} variant={statusVariant(entry.status)} />
              </div>
            ))}
          </div>
        </Card>
      </section>
    </>
  );
}
