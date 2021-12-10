import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../../lib/firebase';
import { useUpdateUserInfo } from '../../FireBase/Mutation/Update/useUpdateUserInfo';
import { UserData } from '../../types/UserData';

export const useCreatorAndListenerReactHookForm = (url: string) => {
  const { updateUserInfo } = useUpdateUserInfo();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Pick<UserData, 'name' | 'userId' | 'genre' | 'location' | 'birthday'>>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data: Pick<UserData, 'name' | 'userId' | 'genre' | 'location' | 'birthday'>) => {
      updateUserInfo(data, setError, url);
    },
    [auth.currentUser?.email]
  );

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
