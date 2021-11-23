import { collection, getDocs, orderBy, query } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { PostData } from '../../types/PostData';

//ログインしているユーザーの投稿を取得する
export const useQuerPostsSetLoading = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [postLoading, setPostLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const q = query(collection(db, 'users', user.email, 'posts'), orderBy('timestamp', 'desc'));
        const querySnap = await getDocs(q);

        if (querySnap.docs) {
          setPosts(
            querySnap.docs.map((doc) => ({
              id: doc.id,
              image: doc.data()?.image,
              writing: doc.data()?.writing,
              eventName: doc.data()?.eventName,
              genre: doc.data()?.genre,
              eventLocation: doc.data()?.eventLocation,
              eventDate: doc.data()?.eventDate,
              openTime: doc.data()?.openTime,
              closeTime: doc.data()?.closeTime,
            }))
          );
        } else {
          console.log('No such document!');
        }
        setPostLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);
  return { posts, postLoading };
};
