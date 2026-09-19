import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Toaster } from '@/components/ui/toast/toaster';
import { toastManager } from '@/components/ui/toast/use-toast';

it('adds, updates, and dismisses manager-driven toasts', async () => {
  const user = userEvent.setup();
  render(<Toaster />);
  let id = '';
  await act(async () => {
    id = toastManager.add({
      title: 'Failed to fetch quotes',
      timeout: 0,
      data: { variant: 'destructive' },
    });
  });
  expect(
    await screen.findByRole('heading', { name: 'Failed to fetch quotes' }),
  ).toBeInTheDocument();
  await act(async () => {
    toastManager.update(id, { title: 'Try again' });
  });
  expect(
    screen.getByRole('heading', { name: 'Try again' }),
  ).toBeInTheDocument();
  await user.hover(screen.getByRole('region', { name: 'Notifications' }));
  await user.click(
    await screen.findByRole('button', { name: 'Dismiss notification' }),
  );
  await waitFor(() =>
    expect(
      screen.queryByRole('heading', { name: 'Try again' }),
    ).not.toBeInTheDocument(),
  );
});

it('automatically expires toasts', async () => {
  render(<Toaster />);
  await act(async () => {
    toastManager.add({ title: 'Temporary notice', timeout: 100 });
  });
  expect(
    await screen.findByRole('heading', { name: 'Temporary notice' }),
  ).toBeInTheDocument();
  await waitFor(() =>
    expect(
      screen.queryByRole('heading', { name: 'Temporary notice' }),
    ).not.toBeInTheDocument(),
  );
});
