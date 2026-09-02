import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Textarea, showToast } from '@poluru-labs/enterprise-design-system-react';
import macros from '../data/macros.json';
import { BASE_PATH, BREADCRUMB_ROOT, SIGNED_IN_USER } from '../constants/navigation.js';
import { findTicket } from '../lib/tickets.js';
import { formatDateTime } from '../lib/format.js';
import {
  ChartSection,
  PageHeader,
  PriorityBadge,
  SlaBadge,
  StatCard,
  StatusBadge,
} from '../components/widgets/index.js';

export default function TicketDetailPage() {
  const { id } = useParams();
  const ticket = findTicket(id);
  const [draft, setDraft] = useState('');
  const published = useMemo(() => macros.items.filter((item) => item.status === 'Published'), []);

  const send = () => {
    if (!draft.trim()) {
      showToast({ title: 'Write a reply first', variant: 'warning' });
      return;
    }
    showToast({
      title: 'Reply sent',
      description: `${ticket.id} · as ${SIGNED_IN_USER.name}`,
      variant: 'success',
    });
    setDraft('');
  };

  return (
    <div className="desk-page">
      <PageHeader
        title={ticket.subject}
        description={`${ticket.customer} · ${ticket.requester} · ${ticket.channel}`}
        crumbs={[
          BREADCRUMB_ROOT,
          { label: 'Tickets', to: `${BASE_PATH}/tickets` },
          { label: ticket.id },
        ]}
        actions={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setDraft(ticket.aiDraft || '');
                showToast({
                  title: 'AI draft inserted',
                  description: 'Review before you send. Harini still owns PII drafts.',
                  variant: 'info',
                });
              }}
            >
              AI draft
            </Button>
            <Button size="sm" onClick={send}>
              Send reply
            </Button>
          </>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Priority" value={ticket.priority} hint={ticket.slaLeft} icon="bi-lightning" tone={ticket.priority === 'P1' ? 'danger' : ticket.priority === 'P2' ? 'warning' : 'brand'} />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Assignee" value={ticket.assignee} hint={ticket.status} icon="bi-person" tone="info" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="SLA" value={ticket.slaLeft} hint={ticket.sla} icon="bi-hourglass-split" tone={ticket.sla === 'breached' || ticket.sla === 'at_risk' || ticket.sla === 'risk' ? 'danger' : 'success'} />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="Updated" value={formatDateTime(ticket.updatedAt)} hint={ticket.email} icon="bi-clock" tone="brand" />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-8">
          <ChartSection title="Conversation" subtitle={`${ticket.messages.length} messages · ${ticket.tags.join(' · ')}`}>
            <div className="desk-thread-meta mb-3">
              <PriorityBadge priority={ticket.priority} />
              <StatusBadge status={ticket.status} />
              <SlaBadge sla={ticket.sla} />
              <Link className="desk-text-link" to={`${BASE_PATH}/customers`}>
                {ticket.customer}
              </Link>
            </div>
            <ul className="desk-thread">
              {ticket.messages.map((message) => (
                <li key={message.id} className={`desk-bubble role-${message.role}`}>
                  <header>
                    <strong>{message.author}</strong>
                    <span>{formatDateTime(message.time)}</span>
                  </header>
                  <p>{message.body}</p>
                </li>
              ))}
            </ul>
            <div className="desk-composer">
              <Textarea
                label="Reply"
                value={draft}
                placeholder="Write to the customer, or insert a macro / AI draft."
                onChange={(event) => setDraft(event.target.value)}
              />
              <div className="desk-composer-actions">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setDraft(ticket.aiDraft || '');
                    showToast({ title: 'AI draft inserted', variant: 'info' });
                  }}
                >
                  AI draft
                </Button>
                <Button size="sm" onClick={send}>
                  Send
                </Button>
              </div>
            </div>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-4">
          <ChartSection title="Macros" subtitle="Insert a canned reply">
            <div className="desk-macro-list">
              {published.slice(0, 6).map((macro) => (
                <button
                  key={macro.id}
                  type="button"
                  className="desk-macro-insert"
                  onClick={() => {
                    setDraft(macro.body);
                    showToast({ title: 'Macro inserted', description: macro.name, variant: 'success' });
                  }}
                >
                  <strong>{macro.name}</strong>
                  <span>{macro.owner} · {macro.uses} uses</span>
                </button>
              ))}
            </div>
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
