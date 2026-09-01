import { Button } from '@poluru-labs/enterprise-design-system-react';

export function FilterBar({ children, onReset, search }) {
  return (
    <div className="kiln-filter-bar">
      {search ? <div className="kiln-filter-search">{search}</div> : null}
      <div className="kiln-filter-fields">{children}</div>
      {onReset ? (
        <Button variant="tertiary" size="sm" onClick={onReset}>
          Reset
        </Button>
      ) : null}
    </div>
  );
}
