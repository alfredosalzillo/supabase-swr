import { SWRConfiguration, SWRResponse } from 'swr';
import { PostgrestError, PostgrestSuccessResponse } from '../types';
import { Query } from '../query';
declare const useSelect: <Data>(query: Query<Data>, swrConfig: Omit<SWRConfiguration, 'fetcher'>) => SWRResponse<PostgrestSuccessResponse<Data>, PostgrestError>;
export default useSelect;
