import { act, fireEvent, render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { vi } from 'vitest';

import Footer from '@/components/layout/Footer';
import { TooltipProvider } from '@/components/ui/tooltip';

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

describe('Footer clipboard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockAllIsIntersecting(true);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a footer and click copy to clipboard', async () => {
    const jsdomPrompt = window.prompt;
    window.prompt = vi.fn();

    render(
      <TooltipProvider>
        <Footer />
      </TooltipProvider>,
    );

    const button = screen.getByRole('button', {
      name: /Mail button/i,
    });

    fireEvent.mouseOver(button);
    fireEvent.click(button);

    act(() => vi.advanceTimersByTime(2000));

    expect(button).toBeInTheDocument();
    window.prompt = jsdomPrompt;
  });
});
