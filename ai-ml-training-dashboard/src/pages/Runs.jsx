import { useMemo, useState } from 'react';
import {
  Button,
  Card,
  DataTable,
  EmptyState,
  Pagination,
  Search,
  Select,
  Status,
  Tag,
} from '@poluru-labs/enterprise-design-system-react';
import { ownerOptions, runColumns, runs, statusTone } from '../data';

export default function Runs({ query = '', onLaunch }) {
  const [localQuery, setLocalQuery] = useState(query);
  const [status, setStatus] = useState('all');
  const [owner, setOwner] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    return runs.filter((run) => {
      const hay = `${run.name} ${run.experiment} ${run.owner}`.toLowerCase();
      const statusOk = status === 'all' || run.status === status;
      const ownerOk = owner === 'all' || run.owner.toLowerCase().includes(owner);
      return hay.includes(q) && statusOk && ownerOk;
    });
  }, [localQuery, status, owner]);

  const rows = filtered.slice((page - 1) * pageSize, page * pageSize).map((run) => ({
    name: run.name,
    experiment: run.experiment,
    owner: run.owner,
    status: run.status,
    gpu: run.gpu,
    eta: run.eta,
    id: run.id,
  }));

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Jobs</span>
          <h1>Runs</h1>
          <p>{filtered.length} jobs · Kavya Poluru’s queue first</p>
        </div>
        <Button icon="plus" onClick={onLaunch}>Launch run</Button>
      </header>
      <Card>
        <div className="row" style={{ marginBottom: '0.85rem' }}>
          <div style={{ flex: 1, minWidth: '16rem' }}>
            <Search value={localQuery} placeholder="Search runs" onChange={(_, value) => { setLocalQuery(value); setPage(1); }} />
          </div>
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            options={[
              { value: 'all', label: 'All statuses' },
              { value: 'Running', label: 'Running' },
              { value: 'Queued', label: 'Queued' },
              { value: 'Succeeded', label: 'Succeeded' },
              { value: 'Failed', label: 'Failed' },
            ]}
          />
          <Select
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
            options={[{ value: 'all', label: 'All owners' }, ...ownerOptions]}
          />
        </div>
        {!filtered.length ? (
          <EmptyState heading="No matching runs" description="Clear filters or launch a new job." actions={<Button size="sm" onClick={onLaunch}>Launch run</Button>} />
        ) : (
          <>
            <DataTable columns={runColumns} rows={rows} sortable striped />
            <div className="row" style={{ justifyContent: 'space-between', marginTop: '0.85rem' }}>
              <div className="row">
                {rows.map((run) => (
                  <Tag key={run.id} label={run.name} variant="brand" />
                ))}
              </div>
              <Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
            </div>
            <div className="stack" style={{ marginTop: '0.85rem' }}>
              {rows.map((run) => (
                <a key={run.id} className="run-card" href={`#/run/${run.id}`}>
                  <strong>{run.name}</strong>
                  <span className="muted">{run.owner} · {run.experiment}</span>
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
