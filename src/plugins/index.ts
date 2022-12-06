import type { App } from 'vue';

import { registerGlobComp } from './registerGlobComp';
import { registerVuetifyPlugin } from './vuetify';
export function registerPlugins(app: App) {
  registerGlobComp(app);
  registerVuetifyPlugin(app);
  return app;
}
