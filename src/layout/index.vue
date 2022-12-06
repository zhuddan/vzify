<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { LayoutFooter, LayoutHeader, LayoutMain, LayoutSidebar } from './components';
import { createLayoutProviderContext } from './context/useLayoutProviderContext';

const { mobile } = useDisplay();
const isSidebarOpen = ref(!mobile.value);
createLayoutProviderContext({
  isSidebarOpen,
  setIsSidebarOpen: (value) => {
    isSidebarOpen.value = value;
  },
});
</script>

<template>
  <v-app>
    <LayoutHeader />
    <LayoutSidebar />
    <LayoutMain />
    <LayoutFooter />
  </v-app>
</template>

<style scoped>

</style>