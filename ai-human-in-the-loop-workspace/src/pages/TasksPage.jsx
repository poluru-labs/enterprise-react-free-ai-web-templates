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
import tasks from '../data/tasks.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_VARIANT = {
  passing: 'success',
  failing: 'danger',
};

export default function TasksPage() {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [open, setOpen] = useState(false);

  return (
    <div className="hil-page">
      <PageHeader
        title="Tasks"
        description="Assignments, SLAs, and backlog health. Desk owned by Sofia Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Tasks' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Batch assign
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Dispute queue above SLA"
        message="Tie-break backlog at 76% on-time. Elena Poluru added two lead reviewers this morning."
      />

      <div className="hil-filters">
        <DateRangePicker
          label="Assignment window"
          startValue={start}
          endValue={end}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
      </div>

      <div className="hil-table-wrap">
        <table className="hil-table">
          <thead>
            <tr>
              <th>Queue</th>
              <th>Owner</th>
              <th>SLA</th>
              <th>On-time</th>
              <th>Open items</th>
            </tr>
          </thead>
          <tbody>
            {tasks.metrics.map((row) => (
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

      <Pagination page={page} pageSize={4} total={tasks.metrics.length} onChange={setPage} />

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Batch assign reviewers"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                showToast({ title: 'Assignments queued', variant: 'success' });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="hil-copy">
          Round-robin 200 items across active reviewers. Nina Poluru receives the summary email.
        </p>
      </Modal>
    </div>
  );
}
