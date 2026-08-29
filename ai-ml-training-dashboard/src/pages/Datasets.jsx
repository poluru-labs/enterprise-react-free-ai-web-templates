import { Button, Card, Meter, TreeView } from '@poluru-labs/enterprise-design-system-react';
import { datasetTree, datasets } from '../data';

export default function Datasets({ onUpload }) {
  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Data</span>
          <h1>Datasets</h1>
          <p>Gold labels stay with Hana Poluru</p>
        </div>
        <Button icon="upload" onClick={onUpload}>Upload dataset</Button>
      </header>
      <div className="grid-2">
        <Card header="Lineage">
          <TreeView items={datasetTree} />
        </Card>
        <div className="stack">
          {datasets.map((item) => (
            <Card key={item.id} header={item.name}>
              <p className="note">{item.rows} rows · {item.owner} · fresh {item.freshness}</p>
              <Meter label="Quality" value={item.quality} showValue />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
