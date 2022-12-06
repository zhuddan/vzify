<script setup lang="ts">
import { locales } from '@/plugins/vuetify/locale';
import { useCycleList } from '@vueuse/core';
import { useDisplay, useLocale } from 'vuetify/lib/framework.mjs';
import { LayoutFooter, LayoutHeader, LayoutMain, LayoutSidebar } from './components';
import { createLayoutProviderContext } from './context/useLayoutProviderContext';

const { mobile } = useDisplay();
const isSidebarOpen = ref(!mobile.value);
const locale = ref('zhHans');

createLayoutProviderContext({
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