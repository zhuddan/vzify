<script setup lang="ts">
import { usePermissionStore } from '@/store/modules/permission';
import { useAppStore } from '@/store/modules/app';
import SidebarItem from './SidebarItem.vue';
import { sleep } from '@/utils';
import { useAppBreakpoints } from '@/hooks/web/useAppBreakpoints';

defineOptions({
  name: 'Sidebar',
});

const permissionStore = usePermissionStore();
const appStore = useAppStore();
const routes = computed(() => permissionStore.routes);
const collapse = computed(() => appStore.collapse);
const { md } = useAppBreakpoints();
const classes = ref('');
const show = computed(() => (md.value ? true : !collapse.value));
async function handleLockScroll() {
  const body = document.body;
  if (collapse.value || !md.value) {
    body.classList.remove('full-screen-overlay');
    classes.value = 'is-animating';
    await sleep(300);
    classes.value = 'collapse';
  }
  else {
    body.classList.add('full-screen-overlay');
    classes.value = '';
  }
}
function handleSelect() {
  md.value && appStore.toggleCollapse();
}
watch([md, collapse], handleLockScroll, { immediate: true });
</script>

<template>
  <aside v-if="show" id="aside-nav-wrapper" :class="[classes]">
    <button class="backdrop" @click="appStore.toggleCollapse"></button>
    <nav>
      <SidebarItem :nav="routes" @select="handleSelect" />
    </nav>
  </aside>
</template>

<style scoped lang="scss">
  $width: var(--app-side-bar-width);
  $height: calc(100vh - var(--app-header-hight) - var(--app-breadcrumbs-hight));

  @import '@/style/var.scss';

  #aside-nav-wrapper {
    font-size: var(--app-header);
    border-right: 1px solid #cdcdcd;
    overflow-x: hidden;
    width: $width;
    position: -webkit-sticky;
    position: sticky;
    top: 90px;
    max-height: $height;
    box-sizing: border-box;
    z-index: 9;

    .backdrop {
      transition: opacity 0.3s ease;
      position: fixed;
      background-color: rgba(0, 0, 0, 0.2);
      left: 0;
      right: 0;
      height: $height;
      opacity: 0;
      transform: translateX(-100%);
      display: none;
      border: 0;
    }

    nav {
      display: flex;
      overflow: auto;
      flex-direction: column;
      max-height: $height;
      position: relative;
      transform: translateX(0);
      padding: 10px;
      box-sizing: border-box;
      padding-left: var(--app-content-padding);
      width: $width;
      background: white;
      height: 100%;
    }
  }
  /* stylelint-disable-next-line order/order */
  @media screen and (max-width: $screen-md) {
    #aside-nav-wrapper {
      border: none !important;
      position: fixed;
      left: 0;
      right: 0;
      width: 100%;
      height: $height;

      .backdrop {
        opacity: 1;
      }

      nav {
        left: 0;
        transform: translateX(0);
        transition: transform 0.3s ease;
      }

      &.collapse {
        transform: translateX(-100%);

        nav {
          transform: translateX(-100%);
        }
      }

      &:not(.collapse) {
        .backdrop {
          transform: translateX(0);
          display: block;
        }
      }

      &.is-animating {
        nav {
          transform: translateX(-100%);
        }

        .backdrop {
          opacity: 0;
        }
      }
    }
  }
</style>
