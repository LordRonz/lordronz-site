/* eslint-env jest */

import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import Home from '@/pages/index';

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

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /henlo there/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('can scroll', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /henlo there/i,
    });

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(heading).toBeInTheDocument();
  });
});
