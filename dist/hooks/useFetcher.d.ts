import { PostgrestSingleSuccessResponse, PostgrestSuccessResponse } from '../types';
import { QueryConfig } from '../query';
export declare type Fetcher<Data> = (table: string, config: QueryConfig<Data>) => Promise<PostgrestSuccessResponse<Data>>;
export declare type FetcherSingle<Data> = (table: string, config: QueryConfig<Data>) => Promise<PostgrestSingleSuccessResponse<Data>>;
declare function useFetcher<Data>(type: 'multiple'): Fetcher<Data>;
declare function useFetcher<Data>(type: 'single'): FetcherSingle<Data>;
declare function useFetcher<Data>(type: 'maybeSingle'): FetcherSingle<Data | null>;
declare function useFetcher(type: 'csv'): FetcherSingle<string>;
export default useFetcher;
