import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';

//ログインしているユーザーのメールアドレスが存在するかどうかを確認する
export const useQueryLikePostDetailCheck = (id) => {
  const [like, setLike] = useState(null);

  //いいねされた投稿だった場合、ハートを赤くする
  useEffect(() => {
    if (id !== undefined) {
      const likePostsCheck = async () => {
        const q = query(collection(db, 'users', auth.currentUser?.email, 'likedPosts'), where('id', '==', id));
        const likePostsquery = await getDocs(q);
        if (likePostsquery.empty) {
          setLike(likePostsquery.docs.length);
        } else {
          setLike(likePostsquery.docs.length);
        }
      };
      likePostsCheck();
    }
  }, [id]);

  return like;
};
