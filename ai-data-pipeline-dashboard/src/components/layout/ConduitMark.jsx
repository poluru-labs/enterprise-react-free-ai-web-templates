export function ConduitMark({ className = 'cd-mark' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" fill="#6A222C" />
      <rect x="4" y="13" width="24" height="6" fill="#F5D5D9" />
      <rect x="4" y="7" width="8" height="6" fill="#ffffff" />
      <rect x="20" y="19" width="8" height="6" fill="#ffffff" />
    </svg>
  );
}
