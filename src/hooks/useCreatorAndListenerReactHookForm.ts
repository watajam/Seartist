import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../../lib/firebase';
import { useUpdateUserInfo } from '../../FireBase/Mutation/Update/useUpdateUserInfo';
import { UserData } from '../../types/UserData';

//各ユーザー情報を登録するformをReact Hook Formで作成
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
    [updateUserInfo, setError, url]
  );

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
