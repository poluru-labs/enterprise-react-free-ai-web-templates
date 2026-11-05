import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  Button,
  ButtonGroup,
  DataTable,
  Input,
  Modal,
  ProgressBar,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import citations from '../data/citations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { sortRows } from '../lib/sort.js';
import { CITATION_STATUS } from '../lib/status.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

export default function CitationsPage() {
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const filtered = useMemo(() => {
    if (band === 'all') return citations;
    return citations.filter((row) => row.status === band);
  }, [band]);

  const rows = useMemo(() => {
    const mapped = filtered.map((row) => ({
      name: row.name,
      fromPaper: row.fromPaper,
      toPaper: row.toPaper,
      strength: row.strength,
      status: row.status,
      owner: row.owner,
    }));
    return sortRows(mapped, sort);
  }, [filtered, sort]);

  return (
    <div className="lit-page">
      <PageHeader
        title="Citation links"
        description="Cross-paper references and strength scores. Jonah Poluru tracks integrity."
        crumbs={[BREADCRUMB_ROOT, { label: 'Citations' }]}
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            Propose link
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Broken link"
        message="CIT-512 DOI redirect failed. Priya Poluru opened curation task."
        dismissible
      />

      <ButtonGroup size="sm" className="lit-button-group">
        {[
          ['all', 'All'],
          ['Verified', 'Verified'],
          ['Proposed', 'Proposed'],
          ['Broken', 'Broken'],
          ['Disputed', 'Disputed'],
        ].map(([value, label]) => (
          <Button key={value} variant={band === value ? 'primary' : 'secondary'} onClick={() => setBand(value)}>
            {label}
          </Button>
        ))}
      </ButtonGroup>

      <section className="lit-panel">
        <h2>Link registry</h2>
        <DataTable
          sortable
          striped
          columns={[
            { key: 'name', label: 'Link' },
            { key: 'fromPaper', label: 'From' },
            { key: 'toPaper', label: 'To' },
            { key: 'strength', label: 'Strength' },
            { key: 'status', label: 'Status' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={rows}
          onSort={(key, direction) => setSort({ key, direction })}
        />
      </section>

      <Accordion>
        {filtered.map((row) => (
          <AccordionItem key={row.id} heading={row.name}>
            <div className="lit-segment-meta">
              <Status label={row.status} variant={CITATION_STATUS[row.status] ?? 'neutral'} />
              <span>{row.fromPaper}</span>
              <span>→ {row.toPaper}</span>
            </div>
            <ProgressBar value={Math.round(row.strength * 100)} max={100} showValue />
            <p className="lit-copy lit-drawer-note">
              Updated {formatDateTime(row.updated)} · {row.owner}
            </p>
          </AccordionItem>
        ))}
      </Accordion>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Propose citation link"
        footer={
          <Button
            onClick={() => {
              if (!name.trim()) {
                showToast({ title: 'Enter link label', variant: 'warning' });
                return;
              }
              showToast({ title: 'Link proposed', description: 'Jonah Poluru', variant: 'success' });
              setOpen(false);
            }}
          >
            Submit
          </Button>
        }
      >
        <Input label="Link label" value={name} onChange={(e) => setName(e.target.value)} placeholder="Author 2024 → Prior survey" />
      </Modal>
    </div>
  );
}
