const withTM = require('next-transpile-modules')([
    '@monorepo/components',
    '@monorepo/utils',
  ]);
  
  module.exports = withTM({
    compiler: {
      emotion: true
    },
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@monorepo/components': require.resolve('@monorepo/components/dist/cjs'),
        '@monorepo/utils': require.resolve('@monorepo/utils/dist/cjs')
      };
      return config;
    }
  });