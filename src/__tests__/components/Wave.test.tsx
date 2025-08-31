import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { vi } from 'vitest';

import Wave from '@/components/Wave';

vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('Wave', () => {
  it('renders a wave', () => {
    vi.useFakeTimers(); // Use fake timers
    render(<Wave data-testid='wave' />);

    // Fast-forward timers by 1200ms
    act(() => vi.advanceTimersByTime(2000));

    const wave = screen.getByTestId('wave');

    expect(wave).toBeInTheDocument();
  });

  it('renders a wave with classname', () => {
    render(<Wave className='banger' data-testid='wave' about='About' />);

    const wave = screen.getByTestId('wave');

    expect(wave).toBeInTheDocument();
  });
});
