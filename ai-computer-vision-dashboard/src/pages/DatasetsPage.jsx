import { ProgressBar } from '@poluru-labs/enterprise-design-system-react';
import datasets from '../data/datasets.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCompact, formatDate, formatNumber } from '../lib/format.js';
import { ChartSection, DataTable, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

export default function DatasetsPage() {
  return (
    <div className="cvd-page">
      <PageHeader
        title="Datasets"
        description="night-shift-aug, defect-v3, and ppe-q3 with image counts, splits, and owners."
        crumbs={[BREADCRUMB_ROOT, { label: 'Datasets' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Active sets" value={datasets.summary.sets} hint="Production training corpora" icon="bi-collection" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Images" value={formatCompact(datasets.summary.images)} hint="All sites combined" icon="bi-images" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Labeled" value={formatCompact(datasets.summary.labeled)} hint="Gold + reviewed" icon="bi-check2-square" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Unlabeled" value={formatCompact(datasets.summary.unlabeled)} hint="Waiting on annotation" icon="bi-hourglass-split" tone="warning" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        {datasets.datasets.map((set) => {
          const labeledPct = Math.round((set.labeled / set.images) * 100);
          return (
            <div className="col-12 col-xl-4" key={set.id}>
              <article className="cvd-dataset-card">
                <header>
                  <div>
                    <h3>{set.name}</h3>
                    <p>{set.purpose}</p>
                  </div>
                  <StatusBadge status={set.status} />
                </header>
                <p className="cvd-subtle">{set.source}</p>
                <ProgressBar label="Labeled" value={labeledPct} showValue />
                <dl>
                  <div>
                    <dt>Images</dt>
                    <dd>{formatNumber(set.images)}</dd>
                  </div>
                  <div>
                    <dt>Owner</dt>
                    <dd>{set.owner}</dd>
                  </div>
                </dl>
              </article>
            </div>
          );
        })}
      </div>

      <ChartSection title="Corpus detail" subtitle="Splits, classes, and last ingest">
        <DataTable
          rows={datasets.datasets}
          columns={[
            { key: 'name', label: 'Dataset', className: 'cvd-mono' },
            { key: 'images', label: 'Images', render: (value) => formatNumber(value) },
            { key: 'labeled', label: 'Labeled', render: (value) => formatNumber(value) },
            { key: 'split', label: 'Split' },
            { key: 'classes', label: 'Classes', render: (value) => value.join(', ') },
            { key: 'owner', label: 'Owner' },
            { key: 'updatedAt', label: 'Updated', render: (value) => formatDate(value) },
          ]}
        />
      </ChartSection>
    </div>
  );
}
