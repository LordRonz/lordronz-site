/* eslint-env jest */

import '@testing-library/jest-dom';

import { act, fireEvent, render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import Footer from '@/components/layout/Footer';
import { TooltipProvider } from '@/components/ui/tooltip';

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

describe('Footer clipboard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockAllIsIntersecting(true);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders a footer and click copy to clipboard', async () => {
    const jsdomPrompt = window.prompt;
    window.prompt = jest.fn();

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

    act(() => jest.advanceTimersByTime(2000));

    expect(button).toBeInTheDocument();
    window.prompt = jsdomPrompt;
  });
});
