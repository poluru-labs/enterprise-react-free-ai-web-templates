import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders the label and value', () => {
    render(<StatCard label="Pending queue" value="312" hint="48 unassigned" />);
    expect(screen.getByText('Pending queue')).toBeInTheDocument();
    expect(screen.getByText('312')).toBeInTheDocument();
    expect(screen.getByText('48 unassigned')).toBeInTheDocument();
  });

  it('shows an upward trend', () => {
    render(<StatCard label="Reviewed today" value="1,847" trend="up" trendValue="+14.6%" />);
    expect(screen.getByText('+14.6%')).toBeInTheDocument();
    expect(document.querySelector('.cmb-stat-trend.is-up')).toBeTruthy();
  });

  it('shows a downward trend', () => {
    render(<StatCard label="Appeals open" value="24" trend="down" trendValue="-5" />);
    expect(screen.getByText('-5')).toBeInTheDocument();
    expect(document.querySelector('.cmb-stat-trend.is-down')).toBeTruthy();
  });

  it('renders a sparkline when values are provided', () => {
    render(<StatCard label="Auto-mod rate" value="78%" sparkline={[71, 74, 76, 78]} />);
    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });
});
