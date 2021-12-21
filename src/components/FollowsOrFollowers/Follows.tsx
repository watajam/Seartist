import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { memo, useEffect, useState, VFC } from 'react';
import { db } from '../../../lib/firebase';
import ListItem from './ListItem';

const Follows: VFC = () => {
  // const { user, userLofollowding } = useQueryUserInfo();
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

  const [follows, setFollow] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const follow = async () => {
      const userRef = collection(db, 'users');
      const queryUserEmail = query(userRef, where('userId', '==', `${router.query?.id}`));
      const querySnapUserEmail = await getDocs(queryUserEmail);
      if (querySnapUserEmail.empty) {
        return;
      } else {
        const followingRef = query(
          collection(db, 'users', querySnapUserEmail.docs[0].data()?.email, 'following'),
          orderBy('createTime', 'desc')
        );

        //フォローしているユーザーの情報を取得
        const unSub = onSnapshot(followingRef, (snap) => {
          snap.forEach(async (docFollows) => {
            setFollow([]);
            const userRef = collection(db, 'users');
            const queryUserEmail = query(userRef, where('email', '==', `${docFollows.data().email}`));
            const querySnapUserInfo = await getDocs(queryUserEmail);
            if (querySnapUserInfo.empty) {
              return;
            } else {
              querySnapUserInfo.forEach((doc) => {
                setFollow((prev) => [
                  ...prev,
                  {
                    ...doc.data(),
                    followingFlag: docFollows.data().following,
                  },
                ]);
              });
            }
          });
        });
        return () => unSub();
      }
    };
    follow();
  }, [router.query.id]);

  return (
    <div className="md:max-w-xl lg:max-w-2xl">
      {follows.map((user) => {
        return <ListItem key={user.email} user={user} />;
      })}
    </div>
  );
};

export default memo(Follows);
