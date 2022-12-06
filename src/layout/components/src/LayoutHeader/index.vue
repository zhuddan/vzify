<script setup lang="ts">
import { useAppConfig } from '@/hooks/config/useAppConfig';
import logoImg from '@/assets/logo.png';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import ButtonTranslate from './ButtonTranslate.vue';
import { useLayoutProviderContext } from '@/layout/context/useLayoutProviderContext';
defineOptions({
  name: 'LayoutSidebar',
});
const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
];
const { VITE_APP_TITLE } = useAppConfig();
const { mobile } = useDisplay();
const { isSidebarOpen } = useLayoutProviderContext();
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
      <v-btn icon="mdi-heart" />
      <ButtonTranslate />
      <v-btn icon="mdi-dots-vertical" />
    </template>
  </v-app-bar>
</template>

<style scoped>

</style>