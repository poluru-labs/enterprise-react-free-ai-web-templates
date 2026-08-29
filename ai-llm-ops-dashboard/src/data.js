export const currentUser = {
  name: 'Subrahmanyam Poluru',
  email: 'subrahmanyam.poluru@polurulabs.example',
  role: 'Platform owner',
};

export const models = [
  { id: 'aurora', name: 'Aurora Chat', version: 'gpt-4.1-mini', owner: 'Subrahmanyam Poluru', provider: 'OpenAI', calls: '48.2K', latency: '820ms', success: 99.4, status: 'Production', spend: '$1,086' },
  { id: 'atlas', name: 'Atlas Summarizer', version: 'claude-3-7-sonnet', owner: 'Kavya Poluru', provider: 'Anthropic', calls: '31.7K', latency: '1.2s', success: 98.8, status: 'Production', spend: '$734' },
  { id: 'lens', name: 'Lens Extractor', version: 'gemini-2.5-flash', owner: 'Madhav Poluru', provider: 'Google', calls: '18.9K', latency: '640ms', success: 96.2, status: 'Review', spend: '$392' },
  { id: 'nova', name: 'Nova Classifier', version: 'phi-4', owner: 'Harini Poluru', provider: 'Azure', calls: '12.4K', latency: '410ms', success: 99.8, status: 'Production', spend: '$206' },
];

export const prompts = [
  { id: 'p_reply', name: 'Customer reply', model: 'Aurora Chat', version: 'v2.8', owner: 'Subrahmanyam Poluru', status: 'Published' },
  { id: 'p_notes', name: 'Meeting notes', model: 'Atlas Summarizer', version: 'v1.4', owner: 'Kavya Poluru', status: 'Published' },
  { id: 'p_invoice', name: 'Invoice extraction', model: 'Lens Extractor', version: 'v3.1', owner: 'Madhav Poluru', status: 'Draft' },
  { id: 'p_route', name: 'Intent router', model: 'Nova Classifier', version: 'v1.0', owner: 'Harini Poluru', status: 'Published' },
];

export const traces = [
  { id: 'tr_1842', model: 'Aurora Chat', user: 'Meera Poluru', latency: 812, tokens: 1240, status: 'ok', when: '12s ago' },
  { id: 'tr_1841', model: 'Atlas Summarizer', user: 'Kavya Poluru', latency: 1410, tokens: 2860, status: 'ok', when: '41s ago' },
  { id: 'tr_1840', model: 'Lens Extractor', user: 'Madhav Poluru', latency: 2480, tokens: 910, status: 'warn', when: '2m ago' },
  { id: 'tr_1839', model: 'Aurora Chat', user: 'Priya Poluru', latency: 6200, tokens: 410, status: 'error', when: '6m ago' },
  { id: 'tr_1838', model: 'Nova Classifier', user: 'Harini Poluru', latency: 388, tokens: 120, status: 'ok', when: '9m ago' },
  { id: 'tr_1837', model: 'Aurora Chat', user: 'Arjun Poluru', latency: 940, tokens: 780, status: 'ok', when: '14m ago' },
];

export const evaluations = [
  { id: 'ev1', name: 'Customer reply safety', model: 'Aurora Chat', score: 96.8, owner: 'Subrahmanyam Poluru', outcome: 'Passed' },
  { id: 'ev2', name: 'Meeting notes groundedness', model: 'Atlas Summarizer', score: 94.6, owner: 'Kavya Poluru', outcome: 'Passed' },
  { id: 'ev3', name: 'Invoice field accuracy', model: 'Lens Extractor', score: 87.4, owner: 'Madhav Poluru', outcome: 'Needs review' },
  { id: 'ev4', name: 'Intent routing F1', model: 'Nova Classifier', score: 99.1, owner: 'Harini Poluru', outcome: 'Passed' },
];

export const spend = models.map((item) => ({ name: item.name, spend: item.spend, share: item.name === 'Aurora Chat' ? '45%' : item.name === 'Atlas Summarizer' ? '30%' : item.name === 'Lens Extractor' ? '16%' : '9%' }));

export const activities = [
  { title: 'Prompt version published', description: 'Aurora Chat · v2.8 · Subrahmanyam Poluru', timestamp: '4 min ago', status: 'complete' },
  { title: 'Latency threshold updated', description: 'Atlas Summarizer · Kavya Poluru', timestamp: '22 min ago', status: 'current' },
  { title: 'Evaluation completed', description: 'Nova Classifier · 94.6% pass rate', timestamp: '1 hr ago', status: 'upcoming' },
  { title: 'Lens Extractor flagged', description: 'Madhav Poluru opened a review on field accuracy', timestamp: '2 hr ago', status: 'upcoming' },
];

