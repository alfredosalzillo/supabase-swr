import { Count, Filter } from './types';

export type SelectKeyConfig<Data> = {
  columns?: string,
  filter?: Filter<Data>,
  count?: Count,
  head?: boolean,
};
export type SelectKey<Data> = [string, SelectKeyConfig<Data>];
export const createSelectKey = <Data>(
  table: string,
  config: SelectKeyConfig<Data>,
): SelectKey<Data> => [table, config];
