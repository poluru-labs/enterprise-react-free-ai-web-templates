import { Badge, Button, Card } from '@poluru-labs/enterprise-design-system-react';

const prompts = [['Customer reply', 'Aurora Chat', 'v2.8', 'Subrahmanyam Poluru', 'Published'], ['Meeting notes', 'Atlas Summarizer', 'v1.4', 'Kavya Poluru', 'Published'], ['Invoice extraction', 'Lens Extractor', 'v3.1', 'Madhav Poluru', 'Draft']];

export default function PromptsPage() {
  return <Card padded={false}><div className="llm-card-heading"><div><h2>Prompt library</h2><p>Reusable instructions deployed across your models</p></div><Button variant="primary" size="sm" icon="plus">Create prompt</Button></div><div className="llm-table-wrap"><table className="llm-table"><thead><tr><th>Prompt</th><th>Model</th><th>Version</th><th>Owner</th><th>Status</th></tr></thead><tbody>{prompts.map(([name, model, version, owner, status]) => <tr key={name}><td><div className="llm-model-cell"><span className="llm-model-icon"><i className="bi bi-chat-square-text" /></span><strong>{name}</strong></div></td><td>{model}</td><td>{version}</td><td>{owner}</td><td><Badge variant={status === 'Published' ? 'success' : 'neutral'} soft>{status}</Badge></td></tr>)}</tbody></table></div></Card>;
}