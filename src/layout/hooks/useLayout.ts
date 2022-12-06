import { useLayoutProviderContext } from '../context/useLayoutProviderContext';

export function useLayout() {
  const values = useLayoutProviderContext();
  const isSidebarOpen = computed({
    get() {
      return unref(values.isSidebarOpen);
    },
    set(val) {
      values.setIsSidebarOpen(val);
    },
  });
  return {
    isSidebarOpen,
  };
}