import type { InjectionKey, Ref } from 'vue';

import { createContext, useContext } from '@/hooks/core/useContext';
import type { LocaleItem } from '@/plugins/vuetify/locale';
import type { Theme } from '@/plugins/vuetify/typing';

export interface AppProviderContextProps {
  locale: Ref<string>;
  readonly locales: LocaleItem[];
  theme: Ref<Theme>;
  isSidebarOpen: Ref<boolean>;
}

const key: InjectionKey<AppProviderContextProps> = Symbol();

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key, { native: true });
}

export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key);
}