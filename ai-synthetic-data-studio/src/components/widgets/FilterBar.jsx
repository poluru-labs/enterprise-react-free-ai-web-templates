export function FilterBar({
  searchPlaceholder = 'Filter items...',
  searchValue = '',
  onSearchChange,
  filters = [],
  onClear,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.8rem',
        marginBottom: '1.2rem',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: '240px' }}>
        <div className="syn-nav-search" style={{ width: '100%', maxWidth: '340px' }}>
          <i className="bi bi-search" aria-hidden="true" />
          <input
            type="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {filters.map((f, i) => (
          <select
            key={i}
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
            style={{
              padding: '0.45rem 0.8rem',
              borderRadius: '0.55rem',
              border: '1px solid var(--syn-line)',
              background: '#ffffff',
              fontSize: '0.84rem',
              color: 'var(--syn-ink)',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {f.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="syn-btn-secondary"
          style={{ fontSize: '0.8rem', padding: '0.42rem 0.75rem' }}
        >
          <i className="bi bi-x-circle" aria-hidden="true" />
          Reset Filters
        </button>
      )}
    </div>
  );
}
