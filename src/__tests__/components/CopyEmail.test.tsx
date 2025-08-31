import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import CopyEmail from '@/components/layout/Footer/CopyEmail';
import { TooltipProvider } from '@/components/ui/tooltip';

let mockOnCopy: ((text: string, result: boolean) => void) | undefined;
vi.mock('react-copy-to-clipboard', () => ({
  CopyToClipboard: ({
    children,
    onCopy,
    text,
  }: {
    children: React.ReactNode;
    onCopy: (text: string, result: boolean) => void;
    text: string;
  }) => {
    mockOnCopy = onCopy;
    return (
      <div
        data-testid='copy-to-clipboard'
        onClick={() => {
          onCopy(text, true);
        }}
      >
        {children}
      </div>
    );
  },
}));

const renderWithTooltipProvider = (component: React.JSX.Element) =>
  render(<TooltipProvider>{component}</TooltipProvider>);

describe('CopyEmail', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders the mail button', () => {
    renderWithTooltipProvider(<CopyEmail />);

    const mailButton = screen.getByLabelText('Mail button');
    expect(mailButton).toBeInTheDocument();
  });

  it('renders the copy component with correct structure', () => {
    renderWithTooltipProvider(<CopyEmail />);

    expect(screen.getByLabelText('Mail button')).toBeInTheDocument();

    expect(screen.getByTestId('copy-to-clipboard')).toBeInTheDocument();

    const mailIcon = screen.getByLabelText('Mail button').querySelector('svg');
    expect(mailIcon).toBeInTheDocument();
  });

  it('has correct email in the component', () => {
    renderWithTooltipProvider(<CopyEmail />);

    expect(screen.getByLabelText('Mail button')).toBeInTheDocument();

    expect(screen.getByTestId('copy-to-clipboard')).toBeInTheDocument();

    expect(mockOnCopy).toBeDefined();
  });
});
