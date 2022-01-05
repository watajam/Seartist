import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';

export const useQueryFollows = () => {
  const [follows, setFollows] = useState<
    Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email' | 'followingFlag'>[]
  >([]);
  const [followsLoading, setFollowsLoading] = useState(true);
  const router = useRouter();
  const [authEmail, setAuthEmail] = useState('');

  useEffect(() => {
    const follow = async () => {
      const userRef = collection(db, 'users');
      const queryUserInfo = query(userRef, where('userId', '==', `${router.query?.id}`));
      const userInfoDocs = await getDocs(queryUserInfo);
      if (userInfoDocs.empty) {
        setFollowsLoading(false);
        return;
      } else {
        const followsRef = query(
          collection(db, 'users', userInfoDocs.docs[0].data()?.email, 'following'),
          orderBy('createTime', 'desc')
        );
        setAuthEmail(userInfoDocs.docs[0].data()?.email);
        //フォロワーユーザーの情報を取得
        const followsDocs = await getDocs(followsRef);
        if (followsDocs.empty) {
          setFollows(null);
          setFollowsLoading(false);
          return;
        } else {
          followsDocs.docs.map(async (follower) => {
            const userRef = collection(db, 'users');
            const queryUserInfo = query(userRef, where('email', '==', `${follower.data()?.email}`));
            const querySnapUserInfo = await getDocs(queryUserInfo);
            if (querySnapUserInfo.empty) {
              setFollows(null);
              setFollowsLoading(false);
              return;
            } else {
              setFollows((prev) => {
                return [
                  ...prev,
                  {
                    followingFlag: follower.data()?.following,
                    userId: querySnapUserInfo.docs[0].data()?.userId,
                    name: querySnapUserInfo.docs[0].data()?.name,
                    profilePhoto: querySnapUserInfo.docs[0].data()?.profilePhoto,
                    email: querySnapUserInfo.docs[0].data()?.email,
                  },
                ];
              });
              setFollowsLoading(false);
            }
          });
        }
      }
    };
    follow();
  }, [router.query.id]);

  return { follows, followsLoading, authEmail };
};
