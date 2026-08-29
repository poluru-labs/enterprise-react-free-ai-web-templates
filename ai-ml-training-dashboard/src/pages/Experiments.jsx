import { Badge, Card, Meter, Status, Tag } from '@poluru-labs/enterprise-design-system-react';
import { experiments, statusTone } from '../data';

export default function Experiments() {
  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Lab</span>
          <h1>Experiments</h1>
          <p>Harbor leads · Kavya Poluru owns the encoder track</p>
        </div>
      </header>
      <div className="grid-3">
        {experiments.map((item) => (
          <Card key={item.id} header={item.name} footer={<Tag label={item.owner} />}>
            <Status label={item.status} variant={statusTone(item.status)} />
            <p className="note">{item.runs} runs · best {item.best}</p>
            <Meter label="Best accuracy" value={Number.parseFloat(item.best)} showValue />
            <div className="row" style={{ marginTop: '0.65rem' }}>
              <Badge label={`${item.runs} runs`} pill />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
