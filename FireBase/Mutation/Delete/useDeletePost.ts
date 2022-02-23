import { arrayRemove, collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { auth, db } from '../../../lib/firebase';

//投稿削除機能
export const useDeletePost = () => {
  const router = useRouter();

  const deletePost = useCallback(async () => {
    if (confirm('削除しますか？')) {
      const batch = writeBatch(db);

      //ログインしているユーザーのフォロワーを取得
      const authFollowersRef = collection(db, 'users', auth.currentUser?.email, 'followers');
      const userFollowersDocs = await getDocs(authFollowersRef);

      //フォロワーが保持している同じ投稿を削除
      userFollowersDocs.docs.map((document) => {
        const otherpostsByFollowingRef = doc(
          db,
          'users',
          document.data()?.email,
          'postsByFollowing',
          `${router.query.id}`
        );
        batch.delete(otherpostsByFollowingRef);
      });

      //ログインしているユーザーの削除する投稿を取得
      const usersRef = collection(db, 'users', auth.currentUser?.email, 'posts', `${router.query.id}`, 'likedUsers');
      const usersInfoRef = await getDocs(usersRef);

      usersInfoRef.docs.map(async (document) => {
        //投稿にいいねしているユーザーのいいね数を減らす
        batch.update(doc(db, 'users', document.id), { likePostCount: increment(-1) });

        //自分のいいねしている投稿から削除
        batch.delete(doc(db, 'users', document.id, 'likedPosts', `${router.query.id}`));

        //投稿にいいねしているユーザーを削除
        batch.delete(
          doc(db, 'users', auth.currentUser?.email, 'posts', `${router.query.id}`, 'likedUsers', document.id)
        );
      });

      const userRef = doc(db, 'users', auth.currentUser?.email);

      //ユーザーが保持している投稿IDの削除
      batch.update(userRef, { postsIds: arrayRemove(router.query.id) });

      //投稿を削除
      batch.delete(doc(db, 'users', auth.currentUser?.email, 'posts', `${router.query.id}`));

      //投稿数の削除
      batch.update(userRef, { postsCount: increment(-1) });
      await batch.commit();

      //前のページに戻る
      router.back();
    }
  }, [router]);
  return { deletePost };
};
