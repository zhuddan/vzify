import { vuetifyPlugin } from './vuetifyPlugin';
import type { App } from 'vue';

export function registerVuetifyPlugin(app: App) {
  app.use(vuetifyPlugin);
  return app;
}