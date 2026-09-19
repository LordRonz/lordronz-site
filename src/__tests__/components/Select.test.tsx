import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

it('selects with the keyboard, marks disabled items, and restores focus', async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(
    <Select
      defaultValue='apple'
      onValueChange={onValueChange}
      items={{ apple: 'Apple', banana: 'Banana', cherry: 'Cherry' }}
    >
      <SelectTrigger aria-label='Fruit'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} side='bottom' align='start'>
        <SelectItem value='apple'>Apple</SelectItem>
        <SelectItem value='banana' disabled>
          Banana
        </SelectItem>
        <SelectItem value='cherry'>Cherry</SelectItem>
      </SelectContent>
    </Select>,
  );
  await user.click(screen.getByRole('combobox', { name: 'Fruit' }));
  expect(await screen.findByRole('listbox')).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await user.keyboard('{End}{Enter}');
  expect(onValueChange).toHaveBeenCalledWith('cherry', expect.any(Object));
  await waitFor(() =>
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument(),
  );
  expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveFocus();
  expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveTextContent(
    'Cherry',
  );
});
