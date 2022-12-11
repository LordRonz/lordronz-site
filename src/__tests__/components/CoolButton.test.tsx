/* eslint-env jest */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import CoolButton from '@/components/buttons/CoolButton';

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

describe('CoolButton', () => {
  it('renders a coolbutton', () => {
    render(<CoolButton>Test</CoolButton>);

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with classname', () => {
    render(<CoolButton className='kontol'>Test</CoolButton>);

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with rest', () => {
    render(
      <CoolButton aria-label='balls' wrapperClassName='bg-dark'>
        Test
      </CoolButton>
    );

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with wrapperclassname', () => {
    render(<CoolButton wrapperClassName='bg-dark'>Test</CoolButton>);

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with moving polygon classname', () => {
    render(<CoolButton movingPolygonClassName='bg-dark'>Test</CoolButton>);

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });

  it('renders a coolbutton with all props', () => {
    render(
      <CoolButton
        wrapperClassName='bg-dark'
        movingPolygonClassName='bg-dark'
        className='balls'
        aria-checked='true'
      >
        Test
      </CoolButton>
    );

    const button = screen.getByText('Test');

    expect(button).toBeInTheDocument();
  });
});
