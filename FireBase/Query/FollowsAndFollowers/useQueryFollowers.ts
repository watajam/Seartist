import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';

export const useQueryFollowers = () => {
  const [followers, setFollowers] = useState<
    Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email' | 'followingFlag'>[]
  >([]);
  const [followersLoading, setFollowersLoading] = useState(true);
  const [authEmail, setAuthEmail] = useState('');

  const router = useRouter();

  useEffect(() => {
    const follower = async () => {
      const userRef = collection(db, 'users');
      const queryUserInfo = query(userRef, where('userId', '==', `${router.query?.id}`));
      const userInfoDocs = await getDocs(queryUserInfo);
      if (userInfoDocs.empty) {
        setFollowersLoading(false);
        return;
      } else {
        const followersRef = query(
          collection(db, 'users', userInfoDocs.docs[0].data()?.email, 'followers'),
          orderBy('createTime', 'desc')
        );
        setAuthEmail(userInfoDocs.docs[0].data()?.email);
        //フォロワーユーザーの情報を取得
        const followersDocs = await getDocs(followersRef);
        if (followersDocs.empty) {
          setFollowers(null);
          setFollowersLoading(false);
          return;
        } else {
          followersDocs.docs.map(async (follower) => {
            const userRef = collection(db, 'users');
            const queryUserInfo = query(userRef, where('email', '==', `${follower.data()?.email}`));
            const querySnapUserInfo = await getDocs(queryUserInfo);
            if (querySnapUserInfo.empty) {
              setFollowers(null);
              setFollowersLoading(false);
              return;
            } else {
              setFollowers((prev) => {
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
              setFollowersLoading(false);
            }
          });
        }
      }
    };
    follower();
  }, [router.query.id]);

  return { followers, followersLoading, authEmail };
};
