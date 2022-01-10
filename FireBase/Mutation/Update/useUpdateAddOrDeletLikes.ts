import { collection, doc, getDocs, increment, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../../../lib/firebase';

//いいね機能
export const useUpdateAddOrDeletLikes = () => {
  const [likeFlag, setLikeFlag] = useState(null);

  const updateAddOrDeletLikes = async (postsByUsers) => {
    const batch = writeBatch(db);

    //投稿にログインしている人の情報を追加
    const postRef = doc(db, 'users', postsByUsers?.email, 'posts', postsByUsers?.id);
    const likedUsersRef = doc(postRef, 'likedUsers', auth.currentUser?.email);
    
    //投稿しているユーザーのフォロワーを取得
    const otherFollowersRef = collection(db, 'users', postsByUsers?.email, 'followers');
    const userFollowersDocs = await getDocs(otherFollowersRef);
    
    //ログインしている人のいいねした投稿を取得
    const UserRef = doc(db, 'users', auth.currentUser?.email);
    const likedPostsRef = doc(UserRef, 'likedPosts', postsByUsers?.id);

    //ログインしている人の投稿にいいねをつけているかどうか取得
    const likePostsquery = query(
      collection(db, 'users', auth.currentUser?.email, 'likedPosts'),
      where('id', '==', postsByUsers?.id)
    );
    const likePostsDocs = await getDocs(likePostsquery);
    
    //既にいいねされているか判定
    if (likePostsDocs.docs.length === 0) {

      //投稿にいいねしたユーザーを追加
      batch.set(likedUsersRef, {
        id: auth.currentUser?.email,
        createTime: serverTimestamp(),
      });

      //いいねした投稿を追加
      batch.set(likedPostsRef, {
        id: postsByUsers?.id,
        postRef: postRef,
        createTime: serverTimestamp(),
      });
      
      //いいね数を追加
      batch.update(postRef, { likeCount: increment(1) });

      //投稿数を追加
      batch.update(UserRef, { likePostCount: increment(1) });

      //投稿している人をフォローしているユーザーにもいいね数を追加
      userFollowersDocs.docs.map((document) => {
        const otherPostsByFollowersRef = doc(db, 'users', document.data()?.email, 'postsByFollowers', postsByUsers?.id);
        batch.update(otherPostsByFollowersRef, { likeCount: increment(1) });
      });
      await batch.commit();

      //フォローした場合フラグをTrueにする
      setLikeFlag(true);
    } else {

      //いいねをした投稿のユーザー情報を削除
      batch.delete(likedUsersRef);

      //いいねした投稿を削除
      batch.delete(likedPostsRef);

      //いいね数を削除
      batch.update(postRef, { likeCount: increment(-1) });

      //投稿数を削除
      batch.update(UserRef, { likePostCount: increment(-1) });

      //投稿している人のフォローワーのユーザーのいいね数を削除
      userFollowersDocs.docs.map((document) => {
        const otherPostsByFollowersRef = doc(db, 'users', document.data()?.email, 'postsByFollowers', postsByUsers?.id);
        batch.update(otherPostsByFollowersRef, { likeCount: increment(-1) });
      });
      await batch.commit();

      //フォローしていない場合フラグをFalseにする
      setLikeFlag(false);
    }
  };

  return { likeFlag, updateAddOrDeletLikes };
};
