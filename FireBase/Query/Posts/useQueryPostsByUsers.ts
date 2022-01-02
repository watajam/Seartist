import { collection, orderBy, query, getDocs, where } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../lib/firebase';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';

type postsByUsers = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

export const useQueryPostsByUsers = () => {
  const [postsByUsers, setPostsByUsers] = useState<postsByUsers[]>([]);
  const [postsByUsersLoading, setPostsByUsersLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const usePostsByUsers = async () => {
          //フォローしているユーザーの投稿を取得
          const q = query(collection(db, 'users', user.email, 'postsByFollowers'), orderBy('timestamp', 'desc'));
          const postsByFollowerDocs = await getDocs(q);
          if (postsByFollowerDocs.empty) {
            setPostsByUsersLoading(false);
            setPostsByUsers(null);
          } else {
            postsByFollowerDocs.docs.map(async (docPosts) => {
              const queryPosts = query(
                collection(db, 'users'),
                where(`postsIds`, 'array-contains', docPosts.data().id)
              );
              const userDocs = await getDocs(queryPosts);
              if (userDocs.empty) {
                setPostsByUsersLoading(false);
                setPostsByUsers(null);
              } else {
                setPostsByUsers((prevPostsByUsers) => {
                  return [
                    ...prevPostsByUsers,
                    {
                      ...(docPosts.data() as PostData),
                      name: userDocs.docs[0].data().name,
                      userId: userDocs.docs[0].data().userId,
                      profilePhoto: userDocs.docs[0].data().profilePhoto,
                      email: userDocs.docs[0].data().email,
                    },
                  ];
                });
                setPostsByUsersLoading(false);
              }
            });
          }
        };
        usePostsByUsers();
      } else {
        router.push('/login');
      }
    });
  }, []);
  return { postsByUsers, postsByUsersLoading };
};
