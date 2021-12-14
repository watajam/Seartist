import { collectionGroup, query, QueryConstraint, where, onSnapshot } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { PostData } from '../../../types/PostData';

//投稿を検索
export const useQueryPostsExplore = () => {
  const [posts, setposts] = useState<Omit<PostData, 'email'>[]>(null);
  const [postsLoading, setPostsLoading] = useState(true);
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

      const q = query(postsRef, ...queryConstraints);

      const unSub = onSnapshot(q, (querySnap) => {
        if (querySnap.empty) {
          setPostsLoading(false);
          return;
        } else {
          setposts(
            querySnap.docs.map((doc) => ({
              id: doc.id,
              genre: doc.data().genre,
              eventName: doc.data().eventName,
              eventLocation: doc.data().eventLocation,
              eventDate: doc.data().eventDate,
              openTime: doc.data().openTime,
              closeTime: doc.data().closeTime,
              image: doc.data().image,
              writing: doc.data().writing,
              email: doc.data().email,
              likeCount: doc.data().likeCount,
            }))
          );
          setPostsLoading(false);
        }
      });
      return () => unSub();
    };

    exploreCondition();
  }, [router.query]);

  return { posts, postsLoading };
};
