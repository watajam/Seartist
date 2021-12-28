import { collection, doc, getDocs, increment, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { useCallback } from 'react';
import { auth, db } from '../../../lib/firebase';

export const useUpdateFollow = () => {
  const updateFollow = useCallback(async (email) => {
    const batch = writeBatch(db);
    //自分の情報
    const authUserRef = doc(db, 'users', auth.currentUser?.email);
    const authFollowingRef = doc(authUserRef, 'following', email);
    const authFollowersColRef = collection(authUserRef, 'followers');
    const authFollowersDocRef = doc(authUserRef, 'followers', email);

    //フォローした人の情報
    const otherUsers = doc(db, 'users', email);
    const otherFollowersRef = doc(otherUsers, 'followers', auth.currentUser?.email);
    const otherPostsRef = collection(otherUsers, 'posts');

    //自分のフォロワーにフォローした人が存在するか確認
    const q = query(authFollowersColRef, where('email', '==', email));
    const likePostsquery = await getDocs(q);

    if (likePostsquery.docs.length === 1) {
      //フォローした人が自分のフォロワーにいた場合
      batch.set(authFollowingRef, {
        email,
        createTime: serverTimestamp(),
        following: true,
      });
      batch.set(otherFollowersRef, {
        email: auth.currentUser?.email,
        createTime: serverTimestamp(),
        following: true,
      });

      //フォローした人の投稿を自分の情報に追加
      const querySnapshot = await getDocs(otherPostsRef);
      querySnapshot.docs.forEach((document) => {
        const authPostsByFollowersRef = doc(authUserRef, 'postsByFollowers', document.id);
        batch.set(authPostsByFollowersRef, {
          ...document.data(),
        });
      });

      batch.update(authFollowersDocRef, { following: true });
      batch.update(authUserRef, { followUsersCount: increment(1) });
      batch.update(otherUsers, { followerUsersCount: increment(1) });
      await batch.commit();
    } else {
      //自分のフォローコレクションにフォローした人の情報を格納
      batch.set(authFollowingRef, {
        email,
        createTime: serverTimestamp(),
        following: true,
      });

      //フォローした人のフォロワーコレクションに自分の情報を格納
      batch.set(otherFollowersRef, {
        email: auth.currentUser?.email,
        createTime: serverTimestamp(),
        following: false,
      });
      //フォローした人の投稿を自分の情報に追加
      const querySnapshot = await getDocs(otherPostsRef);
      querySnapshot.docs.forEach((document) => {
        const authPostsByFollowersRef = doc(authUserRef, 'postsByFollowers', document.id);
        batch.set(authPostsByFollowersRef, {
          ...document.data(),
        });
      });
      batch.update(authUserRef, { followUsersCount: increment(1) });
      batch.update(otherUsers, { followerUsersCount: increment(1) });
      await batch.commit();
    }
  }, []);
  return { updateFollow };
};
