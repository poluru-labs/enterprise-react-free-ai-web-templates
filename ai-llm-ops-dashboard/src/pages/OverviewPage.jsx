import { Link } from 'react-router-dom';
import {
  Alert,
  Badge,
  Button,
  Card,
  CircularProgress,
  ProgressBar,
  Search,
  SegmentedControl,
  Stat,
  Status,
  Tab,
  Tabs,
  Timeline,
  Toolbar,
} from '@poluru-labs/enterprise-design-system-react';
import { activities, incidents, models, statusVariant } from '../data';

export default function OverviewPage({ query, setQuery, timeRange, setTimeRange, onOpenTraces }) {
  const filtered = models.filter((model) => `${model.name} ${model.owner}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <Toolbar
        bordered
        className="llm-eds-toolbar"
        start={<Search value={query} placeholder="Search models or owners" onChange={(_, value) => setQuery(value)} />}
        end={(
          <SegmentedControl
            value={timeRange}
            onChange={setTimeRange}
            options={[
              { value: '24h', label: '24h' },
              { value: '7d', label: '7d' },
              { value: '30d', label: '30d' },
            ]}
          />
        )}
      />
      <div className="llm-alert">
        <Alert
          variant="warning"
          title="Lens Extractor is on watch"
          message="p95 is 2.4s. Madhav Poluru opened a review; hold new invoice traffic until groundedness recovers."
        />
      </div>
      <section className="llm-kpi-grid" aria-label="Key metrics">
        <Card padded><Stat label="Total requests" value="111.2K" hint="vs 98.9K last period" trend="up" trendValue="+12.4%" /></Card>
        <Card padded><Stat label="Average latency" value="684ms" hint="Across 4 active models" trend="down" trendValue="-8.1%" /></Card>
        <Card padded><Stat label="Success rate" value="98.7%" hint="Target is above 98%" trend="up" trendValue="+0.6%" /></Card>
        <Card padded>
          <div className="llm-slo-row">
            <CircularProgress value={87} showValue />
            <Stat label="Budget used" value="87%" hint="$342 remaining" trend="up" trendValue="+4.2%" />
          </div>
        </Card>
      </section>
      <div className="llm-content-grid">
        <Card padded={false}>
          <div className="llm-card-heading">
            <div>
              <h2>Model health</h2>
              <p>Performance across production models</p>
            </div>
            <Button variant="tertiary" size="sm" iconTrailing="external-link" onClick={onOpenTraces}>View traces</Button>
          </div>
          <div className="llm-table-wrap">
            <table className="llm-table">
              <thead>
                <tr><th>Model</th><th>Requests</th><th>Latency</th><th>Success</th><th>Status</th></tr>
              </thead>
              <tbody>
                {filtered.map((model) => (
                  <tr key={model.id}>
                    <td>
                      <Link className="llm-model-cell" to={`/models/${model.id}`}>
                        <span className="llm-model-icon"><i className="bi bi-cpu" /></span>
                        <div>
                          <strong>{model.name}</strong>
                          <small>{model.provider} · {model.owner}</small>
                        </div>
                      </Link>
                    </td>
                    <td>{model.calls}</td>
                    <td>{model.latency}</td>
                    <td>
                      <div className="llm-progress-cell">
                        <ProgressBar value={model.success} max={100} />
                        <span>{model.success}%</span>
                      </div>
                    </td>
                    <td><Status label={model.status} variant={statusVariant(model.status)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card padded={false}>
          <div className="llm-card-heading">
            <div>
              <h2>Ops feed</h2>
              <p>Latest workspace events</p>
            </div>
          </div>
          <div style={{ padding: '8px 22px 18px' }}>
            <Tabs className="llm-tabs">
              <Tab label="Activity"><Timeline items={activities} /></Tab>
              <Tab label="Incidents">
                {incidents.map((item) => (
                  <div key={item.id} className="llm-member">
                    <div>
                      <strong>{item.title}</strong>
                      <div className="llm-muted">{item.owner} · {item.since}</div>
                    </div>
                    <Badge variant={item.severity === 'Watch' ? 'warning' : 'success'} soft>{item.severity}</Badge>
                  </div>
                ))}
              </Tab>
            </Tabs>
          </div>
        </Card>
      </div>
    </>
  );
}
