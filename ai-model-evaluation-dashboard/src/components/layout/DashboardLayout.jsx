import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Autocomplete,
  Button,
  Combobox,
  DatePicker,
  Divider,
  Input,
  Modal,
  NumberInput,
  Select,
  Slider,
  Stepper,
  Textarea,
  TimePicker,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import { BASE_PATH } from '../../constants/navigation.js';
import modelsData from '../../data/models.json';
import suitesData from '../../data/suites.json';
import settings from '../../data/settings.json';
import { DashboardNavbar } from './DashboardNavbar.jsx';
import { DashboardSidebar } from './DashboardSidebar.jsx';

const modelOptions = modelsData.models.map((item) => ({ value: item.id, label: item.name }));
const suiteOptions = suitesData.suites.map((item) => ({ value: item.id, label: item.name }));

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('prism-sidebar') === '1');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [evalOpen, setEvalOpen] = useState(false);
  const [evalStep, setEvalStep] = useState(0);
  const [runName, setRunName] = useState('');
  const [owner, setOwner] = useState('Meera Poluru');
  const [suite, setSuite] = useState('s_safety');
  const [model, setModel] = useState('aurora');
  const [judge, setJudge] = useState('llm');
  const [samples, setSamples] = useState(200);
  const [threshold, setThreshold] = useState(90);
  const [startDate, setStartDate] = useState('2026-08-29');
  const [startTime, setStartTime] = useState('16:30');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('prism-sidebar', collapsed ? '1' : '0');
  }, [collapsed]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (searchParams.get('queue') === '1') {
      openEval();
      searchParams.delete('queue');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  function toggleSidebar() {
    if (window.matchMedia('(max-width: 991.98px)').matches) {
      setMobileOpen((open) => !open);
      return;
    }
    setCollapsed((value) => !value);
  }

  function openEval() {
    setEvalStep(0);
    setEvalOpen(true);
  }

  function queueEval() {
    if (!runName.trim()) {
      showToast({ title: 'Name required', description: 'Give the run a name first.', variant: 'warning' });
      setEvalStep(0);
      return;
    }
    setEvalOpen(false);
    setEvalStep(0);
    showToast({
      title: 'Eval queued',
      description: `${runName} will score ${modelOptions.find((item) => item.value === model)?.label}.`,
      variant: 'success',
    });
    setRunName('');
    navigate(`${BASE_PATH}/runs`);
  }

  return (
    <div className={`prism-shell ${collapsed ? 'is-collapsed' : ''}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <DashboardSidebar
        open={mobileOpen}
        collapsed={collapsed}
        onNavigate={() => setMobileOpen(false)}
        onRun={openEval}
      />
      {mobileOpen ? (
        <button
          type="button"
          className="prism-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
      <div className="prism-main">
        <DashboardNavbar onMenuToggle={toggleSidebar} onRun={openEval} collapsed={collapsed} />
        <div id="main" className="prism-content">
          <Outlet context={{ onRun: openEval }} />
        </div>
      </div>

      <Modal
        open={evalOpen}
        onOpenChange={(open) => {
          setEvalOpen(open);
          if (!open) setEvalStep(0);
        }}
        heading="Run evaluation"
        footer={(
          <>
            <Button variant="secondary" onClick={() => (evalStep === 0 ? setEvalOpen(false) : setEvalStep((step) => step - 1))}>
              {evalStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            {evalStep < 2 ? (
              <Button onClick={() => setEvalStep((step) => step + 1)}>Next</Button>
            ) : (
              <Button onClick={queueEval}>Queue eval</Button>
            )}
          </>
        )}
      >
        <div className="prism-stack" style={{ paddingTop: '0.4rem' }}>
          <Stepper
            steps={settings.evalSteps}
            current={evalStep}
            onStepClick={(index) => {
              if (index <= evalStep) setEvalStep(index);
            }}
          />
          {evalStep === 0 ? (
            <div className="prism-form-grid">
              <Input
                className="full"
                label="Run name"
                value={runName}
                placeholder="aurora-safety-29"
                onChange={(event) => setRunName(event.target.value)}
              />
              <Select
                className="full"
                label="Suite"
                value={suite}
                onChange={(event) => setSuite(event.target.value)}
                options={suiteOptions}
              />
            </div>
          ) : null}
          {evalStep === 1 ? (
            <div className="prism-form-grid">
              <Combobox label="Model" value={model} options={modelOptions} onChange={setModel} />
              <Select
                label="Judge"
                value={judge}
                onChange={(event) => setJudge(event.target.value)}
                options={settings.judgeOptions}
              />
              <NumberInput
                label="Sample size"
                value={samples}
                min={50}
                max={2000}
                step={10}
                onChange={(_, value) => setSamples(value)}
              />
              <Slider
                label="Pass threshold"
                min={70}
                max={100}
                value={threshold}
                showValue
                onChange={(_, value) => setThreshold(value)}
              />
            </div>
          ) : null}
          {evalStep === 2 ? (
            <div className="prism-form-grid">
              <Autocomplete
                label="Owner"
                value={owner}
                suggestions={settings.ownerOptions.map((item) => item.label)}
                onChange={setOwner}
              />
              <DatePicker label="Start date" value={startDate} onChange={setStartDate} />
              <TimePicker label="Start time" value={startTime} onChange={(_, value) => setStartTime(value)} />
              <Textarea
                className="full"
                label="Notes"
                value={notes}
                placeholder="What is Meera Poluru scoring?"
                onChange={(event) => setNotes(event.target.value)}
              />
              <Divider className="full" />
              <p className="prism-note full">
                {runName || 'Unnamed run'} · {suiteOptions.find((item) => item.value === suite)?.label} ·{' '}
                {modelOptions.find((item) => item.value === model)?.label} · {owner}
              </p>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}
