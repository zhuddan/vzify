import type { InjectionKey, Ref } from 'vue';

import { createContext, useContext } from '@/hooks/core/useContext';

export interface LayoutProviderContextProps {
  isSidebarOpen: Ref<boolean>;
  setIsSidebarOpen(open: boolean): void;
}

const key: InjectionKey<LayoutProviderContextProps> = Symbol();

export function createLayoutProviderContext(context: LayoutProviderContextProps) {
  return createContext<LayoutProviderContextProps>(context, key);
}

export function useLayoutProviderContext() {
  return useContext<LayoutProviderContextProps>(key);
}