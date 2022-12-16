/* eslint-env jest */

import '@testing-library/jest-dom';

import { act, fireEvent, render, screen } from '@testing-library/react';

import Footer from '@/components/layout/Footer';

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
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders a footer and click copy to clipboard', async () => {
    const jsdomPrompt = window.prompt;
    window.prompt = jest.fn();

    render(<Footer />);

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
