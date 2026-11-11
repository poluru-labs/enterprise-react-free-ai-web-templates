import type { ToneByChannel, VocabularyRule, VoiceAttribute } from '@/core'

export const VOICE_ATTRIBUTES: VoiceAttribute[] = [
  {
    id: 'va-1',
    trait: 'Confident',
    weAre: 'Direct, specific, sure of the facts',
    weAreNot: 'Boastful or absolute',
    example: 'Setup takes about ten minutes.',
  },
  {
    id: 'va-2',
    trait: 'Warm',
    weAre: 'Plain-spoken and human',
    weAreNot: 'Overfamiliar or jokey',
    example: 'Thanks for waiting — your report is ready.',
  },
  {
    id: 'va-3',
    trait: 'Precise',
    weAre: 'Concrete numbers and named steps',
    weAreNot: 'Vague, jargon-heavy, or hedged',
    example: 'Exports finish within 2 minutes for files under 50 MB.',
  },
  {
    id: 'va-4',
    trait: 'Calm',
    weAre: 'Steady in incidents and errors',
    weAreNot: 'Alarmist or dramatic',
    example: 'Payments are delayed. We expect a fix by 3 PM CT.',
  },
]

export const TONE_BY_CHANNEL: ToneByChannel[] = [
  { channel: 'Product UI', formality: 3, warmth: 3, guidance: 'Short labels, verbs first, no exclamation marks.' },
  { channel: 'Support replies', formality: 2, warmth: 5, guidance: 'Acknowledge, then give the next step in one line.' },
  { channel: 'Release notes', formality: 3, warmth: 2, guidance: 'Lead with the change, then who it affects.' },
  { channel: 'Incident updates', formality: 4, warmth: 2, guidance: 'Facts, impact, next update time. No speculation.' },
  { channel: 'Social', formality: 1, warmth: 4, guidance: 'Conversational, but never sarcastic.' },
]

export const VOCABULARY: VocabularyRule[] = [
  { avoid: 'revolutionary', prefer: 'new', reason: 'Overclaims; say what changed.' },
  { avoid: 'seamless', prefer: 'simple', reason: 'Unverifiable; describe the steps instead.' },
  { avoid: 'leverage', prefer: 'use', reason: 'Jargon.' },
  { avoid: 'utilize', prefer: 'use', reason: 'Longer word, same meaning.' },
  { avoid: 'world-class', prefer: 'reliable', reason: 'Unprovable superlative.' },
  { avoid: 'just', prefer: '(remove)', reason: 'Minimizes effort the reader may find hard.' },
  { avoid: 'simply', prefer: '(remove)', reason: 'Same as "just".' },
  { avoid: 'guarantee', prefer: 'aim to', reason: 'Legal review required for guarantees.' },
]

export const SAMPLE_COPY =
  'Our revolutionary dashboard lets you simply leverage world-class insights. We guarantee a seamless setup!'
