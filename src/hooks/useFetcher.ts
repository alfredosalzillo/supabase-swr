import { useMemo } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { PostgrestSingleSuccessResponse, PostgrestSuccessResponse } from '../types';
import useClient from './useClient';
import { SelectKeyConfig } from '../select-key';

export type Fetcher<Data> = (
  table: string,
  config: SelectKeyConfig<Data>,
) => Promise<PostgrestSuccessResponse<Data>>;
export type FetcherSingle<Data> = (
  table: string,
  config: SelectKeyConfig<Data>,
) => Promise<PostgrestSingleSuccessResponse<Data>>;

type FetcherType = 'multiple' | 'single' | 'maybeSingle' | 'csv';

function createFetcher<Data>(client: SupabaseClient, type: 'multiple'): Fetcher<Data>;
function createFetcher<Data>(client: SupabaseClient, type: 'single'): FetcherSingle<Data>;
function createFetcher<Data>(client: SupabaseClient, type: 'maybeSingle'): FetcherSingle<Data | null>;
function createFetcher(client: SupabaseClient, type: 'csv'): FetcherSingle<string>;
function createFetcher(client: SupabaseClient, type: FetcherType) {
  return async (
    table: string, config: SelectKeyConfig<any>,
  ) => {
    const select = client.from(table).select(config.columns, {
      count: config.count,
      head: config.head,
    });
    const hasFilter = typeof config.filter === 'function';
    const query = hasFilter ? config.filter(select) : select;
    switch (type) {
      default:
      case 'multiple':
        return query.throwOnError();
      case 'single':
        // @ts-ignore
        return query.throwOnError().single();
      case 'maybeSingle':
        // @ts-ignore
        return query.throwOnError().maybeSigle();
      case 'csv':
        // @ts-ignore
        return query.throwOnError().csv();
    }
  };
}

function useFetcher<Data>(type: 'multiple'): Fetcher<Data>;
function useFetcher<Data>(type: 'single'): FetcherSingle<Data>;
function useFetcher<Data>(type: 'maybeSingle'): FetcherSingle<Data | null>;
function useFetcher(type: 'csv'): FetcherSingle<string>;
function useFetcher(type: FetcherType) {
  const client = useClient();
  return useMemo(() => createFetcher(client, type as any), [client, type]) as any;
}

export default useFetcher;
