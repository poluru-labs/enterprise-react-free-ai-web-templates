import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '@poluru-labs/enterprise-design-system-react';

export function PageHeader({ title, description, crumbs = [], actions }) {
  const navigate = useNavigate();
  const items = crumbs.map((crumb) => ({
    label: crumb.label,
    href: crumb.to,
  }));

  return (
    <header className="flt-page-header">
      {crumbs.length > 0 ? (
        <div
          className="flt-breadcrumb"
          onClick={(event) => {
            const node = event.target instanceof Element ? event.target : event.target.parentElement;
            const anchor = node?.closest('a');
            if (!anchor) return;
            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('http')) return;
            event.preventDefault();
            navigate(href);
          }}
        >
          <Breadcrumb items={items} />
        </div>
      ) : null}
      <div className="flt-page-header-row">
        <h1>{title}</h1>
        {actions ? <div className="flt-page-actions">{actions}</div> : null}
      </div>
      {description ? <p>{description}</p> : null}
    </header>
  );
}
