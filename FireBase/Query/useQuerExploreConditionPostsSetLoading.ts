import { collectionGroup, getDocs, query, QueryConstraint, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { PostData } from '../../types/PostData';

export const useQuerExploreConditionPostsSetLoading = () => {
  const [posts, setposts] = useState<PostData[]>(null);
  const [postsLoading, setPostsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (
      router.query?.location === undefined &&
      router.query?.evaluation === undefined &&
      router.query?.type === undefined
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

      const querySnap = await getDocs(q);

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
          }))
        );

        setPostsLoading(false);
      }
    };

    exploreCondition();
  }, [router.query]);

  return { posts, postsLoading };
};
