import useSWRImmutable from 'swr/immutable';
import { PostDetailData } from '../../types/PostDetailData';
import { UserData } from '../../types/UserData';

type PostByUser = Omit<PostDetailData, 'email'> & UserData;

export const useFetchImmutable = (url: string, func) => {
  const { data } = useSWRImmutable<PostByUser>(url, func);

  return {
    data,
  };
};
