import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from 'firebase/firestore';
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
      const usersRef = collection(db, 'users', auth.currentUser?.email, 'posts', `${router.query.id}`, 'likedUsers');
      const aa = await getDocs(usersRef);
      aa.docs.map(async (document) => {
        //投稿にいいねしているユーザーのいいね数を減らす
        batch.update(doc(db, 'users', document.id), { likePostCount: increment(-1) });

        //自分のいいねしている投稿から削除
        batch.delete(doc(db, 'users', document.id, 'likedPosts', `${router.query.id}`));

        //投稿にいいねしているユーザーを削除
        batch.delete(
          doc(db, 'users', auth.currentUser?.email, 'posts', `${router.query.id}`, 'likedUsers', document.id)
        );
      });
      //投稿を削除
      batch.delete(doc(db, 'users', auth.currentUser?.email, 'posts', `${router.query.id}`));
      await batch.commit();

      router.back();
    }
  }, [auth.currentUser?.email]);
  return { deletePost };
};
