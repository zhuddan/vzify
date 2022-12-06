import 'vuetify/styles/main.sass';
import '@mdi/font/css/materialdesignicons.css';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import type { App } from 'vue';
import { md2 } from 'vuetify/blueprints';
const vuetifyPlugin = createVuetify({
  blueprint: md2,
  components,
  directives,
});

export function registerVuetifyPlugin(app: App) {
  app.use(vuetifyPlugin);
  return app;
}