import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import type * as SeoModule from '@/components/Seo';

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

describe('Render SEO', () => {
  let Seo: typeof SeoModule.default;
  beforeEach(async () => {
    process.env.NEXT_PUBLIC_HOSTNAME = 'banger.com';
    vi.resetModules();
    const seoModule = await import('@/components/Seo');
    Seo = seoModule.default;
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('renders a seo', () => {
    render(
      <div>
        <Seo templateTitle='banger' />
        Test
      </div>,
    );

    const tooltip = screen.getByText('Test');

    expect(tooltip).toBeInTheDocument();
  });

  it('renders a seo with no templateTitle', () => {
    render(
      <div>
        <Seo />
        Test
      </div>,
    );

    const tooltip = screen.getByText('Test');

    expect(tooltip).toBeInTheDocument();
  });
});
