import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCard } from './StatCard.jsx';

describe('StatCard', () => {
  it('renders label, value, and hint properly', () => {
    render(
      <StatCard
        label="Total Synthetic Records"
        value="148.4M"
        hint="Zero-Leakage Verified"
        trend="up"
        trendValue="+18.2%"
      />
    );

    expect(screen.getByText('Total Synthetic Records')).toBeInTheDocument();
    expect(screen.getByText('148.4M')).toBeInTheDocument();
    expect(screen.getByText('Zero-Leakage Verified')).toBeInTheDocument();
    expect(screen.getByText('+18.2%')).toBeInTheDocument();
  });
});
