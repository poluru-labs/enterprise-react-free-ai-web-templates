export function normalizeQuery(query) {
  return String(query || '').trim().toLowerCase();
}

export function haystack(record, fields) {
  if (!record || typeof record !== 'object') return '';
  if (!fields?.length) {
    return Object.values(record)
      .filter((value) => value == null || typeof value !== 'object')
      .join(' ')
      .toLowerCase();
  }
  return fields.map((field) => String(record[field] ?? '')).join(' ').toLowerCase();
}

export function matchesQuery(record, query, fields) {
  const needle = normalizeQuery(query);
  if (!needle) return true;
  return haystack(record, fields).includes(needle);
}

export function searchRecords(records = [], query, fields) {
  return records.filter((record) => matchesQuery(record, query, fields));
}

export function searchCatalog(entries = [], query) {
  const needle = normalizeQuery(query);
  if (!needle) return [];
  return entries.filter((entry) => {
    const blob = `${entry.kind || ''} ${entry.title || ''} ${entry.detail || ''} ${entry.status || ''}`.toLowerCase();
    return blob.includes(needle);
  });
}
