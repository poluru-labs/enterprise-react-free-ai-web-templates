import { Badge, Button, Card, Meter, Status, Tag, TreeView } from '@poluru-labs/enterprise-design-system-react';
import { datasetTree, statusTone, suites } from '../data';

export default function Suites({ onRun }) {
  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Library</span>
          <h1>Suites</h1>
          <p>Safety, grounding, and field packs · Meera Poluru</p>
        </div>
        <Button icon="plus" onClick={onRun}>Run evaluation</Button>
      </header>
      <div className="grid-2">
        <div className="stack">
          {suites.map((item) => (
            <a key={item.id} className="run-card" href={`#/suite/${item.id}`}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <strong>{item.name}</strong>
                <Status label={item.status} variant={statusTone(item.status)} />
              </div>
              <p className="note">{item.cases} cases · {item.model} · {item.owner}</p>
              <Meter className="mt-2" label="Pass rate" value={item.pass} showValue />
              <div className="row" style={{ marginTop: '0.55rem' }}>
                <Badge label={`${item.pass}%`} variant="brand" pill />
                <Tag label={item.owner} />
              </div>
            </a>
          ))}
        </div>
        <Card header="Gold packs">
          <TreeView items={datasetTree} />
          <p className="note">Holdout rows stay with Meera Poluru. Judges never train on them.</p>
        </Card>
      </div>
    </>
  );
}
