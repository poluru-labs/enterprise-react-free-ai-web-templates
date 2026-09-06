import { useMemo, useState } from 'react';
import {
  Button,
  Drawer,
  FileUpload,
  RadioGroup,
  Search,
  Select,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import approvals from '../data/approvals.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import {
  DataTable,
  FilterBar,
  PageHeader,
  StatusBadge,
} from '../components/widgets/index.js';

export default function ApprovalsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);
  const [decision, setDecision] = useState('approve');
  const [note, setNote] = useState('');

  const rows = useMemo(() => {
    let next = searchRecords(approvals, query, ['title', 'model', 'requester', 'id']);
    if (status !== 'all') {
      next = next.filter((item) => String(item.status).toLowerCase().replace(/[\s-]+/g, '_') === status);
    }
    return next;
  }, [query, status]);

  const decide = () => {
    showToast({
      title: decision === 'approve' ? 'Approved' : 'Returned',
      description: `${selected?.id} · ${note || 'No note'}`,
      variant: decision === 'approve' ? 'success' : 'warning',
    });
    setSelected(null);
    setNote('');
  };

  return (
    <div className="gov-page">
      <PageHeader
        title="Approvals"
        description="Change requests waiting on a named approver."
        crumbs={[BREADCRUMB_ROOT, { label: 'Approvals' }]}
      />

      <FilterBar
        onReset={() => {
          setQuery('');
          setStatus('all');
        }}
        search={
          <Search
            size="sm"
            placeholder="Search requests"
            value={query}
            onChange={(_, value) => setQuery(value)}
          />
        }
      >
        <Select
          label="Status"
          size="sm"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={[
            { value: 'all', label: 'All' },
            { value: 'pending', label: 'Pending' },
            { value: 'in_review', label: 'In review' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' },
          ]}
        />
      </FilterBar>

      <section className="gov-panel">
        <div className="gov-panel-body" style={{ paddingTop: '1rem' }}>
          <DataTable
            rows={rows}
            onRowClick={setSelected}
            columns={[
              { key: 'id', label: 'ID', render: (value) => <span className="gov-mono">{value}</span> },
              { key: 'title', label: 'Request' },
              { key: 'model', label: 'System' },
              { key: 'requester', label: 'Requester' },
              {
                key: 'status',
                label: 'Status',
                render: (value) => <StatusBadge status={value} />,
              },
              {
                key: 'submitted',
                label: 'Submitted',
                render: (value) => formatDateTime(value),
              },
            ]}
          />
        </div>
      </section>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected ? selected.id : 'Approval'}
        size="md"
        footer={
          selected ? (
            <>
              <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
              <Button onClick={decide}>Record decision</Button>
            </>
          ) : null
        }
      >
        {selected ? (
          <div className="gov-form-stack">
            <p className="gov-note">{selected.title}</p>
            <p className="gov-subtle">{selected.model} · {selected.requester} → {selected.approver}</p>
            <RadioGroup
              label="Decision"
              name="decision"
              value={decision}
              onChange={(_, value) => setDecision(value)}
              options={[
                { value: 'approve', label: 'Approve' },
                { value: 'return', label: 'Return for evidence' },
              ]}
            />
            <Textarea
              label="Note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Optional reviewer note"
            />
            <FileUpload
              label="Evidence pack"
              hint="PDF or zip, mock only"
              onChange={() => showToast({ title: 'File attached', variant: 'info' })}
            />
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
