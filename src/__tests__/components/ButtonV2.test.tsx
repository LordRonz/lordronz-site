import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Button } from '@/components/buttons/ButtonV2';

describe('Button', () => {
  it('preserves icons, disabled behavior, and link rendering', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <Button disabled onClick={onClick} leftIcon={<span>Icon</span>}>
        Save
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByText('Icon')).toBeInTheDocument();

    rerender(
      <Button
        nativeButton={false}
        render={<a href='/about' role='link' />}
        rightIcon={<span>Arrow</span>}
      >
        About
      </Button>,
    );
    expect(screen.getByRole('link', { name: /About.*Arrow/ })).toHaveAttribute(
      'href',
      '/about',
    );
  });
});
