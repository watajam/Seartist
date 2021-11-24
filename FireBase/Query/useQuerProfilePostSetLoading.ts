import { collection,  getDocs, orderBy, query } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { PostData } from '../../types/PostData';


//ユーザープロフィールの投稿を取得する
export const useQuerProfilePostSetLoading = (user) => {
  const [posts, setPosts] = useState<Omit<PostData, 'email'>[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        if (user?.email !== undefined && router.query.id !== undefined) {
          const q = query(collection(db, 'users', `${user.email}`, 'posts'), orderBy('timestamp', 'desc'));
          const querySnap = await getDocs(q);

          if (querySnap.docs) {
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
              }))
            );
            setPostsLoading(false);
          } else {
            console.log('投稿が見つかりませんでした');
          }
        }
      } else {
        router.push('/login');
      }
      return () => unSub();
    });
  }, [user, router]);

  return { posts, postsLoading };
};
