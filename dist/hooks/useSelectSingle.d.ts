import { SWRConfiguration, SWRResponse } from 'swr';
import { PostgrestError, PostgrestSingleSuccessResponse } from '../types';
import { Query } from '../query';
declare const useSelectSingle: <Data>(query: Query<Data>, swrConfig: Omit<SWRConfiguration, 'fetcher'>) => SWRResponse<PostgrestSingleSuccessResponse<Data>, PostgrestError>;
export default useSelectSingle;
