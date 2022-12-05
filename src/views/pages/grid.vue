<template>
  <div style="width: 100%">
    <div class="box">
      <div v-for="item in 4" :key="item" class="item grid_1" :class="`grid_${item}`">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .box {
    margin-top: 0;
    display: grid;
    width: 100%;
    border: 1px solid #cdcdcd;
    padding: 10px;
    grid-template-columns: 1fr 1fr minmax(300px, 1fr);
    grid-template-rows: 1fr 1fr;
    box-sizing: border-box;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-auto-rows: 100px;
    height: var(--app-content-inner-height);

    .item {
      font-size: 2em;
      text-align: center;
      color: aliceblue;
      background-color: var(--color-primary);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .grid_4 {
      grid-column-start: 1;
      grid-column-end: 3;
    }

    .grid_3 {
      grid-column-start: 3;
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
</style>
