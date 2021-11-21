import { signOut } from '@firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../lib/firebase';

export const useAuthLogout = () => {
  const router = useRouter();
  
  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push('/login');
      })
      .catch(() => {
        alert('ログアウトできません。');
      });
  };
  return { logout };
};
