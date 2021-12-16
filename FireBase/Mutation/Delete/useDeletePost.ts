import { arrayRemove, collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { auth, db } from '../../../lib/firebase';

export const useDeletePost = () => {
  const router = useRouter();
  const deletePost = useCallback(async () => {
    if (confirm('削除しますか？')) {
      //投稿を削除

      //投稿にいいねしているユーザーを削除
      const batch = writeBatch(db);
      const userRef = doc(db, 'users', auth.currentUser?.email);
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
      //ユーザーに保持している投稿IDの削除
      batch.update(userRef, { likePostsIds: arrayRemove(router.query.id) });
      //投稿を削除
      batch.delete(doc(db, 'users', auth.currentUser?.email, 'posts', `${router.query.id}`));
      //投稿数の削除
      batch.update(userRef, { postsCount: increment(-1) });
      await batch.commit();

      router.back();
    }
  }, [auth.currentUser?.email]);
  return { deletePost };
};
