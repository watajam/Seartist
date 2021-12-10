import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUserUrlInfo } from '../../FireBase/Mutation/Update/useUpdateUserUrlInfo';
import { UserData } from '../../types/UserData';

export const useUrlReactHookForm = (url: string) => {
  const { updateUserUrlInfo } = useUpdateUserUrlInfo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<UserData, 'twitterUrl' | 'instagramUrl' | 'homepageUrl' | 'otherUrl'>>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data: Pick<UserData, 'twitterUrl' | 'instagramUrl' | 'homepageUrl' | 'otherUrl'>) => {
      updateUserUrlInfo(data, url);
    },
    []
  );

  return { register, handleSubmit, errors, onSubmit };
};
