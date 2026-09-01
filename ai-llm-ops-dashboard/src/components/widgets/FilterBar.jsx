import { Button } from '@poluru-labs/enterprise-design-system-react';

export function FilterBar({ children, onReset, search }) {
  return (
    <div className="llm-filter-bar">
      {search ? <div className="llm-filter-search">{search}</div> : null}
      <div className="llm-filter-fields">{children}</div>
      {onReset ? (
        <Button variant="tertiary" size="sm" onClick={onReset}>
          Reset
        </Button>
      ) : null}
    </div>
  );
}
