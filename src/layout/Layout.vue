<script setup lang="ts">
import { locales } from '@/plugins/vuetify/locale';
import { useDisplay, useLocale, useTheme } from 'vuetify/lib/framework.mjs';
import { LayoutFooter, LayoutHeader, LayoutMain, LayoutSidebar } from './components';
import { createAppProviderContext } from './context/useAppProviderContext';

const { mobile } = useDisplay();
const { current } = useLocale();
const isSidebarOpen = ref(!mobile.value);
const { global } = useTheme();
const isDark = computed(() => global.current.value.dark);
const theme = computed({
  get() {
    return isDark.value ? 'dark' : 'light';
  },
  set(v) {
    global.name.value = v;
  },
});

const locale = computed({
  get() {
    return current.value;
  },
  set(val) {
    current.value = val;
  },
});

createAppProviderContext({
  theme,
  locales,
  locale,
  isSidebarOpen,
});
</script>

<template>
  <v-locale-provider :locale="locale">
    <v-app>
      <LayoutHeader />
      <LayoutSidebar />
      <LayoutMain />
      <LayoutFooter />
    </v-app>
  </v-locale-provider>
</template>

<style scoped>

</style>