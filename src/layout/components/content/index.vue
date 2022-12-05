<script setup lang="ts">
import { BackTop } from '@/components/BackTop';
import { useAppStore } from '@/store/modules/app';
import Sidebar from '../sidebar/index.vue';
const appStore = useAppStore();
const collapse = computed(() => appStore.collapse);

defineOptions({
  name: 'LayoutContent',
});
</script>

<template>
  <div class="content-wrapper" :class="{ collapse }">
    <Sidebar />
    <main id="content">
      <router-view />
    </main>
    <BackTop />
  </div>
</template>

<style scoped lang="scss">
  @import '@/style/var.scss';

  @media screen and (max-width: $screen-md) {
    .content-wrapper {
      grid-template-columns: auto !important;
    }
  }

  .content-wrapper {
    --app-content-inner-height: calc(var(--app-content-height) - var(--app-content-padding) * 2);
    flex: 1;
    display: grid;
    grid-template-columns: 200px auto;

    &.collapse {
      grid-template-columns: auto !important;
    }
  }

  #content {
    flex: 1;
    padding: var(--app-content-padding);
    overflow-x: hidden;
  }
</style>
