import React, { memo, useState, VFC } from 'react';
import ListItem from './ListItem';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { auth, db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';
import { useRouter } from 'next/router';

const FollowAndFollowers: VFC = () => {
  // const { user, userLoading } = useQueryUserInfo();
  // const { posts, postsLoading } = useQueryUserPosts();
  // useQueryUserEmailCheck();

  // if (postsLoading || userLoading) {
  //   return <SkeletonLoading />;
  // }

  // if (user === undefined || posts === undefined) {
  //   return <p>エラー</p>;
  // }

  // if (posts && posts.length === 0 && user) {
  //   return <p>まだ投稿がありません</p>;
  // }

  const [user, setUser] = useState<UserData>(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userRef = collection(db, 'users');

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (router.query.id !== undefined) {
          const q = query(userRef, where('userId', '==', `${router.query.id}`));
          const querySnap = await getDocs(q);
          if (querySnap.docs) {
            // const userData = querySnap.docs[0]?.data() as UserData;

            // setUser({
            //   ...userData,
            // });
            setUserLoading(false);
          } else {
            alert('存在しないページです');
          }
        }
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  console.log(user);

  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {/* {posts.map((post) => {
        return <ListItem key={post.id} post={post} user={user} />;
      })} */}
      <ListItem />;
    </div>
  );
};

export default memo(FollowAndFollowers);
