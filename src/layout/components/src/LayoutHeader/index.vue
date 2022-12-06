<script setup lang="ts">
import { useLayout } from '@/layout/hooks/useLayout';
import { useAppConfig } from '@/hooks/config/useAppConfig';
const { isSidebarOpen } = useLayout();
defineOptions({
  name: 'LayoutSidebar',
});
const { VITE_APP_TITLE } = useAppConfig();
</script>

<template>
  <v-app-bar color="">
    <template #prepend>
      <img height="50" width="50" src="@/assets/logo.png" alt="">
      <h2 style="color: #6200EE">
        {{ VITE_APP_TITLE }}
      </h2>
      <v-btn icon="mdi-menu" @click="(isSidebarOpen = !isSidebarOpen)" />
    </template>
    <template #append>
      <v-btn icon="mdi-heart" />
      <v-btn icon="mdi-magnify" />
      <v-btn icon="mdi-dots-vertical" />
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>