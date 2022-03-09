import useSWR from 'swr';

export const useFetchArray = <T, K, U>(url: string | (string | K)[], func: U) => {
  const { data, error, mutate } = useSWR<T[], Error>(url, func);

  return {
    data,
    error,
    isLoading: !data && !error,
    isEmpty: data && data.length === 0,
    mutate,
  };
};
