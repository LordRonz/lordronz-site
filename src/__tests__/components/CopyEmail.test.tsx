import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import CopyEmail from '@/components/layout/Footer/CopyEmail';
import { TooltipProvider } from '@/components/ui/tooltip';

const writeText = vi.fn().mockResolvedValue(undefined);
Object.assign(navigator, { clipboard: { writeText } });

const renderWithTooltipProvider = (component: React.JSX.Element) =>
  render(<TooltipProvider>{component}</TooltipProvider>);

describe('CopyEmail', () => {
  beforeEach(() => {
    writeText.mockClear();
  });

  it('renders the mail button', () => {
    renderWithTooltipProvider(<CopyEmail />);

    const mailButton = screen.getByLabelText('Mail button');
    expect(mailButton).toBeInTheDocument();
  });

  it('renders the copy component with correct structure', () => {
    renderWithTooltipProvider(<CopyEmail />);

    expect(screen.getByLabelText('Mail button')).toBeInTheDocument();

    const mailIcon = screen.getByLabelText('Mail button').querySelector('svg');
    expect(mailIcon).toBeInTheDocument();
  });

  it('has correct email and copies to clipboard on click', async () => {
    renderWithTooltipProvider(<CopyEmail />);

    expect(screen.getByLabelText('Mail button')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Mail button'));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('me@aaronct.dev');
    });
  });
});
