import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

export const usePromiseToast = () => {
  const [isLoading, setIsLoading] = useState(false);

  const promiseToast = useCallback(async (promise, success: string, error?: string) => {
    setIsLoading(true);
    try {
      await toast.promise(promise, {
        loading: 'Loading',
        success,
        error,
      });
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }, []);

  return { promiseToast, isLoading };
};
