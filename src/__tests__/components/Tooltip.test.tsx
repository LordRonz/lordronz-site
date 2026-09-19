import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import Tooltip from '@/components/Tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';

vi.mock('next/router', () => ({
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
  it('opens on focus, renders in a portal, and dismisses with Escape', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip content='Helpful details'>
        <button>Help</button>
      </Tooltip>,
    );
    await user.tab();
    const popup = await screen.findByRole('tooltip');
    expect(popup).toHaveTextContent('Helpful details');
    expect(
      screen.getByRole('button', { name: 'Help' }),
    ).toHaveAccessibleDescription('Helpful details');
    expect(container).not.toContainElement(popup);
    await user.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument(),
    );
    expect(screen.getByRole('button', { name: 'Help' })).toHaveFocus();
  });

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
