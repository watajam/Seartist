import { collection, getDocs, query, where } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';

//検索された投稿から取得したメールアドレスで一致したユーザー情報を取得する
export const useQueryUsersExplore = (posts) => {
  const [users, setUsers] = useState<Pick<UserData, 'userId' | 'name' | 'image' | 'email'>[]>([]);

  useEffect(() => {
    if (posts === null) {
      return;
    }

    const usersRef = collection(db, 'users');

    posts?.forEach(async (post) => {
      const q = query(usersRef, where('email', '==', post.email));

      const querySnap = await getDocs(q);

      if (querySnap.empty) {
        return;
      } else {
        querySnap.forEach((user) => {
          setUsers((prev) => {
            return [...prev, { userId: user.data().userId, name: user.data().name, image: user.data().image, email: user.data().email }];
          });
        });
      }
    });
  }, [posts]);

  return { users };
};
