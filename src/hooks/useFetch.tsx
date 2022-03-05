import useSWR from 'swr';
import { PostDetailData } from '../../types/PostDetailData';
import { UserData } from '../../types/UserData';

type PostByUser = Omit<PostDetailData, 'email'> & UserData;

export const useFetch = (url: (string | string[])[] | string, func, option?) => {
  const { data, error } = useSWR<PostByUser>(url, func, option);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};
