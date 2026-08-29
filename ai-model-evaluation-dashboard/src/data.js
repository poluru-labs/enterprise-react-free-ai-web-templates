export const productName = 'Prism';

export const currentUser = {
  name: 'Meera Poluru',
  email: 'meera.poluru@polurulabs.example',
  role: 'Evaluation lead',
};

export const navItems = [
  { id: 'overview', label: 'Overview', href: '#/overview', icon: 'home' },
  { id: 'leaderboard', label: 'Leaderboard', href: '#/leaderboard', icon: 'star' },
  { id: 'suites', label: 'Suites', href: '#/suites', icon: 'folder' },
  { id: 'runs', label: 'Runs', href: '#/runs', icon: 'check-circle' },
  { id: 'compare', label: 'Compare', href: '#/compare', icon: 'filter' },
  { id: 'review', label: 'Review', href: '#/review', icon: 'edit' },
  { id: 'settings', label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Pass rate', value: '94.6%', hint: 'Across 6 live suites', trend: 'up', trendValue: '+1.8 pts' },
  { label: 'Open reviews', value: '12', hint: '4 blocked on judges', trend: 'down', trendValue: '-3' },
  { label: 'Mean score', value: '91.2', hint: 'Weighted quality index', trend: 'up', trendValue: '+0.7' },
  { label: 'Eval hours', value: '38h', hint: 'This week on Prism', trend: 'flat', trendValue: '0' },
];

export const scoreSeries = [86.4, 87.1, 88.0, 88.6, 89.4, 90.1, 90.4, 90.8, 91.0, 91.2, 91.4, 91.2];

export function sparkPoints(values, width = 220, height = 56) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');
}

export const models = [
  { id: 'aurora', name: 'Aurora Chat', owner: 'Meera Poluru', provider: 'OpenAI', safety: 96.8, ground: 93.4, accuracy: 94.1, latency: 820, score: 94.8, status: 'Production' },
  { id: 'atlas', name: 'Atlas Summarizer', owner: 'Kavya Poluru', provider: 'Anthropic', safety: 97.2, ground: 94.6, accuracy: 91.8, latency: 1180, score: 94.1, status: 'Production' },
  { id: 'lens', name: 'Lens Extractor', owner: 'Madhav Poluru', provider: 'Google', safety: 92.4, ground: 87.4, accuracy: 88.9, latency: 640, score: 88.2, status: 'Review' },
  { id: 'nova', name: 'Nova Classifier', owner: 'Harini Poluru', provider: 'Azure', safety: 99.1, ground: 98.4, accuracy: 99.0, latency: 410, score: 98.7, status: 'Production' },
  { id: 'harbor', name: 'Harbor Encoder', owner: 'Arjun Poluru', provider: 'Poluru', safety: 95.0, ground: 92.1, accuracy: 94.2, latency: 210, score: 93.6, status: 'Candidate' },
  { id: 'nimbus', name: 'Nimbus Ranker', owner: 'Sahana Poluru', provider: 'Poluru', safety: 93.8, ground: 89.4, accuracy: 90.6, latency: 340, score: 90.8, status: 'Tuning' },
];

export const modelOptions = models.map((item) => ({ value: item.id, label: item.name }));

export const suites = [
  { id: 's_safety', name: 'Customer reply safety', owner: 'Meera Poluru', cases: 420, pass: 96.8, status: 'Live', model: 'Aurora Chat' },
  { id: 's_notes', name: 'Meeting notes groundedness', owner: 'Kavya Poluru', cases: 180, pass: 94.6, status: 'Live', model: 'Atlas Summarizer' },
  { id: 's_invoice', name: 'Invoice field accuracy', owner: 'Madhav Poluru', cases: 260, pass: 87.4, status: 'Watch', model: 'Lens Extractor' },
  { id: 's_intent', name: 'Intent routing F1', owner: 'Harini Poluru', cases: 640, pass: 99.1, status: 'Live', model: 'Nova Classifier' },
  { id: 's_harbor', name: 'Harbor retrieval nDCG', owner: 'Arjun Poluru', cases: 1200, pass: 93.6, status: 'Live', model: 'Harbor Encoder' },
  { id: 's_nimbus', name: 'Nimbus rank quality', owner: 'Sahana Poluru', cases: 540, pass: 90.8, status: 'Draft', model: 'Nimbus Ranker' },
];

export const suiteOptions = suites.map((item) => ({ value: item.id, label: item.name }));

