import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from '@poluru-labs/enterprise-design-system-react';
import customers from '../data/customers.json';
import macros from '../data/macros.json';
import knowledge from '../data/knowledge.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { allTickets } from '../lib/tickets.js';
import { searchRecords } from '../lib/search.js';
import { ChartSection, DataTable, FilterBar, PageHeader, PriorityBadge, StatusBadge } from '../components/widgets/index.js';

export default function SearchPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');

  const ticketHits = useMemo(
    () => searchRecords(allTickets(), query, ['id', 'subject', 'customer', 'assignee', 'tags']),
    [query],
  );
  const customerHits = useMemo(
    () => searchRecords(customers.items, query, ['name', 'owner', 'plan', 'region']),
    [query],
  );
  const macroHits = useMemo(
    () => searchRecords(macros.items, query, ['name', 'owner', 'body']),
    [query],
  );
  const articleHits = useMemo(
    () => searchRecords(knowledge.items, query, ['id', 'title', 'summary', 'owner']),
    [query],
  );

  return (
    <div className="desk-page">
      <PageHeader
        title="Search"
        description="Tickets, customers, macros, and copilot articles in one pass."
        crumbs={[BREADCRUMB_ROOT, { label: 'Search' }]}
      />

      <FilterBar
        search={
          <Search
            value={query}
            placeholder="Tickets, customers, macros"
            onChange={(_, value) => {
              setQuery(value);
              setParams(value ? { q: value } : {});
            }}
          />
        }
        onReset={() => {
          setQuery('');
          setParams({});
        }}
      />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-7">
          <ChartSection title="Tickets" subtitle={`${ticketHits.length} matches`}>
            <DataTable
              rows={ticketHits.slice(0, 8)}
              emptyTitle="No tickets"
              emptyDescription="Try a ticket id, account, or tag."
              onRowClick={(row) => navigate(`${BASE_PATH}/tickets/${row.id}`)}
              columns={[
                { key: 'id', label: 'Id', className: 'desk-mono' },
                { key: 'subject', label: 'Subject' },
                { key: 'customer', label: 'Customer' },
                {
                  key: 'priority',
                  label: 'Priority',
                  render: (value) => <PriorityBadge priority={value} />,
                },
                {
                  key: 'status',
                  label: 'Status',
                  render: (value) => <StatusBadge status={value} />,
                },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-5">
          <ChartSection title="Customers" subtitle={`${customerHits.length} matches`}>
            <DataTable
              rows={customerHits}
              emptyTitle="No accounts"
              onRowClick={() => navigate(`${BASE_PATH}/customers`)}
              columns={[
                { key: 'name', label: 'Account' },
                { key: 'owner', label: 'Owner' },
                { key: 'openTickets', label: 'Open' },
              ]}
            />
          </ChartSection>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-6">
          <ChartSection title="Macros" subtitle={`${macroHits.length} matches`}>
            <DataTable
              rows={macroHits}
              emptyTitle="No macros"
              onRowClick={() => navigate(`${BASE_PATH}/macros`)}
              columns={[
                { key: 'name', label: 'Macro' },
                { key: 'owner', label: 'Owner' },
                { key: 'uses', label: 'Uses' },
              ]}
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-6">
          <ChartSection title="Knowledge" subtitle={`${articleHits.length} matches`}>
            <DataTable
              rows={articleHits}
              emptyTitle="No articles"
              onRowClick={() => navigate(`${BASE_PATH}/knowledge`)}
              columns={[
                { key: 'id', label: 'Id', className: 'desk-mono' },
                { key: 'title', label: 'Article' },
                { key: 'usedByCopilot', label: 'Uses' },
              ]}
            />
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
