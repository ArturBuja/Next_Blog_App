import { app } from '@/utils/firebase';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const auth = getAuth(app);

export const useFirebaseSession = () => {
  const { data, status: sessionStatus } = useSession();
  const [status, setStatus] = useState(sessionStatus);

  useEffect(() => {
    if (sessionStatus === 'authenticated' && data.accessToken) {
      signInWithCustomToken(auth, data.accessToken).then(() => {
        setStatus('authenticated');
      });
    }
  }, [sessionStatus, data.accessToken]);

  useEffect(() => {
    if (sessionStatus !== 'authenticated') {
      setStatus(sessionStatus);
    }
  }, [sessionStatus]);

  return { data: data, status };
};
