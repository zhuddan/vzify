<script setup lang="ts">
import a from '@/assets/images/a.jpg';
import b from '@/assets/images/b.jpg';
import c from '@/assets/images/c.jpg';
import { useRouteParams } from '@/hooks/web/route/useRouteParams';
import { useCycleList } from '@vueuse/core';
const id = useRouteParams<string>('id');
const { prev, next, state } = useCycleList<string>(['a', 'b', 'c'], { initialValue: id.value });
const imgs = computed(() => ({ a, b, c }[id.value]));
watch(state, () => (id.value != state.value) ? id.value = state.value : '');
</script>

<template>
  <div class="detail-box">
    <button class="left" @click="prev()">
      <Icon size="40" icon="ep:arrow-left" />
    </button>
    <img :src="imgs" alt="">
    <button class="right" @click="next()">
      <Icon size="40" icon="ep:arrow-right" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.detail-box{
  position: relative;

  button{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    height: 100%;
    z-index: 1;

    &.right{
      right: 0;
    }

    :hover{
      cursor: pointer;
    }
  }
}

img {
  width: 100%;
  max-width: 80%;
  object-fit: contain;
  margin: 0 auto;
  display: block;
  height: var(--app-content-inner-height);
}
</style>
