import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Meter,
  ProgressBar,
  Switch,
  Tab,
  Tabs,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
import tenants from '../data/tenants.json';
import billing from '../data/billing.json';
import flags from '../data/flags.json';
import users from '../data/users.json';
import { BASE_PATH, BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency, formatDate, formatNumber } from '../lib/format.js';
import { ChartSection, DataTable, PageHeader, StatCard, StatusBadge } from '../components/widgets/index.js';

export default function TenantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tenant = tenants.find((item) => item.id === id);

  if (!tenant) {
    return <Navigate to={`${BASE_PATH}/tenants`} replace />;
  }

  const invoices = billing.invoices.filter((item) => item.tenantId === tenant.id);
  const members = users.filter((item) => item.tenantId === tenant.id);
  const tenantFlags = flags.map((flag) => ({
    ...flag,
    on: tenant.flags.includes(flag.id),
  }));

  return (
    <div className="nx-page">
      <PageHeader
        title={tenant.name}
        description={`${tenant.owner} · ${tenant.plan} · ${tenant.region}`}
        crumbs={[BREADCRUMB_ROOT, { label: 'Tenants', to: `${BASE_PATH}/tenants` }, { label: tenant.name }]}
        actions={
          <ButtonGroup size="sm">
            <Button
              variant="secondary"
              onClick={() =>
                showToast({
                  title: tenant.status === 'Suspended' ? 'Already offline' : 'Suspend queued',
                  description: `${tenant.name} will lose sign-in until Lakshmi restores it.`,
                  variant: 'warning',
                })
              }
            >
              Suspend
            </Button>
            <Button
              icon="user"
              onClick={() => window.dispatchEvent(new Event('nx:invite'))}
            >
              Invite
            </Button>
          </ButtonGroup>
        }
      />

      <div className="row g-3 mb-3">
        <div className="col-6 col-xl-3">
          <StatCard label="Plan" value={tenant.plan} hint={`Renews ${formatDate(tenant.renewsOn)}`} icon="bi-layers" tone="brand" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard
            label="Seats"
            value={`${formatNumber(tenant.seatsUsed)} / ${formatNumber(tenant.seatsLimit)}`}
            hint={`${Math.round((tenant.seatsUsed / tenant.seatsLimit) * 100)}% used`}
            icon="bi-people"
            tone="info"
          />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="MRR" value={formatCurrency(tenant.mrr)} icon="bi-currency-dollar" tone="success" />
        </div>
        <div className="col-6 col-xl-3">
          <StatCard label="NPS" value={tenant.nps} icon="bi-emoji-smile" tone="warning" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-5">
          <ChartSection title="Workspace" subtitle={tenant.note}>
            <StatusBadge status={tenant.status} />
            <dl className="nx-settings-list mt-3">
              <div>
                <dt>Owner</dt>
                <dd>{tenant.owner}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{tenant.email}</dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>{formatDate(tenant.createdAt)}</dd>
              </div>
              <div>
                <dt>Slug</dt>
                <dd className="nx-mono">{tenant.slug}</dd>
              </div>
            </dl>
            <Meter
              className="mt-3"
              label="Seat utilization"
              value={tenant.seatsUsed}
              max={tenant.seatsLimit}
              showValue
            />
          </ChartSection>
        </div>
        <div className="col-12 col-xl-7">
          <ChartSection title="Tenant workspace" subtitle="Usage, invoices, and flags">
            <Tabs className="nx-tabs">
              <Tab label="Usage">
                <div className="nx-form-stack">
                  <div>
                    <div className="nx-hbar-meta">
                      <span>API calls</span>
                      <strong>{formatNumber(tenant.apiCalls)}</strong>
                    </div>
                    <ProgressBar value={Math.min(100, Math.round(tenant.apiCalls / 9000))} max={100} />
                  </div>
                  <div>
                    <div className="nx-hbar-meta">
                      <span>Tokens</span>
                      <strong>{tenant.tokensM}M</strong>
                    </div>
                    <ProgressBar value={Math.min(100, Math.round(tenant.tokensM * 2))} max={100} />
                  </div>
                  <Link className="nx-text-link" to={`${BASE_PATH}/usage`}>
                    Open usage
                  </Link>
                </div>
              </Tab>
              <Tab label="Invoices">
                <DataTable
                  rows={invoices}
                  emptyTitle="No invoices yet"
                  emptyDescription="Trials do not raise an invoice until convert."
                  onRowClick={() => navigate(`${BASE_PATH}/billing`)}
                  columns={[
                    { key: 'id', label: 'Invoice' },
                    { key: 'amount', label: 'Amount', render: (value) => formatCurrency(value) },
                    { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
                    { key: 'due', label: 'Due', render: (value) => formatDate(value) },
                  ]}
                />
              </Tab>
              <Tab label="Flags">
                {tenantFlags.map((flag) => (
                  <div key={flag.id} className="nx-member">
                    <div>
                      <strong>{flag.name}</strong>
                      <div className="nx-subtle">{flag.id}</div>
                    </div>
                    <Switch
                      label={flag.on ? 'On' : 'Off'}
                      checked={flag.on}
                      onChange={() =>
                        showToast({
                          title: flag.on ? 'Flag already on for this tenant' : 'Enable from Flags',
                          description: flag.name,
                          variant: 'info',
                        })
                      }
                    />
                  </div>
                ))}
              </Tab>
              <Tab label="People">
                {members.map((member) => (
                  <div key={member.id} className="nx-member">
                    <strong>{member.name}</strong>
                    <span>{member.role} · {member.status}</span>
                  </div>
                ))}
                <Button
                  variant="secondary"
                  size="sm"
                  icon="user"
                  onClick={() => window.dispatchEvent(new Event('nx:invite'))}
                >
                  Invite user
                </Button>
              </Tab>
            </Tabs>
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
