import { useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useForm } from 'react-hook-form';
import { FormData } from '../../types/FormData';

export const useReactHookForm = (url: string) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<FormData, 'search' | 'location' | 'genre' | 'eventDate'>>({
    mode: 'onChange',
  });

  const onSubmit = useCallback((data: FormData) => {
    router.push(url);
  }, []);

  return { register, handleSubmit, errors, onSubmit };
};
