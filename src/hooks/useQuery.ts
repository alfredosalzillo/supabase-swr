import { useMemo } from 'react';
import { createQuery, Query, QueryConfig } from '../query';

const useQuery = <Data>(
  table: string,
  config: QueryConfig<Data>,
  deps: any[],
): Query<Data> => useMemo(() => createQuery(table, config), deps);

export default useQuery;
