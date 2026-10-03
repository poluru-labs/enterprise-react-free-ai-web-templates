import { useState } from 'react';
import {
  Badge,
  DateRangePicker,
  Pagination,
  ProgressBar,
} from '@poluru-labs/enterprise-design-system-react';
import validate from '../data/validate.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_VARIANT = {
  passing: 'success',
  failing: 'danger',
};

export default function ValidatePage() {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  return (
    <div className="dpd-page">
      <PageHeader
        title="Validate"
        description="Rules, totals, and SLA. Scorecards owned by Jonah Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Validate' }]}
      />

      <div className="dpd-filters">
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

      <div className="dpd-table-wrap">
        <table className="dpd-table">
          <thead>
            <tr>
              <th>Rule</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Pass rate</th>
              <th>Cases</th>
            </tr>
          </thead>
          <tbody>
            {validate.rules.map((rule) => (
              <tr key={rule.id}>
                <td>{rule.name}</td>
                <td>{rule.owner}</td>
                <td>
                  <Badge label={rule.status} variant={STATUS_VARIANT[rule.status]} soft pill size="sm" />
                </td>
                <td>
                  <ProgressBar value={rule.passRate} max={100} showValue />
                </td>
                <td>{rule.cases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageSize={4} total={validate.rules.length} onChange={setPage} />
    </div>
  );
}
