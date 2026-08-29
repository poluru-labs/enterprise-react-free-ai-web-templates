import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Drawer,
  EmptyState,
  Pagination,
  Search,
  Select,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { statusVariant, traces } from '../data';

export default function TracesPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(traces[0]);
  const pageSize = 5;

  useEffect(() => {
    const exportTraces = () => showToast({ title: 'Export started', description: 'CSV will land with Kavya Poluru.', variant: 'info' });
    window.addEventListener('llm:export-traces', exportTraces);
    return () => window.removeEventListener('llm:export-traces', exportTraces);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return traces.filter((item) => {
      const hay = `${item.id} ${item.model} ${item.user}`.toLowerCase();
      const statusOk = status === 'all' || item.status === status;
      return hay.includes(q) && statusOk;
    });
  }, [query, status]);

  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  function inspect(item) {
    setActive(item);
    setOpen(true);
  }

  return (
    <>
      <Card padded={false}>
        <div className="llm-card-heading">
          <div>
            <h2>Live traces</h2>
            <p>Inspect latency, tokens, and failures</p>
          </div>
          <Button size="sm" variant="secondary" icon="download" onClick={() => showToast({ title: 'Export started', description: 'CSV will land with Kavya Poluru.', variant: 'info' })}>Export</Button>
        </div>
        <div className="llm-toolbar" style={{ padding: '0 22px' }}>
          <Search value={query} placeholder="Search traces" onChange={(_, value) => { setQuery(value); setPage(1); }} />
          <Select
            value={status}
            onChange={(event) => { setStatus(event.target.value); setPage(1); }}
            options={[
              { value: 'all', label: 'All statuses' },
              { value: 'ok', label: 'OK' },
              { value: 'warn', label: 'Watch' },
              { value: 'error', label: 'Error' },
            ]}
          />
        </div>
        {!filtered.length ? (
          <EmptyState heading="No traces match" description="Clear filters or wait for the next Aurora call." />
        ) : (
          <>
            <div className="llm-table-wrap">
              <table className="llm-table">
                <thead>
                  <tr><th>Trace</th><th>Model</th><th>Caller</th><th>Latency</th><th>Tokens</th><th>When</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {rows.map((item) => (
                    <tr key={item.id} className="llm-click-row" onClick={() => inspect(item)}>
                      <td><strong>{item.id}</strong></td>
                      <td>{item.model}</td>
                      <td>{item.user}</td>
                      <td>{item.latency}ms</td>
                      <td>{item.tokens}</td>
                      <td>{item.when}</td>
                      <td><Status label={item.status} variant={statusVariant(item.status)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="llm-footer-row">
              <span className="llm-muted">{filtered.length} traces in this window</span>
              <Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
            </div>
          </>
        )}
      </Card>
      <Drawer open={open} onOpenChange={setOpen} heading={active.id} footer={<Button onClick={() => setOpen(false)}>Close</Button>}>
        <p className="llm-muted">{active.model} · {active.user}</p>
        <Status label={active.status} variant={statusVariant(active.status)} />
        <p className="note" style={{ marginTop: 12 }}>{active.latency}ms · {active.tokens} tokens · {active.when}</p>
        <p className="note">Priya Poluru’s timeout on Aurora is the only error in this window.</p>
        <Button className="mt-3" size="sm" variant="secondary" icon="copy" onClick={() => showToast({ title: 'Trace copied', description: `${active.id} is on the clipboard.`, variant: 'info' })}>Copy id</Button>
      </Drawer>
    </>
  );
}
