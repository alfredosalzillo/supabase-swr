import { Count, Filter } from './types';
export declare type QueryConfig<Data> = {
    columns?: string;
    filter?: Filter<Data>;
    count?: Count;
    head?: boolean;
};
export declare type Query<Data> = [string, QueryConfig<Data>];
export declare const createQuery: <Data>(table: string, config: QueryConfig<Data>) => Query<Data>;
