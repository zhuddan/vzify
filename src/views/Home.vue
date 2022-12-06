<script setup lang="ts">
const isActive = ref(false);
</script>

<template>
  <v-lazy
    v-for="item in 100" :key="item"
    v-model="isActive"
    :options="{
      threshold: .5,
    }"
    min-height="200"
    transition="fade-transition"
  >
    <v-card

      width="400"
      title="This is a title"
      subtitle="This is a subtitle"
      text="This is content"
    />
  </v-lazy>
</template>

<style scoped></style>
