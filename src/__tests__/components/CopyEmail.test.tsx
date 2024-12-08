/* eslint-env jest */
import '@testing-library/jest-dom';

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CopyEmail from '@/components/layout/Footer/CopyEmail';
import { TooltipProvider } from '@/components/ui/tooltip';

jest.useFakeTimers(); // Use fake timers for delayed actions

document.execCommand = jest.fn();

const renderWithTooltipProvider = (component: React.JSX.Element) =>
  render(<TooltipProvider>{component}</TooltipProvider>);

describe('CopyEmail', () => {
  beforeAll(() => {
    // Mock window.prompt
    window.prompt = jest.fn();
  });

  it('displays the initial tooltip content on hover', async () => {
    renderWithTooltipProvider(<CopyEmail />);

    const mailButton = screen.getByLabelText('Mail button');

    // Simulate mouse hover
    userEvent.hover(mailButton);

    // Wait for the tooltip content to appear
    const [tooltipContent] = await screen.findAllByTestId('copy-status');
    expect(tooltipContent).toBeInTheDocument();

    // Simulate mouse leave
    userEvent.unhover(mailButton);
  });

  it('updates tooltip content on copy and resets after delay', async () => {
    renderWithTooltipProvider(<CopyEmail />);

    const mailButton = screen.getByLabelText('Mail button');

    // Simulate mouse hover
    userEvent.hover(mailButton);

    // Click the mail button to copy the email
    userEvent.click(mailButton);

    // Verify the tooltip updates to "Copied to clipboard"
    const [copiedTooltipContent] = await screen.findAllByText(
      'Copied to clipboard 😳',
    );
    expect(copiedTooltipContent).toBeInTheDocument();

    // Advance timers to allow reset
    act(() => {
      jest.runAllTimers();
    });

    // Verify tooltip resets to initial message
    const [resetTooltipContent] = await screen.findAllByText(
      'Click the mail logo to copy',
    );
    expect(resetTooltipContent).toBeInTheDocument();
  });

  it('copies the email to clipboard', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    renderWithTooltipProvider(<CopyEmail />);

    const mailButton = screen.getByLabelText('Mail button');

    // Simulate mouse hover
    userEvent.hover(mailButton);

    // Click the mail button to copy the email
    userEvent.click(mailButton);

    // Verify email is copied to clipboard
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });
});
