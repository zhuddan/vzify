import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';

import BlankView from '@/components/BlankView.vue';
import router from '@/router';
import { homeRoutes } from '@/router/routes/baseRoutes';
import { capitalize, handleTree } from '@/utils';

import type { PermissionState } from '../typings/permission';

const DETAIL_PATH = 'detail_';
interface RouteItem {
  path: string[];
  comp: CompPromFn;
}

interface AssembleRouteItem {
  signal: string;
  path: string;
  id: number;
  parentId: number;
  component: any;
  meta: {
    title: string;
    hidden?: boolean;
    active?: string;
  };
}

type CompPromFn = () => Promise<{
  [key: string]: any;
}>;

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
  }),
  actions: {
    async addSyncRoutes() {
      const object = await import.meta.glob('../../views/pages/**/*.vue');
      const t: RouteItem[] = [];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const path = key.replace('../../views/pages', '').replace('.vue', '');
          t.push({
            path: path.split('/').filter(e => !!e),
            comp: object[key] as any,
          });
        }
      }
      const asyncRoutes = getRouteTree(t) as unknown as RouteRecordRaw[];
      this.routes = [homeRoutes, ...asyncRoutes];
      asyncRoutes.forEach((e) => {
        router.addRoute(e);
      });
    },
  },
});

let id = 1;
function getRouteTree(list: RouteItem[]) {
  const assembleRouteList = handleAssembleRoute(list);
  const sortList = assembleRouteList.sort(
    (a, b) => Number(b.signal.endsWith('index')) - Number(a.signal.endsWith('index')),
  );
  return handleTree(sortList);
}

function handleAssembleRoute(routeItemList: RouteItem[]) {
  const assembleRouteList: AssembleRouteItem[] = [];
  routeItemList.forEach((e) => {
    const pathArr = e.path;
    for (let index = 0; index < pathArr.length; index++) {
      const realPath = pathArr[index];
      if (realPath) {
        const signal = pathArr.filter((e, i) => i <= index).join('/');
        if (!assembleRouteList.find(e => e.signal == signal)) {
          const pid = pathArr.filter((e, i) => i <= index - 1).join('/');
          const parentId = assembleRouteList.find(e => e.signal == pid)?.id || 0;
          const pathWithPrefix = `${parentId == 0 ? '/' : ''}${realPath}`;
          const component = index == pathArr.length - 1 ? e.comp : BlankView;
          // 处理 detail/:id
          const isDetailPath = pathWithPrefix.startsWith(DETAIL_PATH);
          const paramsKey = isDetailPath ? pathWithPrefix.split('_') && pathWithPrefix.split('_')[1] : '';
          const path = isDetailPath ? `detail/:${paramsKey}` : pathWithPrefix;
          const isHidden = isDetailPath;
          const _pathArr = [...pathArr];
          _pathArr.pop();
          const activePath = isDetailPath ? `/${_pathArr[0]}/index` : '';

          const result = {
            signal,
            id: id++,
            parentId,
            path,
            meta: {
              title: capitalize(realPath),
              hidden: isHidden,
              active: activePath,
            },
            component,
            name: signal.replace(/\_/g, ''),
          };
          assembleRouteList.push(result);
        }
      }
    }
  });
  return assembleRouteList;
}
