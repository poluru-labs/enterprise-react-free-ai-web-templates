import { useMemo, useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Drawer,
  EmptyState,
  Pagination,
  RadioGroup,
  Rating,
  Status,
  Switch,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { samples, statusTone } from '../data';

export default function Review() {
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(samples[0]);
  const [verdict, setVerdict] = useState('pass');
  const [rating, setRating] = useState(4);
  const [note, setNote] = useState('');
  const pageSize = 4;

  const filtered = useMemo(
    () => samples.filter((item) => !onlyOpen || item.verdict !== 'Pass'),
    [onlyOpen],
  );
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  function inspect(item) {
    setActive(item);
    setVerdict(item.verdict === 'Fail' ? 'fail' : item.verdict === 'Review' ? 'review' : 'pass');
    setNote('');
    setOpen(true);
  }

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Human</span>
          <h1>Review</h1>
          <p>{filtered.length} samples · Priya Poluru and Hana Poluru still owe labels</p>
        </div>
        <Switch label="Open disagreements only" checked={onlyOpen} onChange={(_, checked) => { setOnlyOpen(checked); setPage(1); }} />
      </header>
      <Card>
        <Checkbox label="Compact rows" checked={compact} onChange={(_, checked) => setCompact(checked)} />
        {!filtered.length ? (
          <EmptyState heading="Queue is clear" description="Meera Poluru has no open disagreements." />
        ) : (
          <>
            <div className="stack" style={{ marginTop: '0.85rem' }}>
              {rows.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="run-card"
                  style={{ textAlign: 'left', cursor: 'pointer', padding: compact ? '0.55rem 0.75rem' : undefined }}
                  onClick={() => inspect(item)}
                >
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong>{item.id}</strong>
                    <Status label={item.verdict} variant={statusTone(item.verdict)} />
                  </div>
                  <p className="note">{item.prompt}</p>
                  <p className="muted">{item.model} · {item.owner}</p>
                </button>
              ))}
            </div>
            <div className="row" style={{ justifyContent: 'flex-end', marginTop: '0.85rem' }}>
              <Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
            </div>
          </>
        )}
      </Card>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        heading={active.id}
        footer={(
          <Button onClick={() => {
            setOpen(false);
            showToast({ title: 'Label saved', description: `${active.id} is filed under Meera Poluru.`, variant: 'success' });
          }}
          >
            Save label
          </Button>
        )}
      >
        <p className="note">{active.model} · {active.owner}</p>
        <Status label={active.verdict} variant={statusTone(active.verdict)} />
        <p className="note" style={{ marginTop: 12 }}><strong>Prompt.</strong> {active.prompt}</p>
        <p className="note"><strong>Predicted.</strong> {active.predicted}</p>
        <p className="note"><strong>Expected.</strong> {active.expected}</p>
        <RadioGroup
          className="mt-3"
          label="Verdict"
          orientation="horizontal"
          value={verdict}
          onChange={(_, value) => setVerdict(value)}
          options={[
            { value: 'pass', label: 'Pass' },
            { value: 'fail', label: 'Fail' },
            { value: 'review', label: 'Review' },
          ]}
        />
        <div className="row" style={{ marginTop: '0.85rem' }}>
          <span className="muted">Rater confidence</span>
          <Rating value={rating} onChange={setRating} />
        </div>
        <Textarea className="mt-3" label="Note" rows={4} value={note} placeholder="Why did Meera Poluru disagree?" onChange={(event) => setNote(event.target.value)} />
      </Drawer>
    </>
  );
}
