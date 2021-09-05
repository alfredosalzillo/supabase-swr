import { Count, Filter } from './types';

export type QueryConfig<Data> = {
  columns?: string,
  filter?: Filter<Data>,
  count?: Count,
  head?: boolean,
};
export type Query<Data> = [string, QueryConfig<Data>];
export const createQuery = <Data>(
  table: string,
  config: QueryConfig<Data>,
): Query<Data> => [table, config];
