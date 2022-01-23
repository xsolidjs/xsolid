export type EffectFunction<Prev, Next extends Prev = Prev> = (v: Prev) => Next;

export interface EffectOptions {
  name?: string;
}

interface Effects {
  current: Symbol;
  fns: Map<
    Symbol,
    {
      current: any;
      effect: (current: any) => any;
    }[]
  >;
}

export const effects: Effects = {
  current: Symbol(),
  fns: new Map(),
};

export const effect = <Next, Init = Next>(
  fn: EffectFunction<Init | Next, Next>,
  current: Init,
  // options?: EffectOptions
): void => {
  effects.fns.get(effects.current)?.push({
    current: fn(current),
    effect: fn,
  });
}

