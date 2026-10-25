import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  Autocomplete,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  CircularProgress,
  CodeSnippet,
  Combobox,
  DataTable,
  DatePicker,
  DateRangePicker,
  DescriptionList,
  Divider,
  Drawer,
  DropdownMenu,
  EmptyState,
  FileUpload,
  Icon,
  Input,
  Kbd,
  Link,
  List,
  MenuItem,
  Meter,
  Modal,
  NumberInput,
  Pagination,
  PinInput,
  Popover,
  ProgressBar,
  RadioGroup,
  Rating,
  Search,
  SegmentedControl,
  Select,
  SideNav,
  Skeleton,
  Slider,
  Spinner,
  SplitButton,
  Stat,
  Status,
  Stepper,
  Switch,
  Tag,
  Tabs,
  Tab,
  Textarea,
  Timeline,
  TimePicker,
  Toolbar,
  Tooltip,
  TreeView,
  useToast,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import SiteFooter from './components/SiteFooter.jsx';

const QUERY_SUGGESTIONS = [
  'pricing enterprise plan',
  'api rate limits',
  'sso setup guide',
  'export csv reports',
  'zero retention policy',
];

const COMBO_OPTIONS = [
  { label: 'All properties', value: 'all' },
  { label: 'docs.querylens.io', value: 'docs' },
  { label: 'app.querylens.io', value: 'app' },
  { label: 'Marketing site', value: 'marketing' },
];

const TABLE_COLUMNS = [
  { key: 'query', label: 'Query', sortable: true },
  { key: 'volume', label: 'Volume', sortable: true },
  { key: 'ctr', label: 'CTR', sortable: true },
  { key: 'position', label: 'Avg. position', sortable: true },
  { key: 'aiShare', label: 'AI answer share', sortable: true },
];

const TABLE_ROWS = [
  { query: 'enterprise pricing', volume: 4820, ctr: '4.8%', position: 2.1, aiShare: '38%' },
  { query: 'webhook retries', volume: 2910, ctr: '6.2%', position: 1.4, aiShare: '52%' },
  { query: 'gdpr data export', volume: 1844, ctr: '3.1%', position: 3.8, aiShare: '21%' },
  { query: 'semantic search api', volume: 1560, ctr: '7.4%', position: 1.2, aiShare: '61%' },
  { query: 'billing portal login', volume: 980, ctr: '2.9%', position: 4.6, aiShare: '12%' },
];

const TREE_ITEMS = [
  {
    id: 'root',
    label: 'Index clusters',
    children: [
      { id: 'docs', label: 'Documentation' },
      {
        id: 'blog',
        label: 'Blog & changelog',
        children: [
          { id: 'blog-product', label: 'Product updates' },
          { id: 'blog-engineering', label: 'Engineering' },
        ],
      },
      { id: 'support', label: 'Support articles' },
    ],
  },
];

const TIMELINE_ITEMS = [
  {
    title: 'Index refresh completed',
    description: '12.4k documents re-embedded with the latest model.',
    timestamp: 'Today, 9:14 AM',
    status: 'complete',
  },
  {
    title: 'CTR anomaly detected',
    description: 'Spike on “api rate limits” — review snippet copy.',
    timestamp: 'Yesterday, 4:02 PM',
    status: 'current',
  },
  {
    title: 'Weekly report exported',
    description: 'Sent to analytics@company.com',
    timestamp: 'Mon, 8:00 AM',
    status: 'upcoming',
  },
];

