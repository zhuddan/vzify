import type { InjectionKey, Ref } from 'vue';

import { createContext, useContext } from '@/hooks/core/useContext';
import type { LocaleItem } from '@/plugins/vuetify/locale';

export interface LayoutProviderContextProps {
  locale: Ref<string>;
  locales: LocaleItem[];
  isSidebarOpen: Ref<boolean>;
  theme: Ref<'light' | 'dark'>;
}

const key: InjectionKey<LayoutProviderContextProps> = Symbol();

export function createLayoutProviderContext(context: LayoutProviderContextProps) {
  return createContext<LayoutProviderContextProps>(context, key, { native: true });
}

export function useLayoutProviderContext() {
  return useContext<LayoutProviderContextProps>(key);
}