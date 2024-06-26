/* eslint-env jest */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { SWRConfig } from 'swr';

import NowPlaying, { AnimatedBars } from '@/components/NowPlaying';
import { WEBSITE_URL } from '@/constants/env';

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
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockAllIsIntersecting(true);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders a now playing', () => {
    render(<NowPlaying />);

    const button = screen.getByText('Not Playing');

    expect(button).toBeInTheDocument();
  });

  it('renders a now playing with swr value', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        songUrl: `${WEBSITE_URL}`,
        title: 'banger',
      },
    });

    render(
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <NowPlaying />
      </SWRConfig>,
    );
    mockAllIsIntersecting(true);

    const button = await screen.findByText('banger');

    expect(button).toBeInTheDocument();
  });

  it('renders animated bars', () => {
    render(<AnimatedBars data-testid='animated-bars' />);

    const button = screen.getByTestId('animated-bars');

    expect(button).toBeInTheDocument();
  });
});
