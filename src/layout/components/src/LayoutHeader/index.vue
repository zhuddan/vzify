<script setup lang="ts">
import { useAppConfig } from '@/hooks/config/useAppConfig';
import logoImg from '@/assets/logo.png';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import LocaleButton from './LocaleButton.vue';
import ThemeButton from './ThemeButton.vue';
import { useAppProviderContext } from '@/layout/context/useAppProviderContext';
defineOptions({
  name: 'LayoutSidebar',
});
const { VITE_APP_TITLE } = useAppConfig();
const { mobile } = useDisplay();
const { isSidebarOpen } = useAppProviderContext();
</script>

<template>
  <v-app-bar>
    <template #prepend>
      <v-btn v-if="mobile" icon="mdi-menu" @click="(isSidebarOpen = !isSidebarOpen)" />
      <v-img height="50" width="50" :src="logoImg" alt="" />
      <h2 style="color: #6200EE">
        {{ VITE_APP_TITLE }}
      </h2>
    </template>
    <template #append>
      <ThemeButton />
      <LocaleButton />
      <v-btn icon="mdi-dots-vertical" />
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>