/* eslint-env jest */

import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import Header, { links } from '@/components/layout/Header/Header';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/blog',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('Header clipboard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders a header', async () => {
    render(
      <div style={{ height: '2048px' }}>
        <Header />
      </div>,
    );

    fireEvent.scroll(window, { target: { scrollY: 500 } });

    const logo = screen.getByText('@lordronz');

    expect(logo).toBeInTheDocument();
  });

  it('renders a header scrolled', async () => {
    render(
      <div style={{ height: '2048px' }}>
        <Header />
      </div>,
    );

    window.pageYOffset = 200;

    fireEvent.scroll(window, { target: { scrollY: 500 } });

    const logo = screen.getByText('@lordronz');

    expect(logo).toBeInTheDocument();
  });

  it('is a correct link objects', async () => {
    links.forEach((v) => {
      expect(v).toHaveProperty('href');
      expect(v).toHaveProperty('label');
    });
  });

  it('opens sidebar', async () => {
    render(
      <div style={{ height: '2048px', width: '500px' }}>
        <Header />
      </div>,
    );

    const sidebarToggle = screen.getByRole('checkbox');

    fireEvent.click(sidebarToggle);

    expect(sidebarToggle).toBeInTheDocument();
  });

  it('closes sidebar', async () => {
    render(
      <div style={{ height: '2048px', width: '500px' }}>
        <Header />
      </div>,
    );

    const sidebarToggle = screen.getByRole('checkbox');

    fireEvent.click(sidebarToggle);

    const closeSidebarButton = screen.getByRole('button', {
      name: /Close sidebar button/i,
    });

    fireEvent.click(closeSidebarButton);

    expect(sidebarToggle).toBeInTheDocument();
  });

  it('closes sidebar when clicked away', async () => {
    render(
      <div style={{ height: '2048px', width: '500px' }}>
        <Header />
      </div>,
    );

    const sidebarToggle = screen.getByRole('checkbox');

    fireEvent.click(sidebarToggle);

    fireEvent.mouseDown(document);

    expect(sidebarToggle).toBeInTheDocument();
  });
});
