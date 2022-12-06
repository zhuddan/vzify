<script setup lang="ts">
import { useLayout } from '@/layout/hooks/useLayout';
const { isSidebarOpen } = useLayout();
defineOptions({
  name: 'LayoutHeader',
});
</script>

<template>
  <v-navigation-drawer v-model="isSidebarOpen" />
</template>

<style scoped>

</style>