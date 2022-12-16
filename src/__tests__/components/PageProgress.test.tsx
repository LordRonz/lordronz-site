/* eslint-env jest */

import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import PageProgress from '@/components/PageProgress';

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

describe('Render page progress', () => {
  it('renders a page progress', () => {
    render(
      <div className='h-[200vh]'>
        <PageProgress />
        Test
      </div>
    );

    fireEvent.scroll(window, { target: { scrollY: 500 } });

    const tooltip = screen.getByText('Test');

    expect(tooltip).toBeInTheDocument();
  });

  it('renders a page progress with props', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 900,
    });

    Object.defineProperty(document.documentElement, 'clientHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });

    render(
      <div style={{ height: '2069px', padding: '2069px' }}>
        <PageProgress color='#fff' height={69} dir='rtl' />
        Test
      </div>
    );

    fireEvent.scroll(window, { target: { scrollY: 500 } });

    const tooltip = screen.getByText('Test');

    expect(tooltip).toBeInTheDocument();
  });
});
