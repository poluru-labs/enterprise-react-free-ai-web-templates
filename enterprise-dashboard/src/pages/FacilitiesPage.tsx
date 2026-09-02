import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  DataTable,
  Modal,
  ProgressBar,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { BREADCRUMB_ROOT } from '../constants/navigation';
import { facilities } from '../data';
import { formatKw, formatNumber, formatPercent } from '../lib/format';
import { PageHeader } from '../components/widgets/PageHeader';
import { StatusBadge } from '../components/widgets/StatusBadge';
import './pages.scss';

export function FacilitiesPage() {
  const navigate = useNavigate();
  const { show } = useToast();
  const [addOpen, setAddOpen] = useState(false);

  const columns = useMemo(
    () => [
      { key: 'name', label: 'Facility' },
      { key: 'region', label: 'Region' },
      { key: 'status', label: 'Status' },
      { key: 'racks', label: 'Racks' },
      { key: 'utilization', label: 'Utilization' },
      { key: 'powerKw', label: 'Power' },
      { key: 'pue', label: 'PUE' },
    ],
    [],
  );

  const rows = facilities.map((facility) => ({
    name: facility.name,
    region: facility.region,
    status: facility.status,
    racks: formatNumber(facility.racks),
    utilization: formatPercent(facility.utilization, 0),
    powerKw: formatKw(facility.powerKw),
    pue: facility.pue.toFixed(2),
  }));

  return (
    <div className="page">
      <PageHeader
        title="Facilities"
        description="Campus inventory across regions — capacity, power, and operational state."
        crumbs={[BREADCRUMB_ROOT, { label: 'Facilities' }]}
        actions={
          <Button variant="primary" size="sm" icon="plus" onClick={() => setAddOpen(true)}>
            Add facility
          </Button>
        }
      />

      <section className="facility-cards stagger" aria-label="Facility cards">
        {facilities.map((facility) => (
          <Card key={facility.id} elevated padded>
            <div className="facility-card">
              <div className="facility-card__head">
                <h2>{facility.name}</h2>
                <StatusBadge status={facility.status} pulse={facility.status === 'degraded'} />
              </div>
              <Badge label={facility.region} variant="neutral" soft />
              <ProgressBar label="Utilization" value={facility.utilization} showValue />
              <dl className="kv">
                <div>
                  <dt>Racks</dt>
                  <dd className="mono">{facility.racks}</dd>
                </div>
                <div>
                  <dt>Power</dt>
                  <dd className="mono">{formatKw(facility.powerKw)}</dd>
                </div>
                <div>
                  <dt>PUE</dt>
                  <dd className="mono">{facility.pue.toFixed(2)}</dd>
                </div>
                <div>
                  <dt>Temp</dt>
                  <dd className="mono">{facility.tempC}°C</dd>
                </div>
              </dl>
              <Button variant="secondary" size="sm" onClick={() => navigate(`/facilities/${facility.id}`)}>
                View details
              </Button>
            </div>
          </Card>
        ))}
      </section>

      <Card
        elevated
        padded
        header={
          <div className="card-heading">
            <h2>Facility table</h2>
          </div>
        }
      >
        <DataTable columns={columns} rows={rows} striped sortable />
      </Card>

      <Modal
        open={addOpen}
        onOpenChange={setAddOpen}
        heading="Add facility"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setAddOpen(false);
                show({
                  title: 'Facility request submitted',
                  description: 'Provisioning workflow started',
                  variant: 'success',
                });
              }}
            >
              Submit
            </Button>
          </>
        }
      >
        <p className="modal-copy">
          Kick off onboarding for a new campus. Capacity planning and network design will be assigned to regional ops.
        </p>
      </Modal>
    </div>
  );
}
