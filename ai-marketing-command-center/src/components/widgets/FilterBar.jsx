import { Button } from '@poluru-labs/enterprise-design-system-react';

export function FilterBar({ children, onReset, search }) {
  return (
    <div className="mq-filter-bar">
      {search ? <div className="mq-filter-search">{search}</div> : null}
      <div className="mq-filter-fields">{children}</div>
      {onReset ? (
        <Button variant="tertiary" size="sm" onClick={onReset}>
          Reset
        </Button>
      ) : null}
    </div>
  );
}
