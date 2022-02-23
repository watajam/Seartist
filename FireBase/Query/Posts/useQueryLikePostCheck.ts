import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

 //既にいいねしているか投稿かどうか確認
export const useQueryLikePostCheck = () => {
  const queryLikePostCheck = async (email, id) => {
    let liked: DocumentData;

    const q = doc(db, 'users', email, 'likedPosts', id);
    const likePostsquery = await getDoc(q);

    liked = likePostsquery.data();
    
    return liked;
  };

  return queryLikePostCheck;
};