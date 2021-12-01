import { useRouter } from 'next/dist/client/router';
import { useForm } from 'react-hook-form';
import { FormData } from '../../types/FormData';

export const useExploreConditionReactHookForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, },

  } = useForm<Pick<FormData, 'location' | 'genre' | 'eventDate'>>({
    defaultValues: {'location': '', 'genre': '', 'eventDate': ''},
  });

  const onSubmit = (data: FormData) => {
    router.push({
      pathname: '/explore/explorecondition',
      query: {
        genre: data.genre,
        location: data.location,
        eventDate: data.eventDate,
      },
    });
  };

  return { register, handleSubmit, onSubmit, dirtyFields };
};
