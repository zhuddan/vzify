import { defHttp } from '@/utils/http';
import { isArray, isString } from '@/utils/is';

import type {
  DictData,
  DictDataKey,
  DictMap,
  DictOptions,
  DictStatus,
  DictTypes,
  DictValues,
  FormatDictOptions,
  OriginDictData,
} from './typings';

// 根据字典类型查询字典数据信息
export function getDicts(dictType: DictTypes) {
  return new Promise<ResponseData<OriginDictData[]>>((resolve, reject) => {
    defHttp
      .get<ResponseData<OriginDictData[]>>({
        url: `/system/dict/data/type/${dictType}`,
      })
      .then((res) => {
        if (!res.data) {
          reject(
            `[Dictionary error] Get dictionary data \`${dictType}\` with null.Please check your dictionary key with \`${dictType}\`.`,
          );
        }
        else {
          resolve(res);
        }
      });
  });
}
const DEFAULT_LABEL_FIELDS: DictDataKey = ['label', 'dictLabel', 'name', 'title'];
const DEFAULT_VALUE_FIELDS: DictDataKey = ['value', 'dictValue', 'code', 'key'];
const STATUS_FULFILLED = 'fulfilled';
const STATUS_REJECTED = 'rejected';
const STATUS_PENDING = 'pending';
const defaultFormatOptions: FormatDictOptions = {
  separator: '/',
  primitive: false,
};

export class BaseDict {
  options: DictOptions = {
    isLazy: false,
    labelFields: DEFAULT_LABEL_FIELDS,
    valueFields: DEFAULT_VALUE_FIELDS,
    retryTime: 1,
    retryTimeout: 1 * 1000,
  };

  get labelFields() {
    return Array.from(new Set(this.options.labelFields));
  }

  get valueFields() {
    return Array.from(new Set(this.options.valueFields));
  }

  constructor(options?: Partial<DictOptions>) {
    this.options = Object.assign({}, this.options, options || {});
  }
}

export class Dict<DK extends DictTypes = DictTypes> extends BaseDict {
  keys: DK[] = [];

  dictMeta = {} as DictMap<DK, DictMeta>;

  _status = computed<DictStatus>(() => {
    if (!this.keys.length)
      return STATUS_FULFILLED;

    if (this.keys.every(e => this.dictMeta[e].status == STATUS_FULFILLED))
      return STATUS_FULFILLED;

    if (this.keys.some(e => this.dictMeta[e].status == STATUS_REJECTED))
      return STATUS_REJECTED;

    return STATUS_PENDING;
  });

  get status() {
    return this._status.value;
  }

  private _data = reactive<DictValues<DK>>({} as DictValues<DK>);

  get data() {
    for (const _key in this.dictMeta) {
      const key = _key as DK;
      if (Object.prototype.hasOwnProperty.call(this.dictMeta, key)) {
        const element = this.dictMeta[key];
        this._data[key] = element.primitiveData as any;
      }
    }
    return this._data as DictValues<DK>;
  }

  constructor(keys: DK[], options?: Partial<DictOptions>) {
    super(options);
    this.keys = keys;
    this.init();
  }

  private init() {
    for (let index = 0; index < this.keys.length; index++) {
      const key = this.keys[index];
      this.dictMeta[key] = new DictMeta(key, this.options);
    }
  }

  load(): Promise<DictData[][]>;
  load(dictKey: DK): Promise<DictData[]>;
  load(dictKey?: DK): Promise<DictData[] | DictData[][]> {
    return new Promise(async (resolve) => {
      if (dictKey) {
        const data = await this.dictMeta[dictKey].load();
        resolve(data);
        return;
      }
      Promise.all(this.keys.map(e => this.dictMeta[e].load())).then((res) => {
        resolve(res);
      });
    });
  }

  format(dictKey: OriginDictData[] | DK, values: string[] | string, options?: Partial<FormatDictOptions>) {
    const res = computed(() => {
      if (values == undefined || values == null) return '';
      if (isString(dictKey))
        return this.formatByDictKey(dictKey, values, options);

      return this.formatByDictData(unref(dictKey), values, options);
    });
    return unref(res);
  }

