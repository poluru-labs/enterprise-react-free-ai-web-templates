import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders label, value, hint, and trend', () => {
    render(
      <StatCard
        label="Live cameras"
        value="46/48"
        hint="2 offline · Dallas gate"
        trend="down"
        trendValue="-2"
        tone="brand"
        sparkline={[48, 47, 46]}
      />,
    );

    expect(screen.getByText('Live cameras')).toBeInTheDocument();
    expect(screen.getByText('46/48')).toBeInTheDocument();
    expect(screen.getByText('2 offline · Dallas gate')).toBeInTheDocument();
    expect(screen.getByText('-2')).toBeInTheDocument();
  });

  it('renders without optional sparkline or trend', () => {
    render(<StatCard label="Fleet mAP" value="0.841" />);
    expect(screen.getByText('Fleet mAP')).toBeInTheDocument();
    expect(screen.getByText('0.841')).toBeInTheDocument();
  });
});
