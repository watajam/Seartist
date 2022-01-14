import { useCallback, useState } from 'react';


//切り替え機能
export const useHandleChenge = () => {
  const [chenge, setChenge] = useState(true);

  const handleChenge = useCallback(() => {
    setChenge((prevChengePage) => {
      return !prevChengePage;
    });
  }, []);
  return {
    chenge,
    handleChenge,
  };
};
