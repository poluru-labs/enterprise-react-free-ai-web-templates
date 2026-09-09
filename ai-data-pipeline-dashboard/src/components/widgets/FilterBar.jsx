import { Button } from '@poluru-labs/enterprise-design-system-react';

export function FilterBar({ children, onReset, search }) {
  return (
    <div className="cd-filter-bar">
      {search ? <div className="cd-filter-search">{search}</div> : null}
      <div className="cd-filter-fields">{children}</div>
      {onReset ? (
        <Button variant="tertiary" size="sm" onClick={onReset}>
          Reset
        </Button>
      ) : null}
    </div>
  );
}
