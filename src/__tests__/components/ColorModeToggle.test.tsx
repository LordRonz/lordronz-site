import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import ColorModeToggle from '@/components/ColorModeToggle';

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
  it('renders a color toggle button', () => {
    render(<ColorModeToggle onChange={(v) => v} />);

    const colorToggle = screen.getByRole('button');

    expect(colorToggle).toBeInTheDocument();
  });

  it('renders a color toggle and click it', () => {
    render(<ColorModeToggle onChange={(v) => v} />);

    const colorToggle = screen.getByRole('button');

    fireEvent(
      colorToggle,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(colorToggle).toBeInTheDocument();
  });

  it('renders a color toggle and click it (dark)', () => {
    render(<ColorModeToggle onChange={(v) => v} value='dark' />);

    const colorToggle = screen.getByRole('button');

    fireEvent(
      colorToggle,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(colorToggle).toBeInTheDocument();
  });

  it('renders a color toggle and click it (light)', () => {
    render(<ColorModeToggle onChange={(v) => v} value='light' />);

    const colorToggle = screen.getByRole('button');

    fireEvent(
      colorToggle,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(colorToggle).toBeInTheDocument();
  });
});
