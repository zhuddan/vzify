<template>
  <div class="container">
    <video
      muted
      autoplay
      loop
      src="https://bnetcmsus-a.akamaihd.net/cms/gallery/c6/C6KLQ8BWWSKR1496179646097.webm"
    ></video>

    <div class="inner">
      <h2>404 - 找不到页面</h2>
      <p>
        我们已经派出一个救援鱼人把你送到 <router-link class="btn-primary" to="/">
          安全的地方
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
  }

  video {
    position: absolute;
    width: 60%;
    top: 0;
  }

  .inner {
    text-align: center;
    position: relative;
    color: #fff;
  }
</style>
