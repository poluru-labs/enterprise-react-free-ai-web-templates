import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  Badge,
  CodeSnippet,
  DescriptionList,
  Divider,
  FileUpload,
  Meter,
  SideNav,
  Status,
  TreeView,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import telemetry from '../data/telemetry.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatDateTime } from '../lib/format.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

function siteLabel(id) {
  for (const site of telemetry.sites) {
    if (site.id === id) return site.label;
    if (site.children) {
      const child = site.children.find((row) => row.id === id);
      if (child) return child.label;
    }
  }
  return telemetry.sites[0]?.label ?? 'Site';
}

export default function TelemetryPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('pick-a');
  const [expandedIds, setExpandedIds] = useState({ 'wh-east': true, 'wh-west': true });

  const treeItems = useMemo(() => {
    return telemetry.sites.map((site) => ({
      id: site.id,
      label: site.label,
      children: site.children,
    }));
  }, []);

  const warnStream = telemetry.streams.find((row) => row.status === 'warn');
  const label = siteLabel(selectedId);

  return (
    <div className="flt-page">
      <PageHeader
        title="Telemetry"
        description="Live streams, site map, and alerts. Priya Poluru watches motor temps with Jonah Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Telemetry' }]}
      />

      <div className="flt-catalog">
        <div className="flt-catalog-side">
          <div>
            <p className="flt-section-label">Sites</p>
            <SideNav
              items={telemetry.sites.map((row) => ({
                label: row.label,
                active: row.id === selectedId || row.children?.some((c) => c.id === selectedId),
              }))}
              onNavigate={(navLabel) => {
                const match = telemetry.sites.find((row) => row.label === navLabel);
                if (match) {
                  setSelectedId(match.children?.[0]?.id ?? match.id);
                }
              }}
            />
          </div>
          <div>
            <p className="flt-section-label">Floor map</p>
            <TreeView
              items={treeItems}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={setSelectedId}
              onToggle={(id, expanded) => setExpandedIds((prev) => ({ ...prev, [id]: expanded }))}
            />
          </div>
          <div>
            <p className="flt-section-label">Quick links</p>
            <SideNav
              items={[
                { label: 'Open robots', active: false },
                { label: 'Maintenance queue', active: false },
              ]}
              onNavigate={(navLabel) => {
                if (navLabel === 'Open robots') navigate(`${BASE_PATH}/robots`);
                if (navLabel === 'Maintenance queue') navigate(`${BASE_PATH}/maintenance`);
              }}
            />
          </div>
        </div>

        <section className="flt-panel">
          <div className="flt-segment-head">
            <div>
              <p className="flt-section-label">{label}</p>
              <h2>Live streams</h2>
            </div>
            {warnStream ? (
              <Badge label="Motor temp elevated" variant="warning" soft />
            ) : (
              <Status label="Streams healthy" variant="success" />
            )}
          </div>
          <div className="flt-stack">
            {telemetry.streams.map((row) => (
              <Meter
                key={row.id}
                label={`${row.label} (${row.unit})`}
                value={row.value}
                min={0}
                max={row.max}
                low={row.max * 0.35}
                high={row.max * 0.75}
                optimum={row.max * 0.55}
                showValue
              />
            ))}
          </div>
          <Divider />
          <h3>Sample payload</h3>
          <CodeSnippet language="json" code={JSON.stringify(telemetry.samplePayload, null, 2)} />
          <DescriptionList
            columns={2}
            items={[
              { term: 'Robot', description: telemetry.samplePayload.robotId },
              { term: 'Mission', description: telemetry.samplePayload.missionId },
              { term: 'Velocity', description: `${telemetry.samplePayload.velocityMps} m/s` },
              { term: 'Owner', description: telemetry.samplePayload.owner },
            ]}
          />
          <Divider />
          <h3>Recent alerts</h3>
          <Accordion>
            {telemetry.alerts.map((row) => (
              <AccordionItem key={row.id} heading={row.signal}>
                <div className="flt-segment-meta">
                  <span className="flt-mono">{row.id}</span>
                  <span>{row.robot}</span>
                  <span>{formatDateTime(row.when)}</span>
                </div>
                <p className="flt-copy">Owner {row.owner}</p>
              </AccordionItem>
            ))}
          </Accordion>
          <Divider />
          <FileUpload
            label="Attach trace export"
            accept=".json,application/json"
            hint="Priya Poluru reviews exports before they join the replay library."
            onChange={({ files }) => {
              const file = files?.[0];
              showToast({
                title: file ? `${file.name} attached` : 'File attached',
                variant: 'success',
              });
            }}
          />
        </section>
      </div>
    </div>
  );
}
