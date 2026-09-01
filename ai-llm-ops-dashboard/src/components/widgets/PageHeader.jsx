import { Link } from 'react-router-dom';

export function PageHeader({ title, description, crumbs = [], actions }) {
  return (
    <header className="llm-page-header">
      {crumbs.length > 0 && (
        <nav className="llm-breadcrumb" aria-label="Breadcrumb">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <span key={`${crumb.label}-${index}`} className="llm-breadcrumb-item">
                {index > 0 && <i className="bi bi-chevron-right" aria-hidden="true" />}
                {isLast || !crumb.to ? (
                  <span aria-current="page">{crumb.label}</span>
                ) : (
                  <Link to={crumb.to}>{crumb.label}</Link>
                )}
              </span>
            );
          })}
        </nav>
      )}
      <div className="llm-page-header-row">
        <div>
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? <div className="llm-page-actions">{actions}</div> : null}
      </div>
    </header>
  );
}
