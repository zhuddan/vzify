<script setup lang="ts">
import { useTheme } from 'vuetify';
const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
const toggleTheme = () => theme.global.name.value = isDark.value ? 'light' : 'dark';
</script>

<template>
  <v-btn
    color="primary"
    icon
    @click="toggleTheme"
  >
    <Icon v-if="isDark" icon="noto-v1:sun" size="24" />
    <Icon v-else icon="openmoji:crescent-moon" size="24" />
  </v-btn>
</template>

<style scoped>

</style>