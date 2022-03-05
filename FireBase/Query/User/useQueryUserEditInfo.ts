import { doc, getDoc } from '@firebase/firestore';
import { useCallback } from 'react';
import { db } from '../../../lib/firebase';
import { useRecoilSetEmail } from '../../../src/hooks/useRecoilSetEmail';
import { UserData } from '../../../types/UserData';

//編集画面でユーザー情報取得してFormの初期値に設定する
export const useQueryUserEditInfo = () => {
  const { userEmail } = useRecoilSetEmail();

  const queryUserEditInfo = useCallback(async () => {
    let user: Pick<UserData, 'profilePhoto' | 'userId' | 'genre'>;
    const userRef = doc(db, 'users', userEmail.email);
    const userDocs = await getDoc(userRef);
    user = userDocs?.data() as UserData;

    return user;
  }, [userEmail?.email]);

  return queryUserEditInfo;
};
