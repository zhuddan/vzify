import Components from 'unplugin-vue-components/vite';
import {
  Vuetify3Resolver,
} from 'unplugin-vue-components/resolvers';

export function createComponents() {
  return Components({
    resolvers: [
      Vuetify3Resolver(),
    ],
    dts: './types/components.d.ts',
    dirs: [],
  });
}