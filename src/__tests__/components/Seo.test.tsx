/* eslint-env jest */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import * as SeoModule from '@/components/Seo';

jest.mock('next/router', () => ({
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
    jest.isolateModules(async () => {
      return import('@/components/Seo').then((module) => {
        Seo = module.default;
      });
    });
  });

  afterEach(() => {
    jest.resetModules();
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
});
