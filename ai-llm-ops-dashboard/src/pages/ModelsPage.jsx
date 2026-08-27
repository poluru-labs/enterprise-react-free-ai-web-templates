import { Badge, Button, Card, ProgressBar } from '@poluru-labs/enterprise-design-system-react';

const modelRows = [
  ['Aurora Chat', 'gpt-4.1-mini', 'Subrahmanyam Poluru', 99.4, 'Production'],
  ['Atlas Summarizer', 'claude-3-7-sonnet', 'Kavya Poluru', 98.8, 'Production'],
  ['Lens Extractor', 'gemini-2.5-flash', 'Madhav Poluru', 96.2, 'Review'],
  ['Nova Classifier', 'phi-4', 'Harini Poluru', 99.8, 'Production'],
];

export default function ModelsPage() {
  return <Card padded={false}><div className="llm-card-heading"><div><h2>Registered models</h2><p>Version, ownership, and production readiness</p></div><Button variant="primary" size="sm" icon="plus">Add model</Button></div><div className="llm-table-wrap"><table className="llm-table"><thead><tr><th>Model</th><th>Version</th><th>Owner</th><th>Reliability</th><th>Status</th></tr></thead><tbody>{modelRows.map(([name, version, owner, score, status]) => <tr key={name}><td><div className="llm-model-cell"><span className="llm-model-icon"><i className="bi bi-cpu" /></span><strong>{name}</strong></div></td><td>{version}</td><td>{owner}</td><td><div className="llm-progress-cell"><ProgressBar value={score} max={100} /><span>{score}%</span></div></td><td><Badge variant={status === 'Production' ? 'success' : 'warning'} soft>{status}</Badge></td></tr>)}</tbody></table></div></Card>;
}