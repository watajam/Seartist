import useSWR from 'swr';

export const useFetch = <T, K>(url: (string | string[])[] | string, func: K) => {
  const { data, error } = useSWR<T, Error>(url, func);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};
