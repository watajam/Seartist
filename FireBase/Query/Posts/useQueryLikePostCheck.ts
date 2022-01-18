import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';

//常にいいねしている投稿かどうかを確認
export const useQueryLikePostCheck = (id) => {
  const [like, setLike] = useState(null);
  const [likePostDetailLoading, setLikePostDetailLoading] = useState(true);

  //常にいいねされた投稿だった場合、ハートを赤くするためにsetLikeに値を入れる
  if (id !== undefined) {
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
    }, [id]);
  }

  return { like, likePostDetailLoading };
};
