import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Button,
  DescriptionList,
  Drawer,
  Search,
  Select,
  Textarea,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import queueData from '../data/queue.json';
import { BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { formatDuration, formatNumber, formatPercent } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { statusLabel } from '../lib/status.js';
import {
  ChartSection,
  DataTable,
  FilterBar,
  PageHeader,
  SeverityBadge,
  SlaBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

const SOURCE_OPTIONS = [
  { label: 'All sources', value: 'all' },
  { label: 'UGC', value: 'ugc' },
  { label: 'Ads', value: 'ads' },
  { label: 'Comments', value: 'comments' },
  { label: 'Livestream', value: 'livestream' },
];

const SEVERITY_OPTIONS = [
  { label: 'All severities', value: 'all' },
  { label: 'Critical', value: 'critical' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
];

const ASSIGNEE_OPTIONS = [
  { label: 'Anyone', value: 'all' },
  { label: 'Unassigned', value: 'Unassigned' },
  ...queueData.reviewers.map((person) => ({ label: person.name, value: person.name })),
];

export default function QueuePage() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState(queueData.items);
  const [source, setSource] = useState('all');
  const [severity, setSeverity] = useState('all');
  const [assignee, setAssignee] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    const focusId = params.get('focus');
    if (!focusId) return;
    const match = items.find((item) => item.id === focusId);
    if (match) {
      setSelected({
        ...match,
        assignee: match.assignee === 'Unassigned' ? SIGNED_IN_USER.name : match.assignee,
        status: match.assignee === 'Unassigned' ? 'assigned' : match.status,
      });
    }
  }, [params, items]);

  const rows = useMemo(() => {
    const filtered = items.filter((item) => {
      const matchesSource = source === 'all' || item.source === source;
      const matchesSeverity = severity === 'all' || item.severity === severity;
      const matchesAssignee = assignee === 'all' || item.assignee === assignee;
      return matchesSource && matchesSeverity && matchesAssignee;
    });
    return searchRecords(filtered, query, ['id', 'title', 'snippet', 'category', 'assignee', 'reporter']);
  }, [items, source, severity, assignee, query]);

  const closeCase = (decision) => {
    if (!selected) return;
    const labels = { approved: 'Approved', rejected: 'Rejected', escalated: 'Escalated' };
    showToast({
      title: `${labels[decision]} ${selected.id}`,
      description: note.trim() || selected.title,
      variant: decision === 'approved' ? 'success' : decision === 'rejected' ? 'warning' : 'info',
    });
    setItems((current) => current.filter((item) => item.id !== selected.id));
    setSelected(null);
    setNote('');
    if (params.get('focus')) {
      params.delete('focus');
      setParams(params, { replace: true });
    }
  };

  return (
    <div className="cmb-page">
      <PageHeader
        title="Review queue"
        description="Filter by severity, source, and assignee. Open a row to approve, reject, or escalate."
        crumbs={[BREADCRUMB_ROOT, { label: 'Queue' }]}
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Pending" value={formatNumber(queueData.summary.pending)} hint="Sampled live slice below" icon="bi-inbox" tone="warning" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Unassigned" value={formatNumber(items.filter((item) => item.assignee === 'Unassigned').length)} hint="Claim with Assign next" icon="bi-person-plus" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Critical" value={formatNumber(items.filter((item) => item.severity === 'critical').length)} hint="Dual-review eligible" icon="bi-exclamation-octagon" tone="danger" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Median age" value={formatDuration(queueData.summary.medianAgeMinutes)} hint="Human SLA 30m" icon="bi-hourglass-split" tone="brand" />
        </div>
      </div>

      <FilterBar
        search={
          <Search
            placeholder="Search id, title, reporter, assignee"
            value={query}
            onChange={(_, value) => setQuery(value)}
            onClear={() => setQuery('')}
            clearable
          />
        }
        onReset={() => {
          setSource('all');
          setSeverity('all');
          setAssignee('all');
          setQuery('');
        }}
      >
        <Select label="Source" options={SOURCE_OPTIONS} value={source} onChange={(event) => setSource(event.target.value)} />
        <Select label="Severity" options={SEVERITY_OPTIONS} value={severity} onChange={(event) => setSeverity(event.target.value)} />
        <Select label="Assignee" options={ASSIGNEE_OPTIONS} value={assignee} onChange={(event) => setAssignee(event.target.value)} />
      </FilterBar>

      <ChartSection title={`${rows.length} items`} subtitle="Click a row to take an action">
        <DataTable
          rows={rows}
          onRowClick={setSelected}
          rowClassName={(row) => (row.sla === 'breach' ? 'is-severe' : row.severity === 'critical' ? 'is-attention' : '')}
          columns={[
            { key: 'id', label: 'Case', className: 'cmb-mono' },
            { key: 'title', label: 'Title' },
            {
              key: 'category',
              label: 'Category',
              render: (value) => statusLabel(value),
            },
            { key: 'source', label: 'Source' },
            {
              key: 'severity',
              label: 'Severity',
              render: (value) => <SeverityBadge severity={value} />,
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            { key: 'assignee', label: 'Assignee' },
            {
              key: 'ageMinutes',
              label: 'Age',
              render: (value) => formatDuration(value),
            },
            {
              key: 'sla',
              label: 'SLA',
              render: (value) => <SlaBadge sla={value} />,
            },
          ]}
        />
      </ChartSection>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
            setNote('');
          }
        }}
        heading={selected?.id || 'Case'}
        size="lg"
      >
        {selected ? (
          <div>
            <p className="cmb-drawer-lead">{selected.title}</p>
            <p className="cmb-drawer-copy">{selected.snippet}</p>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <SeverityBadge severity={selected.severity} />
              <StatusBadge status={selected.status} />
              <SlaBadge sla={selected.sla} />
            </div>
            <DescriptionList
              items={[
                { term: 'Source', description: statusLabel(selected.source) },
                { term: 'Category', description: statusLabel(selected.category) },
                { term: 'Assignee', description: selected.assignee },
                { term: 'Reporter', description: selected.reporter },
                { term: 'Age', description: formatDuration(selected.ageMinutes) },
                { term: 'Model score', description: formatPercent(selected.score * 100, 0) },
                { term: 'Locale', description: selected.locale },
              ]}
            />
            <div className="mt-3">
              <Textarea
                label="Decision note"
                placeholder="Why this action?"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
              />
            </div>
            <div className="cmb-drawer-actions">
              <Button variant="secondary" onClick={() => closeCase('approved')}>
                Approve
              </Button>
              <Button variant="danger" onClick={() => closeCase('rejected')}>
                Reject
              </Button>
              <Button onClick={() => closeCase('escalated')}>Escalate</Button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
