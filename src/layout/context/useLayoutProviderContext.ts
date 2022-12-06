import type { InjectionKey, Ref } from 'vue';

import { createContext, useContext } from '@/hooks/core/useContext';
import type { LocaleItem } from '@/plugins/vuetify/locale';

export interface LayoutProviderContextProps {
  isSidebarOpen: Ref<boolean>;
  locale: Ref<string>;
  locales: LocaleItem[];
}

const key: InjectionKey<LayoutProviderContextProps> = Symbol();

export function createLayoutProviderContext(context: LayoutProviderContextProps) {
  return createContext<LayoutProviderContextProps>(context, key, { native: true });
}

export function useLayoutProviderContext() {
  return useContext<LayoutProviderContextProps>(key);
}