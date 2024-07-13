/* eslint-env jest */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Wave from '@/components/Wave';

jest.mock('next/router', () => ({
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
    jest.useFakeTimers(); // Use fake timers
    render(<Wave data-testid='wave' />);

    // Fast-forward timers by 1200ms
    jest.advanceTimersByTime(1500);

    const wave = screen.getByTestId('wave');

    expect(wave).toBeInTheDocument();
  });

  it('renders a wave with classname', () => {
    render(<Wave className='banger' data-testid='wave' about='About' />);

    const wave = screen.getByTestId('wave');

    expect(wave).toBeInTheDocument();
  });
});
