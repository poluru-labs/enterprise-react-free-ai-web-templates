import { useState } from 'react';
import { Button, ButtonGroup, Rating, Timeline, TreeView, showToast } from '@poluru-labs/enterprise-design-system-react';
import { useNavigate, useParams } from 'react-router-dom';
import suitesData from '../data/suites.json';
import runsData from '../data/runs.json';
import overview from '../data/overview.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber, formatPercent } from '../lib/format.js';
import { ChartSection, DataTable, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function SuiteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const suite = suitesData.suites.find((item) => item.id === id) || suitesData.suites[0];
  const [rating, setRating] = useState(suite.status === 'Live' ? 5 : 3);
  const related = runsData.runs.filter((item) => item.suite === suite.name);

  return (
    <div className="prism-page">
      <PageHeader
        title={suite.name}
        description={`${suite.owner} · ${suite.model} · ${formatNumber(suite.cases)} cases`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Suites', to: `${BASE_PATH}/suites` }, { label: suite.name }]}
        actions={
          <>
            <StatusBadge status={suite.status} pulse={suite.status === 'Watch'} />
            <ButtonGroup size="sm">
              <Button
                variant="secondary"
                icon="refresh"
                onClick={() =>
                  showToast({
                    title: 'Re-score queued',
                    description: `${suite.name} is back with ${suite.owner}.`,
                    variant: 'info',
                  })
                }
              >
                Re-score
              </Button>
              <Button
                icon="star"
                onClick={() =>
                  showToast({
                    title: 'Promoted',
                    description: `${suite.name} stays live for ${suite.owner}.`,
                    variant: 'success',
                  })
                }
              >
                Promote
              </Button>
            </ButtonGroup>
          </>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-4">
          <article className="prism-stat-card">
            <p className="prism-stat-label">Cases</p>
            <p className="prism-stat-value">{formatNumber(suite.cases)}</p>
            <p className="prism-stat-hint">{suite.dataset}</p>
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="prism-stat-card">
            <p className="prism-stat-label">Pass rate</p>
            <p className="prism-stat-value">{formatPercent(suite.pass)}</p>
            <p className="prism-stat-hint">{suite.model}</p>
          </article>
        </div>
        <div className="col-12 col-md-4">
          <article className="prism-stat-card">
            <p className="prism-stat-label">Owner</p>
            <p className="prism-stat-value" style={{ fontSize: '1.15rem' }}>{suite.owner}</p>
            <div className="prism-stat-foot">
              <span className="prism-stat-hint">Judge confidence</span>
              <Rating value={rating} onChange={setRating} />
            </div>
          </article>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Linked runs" subtitle="Scorecards for this pack">
            <DataTable
              rows={related}
              onRowClick={(row) => navigate(`${BASE_PATH}/runs/${row.id}`)}
              columns={[
                { key: 'name', label: 'Run', className: 'prism-mono' },
                { key: 'owner', label: 'Owner' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
                { key: 'score', label: 'Score' },
                { key: 'when', label: 'When' },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Dataset tree" subtitle="Train and holdout stay split">
            <TreeView items={suitesData.datasetTree} />
            <p className="prism-note">{suite.note}</p>
          </ChartSection>
        </div>
      </div>

      <ChartSection title="History" subtitle="Workspace motion around this suite">
        <Timeline items={overview.timeline} />
      </ChartSection>
    </div>
  );
}
