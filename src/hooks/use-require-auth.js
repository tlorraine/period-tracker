import { useEffect } from 'react';
import { useAuth } from './use-auth.js';
import useRouter from './use-router.js';

const useRequireAuth = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === false) {
      router.push('/signin');
    }
  }, [auth, router]);

  return auth;
};

export default useRequireAuth;
