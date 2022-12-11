/* eslint-env jest */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import NowPlaying, { AnimatedBars } from '@/components/NowPlaying';

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

describe('NowPlaying', () => {
  it('renders a now playing', () => {
    render(<NowPlaying />);

    const button = screen.getByText('Not Playing');

    expect(button).toBeInTheDocument();
  });

  it('renders animated bars', () => {
    render(<AnimatedBars data-testid='animated-bars' />);

    const button = screen.getByTestId('animated-bars');

    expect(button).toBeInTheDocument();
  });
});
