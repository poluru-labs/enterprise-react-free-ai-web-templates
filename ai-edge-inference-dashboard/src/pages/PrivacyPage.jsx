import { useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  DateRangePicker,
  Modal,
  Pagination,
  Status,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import privacy from '../data/privacy.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  open: 'warning',
  review: 'info',
  resolved: 'success',
};

const SEVERITY_VARIANT = {
  high: 'danger',
  medium: 'warning',
  low: 'neutral',
};

export default function PrivacyPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  return (
    <div className="hco-page">
      <PageHeader
        title="Privacy events"
        description="Access, export, and break-glass. Desk: Jonah Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Privacy' }]}
        actions={
          <Button
            size="sm"
            onClick={() => {
              setSelected(privacy.events.find((item) => item.status === 'open') || privacy.events[0]);
              setOpen(true);
            }}
          >
            Review next
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Two high severity"
        message="Break-glass and failed login spike need review within 4 hours per Sofia Poluru policy."
      />

      <div className="hco-filters">
        <DateRangePicker
          label="Event window"
          startValue={start}
          endValue={end}
          onChange={(nextStart, nextEnd) => {
            setStart(nextStart);
            setEnd(nextEnd);
          }}
        />
      </div>

      <div className="hco-table-wrap">
        <table className="hco-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Owner</th>
              <th>Severity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {privacy.events.map((row) => (
              <tr
                key={row.id}
                onClick={() => {
                  setSelected(row);
                  setOpen(true);
                }}
              >
                <td>
                  <span className="hco-mono">{row.id}</span>
                  <strong className="hco-cell-title">{row.name}</strong>
                </td>
                <td>{row.owner}</td>
                <td>
                  <Badge label={row.severity} variant={SEVERITY_VARIANT[row.severity]} soft size="sm" />
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status]} pulse={row.status === 'open'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pageSize={4} total={privacy.events.length} onChange={setPage} />

      <section className="hco-panel">
        <h2>Recent</h2>
        <Timeline
          items={privacy.events.map((row) => ({
            title: row.name,
            description: `${row.owner} · ${row.severity}`,
            timestamp: row.at.slice(0, 10),
            status: row.status === 'resolved' ? 'complete' : 'current',
          }))}
        />
      </section>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading={selected ? `Review ${selected.id}` : 'Review'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                showToast({
                  title: 'Review logged',
                  description: 'Jonah Poluru will close the ticket.',
                  variant: 'success',
                });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="hco-copy">
          {selected
            ? `${selected.name}. Owner ${selected.owner}. This records the review and notifies privacy on-call.`
            : 'Pick an event from the table.'}
        </p>
      </Modal>
    </div>
  );
}
