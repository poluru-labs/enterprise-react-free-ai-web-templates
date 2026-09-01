import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import camerasData from '../data/cameras.json';
import modelsData from '../data/models.json';
import detections from '../data/detections.json';
import incidents from '../data/incidents.json';
import datasets from '../data/datasets.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { searchCatalog } from '../lib/search.js';
import { ChartSection, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get('q') || '').trim();

  const catalog = useMemo(() => {
    const cameras = camerasData.cameras.map((camera) => ({
      id: camera.id,
      kind: 'Camera',
      title: camera.code,
      detail: `${camera.name} · ${camera.site}`,
      status: camera.status,
      href: `${BASE_PATH}/cameras`,
    }));
    const models = modelsData.models.map((model) => ({
      id: model.id,
      kind: 'Model',
      title: model.name,
      detail: `v${model.version} · ${model.task}`,
      status: model.status,
      href: `${BASE_PATH}/models`,
    }));
    const events = detections.events.map((event) => ({
      id: event.id,
      kind: 'Detection',
      title: `${event.label} · ${event.camera}`,
      detail: event.id,
      status: event.status,
      href: `${BASE_PATH}/detections`,
    }));
    const cases = incidents.incidents.map((incident) => ({
      id: incident.id,
      kind: 'Incident',
      title: incident.title,
      detail: `${incident.id} · ${incident.site}`,
      status: incident.status,
      href: `${BASE_PATH}/incidents`,
    }));
    const sets = datasets.datasets.map((set) => ({
      id: set.id,
      kind: 'Dataset',
      title: set.name,
      detail: set.purpose,
      status: set.status,
      href: `${BASE_PATH}/datasets`,
    }));
    return [...cameras, ...models, ...events, ...cases, ...sets];
  }, []);

  const results = useMemo(() => searchCatalog(catalog, query), [catalog, query]);

  return (
    <div className="cvd-page">
      <PageHeader
        title={query ? `Results for “${query}”` : 'Search'}
        description="Looks across cameras, models, detections, incidents, and datasets."
        crumbs={[BREADCRUMB_ROOT, { label: 'Search' }]}
      />

      <ChartSection
        title={`${results.length} matches`}
        subtitle={query ? 'Open a result to jump to the related page' : 'Use the control-room search or press ⌘K'}
      >
        {results.length ? (
          <ul className="cvd-search-results">
            {results.map((item) => (
              <li key={`${item.kind}-${item.id}`}>
                <Link to={item.href} className="cvd-search-hit">
                  <div>
                    <small>{item.kind}</small>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  {item.status ? <StatusBadge status={item.status} /> : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cvd-drawer-copy">
            {query ? 'No matches in the Sightline fixtures.' : 'Type a query in the header and press Enter.'}
          </p>
        )}
      </ChartSection>
    </div>
  );
}
