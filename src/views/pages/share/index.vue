<script setup lang="ts">
import a from '@/assets/images/a.jpg';
import b from '@/assets/images/b.jpg';
import c from '@/assets/images/c.jpg';
import { useRandom } from '@/hooks/math/useRandom';
const list = {
  a, b, c,
};

const s = useRandom(['a', '2']);
console.log(s);
</script>

<template>
  <ul>
    <li v-for="(it, key) in list" :key="key">
      <router-link :to="`/share/detail/${key}`">
        <img width="150" height="150" :src="it" alt="">
      </router-link>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li + li {
    margin-top: 10px;
  }

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    box-sizing: border-box;
    display: block;
    border-radius: 100%;
  }
</style>
