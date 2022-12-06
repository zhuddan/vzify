<script setup lang="ts">
defineOptions({
  name: 'LayoutMain',
});
</script>

<template>
  <v-main>
    <slot></slot>
    <router-view />
  </v-main>
</template>

<style scoped>

</style>