import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { vi } from 'vitest';

import NowPlaying, { AnimatedBars } from '@/components/NowPlaying';
import { TooltipProvider } from '@/components/ui/tooltip';
import { WEBSITE_URL } from '@/constants/env';

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

describe('NowPlaying', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockAllIsIntersecting(true);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a now playing', () => {
    render(
      <TooltipProvider>
        <NowPlaying />
      </TooltipProvider>,
    );

    const button = screen.getByText('Not Playing');

    expect(button).toBeInTheDocument();
  });

  it('renders a now playing with fetched value', async () => {
    vi.useRealTimers();

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        isPlaying: true,
        songUrl: `${WEBSITE_URL}`,
        title: 'banger',
        artist: 'Test Artist',
      }),
    } as Response);

    render(
      <TooltipProvider>
        <NowPlaying />
      </TooltipProvider>,
    );

    mockAllIsIntersecting(true);

    const songTitle = await screen.findByText('banger', {}, { timeout: 3000 });
    expect(songTitle).toBeInTheDocument();

    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('renders animated bars', () => {
    render(<AnimatedBars data-testid='animated-bars' />);

    const button = screen.getByTestId('animated-bars');

    expect(button).toBeInTheDocument();
  });
});
