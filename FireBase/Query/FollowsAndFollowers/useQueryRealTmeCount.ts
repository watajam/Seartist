import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';

//profileページにユーザーのフォロー数とフォロー数をリアルタイム表示する
export const useQueryRealTmeCount = (email: string) => {
  const [followAndFollower, setFollowAndFollower] =
    useState<Pick<UserData, 'followUsersCount' | 'followerUsersCount'>>(null);

  useEffect(() => {
    if (email !== undefined) {
      const unSub = onSnapshot(doc(db, 'users', email), (doc) => {
        setFollowAndFollower({
          followUsersCount: doc.data()?.followUsersCount,
          followerUsersCount: doc.data()?.followerUsersCount,
        });
      });

      return () => unSub();
    }
  }, [email]);

  return followAndFollower;
};
