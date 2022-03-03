import { Query, QueryConfig } from '../query';
declare const useQuery: <Data>(table: string, config: QueryConfig<Data>, deps: any[]) => Query<Data>;
export default useQuery;
