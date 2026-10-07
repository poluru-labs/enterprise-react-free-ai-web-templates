import { useState } from 'react';
import {
  Button,
  CircularProgress,
  DescriptionList,
  Meter,
  Modal,
  ProgressBar,
  Switch,
  Timeline,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import rollouts from '../data/rollouts.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function RolloutsPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="lex-page">
      <PageHeader
        title="Rollout gates"
        description="Canary, sign-off, and promote. Release owned by Sofia Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Rollouts' }]}
        actions={
          <Button
            size="sm"
            onClick={() => {
              setSelected(rollouts.gates[0]);
              setOpen(true);
            }}
          >
            Promote next
          </Button>
        }
      />

      <div className="lex-rollouts-hero">
        <article className="lex-panel lex-center">
          <p>Gate readiness</p>
          <CircularProgress value={rollouts.score} max={100} size={140} showValue />
        </article>
        {rollouts.gates.map((gate) => (
          <article key={gate.id} className="lex-panel">
            <h3>{gate.name}</h3>
            <p className="lex-copy">
              {gate.owner} · window {gate.ttl}
            </p>
            <ProgressBar value={gate.usage} max={100} label="Checklist" showValue />
            <Meter value={gate.quality} min={0} max={100} label="Confidence" showValue />
            <DescriptionList items={gate.fields} />
            <div className="lex-switch-row">
              <Switch
                label="Canary active"
                defaultChecked={gate.quality >= 90}
                onChange={() => showToast({ title: `${gate.id} canary updated`, variant: 'info' })}
              />
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelected(gate);
                setOpen(true);
              }}
            >
              Review gate
            </Button>
          </article>
        ))}
      </div>

      <section className="lex-panel">
        <h2>Recent promotes</h2>
        <Timeline
          items={[
            {
              title: 'Support router v1',
              description: 'Sofia Poluru · 100% prod',
              timestamp: '1 Oct',
              status: 'complete',
            },
            {
              title: 'Ranker v3.2 canary',
              description: '10% · in progress',
              timestamp: '6 Oct',
              status: 'current',
            },
          ]}
        />
      </section>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading={selected ? `Promote ${selected.id}` : 'Promote'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                showToast({
                  title: 'Promote queued',
                  description: 'Sofia Poluru will confirm canary expansion.',
                  variant: 'success',
                });
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="lex-copy">
          {selected
            ? `${selected.name}. All guardrails must be green. ${selected.owner} owns the gate.`
            : 'Select a gate to promote.'}
        </p>
      </Modal>
    </div>
  );
}
