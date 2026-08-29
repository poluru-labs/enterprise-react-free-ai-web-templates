import { Badge, Card, DescriptionList, Link, Rating, Status } from '@poluru-labs/enterprise-design-system-react';
import { models, statusTone } from '../data';

export default function Models() {
  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Registry</span>
          <h1>Models</h1>
          <p>Candidates and production weights · Poluru Cloud</p>
        </div>
      </header>
      <div className="grid-2">
        {models.map((item) => (
          <Card key={item.id} header={item.name} footer={<Link href="#/runs">Open training runs</Link>}>
            <Status label={item.stage} variant={statusTone(item.stage)} />
            <DescriptionList
              compact
              items={[
                { term: 'Owner', description: item.owner },
                { term: 'Params', description: item.params },
                { term: 'Accuracy', description: item.acc },
              ]}
            />
            <div className="row" style={{ marginTop: '0.65rem' }}>
              <Badge label={item.acc} variant="brand" pill />
              <Rating value={item.stage === 'Production' ? 5 : 4} readonly />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