export const datasetTree = [
  {
    id: 'pack_safety',
    label: 'safety-gold-v6',
    children: [
      { id: 'pack_safety_train', label: 'train.jsonl · Meera Poluru' },
      { id: 'pack_safety_holdout', label: 'holdout.jsonl' },
    ],
  },
  { id: 'pack_notes', label: 'notes-ground-v3 · Kavya Poluru' },
  { id: 'pack_invoice', label: 'invoice-fields-v2 · Madhav Poluru' },
  { id: 'pack_intent', label: 'intent-gold-v1 · Harini Poluru' },
];

export const runs = [
  { id: 'ev_1842', name: 'aurora-safety-28', suite: 'Customer reply safety', owner: 'Meera Poluru', model: 'Aurora Chat', score: 96.8, status: 'Passed', samples: 420, duration: '8m', when: '12m ago' },
  { id: 'ev_1841', name: 'atlas-notes-14', suite: 'Meeting notes groundedness', owner: 'Kavya Poluru', model: 'Atlas Summarizer', score: 94.6, status: 'Passed', samples: 180, duration: '6m', when: '41m ago' },
  { id: 'ev_1840', name: 'lens-invoice-31', suite: 'Invoice field accuracy', owner: 'Madhav Poluru', model: 'Lens Extractor', score: 87.4, status: 'Needs review', samples: 260, duration: '11m', when: '2h ago' },
  { id: 'ev_1839', name: 'nova-intent-10', suite: 'Intent routing F1', owner: 'Harini Poluru', model: 'Nova Classifier', score: 99.1, status: 'Passed', samples: 640, duration: '4m', when: '3h ago' },
  { id: 'ev_1838', name: 'harbor-ndcg-22', suite: 'Harbor retrieval nDCG', owner: 'Arjun Poluru', model: 'Harbor Encoder', score: 93.6, status: 'Running', samples: 1200, duration: '18m', when: 'now' },
  { id: 'ev_1837', name: 'nimbus-rank-09', suite: 'Nimbus rank quality', owner: 'Sahana Poluru', model: 'Nimbus Ranker', score: 90.8, status: 'Queued', samples: 540, duration: '—', when: 'in 12m' },
  { id: 'ev_1836', name: 'aurora-safety-27', suite: 'Customer reply safety', owner: 'Priya Poluru', model: 'Aurora Chat', score: 94.2, status: 'Failed', samples: 420, duration: '9m', when: '1d ago' },
];

export const runColumns = [
  { key: 'name', label: 'Run' },
  { key: 'suite', label: 'Suite' },
  { key: 'owner', label: 'Owner' },
  { key: 'model', label: 'Model' },
  { key: 'status', label: 'Status' },
  { key: 'score', label: 'Score' },
];

export const leaderboardColumns = [
  { key: 'rank', label: '#' },
  { key: 'name', label: 'Model' },
  { key: 'owner', label: 'Owner' },
  { key: 'safety', label: 'Safety' },
  { key: 'ground', label: 'Ground' },
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'score', label: 'Index' },
  { key: 'status', label: 'Status' },
];

export const samples = [
  { id: 'sm_01', prompt: 'Refund the Harbor invoice for Meera Poluru.', model: 'Aurora Chat', predicted: 'I can start a refund review for Harbor. Kavya Poluru will confirm the amount.', expected: 'Offer a refund path without promising a date.', verdict: 'Pass', owner: 'Meera Poluru' },
  { id: 'sm_02', prompt: 'Summarize Kavya Poluru’s Atlas notes.', model: 'Atlas Summarizer', predicted: 'Atlas is ready. Groundedness 94.6%.', expected: 'Cite the eval doc span.', verdict: 'Pass', owner: 'Kavya Poluru' },
  { id: 'sm_03', prompt: 'Extract PO, total, and vendor from Madhav Poluru’s scan.', model: 'Lens Extractor', predicted: 'PO missing · total $1840 · vendor Harbor', expected: 'PO-4412 · $1,840 · Harbor Legal', verdict: 'Fail', owner: 'Madhav Poluru' },
  { id: 'sm_04', prompt: 'Route Priya Poluru’s ticket.', model: 'Nova Classifier', predicted: 'billing', expected: 'billing', verdict: 'Pass', owner: 'Harini Poluru' },
  { id: 'sm_05', prompt: 'Rank Harbor docs for Arjun Poluru’s query.', model: 'Harbor Encoder', predicted: 'doc-12, doc-4, doc-9', expected: 'doc-4, doc-12, doc-9', verdict: 'Review', owner: 'Arjun Poluru' },
];

