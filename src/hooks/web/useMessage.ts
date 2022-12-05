export function useMessage() {
  return {
    // just test, you can configure  yourself msg
    msgError: (msg: string) => {
      alert(msg);
    },
    modalError: (msg: string) => {
      alert(msg);
    },
  };
}
