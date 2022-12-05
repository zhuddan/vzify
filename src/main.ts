import '@/style/index.scss';

import { registerGlobComp } from '@/components/registerGlobComp';
import router, { setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/setupRouterGuard';
import { setupStore } from '@/store';

import App from './App.vue';
import { registerPlugins } from './plugins';
import { initStore } from './store/initStore';

function __init__() {
  const app = createApp(App);
  // 注册 store
  setupStore(app);
  // 初始化 store
  initStore();
  // 注册路由
  setupRouter(app);
  // 路由拦截
  setupRouterGuard(router);
  // 全局组件
  registerGlobComp(app);
  // 插件
  registerPlugins(app);

  app.mount('#app');
}

__init__();
