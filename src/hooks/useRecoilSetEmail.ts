import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { auth } from '../../lib/firebase';
import { userEmailState } from '../../store/userEmailState';

export const useRecoilSetEmail = () => {
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserEmail({ email: user.email });
      } else {
        setUserEmail(null);
        router.push('/login');
      }
    });
    return () => unsub();
  }, []);
  return { userEmail };
};
