import { collection, orderBy, query, onSnapshot } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../lib/firebase';
import { PostData } from '../../../types/PostData';

//ログインしているユーザーの投稿を取得する
export const useQueryUserPosts = () => {
  const [posts, setPosts] = useState<Omit<PostData, 'email'>[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, 'users', user.email, 'posts'), orderBy('timestamp', 'desc'));
        const unSub = onSnapshot(q, (querySnap) => {
          if (querySnap.empty) {
            setPostsLoading(false);
            return;
          } else {
            setPosts(
              querySnap.docs.map((doc) => ({
                id: doc.id,
                image: doc?.data().image,
                writing: doc?.data().writing,
                eventName: doc?.data().eventName,
                genre: doc?.data().genre,
                eventLocation: doc?.data().eventLocation,
                eventDate: doc?.data().eventDate,
                openTime: doc?.data().openTime,
                closeTime: doc?.data().closeTime,
                likeCount: doc?.data().likeCount,
              }))
            );
            setPostsLoading(false);
          }
        });

        return () => unSub();
      } else {
        router.push('/login');
      }
    });
  }, []);
  return { posts, postsLoading };
};
