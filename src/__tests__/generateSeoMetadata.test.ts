import { defaultMeta, generateSeoMetadata } from '@/lib/generateSeoMetadata';

describe('generateSeoMetadata libs', () => {
  describe('generateSeoMetadata', () => {
    it('should return metadata object which has several properties', () => {
      expect.hasAssertions();
      const result = generateSeoMetadata();

      expect(result).toHaveProperty('openGraph');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('siteName');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('keywords');
    });

    it('should return metadata object which has several properties and given some props', () => {
      expect.hasAssertions();
      const templateTitle = 'Test title';
      const description = 'test desc';
      const result = generateSeoMetadata({
        templateTitle,
        description,
        openGraph: { images: 'test images' },
        title: templateTitle,
      });

      expect(result).toHaveProperty('openGraph');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('siteName');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('keywords');
      expect(result.title).toEqual(
        `${templateTitle} | ${defaultMeta.siteName}`,
      );
      expect(result.description).toEqual(description);
    });

    it('should return metadata object which has several properties and given some props with null title', () => {
      expect.hasAssertions();
      const result = generateSeoMetadata({
        description: null,
        openGraph: { images: ['test images'] },
        title: null,
      });

      expect(result).toHaveProperty('openGraph');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('siteName');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('keywords');
      expect(result.description).toEqual(null);
    });
  });
});
