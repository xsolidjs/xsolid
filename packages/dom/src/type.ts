import { Stream } from 'xstream';
import { JSX } from './';

export interface Sink<T extends {}> {
  sources?: {
    [K in keyof T]: Stream<T[K]>;
  };
  render: (sources: T) => JSX.Element;
}

export interface FC<T extends {} = {}, P extends {} = {}> {
  (props$: Stream<P>): Sink<T>;
}

export type SFC<P = {}> = (props$?: Stream<P>) => JSX.Element;

export type StreamValue<V> = V extends Stream<infer T> ? T : never;