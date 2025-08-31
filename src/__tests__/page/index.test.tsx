import { fireEvent, render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { vi } from 'vitest';

import Home from '@/app/page';

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

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('Home', () => {
  beforeEach(() => {
    mockAllIsIntersecting(true);
  });
  it('renders a heading', async () => {
    render(<Home />);

    const heading = await screen.findByRole('heading', {
      name: /henlo there/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a paragraph with the correct text', async () => {
    render(<Home />);

    const paragraph = await screen.findByText(
      /I am a passionate programmer and love tinkering with Python to automate my personal tasks. I possess extensive experience with backend technologies and system administration. Additionally, I have honed my skills through the development of various React and Swift projects./i,
    );

    expect(paragraph).toBeInTheDocument();
  });

  it('can scroll', async () => {
    render(<Home />);

    const heading = await screen.findByRole('heading', {
      name: /henlo there/i,
    });

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(heading).toBeInTheDocument();
  });

  it('renders a GitHub link', async () => {
    render(<Home />);

    const link = await screen.findByRole('link', {
      name: /Link to GitHub repository/i,
    });

    expect(link).toBeInTheDocument();
  });
});
