import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

it('uses manual keyboard activation and switches panels', async () => {
  const user = userEvent.setup();
  render(
    <Tabs defaultValue='first'>
      <TabsList aria-label='Sections'>
        <TabsTrigger value='first'>First</TabsTrigger>
        <TabsTrigger value='second'>Second</TabsTrigger>
      </TabsList>
      <TabsContent value='first'>First panel</TabsContent>
      <TabsContent value='second'>Second panel</TabsContent>
    </Tabs>,
  );
  await user.tab();
  await user.keyboard('{ArrowRight}');
  expect(screen.getByRole('tab', { name: 'Second' })).toHaveFocus();
  expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute(
    'data-active',
  );
  await user.keyboard('{Enter}');
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Second panel');
});
