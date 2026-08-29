export const productName = 'Kiln';

export const currentUser = {
  name: 'Kavya Poluru',
  email: 'kavya.poluru@polurulabs.example',
  role: 'Training lead',
};

export const navItems = [
  { id: 'overview', label: 'Overview', href: '#/overview', icon: 'home' },
  { id: 'runs', label: 'Runs', href: '#/runs', icon: 'star' },
  { id: 'experiments', label: 'Experiments', href: '#/experiments', icon: 'folder' },
  { id: 'datasets', label: 'Datasets', href: '#/datasets', icon: 'file' },
  { id: 'models', label: 'Models', href: '#/models', icon: 'check-circle' },
  { id: 'clusters', label: 'Clusters', href: '#/clusters', icon: 'clock' },
  { id: 'settings', label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Active runs', value: '18', hint: '6 on A100 · 4 on H100', trend: 'up', trendValue: '+5' },
  { label: 'GPU utilization', value: '86%', hint: 'eu-west-1 is hot', trend: 'up', trendValue: '+9 pts' },
  { label: 'Queue wait', value: '11m', hint: 'Median this hour', trend: 'down', trendValue: '-4m' },
  { label: 'Val accuracy', value: '94.2%', hint: 'Harbor encoder v3', trend: 'up', trendValue: '+1.1 pts' },
];

export const lossSeries = [2.84, 2.41, 2.08, 1.76, 1.52, 1.31, 1.18, 1.09, 0.97, 0.91, 0.86, 0.82];

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

export const runs = [
  {
    id: 'run_harbor',
    name: 'harbor-encoder-v3',
    experiment: 'Harbor encoder',
    owner: 'Kavya Poluru',
    status: 'Running',
    epoch: '12 / 20',
    gpu: '8×H100',
    eta: '2h 14m',
    acc: '94.2%',
    loss: 0.82,
    cluster: 'eu-west-1',
  },
  {
    id: 'run_nimbus',
    name: 'nimbus-ranker-12',
    experiment: 'Nimbus retrieval',
    owner: 'Arjun Poluru',
    status: 'Queued',
    epoch: '0 / 16',
    gpu: '4×A100',
    eta: '11m',
    acc: '—',
    loss: null,
    cluster: 'us-east-1',
  },
  {
    id: 'run_lumen',
    name: 'lumen-ehr-ft',
    experiment: 'Lumen clinical',
    owner: 'Jordan Poluru',
    status: 'Failed',
    epoch: '4 / 12',
    gpu: '2×A100',
    eta: '—',
    acc: '81.4%',
    loss: 1.46,
    cluster: 'us-east-1',
  },
  {
    id: 'run_bright',
    name: 'bright-embed-7',
    experiment: 'Brightline embeddings',
    owner: 'Maya Poluru',
    status: 'Succeeded',
    epoch: '30 / 30',
    gpu: '4×A100',
    eta: 'Done',
    acc: '91.8%',
    loss: 0.44,
    cluster: 'us-east-1',
  },
  {
    id: 'run_oak',
    name: 'oak-vision-s2',
    experiment: 'Oak vision',
    owner: 'Sahana Poluru',
    status: 'Running',
    epoch: '7 / 24',
    gpu: '8×A100',
    eta: '5h 02m',
    acc: '88.1%',
    loss: 1.12,
    cluster: 'us-east-1',
  },
  {
    id: 'run_kite',
    name: 'kite-distill-mini',
    experiment: 'Kite distill',
    owner: 'Rohan Poluru',
    status: 'Succeeded',
    epoch: '40 / 40',
    gpu: '1×L40S',
    eta: 'Done',
    acc: '86.4%',
    loss: 0.61,
    cluster: 'ap-south-1',
  },
  {
    id: 'run_fold',
    name: 'fold-label-mix',
    experiment: 'Fold labels',
    owner: 'Hana Poluru',
    status: 'Running',
    epoch: '3 / 10',
    gpu: '2×A100',
    eta: '48m',
    acc: '79.6%',
    loss: 1.28,
    cluster: 'us-east-1',
  },
  {
    id: 'run_field',
    name: 'fieldwork-forecast',
    experiment: 'Fieldwork series',
    owner: 'Priya Poluru',
    status: 'Queued',
    epoch: '0 / 18',
    gpu: '4×H100',
    eta: '26m',
    acc: '—',
    loss: null,
    cluster: 'eu-west-1',
  },
];

export const runColumns = [
  { key: 'name', label: 'Run' },
  { key: 'experiment', label: 'Experiment' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'gpu', label: 'GPU' },
  { key: 'eta', label: 'ETA' },
];

export const experiments = [
  { id: 'exp_harbor', name: 'Harbor encoder', owner: 'Kavya Poluru', runs: 14, best: '94.2%', status: 'Live' },
  { id: 'exp_nimbus', name: 'Nimbus retrieval', owner: 'Arjun Poluru', runs: 9, best: '89.4%', status: 'Tuning' },
  { id: 'exp_lumen', name: 'Lumen clinical', owner: 'Jordan Poluru', runs: 6, best: '81.4%', status: 'Blocked' },
  { id: 'exp_oak', name: 'Oak vision', owner: 'Sahana Poluru', runs: 11, best: '88.1%', status: 'Live' },
  { id: 'exp_kite', name: 'Kite distill', owner: 'Rohan Poluru', runs: 4, best: '86.4%', status: 'Shipped' },
];

export const datasets = [
  { id: 'ds_harbor', name: 'harbor-ops-v4', rows: '12.4M', owner: 'Meera Poluru', freshness: '2h', quality: 96 },
  { id: 'ds_nimbus', name: 'nimbus-catalog', rows: '4.8M', owner: 'Arjun Poluru', freshness: '8h', quality: 91 },
  { id: 'ds_lumen', name: 'lumen-notes-deid', rows: '1.1M', owner: 'Nikhil Poluru', freshness: '1d', quality: 88 },
  { id: 'ds_fold', name: 'fold-labels-gold', rows: '240k', owner: 'Hana Poluru', freshness: '3h', quality: 98 },
];

export const datasetTree = [
  {
    id: 'ds_harbor',
    label: 'harbor-ops-v4',
    children: [
      { id: 'ds_harbor_train', label: 'train.parquet · Meera Poluru' },
      { id: 'ds_harbor_val', label: 'val.parquet' },
    ],
  },
  { id: 'ds_nimbus', label: 'nimbus-catalog' },
  { id: 'ds_lumen', label: 'lumen-notes-deid' },
  { id: 'ds_fold', label: 'fold-labels-gold' },
];

export const models = [
  { id: 'm_harbor', name: 'kiln-harbor-v3', owner: 'Kavya Poluru', params: '1.2B', acc: '94.2%', stage: 'Candidate' },
  { id: 'm_bright', name: 'kiln-embed-7', owner: 'Maya Poluru', params: '350M', acc: '91.8%', stage: 'Production' },
  { id: 'm_kite', name: 'kiln-distill-mini', owner: 'Rohan Poluru', params: '80M', acc: '86.4%', stage: 'Production' },
  { id: 'm_oak', name: 'kiln-vision-s2', owner: 'Sahana Poluru', params: '620M', acc: '88.1%', stage: 'Training' },
];

export const clusters = [
  { id: 'c_east', name: 'us-east-1', gpus: '64×A100', util: 82, queue: 7, owner: 'Elena Poluru' },
  { id: 'c_west', name: 'eu-west-1', gpus: '32×H100', util: 94, queue: 11, owner: 'Luca Poluru' },
  { id: 'c_south', name: 'ap-south-1', gpus: '16×L40S', util: 41, queue: 1, owner: 'Noor Poluru' },
];

export const timeline = [
  { title: 'harbor-encoder-v3 passed 94%', description: 'Kavya Poluru promoted the checkpoint.', timestamp: '12m ago', status: 'complete' },
  { title: 'lumen-ehr-ft OOM on rank 3', description: 'Jordan Poluru is retrying with grad checkpointing.', timestamp: '28m ago', status: 'current' },
  { title: 'nimbus-ranker-12 entered queue', description: 'Arjun Poluru requested 4×A100.', timestamp: '41m ago', status: 'upcoming' },
  { title: 'fold-labels-gold refreshed', description: 'Hana Poluru shipped 18k new rows.', timestamp: '3h ago', status: 'upcoming' },
];

export const alerts = [
  { heading: 'eu-west-1 is at 94% GPU', children: 'H100 wait is 11 minutes. Preempt nimbus-ranker-12 if Harbor needs a second replica.' },
  { heading: 'Lumen run failed on step 4,812', children: 'CUDA OOM. Jordan Poluru can relaunch with microbatch 2.' },
  { heading: 'Dataset drift on nimbus-catalog', children: 'Arjun Poluru’s catalog grew 9% overnight. Recompute embeddings before the next ranker.' },
];

export const notifications = [
  { label: 'Harbor checkpoint saved', description: 'epoch 12 · 94.2% · 8m ago', icon: 'save' },
  { label: 'Queue moved', description: 'nimbus-ranker-12 is next · Arjun Poluru', icon: 'clock' },
  { label: 'Cluster watch', description: 'eu-west-1 util 94% · Luca Poluru', icon: 'alert-triangle' },
];

export const commands = [
  { id: 'overview', label: 'Go to overview', href: '#/overview' },
  { id: 'runs', label: 'Open training runs', href: '#/runs' },
  { id: 'harbor', label: 'harbor-encoder-v3', href: '#/run/run_harbor' },
  { id: 'lumen', label: 'lumen-ehr-ft', href: '#/run/run_lumen' },
  { id: 'datasets', label: 'Browse datasets', href: '#/datasets' },
  { id: 'clusters', label: 'GPU clusters', href: '#/clusters' },
];

export const ownerOptions = [
  { value: 'kavya', label: 'Kavya Poluru' },
  { value: 'arjun', label: 'Arjun Poluru' },
  { value: 'maya', label: 'Maya Poluru' },
  { value: 'jordan', label: 'Jordan Poluru' },
  { value: 'sahana', label: 'Sahana Poluru' },
  { value: 'rohan', label: 'Rohan Poluru' },
  { value: 'hana', label: 'Hana Poluru' },
  { value: 'priya', label: 'Priya Poluru' },
];

export const clusterOptions = clusters.map((item) => ({ value: item.id, label: item.name }));

export const runSteps = [
  { label: 'Init' },
  { label: 'Data' },
  { label: 'Train' },
  { label: 'Eval' },
  { label: 'Publish' },
];

export const webhookSnippet = `kiln train submit \\
  --experiment harbor-encoder \\
  --owner "Kavya Poluru" \\
  --cluster eu-west-1 \\
  --gpus 8`;

export function statusTone(status) {
  if (status === 'Running' || status === 'Live' || status === 'Production') return 'success';
  if (status === 'Queued' || status === 'Tuning' || status === 'Training' || status === 'Candidate') return 'info';
  if (status === 'Failed' || status === 'Blocked') return 'danger';
  return 'neutral';
}

export function findRun(id) {
  return runs.find((item) => item.id === id) || runs[0];
}