export default function QueryLensDashboard() {
  const toast = useToast();
  const [navSection, setNavSection] = useState('Overview');
  const [range, setRange] = useState('7d');
  const [alertOpen, setAlertOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [exportOpen, setExportOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [compareOn, setCompareOn] = useState(true);
  const [realtimeOn, setRealtimeOn] = useState(true);
  const [minCtr, setMinCtr] = useState(3);
  const [relevance, setRelevance] = useState(4);
  const [reportType, setReportType] = useState('summary');
  const [tags, setTags] = useState(['AI answers', 'High intent']);
  const [treeSelected, setTreeSelected] = useState('docs');
  const [treeExpanded, setTreeExpanded] = useState({ root: true, blog: true });
  const [loadingDemo, setLoadingDemo] = useState(false);

  const sideItems = useMemo(
    () => [
      { label: 'Overview', href: '#overview', icon: 'home', active: navSection === 'Overview' },
      { label: 'Queries', href: '#queries', icon: 'search', active: navSection === 'Queries' },
      { label: 'AI answers', href: '#ai', icon: 'star', active: navSection === 'AI answers' },
      { label: 'Index health', href: '#index', icon: 'folder', active: navSection === 'Index health' },
      { label: 'Reports', href: '#reports', icon: 'file', active: navSection === 'Reports' },
      { label: 'Settings', href: '#settings', icon: 'settings', active: navSection === 'Settings' },
    ],
    [navSection],
  );

  const listItems = [
    { label: 'Zero-result queries', description: '142 terms need new content', icon: 'warning' },
    { label: 'Top gaining queries', description: '+18% week over week', icon: 'chevron-up' },
    { label: 'Snippet experiments', description: '3 tests running', icon: 'edit' },
  ];

  function notifySaved() {
    toast.show({
      title: 'Dashboard saved',
      description: 'Layout preferences stored for this browser session.',
      variant: 'success',
    });
  }

  function runLoadingDemo() {
    setLoadingDemo(true);
    window.setTimeout(() => setLoadingDemo(false), 1400);
  }

  function dismissTag(label) {
    setTags((prev) => prev.filter((t) => t !== label));
  }

  return (
    <div className="qla-app">
      <a className="qla-skip" href="#overview">
        Skip to dashboard
      </a>

      <Toolbar
        bordered
        sticky
        className="qla-toolbar"
        start={
          <div className="qla-toolbar-start">
            <span className="qla-mark" aria-hidden="true" />
            <span className="qla-product-name">QueryLens</span>
            <Badge label="Beta" variant="brand" size="sm" soft pill />
          </div>
        }
        center={
          <nav className="qla-top-nav" aria-label="Product">
            <Link href="#overview" variant="subtle">
              Dashboard
            </Link>
            <Link href="#queries" variant="subtle">
              Explore
            </Link>
            <Link href="#reports" variant="subtle">
              Reports
            </Link>
          </nav>
        }
        end={
          <div className="qla-toolbar-end">
            <Tooltip content="Notifications">
              <Button variant="tertiary" icon="bell" iconOnly accessibleLabel="Notifications" />
            </Tooltip>
            <Avatar name="Subrahmanyam Poluru" size="sm" />
            <Button variant="primary" icon="download" onClick={() => setExportOpen(true)}>
              Export
            </Button>
          </div>
        }
      />

      <section className="qla-hero" id="top">
        <div className="qla-hero-copy">
          <p className="qla-eyebrow">AI search analytics</p>
          <h1 className="qla-title">See every query, click, and AI answer in one workspace.</h1>
          <p className="qla-lead">
            QueryLens turns search logs, ranking signals, and generative answer metrics into actionable
            dashboards—clean layout, no noise.
          </p>
          <div className="qla-hero-actions">
            <Button
              variant="primary"
              onClick={() => {
                showToast({ title: 'Trial started', description: '14-day Pro trial (demo).', variant: 'success' });
              }}
            >
              Start free trial
            </Button>
            <Button variant="secondary" href="#overview">
              View live dashboard
            </Button>
            <SplitButton
              label="Quick export"
              onClick={() => setExportOpen(true)}
              onSelect={() => notifySaved()}
            >
              <MenuItem label="CSV" value="csv" />
              <MenuItem label="PDF summary" value="pdf" />
            </SplitButton>
          </div>
          <p className="qla-kbd-hint">
            Press <Kbd keys="⌘ K" /> to open command search
          </p>
        </div>
        <div className="qla-hero-stats">
          <Stat value="2.4M" label="Queries / 30d" trend="up" trendValue="+12%" hint="Organic + in-app search" />
          <Stat value="5.1%" label="Avg. CTR" trend="up" trendValue="+0.4 pts" />
          <Stat value="41%" label="AI answer share" trend="flat" trendValue="Stable" />
          <Stat value="98.2" label="Index health" trend="up" trendValue="+1.2" hint="Freshness + coverage score" />
        </div>
      </section>

      <div className="qla-shell" id="overview">
        <aside className="qla-sidebar-wrap">
          <SideNav
            items={sideItems}
            onNavigate={(label) => {
              setNavSection(label);
              showToast({ title: 'Section', description: `Viewing ${label}`, variant: 'info', duration: 2200 });
            }}
          />
        </aside>

        <div className="qla-main">
          <Breadcrumb
            items={[
              { label: 'Home', href: '#top' },
              { label: 'Acme Workspace', href: '#overview' },
              { label: navSection },
            ]}
          />

          {alertOpen ? (
            <Alert
              variant="info"
              title="New: AI answer quality score"
              message="Compare citation coverage and helpfulness ratings alongside classic CTR."
              dismissible
              onDismiss={() => setAlertOpen(false)}
            />
          ) : null}

          <div className="qla-toolbar-row">
            <SegmentedControl
              options={[
                { label: '7 days', value: '7d' },
                { label: '30 days', value: '30d' },
                { label: '90 days', value: '90d' },
              ]}
              value={range}
              onChange={setRange}
            />
            <Search
              placeholder="Search queries, pages, or intents…"
              clearable
              aria-label="Search analytics"
              className="qla-search"
            />
            <ButtonGroup orientation="horizontal" size="sm">
              <Button variant="secondary" icon="filter" size="sm">
                Filters
              </Button>
              <Button variant="secondary" icon="refresh" size="sm" onClick={runLoadingDemo}>
                Refresh
              </Button>
            </ButtonGroup>
            <DropdownMenu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              trigger={
                <Button variant="secondary" icon="more-horizontal" iconOnly accessibleLabel="More actions" />
              }
            >
              <MenuItem label="Duplicate view" value="dup" />
              <MenuItem label="Share link" value="share" />
              <MenuItem label="Delete view" value="delete" danger />
            </DropdownMenu>
          </div>

          <div className="qla-filter-grid">
            <Select
              label="Property"
              options={COMBO_OPTIONS}
              defaultValue="all"
              size="sm"
            />
            <Combobox
              label="Segment"
              options={[
                { label: 'Signed-in users', value: 'auth' },
                { label: 'Enterprise tier', value: 'ent' },
                { label: 'Mobile web', value: 'mobile' },
              ]}
              placeholder="Choose segment"
            />
            <Autocomplete
              label="Query contains"
              suggestions={QUERY_SUGGESTIONS}
              placeholder="Type to suggest…"
            />
            <DateRangePicker label="Date range" startValue="2026-10-01" endValue="2026-10-23" />
            <DatePicker label="Compare from" defaultValue="2026-09-01" />
            <TimePicker label="Timezone anchor" defaultValue="09:00" />
          </div>

          <div className="qla-tags">
            {tags.map((tag) => (
              <Tag key={tag} label={tag} variant="brand" dismissible onDismiss={() => dismissTag(tag)} />
            ))}
            <Status label="Ingestion live" variant="success" pulse={realtimeOn} />
          </div>

          <div className="qla-stat-row">
            <Stat value="18.4k" label="Zero-result rate" trend="down" trendValue="-2.1%" />
            <Stat value="1.8s" label="P95 latency" trend="down" trendValue="-120ms" />
            <Stat value="76" label="NPS (search)" trend="up" trendValue="+4" />
            <Card
              elevated
              padded
              header={<strong className="qla-ui-font">Index freshness</strong>}
              footer={
                <Button variant="tertiary" size="sm" onClick={() => setInsightsOpen(true)}>
                  View details
                </Button>
              }
            >
              <div className="qla-progress-stack">
                <ProgressBar value={92} label="Document coverage" showValue />
                <Meter value={88} min={0} max={100} low={40} high={75} optimum={90} label="Embedding quality" showValue />
                <CircularProgress value={94} showValue size={72} />
              </div>
            </Card>
          </div>

          {loadingDemo ? (
            <div className="qla-skeleton-block">
              <Skeleton variant="rectangular" height="120px" />
              <Skeleton lines={3} variant="text" />
            </div>
          ) : null}

          <Tabs defaultSelectedIndex={0} className="qla-tabs">
            <Tab label="Query performance">
              <div id="queries" className="qla-panel">
                <DescriptionList
                  columns={3}
                  items={[
                    { term: 'Date range', description: `Last ${range === '7d' ? '7' : range === '30d' ? '30' : '90'} days` },
                    { term: 'Model', description: 'Hybrid lexical + vector' },
                    { term: 'AI surface', description: 'Answer cards + citations' },
                  ]}
                />
                <Divider spacing="md" />
                <DataTable columns={TABLE_COLUMNS} rows={TABLE_ROWS} sortable striped />
                <div className="qla-table-foot">
                  <Pagination page={page} pageSize={5} total={48} onChange={setPage} />
                  <Spinner label="Syncing" showLabel size="sm" />
                </div>
              </div>
            </Tab>
            <Tab label="AI answers">
              <div id="ai" className="qla-panel">
                <div className="qla-two-col">
                  <Timeline items={TIMELINE_ITEMS} />
                  <List divided items={listItems} onSelect={(label) => toast.show({ title: label, variant: 'info' })} />
                </div>
                <Accordion single>
                  <AccordionItem heading="How is answer quality scored?" defaultOpen>
                    <p>
                      We blend citation coverage, user thumbs feedback, and downstream task completion. Scores update
                      hourly.
                    </p>
                  </AccordionItem>
                  <AccordionItem heading="Which queries trigger AI answers?">
                    <p>High-intent informational queries with confident retrieval above 0.82 similarity.</p>
                  </AccordionItem>
                </Accordion>
              </div>
            </Tab>
            <Tab label="Index health">
              <div id="index" className="qla-panel qla-two-col">
                <TreeView
                  items={TREE_ITEMS}
                  selectedId={treeSelected}
                  expandedIds={treeExpanded}
                  onSelect={setTreeSelected}
                  onToggle={(id, expanded) => setTreeExpanded((prev) => ({ ...prev, [id]: expanded }))}
                />
                <div>
                  <Stepper
                    current={2}
                    steps={[
                      { label: 'Crawl', description: 'Complete' },
                      { label: 'Embed', description: 'In progress' },
                      { label: 'Publish', description: 'Pending' },
                    ]}
                  />
                  <EmptyState
                    heading="No gaps in this cluster"
                    description="Documentation index is fully covered for the selected range."
                    actions={
                      <Button variant="secondary" size="sm" onClick={() => setInsightsOpen(true)}>
                        Run audit
                      </Button>
                    }
                  />
                </div>
              </div>
            </Tab>
            <Tab label="Controls demo">
              <div id="settings" className="qla-panel qla-controls">
                <Switch label="Compare to previous period" checked={compareOn} onChange={(_, v) => setCompareOn(v)} />
                <Checkbox label="Include bot traffic" defaultChecked={false} />
                <RadioGroup
                  label="Report focus"
                  name="report-type"
                  value={reportType}
                  orientation="horizontal"
                  options={[
                    { label: 'Summary', value: 'summary' },
                    { label: 'Detailed', value: 'detailed' },
                    { label: 'Executive', value: 'exec' },
                  ]}
                  onChange={(_, v) => setReportType(v)}
                />
                <Slider label="Minimum CTR %" min={0} max={10} step={0.5} value={minCtr} onChange={(_, v) => setMinCtr(v)} showValue />
                <NumberInput label="Result window" min={5} max={50} defaultValue={10} hint="Rows per SERP preview" />
                <PinInput label="Share code" length={4} defaultValue="4821" hint="Demo PIN for shared dashboard links" />
                <div className="qla-rating-row">
                  <span className="qla-ui-font">Sample relevance</span>
                  <Rating value={relevance} onChange={setRelevance} />
                </div>
                <Input label="Workspace slug" defaultValue="acme-prod" icon="link" />
                <Textarea label="Analyst notes" placeholder="Observations for this week…" resize="vertical" />
                <FileUpload label="Upload query log" accept=".csv,.json" hint="Demo only — files stay in browser memory." />
                <CodeSnippet
                  language="bash"
                  label="Ingest snippet"
                  code={`curl -X POST https://api.querylens.io/v1/events \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"query":"enterprise pricing","surface":"ai-answer"}'`}
                />
                <div className="qla-control-actions">
                  <Popover
                    open={popoverOpen}
                    onOpenChange={setPopoverOpen}
                    heading="Saved views"
                    trigger={
                      <Button variant="secondary" size="sm">
                        Saved views
                      </Button>
                    }
                  >
                    <p>Executive summary · Weekly ops · AI quality review</p>
                  </Popover>
                  <Button variant="primary" size="sm" onClick={notifySaved}>
                    Save workspace
                  </Button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      <section className="qla-cta" id="reports">
        <Card
          elevated
          padded
          header={<h2 className="qla-cta-title">Ship insights to your team</h2>}
          footer={
            <Button variant="primary" icon="mail" onClick={() => toast.show({ title: 'Invite sent (demo)', variant: 'success' })}>
              Invite analyst
            </Button>
          }
        >
          <p>Schedule weekly QueryLens reports with Slack, email, or webhook delivery—powered by the same EDS components you see here.</p>
          <div className="qla-cta-icons">
            <Icon name="search" />
            <Icon name="star" />
            <Icon name="download" />
          </div>
        </Card>
      </section>

      <SiteFooter />

      <Modal
        open={exportOpen}
        onOpenChange={setExportOpen}
        heading="Export analytics"
        footer={
          <>
            <Button variant="secondary" onClick={() => setExportOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setExportOpen(false);
                toast.show({ title: 'Export queued', description: 'You will receive a download link (demo).', variant: 'success' });
              }}
            >
              Export
            </Button>
          </>
        }
      >
        <Select
          label="Format"
          options={[
            { label: 'CSV', value: 'csv' },
            { label: 'Parquet', value: 'parquet' },
            { label: 'PDF', value: 'pdf' },
          ]}
          defaultValue="csv"
        />
        <Switch label="Include AI answer metrics" checked={realtimeOn} onChange={(_, v) => setRealtimeOn(v)} />
      </Modal>

      <Drawer
        open={insightsOpen}
        onOpenChange={setInsightsOpen}
        heading="Index insights"
        side="right"
        footer={
          <Button variant="primary" onClick={() => setInsightsOpen(false)}>
            Done
          </Button>
        }
      >
        <DescriptionList
          items={[
            { term: 'Last crawl', description: 'Oct 23, 2026 · 06:00 UTC' },
            { term: 'Embeddings', description: 'text-embedding-3-large' },
            { term: 'Stale documents', description: '38 (> 30 days)' },
          ]}
        />
        <ProgressBar value={96} label="Shard replication" showValue />
      </Drawer>
    </div>
  );
}
