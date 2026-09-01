import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  DataTable,
  DescriptionList,
  Drawer,
  Modal,
  ProgressBar,
  Status,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { facilities, type Facility } from '../data/mock';
import './pages.scss';

const statusVariant = {
  operational: 'success',
  degraded: 'warning',
  maintenance: 'info',
} as const;

export function FacilitiesPage() {
  const { show } = useToast();
  const [selected, setSelected] = useState<Facility | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const columns = useMemo(
    () => [
      { key: 'name', label: 'Facility' },
      { key: 'region', label: 'Region' },
      { key: 'status', label: 'Status' },
      { key: 'racks', label: 'Racks' },
      { key: 'utilization', label: 'Utilization' },
      { key: 'powerKw', label: 'Power (kW)' },
      { key: 'pue', label: 'PUE' },
    ],
    [],
  );

  const rows = facilities.map((f) => ({
    name: f.name,
    region: f.region,
    status: f.status,
    racks: f.racks,
    utilization: `${f.utilization}%`,
    powerKw: f.powerKw,
    pue: f.pue.toFixed(2),
  }));

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Campus inventory across regions — capacity, power, and operational state.
        </p>
        <Button variant="primary" size="sm" icon="plus" onClick={() => setAddOpen(true)}>
          Add facility
        </Button>
      </div>

      <section className="facility-cards stagger" aria-label="Facility cards">
        {facilities.map((facility) => (
          <Card key={facility.id} elevated padded>
            <div className="facility-card">
              <div className="facility-card__head">
                <h2>{facility.name}</h2>
                <Status label={facility.status} variant={statusVariant[facility.status]} />
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
                  <dd className="mono">{facility.powerKw} kW</dd>
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
              <Button variant="secondary" size="sm" onClick={() => setSelected(facility)}>
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

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.name ?? 'Facility'}
        size="lg"
        footer={
          <Button variant="tertiary" onClick={() => setSelected(null)}>
            Close
          </Button>
        }
      >
        {selected ? (
          <div className="drawer-body">
            <Status label={selected.status} variant={statusVariant[selected.status]} />
            <DescriptionList
              columns={2}
              items={[
                { term: 'Region', description: selected.region },
                { term: 'Racks', description: String(selected.racks) },
                { term: 'Utilization', description: `${selected.utilization}%` },
                { term: 'Power', description: `${selected.powerKw} kW` },
                { term: 'PUE', description: selected.pue.toFixed(2) },
                { term: 'Cooling', description: `${selected.coolingTons} tons` },
                { term: 'Temperature', description: `${selected.tempC}°C` },
                { term: 'Humidity', description: `${selected.humidity}% RH` },
              ]}
            />
          </div>
        ) : null}
      </Drawer>

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
          Kick off onboarding for a new campus. Capacity planning and network design will be
          assigned to regional ops.
        </p>
      </Modal>
    </div>
  );
}
