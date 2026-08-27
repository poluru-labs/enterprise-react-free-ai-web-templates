import { Badge, Button, Card, Input, ProgressBar, Select } from '@poluru-labs/enterprise-design-system-react';

const models = [
  { name: 'Aurora Chat', owner: 'Subrahmanyam Poluru', provider: 'OpenAI', calls: '48.2K', latency: '820ms', success: 99.4, status: 'Healthy' },
  { name: 'Atlas Summarizer', owner: 'Kavya Poluru', provider: 'Anthropic', calls: '31.7K', latency: '1.2s', success: 98.8, status: 'Healthy' },
  { name: 'Lens Extractor', owner: 'Madhav Poluru', provider: 'Google', calls: '18.9K', latency: '640ms', success: 96.2, status: 'Watch' },
  { name: 'Nova Classifier', owner: 'Harini Poluru', provider: 'Azure', calls: '12.4K', latency: '410ms', success: 99.8, status: 'Healthy' },
];

const activities = [
  { title: 'Prompt version published', detail: 'Aurora Chat · v2.8', time: '4 min ago', icon: 'bi-upload', tone: 'pink' },
  { title: 'Latency threshold updated', detail: 'Atlas Summarizer · by Kavya Poluru', time: '22 min ago', icon: 'bi-sliders2', tone: 'blue' },
  { title: 'Evaluation completed', detail: 'Nova Classifier · 94.6% pass rate', time: '1 hr ago', icon: 'bi-check2-circle', tone: 'green' },
];

export default function OverviewPage({ query, setQuery, timeRange, setTimeRange }) {
  const filteredModels = models.filter((model) => model.name.toLowerCase().includes(query.toLowerCase()) || model.owner.toLowerCase().includes(query.toLowerCase()));

  return <>
    <div className="llm-toolbar">
      <Input aria-label="Search models" placeholder="Search models or owners" icon="search" value={query} onChange={(event) => setQuery(event.target.value)} />
      <Select aria-label="Time range" value={timeRange} onChange={(event) => setTimeRange(event.target.value)} options={[{ value: 'Last 24 hours', label: 'Last 24 hours' }, { value: 'Last 7 days', label: 'Last 7 days' }, { value: 'Last 30 days', label: 'Last 30 days' }]} />
      <Button variant="tertiary" icon="filter">Filters <span className="llm-filter-count">2</span></Button>
    </div>
    <section className="llm-kpi-grid" aria-label="Key metrics">
      <Card padded><div className="llm-kpi-top"><span className="llm-kpi-icon pink"><i className="bi bi-lightning-charge" /></span><Badge variant="success" soft>+12.4%</Badge></div><p className="llm-kpi-label">Total requests</p><strong className="llm-kpi-value">111.2K</strong><p className="llm-kpi-foot">vs. 98.9K last period</p></Card>
      <Card padded><div className="llm-kpi-top"><span className="llm-kpi-icon blue"><i className="bi bi-stopwatch" /></span><Badge variant="success" soft>-8.1%</Badge></div><p className="llm-kpi-label">Average latency</p><strong className="llm-kpi-value">684<span>ms</span></strong><p className="llm-kpi-foot">Across 4 active models</p></Card>
      <Card padded><div className="llm-kpi-top"><span className="llm-kpi-icon green"><i className="bi bi-check2-circle" /></span><Badge variant="success" soft>+0.6%</Badge></div><p className="llm-kpi-label">Success rate</p><strong className="llm-kpi-value">98.7<span>%</span></strong><p className="llm-kpi-foot">Target is above 98%</p></Card>
      <Card padded><div className="llm-kpi-top"><span className="llm-kpi-icon amber"><i className="bi bi-wallet2" /></span><Badge variant="warning" soft>+4.2%</Badge></div><p className="llm-kpi-label">Spend this period</p><strong className="llm-kpi-value">$2,418</strong><p className="llm-kpi-foot">$342 remaining budget</p></Card>
    </section>
    <div className="llm-content-grid">
      <Card padded={false}><div className="llm-card-heading"><div><h2>Model health</h2><p>Performance across production models</p></div><Button variant="tertiary" size="sm" iconTrailing="arrow-up-right">View details</Button></div><div className="llm-table-wrap"><table className="llm-table"><thead><tr><th>Model</th><th>Requests</th><th>Latency</th><th>Success rate</th><th>Status</th></tr></thead><tbody>{filteredModels.map((model) => <tr key={model.name}><td><div className="llm-model-cell"><span className="llm-model-icon"><i className="bi bi-cpu" /></span><div><strong>{model.name}</strong><small>{model.provider} · {model.owner}</small></div></div></td><td>{model.calls}</td><td>{model.latency}</td><td><div className="llm-progress-cell"><ProgressBar value={model.success} max={100} /><span>{model.success}%</span></div></td><td><Badge variant={model.status === 'Healthy' ? 'success' : 'warning'} soft>{model.status}</Badge></td></tr>)}</tbody></table></div></Card>
      <Card padded={false}><div className="llm-card-heading"><div><h2>Recent activity</h2><p>Latest workspace events</p></div><button className="llm-more-button" aria-label="More activity"><i className="bi bi-three-dots" /></button></div><div className="llm-activity-list">{activities.map((activity) => <div className="llm-activity" key={activity.title}><span className={`llm-activity-icon ${activity.tone}`}><i className={`bi ${activity.icon}`} /></span><div><strong>{activity.title}</strong><p>{activity.detail}</p></div><time>{activity.time}</time></div>)}</div><div className="llm-card-footer"><Button variant="tertiary" size="sm" iconTrailing="arrow-right">View all activity</Button></div></Card>
    </div>
  </>;
}