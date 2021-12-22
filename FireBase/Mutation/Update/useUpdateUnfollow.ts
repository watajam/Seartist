import { doc, increment, writeBatch } from 'firebase/firestore';
import { useCallback } from 'react';
import { auth, db } from '../../../lib/firebase';

export const useUpdateUnfollow = () => {
  const updateUnfollow = useCallback(async (email) => {
    const batch = writeBatch(db);
    //自分の情報
    const authUserRef = doc(db, 'users', auth.currentUser?.email);
    const authFollowingRef = doc(authUserRef, 'following', email);

    const authFollowersDocRef = doc(authUserRef, 'followers', email);

    //フォローした人の情報
    const otherUsers = doc(db, 'users', email);
    const otherFollowersRef = doc(otherUsers, 'followers', auth.currentUser?.email);

    //自分のフォローコレクションからユーザーを解除
    batch.delete(authFollowingRef);
    //フォローを外した人のフォロワーコレクションから自分の情報を削除
    batch.delete(otherFollowersRef);
    batch.update(authUserRef, { followUsersCount: increment(-1) });
    batch.update(otherUsers, { followerUsersCount: increment(-1) });
    batch.update(authFollowersDocRef, { following: false });
    await batch.commit();
  }, []);
  return { updateUnfollow };
};
