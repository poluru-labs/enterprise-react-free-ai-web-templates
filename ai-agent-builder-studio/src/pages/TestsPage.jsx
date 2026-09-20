import { useState } from 'react';
import {
  Badge,
  DateRangePicker,
  Pagination,
  ProgressBar,
} from '@poluru-labs/enterprise-design-system-react';
import tests from '../data/tests.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_VARIANT = {
  passing: 'success',
  failing: 'danger',
};

export default function TestsPage() {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  return (
    <div className="abs-page">
      <PageHeader
        title="Tests"
        description="Eval suites that gate rollouts. Scorecards owned by Jonah Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Tests' }]}
      />

      <div className="abs-filters">
        <DateRangePicker
          label="Run window"
          startValue={start}
          endValue={end}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
      </div>

      <div className="abs-table-wrap">
        <table className="abs-table">
          <thead>
            <tr>
              <th>Suite</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Pass rate</th>
              <th>Cases</th>
            </tr>
          </thead>
          <tbody>
            {tests.suites.map((suite) => (
              <tr key={suite.id}>
                <td>{suite.name}</td>
                <td>{suite.owner}</td>
                <td>
                  <Badge label={suite.status} variant={STATUS_VARIANT[suite.status]} soft pill size="sm" />
                </td>
                <td>
                  <ProgressBar value={suite.passRate} max={100} showValue />
                </td>
                <td>{suite.cases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageSize={4} total={tests.suites.length} onChange={setPage} />
    </div>
  );
}
