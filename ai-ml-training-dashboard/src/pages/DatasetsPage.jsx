import { Button, Meter, TreeView } from '@poluru-labs/enterprise-design-system-react';
import { useOutletContext } from 'react-router-dom';
import datasets from '../data/datasets.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { ChartSection, PageHeader } from '../components/widgets/index.js';

export default function DatasetsPage() {
  const { onUpload } = useOutletContext();

  return (
    <div className="kiln-page">
      <PageHeader
        title="Datasets"
        description="Gold labels stay with Hana Poluru"
        crumbs={[BREADCRUMB_ROOT, { label: 'Datasets' }]}
        actions={
          <Button size="sm" icon="upload" onClick={onUpload}>
            Upload dataset
          </Button>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-5">
          <ChartSection title="Lineage" subtitle="Train and val splits for harbor-ops-v4">
            <TreeView items={datasets.tree} />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-7">
          <div className="row g-3">
            {datasets.items.map((item) => (
              <div className="col-12 col-md-6" key={item.id}>
                <article className="kiln-dataset-card">
                  <header>
                    <h3>{item.name}</h3>
                  </header>
                  <p>
                    {item.rows} rows · {item.owner} · fresh {item.freshness}
                  </p>
                  <Meter label="Quality" value={item.quality} showValue />
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
