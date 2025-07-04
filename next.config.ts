/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import bundleAnalyzer from '@next/bundle-analyzer';
import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = async (
  _phase: string,
  { defaultConfig: _ }: { defaultConfig: NextConfig },
) => {
  let nextConfig: NextConfig = {
    async rewrites() {
      return [
        {
          source: '/quotes-api/:slug*',
          destination:
            'https://satisfactory-melli-lordronz-f2473ffe.koyeb.app/:slug*',
        },
        {
          source: '/umami/script.js',
          destination: 'https://cloud.umami.is/script.js',
        },
      ];
    },
    poweredByHeader: false,
    compiler: {
      ...(process.env.NODE_ENV === 'production' && {
        removeConsole: {
          exclude: ['error', 'info'],
        },
      }),
    },
    reactStrictMode: true,
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
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'], // https://github.com/vercel/turbo/issues/4832
          as: '*.js',
        },
      },
    },
    experimental: {
      viewTransition: true,
      optimizePackageImports: [
        'react-intersection-observer',
        'framer-motion',
        '@react-three/fiber',
        '@react-three/drei',
        'motion',
      ],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          search: '',
        },
        {
          protocol: 'https',
          hostname: 'cdn.discordapp.com',
          port: '',
          search: '',
        },
      ],
    },
  };

  if (process.env.NODE_ENV === 'production') {
    const withSerwist = withSerwistInit({
      // Note: This is only an example. If you use Pages Router,
      // use something else that works, such as "service-worker/index.ts".
      swSrc: 'src/service-worker/sw.ts',
      swDest: 'public/sw.js',
    });
    nextConfig = withSerwist(nextConfig);
  }

  return withBundleAnalyzer(nextConfig);
};

export default nextConfig;
