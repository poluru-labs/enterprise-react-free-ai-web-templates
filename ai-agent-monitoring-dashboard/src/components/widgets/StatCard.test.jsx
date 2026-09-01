import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders label, value, hint, and trend', () => {
    render(
      <StatCard
        label="Active agents"
        value="8"
        hint="6 production workspaces"
        trend="up"
        trendValue="+2"
        tone="brand"
        sparkline={[5, 6, 7, 8]}
      />,
    );

    expect(screen.getByText('Active agents')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('6 production workspaces')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('renders without optional sparkline or trend', () => {
    render(<StatCard label="Failure rate" value="4.8%" />);
    expect(screen.getByText('Failure rate')).toBeInTheDocument();
    expect(screen.getByText('4.8%')).toBeInTheDocument();
  });
});
