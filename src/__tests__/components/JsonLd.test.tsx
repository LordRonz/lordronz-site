import { renderToStaticMarkup } from 'react-dom/server';

import JsonLd from '@/components/metadata/JsonLd';

it('escapes markup in structured data', () => {
  const html = renderToStaticMarkup(
    <JsonLd
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: '</script><script>alert(1)</script>',
      }}
    >
      <main />
    </JsonLd>,
  );

  expect(html).not.toContain('</script><script>');
  expect(html).toContain('\\u003c/script>');
});
