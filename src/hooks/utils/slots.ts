export function useSlotsVisible<S extends string = string>(...arg: S[]) {
  const slots = useSlots();

  type A = `${S}Visible`;

  type SlotVisible = {
    [key in A]: boolean;
  };

  const slotVisible = reactive({} as SlotVisible);

  watch(
    () => slots,
    () => {
      for (let index = 0; index < arg.length; index++) {
        const key = arg[index];
        slotVisible[`${key}Visible`] = Object.prototype.hasOwnProperty.call(slots, key) as any;
      }
    },
    {
      immediate: true,
    },
  );

  return {
    ...toRefs(slotVisible),
  };
}
