import { collection, getDocs, query, where } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { UserData } from '../../types/UserData';

export const useQueryUsersExploreSetLoading = (posts) => {
  const [users, setUsers] = useState<Pick<UserData, 'userId' | 'name' | 'image'>[]>([]);

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
            return [...prev, { userId: user.data().userId, name: user.data().name, image: user.data().image }];
          });
        });
      }
    });
  }, [posts]);

  return { users };
};
