import { collection, orderBy, query, getDocs, where } from '@firebase/firestore';
import { NextRouter } from 'next/router';
import { useCallback } from 'react';
import { db } from '../../../lib/firebase';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';

type PostsByUser = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

//profileページにログインしているユーザーの投稿データを表示
export const useQueryProfilePostsByUser = () => {
  const queryUser = useCallback(async (router: NextRouter) => {
    let user: UserData;

    const q = query(collection(db, 'users'), where('userId', '==', router.query.id));
    const userDocs = await getDocs(q);
    userDocs.docs.map(async (docUser) => {
      user = docUser.data() as UserData;
    });

    return user;
  }, []);

  const queryProfilePostsByUser = useCallback(async (user) => {
    let postsByUser: PostsByUser[] = [];

    const q = query(collection(db, 'users', `${user.email}`, 'posts'), orderBy('timestamp', 'desc'));
    const postsDoc = await getDocs(q);

    const result = await Promise.all(
      postsDoc.docs.map(async (doc) => {
        postsByUser.push({
          ...(doc.data() as PostData),
          name: user.name,
          userId: user.userId,
          profilePhoto: user.profilePhoto,
          email: user.email,
        });
      })
    );
    return postsByUser;
  }, []);

  return { queryUser, queryProfilePostsByUser };
};
