import { useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from '@firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { FormData } from '../../types/FormData';

export const useUrlReactHookForm = (url: string) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<FormData, 'twitterUrl' | 'instagramUrl' | 'homepageUrl' | 'otherUrl'>>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(async (data: FormData) => {
    await updateDoc(doc(db, 'users', auth.currentUser.email), {
      twitterUrl: data.twitterUrl,
      instagramUrl: data.instagramUrl,
      homepageUrl: data.homepageUrl,
      otherUrl: data.otherUrl,
    });
    router.push(url);
  }, []);

  return { register, handleSubmit, errors, onSubmit };
};
