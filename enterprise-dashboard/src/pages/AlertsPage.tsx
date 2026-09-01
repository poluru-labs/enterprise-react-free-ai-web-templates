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
  Tag,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { alerts as initialAlerts, type AlertItem } from '../data/mock';
import './pages.scss';

export function AlertsPage() {
  const { show } = useToast();
  const [items, setItems] = useState(initialAlerts);
  const [filter, setFilter] = useState('open');
  const [selected, setSelected] = useState<AlertItem | null>(null);
  const [ackAllOpen, setAckAllOpen] = useState(false);

  const filtered = useMemo(() => {
    if (filter === 'all') return items;
    if (filter === 'open') return items.filter((a) => !a.acknowledged);
    return items.filter((a) => a.severity === filter);
  }, [filter, items]);

  const critical = items.filter((a) => a.severity === 'critical' && !a.acknowledged);

  const acknowledge = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, acknowledged: true } : item)),
    );
    show({ title: 'Alert acknowledged', variant: 'success' });
    setSelected(null);
  };

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Active incidents and facility notifications across the fleet.
        </p>
        <div className="page-toolbar__actions">
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
        </div>
      </div>

      {critical.length > 0 ? (
        <Alert
          variant="danger"
          title={`${critical.length} critical alert${critical.length > 1 ? 's' : ''}`}
          message="Immediate attention required on cooling or power systems."
        />
      ) : null}

      <section className="alert-grid stagger">
        {filtered.map((item) => (
          <Card key={item.id} elevated padded>
            <div className="alert-card">
              <div className="alert-card__meta">
                <Tag
                  label={item.severity}
                  variant={
                    item.severity === 'critical'
                      ? 'danger'
                      : item.severity === 'warning'
                        ? 'warning'
                        : 'info'
                  }
                />
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
        <EmptyState
          heading="No matching alerts"
          description="Try another filter or clear acknowledged items from the feed."
        />
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
            <Tag
              label={selected.severity}
              variant={
                selected.severity === 'critical'
                  ? 'danger'
                  : selected.severity === 'warning'
                    ? 'warning'
                    : 'info'
              }
            />
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
                setItems((prev) => prev.map((item) => ({ ...item, acknowledged: true })));
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
          This marks every open alert as acknowledged. Critical items will remain in history for
          audit.
        </p>
      </Modal>
    </div>
  );
}
