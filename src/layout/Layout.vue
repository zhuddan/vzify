<script setup lang="ts">
import { locales } from '@/plugins/vuetify/locale';
import { useCycleList } from '@vueuse/core';
import { useDisplay, useLocale } from 'vuetify/lib/framework.mjs';
import { LayoutFooter, LayoutHeader, LayoutMain, LayoutSidebar } from './components';
import { createLayoutProviderContext } from './context/useLayoutProviderContext';

const { mobile } = useDisplay();
const isSidebarOpen = ref(!mobile.value);
const locale = ref('zhHans');
const d = useLocale();
const { current, provide } = useLocale();
const theme = ref<'light' | 'dark'>('dark');
createLayoutProviderContext({
  theme,
  locales,
  locale,
  isSidebarOpen,
});
const dddd = computed(() => unref(d.current));
</script>

<template>
  <v-locale-provider :locale="dddd">
    <v-app>
      <LayoutHeader />
      <LayoutSidebar />
      <LayoutMain>
        {{ current }}
        {{ dddd }}
      </LayoutMain>
      <LayoutFooter />
    </v-app>
  </v-locale-provider>
</template>

<style scoped>

</style>