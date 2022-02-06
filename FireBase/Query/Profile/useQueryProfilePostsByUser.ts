import { collection, orderBy, query, getDocs, where } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../lib/firebase';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';

type postsByUsers = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

//profileページにログインしているユーザーの投稿データを表示
export const useQueryProfilePostsByUser = () => {
  const [postsByUser, setPostsByUser] = useState<postsByUsers[]>([]);
  const [postsByUserLoading, setPostsByUserLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userRef = collection(db, 'users');

    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user && router.query.id !== undefined) {
        const q = query(userRef, where('userId', '==', router.query.id));
        const userDocs = await getDocs(q);

        if (userDocs.empty) {
          setPostsByUserLoading(false);
          setError('ユーザーが見つかりませんでした');
        } else {
          setPostsByUser([]);
          const userData = userDocs.docs[0]?.data() as UserData;

          const q = query(collection(db, 'users', `${userData?.email}`, 'posts'), orderBy('timestamp', 'desc'));
          const postsDoc = await getDocs(q);
          if (postsDoc.empty) {
            setPostsByUserLoading(false);
          } else {
            setPostsByUser(
              postsDoc.docs.map((docPosts) => {
                return {
                  ...(docPosts.data() as PostData),
                  name: userData.name,
                  userId: userData.userId,
                  profilePhoto: userData.profilePhoto,
                  email: userData.email,
                };
              })
            );
            setPostsByUserLoading(false);
            setError(null);
          }
        }
      } else {
        router.push('/login');
      }
    });
    return () => unSub();
  }, [router]);

  return { postsByUser, postsByUserLoading, error };
};
