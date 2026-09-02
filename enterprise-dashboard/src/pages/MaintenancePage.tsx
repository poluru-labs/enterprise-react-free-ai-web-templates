import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Card,
  Modal,
  Stepper,
  Timeline,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT } from '../constants/navigation';
import { maintenanceWindows } from '../data';
import { PageHeader } from '../components/widgets/PageHeader';
import { StatusBadge } from '../components/widgets/StatusBadge';
import './pages.scss';

export function MaintenancePage() {
  const { show } = useToast();
  const [modalOpen, setModalOpen] = useState(false);

  const timelineItems = maintenanceWindows.map((item) => ({
    title: item.title,
    description: `${item.facility} · ${item.impact}`,
    timestamp: item.window,
    status:
      item.status === 'completed'
        ? ('complete' as const)
        : item.status === 'in-progress'
          ? ('current' as const)
          : ('upcoming' as const),
  }));

  return (
    <div className="page">
      <PageHeader
        title="Maintenance"
        description="Planned work windows, change readiness, and on-site impact across facilities."
        crumbs={[BREADCRUMB_ROOT, { label: 'Maintenance' }]}
        actions={
          <Button variant="primary" size="sm" icon="plus" onClick={() => setModalOpen(true)}>
            Schedule window
          </Button>
        }
      />

      <Card
        elevated
        padded
        header={
          <div className="card-heading">
            <h2>Change readiness</h2>
            <Badge label="UPS firmware · ORD-1" variant="brand" soft />
          </div>
        }
      >
        <Stepper
          current={2}
          steps={[
            { label: 'Request', description: 'Opened by Power Systems' },
            { label: 'CAB review', description: 'Approved' },
            { label: 'Pre-checks', description: 'In progress' },
            { label: 'Execute', description: 'Sat 01:00 CT' },
            { label: 'Verify', description: 'Pending' },
          ]}
        />
      </Card>

      <div className="split-grid" style={{ marginTop: '1.25rem' }}>
        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Upcoming & recent</h2>
            </div>
          }
        >
          <Timeline items={timelineItems} />
        </Card>

        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Window details</h2>
            </div>
          }
        >
          <Accordion>
            {maintenanceWindows.map((item) => (
              <AccordionItem key={item.id} heading={item.title} defaultOpen={item.status === 'in-progress'}>
                <div className="maint-detail">
                  <StatusBadge status={item.status} />
                  <p>
                    <strong>Facility:</strong> {item.facility}
                  </p>
                  <p>
                    <strong>Window:</strong> {item.window}
                  </p>
                  <p>
                    <strong>Impact:</strong> {item.impact}
                  </p>
                  <p>
                    <strong>Owner:</strong> {item.owner}
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      show({
                        title: 'Subscribed to updates',
                        description: item.title,
                        variant: 'success',
                      })
                    }
                  >
                    Watch window
                  </Button>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        heading="Schedule maintenance window"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setModalOpen(false);
                show({ title: 'Window submitted for CAB review', variant: 'success' });
              }}
            >
              Submit request
            </Button>
          </>
        }
      >
        <p className="modal-copy">
          Create a change request for facilities or network work. CAB review is required for production-impacting
          windows.
        </p>
      </Modal>
    </div>
  );
}