export const notifications = [
  { label: 'p95 latency on Lens', description: '2.4s · Madhav Poluru · 6m', icon: 'alert-triangle' },
  { label: 'Budget 87%', description: '$342 left this month', icon: 'warning' },
  { label: 'Eval passed', description: 'Nova Classifier · Harini Poluru', icon: 'check-circle' },
];

export const commands = [
  { id: 'overview', label: 'Go to overview', href: '/overview' },
  { id: 'models', label: 'Open models', href: '/models' },
  { id: 'aurora', label: 'Aurora Chat', href: '/models/aurora' },
  { id: 'prompts', label: 'Prompt library', href: '/prompts' },
  { id: 'traces', label: 'Live traces', href: '/traces' },
  { id: 'evals', label: 'Evaluations', href: '/evaluations' },
  { id: 'play', label: 'Prompt playground', href: '/playground' },
  { id: 'costs', label: 'Cost report', href: '/costs' },
  { id: 'settings', label: 'Workspace settings', href: '/settings' },
];

export const incidents = [
  { id: 'inc-12', title: 'Lens Extractor p95', owner: 'Madhav Poluru', severity: 'Watch', since: '18 min' },
  { id: 'inc-11', title: 'Aurora timeout burst', owner: 'Priya Poluru', severity: 'Resolved', since: '6 min' },
];

export const promptVersions = {
  p_reply: [
    { heading: 'v2.8 · live', children: 'Customer reply voice for Subrahmanyam Poluru. Published 4 min ago.' },
    { heading: 'v2.7', children: 'Dropped the refund clause after Kavya Poluru’s legal note.' },
    { heading: 'v2.6', children: 'Added Harbor redline tone. Rolled back after latency rose.' },
  ],
  p_notes: [
    { heading: 'v1.4 · live', children: 'Meeting notes for Kavya Poluru. Groundedness gate on.' },
    { heading: 'v1.3', children: 'Too terse on action items. Kept as archive.' },
  ],
  p_invoice: [
    { heading: 'v3.1 · draft', children: 'Invoice fields for Madhav Poluru. Waiting on Lens review.' },
  ],
  p_route: [
    { heading: 'v1.0 · live', children: 'Intent router owned by Harini Poluru.' },
  ],
};

export const promptTemplates = [
  'Draft a reply to Meera Poluru about the Harbor redlines. Keep it under 120 words.',
  'Summarize Kavya Poluru’s notes from the Atlas eval review.',
  'Extract invoice fields for Madhav Poluru’s Lens sample pack.',
  'Classify Priya Poluru’s ticket as billing, product, or legal.',
];

export const dailySpend = [
  { day: 'Mon', amount: 312 },
  { day: 'Tue', amount: 348 },
  { day: 'Wed', amount: 401 },
  { day: 'Thu', amount: 376 },
  { day: 'Fri', amount: 429 },
  { day: 'Sat', amount: 274 },
  { day: 'Sun', amount: 278 },
];

export const deploySteps = [
  { label: 'Endpoint', description: 'Name the serving URL' },
  { label: 'Model', description: 'Pick the stack' },
  { label: 'Review', description: 'Owner signs off' },
];

export const ownerOptions = [
  { value: 'subrahmanyam', label: 'Subrahmanyam Poluru' },
  { value: 'kavya', label: 'Kavya Poluru' },
  { value: 'madhav', label: 'Madhav Poluru' },
  { value: 'harini', label: 'Harini Poluru' },
  { value: 'meera', label: 'Meera Poluru' },
  { value: 'priya', label: 'Priya Poluru' },
];

export const modelOptions = models.map((item) => ({ value: item.id, label: item.name }));

export const guardrails = [
  { id: 'pii', heading: 'PII redaction', children: 'Strip emails, phones, and account numbers before Aurora Chat logs persist. Owned by Kavya Poluru.' },
  { id: 'jail', heading: 'Jailbreak filter', children: 'Block known override patterns on customer reply. Subrahmanyam Poluru reviews weekly.' },
  { id: 'ground', heading: 'Groundedness gate', children: 'Atlas Summarizer must cite a source span or the answer is held. Kavya Poluru owns the threshold.' },
];

export const webhookSnippet = `POST /v1/llm/traces
Authorization: Bearer aurora_live_subrahmanyam
{ "model": "aurora", "latency_ms": 812 }`;

export function findModel(id) {
  return models.find((item) => item.id === id) || models[0];
}

export function statusVariant(status) {
  if (status === 'Production' || status === 'Published' || status === 'Passed' || status === 'ok' || status === 'Healthy') return 'success';
  if (status === 'Review' || status === 'Needs review' || status === 'warn' || status === 'Watch' || status === 'Draft') return 'warning';
  if (status === 'error') return 'danger';
  return 'neutral';
}
