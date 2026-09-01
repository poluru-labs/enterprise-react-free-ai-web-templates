import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Autocomplete,
  Button,
  Combobox,
  DatePicker,
  Divider,
  Drawer,
  FileUpload,
  Input,
  Modal,
  NumberInput,
  Select,
  Slider,
  Textarea,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { BASE_PATH } from '../../constants/navigation.js';
import clusters from '../../data/clusters.json';
import settings from '../../data/settings.json';
import { DashboardNavbar } from './DashboardNavbar.jsx';
import { DashboardSidebar } from './DashboardSidebar.jsx';

const clusterOptions = clusters.items.map((item) => ({ value: item.id, label: item.name }));

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [runOpen, setRunOpen] = useState(false);
  const [datasetOpen, setDatasetOpen] = useState(false);
  const [runName, setRunName] = useState('');
  const [owner, setOwner] = useState('Kavya Poluru');
  const [cluster, setCluster] = useState('c_west');
  const [epochs, setEpochs] = useState(20);
  const [lr, setLr] = useState(3);
  const [startDate, setStartDate] = useState('2026-08-28');
  const [startTime, setStartTime] = useState('22:00');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const onLaunch = () => setRunOpen(true);
  const onUpload = () => setDatasetOpen(true);

  function launchRun() {
    if (!runName.trim()) {
      showToast({ title: 'Name required', description: 'Give the job a run name first.', variant: 'warning' });
      return;
    }
    const clusterLabel = clusterOptions.find((item) => item.value === cluster)?.label || cluster;
    setRunOpen(false);
    showToast({
      title: 'Run queued',
      description: `${runName} will start on ${clusterLabel} for ${owner}.`,
      variant: 'success',
    });
    setRunName('');
    navigate(`${BASE_PATH}/runs`);
  }

  return (
    <div className="kiln-shell">
      <a className="kiln-skip" href="#main">
        Skip to content
      </a>
      <DashboardSidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      {sidebarOpen ? (
        <button
          type="button"
          className="kiln-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <div className="kiln-main">
        <DashboardNavbar
          onMenuToggle={() => setSidebarOpen((open) => !open)}
          onLaunch={onLaunch}
          onUpload={onUpload}
        />
        <div className="kiln-content" id="main">
          <Outlet context={{ onLaunch, onUpload }} />
        </div>
      </div>

      <Modal
        open={runOpen}
        onOpenChange={setRunOpen}
        heading="Launch training run"
        footer={
          <>
            <Button variant="secondary" onClick={() => setRunOpen(false)}>
              Cancel
            </Button>
            <Button onClick={launchRun}>Queue run</Button>
          </>
        }
      >
        <div className="kiln-form-grid">
          <Input
            className="full"
            label="Run name"
            value={runName}
            placeholder="harbor-encoder-v4"
            onChange={(event) => setRunName(event.target.value)}
          />
          <Autocomplete
            label="Owner"
            value={owner}
            suggestions={settings.owners.map((item) => item.label)}
            onChange={setOwner}
          />
          <Combobox label="Cluster" value={cluster} options={clusterOptions} onChange={setCluster} />
          <NumberInput label="Epochs" value={epochs} min={1} max={200} onChange={(_, value) => setEpochs(value)} />
          <Slider label="Learning rate ×1e-4" min={1} max={10} value={lr} showValue onChange={(_, value) => setLr(value)} />
          <DatePicker label="Start date" value={startDate} onChange={setStartDate} />
          <TimePicker label="Start time" value={startTime} onChange={(_, value) => setStartTime(value)} />
          <Textarea
            className="full"
            label="Notes"
            value={notes}
            placeholder="What is Kavya Poluru optimizing?"
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
      </Modal>

      <Drawer
        open={datasetOpen}
        onOpenChange={setDatasetOpen}
        heading="Upload dataset"
        footer={
          <Button
            onClick={() => {
              setDatasetOpen(false);
              showToast({
                title: 'Dataset queued',
                description: 'Hana Poluru will review labels before mix-in.',
                variant: 'success',
              });
            }}
          >
            Save draft
          </Button>
        }
      >
        <div className="kiln-stack">
          <Select label="Owner" options={settings.owners} defaultValue="hana" />
          <FileUpload
            label="Parquet or JSONL"
            accept=".parquet,.jsonl"
            multiple
            hint="Gold labels stay with Hana Poluru"
          />
          <Divider />
          <p className="kiln-note">Kiln checksums files before they land in train/val splits.</p>
        </div>
      </Drawer>
    </div>
  );
}
