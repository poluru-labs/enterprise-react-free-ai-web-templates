import { useMemo, useState } from 'react';
import {
  Badge,
  Card,
  DataTable,
  EmptyState,
  Pagination,
  Search,
  Select,
  Status,
  Tag,
} from '@poluru-labs/enterprise-design-system-react';
import { leaderboardColumns, models, ownerOptions, statusTone } from '../data';

export default function Leaderboard({ query = '' }) {
  const [localQuery, setLocalQuery] = useState(query);
  const [status, setStatus] = useState('all');
  const [owner, setOwner] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const ranked = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    return [...models]
      .filter((item) => {
        const hay = `${item.name} ${item.owner} ${item.provider}`.toLowerCase();
        const statusOk = status === 'all' || item.status === status;
        const ownerOk = owner === 'all' || item.owner.toLowerCase().includes(owner);
        return hay.includes(q) && statusOk && ownerOk;
      })
      .sort((a, b) => b.score - a.score);
  }, [localQuery, status, owner]);

  const rows = ranked.slice((page - 1) * pageSize, page * pageSize).map((item, index) => ({
    rank: String((page - 1) * pageSize + index + 1),
    name: item.name,
    owner: item.owner,
    safety: item.safety.toFixed(1),
    ground: item.ground.toFixed(1),
    accuracy: item.accuracy.toFixed(1),
    score: item.score.toFixed(1),
    status: item.status,
  }));

  return (
    <>
      <header className="page-head">
        <div className="hero-copy">
          <span className="eyebrow">Rank</span>
          <h1>Leaderboard</h1>
          <p>{ranked.length} models · Nova leads · Meera Poluru’s index</p>
        </div>
        <Badge label="Index 91.2" variant="brand" pill />
      </header>
      <Card>
        <div className="filters">
          <div>
            <Search value={localQuery} placeholder="Search models or owners" onChange={(_, value) => { setLocalQuery(value); setPage(1); }} />
          </div>
          <div style={{ minWidth: '11rem' }}>
            <Select
              value={status}
              onChange={(event) => { setStatus(event.target.value); setPage(1); }}
              options={[
                { value: 'all', label: 'All statuses' },
                { value: 'Production', label: 'Production' },
                { value: 'Review', label: 'Review' },
                { value: 'Candidate', label: 'Candidate' },
                { value: 'Tuning', label: 'Tuning' },
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
        {!ranked.length ? (
          <EmptyState heading="No models match" description="Clear filters or try Meera Poluru." />
        ) : (
          <>
            <DataTable columns={leaderboardColumns} rows={rows} sortable striped />
            <div className="row" style={{ justifyContent: 'space-between', marginTop: '0.85rem' }}>
              <div className="row">
                {ranked.slice(0, 3).map((item) => (
                  <Tag key={item.id} label={item.name} variant="brand" />
                ))}
              </div>
              <Pagination page={page} pageSize={pageSize} total={ranked.length} onChange={setPage} />
            </div>
            <div className="stack" style={{ marginTop: '0.85rem' }}>
              {ranked.slice(0, 3).map((item) => (
                <div key={item.id} className="run-card">
                  <strong>{item.name}</strong>
                  <span className="muted">{item.owner} · {item.provider} · {item.score}</span>
                  <Status label={item.status} variant={statusTone(item.status)} />
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </>
  );
}
