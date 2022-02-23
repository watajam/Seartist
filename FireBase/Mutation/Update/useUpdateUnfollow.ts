import { collection, doc, getDocs, increment, query, where, writeBatch } from 'firebase/firestore';
import { useCallback } from 'react';
import { auth, db } from '../../../lib/firebase';

//フォロー解除機能
export const useUpdateUnfollow = (setFlag?) => {
  const updateUnfollow = useCallback(
    async (email) => {
      if (confirm('フォローを解除しますか？')) {
        //フォロー解除した場合フラグをfalseにする
        setFlag && setFlag(false);

        const batch = writeBatch(db);

        //ログインしているユーザーの情報
        const authUserRef = doc(db, 'users', auth.currentUser?.email);
        const authFollowingRef = doc(authUserRef, 'following', email);

        //フォローした人の情報
        const otherUsers = doc(db, 'users', email);
        const otherFollowersRef = doc(otherUsers, 'followers', auth.currentUser?.email);
        const otherPostsRef = collection(otherUsers, 'posts');

        //ログインしているユーザーのフォローコレクションからフォローを解除したユーザーの情報を解除
        batch.delete(authFollowingRef);

        //ログインしているユーザーがフォローを解除した人の情報をフォロワーコレクションから削除
        batch.delete(otherFollowersRef);

        //ログインしているユーザーがフォローを外した人の投稿を自分の情報から削除
        const otherPostsDocs = await getDocs(otherPostsRef);
        otherPostsDocs.docs.forEach((document) => {
          const authPostsByFollowingsRef = doc(authUserRef, 'postsByFollowing', document.data().id);
          batch.delete(authPostsByFollowingsRef);
        });

        //ログインしているユーザーがフォロー数を減らす
        batch.update(authUserRef, { followUsersCount: increment(-1) });

        //フォローを解除した人のフォロワー数を減らす
        batch.update(otherUsers, { followerUsersCount: increment(-1) });

        //ログインしているユーザーのフォロワーにフォローした人が存在していた場合、フォロワーフィールドの情報を更新する
        const queryFollowers = query(collection(authUserRef, 'followers'), where('email', '==', email));
        const FollowersDocs = await getDocs(queryFollowers);
        if (!FollowersDocs.empty) {
          const authFollowersDocRef = doc(authUserRef, 'followers', email);
          batch.update(authFollowersDocRef, { following: false });
        }

        await batch.commit();
      }
    },
    [setFlag]
  );
  return { updateUnfollow };
};
