import { useMemo, useState } from 'react';
import {
  Button,
  Card,
  DataTable,
  DateRangePicker,
  EmptyState,
  Pagination,
  Search,
  Select,
  Status,
} from '@poluru-labs/enterprise-design-system-react';
import { ownerOptions, runColumns, runs, statusTone } from '../data';

export default function Runs({ query = '', onRun }) {
  const [localQuery, setLocalQuery] = useState(query);
  const [status, setStatus] = useState('all');
  const [owner, setOwner] = useState('all');
  const [page, setPage] = useState(1);
  const [start, setStart] = useState('2026-08-01');
  const [end, setEnd] = useState('2026-08-29');
  const pageSize = 5;

  const filtered = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    return runs.filter((run) => {
      const hay = `${run.name} ${run.suite} ${run.owner} ${run.model}`.toLowerCase();
      const statusOk = status === 'all' || run.status === status;
      const ownerOk = owner === 'all' || run.owner.toLowerCase().includes(owner);
      return hay.includes(q) && statusOk && ownerOk;
    });
  }, [localQuery, status, owner]);

  const rows = filtered.slice((page - 1) * pageSize, page * pageSize).map((run) => ({
    name: run.name,
    suite: run.suite,
    owner: run.owner,
    model: run.model,
    status: run.status,
    score: run.score,
    id: run.id,
  }));

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Jobs</span>
          <h1>Runs</h1>
          <p>{filtered.length} evals · Meera Poluru’s queue first</p>
        </div>
        <Button icon="plus" onClick={onRun}>Run evaluation</Button>
      </header>
      <Card>
        <div className="filters">
          <div>
            <Search value={localQuery} placeholder="Search runs" onChange={(_, value) => { setLocalQuery(value); setPage(1); }} />
          </div>
          <div style={{ minWidth: '11rem' }}>
            <Select
              value={status}
              onChange={(event) => { setStatus(event.target.value); setPage(1); }}
              options={[
                { value: 'all', label: 'All statuses' },
                { value: 'Passed', label: 'Passed' },
                { value: 'Needs review', label: 'Needs review' },
                { value: 'Running', label: 'Running' },
                { value: 'Queued', label: 'Queued' },
                { value: 'Failed', label: 'Failed' },
              ]}
            />
          </div>
          <div style={{ minWidth: '11rem' }}>
            <Select
              value={owner}
              onChange={(event) => { setOwner(event.target.value); setPage(1); }}
              options={[{ value: 'all', label: 'All owners' }, ...ownerOptions]}
            />
          </div>
        </div>
        <DateRangePicker label="Window" startValue={start} endValue={end} onChange={(nextStart, nextEnd) => { setStart(nextStart); setEnd(nextEnd); }} />
        {!filtered.length ? (
          <EmptyState heading="No matching runs" description="Clear filters or queue a new eval." actions={<Button size="sm" onClick={onRun}>Run evaluation</Button>} />
        ) : (
          <>
            <div style={{ marginTop: '0.85rem' }}>
              <DataTable columns={runColumns} rows={rows} sortable striped />
            </div>
            <div className="row" style={{ justifyContent: 'space-between', marginTop: '0.85rem' }}>
              <span className="muted">{filtered.length} runs in this window</span>
              <Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
            </div>
            <div className="stack" style={{ marginTop: '0.85rem' }}>
              {rows.map((run) => (
                <a key={run.id} className="run-card" href={`#/run/${run.id}`}>
                  <strong>{run.name}</strong>
                  <span className="muted">{run.owner} · {run.suite} · {start}–{end}</span>
                  <Status label={run.status} variant={statusTone(run.status)} />
                </a>
              ))}
            </div>
          </>
        )}
      </Card>
    </>
  );
}