  private formatByDictKey(dictKey: DK, values: string[] | string, options?: Partial<FormatDictOptions>) {
    if (this.dictMeta[dictKey].status != STATUS_FULFILLED)
      return '';

    const data = this.data[dictKey];
    return this.handleFormat(data, values, options);
  }

  private formatByDictData(
    data: OriginDictData[],
    values: string[] | string,
    options?: Partial<FormatDictOptions>,
  ) {
    return this.handleFormat(data, values, options);
  }

  private handleFormat(
    data: Array<OriginDictData | DictData>,
    values: string[] | string,
    options?: Partial<FormatDictOptions>,
  ) {
    const opt = Object.assign({}, defaultFormatOptions, options || {});
    if (isArray(values))
      return values.map(e => this.formatValue(data, e, opt)).join(opt.separator);
    else
      return this.formatValue(data, values, opt);
  }

  private formatValue(data: Array<OriginDictData | DictData>, value: string, options: FormatDictOptions) {
    const res = data.find(e => e[getDictField(e, ...this.valueFields)] == value) || {};
    if (!res) {
      console.warn(`[Dict format warning]: Can not find the dictionary with value ${value} in data: `, data);
      return '';
    }
    if (options.primitive)
      return res;

    return res?.[getDictField(res, ...this.labelFields)];
  }
}

class DictMeta extends BaseDict {
  name;
  constructor(name: DictTypes, options?: Partial<DictOptions>) {
    super(options);
    this.name = name;
    this.init();
  }

  private init() {
    if (!this.options.isLazy)
      this.load();
  }

  async load() {
    this.data = await this.requestDicts();
    return this.data;
  }

  _status = ref<DictStatus>(STATUS_PENDING);

  time = 0;

  set status(data: DictStatus) {
    this._status.value = data;
  }

  get status() {
    return this._status.value;
  }

  _data = ref<DictData[]>([]);

  set data(data: DictData[]) {
    this._data.value = data;
  }

  get data() {
    return this._data.value;
  }

  get primitiveData() {
    return this._data;
  }

  private requestDicts(): Promise<DictData[]> {
    this.status = STATUS_PENDING;
    this.time++;
    return new Promise((resolve, reject) => {
      return getDicts(this.name)
        .then((res) => {
          this.status = STATUS_FULFILLED;
          return compileDict(res.data, this.labelFields, this.valueFields);
        })
        .then((dictData) => {
          resolve(dictData);
        })
        .then(() => {
          this.time = 0;
        })
        .catch((e) => {
          console.error(
            `[Dictionary error] Request dictionary data \`${this.name}\` failed for the \`${this.time}\` times.`,
          );
          if (this.time >= this.options.retryTime) {
            console.error(
              `[Dict error] Attempt to repeat the request for dictionary data \`${this.name}\` for the ${this.time} times failed. Request has been abandoned.`,
            );
            this.status = STATUS_REJECTED;
            reject(e);
            return;
          }
          const t = setTimeout(() => {
            clearTimeout(t);
            this.requestDicts()
              .then(res => resolve(res))
              .catch(e => reject(e));
          }, this.options.retryTimeout);
        });
    });
  }
}

function compileDict(list: OriginDictData[], labelFields: DictDataKey, valueFields: DictDataKey): DictData[] {
  return list.map(e => convertDict(e, labelFields, valueFields));
}

function convertDict(data: OriginDictData, labelFields: DictDataKey, valueFields: DictDataKey) {
  const res = { raw: data } as unknown as DictData;
  const labelField = getDictField(data, ...labelFields);
  const valueField = getDictField(data, ...valueFields);
  res.label = data[labelField] as string;
  res.value = data[valueField] as string;
  return res;
}

function getDictField(dict: Partial<OriginDictData>, ...fields: Array<keyof OriginDictData>) {
  const res = fields.find(f => Object.prototype.hasOwnProperty.call(dict, f)) as keyof OriginDictData;
  if (!res)
    console.warn(`[Dict get field error]: Object cannot find key \`${fields.join(',')}\` in `, dict);

  return res;
}
