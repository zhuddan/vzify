<script setup lang="ts">
import { useAppProviderContext } from '@/layout/context/useAppProviderContext';
const { locale, locales } = useAppProviderContext();
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
        color=""
        v-bind="props"
        icon="mdi-translate"
      />
    </template>
    <v-list>
      <v-list-item
        v-for="(item,) in locales"
        :key="item.key"
        :active="locale === item.key"
        active-color="primary"
        :value="item.key"
        @click="locale = item.key"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>

</style>