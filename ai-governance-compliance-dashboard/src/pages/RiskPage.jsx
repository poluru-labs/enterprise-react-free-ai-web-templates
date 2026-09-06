import { useState } from 'react';
import {
  Alert,
  ButtonGroup,
  Button,
  CircularProgress,
  Meter,
  Popover,
  Tooltip,
} from '@poluru-labs/enterprise-design-system-react';
import risk from '../data/risk.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { BarChart } from '../components/charts/BarChart.jsx';
import { DonutChart } from '../components/charts/DonutChart.jsx';
import {
  ChartSection,
  DataTable,
  PageHeader,
  SeverityBadge,
} from '../components/widgets/index.js';

export default function RiskPage() {
  const [band, setBand] = useState('all');
  const [legendOpen, setLegendOpen] = useState(false);
  const rows = band === 'all' ? risk.heatmap : risk.heatmap.filter((item) => item.risk.toLowerCase() === band);

  return (
    <div className="gov-page">
      <PageHeader
        title="Risk register"
        description="Residual risk by impact and likelihood. Scores are mock fixtures."
        crumbs={[BREADCRUMB_ROOT, { label: 'Risk' }]}
        actions={
          <Popover
            open={legendOpen}
            onOpenChange={setLegendOpen}
            trigger={<Button variant="secondary" size="sm">Legend</Button>}
            heading="Risk bands"
          >
            <p className="gov-note">Critical 80–100 · High 60–79 · Medium 30–59 · Low 0–29</p>
          </Popover>
        }
      />

      <Alert
        variant="warning"
        title="Two systems above High"
        message="Quill Copilot and Harbor Vision still sit above the residual-risk threshold."
        dismissible
      />

      <div className="row g-3 mb-3 mt-1">
        {risk.bands.map((item) => (
          <div className="col-6 col-xl-3" key={item.level}>
            <article className="gov-tile">
              <header>
                <h3>{item.level}</h3>
                <Tooltip content={`${item.count} systems in this band`}>
                  <span>
                    <CircularProgress value={item.score} max={100} showValue size={44} />
                  </span>
                </Tooltip>
              </header>
              <Meter value={item.score} max={100} label="Band score" showValue />
              <footer>
                <span className="gov-subtle">{item.count} systems</span>
                <SeverityBadge severity={item.level} />
              </footer>
            </article>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <ButtonGroup size="sm">
          <Button variant={band === 'all' ? 'primary' : 'secondary'} onClick={() => setBand('all')}>All</Button>
          <Button variant={band === 'critical' ? 'primary' : 'secondary'} onClick={() => setBand('critical')}>Critical</Button>
          <Button variant={band === 'high' ? 'primary' : 'secondary'} onClick={() => setBand('high')}>High</Button>
          <Button variant={band === 'medium' ? 'primary' : 'secondary'} onClick={() => setBand('medium')}>Medium</Button>
          <Button variant={band === 'low' ? 'primary' : 'secondary'} onClick={() => setBand('low')}>Low</Button>
        </ButtonGroup>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Heatmap" subtitle="Impact × likelihood for each registered system">
            <DataTable
              rows={rows}
              columns={[
                { key: 'name', label: 'System' },
                { key: 'owner', label: 'Owner' },
                { key: 'impact', label: 'Impact' },
                { key: 'likelihood', label: 'Likelihood' },
                {
                  key: 'risk',
                  label: 'Band',
                  render: (value) => <SeverityBadge severity={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Risk factors" subtitle="Average contribution across the register">
            <BarChart items={risk.factors} unit="" />
            <div className="mt-4">
              <DonutChart
                items={risk.bands.map((item) => ({ name: item.level, value: item.count, color: item.color }))}
                centerLabel="Systems"
                centerValue="6"
              />
            </div>
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
