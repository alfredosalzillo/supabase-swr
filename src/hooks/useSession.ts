import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import useClient from './useClient';

const useSession = (): Session | null => {
  const client = useClient();
  const [session, setSession] = useState<Session>(client.auth.session());
  useEffect(() => {
    const {
      data: subscription,
    } = client.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession);
    });
    return () => subscription.unsubscribe();
  }, [setSession, client]);
  return session;
};

export default useSession;
