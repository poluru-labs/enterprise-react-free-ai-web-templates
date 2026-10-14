import { useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  DateRangePicker,
  Modal,
  Pagination,
  ProgressBar,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import accuracy from '../data/accuracy.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_VARIANT = {
  passing: 'success',
  failing: 'danger',
};

export default function AccuracyPage() {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [open, setOpen] = useState(false);

  return (
    <div className="fpl-page">
      <PageHeader
        title="Accuracy"
        description="MAPE, bias, and backtests. Scorecards owned by Elena Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Accuracy' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Run backtest
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="DC MAPE below target"
        message="Replen models at 78.8% pass rate. Marcus Poluru scheduled a rebaseline this week."
      />

      <div className="fpl-filters">
        <DateRangePicker
          label="Backtest window"
          startValue={start}
          endValue={end}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
      </div>

      <div className="fpl-table-wrap">
        <table className="fpl-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Pass rate</th>
              <th>SKUs</th>
            </tr>
          </thead>
          <tbody>
            {accuracy.metrics.map((row) => (
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

      <Pagination page={page} pageSize={4} total={accuracy.metrics.length} onChange={setPage} />

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Run rolling backtest"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                showToast({ title: 'Backtest queued', variant: 'success' });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="fpl-copy">12-week holdout on all published horizons. Results notify Elena Poluru.</p>
      </Modal>
    </div>
  );
}
