import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  Badge,
  CircularProgress,
  DescriptionList,
  Divider,
  FileUpload,
  Meter,
  Rating,
  SideNav,
  Status,
  TreeItem,
  TreeView,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import catalog from '../data/catalog.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatNumber, formatPercent } from '../lib/format.js';
import { PageHeader } from '../components/layout/PageHeader.jsx';

function findNode(nodes, id) {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function departmentIdFor(id) {
  if (catalog.departments.some((row) => row.id === id)) return id;
  const parent = id.split('-')[0];
  if (catalog.departments.some((row) => row.id === parent)) return parent;
  return catalog.departments[0].id;
}

export default function CatalogPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('grocery');
  const [expandedIds, setExpandedIds] = useState({ apparel: true, home: true, grocery: true });
  const [pin, setPin] = useState('hero');
  const [quality, setQuality] = useState(4);

  const department = useMemo(() => {
    const id = departmentIdFor(selectedId);
    return catalog.departments.find((row) => row.id === id) ?? catalog.departments[0];
  }, [selectedId]);

  const node = findNode(catalog.tree, selectedId);
  const note = catalog.notes.find((row) => row.id === department.id);
  const underFloor = department.coverage < department.floor;

  return (
    <div className="rec-page">
      <PageHeader
        title="Catalog"
        description="Coverage by department. Kavya Poluru reviews thin shelves every Monday with Leela Poluru."
        crumbs={[BREADCRUMB_ROOT, { label: 'Catalog' }]}
      />

      <div className="rec-catalog">
        <div className="rec-catalog-side">
          <div>
            <p className="rec-section-label">Departments</p>
            <SideNav
              items={catalog.departments.map((row) => ({
                label: row.label,
                active: row.id === department.id,
              }))}
              onNavigate={(label) => {
                const match = catalog.departments.find((row) => row.label === label);
                if (match) setSelectedId(match.id);
              }}
            />
          </div>
          <div>
            <p className="rec-section-label">Assortment</p>
            <TreeView
              items={catalog.tree}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={setSelectedId}
              onToggle={(id, expanded) => setExpandedIds((prev) => ({ ...prev, [id]: expanded }))}
            />
          </div>
          <div>
            <p className="rec-section-label">Pinned placements</p>
            <div className="rec-pin-tree" role="tree" aria-label="Pinned placements">
              <TreeItem
                itemId="hero"
                label="Home hero"
                selected={pin === 'hero'}
                onSelect={(id) => {
                  setPin(id);
                  navigate(`${BASE_PATH}/recommendations`);
                }}
              />
              <TreeItem
                itemId="similar"
                label="Similar items"
                selected={pin === 'similar'}
                onSelect={(id) => {
                  setPin(id);
                  navigate(`${BASE_PATH}/recommendations`);
                }}
              />
              <TreeItem
                itemId="addon"
                label="Cart add-on"
                selected={pin === 'addon'}
                onSelect={(id) => {
                  setPin(id);
                  navigate(`${BASE_PATH}/recommendations`);
                }}
              />
            </div>
          </div>
        </div>

        <section className="rec-panel">
          <div className="rec-segment-head">
            <div>
              <p className="rec-section-label">{node?.label ?? department.label}</p>
              <h2>{department.label}</h2>
            </div>
            <CircularProgress value={department.coverage} max={100} size={84} showValue />
          </div>
          <div className="rec-segment-meta">
            <Badge label={formatPercent(department.coverage, 0)} variant="brand" soft />
            <Status
              label={underFloor ? 'Under floor' : 'On target'}
              variant={underFloor ? 'warning' : 'success'}
            />
          </div>
          <DescriptionList
            columns={2}
            items={[
              { term: 'Owner', description: department.owner },
              { term: 'Active SKUs', description: formatNumber(department.skus) },
              { term: 'With a live slot', description: formatNumber(department.served) },
              { term: 'Floor', description: formatPercent(department.floor, 0) },
            ]}
          />
          <div className="rec-drawer-note">
            <Meter
              label="Coverage"
              value={department.coverage}
              min={0}
              max={100}
              low={department.floor}
              high={90}
              optimum={95}
              showValue
            />
          </div>
          <Divider />
          <h3>Assortment quality</h3>
          <Rating
            value={quality}
            max={5}
            onChange={(value) => {
              setQuality(value);
              showToast({ title: `${department.label} quality set to ${value}`, variant: 'info' });
            }}
          />
          <Divider />
          <h3>Coverage note</h3>
          <Accordion>
            <AccordionItem heading={note?.heading ?? 'Note'} defaultOpen>
              <p className="rec-copy">{note?.body}</p>
            </AccordionItem>
          </Accordion>
          <Divider />
          <FileUpload
            label="Attach assortment file"
            accept=".csv,text/csv"
            hint="Kavya Poluru reviews the file before it joins the shelf."
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
