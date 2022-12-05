import type { App, Component, Plugin } from 'vue';

import { isObject } from './is';
/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj)
    parameters += `${key}=${encodeURIComponent(obj[key])}&`;

  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target)
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);

  return src as T;
}

export const withInstall = <T extends Component>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias)
      app.config.globalProperties[alias] = component;
  };
  return component as T & Plugin;
};

// string
/**
 *
 * @param str
 * @param strict 严格模式
 * eg:
 *  capitalize('userName', true) ==> Username
 *  capitalize('userName', false) ==> UserName
 * @returns
 */
export function capitalize(str: string, strict = true) {
  const str1 = str.slice(0, 1).toUpperCase();
  const str2 = str.slice(1);
  return `${str1}${strict ? str2.toLocaleLowerCase() : str2}`;
}

export function sleep(t = 1000) {
  return new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, t);
  });
}

export const createUuid = () => {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url); // 释放这个url
  return uuid.substring(uuid.lastIndexOf('/') + 1);
};

export function handleTree<T>(
  data: T[],
  option?: Partial<{
    id: string;
    parentId: string;
    children: string;
  }>,
): TreeList<T> {
  const ID_KEY = option?.id || 'id';
  const PARENT_ID_KEY = option?.parentId || 'parentId';
  const CHILDREN_KEY = option?.children || 'children';

  const childrenListMap = {};
  const nodeIds = {};
  const tree = [];

  for (const d of data) {
    const parentId = d[PARENT_ID_KEY];
    if (childrenListMap[parentId] == null)
      childrenListMap[parentId] = [];

    nodeIds[d[ID_KEY]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    const parentId = d[PARENT_ID_KEY];
    if (nodeIds[parentId] == null)
      tree.push(d);
  }

  for (const t of tree)
    adaptToChildrenList(t);

  function adaptToChildrenList(o: T) {
    if (childrenListMap[o[ID_KEY]]) {
      const key = CHILDREN_KEY;
      o[key] = childrenListMap[o[ID_KEY]];
    }
    if (o[CHILDREN_KEY]) {
      for (const c of o[CHILDREN_KEY])
        adaptToChildrenList(c);
    }
  }
  return tree as TreeList<T>;
}
