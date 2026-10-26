import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  ButtonGroup,
  Combobox,
  DataTable,
  DatePicker,
  Input,
  MenuItem,
  Modal,
  ProgressBar,
  Slider,
  SplitButton,
  Status,
  formatDisplayDate,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import reviews from '../data/reviews.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime, formatPercent } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { REVIEW_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const REGIONS = [
  { label: 'Americas', value: 'americas' },
  { label: 'EMEA', value: 'emea' },
  { label: 'APAC', value: 'apac' },
  { label: 'LATAM', value: 'latam' },
];

export default function ReviewsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('americas');
  const [ends, setEnds] = useState('2026-10-24');
  const [priority, setPriority] = useState(50);

  const filtered = useMemo(() => {
    if (band === 'all') return reviews;
    return reviews.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      locale: row.locale,
      words: row.words,
      score: row.score,
      dueInDays: row.dueInDays,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const create = (draft) => {
    if (!name.trim()) {
      showToast({ title: 'Name the review', variant: 'warning' });
      return;
    }
    showToast({
      title: draft ? 'Draft saved' : 'Review opened',
      description: `${name.trim()} · Leela Poluru`,
      variant: 'success',
    });
    setOpen(false);
    setName('');
  };

  return (
    <div className="trn-page">
      <PageHeader
        title="Reviews"
        description="Linguist QA, scores, and sign-off. Leela Poluru reviews rejections on weekdays."
        crumbs={[BREADCRUMB_ROOT, { label: 'Reviews' }]}
        actions={
          <SplitButton
            label="New review"
            size="sm"
            onClick={() => setOpen(true)}
            onSelect={({ value }) => {
              if (value === 'draft') showToast({ title: 'Draft parked', variant: 'info' });
              if (value === 'start') setOpen(true);
            }}
          >
            <MenuItem label="Publish now" value="start" />
            <MenuItem label="Save as draft" value="draft" />
          </SplitButton>
        }
      />

      <Alert
        variant="warning"
        title="Reviews spike"
        message="FAQ fr-FR queue grew overnight. Nina Poluru is pairing with Leela Poluru."
        dismissible
      />

      <ButtonGroup size="sm" className="trn-button-group">
        {[
          ['all', 'All'],
          ['In progress', 'In progress'],
          ['Open', 'Open'],
          ['Approved', 'Approved'],
          ['Rejected', 'Rejected'],
        ].map(([value, label]) => (
          <Button
            key={value}
            variant={band === value ? 'primary' : 'secondary'}
            onClick={() => setBand(value)}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="trn-panel">
        <h2>Review board</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Review' },
            { key: 'locale', label: 'Locale' },
            { key: 'words', label: 'Words' },
            { key: 'score', label: 'Score' },
            { key: 'dueInDays', label: 'Due (d)' },
            { key: 'status', label: 'Status' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={row.name}>
            <div className="trn-segment-meta">
              <Status label={row.status} variant={REVIEW_STATUS[row.status] ?? 'neutral'} />
              <span>{row.owner}</span>
              <span>Updated {formatDisplayDate(row.updated.slice(0, 10))}</span>
            </div>
            <p className="trn-copy">
              {row.locale} · {row.words}
              {row.dueInDays > 0 ? ` · ${row.dueInDays} days due` : ''}
            </p>
            <div className="trn-meter-row">
              <div className="trn-meter-label">
                <span>Score</span>
                <strong>{formatPercent(row.score, 1)}</strong>
              </div>
              <ProgressBar value={Math.min(Math.abs(row.score) * 5, 100)} max={100} showValue />
            </div>
            <p className="trn-copy trn-drawer-note">Last sync {formatDateTime(row.updated)}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="New review"
        footer={
          <div className="trn-drawer-actions">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => create(true)}>
              Save draft
            </Button>
            <Button onClick={() => create(false)}>Create</Button>
          </div>
        }
      >
        <div className="trn-stack">
          <Input
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Checkout QA pass"
          />
          <Combobox label="Region" value={region} options={REGIONS} onChange={setRegion} />
          <DatePicker
            label="Target date"
            value={ends}
            min="2026-10-22"
            max="2026-12-31"
            onChange={setEnds}
          />
          <Slider
            label="Priority"
            min={10}
            max={100}
            step={10}
            value={priority}
            showValue
            onChange={(_, value) => setPriority(value)}
          />
        </div>
      </Modal>
    </div>
  );
}
