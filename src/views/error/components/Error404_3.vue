<template>
  <div class="container">
    <img src="@/assets/404/1.png" alt="">
    <div class="inner">
      <p>
        页面不见了！请检查你的网址是否正确，或者
        <router-link class="btn-primary" to="/">
          返回首页
        </router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
  .container {
    overflow: hidden;
    height: var(--app-content-inner-height);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    background: #002650;
    background: url('@/assets/404/1_bg.jpg') 100%;
  }

  img {
    position: absolute;
    top: 10px;
    width: 300px;
    left: 20px;
  }

  .inner {
    text-align: center;
    position: relative;
    color: #fff;
  }
</style>
