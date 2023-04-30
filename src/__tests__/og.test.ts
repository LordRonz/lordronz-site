import { OG_URL, WEBSITE_HOSTNAME, WEBSITE_URL } from '@/constants/env';
import openGraphDefault, { OGType, openGraph } from '@/lib/og';

describe('open graph test', () => {
  it('should return correct open graph url', () => {
    expect.hasAssertions();
    const result = openGraph({
      description: 'Test',
      siteName: `${WEBSITE_HOSTNAME}`,
      templateTitle: 'Test Title',
      logo: `${WEBSITE_URL}/images/logo.jpg`,
    });

    expect(result).toBe(
      `${OG_URL}/api/general?siteName=${WEBSITE_HOSTNAME}&description=Test&logo=https%3A%2F%2F${WEBSITE_HOSTNAME}%2Fimages%2Flogo.jpg&logoWidth=100&templateTitle=Test%20Title`
    );
  });
  it('should return trimmed logo url', () => {
    expect.hasAssertions();
    const result = openGraph({
      description: 'Test',
      siteName: `${WEBSITE_HOSTNAME}`,
      templateTitle: 'Test Title',
      logo: `   ${WEBSITE_URL}/images/logo.jpg    `,
    });

    expect(result).toBe(
      `${OG_URL}/api/general?siteName=${WEBSITE_HOSTNAME}&description=Test&logo=https%3A%2F%2F${WEBSITE_HOSTNAME}%2Fimages%2Flogo.jpg&logoWidth=100&templateTitle=Test%20Title`
    );
  });
  it('should return gradient api route url', () => {
    expect.hasAssertions();
    const result = openGraph({
      description: 'Test',
      siteName: `${WEBSITE_HOSTNAME}`,
      templateTitle: 'Test Title',
      logo: `   ${WEBSITE_URL}/images/logo.jpg    `,
      type: 'gradient',
    });

    expect(result).toBe(
      `${OG_URL}/api/gradient?siteName=${WEBSITE_HOSTNAME}&description=Test&logo=https%3A%2F%2F${WEBSITE_HOSTNAME}%2Fimages%2Flogo.jpg&logoWidth=100&templateTitle=Test%20Title`
    );
  });
  it('should return general api route url', () => {
    expect.hasAssertions();
    const result = openGraph({
      description: 'Test',
      siteName: `${WEBSITE_HOSTNAME}`,
      templateTitle: 'Test Title',
      logo: `   ${WEBSITE_URL}/images/logo.jpg    `,
      type: 'bruh' as keyof typeof OGType,
    });

    expect(result).toBe(
      `${OG_URL}/api/general?siteName=${WEBSITE_HOSTNAME}&description=Test&logo=https%3A%2F%2F${WEBSITE_HOSTNAME}%2Fimages%2Flogo.jpg&logoWidth=100&templateTitle=Test%20Title`
    );
  });
  it('should return correct logo', () => {
    expect.hasAssertions();
    const result = openGraph({
      description: 'Test',
      siteName: `${WEBSITE_HOSTNAME}`,
      templateTitle: 'Test Title',
      type: 'bruh' as keyof typeof OGType,
    });

    expect(result).toBe(
      `${OG_URL}/api/general?siteName=${WEBSITE_HOSTNAME}&description=Test&logo=https%3A%2F%2F${WEBSITE_HOSTNAME}%2Fimages%2Flogo.jpg&logoWidth=100&templateTitle=Test%20Title`
    );
  });
  it('should return empty template title', () => {
    expect.hasAssertions();
    const result = openGraph({
      description: 'Test',
      siteName: `${WEBSITE_HOSTNAME}`,
      type: 'bruh' as keyof typeof OGType,
    });

    expect(result).toBe(
      `${OG_URL}/api/general?siteName=${WEBSITE_HOSTNAME}&description=Test&logo=https%3A%2F%2F${WEBSITE_HOSTNAME}%2Fimages%2Flogo.jpg&logoWidth=100`
    );
  });
  it('should return correct logo width', () => {
    expect.hasAssertions();
    const result = openGraph({
      description: 'Test',
      siteName: `${WEBSITE_HOSTNAME}`,
      type: 'bruh' as keyof typeof OGType,
      logoWidth: '169',
    });

    expect(result).toBe(
      `${OG_URL}/api/general?siteName=${WEBSITE_HOSTNAME}&description=Test&logo=https%3A%2F%2F${WEBSITE_HOSTNAME}%2Fimages%2Flogo.jpg&logoWidth=169`
    );
  });

  it('should return correct logo width (default import)', () => {
    expect.hasAssertions();
    const result = openGraphDefault({
      description: 'Test',
      siteName: `${WEBSITE_HOSTNAME}`,
      type: 'bruh' as keyof typeof OGType,
      logoWidth: '169',
    });

    expect(result).toBe(
      `${OG_URL}/api/general?siteName=${WEBSITE_HOSTNAME}&description=Test&logo=https%3A%2F%2F${WEBSITE_HOSTNAME}%2Fimages%2Flogo.jpg&logoWidth=169`
    );
  });
});
