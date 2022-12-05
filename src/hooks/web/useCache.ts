import { CacheEnums } from '@/enums/cacheEnum';
import { isNumber, isObject } from '@/utils/is';

import { name as projectName, version as projectVersion } from '../../../package.json';

type _CacheEnums = typeof CacheEnums;

export type CacheEnumsKey = keyof _CacheEnums;

interface WebCacheTime {
  day?: number;
  hour?: number;
  minutes?: number;
  second?: number;
}

interface WebCacheData {
  value: any;
  expires: number;
}

class WebCache {
  defaultExpires = 864e5 * 7;

  get VALUE_PREFIX() {
    return `${projectName}_${projectVersion}_`;
  }

  assembleKey(key: CacheEnumsKey) {
    return `${this.VALUE_PREFIX}${CacheEnums[key]}`;
  }

  formatKey(key: string): string {
    if (key.indexOf(this.VALUE_PREFIX) == 0)
      return key.replace(this.VALUE_PREFIX, '') as CacheEnumsKey;

    return key;
  }

  constructor(time?: number | WebCacheTime) {
    if (!time) return;
    const t = isObject(time) ? this.formatTime(time) : time;
    this.defaultExpires = t;
  }

  formatTime(data: Partial<WebCacheTime> | number): number {
    if (isNumber(data))
      return data;

    const { day, hour, minutes, second } = data;
    const dataDay = (day ? day * 24 : 0) * 864e2;// 秒
    const dataHours = (hour || 0) * 60 * 60;// 秒
    const dataMinutes = (minutes || 0) * 60;// 秒
    const dataSeconds = (second || 0) * 60;// 秒
    return (dataDay + dataHours + dataMinutes + dataSeconds) * 1000;
  }

  getExpires(time?: Partial<WebCacheTime> | number): number {
    let expires = this.defaultExpires;
    if (time == -1)
      expires = Number.MAX_SAFE_INTEGER;

    else if (time || isObject(time))
      expires = this.formatTime(time);

    return new Date().getTime() + expires;
  }

  stringifyJson(data: any): string {
    try {
      return JSON.stringify(data);
    }
    catch (error) {
      throw new Error(error as any);
    }
  }

  parseJson(data: string): object {
    try {
      return JSON.parse(data);
    }
    catch (error) {
      throw new Error(error as any);
    }
  }

  set(key: CacheEnumsKey, value: any, options?: Partial<WebCacheTime> | number) {
    const _key = this.assembleKey(key);
    const data = this.stringifyJson({
      value,
      expires: this.getExpires(options),
    });
    localStorage.setItem(_key, data);
  }

  get(key: CacheEnumsKey) {
    const _key = this.assembleKey(key);
    const res = localStorage.getItem(_key);
    if (!res) return null;
    const { expires, value } = this.parseJson(res) as WebCacheData;
    const now = Date.now();
    if (expires < now) {
      this.remove(key);
      return null;
    }
    return value;
  }

  remove(key: CacheEnumsKey) {
    const _key = this.assembleKey(key);
    localStorage.removeItem(_key);
  }

  clear() {
    localStorage.clear();
  }
}

const webCache = new WebCache();

export function useCache() {
  return webCache;
}
