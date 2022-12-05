import type { App } from 'vue';

import { registerGlobComp } from './registerGlobComp';
import { vuetifyPlugin } from './vuetify';
export function registerPlugins(app: App) {
  registerGlobComp(app);
  app.use(vuetifyPlugin);
  return app;
}
