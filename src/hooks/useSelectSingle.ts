import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { PostgrestError, PostgrestSingleSuccessResponse } from '../types';
import { SelectKey } from '../select-key';
import useFetcher from './useFetcher';

const useSelectSingle = <Data>(
  key: SelectKey<Data>, swrConfig: Omit<SWRConfiguration, 'fetcher'>,
): SWRResponse<PostgrestSingleSuccessResponse<Data>, PostgrestError> => {
  const fetcher = useFetcher<Data>('single');
  return useSWR(key, fetcher, swrConfig);
};

export default useSelectSingle;
