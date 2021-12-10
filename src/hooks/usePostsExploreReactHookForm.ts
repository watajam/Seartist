import { useRouter } from 'next/dist/client/router';
import { useForm } from 'react-hook-form';
import { PostDetailData } from '../../types/PostDetailData';

export const usePostsExploreReactHookForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<Pick<PostDetailData, 'location' | 'genre' | 'eventDate'>>({
    defaultValues: { location: '', genre: '', eventDate: '' },
  });

  const onSubmit = (data: Pick<PostDetailData, 'location' | 'genre' | 'eventDate'>) => {
    router.push({
      pathname: '/explore/posts',
      query: {
        genre: data.genre,
        location: data.location,
        eventDate: data.eventDate,
      },
    });
  };

  return { register, handleSubmit, onSubmit, dirtyFields };
};
