import { JSX, FC } from './';
import xs from 'xstream';
import { effects } from './effect';

export const createComponent = <T, P>(Comp: FC<T, P>, props: P): JSX.Element => {
  const comp = Comp(xs.of(props));
  const { sources, render } = comp;

  const beforeSym = effects.current;
  const sym = Symbol();
  effects.current = sym;
  effects.fns.set(sym, []);

  let sinks: {
    [K in keyof T]: any
  } = {} as any;

  if (sources) {
    const sourceKeys = Object.keys(sources);
    const sourceStreams = sourceKeys.map(key => sources[key]);

    xs.combine(...sourceStreams).addListener({
      next: (value) => {
        sinks = value.reduce<any>((prev: any, cur, i) => {
          prev[sourceKeys[i]] = cur;
          return prev;
        }, sinks);

        effects.fns.get(sym)?.forEach((ef) => {
          ef.current = ef.effect(ef.current);
        });
      }
    });
  };

  const dom = render(sinks);

  effects.current = beforeSym;
  return dom;
}
