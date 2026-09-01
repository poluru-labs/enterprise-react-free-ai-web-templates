import { useState } from 'react';
import { Avatar, Button, Input, Select, Switch, showToast } from '@poluru-labs/enterprise-design-system-react';
import settings from '../data/settings.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { ChartSection, PageHeader } from '../components/widgets/index.js';

const SECTIONS = [
  { id: 'general', label: 'General' },
  { id: 'models', label: 'Models' },
  { id: 'retrieval', label: 'Retrieval' },
  { id: 'team', label: 'Team access' },
  { id: 'api', label: 'API keys' },
];

const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'English' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'French', value: 'French' },
];

const MODEL_OPTIONS = [
  { label: 'Contextly RAG v2', value: 'Contextly RAG v2' },
  { label: 'Contextly RAG v1', value: 'Contextly RAG v1' },
];

const TOPK_OPTIONS = [
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '12', value: '12' },
];

export default function SettingsPage() {
  const [section, setSection] = useState('general');
  const [name, setName] = useState(settings.workspace.name);
  const [language, setLanguage] = useState(settings.workspace.language);
  const [alerts, setAlerts] = useState(settings.retrieval.sourceAlerts);
  const [hybrid, setHybrid] = useState(settings.retrieval.hybrid);
  const [generator, setGenerator] = useState(settings.models.generator);
  const [topK, setTopK] = useState(settings.retrieval.topK);

  const save = (title = 'Workspace settings saved') => {
    showToast({ title, variant: 'success' });
  };

  return (
    <div className="rag-page">
      <PageHeader
        title="Workspace settings"
        description="Manage the basics of your Contextly workspace, models, retrieval, team, and API keys."
        crumbs={[BREADCRUMB_ROOT, { label: 'Settings' }]}
        actions={
          <Button size="sm" icon="save" onClick={() => save()}>
            Save changes
          </Button>
        }
      />

      <div className="row g-3">
        <div className="col-12 col-xl-3">
          <aside className="rag-panel rag-settings-menu">
            <header className="rag-panel-header">
              <div>
                <h2>Workspace settings</h2>
                <p>General, models, retrieval, team, API</p>
              </div>
            </header>
            <div className="rag-panel-body">
              {SECTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === section ? 'is-selected' : ''}
                  onClick={() => setSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </aside>
        </div>
        <div className="col-12 col-xl-9">
          {section === 'general' ? (
            <ChartSection title="General" subtitle="Manage the basics of your Contextly workspace.">
              <div className="rag-form-stack">
                <Input label="Workspace name" value={name} onChange={(event) => setName(event.target.value)} />
                <Select
                  label="Default answer language"
                  options={LANGUAGE_OPTIONS}
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                />
                <Switch
                  label="Source change alerts"
                  checked={alerts}
                  onChange={(_, checked) => {
                    setAlerts(checked);
                    showToast({ title: 'Source alerts preference saved', variant: 'info' });
                  }}
                />
                <div className="rag-settings-actions">
                  <Button variant="secondary" onClick={() => setName(settings.workspace.name)}>
                    Cancel
                  </Button>
                  <Button onClick={() => save()}>Save changes</Button>
                </div>
              </div>
            </ChartSection>
          ) : null}

          {section === 'models' ? (
            <ChartSection title="Models" subtitle="Generator, embedder, and reranker for Contextly RAG.">
              <div className="rag-form-stack">
                <Select
                  label="Generator"
                  options={MODEL_OPTIONS}
                  value={generator}
                  onChange={(event) => setGenerator(event.target.value)}
                />
                <Input label="Embedder" defaultValue={settings.models.embedder} />
                <Input label="Reranker" defaultValue={settings.models.reranker} />
                <Button onClick={() => save('Model settings saved')}>Save models</Button>
              </div>
            </ChartSection>
          ) : null}

          {section === 'retrieval' ? (
            <ChartSection title="Retrieval" subtitle="Chunking, hybrid search, and top-k.">
              <div className="rag-form-stack">
                <Select label="Top K" options={TOPK_OPTIONS} value={topK} onChange={(event) => setTopK(event.target.value)} />
                <Input label="Chunk size" defaultValue={settings.retrieval.chunkSize} />
                <Input label="Overlap" defaultValue={settings.retrieval.overlap} />
                <Switch label="Hybrid search" checked={hybrid} onChange={(_, checked) => setHybrid(checked)} />
                <Button onClick={() => save('Retrieval settings saved')}>Save retrieval</Button>
              </div>
            </ChartSection>
          ) : null}

          {section === 'team' ? (
            <ChartSection title="Team access" subtitle="People with access to Poluru Research.">
              <ul className="rag-note-list">
                {settings.team.map((person) => (
                  <li key={person.name}>
                    <Avatar name={person.name} size="sm" />
                    <div>
                      <strong>{person.name}</strong>
                      <p className="mb-0">{person.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ChartSection>
          ) : null}

          {section === 'api' ? (
            <ChartSection title="API keys" subtitle="Live query endpoint for Contextly.">
              <dl className="rag-settings-list">
                <div>
                  <dt>Key</dt>
                  <dd className="rag-mono">{settings.api.keyHint}</dd>
                </div>
                <div>
                  <dt>Endpoint</dt>
                  <dd className="rag-mono">{settings.api.endpoint}</dd>
                </div>
              </dl>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => showToast({ title: 'API key copied', variant: 'info' })}
              >
                Copy key
              </Button>
            </ChartSection>
          ) : null}
        </div>
      </div>
    </div>
  );
}
