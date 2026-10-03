import { useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Modal,
  Status,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import exceptions from '../data/exceptions.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  open: 'warning',
  resolved: 'success',
};

const SEVERITY_VARIANT = {
  high: 'danger',
  medium: 'warning',
  low: 'neutral',
};

export default function ExceptionsPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="dpd-page">
      <PageHeader
        title="Exceptions"
        description="Queue, owners, and resolve. On-call: Sofia Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Exceptions' }]}
        actions={
          <Button
            size="sm"
            onClick={() => {
              setSelected(exceptions.queue.find((item) => item.status === 'open') || exceptions.queue[0]);
              setOpen(true);
            }}
          >
            Resolve next
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Two past SLA"
        message="PO missing on INV-4419 and expense total mismatch. Sofia Poluru is paged after 8 hours."
      />

      <div className="dpd-table-wrap">
        <table className="dpd-table">
          <thead>
            <tr>
              <th>Exception</th>
              <th>Owner</th>
              <th>Severity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {exceptions.queue.map((row) => (
              <tr
                key={row.id}
                onClick={() => {
                  setSelected(row);
                  setOpen(true);
                }}
              >
                <td>
                  <span className="dpd-mono">{row.id}</span>
                  <strong className="dpd-cell-title">{row.name}</strong>
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

      <section className="dpd-panel">
        <h2>Recent</h2>
        <Timeline
          items={exceptions.queue.map((row) => ({
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
        heading={selected ? `Resolve ${selected.id}` : 'Resolve'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                showToast({
                  title: 'Marked resolved',
                  description: 'Sofia Poluru will confirm the pack.',
                  variant: 'success',
                });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="dpd-copy">
          {selected
            ? `${selected.name}. Owner ${selected.owner}. This closes the ticket and releases the pack.`
            : 'Pick an exception from the queue.'}
        </p>
      </Modal>
    </div>
  );
}
