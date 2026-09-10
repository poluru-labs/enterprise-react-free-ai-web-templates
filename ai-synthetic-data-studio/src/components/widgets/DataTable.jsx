import { useState } from 'react';

export function DataTable({
  columns = [],
  data = [],
  keyField = 'id',
  pageSize = 10,
  emptyMessage = 'No records found matching current criteria.',
  onRowClick = null,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize) || 1;

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="syn-table-wrapper">
      <table className="syn-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width, textAlign: col.align || 'left' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, index) => (
              <tr
                key={row[keyField] || index}
                onClick={() => onRowClick && onRowClick(row)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map((col) => (
                  <td key={col.key} style={{ textAlign: col.align || 'left' }}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem', color: 'var(--syn-muted)' }}>
                <i className="bi bi-inbox" style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }} />
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderTop: '1px solid var(--syn-line)',
            background: '#ffffff',
            fontSize: '0.8rem',
            color: 'var(--syn-muted)',
          }}
        >
          <span>
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, data.length)} of {data.length} entries
          </span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="syn-btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.78rem' }}
            >
              Previous
            </button>
            <span style={{ padding: '0.3rem 0.6rem', fontWeight: '600', color: 'var(--syn-ink)' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="syn-btn-secondary"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.78rem' }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
