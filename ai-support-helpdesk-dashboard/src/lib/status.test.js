import { describe, expect, it } from 'vitest';
import { severityTone, slaTone, statusLabel, statusTone } from './status.js';

describe('status helpers', () => {
  it('maps helpdesk statuses to design-system tones', () => {
    expect(statusTone('Open')).toBe('info');
    expect(statusTone('Waiting')).toBe('warning');
    expect(statusTone('Pending')).toBe('warning');
    expect(statusTone('Resolved')).toBe('success');
    expect(statusTone('ok')).toBe('success');
    expect(statusTone('warn')).toBe('warning');
    expect(statusTone('error')).toBe('danger');
    expect(statusTone('Watch')).toBe('warning');
    expect(statusTone('unknown-status')).toBe('neutral');
    expect(statusTone()).toBe('neutral');
  });

  it('title-cases snake and kebab labels', () => {
    expect(statusLabel('needs_review')).toBe('Needs Review');
    expect(statusLabel('ok')).toBe('Ok');
    expect(statusLabel('')).toBe('Unknown');
  });

  it('maps severity and priority to a tone', () => {
    expect(severityTone('critical')).toBe('danger');
    expect(severityTone('P1')).toBe('danger');
    expect(severityTone('P2')).toBe('warning');
    expect(severityTone('P3')).toBe('info');
    expect(severityTone('watch')).toBe('warning');
    expect(severityTone('resolved')).toBe('success');
    expect(severityTone('')).toBe('neutral');
  });

  it('maps SLA state to a tone', () => {
    expect(slaTone('ok')).toBe('success');
    expect(slaTone('warn')).toBe('warning');
    expect(slaTone('watch')).toBe('warning');
    expect(slaTone('error')).toBe('danger');
    expect(slaTone('breached')).toBe('danger');
  });
});
