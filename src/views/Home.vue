<script setup lang="ts">
const isActive = ref(false);
</script>

<template>
  <v-container>
    <v-card
      v-for="item in 100" :key="item"
      width="400"
      title="This is a title"
      subtitle="This is a subtitle"
      text="This is content"
    />
  </v-container>
</template>

<style scoped></style>
