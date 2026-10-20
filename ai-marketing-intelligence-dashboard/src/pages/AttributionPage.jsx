import { useState } from 'react';
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
import attribution from '../data/attribution.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency, formatNumber } from '../lib/format.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function AttributionPage() {
  const [model, setModel] = useState('data');
  const active = attribution.models.find((item) => item.id === model) ?? attribution.models[2];

  return (
    <div className="mid-page">
      <PageHeader
        title="Attribution"
        description="Compare credit models and top paths. Rahul Poluru publishes the weekly attribution memo."
        crumbs={[BREADCRUMB_ROOT, { label: 'Attribution' }]}
      />

      <div className="mid-toolbar-row">
        <SegmentedControl
          value={model}
          onChange={setModel}
          options={[
            { label: 'First touch', value: 'first' },
            { label: 'Linear', value: 'linear' },
            { label: 'Data-driven', value: 'data' },
          ]}
        />
      </div>

      <div className="mid-stat-grid mid-stat-grid-3">
        <Stat label="Conversions" value={formatNumber(active.conversions)} hint={active.name} />
        <Stat label="CPA" value={formatCurrency(active.cpa)} hint="Blended paid + lifecycle" />
        <Stat
          label="Credit assigned"
          value={`${active.credit}%`}
          hint="Model coverage"
          trend="up"
          trendValue="+4%"
        />
      </div>

      <div className="mid-split">
        <section className="mid-panel">
          <h2>Touchpoint share</h2>
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Credit">
              <div className="mid-channel-list">
                {attribution.touchpoints.map((row) => (
                  <div key={row.channel} className="mid-channel-row">
                    <div className="mid-channel-label">
                      <span>{row.channel}</span>
                      <strong>{row.share}%</strong>
                    </div>
                    <ProgressBar value={row.share} max={40} />
                  </div>
                ))}
              </div>
            </Tab>
            <Tab label="Assisted">
              <DescriptionList
                items={attribution.touchpoints.map((row) => ({
                  term: row.channel,
                  description: `${row.assisted}% assisted conversions`,
                }))}
              />
            </Tab>
          </Tabs>
        </section>

        <section className="mid-panel">
          <h2>Top paths</h2>
          <div className="mid-path-list">
            {attribution.paths.map((path) => (
              <Card key={path.id} padded>
                <Tag label={`${path.avgDays}d avg`} variant="neutral" soft size="sm" />
                <p className="mid-path-journey">{path.journey}</p>
                <p className="mid-copy">
                  {formatNumber(path.conversions)} conversions · {path.owner}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
