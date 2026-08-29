import { Card, CircularProgress, Meter, ProgressBar, Status } from '@poluru-labs/enterprise-design-system-react';
import { clusters } from '../data';

export default function Clusters() {
  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Capacity</span>
          <h1>Clusters</h1>
          <p>Elena, Luca, and Noor Poluru own the three regions</p>
        </div>
      </header>
      <div className="grid-3">
        {clusters.map((item) => (
          <Card key={item.id} header={item.name}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <CircularProgress value={item.util} showValue />
              <div>
                <Status label={item.util > 90 ? 'Hot' : 'Ready'} variant={item.util > 90 ? 'warning' : 'success'} pulse={item.util > 90} />
                <p className="note">{item.gpus}</p>
                <p className="note">{item.owner}</p>
              </div>
            </div>
            <ProgressBar className="mt-3" label="Utilization" value={item.util} showValue />
            <Meter className="mt-3" label="Queue depth" value={item.queue} max={16} showValue />
          </Card>
        ))}
      </div>
    </>
  );
}
