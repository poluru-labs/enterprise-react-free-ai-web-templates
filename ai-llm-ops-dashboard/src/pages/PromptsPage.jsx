import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Drawer,
  EmptyState,
  Input,
  Select,
  Status,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { modelOptions, ownerOptions, promptVersions, prompts, statusVariant } from '../data';

export default function PromptsPage() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('create');
  const [name, setName] = useState('');
  const [active, setActive] = useState(prompts[0]);

  useEffect(() => {
    const create = () => {
      setMode('create');
      setName('');
      setOpen(true);
    };
    window.addEventListener('llm:create-prompt', create);
    return () => window.removeEventListener('llm:create-prompt', create);
  }, []);

  function inspect(item) {
    setActive(item);
    setMode('inspect');
    setOpen(true);
  }

  return (
    <>
      <Card padded={false}>
        <div className="llm-card-heading">
          <div>
            <h2>Prompt library</h2>
            <p>Reusable instructions deployed across your models</p>
          </div>
          <Button variant="primary" size="sm" icon="plus" onClick={() => { setMode('create'); setName(''); setOpen(true); }}>Create prompt</Button>
        </div>
        {!prompts.length ? (
          <EmptyState heading="No prompts" description="Create the first instruction pack." actions={<Button size="sm" onClick={() => setOpen(true)}>Create prompt</Button>} />
        ) : (
          <div className="llm-table-wrap">
            <table className="llm-table">
              <thead>
                <tr><th>Prompt</th><th>Model</th><th>Version</th><th>Owner</th><th>Status</th></tr>
              </thead>
              <tbody>
                {prompts.map((item) => (
                  <tr key={item.id} className="llm-click-row" onClick={() => inspect(item)}>
                    <td>
                      <div className="llm-model-cell">
                        <span className="llm-model-icon"><i className="bi bi-chat-square-text" /></span>
                        <strong>{item.name}</strong>
                      </div>
                    </td>
                    <td>{item.model}</td>
                    <td>{item.version}</td>
                    <td>{item.owner}</td>
                    <td><Status label={item.status} variant={statusVariant(item.status)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        heading={mode === 'create' ? 'Create prompt' : active.name}
        footer={(
          <Button onClick={() => {
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
            <Select label="Owner" options={ownerOptions} defaultValue="subrahmanyam" />
            <Textarea label="Instructions" rows={6} placeholder="You are Aurora Chat. Reply as Subrahmanyam Poluru’s support voice." />
          </div>
        ) : (
          <div className="llm-form-stack">
            <p className="note">{active.model} · {active.owner}</p>
            <Status label={active.status} variant={statusVariant(active.status)} />
            <Accordion>
              {(promptVersions[active.id] || []).map((item) => (
                <AccordionItem key={item.heading} heading={item.heading}>{item.children}</AccordionItem>
              ))}
            </Accordion>
            <Button variant="secondary" size="sm" icon="refresh" onClick={() => showToast({ title: 'Rolled back', description: `${active.name} returned to the previous live version.`, variant: 'info' })}>Rollback version</Button>
          </div>
        )}
      </Drawer>
    </>
  );
}
