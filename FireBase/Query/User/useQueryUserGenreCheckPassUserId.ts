import { doc, getDoc } from '@firebase/firestore';
import { useCallback } from 'react';
import { db } from '../../../lib/firebase';
import { useRecoilSetEmail } from '../../../src/hooks/useRecoilSetEmail';
import { UserData } from '../../../types/UserData';

//ログインしているユーザーの情報にジャンルの項目が存在するか確認
export const useQueryUserGenreCheckPassUserId = () => {
  const { userEmail } = useRecoilSetEmail();

  const queryUserGenreCheckPassUserId = useCallback(async () => {
    let user: Pick<UserData, 'userId' | 'genre'>;
    const userRef = doc(db, 'users', userEmail.email);
    const userDoc = await getDoc(userRef);
    const userData = userDoc?.data() as Pick<UserData, 'userId' | 'genre'>;
    user = { ...userData };

    return user;
  }, [userEmail?.email]);

  return { queryUserGenreCheckPassUserId };
};
