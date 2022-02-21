import { OGType, openGraph } from '@/lib/og';

describe('open graph test', () => {
  it('should return correct open graph url', () => {
    expect.hasAssertions();
    const result = openGraph({
      description: 'Test',
      siteName: 'lordronz.vercel.app',
      templateTitle: 'Test Title',
      logo: 'https://lordronz.vercel.app/images/logo.jpg',
    });

    expect(result).toBe(
      'https://lr-og.vercel.app/api/general?siteName=lordronz.vercel.app&description=Test&logo=https%3A%2F%2Flordronz.vercel.app%2Fimages%2Flogo.jpg&logoWidth=100&templateTitle=Test%20Title'
    );
  });
  it('should return trimmed logo url', () => {
    expect.hasAssertions();
    const result = openGraph({
      description: 'Test',
      siteName: 'lordronz.vercel.app',
      templateTitle: 'Test Title',
      logo: '   https://lordronz.vercel.app/images/logo.jpg    ',
    });

    expect(result).toBe(
      'https://lr-og.vercel.app/api/general?siteName=lordronz.vercel.app&description=Test&logo=https%3A%2F%2Flordronz.vercel.app%2Fimages%2Flogo.jpg&logoWidth=100&templateTitle=Test%20Title'
    );
  });
  it('should return gradient api route url', () => {
    expect.hasAssertions();
    const result = openGraph({
      description: 'Test',
      siteName: 'lordronz.vercel.app',
      templateTitle: 'Test Title',
      logo: '   https://lordronz.vercel.app/images/logo.jpg    ',
      type: 'gradient',
    });

    expect(result).toBe(
      'https://lr-og.vercel.app/api/gradient?siteName=lordronz.vercel.app&description=Test&logo=https%3A%2F%2Flordronz.vercel.app%2Fimages%2Flogo.jpg&logoWidth=100&templateTitle=Test%20Title'
    );
  });
  it('should return general api route url', () => {
    expect.hasAssertions();
    const result = openGraph({
      description: 'Test',
      siteName: 'lordronz.vercel.app',
      templateTitle: 'Test Title',
      logo: '   https://lordronz.vercel.app/images/logo.jpg    ',
      type: 'bruh' as keyof typeof OGType,
    });

    expect(result).toBe(
      'https://lr-og.vercel.app/api/general?siteName=lordronz.vercel.app&description=Test&logo=https%3A%2F%2Flordronz.vercel.app%2Fimages%2Flogo.jpg&logoWidth=100&templateTitle=Test%20Title'
    );
  });
});
