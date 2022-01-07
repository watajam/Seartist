import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';

//ログインしているユーザーのメールアドレスが存在するかどうかを確認する
export const useQueryLikePostsCheck = (id) => {  
  const [like, setLike] = useState(null);
  const [likePostDetailLoading, setLikePostDetailLoading] = useState(true);

  //いいねされた投稿だった場合、ハートを赤くする
  useEffect(() => {
    const likePostsCheck = async () => {
      const q = query(collection(db, 'users', auth.currentUser?.email, 'likedPosts'), where('id', '==', id));
      const likePostsquery = await getDocs(q);
      if (likePostsquery.empty) {
        setLike(likePostsquery.docs.length);
        setLikePostDetailLoading(false);
      } else {
        setLike(likePostsquery.docs.length);
        setLikePostDetailLoading(false);
      }
    };
    likePostsCheck();
  }, []);

  return { like, likePostDetailLoading };
};