export const timeline = [
  { title: 'Nova Classifier passed 99.1%', description: 'Harini Poluru promoted intent routing F1.', timestamp: '12m ago', status: 'complete' },
  { title: 'Lens invoice run needs review', description: 'Madhav Poluru opened 14 disagreement rows.', timestamp: '2h ago', status: 'current' },
  { title: 'Harbor nDCG is still running', description: 'Arjun Poluru queued 1,200 retrieval cases.', timestamp: '3h ago', status: 'upcoming' },
  { title: 'Safety gold pack refreshed', description: 'Meera Poluru shipped 38 new jailbreak rows.', timestamp: '1d ago', status: 'upcoming' },
];

export const alerts = [
  { heading: 'Lens Extractor dropped 2.4 pts', children: 'Invoice field accuracy is 87.4%. Madhav Poluru should hold production traffic until PO recall recovers.' },
  { heading: '12 samples wait on judges', children: 'Priya Poluru and Hana Poluru still owe labels on Harbor retrieval disagreements.' },
  { heading: 'Nimbus rank suite is still a draft', children: 'Sahana Poluru has 540 cases ready. Promote after the next human pass.' },
];

export const notifications = [
  { label: 'Lens needs review', description: 'invoice-31 · Madhav Poluru · 2h', icon: 'alert-triangle' },
  { label: 'Nova passed', description: 'intent-10 · 99.1% · Harini Poluru', icon: 'check-circle' },
  { label: 'Harbor still running', description: 'ndcg-22 · 62% complete · Arjun Poluru', icon: 'clock' },
];

export const commands = [
  { id: 'overview', label: 'Go to overview', href: '#/overview' },
  { id: 'board', label: 'Open leaderboard', href: '#/leaderboard' },
  { id: 'suites', label: 'Browse suites', href: '#/suites' },
  { id: 'runs', label: 'Eval runs', href: '#/runs' },
  { id: 'lens', label: 'lens-invoice-31', href: '#/run/ev_1840' },
  { id: 'compare', label: 'Compare models', href: '#/compare' },
  { id: 'review', label: 'Human review queue', href: '#/review' },
  { id: 'settings', label: 'Workspace settings', href: '#/settings' },
];

export const ownerOptions = [
  { value: 'meera', label: 'Meera Poluru' },
  { value: 'kavya', label: 'Kavya Poluru' },
  { value: 'madhav', label: 'Madhav Poluru' },
  { value: 'harini', label: 'Harini Poluru' },
  { value: 'arjun', label: 'Arjun Poluru' },
  { value: 'sahana', label: 'Sahana Poluru' },
  { value: 'priya', label: 'Priya Poluru' },
  { value: 'hana', label: 'Hana Poluru' },
];

export const judgeOptions = [
  { value: 'llm', label: 'LLM judge · Aurora' },
  { value: 'rubric', label: 'Rubric scorer' },
  { value: 'human', label: 'Human panel' },
];

export const evalSteps = [
  { label: 'Suite', description: 'Pick the pack' },
  { label: 'Model', description: 'Choose the stack' },
  { label: 'Review', description: 'Owner signs off' },
];

export const runSteps = [
  { label: 'Queue' },
  { label: 'Score' },
  { label: 'Judge' },
  { label: 'Review' },
  { label: 'Publish' },
];

export const team = [
  { name: 'Meera Poluru', role: 'Owner' },
  { name: 'Kavya Poluru', role: 'Editor' },
  { name: 'Madhav Poluru', role: 'Editor' },
  { name: 'Harini Poluru', role: 'Viewer' },
  { name: 'Arjun Poluru', role: 'Editor' },
];

export const webhookSnippet = `prism eval submit \\
  --suite customer-reply-safety \\
  --model aurora-chat \\
  --owner "Meera Poluru"`;

export function findModel(id) {
  return models.find((item) => item.id === id) || models[0];
}

export function findSuite(id) {
  return suites.find((item) => item.id === id) || suites[0];
}

export function findRun(id) {
  return runs.find((item) => item.id === id) || runs[0];
}

export function statusTone(status) {
  if (status === 'Passed' || status === 'Live' || status === 'Production' || status === 'Pass') return 'success';
  if (status === 'Running' || status === 'Queued' || status === 'Candidate' || status === 'Tuning' || status === 'Draft' || status === 'Review') return 'info';
  if (status === 'Needs review' || status === 'Watch') return 'warning';
  if (status === 'Failed' || status === 'Fail') return 'danger';
  return 'neutral';
}
