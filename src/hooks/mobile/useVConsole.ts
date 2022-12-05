import { useScriptTag } from '@vueuse/core';

const VConsoleSrc = 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.14.6/vconsole.min.js';

declare const VConsole: any;

export function useVConsole() {
  useScriptTag(VConsoleSrc, () => {
    new VConsole({ theme: 'dark' });
  });
}
