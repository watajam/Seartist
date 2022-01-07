import { collectionGroup, query, QueryConstraint, where, getDocs, collection, orderBy } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';

type postsByUsers = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

//投稿を検索
export const useQueryPostsByUsersExplore = () => {
  const [postsByUsers, setPostsByUsers] = useState<postsByUsers[]>([]);
  const [postsByUsersLoading, setPostsByUsersLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (
      router.query?.location === undefined &&
      router.query?.genre === undefined &&
      router.query?.eventDate === undefined
    ) {
      return;
    }
    const exploreCondition = async () => {
      const postsRef = collectionGroup(db, 'posts');

      const postsExplore = () => {
        const queryConstraints: QueryConstraint[] = [];

        router.query?.location !== '' && queryConstraints.push(where('location', '==', router.query?.location));
        router.query?.genre !== '' && queryConstraints.push(where('genre', '==', router.query?.genre));
        router.query?.eventDate !== '' && queryConstraints.push(where('eventDate', '==', router.query?.eventDate));

        return queryConstraints;
      };

      const queryConstraints = postsExplore();

      const q = query(postsRef, ...queryConstraints, orderBy('timestamp', 'desc'));
      const postsDocs = await getDocs(q);
      if (postsDocs.empty) {
        setPostsByUsersLoading(false);
        setError('投稿が見つかりませんでした');
        return;
      } else {
        postsDocs.docs.map(async (docPosts) => {
          const queryPosts = query(collection(db, 'users'), where(`postsIds`, 'array-contains', docPosts.data().id));
          const userDocs = await getDocs(queryPosts);
          if (userDocs.empty) {
            setPostsByUsersLoading(false);
            setError('投稿が見つかりませんでした');
            return;
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
            setError(null);
          }
        });
      }
    };

    exploreCondition();
  }, [router.query]);

  return { postsByUsers, postsByUsersLoading, error };
};
