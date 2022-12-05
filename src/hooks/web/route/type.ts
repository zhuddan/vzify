import type { Ref } from 'vue';

type MaybeRef<T> = Ref<T> | T;
export interface ReactiveRouteOptions {
  mode?: MaybeRef<'replace' | 'push'>;
  route?: ReturnType<typeof useRoute>;
  router?: ReturnType<typeof useRouter>;
}
