<script setup lang="ts">
import { useAppProviderContext } from '@/layout/context/useAppProviderContext';

const { isSidebarOpen } = useAppProviderContext();
defineOptions({
  name: 'LayoutHeader',
});

const items = [
  {
    title: 'Item #1',
    value: 1,
  },
  {
    title: 'Item #2',
    value: 2,
  },
  {
    title: 'Item #3',
    value: 3,
  },
];
</script>

<template>
  <v-navigation-drawer v-model="isSidebarOpen">
    <v-list :items="items" active-color="primary" />
  </v-navigation-drawer>
</template>

<style scoped>

</style>