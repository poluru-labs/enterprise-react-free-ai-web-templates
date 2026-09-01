import { useEffect, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Button,
  Drawer,
  Input,
  Search,
  Select,
  Textarea,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import promptData from '../data/prompts.json';
import settings from '../data/settings.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { modelOptions } from '../lib/models.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, DataTable, FilterBar, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function PromptsPage() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('create');
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [active, setActive] = useState(promptData.prompts[0]);

  useEffect(() => {
    const create = () => {
      setMode('create');
      setName('');
      setOpen(true);
    };
    window.addEventListener('llm:create-prompt', create);
    return () => window.removeEventListener('llm:create-prompt', create);
  }, []);

  const rows = useMemo(() => {
    const filtered = promptData.prompts.filter((item) => status === 'all' || item.status === status);
    return searchRecords(filtered, query, ['name', 'model', 'owner']);
  }, [query, status]);

  function inspect(item) {
    setActive(item);
    setMode('inspect');
    setOpen(true);
  }

  return (
    <div className="llm-page">
      <PageHeader
        title="Prompt library"
        description="Reusable instructions across Aurora, Atlas, Lens, Nova, Harbor, and Beacon."
        crumbs={[BREADCRUMB_ROOT, { label: 'Prompts' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => {
              setMode('create');
              setName('');
              setOpen(true);
            }}
          >
            Create prompt
          </Button>
        }
      />

      <FilterBar
        search={<Search value={query} placeholder="Search prompts" onChange={(_, value) => setQuery(value)} />}
        onReset={() => {
          setQuery('');
          setStatus('all');
        }}
      >
        <Select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={[
            { value: 'all', label: 'All statuses' },
            { value: 'Published', label: 'Published' },
            { value: 'Draft', label: 'Draft' },
          ]}
        />
      </FilterBar>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title={`${rows.length} templates`} subtitle="Click a row to inspect versions">
            <DataTable
              rows={rows}
              onRowClick={inspect}
              columns={[
                { key: 'name', label: 'Prompt' },
                { key: 'model', label: 'Model' },
                { key: 'version', label: 'Version' },
                { key: 'owner', label: 'Owner' },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Version timeline" subtitle="Latest publishes and drafts">
            <Timeline items={promptData.timeline} />
          </ChartSection>
        </div>
      </div>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        heading={mode === 'create' ? 'Create prompt' : active.name}
        footer={(
          <Button
            onClick={() => {
              setOpen(false);
              showToast({
                title: mode === 'create' ? 'Prompt saved' : 'Version published',
                description: mode === 'create'
                  ? `${name || 'Untitled'} is a draft under Subrahmanyam Poluru.`
                  : `${active.name} stays with ${active.owner}.`,
                variant: 'success',
              });
              setName('');
            }}
          >
            {mode === 'create' ? 'Save draft' : 'Publish'}
          </Button>
        )}
      >
        {mode === 'create' ? (
          <div className="llm-form-stack">
            <Input label="Name" value={name} placeholder="Refund reply" onChange={(event) => setName(event.target.value)} />
            <Select label="Model" options={modelOptions} defaultValue="aurora" />
            <Select label="Owner" options={settings.ownerOptions} defaultValue="subrahmanyam" />
            <Textarea label="Instructions" rows={6} placeholder="You are Aurora Chat. Reply as Subrahmanyam Poluru’s support voice." />
          </div>
        ) : (
          <div className="llm-form-stack">
            <p className="llm-note">{active.model} · {active.owner}</p>
            <StatusBadge status={active.status} />
            <Accordion>
              {(promptData.versions[active.id] || []).map((item) => (
                <AccordionItem key={item.heading} heading={item.heading}>{item.children}</AccordionItem>
              ))}
            </Accordion>
            <Button
              variant="secondary"
              size="sm"
              icon="refresh"
              onClick={() => showToast({ title: 'Rolled back', description: `${active.name} returned to the previous live version.`, variant: 'info' })}
            >
              Rollback version
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
