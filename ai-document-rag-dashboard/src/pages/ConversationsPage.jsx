import { useState } from 'react';
import { Button } from '@poluru-labs/enterprise-design-system-react';
import conversationsData from '../data/conversations.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { ChartSection, PageHeader, StatusBadge } from '../components/widgets/index.js';

export default function ConversationsPage() {
  const [selectedId, setSelectedId] = useState(conversationsData.chats[0].id);
  const selected = conversationsData.chats.find((chat) => chat.id === selectedId) || conversationsData.chats[0];

  return (
    <div className="rag-page">
      <PageHeader
        title="Conversations"
        description="Review real retrieval activity and the sources that grounded each answer."
        crumbs={[BREADCRUMB_ROOT, { label: 'Conversations' }]}
        actions={
          <Button variant="secondary" size="sm" icon="download">
            Export
          </Button>
        }
      />

      <div className="row g-3">
        <div className="col-12 col-xl-5">
          <ChartSection title="Recent conversations" subtitle="Needs review vs resolved">
            <div className="rag-conversation-list">
              {conversationsData.chats.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  className={`rag-conversation-item ${chat.id === selected.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedId(chat.id)}
                >
                  <span className="rag-person-avatar">
                    {chat.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </span>
                  <span>
                    <strong>{chat.title}</strong>
                    <small>
                      {chat.name} · {chat.time}
                    </small>
                  </span>
                  <StatusBadge status={chat.status} />
                </button>
              ))}
            </div>
          </ChartSection>
        </div>
        <div className="col-12 col-xl-7">
          <article className="rag-panel rag-conversation-detail">
            <header className="rag-panel-header">
              <div className="rag-chat-meta">
                <span className="rag-person-avatar">
                  {selected.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </span>
                <div>
                  <h2>{selected.name}</h2>
                  <p>{selected.time}</p>
                </div>
              </div>
              <StatusBadge status={selected.status} />
            </header>
            <div className="rag-panel-body">
              <div className="rag-chat-question">{selected.question}</div>
              <div className="rag-chat-answer">
                <span className="rag-answer-mark">
                  <i className="bi bi-stars" aria-hidden="true" />
                </span>
                <p>{selected.answer}</p>
              </div>
              <div className="rag-chat-source">
                <i className="bi bi-file-earmark-text" aria-hidden="true" />
                {selected.source.title}
                <span>{selected.source.flag}</span>
              </div>
              <Button variant="secondary" size="sm" icon="eye">
                Review source
              </Button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
