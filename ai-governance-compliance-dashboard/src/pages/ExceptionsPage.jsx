import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Button,
  DataTable as EdsDataTable,
  Input,
  Modal,
  Select,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import exceptions from '../data/exceptions.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { DataTable, PageHeader, SeverityBadge, StatusBadge } from '../components/widgets/index.js';

export default function ExceptionsPage() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('Maya Poluru');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('new') === '1') setOpen(true);
  }, [location.search]);

  const summaryRows = useMemo(
    () =>
      exceptions.map((item) => ({
        id: item.id,
        title: item.title,
        owner: item.owner,
        status: item.status,
        expires: item.expires,
      })),
    [],
  );

  return (
    <div className="gov-page">
      <PageHeader
        title="Exceptions"
        description="Time-boxed waivers. EXP-12 expires this week."
        crumbs={[BREADCRUMB_ROOT, { label: 'Exceptions' }]}
        actions={
          <Button size="sm" icon="plus" onClick={() => setOpen(true)}>
            Request exception
          </Button>
        }
      />

      <section className="gov-panel mb-3">
        <header className="gov-panel-header">
          <div>
            <h2>Open register</h2>
            <p>Granted, pending, and expired waivers.</p>
          </div>
        </header>
        <div className="gov-panel-body">
          <DataTable
            rows={exceptions}
            rowClassName={(row) => (row.status === 'Expired' || row.id === 'EXP-12' ? 'is-attention' : '')}
            columns={[
              { key: 'id', label: 'ID', render: (value) => <span className="gov-mono">{value}</span> },
              { key: 'title', label: 'Exception' },
              { key: 'owner', label: 'Owner' },
              { key: 'policy', label: 'Policy' },
              {
                key: 'risk',
                label: 'Risk',
                render: (value) => <SeverityBadge severity={value} />,
              },
              {
                key: 'status',
                label: 'Status',
                render: (value) => <StatusBadge status={value} />,
              },
              { key: 'expires', label: 'Expires' },
            ]}
          />
        </div>
      </section>

      <section className="gov-panel">
        <header className="gov-panel-header">
          <div>
            <h2>Compact view</h2>
            <p>Same register as a sortable table.</p>
          </div>
        </header>
        <div className="gov-panel-body">
          <EdsDataTable
            striped
            compact
            sortable
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'title', label: 'Title' },
              { key: 'owner', label: 'Owner' },
              { key: 'status', label: 'Status' },
              { key: 'expires', label: 'Expires' },
            ]}
            rows={summaryRows}
          />
        </div>
      </section>

      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Request exception"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                if (!title.trim()) {
                  showToast({ title: 'Title required', variant: 'warning' });
                  return;
                }
                setOpen(false);
                showToast({
                  title: 'Exception filed',
                  description: `${title} · ${owner}`,
                  variant: 'success',
                });
                setTitle('');
              }}
            >
              File
            </Button>
          </>
        }
      >
        <div className="gov-form-stack">
          <Input label="Title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Time-boxed waiver" />
          <Select
            label="Owner"
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
            options={[
              { value: 'Maya Poluru', label: 'Maya Poluru' },
              { value: 'Rohan Poluru', label: 'Rohan Poluru' },
              { value: 'Ishaan Poluru', label: 'Ishaan Poluru' },
              { value: 'Priya Poluru', label: 'Priya Poluru' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
