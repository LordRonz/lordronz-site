import { fireEvent, render, screen } from '@testing-library/react';

import Header, { links } from '@/components/layout/Header/Header';

describe('Header', () => {
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

    window.scrollY = 200;

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

  it('toggles color mode', () => {
    document.documentElement.classList.add('dark');
    render(<Header />);

    fireEvent.click(
      screen.getAllByRole('button', { name: /Color mode toggle/i })[0],
    );

    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('connects the mobile trigger to the navigation popover', () => {
    render(
      <div style={{ height: '2048px', width: '500px' }}>
        <Header />
      </div>,
    );

    const sidebarToggle = screen.getByRole('button', {
      name: /Open navigation menu/i,
    });

    expect(sidebarToggle).toHaveAttribute('popovertarget', 'drawer-navigation');
    expect(document.querySelector('#drawer-navigation')).toHaveAttribute(
      'popover',
      'auto',
    );
  });

  it('connects the close button to the navigation popover', () => {
    render(
      <div style={{ height: '2048px', width: '500px' }}>
        <Header />
      </div>,
    );

    const closeSidebarButton = screen.getByRole('button', {
      name: /Close sidebar button/i,
      hidden: true,
    });

    expect(closeSidebarButton).toHaveAttribute(
      'popovertarget',
      'drawer-navigation',
    );
    expect(closeSidebarButton).toHaveAttribute('popovertargetaction', 'hide');
  });
});
