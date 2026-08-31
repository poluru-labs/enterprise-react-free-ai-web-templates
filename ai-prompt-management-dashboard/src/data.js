export const currentUser = {
  name: 'Sravani Poluru',
  role: 'Prompt lead',
  initials: 'SP',
};

export const navItems = [
  { id: 'overview', label: 'Overview', icon: 'bi-grid-1x2', href: '#/overview' },
  { id: 'library', label: 'Library', icon: 'bi-journal-text', href: '#/library' },
  { id: 'versions', label: 'Versions', icon: 'bi-layers', href: '#/versions' },
  { id: 'playground', label: 'Playground', icon: 'bi-terminal', href: '#/playground' },
  { id: 'releases', label: 'Releases', icon: 'bi-rocket-takeoff', href: '#/releases' },
  { id: 'settings', label: 'Settings', icon: 'bi-sliders', href: '#/settings' },
];

export const kpis = [
  { label: 'Live prompts', value: '128', hint: 'this week', trend: 'up', trendValue: '+14' },
  { label: 'Eval pass rate', value: '94.2%', hint: 'nDCG grounded', trend: 'up', trendValue: '+2.1%' },
  { label: 'Pending review', value: '7', hint: 'versions', trend: 'down', trendValue: '-3' },
  { label: 'Avg. latency', value: '1.18s', hint: 'playground p95', trend: 'down', trendValue: '-0.12s' },
];

export const hourly = [
  { hour: '9a', value: 42 },
  { hour: '10', value: 68 },
  { hour: '11', value: 81 },
  { hour: '12', value: 54 },
  { hour: '1p', value: 73 },
  { hour: '2p', value: 96 },
  { hour: '3p', value: 88 },
  { hour: '4p', value: 61 },
];

export const activity = [
  { title: 'Support copilot v12 published', detail: 'Production · Lakshmi Poluru', status: 'Live', time: '12 min ago' },
  { title: 'Legal summarizer held for review', detail: 'ACL · Venkata Poluru', status: 'Review', time: '38 min ago' },
  { title: 'Brand voice pack refreshed', detail: 'GTM · Hana Poluru', status: 'Ready', time: '1 hr ago' },
  { title: 'RAG citation prompt failed eval', detail: 'Knowledge · Meera Poluru', status: 'Failed', time: '2 hr ago' },
  { title: 'Safety refusal canary started', detail: '10% traffic · Arjun Poluru', status: 'Canary', time: '3 hr ago' },
];

export const prompts = [
  { name: 'Support copilot', owner: 'Lakshmi Poluru', version: 'v12', env: 'Production', score: '96.4%', status: 'Live', family: 'Support' },
  { name: 'Legal summarizer', owner: 'Venkata Poluru', version: 'v4', env: 'Staging', score: '81.2%', status: 'Review', family: 'Legal' },
  { name: 'Brand voice', owner: 'Hana Poluru', version: 'v8', env: 'Production', score: '93.1%', status: 'Live', family: 'GTM' },
  { name: 'RAG citation', owner: 'Meera Poluru', version: 'v6', env: 'Canary', score: '78.0%', status: 'Failed', family: 'Knowledge' },
  { name: 'Safety refusal', owner: 'Arjun Poluru', version: 'v3', env: 'Canary', score: '99.1%', status: 'Canary', family: 'Safety' },
  { name: 'Sales email', owner: 'Priya Poluru', version: 'v9', env: 'Production', score: '91.8%', status: 'Live', family: 'GTM' },
  { name: 'Invoice extractor', owner: 'Nikhil Poluru', version: 'v5', env: 'Staging', score: '87.4%', status: 'Review', family: 'Finance' },
  { name: 'Onboarding tutor', owner: 'Ramesh Poluru', version: 'v2', env: 'Sandbox', score: '88.6%', status: 'Draft', family: 'HR' },
];

