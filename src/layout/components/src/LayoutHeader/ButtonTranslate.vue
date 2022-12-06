<script setup lang="ts">
import { useLayoutProviderContext } from '@/layout/context/useLayoutProviderContext';
import { useLocale } from 'vuetify/lib/framework.mjs';
const { locale, locales } = useLayoutProviderContext();
const d = useLocale();
const current = ref(unref(d.current));
const dddd = computed({
  get() {
    return unref(d.current);
  },
  set(val) {
    d.current.value = val;
  },
});
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
        @click="dddd = item.key"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>

</style>