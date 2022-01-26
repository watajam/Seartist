import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { auth } from '../../lib/firebase';

type ResetFormData = {
  email: string;
};

//パスワードリセット
export const useAuthResetPassword = () => {
  const router = useRouter();
  const resetPassword = async (data: ResetFormData) => {
    auth.languageCode = 'ja';
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        toast.success('パスワードリセットメールを送信しました。');
        router.push(`/login`);
      })
      .catch(() => {
        toast.error('パスワードリセットメールの送信に失敗しました。');
      });
  };

  return resetPassword;
};
