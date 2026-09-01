import { useMemo, useState } from 'react';
import {
  Button,
  Drawer,
  RadioGroup,
  Rating,
  Switch,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import samplesData from '../data/samples.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { ChartSection, DataTable, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function ReviewPage() {
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(samplesData.samples[0]);
  const [verdict, setVerdict] = useState('pass');
  const [rating, setRating] = useState(4);
  const [note, setNote] = useState('');

  const filtered = useMemo(
    () => samplesData.samples.filter((item) => !onlyOpen || item.verdict !== 'Pass'),
    [onlyOpen],
  );

  function inspect(item) {
    setActive(item);
    setVerdict(item.verdict === 'Fail' ? 'fail' : item.verdict === 'Review' ? 'review' : 'pass');
    setNote('');
    setOpen(true);
  }

  return (
    <div className="prism-page">
      <PageHeader
        title="Review"
        description={`${filtered.length} samples · Priya Poluru and Hana Poluru still owe labels.`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Review' }]}
        actions={
          <Switch
            label="Open disagreements only"
            checked={onlyOpen}
            onChange={(_, checked) => setOnlyOpen(checked)}
          />
        }
      />

      <ChartSection title="Human review queue" subtitle="Pass, fail, or send back to a judge">
        <DataTable
          rows={filtered}
          emptyTitle="Queue is clear"
          emptyDescription="Meera Poluru has no open disagreements."
          onRowClick={inspect}
          rowClassName={(row) => (row.verdict === 'Fail' ? 'is-severe' : row.verdict === 'Review' ? 'is-attention' : '')}
          columns={[
            { key: 'id', label: 'Sample', className: 'prism-mono' },
            { key: 'prompt', label: 'Prompt' },
            { key: 'model', label: 'Model' },
            { key: 'owner', label: 'Owner' },
            {
              key: 'verdict',
              label: 'Verdict',
              render: (value) => <StatusBadge status={value} />,
            },
          ]}
        />
      </ChartSection>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        heading={active.id}
        footer={(
          <Button
            onClick={() => {
              setOpen(false);
              showToast({
                title: 'Label saved',
                description: `${active.id} is filed under Meera Poluru.`,
                variant: 'success',
              });
            }}
          >
            Save label
          </Button>
        )}
      >
        <p className="prism-note">{active.model} · {active.owner} · {active.suite}</p>
        <StatusBadge status={active.verdict} />
        <p className="prism-drawer-copy"><strong>Prompt.</strong> {active.prompt}</p>
        <p className="prism-drawer-copy"><strong>Predicted.</strong> {active.predicted}</p>
        <p className="prism-drawer-copy"><strong>Expected.</strong> {active.expected}</p>
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
        <div className="prism-stat-foot" style={{ marginTop: '0.85rem' }}>
          <span className="prism-note">Rater confidence</span>
          <Rating value={rating} onChange={setRating} />
        </div>
        <Textarea
          className="mt-3"
          label="Note"
          rows={4}
          value={note}
          placeholder="Why did Meera Poluru disagree?"
          onChange={(event) => setNote(event.target.value)}
        />
      </Drawer>
    </div>
  );
}
