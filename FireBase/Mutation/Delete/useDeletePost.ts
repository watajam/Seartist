import { deleteDoc, doc} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { auth, db } from '../../../lib/firebase';

export const useDeletePost = () => {
  const router = useRouter();
  const deletePost = useCallback(async () => {
    if (confirm('削除しますか？')) {
      await deleteDoc(doc(db, 'users', auth.currentUser.email, 'posts', `${router.query.id}`));

      router.back();
    }
  }, []);
  return { deletePost };
};
