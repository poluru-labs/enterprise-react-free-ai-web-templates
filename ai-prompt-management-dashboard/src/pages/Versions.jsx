import { useState } from 'react';
import {
  Badge,
  Card,
  Checkbox,
  List,
  RadioGroup,
  Switch,
  Tag,
  TreeView,
} from '@poluru-labs/enterprise-design-system-react';
import { owners, promptTree, prompts } from '../data';

export default function Versions() {
  const [selectedId, setSelectedId] = useState('support');
  const [published, setPublished] = useState(true);
  const [citations, setCitations] = useState(true);
  const [visibility, setVisibility] = useState('workspace');
  const [expandedIds, setExpandedIds] = useState({ bureau: true, support: true });

  const labels = {
    bureau: 'Prompt Bureau',
    support: 'Support',
    copilot: 'Support copilot',
    legal: 'Legal',
    gtm: 'GTM',
    knowledge: 'Knowledge',
    safety: 'Safety',
  };

  return (
    <>
      <section className="page-head">
        <div>
          <p className="eyebrow">Lineage</p>
          <h1>Versions</h1>
          <p className="summary">Group prompts by family, lock citations, and keep Sravani Poluru’s catalog permission-aware.</p>
        </div>
        <Badge label="8 families" variant="brand" soft pill />
      </section>

      <section className="split">
        <Card elevated>
          <div className="card-body">
            <div className="section-head">
              <h2>Library</h2>
              <Tag label={labels[selectedId] || 'Support'} variant="brand" />
            </div>
            <TreeView
              items={promptTree}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={setSelectedId}
              onToggle={(id, expanded) => setExpandedIds((current) => ({ ...current, [id]: expanded }))}
            />
          </div>
        </Card>

        <div className="stack">
          <Card elevated>
            <div className="card-body">
              <h2>{labels[selectedId] || 'Support'}</h2>
              <p className="meta">Owned by Lakshmi Poluru</p>
              <div className="setting" style={{ marginTop: '0.85rem' }}>
                <div>
                  <h3>Published to copilots</h3>
                  <p>Include this family in production routing.</p>
                </div>
                <Switch label="Published" checked={published} onChange={(_, checked) => setPublished(checked)} />
              </div>
              <Checkbox label="Require citations on every answer" checked={citations} onChange={(_, checked) => setCitations(checked)} />
              <div style={{ marginTop: '0.9rem' }}>
                <RadioGroup
                  label="Visibility"
                  name="visibility"
                  value={visibility}
                  onChange={(_, value) => setVisibility(value)}
                  options={[
                    { label: 'Workspace', value: 'workspace' },
                    { label: 'Restricted', value: 'restricted' },
                    { label: 'Public', value: 'public' },
                  ]}
                />
              </div>
            </div>
          </Card>
          <Card elevated>
            <div className="card-body">
              <h2>Editors</h2>
              <List items={owners.map((item) => ({ label: item.name, description: item.focus }))} divided />
            </div>
          </Card>
        </div>
      </section>

      <section className="grid-3" style={{ marginTop: '0.9rem' }}>
        {prompts.slice(0, 6).map((item) => (
          <Card key={item.name} elevated>
            <div className="card-body">
              <div className="section-head">
                <h3>{item.name}</h3>
                <Badge label={item.version} variant="info" soft size="sm" />
              </div>
              <p className="meta">{item.family} · {item.env}</p>
              <p className="meta">{item.owner}</p>
            </div>
          </Card>
        ))}
      </section>
    </>
  );
}
