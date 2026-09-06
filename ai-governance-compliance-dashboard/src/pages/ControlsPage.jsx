import { useState } from 'react';
import {
  Checkbox,
  CircularProgress,
  ProgressBar,
  Slider,
  Switch,
  TreeView,
} from '@poluru-labs/enterprise-design-system-react';
import controls from '../data/controls.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/widgets/index.js';

export default function ControlsPage() {
  const [selectedId, setSelectedId] = useState('human');
  const [expandedIds, setExpandedIds] = useState({ data: true, ops: true, vendor: true });
  const [items, setItems] = useState(controls.items);
  const [threshold, setThreshold] = useState(80);

  const selected = items.find((item) => item.id === selectedId) || items[0];

  return (
    <div className="gov-page">
      <PageHeader
        title="Controls"
        description="Mapped controls, owners, and coverage against the 80% floor."
        crumbs={[BREADCRUMB_ROOT, { label: 'Controls' }]}
      />

      <div className="row g-3">
        <div className="col-12 col-xl-4">
          <section className="gov-panel">
            <header className="gov-panel-header">
              <div>
                <h2>Catalog</h2>
                <p>Families and mapped controls.</p>
              </div>
            </header>
            <div className="gov-panel-body">
              <TreeView
                items={controls.tree}
                selectedId={selectedId}
                expandedIds={expandedIds}
                onSelect={setSelectedId}
                onToggle={(id, expanded) => setExpandedIds((current) => ({ ...current, [id]: expanded }))}
              />
            </div>
          </section>
        </div>
        <div className="col-12 col-xl-8">
          <section className="gov-panel mb-3">
            <header className="gov-panel-header">
              <div>
                <h2>{selected.label}</h2>
                <p>Owner {selected.owner}</p>
              </div>
              <CircularProgress value={selected.coverage} max={100} showValue />
            </header>
            <div className="gov-panel-body">
              <ProgressBar value={selected.coverage} max={100} label="Coverage" showValue />
              <Slider
                className="mt-3"
                label="Coverage floor"
                min={50}
                max={100}
                value={threshold}
                showValue
                onChange={(_, value) => setThreshold(value)}
              />
              <p className="gov-note mt-2">
                {selected.coverage >= threshold
                  ? 'This control is above the floor.'
                  : 'This control is below the floor and needs an exception or a plan.'}
              </p>
            </div>
          </section>

          <section className="gov-panel">
            <header className="gov-panel-header">
              <div>
                <h2>Enablement</h2>
                <p>Turn mapped controls on or off for the workspace.</p>
              </div>
            </header>
            <div className="gov-panel-body">
              {items.map((item) => (
                <div className="gov-control-row" key={item.id}>
                  <div>
                    <strong>{item.label}</strong>
                    <div className="gov-subtle">{item.owner} · {item.coverage}%</div>
                  </div>
                  <div className="gov-inline">
                    <Checkbox
                      label="Required"
                      checked={item.enabled}
                      onChange={(_, checked) =>
                        setItems((current) =>
                          current.map((row) => (row.id === item.id ? { ...row, enabled: checked } : row)),
                        )
                      }
                    />
                    <Switch
                      label="On"
                      checked={item.enabled}
                      onChange={(_, checked) =>
                        setItems((current) =>
                          current.map((row) => (row.id === item.id ? { ...row, enabled: checked } : row)),
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
