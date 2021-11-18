import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useBackPage = () => {
  const router = useRouter();

  const backPage = useCallback(() => {
    router.back();
  }, []);

  return { backPage };
};
