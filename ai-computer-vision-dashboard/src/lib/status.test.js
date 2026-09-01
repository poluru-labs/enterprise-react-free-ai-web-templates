import { describe, expect, it } from 'vitest';
import { confidenceTone, severityTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps camera and incident statuses to tones', () => {
    expect(statusTone('live')).toBe('success');
    expect(statusTone('degraded')).toBe('warning');
    expect(statusTone('offline')).toBe('danger');
    expect(statusTone('in review')).toBe('info');
    expect(statusTone('unknown-state')).toBe('neutral');
    expect(statusTone('')).toBe('neutral');
  });

  it('humanizes snake_case labels', () => {
    expect(statusLabel('in_review')).toBe('In Review');
    expect(statusLabel('offline')).toBe('Offline');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity and confidence to tones', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('medium')).toBe('warning');
    expect(severityTone('low')).toBe('info');
    expect(confidenceTone(0.96)).toBe('success');
    expect(confidenceTone(0.74)).toBe('warning');
    expect(confidenceTone(0.22)).toBe('danger');
  });
});
