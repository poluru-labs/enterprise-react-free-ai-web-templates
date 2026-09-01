import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders the label and value', () => {
    render(<StatCard label="Pass rate" value="94.6%" hint="Across 6 live suites" />);
    expect(screen.getByText('Pass rate')).toBeInTheDocument();
    expect(screen.getByText('94.6%')).toBeInTheDocument();
    expect(screen.getByText('Across 6 live suites')).toBeInTheDocument();
  });

  it('shows an upward trend', () => {
    render(<StatCard label="Mean score" value="91.2" trend="up" trendValue="+0.7" />);
    expect(screen.getByText('+0.7')).toBeInTheDocument();
    expect(document.querySelector('.prism-stat-trend.is-up')).toBeTruthy();
  });

  it('shows a downward trend', () => {
    render(<StatCard label="Open reviews" value="12" trend="down" trendValue="-3" />);
    expect(screen.getByText('-3')).toBeInTheDocument();
    expect(document.querySelector('.prism-stat-trend.is-down')).toBeTruthy();
  });

  it('renders a sparkline when values are provided', () => {
    render(<StatCard label="Pass rate" value="94.6%" sparkline={[91, 92, 93, 94.6]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });
});
