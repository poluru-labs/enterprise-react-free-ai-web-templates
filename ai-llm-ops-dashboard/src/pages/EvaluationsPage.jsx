import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Modal,
  ProgressBar,
  Select,
  Status,
  Switch,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { evaluations, guardrails, modelOptions, statusVariant } from '../data';

export default function EvaluationsPage() {
  const [open, setOpen] = useState(false);
  const [pii, setPii] = useState(true);
  const [jail, setJail] = useState(true);

  useEffect(() => {
    const run = () => setOpen(true);
    window.addEventListener('llm:run-eval', run);
    return () => window.removeEventListener('llm:run-eval', run);
  }, []);

  return (
    <>
      <div className="llm-page-grid">
        <Card padded={false}>
          <div className="llm-card-heading">
            <div>
              <h2>Evaluation runs</h2>
              <p>Quality signals from the latest suites</p>
            </div>
            <Button variant="primary" size="sm" icon="star" onClick={() => setOpen(true)}>Run evaluation</Button>
          </div>
          <div className="llm-table-wrap">
            <table className="llm-table">
              <thead>
                <tr><th>Suite</th><th>Model</th><th>Score</th><th>Outcome</th></tr>
              </thead>
              <tbody>
                {evaluations.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                      <div className="llm-muted">{item.owner}</div>
                    </td>
                    <td>{item.model}</td>
                    <td>
                      <div className="llm-progress-cell">
                        <ProgressBar value={item.score} max={100} />
                        <span>{item.score}%</span>
                      </div>
                    </td>
                    <td><Status label={item.outcome} variant={statusVariant(item.outcome)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card header="Guardrails">
          <Switch label="PII redaction on Aurora logs" checked={pii} onChange={(_, checked) => setPii(checked)} />
          <div style={{ height: 10 }} />
          <Switch label="Jailbreak filter on customer reply" checked={jail} onChange={(_, checked) => setJail(checked)} />
          <Accordion>
            {guardrails.map((item) => (
              <AccordionItem key={item.id} heading={item.heading}>{item.children}</AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Run evaluation"
        footer={(
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { setOpen(false); showToast({ title: 'Eval queued', description: 'Harini Poluru will see Nova results in ~8 minutes.', variant: 'success' }); }}>Start</Button>
          </>
        )}
      >
        <Select label="Model" options={modelOptions} defaultValue="nova" />
      </Modal>
    </>
  );
}
