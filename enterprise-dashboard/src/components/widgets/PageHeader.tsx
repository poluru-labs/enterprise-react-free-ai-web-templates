import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Crumb = {
  label: string;
  to?: string;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
};

export function PageHeader({ title, description, crumbs = [], actions }: PageHeaderProps) {
  return (
    <header className="dc-page-header">
      {crumbs.length > 0 ? (
        <nav className="dc-breadcrumb" aria-label="Breadcrumb">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <span key={`${crumb.label}-${index}`} className="dc-breadcrumb-item">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {isLast || !crumb.to ? (
                  <span aria-current="page">{crumb.label}</span>
                ) : (
                  <Link to={crumb.to}>{crumb.label}</Link>
                )}
              </span>
            );
          })}
        </nav>
      ) : null}
      <div className="dc-page-header-row">
        <div>
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? <div className="dc-page-actions">{actions}</div> : null}
      </div>
    </header>
  );
}
