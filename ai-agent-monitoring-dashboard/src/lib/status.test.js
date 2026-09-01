import { describe, expect, it } from 'vitest';
import { severityTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps agent and incident statuses to tones', () => {
    expect(statusTone('healthy')).toBe('success');
    expect(statusTone('degraded')).toBe('warning');
    expect(statusTone('critical')).toBe('danger');
    expect(statusTone('mitigating')).toBe('warning');
    expect(statusTone('unknown-state')).toBe('neutral');
    expect(statusTone('')).toBe('neutral');
  });

  it('humanizes snake_case labels', () => {
    expect(statusLabel('handed_off')).toBe('Handed Off');
    expect(statusLabel('running')).toBe('Running');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity to tones', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('medium')).toBe('warning');
    expect(severityTone('low')).toBe('info');
  });
});
