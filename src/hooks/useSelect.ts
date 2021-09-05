import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { PostgrestError, PostgrestSuccessResponse } from '../types';
import useFetcher from './useFetcher';
import { Query } from '../query';

const useSelect = <Data>(
  query: Query<Data>, swrConfig: Omit<SWRConfiguration, 'fetcher'>,
): SWRResponse<PostgrestSuccessResponse<Data>, PostgrestError> => {
  const fetcher = useFetcher<Data>('multiple');
  return useSWR(query, fetcher, swrConfig);
};

export default useSelect;
