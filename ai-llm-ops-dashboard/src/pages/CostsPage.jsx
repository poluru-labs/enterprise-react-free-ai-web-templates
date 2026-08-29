import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, DateRangePicker, ProgressBar, Stat, showToast } from '@poluru-labs/enterprise-design-system-react';
import { dailySpend, spend } from '../data';

export default function CostsPage() {
  const [start, setStart] = useState('2026-08-01');
  const [end, setEnd] = useState('2026-08-28');

  useEffect(() => {
    const exportCosts = () => showToast({ title: 'Report exported', description: 'CSV sent to Subrahmanyam Poluru.', variant: 'success' });
    window.addEventListener('llm:export-costs', exportCosts);
    return () => window.removeEventListener('llm:export-costs', exportCosts);
  }, []);

  return (
    <div className="llm-page-grid">
      <Card padded>
        <DateRangePicker label="Period" startValue={start} endValue={end} onChange={(nextStart, nextEnd) => { setStart(nextStart); setEnd(nextEnd); }} />
        <div style={{ marginTop: 18 }}>
          <Stat label="Current period spend" value="$2,418" hint="$342 remaining from monthly budget" />
        </div>
        <ProgressBar className="mt-3" label="Budget used" value={87} showValue />
        <div style={{ marginTop: 12 }}><Badge variant="warning" soft>87% of budget used</Badge></div>
      </Card>
      <Card padded>
        <Stat label="Projected month-end" value="$2,774" hint="Just over the $2,760 forecast line" trend="up" trendValue="+$356" />
        <div className="llm-alert" style={{ marginTop: 16 }}>
          <Alert variant="warning" title="Envelope tight" message="Aurora Chat is 45% of spend. Kavya Poluru can cap tokens on customer reply." />
        </div>
        <div style={{ marginTop: 16 }}>
          <Button variant="secondary" size="sm" icon="download" onClick={() => showToast({ title: 'Report exported', description: 'CSV sent to Subrahmanyam Poluru.', variant: 'success' })}>Export report</Button>
        </div>
      </Card>
      <Card padded={false}>
        <div className="llm-card-heading">
          <div>
            <h2>Spend by model</h2>
            <p>Usage allocation for {start} to {end}</p>
          </div>
        </div>
        <div className="llm-table-wrap">
          <table className="llm-table">
            <thead>
              <tr><th>Model</th><th>Spend</th><th>Share</th></tr>
            </thead>
            <tbody>
              {spend.map((item) => (
                <tr key={item.name}>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.spend}</td>
                  <td>{item.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="llm-card-heading">
          <div>
            <h2>Daily burn</h2>
            <p>This week’s token spend</p>
          </div>
        </div>
        {dailySpend.map((item) => (
          <div key={item.day} className="llm-day-bar">
            <span>{item.day}</span>
            <ProgressBar value={item.amount} max={450} />
            <span>${item.amount}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
