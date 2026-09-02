import { Button, showToast } from '@poluru-labs/enterprise-design-system-react';
import plans from '../data/plans.json';
import { BREADCRUMB_ROOT } from '../constants/navigation.js';
import { formatCurrency } from '../lib/format.js';
import { PageHeader } from '../components/widgets/index.js';

export default function PlansPage() {
  return (
    <div className="nx-page">
      <PageHeader
        title="Plans"
        description="Starter, Team, Scale, and Enterprise. Cards stay equal height so feature lists line up."
        crumbs={[BREADCRUMB_ROOT, { label: 'Plans' }]}
      />

      <div className="row g-3">
        {plans.map((plan) => (
          <div className="col-12 col-md-6 col-xl-3" key={plan.id}>
            <article className={`nx-plan-card ${plan.highlight ? 'is-featured' : ''}`}>
              <header>
                <h3>{plan.name}</h3>
                <p className="nx-plan-price">
                  <strong>{formatCurrency(plan.price)}</strong>
                  <span>{plan.cadence}</span>
                </p>
                <p className="nx-policy-note">{plan.blurb}</p>
              </header>
              <ul className="nx-plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <i className="bi bi-check2" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <footer>
                <span className="nx-subtle">{plan.tenants} tenants · {plan.seats} seats</span>
                <Button
                  size="sm"
                  variant={plan.highlight ? 'primary' : 'secondary'}
                  onClick={() =>
                    showToast({
                      title: `${plan.name} selected`,
                      description: 'Lakshmi can attach this plan on the next convert.',
                      variant: 'success',
                    })
                  }
                >
                  Use plan
                </Button>
              </footer>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
