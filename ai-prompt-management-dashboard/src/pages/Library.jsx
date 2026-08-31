import { useMemo, useState } from 'react';
import {
  Autocomplete,
  Badge,
  Button,
  Card,
  DataTable,
  DateRangePicker,
  EmptyState,
  MenuItem,
  Pagination,
  Popover,
  SplitButton,
  Status,
  Tag,
  Toolbar,
} from '@poluru-labs/enterprise-design-system-react';
import { prompts, statusVariant } from '../data';

export default function Library() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [range, setRange] = useState({ start: '2026-08-01', end: '2026-08-30' });
  const [legendOpen, setLegendOpen] = useState(false);
  const [tags, setTags] = useState(['Live', 'Production']);
  const pageSize = 5;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return prompts.filter((item) => !q || item.name.toLowerCase().includes(q) || item.owner.toLowerCase().includes(q));
  }, [search]);

  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <Toolbar
        className="page-toolbar"
        start={(
          <div>
            <p className="eyebrow">Catalog</p>
            <h1>Library</h1>
          </div>
        )}
        end={(
          <SplitButton label="New prompt" size="sm" onClick={() => window.dispatchEvent(new Event('bureau:create'))}>
            <MenuItem value="blank" label="Blank prompt" />
            <MenuItem value="clone" label="Clone live" />
            <MenuItem value="import" label="Import JSON" />
          </SplitButton>
        )}
      />

      <section className="stack">
      <Card elevated>
        <div className="card-body">
          <div className="filter-bar">
            <Autocomplete
              label="Find a prompt"
              placeholder="Support copilot"
              suggestions={prompts.map((item) => item.name)}
              value={search}
              onChange={setSearch}
            />
            <DateRangePicker
              label="Last published"
              startValue={range.start}
              endValue={range.end}
              onChange={(start, end) => setRange({ start, end })}
            />
            <Popover open={legendOpen} onOpenChange={setLegendOpen} heading="Status legend" placement="bottom" trigger={<Button variant="secondary" size="sm" icon="info">Legend</Button>}>
              <p className="muted">Live serves production. Review holds ACLs. Failed needs a re-eval.</p>
            </Popover>
          </div>
          <div className="chips chips-row">
            {tags.map((tag) => (
              <Tag key={tag} label={tag} variant="brand" dismissible onDismiss={() => setTags((items) => items.filter((item) => item !== tag))} />
            ))}
            <Badge label={`${filtered.length} prompts`} variant="neutral" soft pill />
          </div>
          {rows.length === 0 ? (
            <EmptyState heading="No prompts match" description="Clear filters or create a new prompt." actions={<Button size="sm" onClick={() => setSearch('')}>Clear search</Button>} />
          ) : (
            <>
              <div className="table-wrap">
                <DataTable
                  striped
                  sortable
                  columns={[
                    { key: 'name', label: 'Prompt', sortable: true },
                    { key: 'owner', label: 'Owner', sortable: true },
                    { key: 'version', label: 'Version' },
                    { key: 'env', label: 'Env' },
                    { key: 'score', label: 'Score', sortable: true },
                    { key: 'status', label: 'Status' },
                  ]}
                  rows={rows}
                />
              </div>
              <div className="pager">
                <Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
              </div>
            </>
          )}
        </div>
      </Card>
      </section>

      <section className="grid-3 gap-top">
        {prompts.slice(0, 3).map((item) => (
          <Card key={item.name} elevated>
            <div className="card-body">
              <div className="section-head">
                <h3>{item.name}</h3>
                <Status label={item.status} variant={statusVariant(item.status)} />
              </div>
              <p className="meta">{item.family} · {item.version} · {item.score}</p>
              <p className="meta">Owner {item.owner}</p>
              <Tag label={item.env} variant="info" />
            </div>
          </Card>
        ))}
      </section>
    </>
  );
}
