/* eslint-env jest */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Tooltip from '@/components/Tooltip';

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

describe('Tooltip', () => {
  it('renders a tooltip', () => {
    render(<Tooltip data-testid='tooltip'>Test</Tooltip>);

    const tooltip = screen.getByText('Test');

    expect(tooltip).toBeInTheDocument();
  });

  it('renders a tooltip with underline', () => {
    render(
      <Tooltip withUnderline data-testid='tooltip'>
        Test
      </Tooltip>,
    );

    const tooltip = screen.getByText('Test');

    expect(tooltip).toBeInTheDocument();
  });
});
