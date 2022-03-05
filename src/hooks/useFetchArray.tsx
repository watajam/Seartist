import useSWR from 'swr';
import { PostData } from '../../types/PostData';
import { UserData } from '../../types/UserData';

type PostsByUsers = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

export const useFetchArray = (url: string | (string | string[])[], func, option?) => {
  const { data, error } = useSWR<PostsByUsers[]>(url, func, option);

  return {
    data,
    error,
    isLoading: !data && !error,
    isEmpty: data && data.length === 0,
  };
};
