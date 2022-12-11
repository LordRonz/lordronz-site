/* eslint-env jest */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Wave from '@/components/Wave';

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

describe('Wave', () => {
  it('renders a wave', () => {
    render(<Wave data-testid='wave' />);

    const wave = screen.getByTestId('wave');

    expect(wave).toBeInTheDocument();
  });

  it('renders a wave with classname', () => {
    render(<Wave className='banger' data-testid='wave' />);

    const wave = screen.getByTestId('wave');

    expect(wave).toBeInTheDocument();
  });
});
