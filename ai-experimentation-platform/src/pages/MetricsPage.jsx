import { useState } from 'react';
import {
  Alert,
  Badge,
  DateRangePicker,
  Pagination,
  ProgressBar,
} from '@poluru-labs/enterprise-design-system-react';
import metrics from '../data/metrics.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_VARIANT = {
  passing: 'success',
  failing: 'danger',
};

export default function MetricsPage() {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  return (
    <div className="lex-page">
      <PageHeader
        title="Metrics"
        description="Primary KPIs and guardrails. Scorecards owned by Elena Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Metrics' }]}
      />

      <Alert
        variant="warning"
        title="Guardrail breach"
        message="p95 latency failed on ranker canary. Experiment auto-paused pending Jonah Poluru review."
      />

      <div className="lex-filters">
        <DateRangePicker
          label="Analysis window"
          startValue={start}
          endValue={end}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
      </div>

      <div className="lex-table-wrap">
        <table className="lex-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Pass rate</th>
              <th>Observations</th>
            </tr>
          </thead>
          <tbody>
            {metrics.metrics.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.status} variant={STATUS_VARIANT[row.status]} soft pill size="sm" />
                </td>
                <td>
                  <ProgressBar value={row.passRate} max={100} showValue />
                </td>
                <td>{row.cases.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageSize={4} total={metrics.metrics.length} onChange={setPage} />
    </div>
  );
}
