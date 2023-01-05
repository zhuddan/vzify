<script setup lang="ts">
const elevations = [0, 12, 18];
const tab = ref(null);
</script>

<template>
  <v-container>
    <v-toolbar flat class="position-sticky v-app-tabs" density="compact" color="#fff" elevation="1">
      <v-container>
        <v-tabs
          v-model="tab"
          density="compact"
        >
          <v-tab value="one">
            最新
          </v-tab>
          <v-tab value="two">
            最多查看
          </v-tab>
          <v-tab value="three">
            最多收藏
          </v-tab>
        </v-tabs>
      </v-container>
    </v-toolbar>

    <v-window v-model="tab">
      <v-window-item value="one">
        <v-card
          v-for="it in 10"
          :key="it"
          elevation="2"
          title="Card title"
          subtitle="Subtitle"
          text="..."
          class=" ma-2"
        >
          <v-card-actions>
            <v-btn>Click me</v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
      <v-window-item value="two">
        <v-card
          v-for="it in 10"
          :key="it"
          elevation="2"
          title="Card title"
          subtitle="Subtitle"
          text="..."
          class=" ma-2"
        >
          <v-card-actions>
            <v-btn>Click me</v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
      <v-window-item value="three">
        <v-card
          v-for="it in 10"
          :key="it"
          elevation="2"
          title="Card title"
          subtitle="Subtitle"
          text="..."
          class=" ma-2"
        >
          <v-card-actions>
            <v-btn>Click me</v-btn>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<style scoped lang="scss">
.v-app-tabs{
  top: calc(var(--v-layout-top) );
}
</style>
