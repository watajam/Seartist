import { collection, doc, getDocs, increment, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { useCallback } from 'react';
import { auth, db } from '../../../lib/firebase';

//フォロー機能
export const useUpdateFollow = (setFlag?) => {
  const updateFollow = useCallback(
    async (email) => {
      //フォローした場合フラグをtrueにする
      setFlag && setFlag(true);

      const batch = writeBatch(db);

      //ログインしているユーザーの情報
      const authUserRef = doc(db, 'users', auth.currentUser?.email);
      const authFollowingRef = doc(authUserRef, 'following', email);
      const authFollowersColRef = collection(authUserRef, 'followers');
      const authFollowersDocRef = doc(authUserRef, 'followers', email);

      //フォローした人の情報
      const otherUsers = doc(db, 'users', email);
      const otherFollowersRef = doc(otherUsers, 'followers', auth.currentUser?.email);
      const otherPostsRef = collection(otherUsers, 'posts');

      //ログインしているユーザーのフォロワーにフォローした人が存在する有無によって処理を変える
      const likePostsquery = query(authFollowersColRef, where('email', '==', email));
      const likePostsDocs = await getDocs(likePostsquery);
      if (likePostsDocs.docs.length === 1) {
        //ログインしているユーザーのフォローフィールドにフォローした人の情報を追加
        batch.set(authFollowingRef, {
          email,
          createTime: serverTimestamp(),
          following: true,
        });

        //フォローした人のフォロワーフィールドの情報を更新
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

        //ログインしている人のフォロワーフィールドにフォローした人の情報を更新
        batch.update(authFollowersDocRef, { following: true });

        //ログインしている人のフォロー数を増やす
        batch.update(authUserRef, { followUsersCount: increment(1) });

        //フォローした人のフォロワー数を増やす
        batch.update(otherUsers, { followerUsersCount: increment(1) });

        await batch.commit();
      } else {
        //ログインしているユーザのフォローフィールドにフォローした人の情報を追加
        batch.set(authFollowingRef, {
          email,
          createTime: serverTimestamp(),
          following: true,
        });

        //フォローした人のフォロワーフィールドにログインしているユーザの情報を追加
        batch.set(otherFollowersRef, {
          email: auth.currentUser?.email,
          createTime: serverTimestamp(),
          following: false,
        });

        //ログインしているユーザーにフォローした人の投稿を自分の情報に追加
        const querySnapshot = await getDocs(otherPostsRef);
        querySnapshot.docs.forEach((document) => {
          const authPostsByFollowersRef = doc(authUserRef, 'postsByFollowers', document.id);
          batch.set(authPostsByFollowersRef, {
            ...document.data(),
          });
        });

        //ログインしているユーザーのフォロー数を増やす
        batch.update(authUserRef, { followUsersCount: increment(1) });

        //フォローした人のフォロワー数を増やす
        batch.update(otherUsers, { followerUsersCount: increment(1) });

        await batch.commit();
      }
    },
    [setFlag]
  );
  return { updateFollow };
};
