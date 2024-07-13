/* eslint-env jest */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { act } from 'react';

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
    act(() => jest.advanceTimersByTime(2000));

    const wave = screen.getByTestId('wave');

    expect(wave).toBeInTheDocument();
  });

  it('renders a wave with classname', () => {
    render(<Wave className='banger' data-testid='wave' about='About' />);

    const wave = screen.getByTestId('wave');

    expect(wave).toBeInTheDocument();
  });
});
