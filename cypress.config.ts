import { defineConfig } from 'cypress';
import { devServer } from '@cypress/webpack-dev-server';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('dev-server:start', (options) => {
        return devServer(options);
      });
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
});
