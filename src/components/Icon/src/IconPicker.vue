<script setup lang="ts">
import type { IconsType } from '../data/index';
import { IconCollections } from '../data/index';
import Icon from './Icon.vue';
const activeIcons = ref<IconsType>('element-plus');
const baseIcons = computed(() => {
  return IconCollections[activeIcons.value];
});
const keywords = ref('');
const icons = computed(() => {
  if (!keywords.value)
    return baseIcons.value.icons;

  return baseIcons.value.icons.filter(e => e.includes(keywords.value));
});
const pageSize = ref(20);
const pageNum = ref(1);
const pages = computed(() => {
  return Math.ceil(icons.value.length / pageSize.value);
});
const data = computed(() => {
  return icons.value.slice((pageNum.value - 1) * pageSize.value, pageNum.value * pageSize.value);
});

const range = computed(() => {
  const p = pageNum.value;
  const range = [p - 1, p, p + 1];
  if (range[0] == 0) {
    range.shift();
    if (pages.value >= p + 2)
      range.push(p + 2);
  }
  return range;
});

function onNext() {
  if (pageNum.value < pages.value)
    pageNum.value++;
}
function onPrev() {
  if (pageNum.value > 1)
    pageNum.value--;
}
function onJump(v: number) {
  if (pageNum.value != v)
    pageNum.value = v;
}

function toggleIcons(key: IconsType) {
  if (activeIcons.value != key) {
    activeIcons.value = key;
    keywords.value = '';
    pageNum.value = 1;
  }
}
</script>

<template>
  <div>
    <div class="search-box">
      <input v-model="keywords">
      <span
        v-for="(item, key) in IconCollections"
        :key="key"
        :class="{ active: activeIcons === key }"
        @click="toggleIcons(key)"
      >{{ key }}</span>
    </div>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <Icon class="icon" :icon="`${baseIcons.prefix}:${item}`" size="30" />
        <span class="name">{{ item }}</span>
      </li>
    </ul>
    <div v-if="pages > 1" class="page-control">
      <button @click="onPrev">
        <Icon icon="ant-design:left-outlined" />
      </button>
      <div class="pages">
        <template v-for="(item, index) in pages" :key="index">
          <span
            v-if="range.includes(item)"
            :class="{
              active: item === pageNum,
            }"
            @click="onJump(item)"
          >{{ item }}</span>
        </template>
      </div>
      <button @click="onNext">
        <Icon icon="ant-design:right-outlined" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  ul {
    padding: 0;
    overflow: hidden;
    width: 700px;

    li {
      display: inline-flex;
      height: 80px;
      width: 140px;
      box-sizing: border-box;
      color: #000;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;
      overflow: hidden;
      justify-content: center;
      margin: 0;

      span.name {
        margin-top: 6px;
        display: block;
        width: 100%;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        padding: 0 10px;
        box-sizing: border-box;
      }

      &:hover {
        background: rgba(22, 119, 255, 0.8);
        color: #fff;
        border-radius: 8px;
      }
    }
  }

  .page-control {
    display: flex;
  }

  button {
    background: none;
    height: 30px;
    font-size: 12px;
    cursor: pointer;
    border: none;
    color: rgba(22, 119, 255, 1);

    &:hover {
      background: rgba(22, 119, 255, 0.8);
      color: #fff;
      border-radius: 8px;
    }
  }

  .search-box {
    span {
      margin-left: 10px;
      cursor: pointer;

      &.active {
        color: rgba(22, 119, 255, 0.8);
      }
    }
  }

  .pages {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 5px;
    user-select: none;

    span {
      height: 30px;
      width: 30px;
      display: inline-block;
      border: 1px solid #010;
      border-radius: 8px;
      box-sizing: border-box;
      color: #010;
      text-align: center;
      cursor: pointer;

      & + span {
        margin-left: 5px;
      }

      &.active {
        background: rgba(22, 119, 255, 0.8);
        color: #fff;
        border: 0;
      }
    }
  }

  //   -webkit-line-clamp: 3; // 用来限制在一个块元素显示的文本的行数
  // display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
  // -webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
  // text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
  // word-break: break-all;
  // overflow: hidden;
</style>
