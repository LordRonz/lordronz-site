/* eslint-env jest */

import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import Home from '@/app/page';

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

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Home', () => {
  beforeEach(() => {
    mockAllIsIntersecting(true);
  });
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /henlo there/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a paragraph with the correct text', () => {
    render(<Home />);

    const paragraph = screen.getByText(
      /I am a passionate programmer and love tinkering with Python to automate my personal tasks. I possess extensive experience with backend technologies and system administration. Additionally, I have honed my skills through the development of various React and Swift projects./i,
    );

    expect(paragraph).toBeInTheDocument();
  });

  it('can scroll', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /henlo there/i,
    });

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(heading).toBeInTheDocument();
  });

  it('renders a GitHub link', () => {
    render(<Home />);

    const link = screen.getByRole('link', {
      name: /Link to GitHub repository/i,
    });

    expect(link).toBeInTheDocument();
  });
});
