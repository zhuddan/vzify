import 'vuetify/styles/main.sass';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { md2 } from 'vuetify/blueprints';
import { locale } from './locale';

export const vuetifyPlugin = createVuetify({
  blueprint: md2,
  components,
  directives,
  locale,
});

