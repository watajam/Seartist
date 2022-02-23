import useSWR from 'swr';
import { PostDetailData } from '../../types/PostDetailData';
import { UserData } from '../../types/UserData';

type PostByUser = PostDetailData & Pick<UserData, 'name' | 'profilePhoto' | 'email'>;

export const useFetch = (url: (string | string[])[] | string, func) => {
  const { data, error } = useSWR<PostByUser>(url, func);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};
