import { Dict } from './dict';
import type {
  DictData,
  DictOptions,
  DictTypes,
  DictValues,
  FormatDictOptions,
  OriginDictData,
  WithBaseDictReturn,
} from './typings';

export function useDicts<DK extends DictTypes = DictTypes>(keys: DK[], options?: Partial<DictOptions>) {
  const dict = new Dict(keys, options);
  function format(
    dictKey: OriginDictData[] | DK,
    values: string[] | string,
    options?: Partial<FormatDictOptions>,
  ) {
    const data = dict.format.call(dict, dictKey, values, options);
    if (options?.primitive) {
      if (dictKey instanceof Array) {
        if (values instanceof Array)
          return data as unknown as OriginDictData[];

        return data as unknown as OriginDictData;
      }
      else {
        if (values instanceof Array)
          return data as unknown as DictData[];

        return data as unknown as DictData;
      }
    }
    return data;
  }

  function load(dictKey?: DK) {
    return dict.load.call(dict, dictKey!);
  }

  const dicts = computed<DictValues<DK>>(() => {
    return dict.data;
  });

  return {
    dict,
    dicts,
    format,
    load,
    ...toRefs(dict.data),
  } as unknown as WithBaseDictReturn<DK>;
}