export const versions = [
  { id: 'PV-4412', prompt: 'Support copilot', owner: 'Lakshmi Poluru', stage: 'Publish', progress: 100, status: 'Live' },
  { id: 'PV-4408', prompt: 'Legal summarizer', owner: 'Venkata Poluru', stage: 'Review', progress: 62, status: 'Review' },
  { id: 'PV-4401', prompt: 'RAG citation', owner: 'Meera Poluru', stage: 'Eval', progress: 40, status: 'Failed' },
  { id: 'PV-4394', prompt: 'Safety refusal', owner: 'Arjun Poluru', stage: 'Canary', progress: 28, status: 'Canary' },
  { id: 'PV-4388', prompt: 'Brand voice', owner: 'Hana Poluru', stage: 'Publish', progress: 100, status: 'Live' },
];

export const hits = [
  { query: 'How do we rotate API keys?', hit: 'Support copilot · Lakshmi Poluru', score: '0.94', citations: 3 },
  { query: 'Draft a vendor NDA redline', hit: 'Legal summarizer · Venkata Poluru', score: '0.71', citations: 2 },
  { query: 'Harbor SLA credits in email', hit: 'Brand voice · Hana Poluru', score: '0.88', citations: 4 },
  { query: 'Cite the policy handbook', hit: 'RAG citation · Meera Poluru', score: '0.62', citations: 1 },
];

export const owners = [
  { name: 'Lakshmi Poluru', focus: 'Support copilot', load: 84 },
  { name: 'Hana Poluru', focus: 'Brand voice', load: 71 },
  { name: 'Meera Poluru', focus: 'RAG citation', load: 63 },
  { name: 'Arjun Poluru', focus: 'Safety refusal', load: 48 },
];

export const sla = [
  { label: 'Publish SLA', value: 94 },
  { label: 'Eval SLA', value: 88 },
  { label: 'Review SLA', value: 61 },
];

export const ownerOptions = [
  { label: 'Sravani Poluru', value: 'sravani' },
  { label: 'Lakshmi Poluru', value: 'lakshmi' },
  { label: 'Venkata Poluru', value: 'venkata' },
  { label: 'Meera Poluru', value: 'meera' },
  { label: 'Hana Poluru', value: 'hana' },
];

export const familyOptions = [
  { label: 'Support', value: 'support' },
  { label: 'Legal', value: 'legal' },
  { label: 'GTM', value: 'gtm' },
  { label: 'Knowledge', value: 'knowledge' },
  { label: 'Safety', value: 'safety' },
];

export const modelOptions = [
  { label: 'gpt-4.1', value: 'gpt-4.1' },
  { label: 'claude-3.5', value: 'claude-3.5' },
  { label: 'llama-3-70b', value: 'llama-3-70b' },
];

export const commands = [
  { label: 'Open library', href: '#/library' },
  { label: 'Open playground', href: '#/playground' },
  { label: 'Create prompt', href: '#/library' },
  { label: 'Open settings', href: '#/settings' },
];

export const notifications = [
  { label: 'Legal summarizer pending', description: 'Venkata Poluru · 38 min ago' },
  { label: 'RAG citation failed eval', description: 'Meera Poluru · 2 hr ago' },
  { label: 'Safety canary at 10%', description: 'Arjun Poluru · 3 hr ago' },
];

export const promptTree = [
  {
    id: 'bureau',
    label: 'Prompt Bureau',
    children: [
      {
        id: 'support',
        label: 'Support',
        children: [
          { id: 'copilot', label: 'Support copilot' },
        ],
      },
      { id: 'legal', label: 'Legal' },
      { id: 'gtm', label: 'GTM' },
      { id: 'knowledge', label: 'Knowledge' },
      { id: 'safety', label: 'Safety' },
    ],
  },
];

export const createSteps = [
  { label: 'Name', description: 'Title and family' },
  { label: 'Draft', description: 'System prompt' },
  { label: 'Eval', description: 'Attach cases' },
];

export function statusVariant(status) {
  if (status === 'Live' || status === 'Ready' || status === 'Healthy') return 'success';
  if (status === 'Review' || status === 'Canary' || status === 'Draft') return 'warning';
  if (status === 'Failed') return 'danger';
  return 'info';
}
