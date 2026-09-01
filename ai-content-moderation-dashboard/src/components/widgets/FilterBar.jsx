import { Button } from '@poluru-labs/enterprise-design-system-react';

export function FilterBar({ children, onReset, search }) {
  return (
    <div className="cmb-filter-bar">
      {search ? <div className="cmb-filter-search">{search}</div> : null}
      <div className="cmb-filter-fields">{children}</div>
      {onReset ? (
        <Button variant="tertiary" size="sm" onClick={onReset}>
          Reset
        </Button>
      ) : null}
    </div>
  );
}
