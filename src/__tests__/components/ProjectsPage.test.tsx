import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import ProjectsPage from '@/components/pages/ProjectsPage';

vi.mock('@/components/ProjectCard', () => ({
  default: ({
    project,
    onImgClick,
  }: {
    project: { title?: string };
    onImgClick?: () => void;
  }) => (
    <button type='button' onClick={onImgClick}>
      {project.title}
    </button>
  ),
}));

vi.mock('@/components/images/CustomLightbox', () => ({
  default: () => <div data-testid='project-lightbox' />,
}));

it('mounts the lightbox only after opening a project image', async () => {
  render(<ProjectsPage />);

  expect(screen.queryByTestId('project-lightbox')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Risaikuru' }));

  expect(await screen.findByTestId('project-lightbox')).toBeInTheDocument();
});
