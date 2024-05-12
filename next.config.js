/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = async (phase) => {
  /** @type {import('next').NextConfig} */
  let nextConfig = {
    poweredByHeader: false,
    compiler: {
      ...(process.env.NODE_ENV === 'production' && {
        removeConsole: {
          exclude: ['error', 'info'],
        },
      }),
    },
    reactStrictMode: true,
    transpilePackages: ['geist'],
    webpack: (config, { dev, isServer }) => {
      // Replace React with Preact only in client production build
      // if (!dev && !isServer) {
      //   Object.assign(config.resolve.alias, {
      //     'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
      //     react: 'preact/compat',
      //     'react-dom/test-utils': 'preact/test-utils',
      //     'react-dom': 'preact/compat',
      //   });
      // }

      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              icon: true,
            },
          },
        ],
      });

      return config;
    },
    experimental: {
      turbo: {
        rules: {
          '*.svg': {
            loaders: ['@svgr/webpack'], // https://github.com/vercel/turbo/issues/4832
            as: '*.js',
          },
        },
      },
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'cdn.discordapp.com',
          port: '',
        },
      ],
    },
  };

  if (process.env.NODE_ENV === 'production') {
    const withSerwist = (await import('@serwist/next')).default({
      // Note: This is only an example. If you use Pages Router,
      // use something else that works, such as "service-worker/index.ts".
      swSrc: 'src/service-worker/sw.ts',
      swDest: 'public/sw.js',
    });
    nextConfig = withSerwist(nextConfig);
  }

  return withBundleAnalyzer(nextConfig);
};

module.exports = nextConfig;
