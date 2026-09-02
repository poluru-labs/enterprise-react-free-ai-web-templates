import { useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  DescriptionList,
  Drawer,
  EmptyState,
  Modal,
  SegmentedControl,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT } from '../constants/navigation';
import { ackAlert, ackAllAlerts, useAlerts, type AlertItem } from '../data';
import { PageHeader } from '../components/widgets/PageHeader';
import { SeverityBadge } from '../components/widgets/StatusBadge';
import './pages.scss';

export function AlertsPage() {
  const { show } = useToast();
  const items = useAlerts();
  const [filter, setFilter] = useState('open');
  const [selected, setSelected] = useState<AlertItem | null>(null);
  const [ackAllOpen, setAckAllOpen] = useState(false);

  const filtered = useMemo(() => {
    if (filter === 'all') return items;
    if (filter === 'open') return items.filter((item) => !item.acknowledged);
    return items.filter((item) => item.severity === filter);
  }, [filter, items]);

  const critical = items.filter((item) => item.severity === 'critical' && !item.acknowledged);

  const acknowledge = (id: string) => {
    ackAlert(id);
    show({ title: 'Alert acknowledged', variant: 'success' });
    setSelected(null);
  };

  return (
    <div className="page">
      <PageHeader
        title="Alerts"
        description="Active incidents and facility notifications across the fleet."
        crumbs={[BREADCRUMB_ROOT, { label: 'Alerts' }]}
        actions={
          <>
            <SegmentedControl
              size="sm"
              value={filter}
              onChange={setFilter}
              options={[
                { label: 'Open', value: 'open' },
                { label: 'Critical', value: 'critical' },
                { label: 'Warning', value: 'warning' },
                { label: 'All', value: 'all' },
              ]}
            />
            <Button variant="primary" size="sm" icon="check" onClick={() => setAckAllOpen(true)}>
              Acknowledge all
            </Button>
          </>
        }
      />

      {critical.length > 0 ? (
        <Alert
          variant="danger"
          title={`${critical.length} critical alert${critical.length > 1 ? 's' : ''}`}
          message="Immediate attention required on cooling or power systems."
        />
      ) : null}

      <section className="alert-grid card-grid stagger">
        {filtered.map((item) => (
          <Card key={item.id} elevated padded>
            <div className="alert-card">
              <div className="alert-card__meta">
                <SeverityBadge severity={item.severity} />
                <Badge label={item.time} variant="neutral" soft size="sm" />
                {item.acknowledged ? <Badge label="Acked" variant="success" soft size="sm" /> : null}
              </div>
              <h2>{item.title}</h2>
              <p className="muted">{item.facility}</p>
              <div className="alert-card__actions">
                <Button variant="secondary" size="sm" onClick={() => setSelected(item)}>
                  Investigate
                </Button>
                {!item.acknowledged ? (
                  <Button variant="tertiary" size="sm" icon="check" onClick={() => acknowledge(item.id)}>
                    Ack
                  </Button>
                ) : null}
              </div>
            </div>
          </Card>
        ))}
      </section>

      {filtered.length === 0 ? (
        <EmptyState heading="No matching alerts" description="Try another filter or clear acknowledged items from the feed." />
      ) : null}

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading="Alert detail"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setSelected(null)}>
              Close
            </Button>
            {selected && !selected.acknowledged ? (
              <Button variant="primary" onClick={() => acknowledge(selected.id)}>
                Acknowledge
              </Button>
            ) : null}
          </>
        }
      >
        {selected ? (
          <div className="drawer-body">
            <SeverityBadge severity={selected.severity} />
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <DescriptionList
              items={[
                { term: 'Facility', description: selected.facility },
                { term: 'Reported', description: selected.time },
                {
                  term: 'State',
                  description: selected.acknowledged ? 'Acknowledged' : 'Open',
                },
              ]}
            />
          </div>
        ) : null}
      </Drawer>

      <Modal
        open={ackAllOpen}
        onOpenChange={setAckAllOpen}
        heading="Acknowledge all open alerts?"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setAckAllOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                ackAllAlerts();
                setAckAllOpen(false);
                show({ title: 'All alerts acknowledged', variant: 'success' });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="modal-copy">
          This marks every open alert as acknowledged. Critical items will remain in history for audit.
        </p>
      </Modal>
    </div>
  );
}
