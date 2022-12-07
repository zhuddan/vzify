<script setup lang="ts">
import { useAppProviderContext } from '@/layout/context/useAppProviderContext';
const { theme } = useAppProviderContext();
const toggleTheme = () => theme.value = theme.value == 'dark' ? 'light' : 'dark';
</script>

<template>
  <v-btn
    color="primary"
    icon
    @click="toggleTheme"
  >
    <Icon v-if="theme === 'dark'" icon="noto-v1:sun" size="24" />
    <Icon v-else icon="openmoji:crescent-moon" size="24" />
  </v-btn>
</template>

<style scoped>

</style>