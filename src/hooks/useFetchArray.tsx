import useSWR, { Fetcher } from 'swr';
import { PostData } from '../../types/PostData';
import { UserData } from '../../types/UserData';

type PostsByUsers = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

export const useFetchArray = (url: string, func) => {
  const { data, error } = useSWR<PostsByUsers[]>(url, func);

  return {
    data,
    error,
    isLoading: !data && !error,
    isEmpty: data && data.length === 0,
  };
};
