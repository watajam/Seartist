import { useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';

//ログインしているユーザーのメールアドレスが存在するかどうかを確認する
export const useQueryLikePostsCheck = (like, setLike, id) => {
  //いいねされた投稿だった場合、ハートを赤くする
  useEffect(() => {
    const likePostsCheck = async () => {
      const q = query(collection(db, 'users', auth.currentUser?.email, 'likedPosts'), where('id', '==', id));
      const likePostsquery = await getDocs(q);
      setLike(likePostsquery.docs.length);
    };
    likePostsCheck();
  }, []);
};
