export function demoBasename(): string | undefined {
  if (import.meta.env.DEV) return undefined;
  const path = new URL('../', import.meta.url).pathname.replace(/\/$/, '');
  return path && path !== '/' ? path : undefined;
}
