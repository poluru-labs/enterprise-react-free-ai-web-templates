import { useState } from 'react';
import {
  Card,
  CodeSnippet,
  Link,
  NumberInput,
  Rating,
  Search,
  Slider,
  Status,
  Tab,
  Tabs,
  TimePicker,
} from '@poluru-labs/enterprise-design-system-react';
import { hits } from '../data';

const sample = `{
  "prompt": "Support copilot",
  "query": "How do we rotate API keys?",
  "model": "gpt-4.1",
  "owner": "Lakshmi Poluru"
}`;

export default function Playground() {
  const [query, setQuery] = useState('How do we rotate API keys?');
  const [topK, setTopK] = useState(8);
  const [minScore, setMinScore] = useState(0.65);
  const [tab, setTab] = useState(0);
  const [rating, setRating] = useState(4);
  const [evalTime, setEvalTime] = useState('02:30');

  return (
    <>
      <section className="page-head">
        <div>
          <p className="eyebrow">Sandbox</p>
          <h1>Playground</h1>
          <p className="summary">Draft against live prompts, inspect citations, and score grounded answers before release.</p>
        </div>
        <Status label="Hybrid on" variant="success" pulse />
      </section>

      <section className="split">
        <Card elevated>
          <div className="card-body">
            <div className="section-head">
              <h2>Ask the bureau</h2>
              <Link href="#/library">Browse library</Link>
            </div>
            <Search placeholder="How do we rotate API keys?" clearable value={query} onChange={(_, value) => setQuery(value)} />
            <div className="split" style={{ marginTop: '0.9rem', gridTemplateColumns: '1fr 1fr' }}>
              <Slider label="Top K" min={3} max={20} step={1} value={topK} showValue onChange={(_, value) => setTopK(value)} />
              <NumberInput label="Min score" value={minScore} min={0} max={1} step={0.05} hint="Drop chunks below this score" onChange={(_, value) => setMinScore(value)} />
            </div>
            <Tabs selectedIndex={tab} onChange={setTab}>
              <Tab label="Hybrid">Dense + BM25 with reciprocal rank fusion.</Tab>
              <Tab label="Dense">Embedding-only retrieval for semantic matches.</Tab>
              <Tab label="Keyword">BM25 for exact policy and ID lookups.</Tab>
            </Tabs>
            <CodeSnippet code={sample} language="json" label="Last request" />
          </div>
        </Card>

        <Card elevated>
          <div className="card-body">
            <div className="section-head">
              <h2>Grounded hits</h2>
              <Rating value={rating} size="sm" onChange={setRating} />
            </div>
            {hits.map((hit) => (
              <div className="query-hit" key={hit.query}>
                <div>
                  <strong>{hit.query}</strong>
                  <p className="meta">{hit.hit} · {hit.citations} citations</p>
                </div>
                <Status label={hit.score} variant="info" />
              </div>
            ))}
            <div style={{ marginTop: '1rem' }}>
              <TimePicker label="Nightly eval window" hint="Meera Poluru’s quality job" value={evalTime} onChange={(_, value) => setEvalTime(value)} />
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
