import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { PostgrestError, PostgrestSuccessResponse } from '../types';
import useFetcher from './useFetcher';
import { SelectKey } from '../select-key';

const useSelect = <Data>(
  key: SelectKey<Data>, swrConfig: Omit<SWRConfiguration, 'fetcher'>,
): SWRResponse<PostgrestSuccessResponse<Data>, PostgrestError> => {
  const fetcher = useFetcher<Data>('multiple');
  return useSWR(key, fetcher, swrConfig);
};

export default useSelect;
