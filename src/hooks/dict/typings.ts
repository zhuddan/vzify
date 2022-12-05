import type { ComputedRef, Ref } from 'vue';

import type { Dict } from './dict';

export type DictTypes =
  | 'sys_user_sex' // 用户性别
  | 'sys_show_hide' // 菜单状态
  | 'sys_normal_disable' // 系统开关
  | 'sys_job_status' // 任务状态
  | 'sys_job_group' // 任务分组
  | 'sys_yes_no' // 系统是否
  | 'sys_notice_type' // 通知类型
  | 'sys_notice_status' // 通知状态
  | 'sys_oper_type' // 操作类型
  | 'sys_common_status'; // 系统状态

export interface _OriginDictData {
  id: string;
  dictValue: string;
  value: string;
  // other value
  code: string;
  key: string;

  dictLabel: string;
  label: string;
  // other label
  name: string;
  title: string;

  listClass: string;
}
export type OriginDictData = Partial<_OriginDictData>;

export type DictDataKey = Array<keyof OriginDictData>;

export interface DictData {
  value: string;
  label: string;
  raw: Partial<OriginDictData>;
}

export type DictMap<T extends string, P> = {
  [key in T]: P;
};

export type DictValues<T extends DictTypes> = DictMap<T, DictData[]>;

export type DictStatus = 'pending' | 'fulfilled' | 'rejected';

export interface FormatDictOptions {
  // 分割符号
  // 分割符号
  separator: string;
  // 是否显示原始数据
  primitive: boolean;
}

export interface DictOptions {
  // 懒加载
  // 懒加载
  isLazy: boolean;
  // 字典label字段
  // 字典label字段
  labelFields: DictDataKey;
  // 字典value字段
  // 字典value字段
  valueFields: DictDataKey;
  // 重试次数
  // 重试次数
  retryTime: number;
  // 重试延迟
  // 重试延迟
  retryTimeout: number;
}

export interface BaseDictsReturn<DK extends DictTypes = DictTypes> {
  dict: Dict<DK>;
  format: {
    (dictKey: OriginDictData[] | DK, values: string[] | string): string;
    (
      dictKey: OriginDictData[] | DK,
      values: string | string[],
      options: {
        separator?: string;
      },
    ): string;
    (
      dictKey: OriginDictData[],
      values: string,
      options: {
        separator?: string;
        primitive: true;
      },
    ): DictData;
    (
      dictKey: DK,
      values: string,
      options: {
        separator?: string;
        primitive: true;
      },
    ): DictData;
    (
      dictKey: OriginDictData[],
      values: string[],
      options: {
        separator?: string;
        primitive: true;
      },
    ): DictData[];
    (
      dictKey: DK,
      values: string[],
      options: {
        separator?: string;
        primitive: true;
      },
    ): DictData[];
    (
      dictKey: OriginDictData[],
      values: string,
      options: {
        primitive: true;
      },
    ): DictData;
    (
      dictKey: DK,
      values: string,
      options: {
        primitive: true;
      },
    ): DictData;
    (
      dictKey: OriginDictData[],
      values: string[],
      options: {
        primitive: true;
      },
    ): DictData[];
    (
      dictKey: DK,
      values: string[],
      options: {
        primitive: true;
      },
    ): DictData[];
  };
  load: {
    (): Promise<DictData[][]>;
    (dictKey: DK): Promise<DictData[]>;
  };
  dicts: ComputedRef<DictValues<DK>>;
}
type DictRef<DK extends DictTypes = DictTypes> = DictMap<DK, Ref<DictData[]>>;
export type WithBaseDictReturn<DK extends DictTypes = DictTypes> = DictRef<DK> & BaseDictsReturn<DK>;
