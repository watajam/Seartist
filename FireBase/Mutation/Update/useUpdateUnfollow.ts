import { collection, doc, getDocs, increment, query, where, writeBatch } from 'firebase/firestore';
import { useCallback } from 'react';
import { auth, db } from '../../../lib/firebase';

export const useUpdateUnfollow = (setFlag?) => {
  const updateUnfollow = useCallback(async (email) => {
    if (confirm('フォローを解除しますか？')) {
      setFlag && setFlag(false);

      const batch = writeBatch(db);
      //自分の情報
      const authUserRef = doc(db, 'users', auth.currentUser?.email);
      const authFollowingRef = doc(authUserRef, 'following', email);

      const queryAuthFollower = query(collection(authUserRef, 'followers'), where('email', '==', email));
      const likePostsquery = await getDocs(queryAuthFollower);

      //フォローした人の情報
      const otherUsers = doc(db, 'users', email);
      const otherFollowersRef = doc(otherUsers, 'followers', auth.currentUser?.email);
      const otherPostsRef = collection(otherUsers, 'posts');

      //自分のフォローコレクションからユーザーを解除
      batch.delete(authFollowingRef);
      //フォローを外した人のフォロワーコレクションから自分の情報を削除
      batch.delete(otherFollowersRef);
      //フォローを外した人の投稿を自分の情報から削除
      const querySnapshot = await getDocs(otherPostsRef);
      querySnapshot.docs.forEach((document) => {
        const authPostsByFollowersRef = doc(authUserRef, 'postsByFollowers', document.data().id);
        batch.delete(authPostsByFollowersRef);
      });

      batch.update(authUserRef, { followUsersCount: increment(-1) });
      batch.update(otherUsers, { followerUsersCount: increment(-1) });
      if (!likePostsquery.empty) {
        const authFollowersDocRef = doc(authUserRef, 'followers', email);
        batch.update(authFollowersDocRef, { following: false });
      }
      await batch.commit();
    }
  }, []);
  return { updateUnfollow };
};
