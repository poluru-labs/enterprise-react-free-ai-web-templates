export function MarqueeMark({ className = 'mq-mark' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" fill="#1C0641" />
      <path d="M6 22 V10 l10 7 10-7 v12" fill="none" stroke="#E4D6F5" strokeWidth="2.2" />
      <path d="M6 22 V10 l10 7" fill="none" stroke="#ffffff" strokeWidth="2.2" />
    </svg>
  );
}
