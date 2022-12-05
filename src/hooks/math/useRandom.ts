export function useRandom(end?: number): number;
export function useRandom(end?: number, start?: number): number;
export function useRandom<T>(data?: T[]): T;
export function useRandom<T>(numberOrArray?: number | T[], start?: number) {
  if (numberOrArray instanceof Array) {
    const length = numberOrArray.length;
    return numberOrArray[Math.floor(Math.random() * length)];
  }
  const diff = (numberOrArray || 1) - (start || 0);
  return Math.random() * diff;
}