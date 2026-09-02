import { describe, expect, it } from 'vitest';
import { searchRecords } from './search.js';
import { statusTone } from './status.js';
import prompts from '../data/prompts.json';

describe('prompt catalog search', () => {
  it('finds preserved prompt names by owner or family', () => {
    const byName = searchRecords(prompts.items, 'Support copilot', ['name']);
    expect(byName).toHaveLength(1);
    expect(byName[0].owner).toBe('Lakshmi Poluru');

    const byOwner = searchRecords(prompts.items, 'Venkata', ['owner', 'name']);
    expect(byOwner.some((item) => item.name === 'Legal summarizer')).toBe(true);

    const byFamily = searchRecords(prompts.items, 'Knowledge', ['family']);
    expect(byFamily.some((item) => item.name === 'RAG citation')).toBe(true);
  });
});

describe('prompt status tones', () => {
  it('maps Live, Review, Failed, and Canary', () => {
    expect(statusTone('Live')).toBe('success');
    expect(statusTone('Review')).toBe('warning');
    expect(statusTone('Failed')).toBe('danger');
    expect(statusTone('Canary')).toBe('warning');
  });
});
