import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { PostgrestError, PostgrestSuccessResponse } from '../types';
import useFetcher from './useFetcher';
import { Query } from '../query';

const useSelectMaybeSingle = <Data>(
  query: Query<Data> | null, swrConfig: Omit<SWRConfiguration, 'fetcher'>,
): SWRResponse<PostgrestSuccessResponse<Data>, PostgrestError> => {
  const fetcher = useFetcher<Data>('maybeSingle');
  return useSWR(query, fetcher, swrConfig);
};

export default useSelectMaybeSingle;
