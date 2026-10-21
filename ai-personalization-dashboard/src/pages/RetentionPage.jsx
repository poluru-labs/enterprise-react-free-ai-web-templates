import {
  Card,
  DescriptionList,
  ProgressBar,
  SegmentedControl,
  Stat,
  Tabs,
  Tab,
  Tag,
} from '@poluru-labs/enterprise-design-system-react';
import { useState } from 'react';
import retention from '../data/retention.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCompact, formatPercent } from '../lib/format.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function RetentionPage() {
  const [horizon, setHorizon] = useState('paid');

  return (
    <div className="per-page">
      <PageHeader
        title="Retention"
        description="Cohort curves, churn bands, and save plays. Elena Poluru leads the monthly review."
        crumbs={[BREADCRUMB_ROOT, { label: 'Retention' }]}
      />

      <div className="per-toolbar-row">
        <SegmentedControl
          value={horizon}
          onChange={setHorizon}
          options={[
            { label: 'Paid cohort', value: 'paid' },
            { label: 'Trial cohort', value: 'trial' },
            { label: 'Enterprise', value: 'enterprise' },
          ]}
        />
      </div>

      <div className="per-stat-grid per-stat-grid-3">
        <Stat label="90-day retention" value="71%" hint="Paid cohort" trend="up" trendValue="+2.1%" />
        <Stat label="At-risk users" value="26.4K" hint="High + medium band" trend="down" trendValue="-3%" />
        <Stat label="Save play lift" value="11.9%" hint="Weighted avg" trend="up" trendValue="+1.2%" />
      </div>

      <div className="per-split">
        <section className="per-panel">
          <h2>Cohort curve</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Retention">
              <div className="per-meter-list">
                {retention.cohorts.map((row) => (
                  <div key={row.label} className="per-meter-row">
                    <div className="per-meter-label">
                      <span>{row.label}</span>
                      <strong>{formatPercent(row.retained, 0)}</strong>
                    </div>
                    <ProgressBar value={row.retained} max={100} />
                  </div>
                ))}
              </div>
            </Tab>
            <Tab label="Risk bands">
              <DescriptionList
                items={retention.riskBands.map((row) => ({
                  term: `${row.band} risk`,
                  description: `${formatCompact(row.users)} users (${row.share}%)`,
                }))}
              />
            </Tab>
          </Tabs>
        </section>

        <section className="per-panel">
          <h2>Save plays</h2>
          <div className="per-play-list">
            {retention.plays.map((play) => (
              <Card key={play.id} padded>
                <Tag label={play.segment} variant="neutral" soft size="sm" />
                <p className="per-play-name">{play.name}</p>
                <p className="per-copy">
                  {formatPercent(play.lift)} lift · {play.owner}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
