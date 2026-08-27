import { Badge, Button, Card, ProgressBar } from '@poluru-labs/enterprise-design-system-react';

const evals = [['Customer reply safety', 'Aurora Chat', 96.8, 'Passed'], ['Meeting notes groundedness', 'Atlas Summarizer', 94.6, 'Passed'], ['Invoice field accuracy', 'Lens Extractor', 87.4, 'Needs review']];

export default function EvaluationsPage() {
  return <Card padded={false}><div className="llm-card-heading"><div><h2>Evaluation runs</h2><p>Quality signals from the latest benchmark suites</p></div><Button variant="primary" size="sm" icon="play">Run evaluation</Button></div><div className="llm-table-wrap"><table className="llm-table"><thead><tr><th>Suite</th><th>Model</th><th>Score</th><th>Outcome</th></tr></thead><tbody>{evals.map(([name, model, score, outcome]) => <tr key={name}><td><strong>{name}</strong></td><td>{model}</td><td><div className="llm-progress-cell"><ProgressBar value={score} max={100} /><span>{score}%</span></div></td><td><Badge variant={outcome === 'Passed' ? 'success' : 'warning'} soft>{outcome}</Badge></td></tr>)}</tbody></table></div></Card>;
}