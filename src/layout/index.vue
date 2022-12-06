<script setup lang="ts">
import { LayoutFooter, LayoutHeader, LayoutMain, LayoutSidebar } from './components';
import { createLayoutProviderContext } from './context/useLayoutProviderContext';
const isSidebarOpen = ref(false);
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