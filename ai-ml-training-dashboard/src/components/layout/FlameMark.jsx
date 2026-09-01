export function FlameMark({ className = 'kiln-flame' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 3c3.2 4.8 8.6 8.4 8.6 15.2A8.6 8.6 0 0 1 16 26.8 8.6 8.6 0 0 1 7.4 18.2C7.4 11.4 12.8 7.8 16 3Z"
        fill="#de3e3e"
      />
      <path
        d="M16 11.2c1.7 2.4 4.2 4.1 4.2 7.4A4.2 4.2 0 0 1 16 22.8 4.2 4.2 0 0 1 11.8 18.6c0-3.3 2.5-5 4.2-7.4Z"
        fill="#F59E0B"
      />
      <path d="M10 27.2h12v1.6H10z" fill="#9A3412" />
    </svg>
  );
}
