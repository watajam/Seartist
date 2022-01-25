import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { auth } from '../../lib/firebase';
import { userEmailState } from '../../store/userEmailState';

//ログインしている人のメールアドレスをグローバルステートに持たせる
export const useRecoilSetEmail = () => {
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail({ email: user.email });
      } else {
        setUserEmail(null);
        router.push('/login');
      }
    });
  }, [router, setUserEmail]);
  return { userEmail };
};
