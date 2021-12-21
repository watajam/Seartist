import React, { memo, useState, VFC } from 'react';

import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { useRouter } from 'next/router';
import ListItem from './ListItem';

const Followers: VFC = () => {
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

  const [followers, setFollowers] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const follower = async () => {
      const userRef = collection(db, 'users');
      const queryUserEmail = query(userRef, where('userId', '==', `${router.query?.id}`));
      const querySnapUserEmail = await getDocs(queryUserEmail);
      if (querySnapUserEmail.empty) {
        return;
      } else {
        const followersRef = query(
          collection(db, 'users', querySnapUserEmail.docs[0].data()?.email, 'followers'),
          orderBy('createTime', 'desc')
        );
        //フォロワーユーザーの情報を取得

        const unSub = onSnapshot(followersRef, (snap) => {
          snap.forEach(async (docFollowers) => {
            setFollowers([]);
            const userRef = collection(db, 'users');
            const queryUserInfo = query(userRef, where('email', '==', `${docFollowers.data()?.email}`));
            const querySnapUserInfo = await getDocs(queryUserInfo);
            if (querySnapUserInfo.empty) {
              return;
            } else {
              querySnapUserInfo.docs.map((doc) => {
                setFollowers((prev) => [
                  ...prev,
                  {
                    ...doc.data(),
                    followingFlag: docFollowers.data().following,
                  },
                ]);
              });
            }
          });
        });

        return () => unSub();
      }
    };
    follower();
  }, [router.query.id]);

  return (
    <div className=" md:max-w-xl lg:max-w-2xl">
      {followers.map((user) => {
        return <ListItem key={user.email} user={user} />;
      })}
    </div>
  );
};

export default memo(Followers);
