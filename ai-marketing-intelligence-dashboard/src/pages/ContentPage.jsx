import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  CodeSnippet,
  Drawer,
  ProgressBar,
  Search,
  Select,
  Status,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import content from '../data/content.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { searchRecords } from '../lib/search.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

const STATUS_MAP = {
  Approved: 'success',
  'In review': 'warning',
  Draft: 'info',
  Paused: 'neutral',
};

export default function ContentPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const rows = useMemo(() => {
    let list = searchRecords(content, query, ['title', 'campaign', 'owner', 'format']);
    if (status !== 'all') list = list.filter((row) => row.status === status);
    return list;
  }, [query, status]);

  return (
    <div className="mid-page">
      <PageHeader
        title="Generated content"
        description="Variants ranked by predicted CTR. Priya Poluru signs off brand copy before launch."
        crumbs={[BREADCRUMB_ROOT, { label: 'Content' }]}
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => showToast({ title: 'Variant draft added', variant: 'success' })}
          >
            New variant
          </Button>
        }
      />

      <div className="mid-filters">
        <Search
          placeholder="Search title, campaign, or owner"
          value={query}
          clearable
          onChange={(_, value) => setQuery(value)}
          onClear={() => setQuery('')}
        />
        <Select
          label="Status"
          options={[
            { label: 'All statuses', value: 'all' },
            { label: 'Approved', value: 'Approved' },
            { label: 'In review', value: 'In review' },
            { label: 'Draft', value: 'Draft' },
            { label: 'Paused', value: 'Paused' },
          ]}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        />
      </div>

      <div className="mid-table-wrap">
        <table className="mid-table">
          <thead>
            <tr>
              <th>Variant</th>
              <th>Campaign</th>
              <th>Format</th>
              <th>Score</th>
              <th>Status</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} onClick={() => setSelected(row)}>
                <td>
                  <span className="mid-mono">{row.id}</span>
                  <strong className="mid-cell-title">{row.title}</strong>
                </td>
                <td>{row.campaign}</td>
                <td>
                  <Badge label={row.format} variant="neutral" soft size="sm" />
                </td>
                <td>
                  <div className="mid-score-cell">
                    <span>{row.score}</span>
                    <ProgressBar value={row.score} max={100} />
                  </div>
                </td>
                <td>
                  <Status label={row.status} variant={STATUS_MAP[row.status] ?? 'neutral'} />
                </td>
                <td>{row.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        heading={selected?.title ?? 'Variant'}
        size="md"
      >
        {selected ? (
          <>
            <p className="mid-copy">
              Last updated {formatDateTime(selected.updated)} · {selected.owner}
            </p>
            <CodeSnippet
              language="markdown"
              code={`# ${selected.title}\n\nCampaign: ${selected.campaign}\nFormat: ${selected.format}\nPredicted CTR score: ${selected.score}/100`}
            />
            <div className="mid-drawer-actions">
              <Button
                size="sm"
                onClick={() => showToast({ title: 'Sent to review', variant: 'success' })}
              >
                Request review
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => showToast({ title: 'Copied to clipboard', variant: 'info' })}
              >
                Copy variant
              </Button>
            </div>
          </>
        ) : null}
      </Drawer>
    </div>
  );
}
