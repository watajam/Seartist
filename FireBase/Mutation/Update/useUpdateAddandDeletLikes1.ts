import { collection, doc, getDocs, increment, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';

export const useUpdateAddandDeletLikes1 = () => {
  const updateAddandDeletLikes = async (setLikeFlag, postsByUsers) => {
    const batch = writeBatch(db);
    const postRef = doc(db, 'users', postsByUsers?.email, 'posts', postsByUsers?.id);
    const likedUsersRef = doc(postRef, 'likedUsers', auth.currentUser?.email);

    const UserRef = doc(db, 'users', auth.currentUser?.email);
    const likedPostsRef = doc(UserRef, 'likedPosts', postsByUsers?.id);

    const otherFollowersRef = collection(db, 'users', postsByUsers?.email, 'followers');
    const userFollowersDocs = await getDocs(otherFollowersRef);

    const q = query(
      collection(db, 'users', auth.currentUser?.email, 'likedPosts'),
      where('id', '==', postsByUsers?.id)
    );
    const likePostsquery = await getDocs(q);

    //既にいいねされているか判定
    if (likePostsquery.docs.length === 0) {
      batch.set(likedUsersRef, {
        id: auth.currentUser?.email,
        createTime: serverTimestamp(),
      });

      batch.set(likedPostsRef, {
        id: postsByUsers?.id,
        postRef: postRef,
        createTime: serverTimestamp(),
      });
      batch.update(postRef, { likeCount: increment(1) });
      batch.update(UserRef, { likePostCount: increment(1) });

      //フォローワーのユーザーにもlikeCountを追加
      userFollowersDocs.docs.map((document) => {
        const otherPostsByFollowersRef = doc(db, 'users', document.data()?.email, 'postsByFollowers', postsByUsers?.id);
        batch.update(otherPostsByFollowersRef, { likeCount: increment(1) });
      });
      await batch.commit();
      setLikeFlag(1);
    } else {
      batch.delete(likedUsersRef);
      batch.delete(likedPostsRef);
      batch.update(postRef, { likeCount: increment(-1) });
      batch.update(UserRef, { likePostCount: increment(-1) });
      //フォローワーのユーザーにもlikeCountを追加
      userFollowersDocs.docs.map((document) => {
        const otherPostsByFollowersRef = doc(db, 'users', document.data()?.email, 'postsByFollowers', postsByUsers?.id);
        batch.update(otherPostsByFollowersRef, { likeCount: increment(-1) });
      });
      await batch.commit();
      setLikeFlag(0);
    }
  };

  return { updateAddandDeletLikes };
};
