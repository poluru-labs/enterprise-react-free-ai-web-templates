import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps SaaS statuses to design-system tones', () => {
    expect(statusTone('Active')).toBe('success');
    expect(statusTone('Paid')).toBe('success');
    expect(statusTone('Trial')).toBe('warning');
    expect(statusTone('Past due')).toBe('warning');
    expect(statusTone('Suspended')).toBe('danger');
    expect(statusTone('Failed')).toBe('danger');
    expect(statusTone('Invited')).toBe('warning');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('past_due')).toBe('Past Due');
    expect(statusLabel('active')).toBe('Active');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('error')).toBe('danger');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('warn')).toBe('warning');
    expect(severityTone('ok')).toBe('info');
    expect(severityTone('resolved')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('warn')).toBe('warning');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('error')).toBe('danger');
  });
});
