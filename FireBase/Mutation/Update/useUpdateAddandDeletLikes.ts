import { collection, doc, getDocs, increment, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';

export const useUpdateAddandDeletLikes = () => {
  const updateAddandDeletLikes = async (setLike, user, post) => {
    const batch = writeBatch(db);
    const postRef = doc(db, 'users', user?.email, 'posts', post?.id);
    const likedUsersRef = doc(postRef, 'likedUsers', auth.currentUser?.email);

    const UserRef = doc(db, 'users', auth.currentUser?.email);
    const likedPostsRef = doc(UserRef, 'likedPosts', post?.id);

    const q = query(collection(db, 'users', auth.currentUser?.email, 'likedPosts'), where('id', '==', post?.id));
    const likePostsquery = await getDocs(q);

    //既にいいねされているか判定
    if (likePostsquery.docs.length === 0) {
      batch.set(likedUsersRef, {
        id: auth.currentUser?.email,
        createTime: serverTimestamp(),
      });

      batch.set(likedPostsRef, {
        id: post?.id,
        postRef: postRef,
        createTime: serverTimestamp(),
      });
      batch.update(postRef, { likeCount: increment(1) });
      batch.update(UserRef, { likePostCount: increment(1) });
      await batch.commit();
      setLike(1);
    } else {
      batch.delete(likedUsersRef);
      batch.delete(likedPostsRef);
      batch.update(postRef, { likeCount: increment(-1) });
      batch.update(UserRef, { likePostCount: increment(-1) });

      await batch.commit();
      setLike(0);
    }
  };

  return { updateAddandDeletLikes };
};
