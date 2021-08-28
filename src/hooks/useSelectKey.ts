import { useMemo } from 'react';
import { createSelectKey, SelectKey, SelectKeyConfig } from '../select-key';

const useSelectKey = <Data>(
  table: string,
  config: SelectKeyConfig<Data>,
  deps: any[],
): SelectKey<Data> => useMemo(() => createSelectKey(table, config), deps);

export default useSelectKey;
