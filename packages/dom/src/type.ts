import { Observable } from 'rxjs';
import { JSX } from './';

export interface Sink<T extends {}> {
  sources?: {
    [K in keyof T]: Observable<T[K]>;
  };
  render: (sources: T) => JSX.Element;
}

export interface FC<T extends {} = {}, P extends {} = {}> {
  (props$: Observable<P>): Sink<T>;
}

export type SFC<P = {}> = (props$?: Observable<P>) => JSX.Element;

export type ObservableValue<V> = V extends Observable<infer T> ? T : never;