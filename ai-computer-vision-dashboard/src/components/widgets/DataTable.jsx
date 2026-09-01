import { EmptyState } from '@poluru-labs/enterprise-design-system-react';

export function DataTable({
  columns = [],
  rows = [],
  rowKey = 'id',
  onRowClick,
  emptyTitle = 'No records',
  emptyDescription = 'Try adjusting filters or wait for the next camera sync.',
  rowClassName,
}) {
  return (
    <div className="cvd-table-wrap">
      {rows.length === 0 ? (
        <EmptyState heading={emptyTitle} description={emptyDescription} />
      ) : (
        <table className="cvd-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={column.className}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const key = row[rowKey] ?? JSON.stringify(row);
              const extraClass = typeof rowClassName === 'function' ? rowClassName(row) : '';
              return (
                <tr
                  key={key}
                  className={`${onRowClick ? 'is-clickable' : ''} ${extraClass || ''}`.trim()}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={column.className} data-label={column.label}>
                      {column.render ? column.render(row[column.key], row) : row[column.key] ?? '—'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
