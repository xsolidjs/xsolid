import { of } from 'rxjs';
import { JSX, FC } from './';
import { effects } from './effect';

export const createComponent = <T, P>(Comp: FC<T, P>, props: P): JSX.Element => {
  const comp = Comp(of(props));
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

    sourceKeys.forEach(key => {
      sources[key]?.subscribe((v: any) => {
        sinks[key] = v;
        effects.fns.get(sym)?.forEach((ef) => {
          ef.current = ef.effect(ef.current);
        });
      });
    });
    // TODO：effect 批量更新
  };

  const dom = render(sinks);

  effects.current = beforeSym;
  return dom;
}
