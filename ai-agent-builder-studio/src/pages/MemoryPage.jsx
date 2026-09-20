import {
  CircularProgress,
  Meter,
  ProgressBar,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import memory from '../data/memory.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function MemoryPage() {
  return (
    <div className="abs-page">
      <PageHeader
        title="Memory"
        description="Stores, TTL, and retrieval quality. Owner: Elena Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Memory' }]}
      />

      <div className="abs-memory-hero">
        <article className="abs-panel abs-center">
          <p>Workspace score</p>
          <CircularProgress value={88} max={100} size={140} showValue />
        </article>
        {memory.stores.map((store) => (
          <article key={store.id} className="abs-panel">
            <h3>{store.name}</h3>
            <p className="abs-copy">{store.owner} · TTL {store.ttl}</p>
            <ProgressBar value={store.usage} max={100} label="Usage" showValue />
            <Meter value={store.quality} min={0} max={100} label="Retrieval" showValue />
            <div className="abs-switch-row">
              <Switch
                label="Write enabled"
                defaultChecked
                onChange={() => showToast({ title: `${store.name} write updated`, variant: 'info' })}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
