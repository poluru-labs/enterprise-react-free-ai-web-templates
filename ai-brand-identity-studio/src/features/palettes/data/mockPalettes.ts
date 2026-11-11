import type { Palette } from '@/core'

export const MOCK_PALETTES: Palette[] = [
  {
    id: 'pal-core',
    name: 'Core navy',
    description: 'Primary system palette anchored to the master brand navy.',
    approved: true,
    swatches: [
      { name: 'Navy', hex: '#00105B', role: 'primary' },
      { name: 'Signal blue', hex: '#3A5BD9', role: 'secondary' },
      { name: 'Mist', hex: '#E0E2EB', role: 'neutral' },
      { name: 'Paper', hex: '#FFFFFF', role: 'neutral' },
      { name: 'Marigold', hex: '#F2B33D', role: 'accent' },
    ],
  },
  {
    id: 'pal-warm',
    name: 'Warm campaign',
    description: 'Seasonal campaign palette; accent use limited to 10% of a layout.',
    approved: false,
    swatches: [
      { name: 'Navy', hex: '#00105B', role: 'primary' },
      { name: 'Clay', hex: '#C4623A', role: 'secondary' },
      { name: 'Sand', hex: '#F3E9DC', role: 'neutral' },
      { name: 'Ink', hex: '#1B1B1F', role: 'neutral' },
      { name: 'Coral', hex: '#FF7A6B', role: 'accent' },
    ],
  },
  {
    id: 'pal-data',
    name: 'Data visualization',
    description: 'Categorical series colors checked against white backgrounds.',
    approved: false,
    swatches: [
      { name: 'Navy', hex: '#00105B', role: 'primary' },
      { name: 'Teal', hex: '#0F7C80', role: 'secondary' },
      { name: 'Plum', hex: '#7A3B8F', role: 'secondary' },
      { name: 'Slate', hex: '#5B677A', role: 'neutral' },
      { name: 'Lime', hex: '#B5D334', role: 'accent' },
    ],
  },
]

export const LOCKUP_WORDMARK = 'Northline'
