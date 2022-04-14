import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { PostgrestError, PostgrestSingleSuccessResponse } from '../types';
import { Query } from '../query';
import useFetcher from './useFetcher';

const useSelectSingle = <Data>(
  query: Query<Data> | null, swrConfig: Omit<SWRConfiguration, 'fetcher'>,
): SWRResponse<PostgrestSingleSuccessResponse<Data>, PostgrestError> => {
  const fetcher = useFetcher<Data>('single');
  return useSWR(query, fetcher, swrConfig);
};

export default useSelectSingle;
