import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  ButtonGroup,
  DataTable,
  DescriptionList,
  Modal,
  Select,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import reviews from '../data/reviews.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { REVIEW_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function ReviewsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [reviewStatus, setReviewStatus] = useState('Open');

  const filtered = useMemo(() => {
    if (band === 'all') return reviews;
    return reviews.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      reviewer: row.reviewer,
      queryId: row.queryId,
      verdict: row.verdict,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  const openCount = reviews.filter((row) => row.status === 'Open').length;

  return (
    <div className="rq-page">
      <PageHeader
        title="Review queue"
        description="Human spot checks on retrieval results. Priya Poluru owns assignments."
        crumbs={[BREADCRUMB_ROOT, { label: 'Review queue' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Log review
          </Button>
        }
      />

      <DescriptionList
        compact
        items={[
          { term: 'Open reviews', description: String(openCount) },
          { term: 'Review desk', description: 'Priya Poluru' },
          { term: 'Escalations', description: 'Nina Poluru' },
        ]}
      />

      <ButtonGroup size="sm" className="rq-button-group">
        {[
          ['all', 'All'],
          ['Open', 'Open'],
          ['Approved', 'Approved'],
          ['Rejected', 'Rejected'],
          ['Escalated', 'Escalated'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="rq-panel">
        <h2>Active reviews</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Review' },
            { key: 'reviewer', label: 'Reviewer' },
            { key: 'queryId', label: 'Query' },
            { key: 'verdict', label: 'Verdict' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Lead' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={`${row.id} · ${row.name}`}>
            <div className="rq-segment-meta">
              <Badge label={row.status} variant={REVIEW_STATUS[row.status] ?? 'neutral'} soft size="sm" />
              <span>{row.queryId}</span>
              <span>{row.verdict}</span>
            </div>
            <p className="rq-copy">
              {row.reviewer} · Updated {formatDateTime(row.updated)} · Lead {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Log review note"
        footer={
          <Button
            onClick={() => {
              showToast({ title: 'Review saved', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <div className="rq-stack">
          <Textarea
            label="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Top hit mismatched intent — re-rank candidate"
          />
          <Select
            label="Status"
            value={reviewStatus}
            onChange={setReviewStatus}
            options={[
              { label: 'Open', value: 'Open' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Rejected', value: 'Rejected' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
