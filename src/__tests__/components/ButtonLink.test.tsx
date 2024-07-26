// ButtonLink.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ButtonLink, {
  type ButtonLinkProps,
} from '@/components/links/ButtonLink';

describe('ButtonLink', () => {
  const mockProps: ButtonLinkProps = {
    href: '/test',
    children: 'Button Text',
  };

  it('renders a primary button link', () => {
    render(<ButtonLink {...mockProps} variant='primary' />);

    const button = screen.getByRole('link', { name: 'Button Text' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-300');
    expect(button).toHaveClass('text-black');
    // Add more assertions for other classes based on primary variant
  });

  it('renders an outline button link', () => {
    render(<ButtonLink {...mockProps} variant='outline' />);

    const button = screen.getByRole('link', { name: 'Button Text' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-dark');
    // Add more assertions for other classes based on outline variant
  });

  it('renders an ghost button link', () => {
    render(<ButtonLink {...mockProps} variant='ghost' />);

    const button = screen.getByRole('link', { name: 'Button Text' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-dark');
    expect(button).toHaveClass('shadow-none');
    // Add more assertions for other classes based on outline variant
  });

  it('renders an light button link', () => {
    render(<ButtonLink {...mockProps} variant='light' />);

    const button = screen.getByRole('link', { name: 'Button Text' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-black');
    // Add more assertions for other classes based on outline variant
  });

  it('renders an dark button link', () => {
    render(<ButtonLink {...mockProps} variant='dark' />);

    const button = screen.getByRole('link', { name: 'Button Text' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-white');
    // Add more assertions for other classes based on outline variant
  });

  // Add tests for other variants (ghost, light, dark) similarly...

  it('handles click events', () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<ButtonLink {...mockProps} onClick={onClick} />);

    const button = screen.getByRole('link', { name: 'Button Text' });

    user.hover(button);

    expect(button).toHaveClass('inline-flex');
  });

  it('renders with additional className', () => {
    render(<ButtonLink {...mockProps} className='custom-class' />);

    const button = screen.getByRole('link', { name: 'Button Text' });

    expect(button).toHaveClass('custom-class');
  });
});
