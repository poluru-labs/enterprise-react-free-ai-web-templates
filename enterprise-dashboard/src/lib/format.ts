const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
});

function toDate(value?: Date | string | number | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function formatDateTime(value?: Date | string | number | null) {
  const date = toDate(value);
  return date ? dateTimeFormatter.format(date) : '—';
}

export function formatDate(value?: Date | string | number | null) {
  const date = toDate(value);
  return date ? dateFormatter.format(date) : '—';
}

export function formatTime(value?: Date | string | number | null) {
  const date = toDate(value);
  return date ? timeFormatter.format(date) : '—';
}

export function formatDuration(minutes?: number | null) {
  if (minutes == null || Number.isNaN(Number(minutes))) return '—';
  const total = Number(minutes);
  if (total < 1) return `${Math.round(total * 60)}s`;
  if (total < 60) return `${Math.round(total)}m`;
  const hours = Math.floor(total / 60);
  const mins = Math.round(total % 60);
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatPercent(value?: number | string | null, digits = 1) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return `${Number(value).toFixed(digits)}%`;
}

export function formatNumber(value?: number | string | null) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return Number(value).toLocaleString('en-US');
}

export function formatCompact(value?: number | string | null) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return Number(value).toLocaleString('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });
}

export function formatAge(minutes?: number | null) {
  return formatDuration(minutes);
}

export function formatCurrency(value?: number | string | null) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

export function formatKw(value?: number | null) {
  if (value == null || Number.isNaN(Number(value))) return '—';
  const kw = Number(value);
  if (kw >= 1000) return `${(kw / 1000).toFixed(1)} MW`;
  return `${formatNumber(kw)} kW`;
}

export function inDateRange(iso?: string | null, start?: string, end?: string) {
  const date = toDate(iso);
  if (!date) return false;
  const time = date.getTime();
  if (start) {
    const startTime = new Date(`${start}T00:00:00`).getTime();
    if (time < startTime) return false;
  }
  if (end) {
    const endTime = new Date(`${end}T23:59:59`).getTime();
    if (time > endTime) return false;
  }
  return true;
}
