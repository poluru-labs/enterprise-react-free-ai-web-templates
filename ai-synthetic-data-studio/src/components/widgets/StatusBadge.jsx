export function StatusBadge({ status, tone, icon }) {
  let computedTone = tone || 'brand';
  let defaultIcon = icon;

  const lower = String(status || '').toLowerCase();
  if (!tone) {
    if (lower.includes('ready') || lower.includes('pass') || lower.includes('success') || lower.includes('zero') || lower.includes('compliant')) {
      computedTone = 'success';
      defaultIcon = defaultIcon || 'bi-check-circle-fill';
    } else if (lower.includes('generating') || lower.includes('running') || lower.includes('progress') || lower.includes('active')) {
      computedTone = 'brand';
      defaultIcon = defaultIcon || 'bi-arrow-repeat';
    } else if (lower.includes('warn') || lower.includes('standard') || lower.includes('relaxed') || lower.includes('partial')) {
      computedTone = 'warning';
      defaultIcon = defaultIcon || 'bi-exclamation-triangle-fill';
    } else if (lower.includes('fail') || lower.includes('danger') || lower.includes('risk') || lower.includes('breach')) {
      computedTone = 'danger';
      defaultIcon = defaultIcon || 'bi-x-circle-fill';
    } else {
      computedTone = 'info';
      defaultIcon = defaultIcon || 'bi-info-circle-fill';
    }
  }

  return (
    <span className={`syn-badge tone-${computedTone}`}>
      {defaultIcon && <i className={`bi ${defaultIcon}`} aria-hidden="true" />}
      <span>{status}</span>
    </span>
  );
}
