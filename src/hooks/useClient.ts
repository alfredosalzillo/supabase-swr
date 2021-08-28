import { SupabaseClient } from '@supabase/supabase-js';
import { useContext } from 'react';
import Context from '../context';

const useClient = (): SupabaseClient => {
  const client = useContext(Context);
  if (!client) throw new Error('supabase client instance required');
  return client;
};

export default useClient;
