/* eslint-env jest */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Tooltip from '@/components/Tooltip';
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

describe('Tooltip', () => {
  it('renders a tooltip', () => {
    render(
      <TooltipProvider>
        <Tooltip data-testid='tooltip'>Test</Tooltip>
      </TooltipProvider>,
    );

    const tooltip = screen.getByText('Test');

    expect(tooltip).toBeInTheDocument();
  });

  it('renders a tooltip with underline', () => {
    render(
      <TooltipProvider>
        <Tooltip withUnderline data-testid='tooltip'>
          Test
        </Tooltip>
      </TooltipProvider>,
    );

    const tooltip = screen.getByText('Test');

    expect(tooltip).toBeInTheDocument();
  });
});
