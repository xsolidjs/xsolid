export type RootFunction<T> = (dispose: () => void) => T;

/**
 * Creates a new non-tracked owner scope that doesn't auto-dispose
 *
 * @param fn a function in which the reactive state is scoped
 * @returns the output of `fn`.
 *
 * @description https://www.solidjs.com/docs/latest/api#createroot
 */
export const root = <T>(fn: RootFunction<T>): any => {
  return fn(() => { });
}
